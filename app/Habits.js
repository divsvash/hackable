'use client';
import {useState} from 'react';
import {habits,habitResponse} from './habits.mjs';
function Choice({kind}){
 const [value,setValue]=useState('unknown');const h=habits[kind];
 return <>
  <p className="habit-choice"><label htmlFor={`habit-${kind}`}>{h.label}</label>{' '}<select id={`habit-${kind}`} value={value} onChange={event=>setValue(event.target.value)}>{h.options.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select><span className="habit-local-note">Optional. Your answer stays on this page.</span></p>
  <p className="habit-response" aria-live="polite" aria-atomic="true">{habitResponse(kind,value)}</p>
 </>
}
export default function Habits(){return <div className="habits-flow"/>}
