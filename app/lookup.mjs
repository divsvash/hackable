export const LOOKUP_URL = 'https://ipapi.co/json/';
export function isIPAddressValue(value) {
  if (typeof value !== 'string' || value.length > 64) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(value)) return value.split('.').every(n => /^(0|[1-9]\d{0,2})$/.test(n) && Number(n) <= 255);
  if (!value.includes(':') || !/^[0-9a-f:]+$/i.test(value)) return false;
  try { return new URL(`https://[${value}]/`).hostname.startsWith('['); } catch { return false; }
}
function field(value) { return typeof value === 'string' && value.trim() ? value.trim().slice(0, 160) : null; }
export function parseLookup(data) {
  if (!data || data.error || !isIPAddressValue(data.ip)) throw new Error('Invalid IP response');
  return {ip: data.ip, area: [field(data.region), field(data.country_name)].filter(Boolean).join(', ') || null, provider: field(data.org), asn: field(data.asn)};
}
export async function lookupAddress({signal, fetcher = fetch} = {}) {
  const response = await fetcher(LOOKUP_URL, {signal, credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', headers: {Accept: 'application/json'}});
  if (!response.ok) throw new Error('Lookup unavailable');
  return parseLookup(await response.json());
}
