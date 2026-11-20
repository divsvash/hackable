const safe=fn=>{try{return fn()}catch{return null}};
const text=x=>typeof x==='string'&&x?x.slice(0,80):null;
const estimate=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0?x:null;
export function readConnection(nav,location,secureContext){
 const network=safe(()=>nav.connection||nav.mozConnection||nav.webkitConnection);
 return {
  supported:Boolean(network),
  type:safe(()=>text(network?.type)),
  effectiveType:safe(()=>text(network?.effectiveType)),
  downlink:safe(()=>estimate(network?.downlink)),
  rtt:safe(()=>estimate(network?.rtt)),
  saveData:safe(()=>typeof network?.saveData==='boolean'?network.saveData:null),
  protocol:safe(()=>text(location.protocol)),
  secureContext:typeof secureContext==='boolean'?secureContext:null
 };
}
