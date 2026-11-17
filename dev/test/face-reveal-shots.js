/* review/face-reveal: live shots of the reveal. A new life; an unmet stranger consort U comes to talk (dialog), Thái hậu summons her,
   the Emperor summons her; then the Hậu cung strip / card with U. Checks per dialog: the person's figure is the REAL figure (no
   img/kit/unknown-*), U is met afterwards, no page errors, no horizontal overflow.
   usage: node dev/test/face-reveal-shots.js <page url> <W>x<H>@dpr [outdir] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'1180x820@1').split('@');const [W,H]=WH.split('x').map(Number);
if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 const tag=SZ.replace(/[@x]/g,'_');const R={size:SZ,cases:[]};
 const cases=[['visit','Có người đến'],['th','Thái hậu triệu kiến'],['emp','Hoàng thượng cho gọi']];
 for(const [k,t] of cases){const r=await p.evaluate(async([k,t])=>{const W=x=>new Promise(r=>setTimeout(r,x));
   const U=liveRivals(true).find(v=>!v.queen&&!sameHouse(S,v)&&!(S.met&&S.met[v.id]!=null));window.__U=window.__U||U;const V=window.__U;
   const e=k==='visit'?V:k==='th'?(S.thO=S.thO||{},S.thO):S.emp;const who=k==='visit'?pv(V):k==='th'?pTH():pEmp();
   const before={face:isKnown61(e),st:k61St(e)};
   const h=k==='visit'?'<p>Một phi tần áo bậc '+RANKS[V.rank].n+' sang chơi, ngồi chưa ấm chỗ đã hỏi chuyện ngươi.</p>':k==='th'?'<p>Thái hậu cho gọi ngươi đến Từ Ninh cung hỏi chuyện.</p>':'<p>Hoàng thượng cho gọi ngươi ra bờ Thái Dịch trì ngắm sen.</p>';
   const mm={t,who,h,opts:[{n:'Vâng',fx:{},x:'',go:()=>{}},{n:'Từ chối khéo',fx:{},x:'',go:()=>{}}]};
   /* a first-day card may still close the top dialog a moment later: put ours back until it stays */
   for(let i=0;i<4;i++){if(Q[0]!==mm){Q=Q.filter(x=>x!==mm);Q.unshift(mm)}showModal();render();await W(2500);if(Q[0]===mm&&!document.getElementById('modal').hidden)break}
   const M=document.getElementById('modal');const html=M.innerHTML;const fig=(M.querySelector('.kesimg')||{}).src||'';
   return {k,before,after:{face:isKnown61(e),st:k61St(e),met:k==='visit'?S.met[V.id]!=null:null},shown:!M.hidden,grey:/unknown-/.test(html),fig:fig.replace(/^.*\//,''),ovx:document.documentElement.scrollWidth>innerWidth+1}},[k,t]);
  if(OUT)await p.screenshot({path:`${OUT}/fr-${k}-${tag}.jpg`,type:'jpeg',quality:60});R.cases.push(r);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()})}
 /* afterwards: U in the Hậu cung strip + card */
 const af=await p.evaluate(async()=>{const W=x=>new Promise(r=>setTimeout(r,x));const V=window.__U;tab='rv';const i=rivals.indexOf(V);if(i>=0)PG.rv=i;render();await W(900);
  const P=document.getElementById('panel');return {stripGrey:/unknown-/.test(mdH(pv(V),'sm')),figGrey:/unknown-/.test(kitFigOf(V)||'')}});
 R.afterwards=af;if(OUT)await p.screenshot({path:`${OUT}/fr-hc-${tag}.jpg`,type:'jpeg',quality:60});
 R.errs=errs;console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
