'use client';
import {createContext,useContext,useEffect,useMemo,useRef,useState,Children,cloneElement,isValidElement} from 'react';
const Flow=createContext(null);
function textLength(node){if(typeof node==='string'||typeof node==='number')return String(node).length;if(Array.isArray(node))return node.reduce((n,x)=>n+textLength(x),0);if(isValidElement(node))return node.type==='select'?0:textLength(node.props.children);return 0}
function reveal(node,budget){
 if(typeof node==='string'||typeof node==='number'){const text=String(node);const n=Math.min(text.length,Math.max(0,budget.left));budget.left-=text.length;return <><span className="sr-only">{text}</span><span aria-hidden="true">{text.slice(0,n)}</span></>}
 if(Array.isArray(node))return Children.map(node,x=>reveal(x,budget));
 if(isValidElement(node)){if(node.type==='select')return node;return cloneElement(node,{},reveal(node.props.children,budget))}
 return node;
}
export function LiveBlog({started,children}){
 const rows=useRef(new Map());const [reduced,setReduced]=useState(false);const [skip,setSkip]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener?.('change',update);return()=>mq.removeEventListener?.('change',update)},[]);
 const flow=useMemo(()=>({rows,reduced:reduced||skip,started}),[reduced,skip,started]);
 useEffect(()=>{
  if(!started||reduced||skip)return;
  const timer=setInterval(()=>{
   const ordered=[...rows.current.values()].filter(x=>x.node?.isConnected).sort((a,b)=>(a.node.compareDocumentPosition(b.node)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1);
   const active=ordered.find(x=>x.count<x.length);
   if(active?.ready){active.count=Math.min(active.length,active.count+5);active.setCount(active.count)}
  },32);
  return()=>clearInterval(timer);
 },[started,reduced,skip]);
 return <Flow.Provider value={flow}><button className="reading-control" type="button" onClick={()=>setSkip(true)} hidden={reduced||skip}>Show full essay without typing</button>{children}</Flow.Provider>
}
export function TypedP({children,ready=true,...props}){
 const flow=useContext(Flow);const ref=useRef(null);const row=useRef({count:0,length:0,node:null,setCount:null});const [count,setCount]=useState(0);
 const length=textLength(children);row.current.length=length;row.current.ready=ready;row.current.setCount=setCount;
 useEffect(()=>{if(!flow)return;const key=ref.current;row.current.node=key;flow.rows.current.set(key,row.current);return()=>flow.rows.current.delete(key)},[flow]);
 if(!flow)return <p {...props}>{children}</p>;
 const full=flow.reduced;
 const visible=full||(flow.started&&(count>0||length===0));
 return <p {...props} ref={ref} className={`${props.className||''} live-prose ${visible?'':'prose-awaiting'}`} aria-live="off">{full||count>=length?children:reveal(children,{left:count})}{!full&&count>0&&count<length?<span className="typing-cursor" aria-hidden="true">▏</span>:null}</p>
}
