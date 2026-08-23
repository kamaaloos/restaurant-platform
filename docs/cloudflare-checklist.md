# Cloudflare checklist — maylesoft.com

Operational items from Cloudflare Security Insights for the `maylesoft.com` zone. These are DNS / edge settings, not application code changes.

See also: [Deploy guide](./deploy-vercel-railway.md) for Vercel + Railway setup.

---

## security.txt (in repo)

The customer app serves RFC 9116 `security.txt` at:

`https://maylesoft.com/.well-known/security.txt`

Source file: `apps/customer/public/.well-known/security.txt`

After deploy, verify with:

```bash
curl -sS https://maylesoft.com/.well-known/security.txt
```

**Contacts:** `security@maylesoft.com` (recommended alias) and `contact@maylesoft.com`. Forward `security@` to your main inbox if you do not use a separate mailbox.

**Expiry:** Update the `Expires` field in `security.txt` at least once per year (currently set one year ahead).

---

## 1. Moderate — Bot Fight Mode (do first)

**Where:** Cloudflare → **Security** → **Bots** → **Bot Fight Mode** → **On**

**Why:** Reduces junk bot traffic on public guest and marketing hosts.

**After enabling, smoke-test:**

- `https://maylesoft.com`
- `https://customer.maylesoft.com`
- A tenant host, e.g. `https://alhuda.maylesoft.com`
- Table QR `/t/...` and walk-in `/w/...` flows

If a legitimate flow is blocked (uncommon for normal browsers), add a hostname exception or tune Super Bot Fight Mode rules.

---

## 2. Low — DMARC / SPF / DKIM (email DNS)

Repeated DMARC findings usually mean one misconfiguration: missing DMARC, or SPF/DKIM not aligned with how you send mail.

**Where:** Cloudflare → **DNS** + your mail provider’s setup docs (Google Workspace, Microsoft 365, Resend, etc.)

**Typical steps:**

1. Confirm which service sends mail as `@maylesoft.com`.
2. Publish **SPF** on `@` (or the sending subdomain).
3. Publish **DKIM** records from that provider.
4. Add or fix **DMARC**. Start in monitor mode:

```txt
_dmarc.maylesoft.com  TXT  "v=DMARC1; p=none; rua=mailto:contact@maylesoft.com; adkim=s; aspf=s"
```

After reports look clean for a few weeks, tighten to `p=quarantine` or `p=reject`.

**If you do not send mail from `@maylesoft.com` yet:** still add minimal DMARC (`p=none`) so scanners stop flagging the domain; refine when you add transactional email.

---

## 3. Low — AI Labyrinth (optional)

**Where:** Cloudflare → **Security** → **Bots** → **AI Labyrinth**

Use if you want to discourage AI crawlers from scraping marketing or menu content. Safe to skip initially if you want guest sites indexable and are not seeing abuse.

---

## Priority summary

| When | Item |
|------|------|
| **Now** | Bot Fight Mode + guest flow smoke test |
| **This week** | DMARC + SPF/DKIM alignment |
| **Shipped in repo** | `security.txt` on customer Vercel project (apex + wildcard hosts) |
| **Optional** | AI Labyrinth |

None of these block the restaurant platform from running; they improve edge security and email reputation.
