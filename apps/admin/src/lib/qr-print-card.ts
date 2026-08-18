export const DEFAULT_QR_FRAME = "#E31B23";
export const DEFAULT_QR_MODULE = "#2F6BFF";

const HEX = /^#[0-9A-Fa-f]{6}$/;

export function hexColor(
  value: string | null | undefined,
  fallback: string,
): string {
  const next = value?.trim() ?? "";
  return HEX.test(next) ? next : fallback;
}

export function qrPrintColors(restaurant?: {
  qrFrameColor?: string | null;
  qrModuleColor?: string | null;
}) {
  return {
    frame: hexColor(restaurant?.qrFrameColor, DEFAULT_QR_FRAME),
    module: hexColor(restaurant?.qrModuleColor, DEFAULT_QR_MODULE),
  };
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function servingHandSvg(frame: string) {
  const c = escapeHtml(frame);
  return `<svg class="hand" viewBox="0 0 240 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M54 50 C26 46 20 28 40 16"/>
    <path d="M74 42 C70 16 80 6 92 10"/>
    <path d="M108 40 C108 12 118 2 130 8"/>
    <path d="M140 42 C146 16 156 8 168 14"/>
    <path d="M172 50 C182 30 192 24 204 32"/>
    <path d="M62 52 C74 82 158 84 176 54"/>
  </g>
</svg>`;
}

export function buildTableQrPrintHtml(opts: {
  locale: string;
  dir: string;
  title: string;
  scanLabel: string;
  tableLabel: string;
  tableNumber: string;
  placeLine: string;
  printLabel: string;
  qrDataUrl: string;
  logoUrl?: string | null;
  frameColor: string;
}) {
  const frame = escapeHtml(opts.frameColor);
  const logo = opts.logoUrl
    ? `<img class="logo" src="${escapeHtml(opts.logoUrl)}" alt="" />`
    : "";

  return `<!DOCTYPE html>
<html lang="${escapeHtml(opts.locale)}" dir="${opts.dir}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(opts.title)}</title>
  <style>
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin: 0; background: #f3f3f3; }
    body { font-family: Arial, Helvetica, sans-serif; text-align: center; padding: 28px 16px 40px; color: #222; }
    .stage { display: inline-block; width: 320px; }
    .scan {
      margin: 0 0 14px;
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: ${frame};
    }
    .frame {
      display: block;
      margin: 0 auto;
      width: 260px;
      padding: 10px;
      background: #fff;
      border: 12px solid ${frame};
    }
    .qr-box { position: relative; }
    .qr { display: block; width: 100%; height: auto; }
    .logo {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 22%;
      height: 22%;
      transform: translate(-50%, -50%);
      object-fit: contain;
      background: #fff;
      border-radius: 10px;
      padding: 4px;
      box-shadow: 0 0 0 3px #fff;
    }
    .tray {
      width: 292px;
      height: 16px;
      margin: 0 auto;
      background: ${frame};
      border-radius: 2px 2px 18px 18px;
    }
    .hand { width: 210px; height: 78px; margin-top: 2px; }
    .table { margin: 18px 0 0; font-size: 18px; font-weight: 700; }
    .place { margin: 4px 0 0; font-size: 13px; color: #555; }
    button {
      margin-top: 24px;
      padding: 10px 22px;
      font-size: 15px;
      cursor: pointer;
    }
    @media print {
      body { background: #fff; }
      button { display: none; }
    }
  </style>
</head>
<body>
  <div class="stage">
    <p class="scan">${escapeHtml(opts.scanLabel)}</p>
    <div class="frame">
      <div class="qr-box">
        <img class="qr" src="${escapeHtml(opts.qrDataUrl)}" alt="${escapeHtml(opts.title)}" />
        ${logo}
      </div>
    </div>
    <div class="tray"></div>
    ${servingHandSvg(opts.frameColor)}
    <p class="table">${escapeHtml(opts.tableLabel)} ${escapeHtml(opts.tableNumber)}</p>
    <p class="place">${escapeHtml(opts.placeLine)}</p>
  </div>
  <div>
    <button onclick="window.print()">${escapeHtml(opts.printLabel)}</button>
  </div>
</body>
</html>`;
}
