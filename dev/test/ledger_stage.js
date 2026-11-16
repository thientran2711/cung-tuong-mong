/* PEOPLE LEDGER: the most crowded stage on each road, on the owner's devices (HOST mode, dev/test/lib/device.js).
   Walks to the place the record holds most people now (consort road thd, maid road cnv), checks: stage people = record there,
   the stage pages (j59) show every figure once, no page error, no horizontal overflow; one screenshot per device + road.
   usage: node dev/test/ledger_stage.js <outdir> [device…]   (default fold ipadAir ipadPro foldLand iphone14)  → JSON */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/tmp/ledger_stage';const DEV=process.argv.slice(3).length?process.argv.slice(3):['fold','ipadAir','ipadPro','foldLand','iphone14'];
(async()=>{fs.mkdirSync(OUT,{recursive:true});const srv=await D.serveRoot();const b=await chromium.launch();const res={};
 for(const dv of DEV)for(const o of ['thd','cnv']){const ctx=await D.newDeviceContext(b,dv);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(1500);
  /* the first-visit download cover (kload): skip like dev/test/stage-counts.js */
  for(let i=0;i<240;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"], #kload [data-kl="web"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await p.waitForTimeout(500)}
  const r=await g.evaluate(async o=>{const W=t=>new Promise(r=>setTimeout(r,t));localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__forceOrigin=o;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render();await W(600);
   const clear=()=>{let n=0;while(Q.length&&n++<30){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}};clear();
   const R=S.roster,kh=j95kh();const LK=j95lk;const cnt={};for(const id in R.P){const k=LK(R.P[id][kh][0]);if(id!=="me")cnt[k]=(cnt[k]||0)+1}
   const here=LK(S.place);const L=Object.entries(cnt).filter(([k])=>k!==J95OUT_&&k!=="ngoai").sort((a,b)=>b[1]-a[1]);let tgt=null;
   for(const [k] of L){if(k===here){tgt=k;break}if(isSrv()&&k===LK("home")){tgt="home";break}try{if(places().some(x=>x.k===k)&&accessOf(S,k).ok){tgt=k;break}}catch(e){}}
   used=0;if(tgt&&tgt!==S.place)goTo(tgt);clear();tab="act";render();await W(900);
   const R2=S.roster,kh2=j95kh(),pl=LK(S.place);let rec=0;for(const id in R2.P){const w=R2.P[id][kh2][0];if(id!=="me"&&LK(w)===pl&&j95vis(id,w))rec++}
   const st=kitHereCount();const figs=document.querySelectorAll('#stage .fig, #stage [data-pi]').length;const de=document.documentElement;
   return{place:S.place,cnt:L.slice(0,4),rec,stage:st,figs,pager:!!document.querySelector('#stage .j59pg, #stage [data-j59pg], .j59pager'),over:de.scrollWidth>de.clientWidth+1,kinds:S.visit.people.map(p=>p.kind+(p.sk?":"+p.sk:"")).join(",")}},o);
  /* full-screen moments (j93 kmhint "Chạm để bỏ qua": card flip, news beats): tap them away before the shot */
  for(let i=0,quiet=0;i<40&&quiet<3;i++){const n=await g.evaluate(()=>{let q=0;while(Q.length&&q++<30){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}
    const md=document.getElementById('modal');if(md&&!md.hidden){const x=md.querySelector('button');if(x){x.click();q++}}const h=[...document.querySelectorAll('.kmhint')].filter(x=>x.offsetParent);for(const x of h)(x.parentElement||x).click();
    const ok=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Ta biết rồi|Nhận)$/.test(x.textContent.trim()));
    for(const x of document.querySelectorAll('body *'))if(x.children.length===0&&x.offsetParent&&/^Chạm để mở$/.test((x.textContent||'').trim())){(x.closest('[role=dialog]')||x.parentElement||x).click();ok.push(x)}for(const x of ok)x.click();h.push(...ok);if(q)h.push(1);
    const ov=document.getElementById('ov');if(ov&&!ov.hidden){const bs=ov.querySelectorAll('button');if(bs.length)bs[bs.length-1].click()}return h.length}).catch(()=>0);quiet=n?0:quiet+1;await p.waitForTimeout(900)}
  const tt=await g.evaluate(()=>{tab="act";render();const m=document.querySelector('#sc-t .rmsg');const x=m&&/Ở đây (?:có|còn) (\d+) người/.exec(m.textContent);return{title:x?+x[1]:null,here:kitHereCount()}}).catch(()=>({}));
  const f=path.join(OUT,`${dv}-${o}.png`);await p.waitForTimeout(1500);await p.screenshot({path:f});r.shot=f;r.titleN=tt.title;r.hereN=tt.here;r.titleOk=tt.title==null||tt.title===tt.here;r.errs=errs.slice(0,3);res[dv+'/'+o]=r;await ctx.close()}
 console.log(JSON.stringify(res,null,1));await b.close();srv.close()})();
