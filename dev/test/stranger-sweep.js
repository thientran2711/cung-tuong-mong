/* review/kit-fig2: owner 11/15 stranger rule — a consort Ta has NOT met (listed by name, k61 level 3, no S.met, not the same palace)
   is a grey silhouette in EVERY avatar / figure renderer. usage: node dev/test/stranger-sweep.js <build url> [outdir]
   For one unmet consort U it renders through each kit renderer and checks that U's real face / figure file never appears and the kit
   stranger art (img/kit/unknown-*) does: mdH (all sizes: strips, news rows, chips), pcPort (person card / Ân oán), pframe, kitFace→mdH,
   kitFigOf + kitStageFig (event dialogs, week book), a live person dialog (32.7), the week book person page (j87 kbk), the Ân oán panel +
   both strips, the Hậu cung Phi tần strip + card, and a "Tin trong cung" news row. Then marks U as met and checks her face comes back. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,URL,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 const res=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
  const L=liveRivals(true);L.forEach(v=>{try{S.known[kOf61(v)]=3}catch(e){}});kn();
  const U=L.filter(v=>!v.queen&&!sameHouse(S,v))[0];if(!U)return{err:'no candidate'};delete S.met[U.id];
  /* her real art: render once as met */
  S.met[U.id]=1;const realFace=(mdH(pv(U),'sm').match(/src="([^"]+)"/)||[])[1]||'';const realFig=kitFigOf(U);delete S.met[U.id];
  const real=[realFace,realFig].filter(Boolean).map(s=>s.replace(/^.*\//,''));
  const R={U:U.name,real,checks:{}};const chk=(k,html)=>{html=String(html||'');R.checks[k]={leak:real.some(f=>html.includes(f)),sil:/unknown-/.test(html)}};
  chk('mdH xs',mdH(pv(U),'xs'));chk('mdH sm',mdH(pv(U),'sm'));chk('mdH big',mdH(pv(U),'big'));chk('pcPort',pcPort(pv(U)));chk('pframe',pframe(pv(U)));
  chk('kitFace→mdH',mdH(kitFace(U),'sm'));chk('kitFigOf',kitFigOf(U));chk('kitStageFig',typeof kitStageFig==='function'?kitStageFig(U):'');
  /* (the live person dialog moved to the end: since review/face-reveal a dialog that SHOWS her reveals her face) */

  /* live: Ân oán with U as X */
  tab='rel';relSel=U.id;PG.rel=null;render();await W(300);chk('Ân oán panel+strips',document.getElementById('panel').innerHTML);
  /* live: Hậu cung Phi tần strip + card on U */
  tab='rv';const i=rivals.indexOf(U);if(i>=0)PG.rv=i;render();await W(300);chk('Hậu cung strip+card',document.getElementById('panel').innerHTML);
  /* week book person page */
  try{if(typeof kitBook==='function'&&typeof wkPersonPage==='function'){}}catch(e){}
  try{const h=typeof personBody==='function'?personBody({who:U},false):'';if(h)chk('week book person',h)}catch(e){}
  /* news row: the kit fact row with her face */
  try{if(typeof kitFacts==='function')chk('news row (kitFacts)',kitFacts([{who:U,t:`${U.name} được ban thưởng.`}]))}catch(e){}
  /* news / Tuần lục rows (kitFacts): the face of each row = the person named first, the SAME src + rank colour as her Hậu cung strip tile */
  {const M=L.filter(v=>v!==U);M.forEach(v=>S.met[v.id]=1);const out=[];
   for(let i=0;i+1<M.length&&i<8;i+=2){const A=M[i],B=M[i+1];for(const [x,y] of [[A,B],[B,A]]){const h=kitFacts([`${kitTitle(x)} ${x.name} tặng quà cho ${kitTitle(y)} ${y.name}.`],{group:false});
     const src=(h.match(/<img[^>]*src="([^"]+)"/)||[])[1]||'';const col=(h.match(/--c:([^;"]+)/)||[])[1]||'';
     const ref=mdH(pv(x),'sm');const rsrc=(ref.match(/<img[^>]*src="([^"]+)"/)||[])[1]||'';const rcol=(ref.match(/--c:([^;"]+)/)||[])[1]||'';
     out.push({who:x.name,ok:src===rsrc&&col===rcol,src:src.replace(/^.*\//,''),strip:rsrc.replace(/^.*\//,''),col,rcol})}}
   R.newsRows={n:out.length,bad:out.filter(o=>!o.ok)}}
  /* review/face-reveal (owner 15/11 ~21:00Z): an event dialog that SHOWS her reveals her — the dialog itself draws her real face/figure,
     she counts as met, and every renderer shows her face afterwards */
  /* review face-reveal r1: an optional event that j68 evGate HOLDS (never drawn) must not reveal her */
  {const d0=E68S.day;E68S.day=-1;Q.push({t:'Có người đến',opt:1,who:pv(U),stage:[U],h:'<p>Một phi tần sang chơi.</p>',opts:[{n:'Tiếp',fx:{},x:'',go:()=>{}}]});showModal();await W(300);
   R.heldNoReveal={shown:!document.getElementById('modal').hidden,met:S.met[U.id]!=null,st:k61St(U)};E68S.day=d0;EVHOLD.length=0;Q.length=0;document.getElementById('modal').hidden=true}
  {Q.push({t:'Có người đến',must:1,who:pv(U),stage:[U],h:'<p>Một phi tần sang chơi.</p>',opts:[{n:'Tiếp',fx:{},x:'',go:()=>{}}]});showModal();await W(900);
   const h=document.getElementById('modal').innerHTML;R.dialogReveal={shown:!document.getElementById('modal').hidden,face:real.some(f=>h.includes(f)),sil:/unknown-/.test(h),met:S.met[U.id]!=null,after:!/unknown-/.test(mdH(pv(U),'sm'))};
   Q.length=0;document.getElementById('modal').hidden=true;delete S.met[U.id]}
  /* met again → her face returns */
  S.met[U.id]=1;{const h=mdH(pv(U),'sm');R.metAgain={face:!/unknown-/.test(h),fig:(kitFigOf(U)||'').includes(real[1]||'@@'),src:(h.match(/src="([^"]+)"/)||[])[1]}};delete S.met[U.id];render();
  return R});
 if(OUT)await p.screenshot({path:`${OUT}/stranger-sweep.jpg`,type:'jpeg',quality:70});
 console.log(JSON.stringify({res,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
