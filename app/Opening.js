'use client';
import {useEffect,useState} from 'react';
export function openingLines({lookup,browser,device,graphics}){
 const ready=lookup.status!=='loading';const ip=lookup.data;
 return [
  {label:'your public IP',value:ready?(ip?.ip||'lookup unavailable'):null},
  {label:'approximate area',value:ready?(ip?.area||'not available'):null},
  {label:'network provider',value:ready?(ip?.provider||'not available'):null},
  {label:'preferred languages',value:browser?(browser.languages.join(', ')||'not reported'):null},
  {label:'browser time zone',value:browser?(browser.timeZone||'not reported'):null},
  {label:'reported screen',value:browser?(browser.width&&browser.height?`${browser.width} × ${browser.height} CSS pixels`:'not reported'):null},
  {label:'platform label',value:device?(device.platform||'not reported'):null},
  {label:'graphics renderer',value:graphics?(graphics.renderer||'not available'):null}
 ];
}
export default function Opening(props){
 const lines=openingLines(props);
 const [index,setIndex]=useState(0),[chars,setChars]=useState(0),[reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener?.('change',update);return()=>mq.removeEventListener?.('change',update)},[]);
 const current=lines[index];const value=current?.value;
 const text=current?`${current.label}: ${value??''}`:'';
 useEffect(()=>{
  if(reduced||!current||value===null)return;
  const timer=setTimeout(()=>{if(chars<text.length)setChars(x=>x+1);else{setIndex(x=>x+1);setChars(0)}},chars<text.length?16:160);
  return()=>clearTimeout(timer);
 },[index,chars,text,value,reduced,Boolean(current)]);
 const done=reduced?lines.every(x=>x.value!==null):index>=lines.length;
 useEffect(()=>{props.onComplete?.(done)},[done,props.onComplete]);
 return <div className="opening-sequence">
  <p className="opening-caption">First, I&apos;d look for a starting point.</p>
  <div className="typed-findings" aria-hidden="true">
   {(reduced?lines:lines.slice(0,Math.min(index+1,lines.length))).map((line,i)=>{
    const full=`${line.label}: ${line.value??'waiting for the reading…'}`;
    return <p key={line.label}>{reduced||i<index?full:line.value===null?`${line.label}: waiting for the reading…`:full.slice(0,chars)}{!reduced&&i===index?<span className="typing-cursor">▏</span>:null}</p>
   })}
  </div>
  <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{done?'Opening readings complete. Their values and limits follow in the article.':'Reading this browser. The article below contains each result as it becomes available.'}</div>
  {done&&<p className="opening-punch">And all you did was <em>open this page.</em></p>}
  <p className="opening-disclosure">This is reconnaissance, not an exploit. Typing presents the readings; it is not a live attack. IP, area and provider come from a request to ipapi.co. Area is a database estimate, not GPS. Other readings come from browser APIs. Unavailable isn&apos;t the same as hidden.</p>
 </div>
}
