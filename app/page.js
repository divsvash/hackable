'use client';
import { useEffect, useState } from 'react';
function Sun(){return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>}
function Moon(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>}
export default function Page(){
 const [light,setLight]=useState(false);
 useEffect(()=>{setLight(document.documentElement.dataset.theme==='light')},[]);
 function toggle(){const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{sessionStorage.setItem('hackable-theme',next?'light':'dark')}catch{}}
 return <div className="page">
  <header><a href="#main" className="brand" aria-label="divs, skip to main content">divs.</a>
   <button type="button" className="theme-switch" role="switch" aria-checked={light} aria-label="Light theme" onClick={toggle}><span className="switch-label">{light?'light':'dark'}</span><span className="switch-track"><span className="switch-thumb"/><span className="switch-icon"><Moon/></span><span className="switch-icon"><Sun/></span></span></button>
  </header>
  <main id="main">
   <p className="eyebrow">On the things we give away</p>
   <h1>How <i>hackable</i><br/>are you?</h1>
   <p className="scope-note">A visual draft. Every reading below is illustrative.<br/>Nothing about your device is being checked.</p>
   <article aria-label="Illustrative story of browser exposure">
    <p className="opening">You haven&apos;t told me your name.<br/>You haven&apos;t clicked a thing.<br/>But you&apos;re not quite a <em>stranger.</em></p>
    <p>Every visit starts with an address. In this example, it&apos;s <span className="reading">203.0.113.42</span>. Not a home address. Not a name. An IP address: somewhere for the reply to go.</p>
    <p>That number can point to a network provider and an approximate area. It cannot tell me who is sitting behind the screen. A shared connection might put a whole building behind the <em>same address.</em></p>
    <p>Then there&apos;s the browser. The language it prefers. The screen it draws on. The time zone it uses. Small details, ordinary on their own. Together, they can help a website <em>recognise a browser</em> without asking for a name.</p>
    <p>Being recognisable isn&apos;t the same as being hacked. An address isn&apos;t an open door. A fingerprint isn&apos;t a password. The interesting question is what someone can learn, what they can actually use, and <em>where the trail ends.</em></p>
    <p className="closing">That&apos;s what we&apos;re here to look at.<br/>A mirror. <i>Not an attack.</i></p>
   </article>
  </main>
  <footer><span>how hackable are you?</span><span>Visual concept · no live scan</span></footer>
 </div>
}
