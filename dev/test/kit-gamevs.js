/* kit-gamevs (K-PM-1, KIT §13.8) — node dev/test/kit-gamevs.js [dev/index.html] [outdir]
   kitGameVs: API (setScore/setClock/setTurn/setRound/end), no raw % or "điểm", layout stacked on html.kv1 / side by side on html.kv2 (Fold 755x1000, iPad 1180x820,
   390x844, 1510x2000), sample §13.8 on the kit page, no page errors. Shots to outdir. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL='file://'+path.resolve(URL0);const OUT=process.argv[3]||'.';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad'],[390,844,'phone'],[1510,2000,'big']]){
  const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}location.hash='#kit'});
  await p.waitForTimeout(1500);
  const r=await p.evaluate(async()=>{const sec=document.querySelector('[data-kit="§13.8"]');if(!sec)return{nosec:1};sec.scrollIntoView();await new Promise(r=>setTimeout(r,2600));
   const vs=sec.querySelector('.kgvs');if(!vs)return{novs:1};const panes=[...vs.querySelectorAll('.kgvs-pane')].map(e=>e.getBoundingClientRect());
   const opp=panes.find((_,i)=>vs.querySelectorAll('.kgvs-pane')[i].dataset.side==='opp'),me=panes.find((_,i)=>vs.querySelectorAll('.kgvs-pane')[i].dataset.side==='me');
   return{side:Math.abs(opp.top-me.top)<4&&me.left<opp.left,stack:opp.bottom<=me.top+2,txt:vs.innerText,turn:vs.dataset.turn,sc:[...vs.querySelectorAll('[data-vs=sc]')].map(e=>e.textContent),clk:[...vs.querySelectorAll('[data-vs=clk]')].map(e=>e.textContent),
    w:vs.getBoundingClientRect().width,vw:innerWidth}});
  ok(!r.nosec&&!r.novs,`${tag} sample §13.8 mounted`);
  const wide=W>=1100&&W<1400;/* kv2 spread */
  if(tag==='ipad')ok(r.side,`${tag} side by side (her left, opponent right)`);if(tag==='fold'||tag==='phone')ok(r.stack,`${tag} stacked (opp above her)`);
  ok(!/%|điểm/i.test(r.txt||''),`${tag} words: no % / điểm`);ok((r.clk||[]).every(t=>/^còn \d+ giây$/.test(t)),`${tag} clock words`,r.clk);ok(r.turn==='opp'||r.turn==='me'||r.turn==='',`${tag} turn marker`,r.turn);
  await p.evaluate(()=>document.querySelector('[data-kit="§13.8"]').scrollIntoView());await p.waitForTimeout(300);
  await p.screenshot({path:path.join(OUT,`gamevs-${tag}.png`)});
  const api=await p.evaluate(()=>{const h=document.createElement('div');document.body.appendChild(h);const v=kitGameVs({box:h,me:{name:'A'},opp:{name:'B'},oppBoard:true});v.setScore('me',5);v.setScore('opp',7);v.setClock('opp',9);v.setTurn('me');const t=h.querySelector('.kgvs').dataset.turn;v.end({win:'opp'});v.setScore('me',99);
   const o={t,me:h.querySelector('.kgvs-me [data-vs=sc]').textContent,opp:h.querySelector('.kgvs-opp [data-vs=sc]').textContent,ended:h.querySelector('.kgvs').dataset.end,res:h.querySelector('.kgvs-res').textContent,slots:!!v.me&&!!v.opp};h.remove();return o});
  ok(api.t==='me'&&api.me==='5'&&api.opp==='7'&&api.ended==='opp'&&api.slots,`${tag} API (score, turn, end locks)`,api);
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,2));await p.close()}
 await b.close();process.exit(res.every(Boolean)?0:1)})();
