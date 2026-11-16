/* review/origin-intros (reviewer r1: each panel is the kit story card — picture band #mb > .kdlgart, text in #mb): every origin, one road: new life → intro panels (kit scene panel, picture frame with §59 fallback, n/N, last panel
   kitTiles) → the selection named for its road (consorts "Tuyển chọn", hòa thân "Lễ ra mắt", cn "Xét phong danh phận", cnv "Tuyển cung nữ")
   → "Để tài nghệ quyết định" → "Nhập cung" card with a "Vì sao" row → entry scene (ONE button) → the first day (two buổi played).
   Home road (road=nha): panels 1, 2, h3 then the home road's own first card; the reason is checked by forcing the road's entry
   (tiểu thư kcEnter via kcDien, kc2 kc2Enter) — the home years themselves are covered by dev/test/kc-roads/*.
   usage: node flow.js <url> [WxH] [shotdir|-] [origins,comma] [cung|nha] */
const {chromium}=require('playwright');const URL=process.argv[2];const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);const SH=process.argv[4]&&process.argv[4]!=='-'?process.argv[4]:'';
const OR=(process.argv[5]||'tt,dtq,muoi,cn,nc,bd,thd,ch,td,cnv').split(',');const ROAD=process.argv[6]||'cung';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const HEAD={nc:'Lễ ra mắt',bd:'Lễ ra mắt',cn:'Xét phong danh phận',cnv:'Tuyển chọn'};
(async()=>{const b=await chromium.launch();const out=[];let bad=0;
 for(const o of OR){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('.kmov.kcf').forEach(o=>{const b=o.querySelector('.kmend,button');if(b)b.click();else o.click()})},300)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<600&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(500);await skip();
  const R={o,road:ROAD};const f=[];if(await p.evaluate(()=>S.origin.k)!==o){f.push('origin not rolled');R.fail=f;bad++;out.push(R);await c.close();continue}
  const hasHome=await p.evaluate(r=>{const b=document.querySelector(`#modal [data-kcp="${r}"]`);if(b){b.click();return 1}return 0},ROAD);await sleep(600);
  if(ROAD==='nha'&&!hasHome){R.skip='no home road';out.push(R);await c.close();continue}
  for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>document.querySelector('#modal button[data-nl="ok"]').click());await sleep(1200);
  R.q0=await p.evaluate(()=>Q.map(m=>m.t+(m.oiP?'#'+m.oiP:'')));
  /* the intro panels */
  const want=ROAD==='nha'?3:4;const pan=[];
  for(let i=0;i<want+1;i++){for(let w=0;w<120&&await p.evaluate(()=>{const im=document.querySelector('#modal #mb > .kdlgart figure.ksart img')||document.querySelector('#modal figure.ksart img');return !(im&&im.complete&&im.naturalWidth)});w++)await sleep(250);
   const s=await p.evaluate(()=>{const m=Q[0];if(!m||!m.oiP)return null;const M=document.getElementById('modal');const d=M.querySelector('.dlg');const fig=d&&(d.querySelector('#mb > .kdlgart figure.ksart')||d.querySelector('figure.ksart'));const img=fig&&fig.querySelector('img');const shown=!!(img&&img.complete&&img.naturalWidth);
     const r=d.getBoundingClientRect();return{n:m.oiP,t:m.t,scene:!!d.querySelector('#mb > .kdlgart'),sub:(d.querySelector('.kph')||{}).innerText||'',fig:!!fig,src:img?img.getAttribute('src'):'',shown,txt:(d.querySelector('#mb')||{}).innerText||'',tiles:d.querySelectorAll('.kst-tile').length,
      btn:(document.getElementById('mclose')||{}).textContent||'',fit:r.bottom<=innerHeight+1&&r.right<=innerWidth+1&&r.top>=-1,ovx:document.documentElement.scrollWidth>innerWidth+1}});
   if(!s)break;pan.push(s);if(SH&&(s.n===1||s.n===want))await p.screenshot({path:`${SH}/oi-${o}-${ROAD}-${s.n}-${W}.jpg`,type:'jpeg',quality:50});
   await p.evaluate(()=>document.getElementById('mclose').click());await sleep(500)}
  R.panels=pan.map(x=>({n:x.n,src:x.src.replace(/^.*img\//,'img/'),btn:x.btn,tiles:x.tiles,fit:x.fit}));
  if(pan.length!==want)f.push(`panels ${pan.length}/${want}`);
  pan.forEach((x,i)=>{if(!x.scene)f.push('no kit picture band '+x.n);if(!x.fig)f.push('no picture frame '+x.n);if(!/img\/(intro\/|ph-event)/.test(x.src)||!x.shown)f.push('picture '+x.src+(x.shown?'':' not shown'));if(!x.txt||x.txt.length<20)f.push('no narration '+x.n);
   if(!x.fit)f.push('panel off screen '+x.n);if(x.ovx)f.push('h-overflow '+x.n);if(/\d+\s*%|undefined|NaN|\$\{/.test(x.txt))f.push('bad text '+x.n);if(i===pan.length-1&&x.tiles!==4)f.push('last tiles '+x.tiles);if(i<pan.length-1&&x.btn!=='Tiếp theo')f.push('btn '+x.btn)});
  if(ROAD==='nha'){R.next=await p.evaluate(()=>Q[0]&&Q[0].t);if(!R.next||/^Tiền truyện/.test(R.next))f.push('home card after panels '+R.next);
   /* force the road's entry to check the reason row (home years are kc-roads' tests) */
   R.entry=await p.evaluate(()=>{try{Q.length=0;const K=S.kc;if(K.kd){K.ex={art:"",play:1};kc2Enter(5)}else{K.so=1;K.soOk=1;K.tt={raw:6};kcDien("duc")}
     const m=Q.find(x=>/^Nhập cung|Trả thẻ/.test(x.t||"")||x.pid==="kcE");return{t:m&&m.t,why:K.ex?K.ex.why:K.tt.why,row:!!(m&&/Vì sao/.test(String(m.h||m.pp&&'')))}}catch(e){return{err:String(e)}}});
   if(!R.entry||!R.entry.why)f.push('no reason (home)');
   if(errs.length)f.push('errors');R.fail=f;R.errs=errs.slice(0,3);if(f.length)bad++;out.push(R);await c.close();continue}
  /* the selection card */
  const sel=await p.evaluate(()=>{const m=Q[0];if(!m||m.pid!=='kc2Sel')return null;return{t:m.t,h:String(m.h).replace(/<[^>]+>/g,'').slice(0,200),n:m.opts.length}});R.sel=sel;
  if(!sel)f.push('no selection card');else{const w=HEAD[o]||'Tuyển chọn';if(o!=='cnv'&&sel.t!==w)f.push('selection title '+sel.t);
   await p.evaluate(()=>chooseM(0));await sleep(1500);
   const fr=await p.evaluate(()=>{const d=document.getElementById('kg82');return d?d.innerText.slice(0,1500):null});if(!fr)f.push('no exam frame');else{R.head=fr.split('\n').find(l=>/Lễ ra mắt|Xét phong|Tuyển/.test(l))||'';
    if((o==='nc'||o==='bd')&&!/Lễ ra mắt/.test(fr))f.push('exam head');if(o==='cn'&&!/Xét phong/.test(fr))f.push('exam head cn');
    await p.evaluate(()=>document.getElementById('kg82skip').click());await sleep(500);await p.evaluate(()=>{const b=document.getElementById('kg82ok');if(b)b.click()});await sleep(1200)}}
  const st=await p.evaluate(()=>({top:S.origin.r||0,rank:S.rank,srv:!!S.srv,tier:S.selx&&S.selx.tier,why:S.selx&&S.selx.why}));Object.assign(R,st);if(!st.why)f.push('no reason');
  for(let i=0;i<8;i++){const t=await p.evaluate(()=>Q[0]&&Q[0].t);if(!t)break;if(/^Nhập cung/.test(t)){const full=await p.evaluate(()=>String(Q[0].h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));const wi=full.indexOf('Vì sao');R.card=wi>=0?full.slice(wi,wi+160):full.slice(0,200);
    if(wi<0)f.push('no Vì sao row');if(SH)await p.screenshot({path:`${SH}/oi-${o}-card-${W}.jpg`,type:'jpeg',quality:50});await p.evaluate(()=>document.getElementById('mclose').click());break}
   await p.evaluate(()=>{const m=Q[0];if(m.opts)chooseM(0);else document.getElementById('mclose').click()});await sleep(500)}
  for(let i=0;i<12&&!await p.evaluate(()=>!!document.getElementById('kprevov'));i++)await sleep(500);
  if(!await p.evaluate(()=>!!document.getElementById('kprevov')))f.push('no entry scene');else{await sleep(2200);await p.evaluate(()=>document.querySelector('#kprevov button').click());await sleep(800)}
  /* the first day: close what is left, play two buổi */
  for(let i=0;i<10;i++){const n=await p.evaluate(()=>{if(!Q.length)return 0;const m=Q[0];if(m.opts)chooseM(0);else{const b=document.getElementById('mclose');if(b)b.click();else Q.shift()}return 1});if(!n)break;await sleep(400)}
  R.day=await p.evaluate(()=>{const t0=S.turn,b0=S.buoi;try{for(let i=0;i<2;i++){Q.length=0;nextBuoi()}}catch(e){return{err:String(e)}}return{b0,b1:S.buoi,t0,t1:S.turn,dead:S.dead}});
  if(!R.day||R.day.err)f.push('first day '+(R.day&&R.day.err));
  if(errs.length)f.push('errors');R.fail=f;R.errs=errs.slice(0,3);if(f.length)bad++;out.push(R);await c.close()}
 console.log(JSON.stringify(out,null,1));console.log(bad?`FAIL ${bad}/${out.length}`:`PASS ${out.length}/${out.length}`);await b.close();process.exit(bad?1:0)})();
