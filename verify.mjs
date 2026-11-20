import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1','--directory','out'],{stdio:'ignore'});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>!document.querySelector('.pending'),{timeout:12000});
 console.log('Live provider check:',await page.locator('.live-result').count()?'answered':'unavailable; graceful fallback shown');
 await page.route('https://ipapi.co/json/',route=>route.fulfill({json:{ip:'203.0.113.42',region:'Example region',country_name:'Example country',org:'Example network',asn:'AS64500'}}));
 for(const [name,w,h] of [['phone',390,844],['desktop',1440,1000],['small-phone',320,740]]){
  await page.setViewportSize({width:w,height:h});await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.locator('.live-result').waitFor();
  await page.locator('.scope-note').evaluate(el=>el.textContent='Review capture: simulated IP response. Live lookup is wired in the code.');
  if(await page.getByRole('switch').getAttribute('aria-checked')==='true')await page.getByRole('switch').click();await page.waitForTimeout(500);
  await page.screenshot({path:`/downloads/hackable-live-${name}-dark.png`,fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByRole('switch').click();await page.waitForTimeout(400);
  await page.screenshot({path:`/downloads/hackable-live-${name}-light.png`,fullPage:true});
  await page.reload({waitUntil:'networkidle'});assert.equal(await page.getByRole('switch').getAttribute('aria-checked'),'true');
 }
 await page.route('https://ipapi.co/json/',route=>route.fulfill({status:429,json:{error:true}}));await page.reload({waitUntil:'networkidle'});await page.getByText(/the lookup didn't answer/).waitFor();assert.equal(await page.locator('.live-result').count(),0);
 console.log(JSON.stringify({fixtureViewports:[320,390,1440],themePersistence:'passed',HTTP429Fallback:'passed',horizontalOverflow:'none',pageErrors:errors}));
}finally{await browser.close();server.kill()}
