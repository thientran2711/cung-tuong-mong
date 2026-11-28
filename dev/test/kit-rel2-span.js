/* review/kit-rel2-span (KIT §49.1): a kitRel2 with ONE direction fills the whole row (no empty half); two directions stay two equal columns.
   usage: node dev/test/kit-rel2-span.js <url> [WxH,...]   (no game start needed: the part is rendered into a probe div) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));
const [,,URL,SIZES]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820,390x844').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitRel2==='function',null,{timeout:240000});
  const m=await p.evaluate(()=>{const out={};const mk=(id,w,cols,o)=>{const d=document.createElement('div');d.id=id;d.style.cssText='position:fixed;left:0;top:0;width:'+w+'px;background:#fff;z-index:99999';d.innerHTML=kitRel2(cols,o);document.body.appendChild(d);return d};
   const one=[{head:'Nàng → ta',dir:'them',rows:[{w:'Thiện cảm',now:12,d:0,kind:'good'},{w:'Oán',now:3,d:0,kind:'bad'}]}];
   const two=one.concat([{head:'Ta → nàng',dir:'me',rows:[{w:'Thiện cảm',now:20,d:0,kind:'good'}]}]);
   for(const w of [220,300,460,640]){const a=mk('a'+w,w,one),c=mk('c'+w,w,two);const R=e=>e.getBoundingClientRect();
    const wa=R(a.querySelector('.kr2w')),ba=R(a.querySelector('.kr2b'));const bc=[...c.querySelectorAll('.kr2b')].map(R);
    out[w]={oneFull:Math.abs(ba.width-wa.width)<=2,two:bc.length===2&&Math.abs(bc[0].height-bc[1].height)<=2&&(w<=260?bc[0].width>=wa.width-2:Math.abs(bc[0].width-bc[1].width)<=2),oneW:Math.round(ba.width),wrapW:Math.round(wa.width)}}
   return out});
  const fails=Object.entries(m).filter(([w,v])=>!v.oneFull||!v.two);const ok=!fails.length&&!errs.length;if(!ok)bad++;
  console.log(wh,ok?'PASS':'FAIL',JSON.stringify(m),errs.join('|'));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
