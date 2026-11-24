/* robot10 E-FIX-4 proof (R3 cnv_chu schemer-4, Fold court tab: «text off screen: span.kgl.kfx x 318..1007» + «span.r x 715..804»):
   run the robot's OWN uiScan (dev/measure/robot10.js, or R10=<file>) on the court tab of the repro save. The text sits in the kit one-line person
   row (KIT §6.3h: overflow hidden, cut with «…» + a «!» that opens the full text) — she never sees the part past the row. Before: 2 off-screen rows;
   after: 0, while a REAL unclipped text pushed past the right edge is still reported.
   usage: node dev/test/r10e-offscreen-clip.js <save.json> [WxH]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [save,vpS='755x1000']=process.argv.slice(2);const [w,h]=vpS.split('x').map(Number);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const src=fs.readFileSync(process.env.R10||path.join(__dirname,'../measure/robot10.js'),'utf8');const i0=src.indexOf('function uiScan(');let d=0,j=src.indexOf('{',i0);for(;j<src.length;j++){if(src[j]==='{')d++;else if(src[j]==='}'&&!--d)break}
const UIS=src.slice(i0,j+1);
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;deser(d);try{Q.length=0;closeModal()}catch(e){}tab='court';render()},JSON.parse(fs.readFileSync(save,'utf8')));
 await p.waitForTimeout(2000);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());tab='court';render()});await p.waitForTimeout(800);await p.evaluate(s=>{window.__uis=(0,eval)('('+s+')')},UIS);
 /* the robot scans right after a render, before the kit one-line pass (kitInfoOneLine, run by an observer) has cut the row: scan in the same tick */
 const off=()=>p.evaluate(()=>{tab='court';render();return window.__uis({}).filter(x=>x.k==='offscreen-text').map(x=>x.msg+' | '+x.ex)});
 const has=await p.evaluate(()=>{const e=document.querySelector('.pc .pcf .kr>.krv.kone span.kgl.kfx, .pc .pcf .kr>.krv.kone');return !!e});
 ok(has,'the court tab shows a kit one-line person row cut with «!» (.krv.kone)');
 const r=await off();ok(r.length===0,'no «text off screen» row for text clipped inside an on-screen row',r.slice(0,4));
 /* the robot's case, built from the same kit row: a kit one-line person row (.krv, overflow hidden) holding the R3 text, in a box that does not scroll
    (in the robot's page the card body did not scroll at that moment; here it does, which hides the row from the old check). Old harness: flagged; new: not. */
 const syn=await p.evaluate(()=>{const g=document.getElementById('game');const box=document.createElement('div');box.id='r10syn';box.style.cssText='position:relative;margin-left:'+(innerWidth-435)+'px;width:400px;overflow:visible';
  box.innerHTML='<span class="krv kone" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span class="ef t"><span class="kgl kfx">Trong cung: Hoàng thượng: Ngẩng lên, đáp một câu khéo — Không thành: Ngẩng lên, đáp một câu khéo, Hoàng thượng không vừa ý</span></span></span>'
   +'<div style="white-space:nowrap"><span id="r10real">Chữ thật tràn ra ngoài màn hình, không có khung nào cắt, nàng thấy nó bị mất một nửa</span></div>';
  g.insertBefore(box,g.firstChild);const L=window.__uis({}).filter(x=>x.k==='offscreen-text').map(x=>x.msg+' | '+x.ex);box.remove();return L});
 ok(!syn.some(x=>/Trong cung/.test(x)),'kit one-line row text (clipped by its row) is not «off screen»',syn.filter(x=>/Trong cung/.test(x)));
 ok(syn.some(x=>/Chữ thật/.test(x)),'a real unclipped text past the right edge is still reported',syn.filter(x=>/Chữ thật/.test(x)));
 ok(!pe.length,'no page error',pe.slice(0,3));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
