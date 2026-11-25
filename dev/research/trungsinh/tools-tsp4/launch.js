const {chromium}=require('playwright');
(async()=>{const c=await chromium.launchPersistentContext('/tmp/ts/prof',{headless:true,args:['--remote-debugging-port=9333','--no-sandbox'],viewport:{width:430,height:900}});
const p=c.pages()[0]||await c.newPage();await p.goto('https://trungsinhgame.com');await new Promise(()=>{});})();
