/* KIT §39.1 — the Trân nữ seal on EVERY event frame (owner 15/11 ~20:15Z, review/cal-plus). Scan of the whole class:
   every dialog met while playing N tuần (approaches, dilemmas, news, festivals, stipend, results …) + forced kinds (approachOne ×8,
   makeDil ×8, kitPanel notice / news / intel / result / threat / reward, a festival invitation) is opened for real; per dialog:
   event? (kitSealEvIs) → exactly one .kseal-ev, inside the frame and the viewport, touching NO text line / button / picture / chip / scroller
   (re-measured with kitSealOcc), size; tool panels (calendar, rules, person card, shop) → no seal.
   usage: node dev/test/seal-events.js <index.html> [outdir] [WxH@dpr ...]   env TURNS (default 12) */
const {chromium}=require('playwright');const fs=require('fs');
const a=process.argv.slice(2);const IDX=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3'];
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');const TURNS=process.env.TURNS!=null?+process.env.TURNS:12;
(async()=>{const b=await chromium.launch();let bad=0;const tot={ev:0,tool:0,fail:0,room:0};
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
  const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById("modal").hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(1500);
  const res=await p.evaluate(async TURNS=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out=[];let shots=0;
   ['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
   const dawn=()=>{const d=document.getElementById('dawn');if(d){d.hidden=true;d.innerHTML='';document.body.classList.remove('kbk-open')}};
   const measure=async(src)=>{await sleep(1450);const M=document.getElementById('modal');if(M.hidden||!Q[0])return;/* the game's own gate (evGate) dropped it */const dlg=M.querySelector('.dlg');const m=Q[0];
    const ev=kitSealEvIs(m,dlg);const S2=dlg.querySelectorAll('.kseal-ev');const r={src,t:String(m.t||'').slice(0,40),kind:dlg.dataset.kind||'',ev,n:S2.length,f:[]};
    if(ev){if(S2.length!==1)r.f.push('seals '+S2.length);else{const s=S2[0];const q=s.getBoundingClientRect(),D=dlg.getBoundingClientRect();r.sz=Math.round(q.width);r.c=s.dataset.c;
      if(q.width<20)r.f.push('tiny');if(q.left<D.left-1||q.right>D.right+1||q.top<D.top-1||q.bottom>D.bottom+1)r.f.push(`outside frame s=${[q.left,q.top,q.width].map(Math.round)} d=${[D.left,D.top,D.width,D.height].map(Math.round)} c=${s.dataset.c}`);
      if(q.left<0||q.top<0||q.right>innerWidth||q.bottom>innerHeight)r.f.push('off screen');
      const occ=kitSealOcc(dlg,s);let ov=0;for(const o of occ){const w=Math.min(q.right,o.right)-Math.max(q.left,o.left),h=Math.min(q.bottom,o.bottom)-Math.max(q.top,o.top);if(w>0&&h>0)ov+=w*h}if(ov>0)r.f.push('covers '+Math.round(ov)+'px2')}}
    else if(S2.length)r.f.push('seal on a tool panel');
    out.push(r);return r};
   const next=()=>{const m=Q[0];if(!m)return;try{if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.disabled&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(Math.max(0,i))}else closeModal()}catch(e){Q.shift()}};
   const drain=async(src,k)=>{let g=0;while(Q.length&&g++<k){showModal();dawn();await measure(src);next();await sleep(50)}Q.length=0;document.getElementById('modal').hidden=true};
   /* forced kinds */
   for(let i=0;i<8;i++){try{const x=approachOne();if(x){Q.unshift(x);await drain('approach',1)}}catch(e){out.push({src:'approach',t:'ERR '+e.message,f:['scan error']})}}
   for(let i=0;i<8;i++){try{pushDil(makeDil());await drain('dilemma',1)}catch(e){out.push({src:'dilemma',t:'ERR '+e.message,f:['scan error']})}}
   const P=[['notice',{rows:[['Việc','Thử ấn']]}],['news',{facts:['Tin trong cung: thử.']}],['intel',{facts:['Tai mắt báo: thử.']}],['result',{facts:['Kết quả thử.']}],['threat',{facts:['Có kẻ rình.']}],['reward',{facts:['Ban thưởng thử.']}]];
   for(const [k,o] of P){kitPanel(Object.assign({kind:k,title:'Thử '+k},o),true);await drain('kitPanel '+k,1)}
   try{if(typeof j71Fest==='function'){j71Fest(Object.keys(FEST)[0]);await drain('fest',3)}}catch(e){}
   /* tool panels: must stay bare */
   kitMonthCalOpen();await measure('tool calendar');Q.length=0;document.getElementById('modal').hidden=true;
   /* play */
   for(let t=0;t<TURNS;t++){try{endTurn()}catch(e){}dawn();await drain('play',12);if(S.dead)break}
   return out},TURNS);
  const fails=res.filter(r=>r.f.length);bad+=fails.length;tot.ev+=res.filter(r=>r.ev).length;tot.tool+=res.filter(r=>!r.ev).length;tot.fail+=fails.length;tot.room+=res.filter(r=>r.c==='room').length;
  const kinds={};res.forEach(r=>{const k=(r.ev?'EV ':'tool ')+r.kind;kinds[k]=(kinds[k]||0)+1});
  console.log(SZ,'dialogs',res.length,'events',res.filter(r=>r.ev).length,'corners',JSON.stringify(res.filter(r=>r.ev).reduce((a,r)=>(a[r.c+':'+r.sz]=(a[r.c+':'+r.sz]||0)+1,a),{})),'kinds',JSON.stringify(kinds));
  if(process.env.ALL)res.forEach(r=>console.log("  ",r.ev?"EV":"--",r.src,"|",r.t,"|",r.kind,"|",r.c||"",r.sz||""));
  fails.slice(0,12).forEach(r=>console.log('  FAIL',r.src,'|',r.t,'|',r.kind,'|',r.f.join('; ')));
  if(errs.length)console.log('  page errors',errs.slice(0,5));
  if(OUT){/* one picture of a seal-wearing event dialog */await p.evaluate(()=>{Q.length=0;S.mg=0;['rtoast','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.hidden=true});document.body.classList.remove('kbk-open');let x=null;for(let i=0;i<30&&!x;i++){const y=approachOne();if(y&&y.opts)x=y}x=x||{t:'Thử',h:'<p>thử</p>',opts:[{n:'Được'}],ev:1};Q.unshift(x);showModal()});await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/seal-${SZ}.jpg`,type:'jpeg',quality:55})}
  await ctx.close()}
 console.log('TOTAL',JSON.stringify(tot),bad?'FAIL':'PASS');await b.close();process.exit(bad?1:0)})();
