import {isIPAddressValue} from './lookup.mjs';
export function candidateInfo(candidate){
 const parts=String(candidate.candidate||'').trim().split(/\s+/);
 const type=candidate.type || parts[parts.indexOf('typ')+1];
 const address=candidate.address || parts[4];
 if(!['host','srflx','prflx','relay'].includes(type))return null;
 if(typeof address!=='string'||address.length>160)return null;
 const mdns=/^[a-z0-9-]+\.local\.?$/i.test(address);
 if(!mdns&&!isIPAddressValue(address))return null;
 return {type,address,kind:mdns?'mdns':'ip'};
}
export function localCandidates(PeerConnection,{timeoutMs=3000,signal}={}){
 return new Promise(resolve=>{
  let pc,timer,done=false;const rows=[];
  const finish=status=>{if(done)return;done=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);try{pc?.close()}catch{}resolve({status,candidates:rows})};
  const abort=()=>finish('cancelled');
  if(!PeerConnection){finish('unsupported');return}
  if(signal?.aborted){finish('cancelled');return}
  try{
   pc=new PeerConnection({iceServers:[]});
   timer=setTimeout(()=>finish('timeout'),timeoutMs);
   signal?.addEventListener('abort',abort,{once:true});
   pc.onicecandidate=event=>{
    if(done)return;
    if(!event.candidate){finish('complete');return}
    const row=candidateInfo(event.candidate);
    if(row&&rows.length<24&&!rows.some(x=>x.type===row.type&&x.address===row.address))rows.push(row);
   };
   pc.onicegatheringstatechange=()=>{if(pc.iceGatheringState==='complete')finish('complete')};
   pc.createDataChannel('local-observation');
   Promise.resolve(pc.createOffer()).then(offer=>{if(!done)return pc.setLocalDescription(offer)}).catch(()=>finish('unavailable'));
  }catch{finish('unavailable')}
 });
}
