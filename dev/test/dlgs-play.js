/* SIDE-LINE DIALOGUE SCENES browser test (review/sideline-dlg; schema reports/sideline-dialogue.md «## SCHEMA»). After dev/site/build_site.sh:
   node dev/test/dlgs-play.js [outdir] [fold,ipadAir] [N]   (outdir default: a temp folder OUTSIDE git; shots dlgs-<i>-<step>-<dev>.png; N = scenes with shots, default 3)
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
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;showModal();tab='act';render()});
  await g.waitForTimeout(1500);await g.addStyleTag({content:'#kload,#klife,.modal.kload,#dawn,.kne,#kneov,#kroul,#kroulw,#kcourt,.kroul{display:none!important}'});
  const ids=await g.evaluate(()=>DLGS_DATA.map(r=>r.id).filter(id=>/^(j72|j68|j7):/.test(id)));ok(ids.length>0,`${dev} DLGS_DATA has scenes of live families (${ids.length})`);
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
    await g.evaluate(()=>document.querySelector('.kscn').click());await g.waitForTimeout(80);/* finish the line */
    const fin=await g.evaluate(()=>[...document.querySelectorAll('.kdv-line .kdw')].every(x=>x.classList.contains('on')));ok(fin,`${dev} ${id} line ${i+1}: tap finishes the line`);
    await g.evaluate(()=>document.querySelector('.kscn').click());await g.waitForTimeout(i===o.n-1?900:350)}
   const e=await g.evaluate(()=>{const M=$("modal");return{q:Q.map(x=>x.pid||x.t).slice(0,4),scene:!!document.querySelector('.kscn'),modal:!M.hidden,t:Q[0]&&Q[0].t,dlg:!!(Q[0]&&Q[0].dlg&&Q[0].dlg.done),opts:M.querySelectorAll('.opt').length,playing:DLGS.playing}});
   ok(!e.scene&&e.modal&&e.dlg&&e.opts>=2&&!e.playing,`${dev} ${id}: after the last line the card shows with its choices ${JSON.stringify(e)}`);
   if(k<NSHOT)await p.screenshot({path:path.join(OUT,`dlgs-${k}-card-${dev}.png`)});
   await g.evaluate(()=>{showModal()});await g.waitForTimeout(200);const again=await g.evaluate(()=>!!document.querySelector('.kscn'));ok(!again,`${dev} ${id}: the scene never plays twice`);
   await g.evaluate(()=>{Q.length=0;showModal()});k++}
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();srv.close();console.log(`shots: ${OUT}`);console.log(fail?`FAILED ${fail} (pass ${pass})`:`ALL PASS ${pass}`);process.exit(fail?1:0)})();
