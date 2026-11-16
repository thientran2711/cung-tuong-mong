/* review/outside-r2-r1: home-road guards (FAIL 3, FAIL 4, OWNER #8).
   usage: node dev/test/outside/kc-end.js <site url> [WxH@dpr]
   1 every way a home life ends (marriage, nunnery, rare end, kcDie, a bare palace die() at home) sets S.kc.end before the end card;
     the end card's "Đầu thai kiếp sau" makes a NEW life (no S.kc) that plays on with no page error.
   2 entry into the palace drops every queued home dialog (a stale Phúc tuyển card) and a stale Phúc tuyển answer opens no mini-game.
   3 girlhood chest: Cài tóc, Y phục, Đeo tay, Đeo eo, Túi thơm filled with her girlhood things (worn), a "Rương đồ khuê các" chest shows,
     and they are still hers in the palace. Prints JSON; exit 1 on any fail. */
const {chromium}=require('playwright');const A=process.argv.slice(2);const URL=A[0];const sz=(A[1]||'755x1000@2');const SHOT=A[2]||'';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const [wh,d]=sz.split('@');const [W,H]=wh.split('x').map(Number);
 const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',reducedMotion:'reduce'});
 await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await c.newPage();await c.addInitScript(()=>{});p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const fail=[];const R={};
 await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear();localStorage.setItem('ctm-bgpause','1')}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);
 const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
 await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
 const home=async()=>{const r=await p.evaluate(()=>{try{store.set(NL_KEY,null)}catch(e){}for(let i=0;i<80;i++){if(i||!Q.length||!Q[0].nl||S.srv||!KC.ok.includes(S.origin.k)){try{store.set(NL_KEY,null)}catch(e){}Q.length=0;start()}
     if(!S.srv&&KC.ok.includes(S.origin.k)&&Q.length&&Q[0].nl)break}S.kcPick='nha';nlAccept();return{kc:isKc(),o:S.origin.k}});await sleep(800);await skip();return r};
 /* 3 chest (first home life) */
 R.h0=await home();await sleep(800);await p.evaluate(()=>{for(let i=0;i<5&&Q.length&&!(Q[0].opts&&Q[0].opts.length);i++)closeModal()});
 R.box=false;for(let i=0;i<20&&!R.box;i++){await sleep(400);R.box=await p.evaluate(()=>{const o=document.getElementById('kmrew');return !!(o&&/Rương đồ khuê các/.test(o.textContent))})}
 if(SHOT)await p.screenshot({path:SHOT,type:'jpeg',quality:60});
 R.chest=await p.evaluate(()=>{const w=wdOf(S);const worn=sl=>{const e=S.inv.find(x=>x&&x.w&&IT[x.k]&&IT[x.k].sl===sl);return e?e.k:null};
   return{tram:w.tram&&w.tram.k,tramFrom:w.tram&&w.tram.from,y:w.y&&w.y.k,yFrom:w.y&&w.y.from,wrist:worn('wrist'),waist:worn('waist'),scent:worn('scent'),lux:luxOf(S),pic:itemArt('ngocboikc')}});
 const C=R.chest;if(C.tram!=='tramngoc'||C.tramFrom!=='kc')F('chest: Cài tóc');if(!C.y||C.yFrom!=='kc')F('chest: Y phục');if(C.wrist!=='vongbackc')F('chest: Đeo tay');if(C.waist!=='ngocboikc')F('chest: Đeo eo');if(C.scent!=='tuithom')F('chest: Túi thơm');
 if(!R.box)F('chest: no "Rương đồ khuê các" box shown');if(!C.pic)F('chest: ngocboikc has no painting');
 /* 2 stale home dialogs at entry; then the girlhood things are still hers */
 R.entry=await p.evaluate(()=>{for(let i=0;i<30&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}try{const o=document.getElementById('kg82');if(o)kg82Close(true)}catch(e){}
   S.kc.soOk=1;S.kc.tt={early:false,raw:5};pushDil(mkP('kcE',{e:'phuc'}),'Phúc tuyển');pushDil(mkP('kcE',{e:'theu'}),'x');const stale=Q.find(m=>m.pp&&m.pp.e==='phuc');
   kcEnter(0);const left=Q.filter(m=>m.pid==='kcE').map(m=>m.pp.e);let mg=false;try{stale.opts[0].go()}catch(e){}mg=!!document.getElementById('kg82');
   const w=wdOf(S);return{isKc:isKc(),left,mg,tram:w.tram&&w.tram.k,inv:S.inv.filter(x=>['vongbackc','ngocboikc','tuithom'].includes(x.k)).length,lux:luxOf(S)}});
 if(R.entry.isKc)F('entry: still at home');if(R.entry.left.length)F('entry: home dialogs left in the palace '+R.entry.left);if(R.entry.mg)F('entry: stale Phúc tuyển opened the mini-game');if(R.entry.inv<3)F('entry: girlhood things lost');if(R.entry.lux.lv>1)F('entry: girlhood set is above her allowance ('+R.entry.lux.sc+'/'+R.entry.lux.bud+')');
 /* 1 endings */
 const paths={marry:"kcMarry(kcSuitor())",tu:"kcEnd('tu')",rare:"kcEnd('kcR1')",kcDie:"kcDie('Thử')",bareDie:"die('Bị hại')",suc:"(S.suc=0,kcMonth())"};
 R.end={};
 for(const [k,js] of Object.entries(paths)){await home();const r=await p.evaluate(js=>{for(let i=0;i<30&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}
    const S0=S;if(S.dead)return{pre:'died before the path'};try{eval(js)}catch(e){return{err:e.message}}const end=S0.kc&&S0.kc.end,dead=!!S0.dead;
    /* the end card → a new life */
    let guard='';try{const m=Q.find(x=>x.cls==='end');if(m){Q.length=0;Q.push(m);closeModal()}}catch(e){guard='end card: '+e.message}
    const nl=S!==S0;try{kcFix();kcWhere();render()}catch(e){guard+=' guard: '+e.message}
    return{end,dead,nl,newKc:!!S.kc,guard}},js);R.end[k]=r;
  if(r.err||r.pre)F(k+': '+(r.err||r.pre));else{if(!r.dead)F(k+': not ended');if(!r.end)F(k+': S.kc.end not set');if(!r.nl)F(k+': end card did not start a new life');if(r.guard)F(k+': '+r.guard)}
  await sleep(1200);await skip()}
 R.errs=errs;if(errs.length)F('page errors');
 function F(m){fail.push(m)}R.fail=fail;console.log(JSON.stringify(R,null,1));await b.close();process.exit(fail.length?1:0)})();
