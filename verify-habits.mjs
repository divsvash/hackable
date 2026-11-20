import {chromium} from 'playwright';import {spawn} from 'node:child_process';import assert from 'node:assert/strict';
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1','--directory','out'],{stdio:'ignore'});const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
try{
 const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});const requests=[],errors=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://ipapi.co/json/',r=>r.fulfill({json:{ip:'203.0.113.42',org:'Example network'}}));await page.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(3200);
 for(const kind of ['wifi','charging','usb'])assert.equal(await page.locator('#habit-'+kind).inputValue(),'unknown');
 const baseline=requests.length;
 for(const [kind,choice] of [['wifi','join'],['charging','port'],['usb','connect']]){
  const select=page.locator('#habit-'+kind);await select.selectOption(choice);await select.locator('xpath=..').scrollIntoViewIfNeeded();await page.screenshot({path:`/downloads/hackable-layer2-${kind}-dark.png`});
 }
 await page.waitForTimeout(200);assert.equal(requests.length,baseline,'habit selection sent a network request');
 for(const w of [320,390,1440]){await page.setViewportSize({width:w,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)}
 await page.setViewportSize({width:390,height:844});await page.getByRole('switch').click();await page.waitForTimeout(350);await page.locator('#habit-charging').locator('xpath=..').scrollIntoViewIfNeeded();await page.screenshot({path:'/downloads/hackable-layer2-charging-light.png'});
 await page.reload({waitUntil:'networkidle'});for(const kind of ['wifi','charging','usb'])assert.equal(await page.locator('#habit-'+kind).inputValue(),'unknown');assert.equal(await page.getByRole('switch').getAttribute('aria-checked'),'true');assert.deepEqual(errors,[]);
 console.log(JSON.stringify({unknownDefaults:'passed',threeChoices:'passed',extraRequestsOnAnswer:0,answersResetOnReload:true,themePersists:true,overflowAt3203901440:false,pageErrors:errors}));
}finally{await browser.close();server.kill()}
