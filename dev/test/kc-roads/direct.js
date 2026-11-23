/* main s12 (16/11): "Vào cung ngay" goes through the selection too (OD:L1250). For every origin: new life → "Vào cung ngay" → Nhận thân phận →
   the "Tuyển chọn" card comes before "Nhập cung" → answer (wait / play-skip) → rank within [ceiling−2, ceiling] (cnv: a palace maid, maybe
   Tân Giả khố) and the "Nhập cung" card says the real rank; an origin whose ceiling is Đáp ứng has no selection. usage: node direct.js <url> [WxH] */
const {chromium}=require('playwright');const URL=process.argv[2];const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const out=[];let bad=0;
 for(const o of (process.env.ORIGINS||'tt,dtq,muoi,cn,nc,bd,pf,thd,ch,td,cnv').split(',')){/* bd added (review/bd-roads): Bắc Địch's own roads */const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<400&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(500);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="cung"]');if(b)b.click()});await sleep(600);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>document.querySelector('#modal button[data-nl="ok"]').click());await sleep(1200);
  await p.evaluate(()=>{/* review/entry-exam: the Tiền truyện card comes first */if(Q[0]&&Q[0].entI){const b=document.getElementById('mclose');if(b)b.click()}});await sleep(500);
  const r=await p.evaluate(()=>{const R={o:S.origin.k,top:S.origin.r||0,first:(Q.find(m=>!m.oiP)||{}).t/* review oi-r1: the origin intro panels (oiP) come first since origin-intros */,Q:Q.map(m=>m.t),rank0:S.rank};
   if(Q[0]&&Q[0].pid==='kc2Sel'){R.opts=Q[0].opts.map(x=>x.n);chooseM(Q[0].opts.length-1)}
   R.rank=S.rank;R.sel=S.selx||null;R.srvT=typeof srvTitle==='function'&&S.srv?srvTitle():'';const n=Q.find(m=>/^Nhập cung/.test(m.t));R.card=n?String(n.h).replace(/<[^>]+>/g,'').slice(0,260):'';R.Q2=Q.map(m=>m.t);R.road=S.st&&S.st.f14?S.st.f14.road:null;return R});
  await sleep(400);
  const f=[];const SEL={nc:'Lễ ra mắt',bd:'Lễ ra mắt',pf:'Lễ ra mắt',cn:'Xét phong danh phận'}[o]||'Tuyển chọn';/* review oi-r1: the selection is named for its road (origin-intros) */if(o==='cnv'){if(r.first!==SEL)f.push('no selection');if(!r.srvT)f.push('not a maid')}else if(r.top>0){if(r.first!==SEL)f.push('no selection');if(!(r.rank<=r.top&&r.rank>=Math.max(0,r.top-2)))f.push('rank '+r.rank);if(!r.card.includes(r.rank===r.top?'':'thân phận cho tới'))f.push('card')}else if(r.first!==SEL)f.push('no selection at ceiling 0 (entry-exam: every origin meets it)');
  if(o==='bd'&&!['bd_san','bd_soi','bd_tuyet','bd_hen'].includes(r.road))f.push('bd road '+r.road);/* a new bd life rolls one of its own 4 roads, never an old premise */
  if(o==='pf'&&!['pt_hai','pt_su','pt_tang','pt_dang'].includes(r.road))f.push('pf road '+r.road);/* review/phutang-road: a Phù Tang life rolls one of its own roads */
  if(errs.length)f.push('errors');r.fail=f;r.errs=errs.slice(0,3);if(f.length)bad++;out.push(r);await c.close()}
 console.log(JSON.stringify(out,null,1));await b.close();process.exit(bad?1:0)})();
