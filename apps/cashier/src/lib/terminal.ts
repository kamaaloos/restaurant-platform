import { loadStripeTerminal } from "@stripe/terminal-js";
import type { Reader, Terminal } from "@stripe/terminal-js";
import { cashierApi } from "./api";

const READER_KEY = "cashier.terminal.readerId";
const MODE_KEY = "cashier.terminal.mode";

export type TerminalMode = "simulated" | "physical";

let terminalPromise: Promise<Terminal> | null = null;

export function getTerminalMode(): TerminalMode {
  if (typeof window === "undefined") return "simulated";
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === "physical") return "physical";
  return "simulated";
}

export function setTerminalMode(mode: TerminalMode) {
  localStorage.setItem(MODE_KEY, mode);
  // Force a fresh SDK session when switching simulated ↔ physical.
  void resetTerminal();
}

export function getSelectedReaderId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(READER_KEY);
}

export function setSelectedReaderId(id: string | null) {
  if (!id) localStorage.removeItem(READER_KEY);
  else localStorage.setItem(READER_KEY, id);
  void resetTerminal();
}

/** Drop the cached Terminal.js instance (next pay will reconnect). */
export async function resetTerminal() {
  const pending = terminalPromise;
  terminalPromise = null;
  if (!pending) return;
  try {
    const terminal = await pending;
    const connected = terminal.getConnectedReader();
    if (connected) {
      await terminal.disconnectReader();
    }
  } catch {
    // Ignore teardown errors — next connect creates a fresh instance.
  }
}

/**
 * Shared Stripe Terminal instance.
 * Connection tokens come from POST /api/payments/terminal/connection-token.
 * Simulated by default (local/CI). Physical when mode=physical + reader selected.
 */
async function getTerminal(): Promise<Terminal> {
  if (!terminalPromise) {
    terminalPromise = (async () => {
      const StripeTerminal = await loadStripeTerminal();
      if (!StripeTerminal) {
        throw new Error("Failed to load Stripe Terminal.js");
      }
      return StripeTerminal.create({
        onFetchConnectionToken: async () => {
          const { secret } = await cashierApi.terminalConnectionToken();
          return secret;
        },
        onUnexpectedReaderDisconnect: () => {
          // Reader dropped — next collect will re-discover.
        },
      });
    })();
  }
  return terminalPromise;
}

async function resolveLocationId(): Promise<string | undefined> {
  try {
    const config = await cashierApi.paymentConfig();
    return config.terminalLocationId?.trim() || undefined;
  } catch {
    return undefined;
  }
}

async function ensureReader(terminal: Terminal) {
  const connected = terminal.getConnectedReader();
  if (connected) return connected;

  const mode = getTerminalMode();
  if (mode === "physical") {
    const preferred = getSelectedReaderId();
    const location = await resolveLocationId();
    const discovery = await terminal.discoverReaders({
      simulated: false,
      ...(location ? { location } : {}),
    });
    if (discovery.error) {
      throw new Error(discovery.error.message);
    }
    const readers = discovery.discoveredReaders ?? [];
    const reader =
      (preferred
        ? readers.find((r: Reader) => r.id === preferred)
        : undefined) ?? readers[0];
    if (!reader) {
      throw new Error(
        location
          ? "No physical Stripe Terminal reader found at this location. Register one under Stripe Terminal reader, or power on the device."
          : "No physical reader found. Set STRIPE_TERMINAL_LOCATION_ID on the API, register a reader, then try again.",
      );
    }
    const result = await terminal.connectReader(reader);
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.reader ?? reader;
  }

  const discovery = await terminal.discoverReaders({ simulated: true });
  if (discovery.error) {
    throw new Error(discovery.error.message);
  }
  const reader = discovery.discoveredReaders?.[0];
  if (!reader) {
    throw new Error("No simulated Stripe Terminal reader found");
  }
  const result = await terminal.connectReader(reader);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.reader ?? reader;
}

/**
 * Explicit connect for the cashier settings panel.
 * Uses POST /payments/terminal/connection-token under the hood.
 */
export async function connectTerminalReader(): Promise<{
  mode: TerminalMode;
  readerId: string;
  readerLabel: string;
}> {
  const terminal = await getTerminal();
  const connected = terminal.getConnectedReader();
  if (connected) {
    await terminal.disconnectReader();
  }
  const reader = await ensureReader(terminal);
  return {
    mode: getTerminalMode(),
    readerId: reader.id,
    readerLabel: reader.label || reader.id,
  };
}

/** Collect + process a card-present PaymentIntent on the connected reader. */
export async function collectTerminalPayment(clientSecret: string) {
  const terminal = await getTerminal();
  await ensureReader(terminal);

  // Simulated reader has no on-screen tap UI — configure a test card and it
  // completes in software (see Stripe Terminal JS docs).
  if (getTerminalMode() === "simulated") {
    terminal.setSimulatorConfiguration({
      testCardNumber: "4242424242424242",
    });
  }

  const collected = await terminal.collectPaymentMethod(clientSecret);
  if (collected.error) {
    throw new Error(collected.error.message);
  }
  if (!collected.paymentIntent) {
    throw new Error("Terminal did not return a PaymentIntent");
  }

  const processed = await terminal.processPayment(collected.paymentIntent);
  if (processed.error) {
    throw new Error(processed.error.message);
  }
  return processed.paymentIntent;
}
