import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1','--directory','out'],{stdio:'ignore'});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:8765',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [name,w,h] of [['phone',390,844],['desktop',1440,1000],['small-phone',320,740]]){
  await page.setViewportSize({width:w,height:h});
  if(await page.locator('[role=switch]').getAttribute('aria-checked')==='true')await page.getByRole('switch').click();
  await page.waitForTimeout(400);
  await page.screenshot({path:`/downloads/hackable-${name}-dark.png`,fullPage:true});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth))throw new Error(`overflow at ${w}`);
  await page.getByRole('switch').click();await page.waitForTimeout(350);
  await page.screenshot({path:`/downloads/hackable-${name}-light.png`,fullPage:true});
  await page.reload({waitUntil:'networkidle'});
  if(await page.locator('[role=switch]').getAttribute('aria-checked')!=='true')throw new Error('Theme did not persist');
 }
 console.log(JSON.stringify({viewports:[320,390,1440],themePersistence:'passed',horizontalOverflow:'none',pageErrors:errors},null,2));
}finally{await browser.close();server.kill()}
