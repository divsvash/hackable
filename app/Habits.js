'use client';
import {useState} from 'react';
import {TypedP} from './LiveBlog';
import {habits,habitResponse} from './habits.mjs';
function Choice({kind}){
 const [value,setValue]=useState('unknown');const h=habits[kind];
 return <>
  <TypedP className="habit-choice"><label htmlFor={`habit-${kind}`}>{h.label}</label>{' '}<select id={`habit-${kind}`} value={value} onChange={event=>setValue(event.target.value)}>{h.options.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select><span className="habit-local-note">Optional. Your answer stays on this page.</span></TypedP>
  <TypedP className="habit-response" aria-live="polite" aria-atomic="true">{habitResponse(kind,value)}</TypedP>
 </>
}
export default function Habits(){return <div className="habits-flow">
 <TypedP>So far, I&apos;ve only watched what the browser gives away. If that trail ends, I&apos;d look for a different opening: <em>what you trust when you&apos;re in a hurry.</em></TypedP>
 <TypedP>This part isn&apos;t a scan. I can&apos;t see your charging cable, your saved hotspots or the USB drive on your desk. Read on without answering, or change a line if you want the advice to fit. <em>No score. No guessed habits.</em></TypedP>
 <TypedP>A station platform. A weak signal. A network name that looks official. I&apos;d wonder whether you check who&apos;s on the other end before joining.</TypedP>
 <Choice kind="wifi"/>
 <TypedP>Being on the same Wi-Fi does not hand me the contents of correctly protected HTTPS traffic. A fake network or portal can still try to persuade you to enter credentials on the wrong site. A padlock protects a connection, <em>not the intentions of the page.</em></TypedP>
 <TypedP>Then your battery drops to two percent. There&apos;s a USB socket beside the seat in the metro. The question isn&apos;t whether electricity is dangerous. It&apos;s <em>what else that connection allows.</em></TypedP>
 <Choice kind="charging"/>
 <TypedP>I won&apos;t tell you that every public charger steals data. USB charging attacks are possible, but that is not evidence that this port is malicious. In a 2023 discussion, <a href="https://www.cisa.gov/news-events/news/applying-secure-design-thinking-events-news" target="_blank" rel="noreferrer">CISA warned against confusing possible attacks with demonstrated real-world cases.</a> A sensible precaution does not need a horror story.</TypedP>
 <TypedP>A cable is one invitation. A drive left behind is another. If I can make you curious enough, I might not need you to visit a website at all.</TypedP>
 <Choice kind="usb"/>
 <TypedP>Plugging something in does not mean instant compromise. The outcome depends on the device, permissions, software and any vulnerability involved. But <em>unfamiliar hardware doesn&apos;t earn trust by fitting the socket.</em></TypedP>
 <TypedP>That&apos;s a different kind of defence. Not hiding every detail. Choosing which things get close enough to matter.</TypedP>
 <TypedP className="habit-sources">Practical guidance: <a href="https://www.cisa.gov/resources-tools/training/protect-physical-security-your-digital-devices" target="_blank" rel="noreferrer">CISA on physical devices and public charging</a>. These are precautions and your own answers, not findings that any device, cable or network is compromised.</TypedP>
 </div>}
