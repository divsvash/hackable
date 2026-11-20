'use client';
import { useEffect, useState } from 'react';

function Sun(){return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>}
function Moon(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>}

export default function Page(){
  const [light,setLight]=useState(false);
  useEffect(()=>{setLight(document.documentElement.dataset.theme==='light')},[]);
  function toggle(){ const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{sessionStorage.setItem('hackable-theme',next?'light':'dark')}catch{}}
  return <div className="page">
    <header>
      <a className="brand" href="#main" aria-label="divs, skip to main content">divs<span className="brand-dot">.</span></a>
      <button type="button" className="theme-switch" role="switch" aria-checked={light} aria-label="Light theme" onClick={toggle}>
        <span className="switch-label">{light?'lights on':'lights out'}</span>
        <span className="switch-track"><span className="switch-thumb"/><span className="switch-icon"><Moon/></span><span className="switch-icon"><Sun/></span></span>
      </button>
    </header>
    <main id="main">
      <p className="eyebrow"><span className="cross">+</span> a little less anonymous than you think</p>
      <h1>how <span className="pink">hackable</span><br/>are you<span className="question">?</span></h1>
      <p className="intro">you haven&apos;t said a word.<br/>your <span className="underlined">browser</span> has a lot to say.</p>
      <div className="specimen" aria-label="Illustrative public IP reading, not a live scan">
        <div className="specimen-heading"><span>01 / the first thing they see</span><span className="sample-badge">example</span></div>
        <div className="specimen-data"><span className="data-label">public ip</span><span className="ip">203<span>.</span>0<span>.</span>113<span>.</span>42</span><span className="target-mark" aria-hidden="true">↗</span></div>
        <p>an address. not your identity. still a starting point.</p>
      </div>
      <p className="scope-note">visual concept only <span>/</span> no live checks running</p>
    </main>
    <footer><span>01 <span className="footer-dim">/</span> what you give away</span><span className="footer-right">a mirror. <span className="footer-dim">not an attack.</span></span></footer>
  </div>
}
