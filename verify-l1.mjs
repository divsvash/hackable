import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1','--directory','out'],{stdio:'ignore'});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},locale:'en-GB',timezoneId:'Etc/UTC'});
 const errors=[],requests=[],permissionCalls=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push({url:r.url(),method:r.method(),body:r.postData()}));
 await page.exposeFunction('recordPermission',name=>permissionCalls.push(name));
 await page.addInitScript(()=>{
  if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia=()=>{window.recordPermission('getUserMedia');throw Error('Unexpected media request')};
  navigator.geolocation.getCurrentPosition=()=>{window.recordPermission('geolocation');throw Error('Unexpected location request')};
 });
 await page.route('https://ipapi.co/json/',r=>r.fulfill({json:{ip:'203.0.113.42',org:'Example network',country_name:'Example country'}}));
 await page.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.waitForFunction(()=>document.querySelector('.rtc-result')?.textContent.includes('This run')&&document.querySelector('.canvas-result')?.textContent.includes('This run produced'));
 await page.waitForTimeout(2800);
 const result=await page.evaluate(()=>({canvas:document.querySelector('.canvas-result').textContent,rtc:document.querySelector('.rtc-result').textContent,graphics:document.querySelector('.graphics-result').textContent}));
 assert.match(result.canvas,/[a-f0-9]{64}/);assert.match(result.rtc,/candidate/);
 for(const url of requests.map(x=>x.url))assert.ok(url.startsWith('http://127.0.0.1:8765/')||url==='https://ipapi.co/json/','Unexpected external request');
 assert.equal(requests.filter(x=>x.url==='https://ipapi.co/json/').length,1);assert.equal(requests.find(x=>x.url==='https://ipapi.co/json/').body,null);
 assert.deepEqual(permissionCalls,[]);assert.deepEqual(errors,[]);
 await page.locator('.scope-note').evaluate(el=>el.textContent='Review capture: example IP; other readings from this test browser.');
 for(const [selector,name] of [['.graphics-result','device'],['.canvas-result','fingerprint'],['.rtc-result','rtc'],['.connection-result','network']]){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.screenshot({path:`/downloads/hackable-l1-${name}-dark.png`});
 }
 await page.getByRole('switch').click();await page.waitForTimeout(400);
 await page.locator('.rtc-result').scrollIntoViewIfNeeded();await page.screenshot({path:'/downloads/hackable-l1-rtc-light.png'});
 const restricted=await browser.newPage({viewport:{width:320,height:740}});
 await restricted.addInitScript(()=>{Object.defineProperty(window,'RTCPeerConnection',{value:undefined});Object.defineProperty(window,'OfflineAudioContext',{value:undefined});Object.defineProperty(window,'webkitOfflineAudioContext',{value:undefined});HTMLCanvasElement.prototype.getContext=()=>null});
 await restricted.route('https://ipapi.co/json/',r=>r.abort());await restricted.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});await restricted.waitForTimeout(500);
 assert.match(await restricted.locator('.rtc-result').textContent(),/unsupported/);assert.match(await restricted.locator('.canvas-result').textContent(),/unavailable/);assert.ok(await restricted.locator('.browser-result').isVisible());assert.equal(await restricted.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 console.log(JSON.stringify({actualCanvasDigest:true,actualICECandidateOutcome:true,onlyExternalRequest:'one ipapi GET, no request body',permissionsRequested:permissionCalls,restrictedFeatureFallbacks:'passed',pageErrors:errors},null,2));
}finally{await browser.close();server.kill()}
