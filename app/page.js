'use client';
import { useEffect, useState } from 'react';
import { lookupAddress } from './lookup.mjs';
function Sun(){return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>}
function Moon(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>}
export default function Page(){
 const [light,setLight]=useState(false);
 const [lookup,setLookup]=useState({status:'loading',data:null});
 useEffect(()=>{
  const controller=new AbortController();
  let active=true;
  const timer=setTimeout(()=>controller.abort(),8000);
  lookupAddress({signal:controller.signal}).then(data=>{if(active)setLookup({status:'ready',data})}).catch(()=>{if(active)setLookup({status:'error',data:null})}).finally(()=>clearTimeout(timer));
  return ()=>{active=false;clearTimeout(timer);controller.abort()};
 },[]);
 useEffect(()=>{setLight(document.documentElement.dataset.theme==='light')},[]);
 function toggle(){const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{sessionStorage.setItem('hackable-theme',next?'light':'dark')}catch{}}
 return <div className="page">
  <header><a href="#main" className="brand" aria-label="divs, skip to main content">divs.</a>
   <button type="button" className="theme-switch" role="switch" aria-checked={light} aria-label="Light theme" onClick={toggle}><span className="switch-label">{light?'light':'dark'}</span><span className="switch-track"><span className="switch-thumb"/><span className="switch-icon"><Moon/></span><span className="switch-icon"><Sun/></span></span></button>
  </header>
  <main id="main">
   <p className="eyebrow">On the things we give away</p>
   <h1>How <i>hackable</i><br/>are you?</h1>
   <p className="scope-note">One live reading: your public IP.<br/>The rest of the trail comes later.</p>
   <article aria-label="What your public IP gives away">
    <p className="opening">You haven&apos;t told me your name.<br/>You haven&apos;t clicked a thing.<br/>But you&apos;re not quite a <em>stranger.</em></p>
    <p aria-live="polite" aria-atomic="true">Every visit starts with an address. {lookup.status==='ready'?<>This connection shows up as <span className="reading">{lookup.data.ip}</span>.</>:lookup.status==='loading'?<span className="reading pending">Looking for yours now.</span>:<>This time, <em>the lookup didn&apos;t answer.</em> That might be a blocked request, a network problem or a service limit. It doesn&apos;t mean you&apos;re hidden.</>} Not a home address. Not a name. An IP address: somewhere for the reply to go.</p>
    {lookup.status==='ready'&&<p className="live-result">The lookup places that address around <em>{lookup.data.area || 'an area it could not identify'}</em>, on a network listed as <em>{lookup.data.provider || 'an unknown provider'}</em>{lookup.data.asn?<> ({lookup.data.asn})</>:null}. That&apos;s a database estimate, not a GPS fix. It can be wrong.</p>}
    <p>That number can point to a network provider and an approximate area. It cannot tell me who is sitting behind the screen. A shared connection might put a whole building behind the <em>same address.</em></p>
    <p>If you use a VPN or proxy, this may be its exit address. This page cannot peel it back to find a secret &quot;real IP&quot;.</p>
    <p>Then there&apos;s the browser. The language it prefers. The screen it draws on. The time zone it uses. Small details, ordinary on their own. Together, they can help a website <em>recognise a browser</em> without asking for a name.</p>
    <p>Being recognisable isn&apos;t the same as being hacked. An address isn&apos;t an open door. A fingerprint isn&apos;t a password. The interesting question is what someone can learn, what they can actually use, and <em>where the trail ends.</em></p>
    <p className="closing">That&apos;s what we&apos;re here to look at.<br/>A mirror. <i>Not an attack.</i></p>
    <p className="privacy-note">This reading asks <a href="https://ipapi.co/privacy/" target="_blank" rel="noreferrer">ipapi.co</a> for your public IP, approximate area and provider. That service receives your IP to answer. The service may keep request logs under its privacy policy. This page keeps the result only in page memory and sends it nowhere else. Your theme choice stays in this tab&apos;s session storage. No other checks run in this piece.</p>
   </article>
  </main>
  <footer><span>how hackable are you?</span><span>Piece one · public IP only</span></footer>
 </div>
}
