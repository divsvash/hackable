export async function digestBytes(bytes,subtle){
 if(!subtle)throw Error('Hash API unavailable');
 const result=await subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(result),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function canvasSample(doc,subtle){
 try{
  const canvas=doc.createElement('canvas');canvas.width=260;canvas.height=70;
  const ctx=canvas.getContext('2d');if(!ctx)return {status:'unavailable'};
  ctx.fillStyle='#ff4da6';ctx.fillRect(0,0,260,70);
  ctx.font='19px serif';ctx.fillStyle='#000';ctx.fillText('a mirror, not an attack. 0123',8,30);
  ctx.globalCompositeOperation='multiply';ctx.fillStyle='#2f78b7';ctx.beginPath();ctx.arc(210,39,24,0,Math.PI*2);ctx.fill();
  const bytes=ctx.getImageData(0,0,260,70).data;
  const hash=await digestBytes(bytes,subtle);
  return {status:'reported',hash};
 }catch{return {status:'unavailable'}}
}
export async function audioSample(OfflineContext,subtle,{timeoutMs=2500}={}){
 if(!OfflineContext||!subtle)return {status:'unavailable'};
 let timer,oscillator,compressor;
 try{
  const ctx=new OfflineContext(1,4096,44100);
  oscillator=ctx.createOscillator();oscillator.type='triangle';oscillator.frequency.value=10000;
  compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-45;compressor.knee.value=30;compressor.ratio.value=12;compressor.attack.value=0;compressor.release.value=.25;
  oscillator.connect(compressor);compressor.connect(ctx.destination);oscillator.start(0);oscillator.stop(4096/44100);
  const result=await Promise.race([ctx.startRendering(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Timed out')),timeoutMs)})]);
  const samples=result.getChannelData(0);
  const bytes=new ArrayBuffer(samples.length*4);const view=new DataView(bytes);
  for(let i=0;i<samples.length;i++)view.setFloat32(i*4,samples[i],true);
  return {status:'reported',hash:await digestBytes(bytes,subtle)};
 }catch{return {status:'unavailable'}}
 finally{clearTimeout(timer);try{oscillator?.disconnect();compressor?.disconnect()}catch{}}
}
