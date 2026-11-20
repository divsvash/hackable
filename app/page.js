'use client';
import { useEffect, useState } from 'react';
import { lookupAddress } from './lookup.mjs';
import { readBrowser } from './browser.mjs';
import { readDevice, readGraphics } from './device.mjs';
import { canvasSample, audioSample } from './fingerprint.mjs';
import { readConnection } from './connection.mjs';
import { localCandidates } from './rtc.mjs';
function Sun(){return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>}
function Moon(){return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>}
export default function Page(){
 const [light,setLight]=useState(false);
 const [browser,setBrowser]=useState(null);
 const [rtc,setRtc]=useState(null);
 useEffect(()=>{
  const controller=new AbortController();
  localCandidates(window.RTCPeerConnection,{signal:controller.signal}).then(x=>{if(!controller.signal.aborted)setRtc(x)});
  return ()=>controller.abort();
 },[]);
 const [connection,setConnection]=useState(null);
 useEffect(()=>{
  const update=()=>setConnection(readConnection(navigator,location,window.isSecureContext));
  update();const net=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  net?.addEventListener?.('change',update);
  return ()=>net?.removeEventListener?.('change',update);
 },[]);
 const [canvas,setCanvas]=useState(null);
 const [audio,setAudio]=useState(null);
 useEffect(()=>{
  let active=true;
  canvasSample(document,window.crypto?.subtle).then(x=>{if(active)setCanvas(x)});
  audioSample(window.OfflineAudioContext||window.webkitOfflineAudioContext,window.crypto?.subtle).then(x=>{if(active)setAudio(x)});
  return ()=>{active=false};
 },[]);
 const [device,setDevice]=useState(null);
 const [graphics,setGraphics]=useState(null);
 useEffect(()=>{setDevice(readDevice(navigator));setGraphics(readGraphics(document))},[]);
 useEffect(()=>{
  const update=()=>setBrowser(readBrowser({nav:navigator,screen:window.screen,ratio:()=>window.devicePixelRatio,timeZone:()=>Intl.DateTimeFormat().resolvedOptions().timeZone}));
  update();
  window.addEventListener('languagechange',update);
  window.addEventListener('resize',update);
  return ()=>{window.removeEventListener('languagechange',update);window.removeEventListener('resize',update)};
 },[]);
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
   <p className="scope-note">Your address. Your browser. Its little tells.<br/>The trail is taking shape.</p>
   <article aria-label="What your public IP gives away">
    <p className="opening">You haven&apos;t told me your name.<br/>You haven&apos;t clicked a thing.<br/>But you&apos;re not quite a <em>stranger.</em></p>
    <p aria-live="polite" aria-atomic="true">Every visit starts with an address. {lookup.status==='ready'?<>This connection shows up as <span className="reading">{lookup.data.ip}</span>.</>:lookup.status==='loading'?<span className="reading pending">Looking for yours now.</span>:<>This time, <em>the lookup didn&apos;t answer.</em> That might be a blocked request, a network problem or a service limit. It doesn&apos;t mean you&apos;re hidden.</>} Not a home address. Not a name. An IP address: somewhere for the reply to go.</p>
    {lookup.status==='ready'&&<p className="live-result">The lookup places that address around <em>{lookup.data.area || 'an area it could not identify'}</em>, on a network listed as <em>{lookup.data.provider || 'an unknown provider'}</em>{lookup.data.asn?<> ({lookup.data.asn})</>:null}. That&apos;s a database estimate, not a GPS fix. It can be wrong.</p>}
    <p>That number can point to a network provider and an approximate area. It cannot tell me who is sitting behind the screen. A shared connection might put a whole building behind the <em>same address.</em></p>
    <p>If you use a VPN or proxy, this may be its exit address. This page cannot peel it back to find a secret &quot;real IP&quot;.</p>
    <p>Next, I&apos;d look for something to recognise you by. Not your name. <em>Your browser&apos;s habits.</em></p>
    <p>{browser?<>It hands over <em className="browser-reading">{browser.languages.length?browser.languages.join(', '):'no language preference'}</em> for language, and <em className="browser-reading">{browser.timeZone || 'no time zone'}</em> for its clock.</>:<>The language. The clock. Reading what this browser is willing to share.</>}</p>
    {browser&&<p className="browser-result">Then the screen: {browser.width&&browser.height?<em className="browser-reading">{browser.width} × {browser.height}</em>:<em>dimensions withheld</em>} CSS pixels. Pixel ratio: <em className="browser-reading">{browser.pixelRatio || 'not reported'}</em>. You didn&apos;t type any of that.</p>}
    <p>If I saw this browser again, I&apos;d have a few details to compare. A familiar-looking combination. <em>A clue, not a match.</em> Plenty of people can share it.</p>
    <p>I still couldn&apos;t place you on a map or put a name to the screen. These are reported settings; privacy tools can change them. But I no longer have <em>nothing to go on.</em></p>
    <p>Then I&apos;d read the label your browser puts on itself. {device?.userAgent?<><em className="device-reading">{device.userAgent}</em> A long introduction for something you never introduced.</>:<>That label isn&apos;t available here.</>}</p>
    {device&&<p className="device-result">Its platform label is <em>{device.platform || 'not reported'}</em>. It offers <em>{device.logicalProcessors ?? 'an unknown number of'}</em> logical processors{device.memoryGiB?<> and a rounded memory estimate of <em>{device.memoryGiB} GiB</em></>:<>; the memory estimate is <em>not reported</em></>}. Not an inventory of your machine. Just the version of it your browser lets me see.</p>}
    {graphics&&<p className="graphics-result">The graphics driver {graphics.renderer?<>adds another label: <em className="device-reading">{graphics.renderer}.</em></>:<>doesn&apos;t give me an unmasked renderer here.</>} {graphics.renderer?<>Useful for narrowing things down. Not proof of the graphics card in your hands; a browser can mask it or report a software renderer.</>:<>A missing label could mean a privacy setting, a blocked feature or no WebGL support. It doesn&apos;t prove anything about your safety.</>}</p>}
    <p>I wouldn&apos;t trust any of these labels as an exact browser or OS identity. They can be reduced, shared or spoofed. I&apos;d treat them as <em>leads to check</em>, not a reason to claim I&apos;ve found a vulnerability.</p>
    <p>Labels can be copied. I&apos;d also want to see <em>how this browser draws.</em> So I draw the same tiny image every time and turn its pixels into a SHA-256 digest.</p>
    <p className="canvas-result">{canvas?canvas.hash?<>This run produced <em className="hash-reading">{canvas.hash}</em></>:<>The canvas sample is <em>unavailable here.</em></>:<>The canvas sample is being calculated locally.</>}</p>
    <p>I can do something similar with sound, without playing any. A short oscillator and compressor run in an offline audio buffer. {audio?audio.hash?<>The sample digest is <em className="hash-reading">{audio.hash}</em></>:<>That sample is <em>unavailable here.</em></>:<>That sample is still being calculated.</>}</p>
    <p>These digests describe the output of these particular tests, <em>not a secret serial number.</em> Another browser might produce the same result. An update or privacy protection might change yours. I haven&apos;t proved that either one can identify you.</p>
    <p>But that&apos;s the move: compare enough small clues and see whether a browser looks familiar. No login needed to collect them. No claim that this page has tracked you anywhere.</p>
    <p>There&apos;s another place I&apos;d look for an address: <em>WebRTC</em>, the browser&apos;s real-time connection machinery. This page asks for local connection candidates, without a call, a camera or a microphone.</p>
    <p className="rtc-result">{rtc?rtc.candidates.length?<>This run exposed {rtc.candidates.length} candidate{rtc.candidates.length===1?'':'s'}: {rtc.candidates.map((row,index)=><span key={row.type+row.address}>{index>0?'; ':''}<em className="browser-reading">{row.address}</em> ({row.type}, {row.kind==='mdns'?'mDNS hostname':'IP address'})</span>)}.</>:<>This run returned <em>no visible local candidates</em> ({rtc.status}). That might be a restriction, an unavailable API or the network environment.</>:<>Local candidates are still being gathered.</>}</p>
    <p>A .local name hides an address behind a local hostname in this result. A visible address is a clue about a network interface, not automatically a leaked home IP. <em>No STUN server is contacted here</em>, so this is not a public-route or VPN-leak test. No candidates doesn&apos;t prove there&apos;s no leak elsewhere.</p>
    <p>Now I&apos;d look at the route, not just the browser. {connection?.protocol==='https:'?<>This page arrived over <em>HTTPS</em>. That encrypts this connection to the site. It doesn&apos;t make the site honest, or tell me how the Wi-Fi is configured.</>:connection?.protocol==='http:'?<>This page itself arrived over <em>HTTP, not HTTPS.</em> That page connection is not protected by HTTPS, even if the separate IP lookup uses it.</>:<>This page {connection?<>is using <em>{connection.protocol || 'an unknown transport'}</em>, not a measured HTTPS connection.</>:<>hasn&apos;t reported its transport yet.</>}</>}</p>
    {connection&&<p className="connection-result">{connection.supported?<>The browser&apos;s network hints say <em>{connection.type || 'connection type not reported'}</em>{connection.effectiveType?<>, with <em>{connection.effectiveType}</em>-class effective performance</>:null}. {connection.downlink!==null?<>Downlink estimate: <em>{connection.downlink} Mbps</em>. </>:null}{connection.rtt!==null?<>Round-trip estimate: <em>{connection.rtt} ms</em>. </>:null}These are rounded browser estimates, not a speed test or a security finding. A 4g label here does not mean you&apos;re on a mobile network.</>:<>This browser doesn&apos;t expose network estimates. <em>No reading</em> is not the same as a safe connection.</>}</p>}
    <p>If this were shared Wi-Fi, I&apos;d care about what crosses it unencrypted. HTTPS is built to protect page contents from an ordinary network eavesdropper. It doesn&apos;t stop a fake login page from asking you to hand over a password. I can&apos;t inspect this hotspot&apos;s encryption, its owner or the other devices from this page.</p>
    <p>And here the browser&apos;s view runs out. <em>TLS cipher, ClientHello fingerprint, DNS-resolver leak, open ports: not measured.</em> Neither are your router&apos;s settings, a VPN&apos;s trustworthiness or whether this device is compromised. A list of readings is not a clean bill of health.</p>
    <p>Being recognisable isn&apos;t the same as being hacked. An address isn&apos;t an open door. A fingerprint isn&apos;t a password. The interesting question is what someone can learn, what they can actually use, and <em>where the trail ends.</em></p>
    <p className="closing">That&apos;s what we&apos;re here to look at.<br/>A mirror. <i>Not an attack.</i></p>
    <p className="privacy-note">This reading asks <a href="https://ipapi.co/privacy/" target="_blank" rel="noreferrer">ipapi.co</a> for your public IP, approximate area and provider. That service receives your IP to answer. It also receives normal browser request headers and may keep request logs under its privacy policy. This page keeps the result only in page memory and sends it nowhere else. Your theme choice stays in this tab&apos;s session storage. Language, screen, time-zone, device, graphics and network-estimate readings stay on this page; this page does not attach those measurements to the IP request. Canvas and offline-audio sample digests also stay in memory. They are not stored, transmitted or combined into an identity. WebRTC candidates stay local too; no peer connection is established and no STUN or TURN service is used.</p>
   </article>
  </main>
  <footer><span>how hackable are you?</span><span>Public IP + browser clues</span></footer>
 </div>
}
