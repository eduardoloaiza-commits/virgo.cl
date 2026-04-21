const rutBody = /^[0-9]{6,8}$/;

export function normalizeRut(raw: string): string {
  const clean = raw.replace(/\./g, "").replace(/\s/g, "").replace(/-/g, "").toUpperCase();
  if (clean.length < 7 || clean.length > 9) return "";
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!rutBody.test(body)) return "";
  if (!/^[0-9K]$/.test(dv)) return "";
  return `${body}-${dv}`;
}

export function computeRutDv(body: string): string {
  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const mod = 11 - (sum % 11);
  if (mod === 11) return "0";
  if (mod === 10) return "K";
  return String(mod);
}

export function isValidRut(raw: string): boolean {
  const normalized = normalizeRut(raw);
  if (!normalized) return false;
  const [body, dv] = normalized.split("-");
  return computeRutDv(body) === dv;
}

export function formatRut(raw: string): string {
  const normalized = normalizeRut(raw);
  if (!normalized) return raw;
  const [body, dv] = normalized.split("-");
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots}-${dv}`;
}
