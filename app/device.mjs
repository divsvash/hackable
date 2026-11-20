const safe=fn=>{try{return fn()}catch{return null}};
const short=value=>typeof value==='string'&&value.trim()?value.trim().slice(0,500):null;
const positive=value=>Number.isFinite(value)&&value>0?value:null;
export function readDevice(nav){
 return {
  userAgent:safe(()=>short(nav.userAgent)),
  platform:safe(()=>short(nav.userAgentData?.platform || nav.platform)),
  logicalProcessors:safe(()=>positive(nav.hardwareConcurrency)),
  memoryGiB:safe(()=>positive(nav.deviceMemory)),
  touchPoints:safe(()=>Number.isInteger(nav.maxTouchPoints)&&nav.maxTouchPoints>=0?nav.maxTouchPoints:null)
 };
}
export function readGraphics(doc){
 let gl;
 try{
  gl=doc.createElement('canvas').getContext('webgl',{antialias:false});
  if(!gl)return {status:'unavailable',renderer:null,vendor:null};
  const ext=gl.getExtension('WEBGL_debug_renderer_info');
  if(!ext)return {status:'limited',renderer:null,vendor:null};
  return {status:'reported',renderer:short(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)),vendor:short(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL))};
 }catch{return {status:'unavailable',renderer:null,vendor:null}}
 finally{safe(()=>gl?.getExtension('WEBGL_lose_context')?.loseContext())}
}
