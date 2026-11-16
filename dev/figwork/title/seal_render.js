// seal_render.js: renders the Trân nữ seal (KIT §39, dev/build/jseal.js) at 512 px to seal512.png (transparent) via seal_render.html; then
// python3 seal_swap.py title-tuanluc-d4.webp seal512.png title-tuanluc-d4s.webp
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:560,height:560}});
await p.goto('file://'+__dirname+'/seal_render.html');await p.waitForTimeout(300);
const el=await p.$('.kseal');await el.screenshot({path:__dirname+'/seal512.png',omitBackground:true});await b.close()})();
