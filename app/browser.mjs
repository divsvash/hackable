function safely(read) { try { return read(); } catch { return null; } }
function text(value) { return typeof value === 'string' && value.trim() ? value.trim().slice(0,160) : null; }
function positive(value) { return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null; }
export function readBrowser({nav,screen,ratio,timeZone}) {
  const languageList=safely(()=>Array.from(nav.languages || [])) || [];
  const languages=languageList.map(text).filter(Boolean).slice(0,12);
  if(!languages.length){const fallback=safely(()=>text(nav.language));if(fallback)languages.push(fallback)}
  return {
    languages,
    width:safely(()=>positive(screen.width)),
    height:safely(()=>positive(screen.height)),
    pixelRatio:safely(()=>positive(ratio())),
    timeZone:safely(()=>text(timeZone()))
  };
}
