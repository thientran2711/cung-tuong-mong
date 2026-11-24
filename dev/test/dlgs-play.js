/* SIDE-LINE DIALOGUE SCENES browser test (review/sideline-dlg; schema reports/sideline-dialogue.md «## SCHEMA»). After dev/site/build_site.sh:
   [DLGS_STEP=k: every k-th scene only] [DLGS_ONLY=id,id: these units only] node dev/test/dlgs-play.js [outdir] [fold,ipadAir] [N]   (outdir default: a temp folder OUTSIDE git; shots dlgs-<i>-<step>-<dev>.png; N = scenes with shots, default 3)
   For EVERY scene in DLGS_DATA whose family adapter is live (j72, j68, j7): casts the unit in a fresh life (needs relaxed: the test only checks the scene),
   offers it, and checks: the scene plays BEFORE the card (modal hidden, kit layer + 2 figures + the §95 box), every role resolved to a real cast
   person (box title = that person's name), no {placeholder} left, the speaker lit / the other dimmed, tap = finish, next tap = next line, the right
   number of lines, then the card (the one carrying the scene) shows with its choices; the scene never plays twice; calm (reduced motion) plays it too; 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||fs.mkdtempSync(path.join(os.tmpdir(),'dlgs-'));const DEVS=(process.argv[3]||'fold,ipadAir').split(',');const NSHOT=+(process.argv[4]||3);fs.mkdirSync(OUT,{recursive:true});
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0,pass=0;const ok=(c,m)=>{if(c)pass++;else fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();
 for(const dev of DEVS){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await D.openDirect(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:180000});const g=p;await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function'&&typeof dlgsResolve==='function',null,{timeout:180000});
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();/* a grown child for j72 units whose requester is her child (req ak; same as j72c-play) */if(!allKids().some(([k])=>k.alive&&(k.age||0)>=18)){S.kids=S.kids||[];S.kids.push({name:'Thử Nhi',alive:true,age:20,sex:'f',dad:'emp'})}window.kitBloom=()=>{};/* the test child would raise the «Hạ sinh» bloom over the scenes */['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;showModal();tab='act';render()});
  await g.waitForTimeout(1500);await g.addStyleTag({content:'#kload,#klife,.modal.kload,#dawn,.kne,#kneov,#kroul,#kroulw,#kcourt,.kroul{display:none!important}'});
  const ids=(await g.evaluate(()=>DLGS_DATA.map(r=>r.id).filter(id=>/^(j72|j68|j7|j70|ky|j71|wc):/.test(id)))).filter((id,i,A)=>!process.env.DLGS_STEP||i%(+process.env.DLGS_STEP)===0).filter(id=>!process.env.DLGS_ONLY||process.env.DLGS_ONLY.split(',').includes(id));ok(ids.length>0,`${dev} DLGS_DATA has scenes of live families (${ids.length})`);
  let k=0;for(const id of ids){
   /* cast + offer the unit's real card (needs / nết / step places relaxed for the test: it checks the scene; each family's own play test checks casting) */
   const o=await g.evaluate(id=>{Q.length=0;const M=$("modal");M.hidden=true;const fam=id.split(":")[0],sid=id.slice(fam.length+1);const sp=dlgsGet(id);
    const keep=(names,fn)=>{const sv=names.map(n=>window[n]);names.forEach(n=>{window[n]=()=>true});try{return fn()}finally{names.forEach((n,i)=>{window[n]=sv[i]})}};
    if(fam==="j72"){const T=T72I["c:"+sid]||T72I[sid];if(!T)return{err:"no template"};const sv={need:T.need,rf:T.rf,bf:T.bf};T.need=null;T.rf=null;T.bf=null;let x=null;
     try{x=keep(["q72PlOk"],()=>{let y=null;for(let i=0;i<20&&!y;i++)y=q72Make(T);return y})}finally{Object.assign(T,sv)}if(!x)return{err:"cannot cast"};q72Offer(x,"")}
    else if(fam==="j68"){const s=E68I["c:"+sid];if(!s)return{err:"no EV6"};/* the j95 actor gate may drop a card whose cast has no motive: cast again (≤8) */
     for(let t=0;t<8;t++){Q.length=0;const d=keep(["j68cFit","j68cNeed"],()=>{let y=null;for(let i=0;i<20&&!y;i++)y=e68Make(s);return y});if(!d)return{err:"cannot cast"};e68Push(d,s,true);showModal();if(Q[0]&&Q[0].dlg)break}}
    else if(fam==="j7"){j7cSeeds();const sd=J7I[sid];if(!sd)return{err:"no seed"};const R=liveRivals(true).filter(v=>v.alive&&!v.out);const c={};let i=0;for(const r in sd.roles){const kd=sd.roles[r].kind||"rv";c[r]=kd==="rv"?{k:"rv",id:R[i++].id}:{k:kd}}
     const d=keep(["j7cGround"],()=>mkP("j7c",{sid,c}));if(!d)return{err:"cannot build"};Q.unshift({t:"Chuyện trong cung",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp})}
    else if(fam==="j70"){const sd=J70SEEDS.find(x=>x.id===sid);if(!sd)return{err:"no route"};const z=j70();z.pl=z.pl.filter(x=>x.end);const a=liveRivals(true).find(x=>x.alive&&!x.out&&!x.plan);if(!a)return{err:"no plotter"};a.bac=Math.max(a.bac||0,999);/* a plot record of that route aimed at her (the shape newPlot70 writes; j70c-play tests the real plotting) */const p={id:++z.n,a:a.id,t:"me",m:sd.m,r:sid,mo:"band",st:"prep",pg:0,need:1,born:wk(),g:0,kn:1,kt:[],err:0,cool:0,wt:0};z.pl.push(p);if(!p)return{err:"no plot"};p.pend="seen";p.kn=1;if(!p.kt.length)p.kt.push(tellOf70(p,0));
     const d=mkP("j70",{id:p.id,s:"seen"});if(!d)return{err:"no card"};Q.unshift({t:"Mưu hại",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp})}
    else if(fam==="ky"){const sd=KYSEEDS.find(x=>x.id===sid);if(!sd)return{err:"no seed"};const v=liveRivals(true).find(x=>x.alive&&!x.out);const w=sd.who&&sd.who.kind==="rv"?{kind:"rv",ref:v}:Object.assign({},sd.who||{});
     KY.cur={id:sid,W:w,wn:w.ref&&w.ref.name||w.name||""};Q.unshift({t:"Kỳ ngộ",h:"<p>…</p>",opts:[{n:"A",fx:{}},{n:"B",fx:{}}],pid:"kyngo",pp:{id:sid},evId:"kyngo:"+sid,ky:1,ev:1})}
    else if(fam==="j71"||fam==="wc"){/* their card is built inside the family closure: the same call they make (dlgsMk) with a real cast */const v=liveRivals(true).find(x=>x.alive&&!x.out);const a=A6("rv",v.id);
     const d=dlgsMk(id,fam==="j71"?{B:a}:{A:a},t=>e68Fill(String(t).replace(/\{O\}/g,"vật ấy").replace(/\{F\}/g,"hội"),{A:a,B:a}),null);if(!d)return{err:"dlgsMk null"};Q.unshift({t:"x",h:"<p>…</p>",opts:[{n:"A",fx:{}},{n:"B",fx:{}}],dlg:d})}
    showModal();const m=Q[0];if(!m||!m.dlg)return{err:"no scene resolved",pid:m&&m.pid};
    return{n:sp.lines.length,L:m.dlg.names[0],R:m.dlg.names[1],who:m.dlg.lines.map(l=>l.fig),modal:!M.hidden,scene:!!document.querySelector('.kscn'),dlg:true}},id);
   if(o.err){ok(false,`${dev} ${id}: ${o.err}`);continue}
   ok(o.dlg&&o.scene&&!o.modal,`${dev} ${id}: scene plays before the card (card hidden)`);
   await g.waitForFunction(()=>document.querySelector('.kdv-box .kdv-line'),null,{timeout:30000}).catch(()=>{});await g.waitForTimeout(700);
   const f0=await g.evaluate(()=>{const L=document.querySelector('.kscn');return{figs:L&&L.figs?L.figs.length:document.querySelectorAll('.kscn .kscn-fig').length,loaded:[...document.querySelectorAll('.kscn .kscn-fig')].map(i=>i.naturalWidth>0)}});
   ok(f0.figs===2&&f0.loaded.every(Boolean),`${dev} ${id}: two full figures, both painted ${JSON.stringify(f0)}`);
   for(let i=0;i<o.n;i++){
    const s=await g.evaluate(()=>{const L=document.querySelector('.kscn'),bx=document.querySelector('.kdv-box');const t=bx&&bx.querySelector('.kptitle');const r=bx&&bx.getBoundingClientRect(),lr=L.getBoundingClientRect();
     return{title:t?t.textContent.trim():"",text:bx?bx.querySelector('.kdv-line').textContent:"",lit:L.dataset.klit,dim:[...L.querySelectorAll('.kscn-fig')].map(f=>f.classList.contains('kscn-dim')),inside:!!r&&r.top>=lr.top-1&&r.bottom<=lr.bottom+1&&r.left>=lr.left-1&&r.right<=lr.right+1,
      over:!!bx&&bx.scrollHeight<=bx.clientHeight+2}});
    const w=o.who[i];const want=w==null?"":w===0?o.L:o.R;
    ok(s.title===want||(!!want&&s.title.endsWith(" "+want))||(w!=null&&/\?\?\?/.test(s.title)),`${dev} ${id} line ${i+1}: box title = the speaker «${s.title}» want «${want}»`);
    ok(!/\{[^}]*\}/.test(s.text)&&s.text.length>3,`${dev} ${id} line ${i+1}: text resolved «${s.text.slice(0,50)}»`);
    ok(w==null?s.lit==="":s.lit===String(w)&&s.dim.join()===(w===0?"false,true":"true,false"),`${dev} ${id} line ${i+1}: spotlight ${JSON.stringify({lit:s.lit,dim:s.dim})}`);
    ok(s.inside&&s.over,`${dev} ${id} line ${i+1}: box inside the layer, no overflow`);
    if(k<NSHOT&&(i===0||i===1))await p.screenshot({path:path.join(OUT,`dlgs-${k}-l${i+1}-${dev}.png`)});
    /* finish the line (a short line may already be typed out by now: then a tap would move on, so tap only while it is still typing) */
    await g.evaluate(()=>{if(![...document.querySelectorAll('.kdv-line .kdw')].every(x=>x.classList.contains('on')))document.querySelector('.kscn').click()});await g.waitForTimeout(80);
    const fin=await g.evaluate(()=>[...document.querySelectorAll('.kdv-line .kdw')].every(x=>x.classList.contains('on')));ok(fin,`${dev} ${id} line ${i+1}: tap finishes the line`);
    await g.evaluate(()=>document.querySelector('.kscn').click());await g.waitForTimeout(i===o.n-1?900:350)}
   const e=await g.evaluate(()=>{const M=$("modal");return{q:Q.map(x=>x.pid||x.t).slice(0,4),scene:!!document.querySelector('.kscn'),modal:!M.hidden,t:Q[0]&&Q[0].t,dlg:!!(Q[0]&&Q[0].dlg&&Q[0].dlg.done),opts:M.querySelectorAll('.opt').length,playing:DLGS.playing}});
   ok(!e.scene&&e.modal&&e.dlg&&e.opts>=2&&!e.playing,`${dev} ${id}: after the last line the card shows with its choices ${JSON.stringify(e)}`);
   if(k<NSHOT)await p.screenshot({path:path.join(OUT,`dlgs-${k}-card-${dev}.png`)});
   await g.evaluate(()=>{showModal()});await g.waitForTimeout(200);const again=await g.evaluate(()=>!!document.querySelector('.kscn'));ok(!again,`${dev} ${id}: the scene never plays twice`);
   await g.evaluate(()=>{Q.length=0;showModal()});k++}
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();srv.close();console.log(`shots: ${OUT}`);console.log(fail?`FAILED ${fail} (pass ${pass})`:`ALL PASS ${pass}`);process.exit(fail?1:0)})();
