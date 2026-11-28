/* SIDE-LINE DIALOGUE vs the room ENCOUNTER (jdfv person encounter, the outer showModal wrapper). After dev/site/build_site.sh:
   node dev/test/dlgs-encounter.js [fold,ipadAir]
   A fresh life stands on a visit (tab act, S.visit). A side-line card whose speaker stands in that room (m.who.w = ["r", id]) and carries a
   dialogue scene (m.dlg) is shown: the scene must play FIRST (kit scene layer, card hidden), then the encounter takes the card (DF.encM = the card,
   kitFocus open, centre modal hidden); the scene never plays twice. Old code (encounter before the scene): no scene layer -> FAIL. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const DEVS=(process.argv[2]||'fold,ipadAir').split(',');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0,pass=0;const ok=(c,m)=>{if(c)pass++;else fail++;console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();
 for(const dev of DEVS){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await D.openDirect(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:180000});
  await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function'&&typeof dlgsMk==='function'&&typeof dfEncOn==='function',null,{timeout:180000});
  await p.addStyleTag({content:'#kload,#klife,.modal.kload,#dawn,.kne,#kneov,#kroul,#kroulw,#kcourt,.kroul{display:none!important}'});
  /* a ranked consort's fresh life on a visit with a rival in the room whose figure is drawn */
  let st=null;for(let t=0;t<12&&!(st&&st.ok);t++){
   st=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<30;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&!(typeof isSrv==='function'&&isSrv())&&(S.rank|0)>=1)break}
    try{if(typeof setTab==='function')setTab('act')}catch(e){}try{renderStage()}catch(e){}return{ok:!!S.visit,tab:typeof tab!=='undefined'?tab:null,visit:!!S.visit}});
   if(st.ok){await p.waitForTimeout(1500);st=await p.evaluate(()=>{const P=curPeople();const R=new Set(liveRivals(true).filter(v=>v.alive&&!v.out).map(v=>v.id));
     const i=P.findIndex((x,k)=>x.ref&&R.has(x.ref.id)&&dfHasFig(k));return{ok:i>=0&&dfEncOn(),i,n:P.length,enc:dfEncOn()}})}}
  ok(st&&st.ok,`${dev} a fresh life stands on a visit with a rival in the room (encounter on) ${JSON.stringify(st)}`);if(!(st&&st.ok))continue;
  const r=await p.evaluate(i=>{Q.length=0;const M=$("modal");M.hidden=true;const P=curPeople(),v=P[i].ref;const w=liveRivals(true).find(x=>x.alive&&!x.out&&x!==v);
   const id=DLGS_DATA.map(x=>x.id).find(x=>/^wc:/.test(x));const a=A6("rv",v.id),bb=w?A6("rv",w.id):a;
   const d=dlgsMk(id,{A:a,B:bb},t=>e68Fill(String(t).replace(/\{O\}/g,"vật ấy").replace(/\{F\}/g,"hội"),{A:a,B:bb}),null);if(!d)return{err:"dlgsMk null "+id};
   const m={t:"x",h:"<p>Thử gặp.</p>",opts:[{n:"A",fx:{}},{n:"B",fx:{}}],who:{w:["r",v.id]},dlg:d};window.__encM=m;Q.unshift(m);showModal();
   return{id,who:v.name,idx:dfWhoIdx(m)}},st.i);
  if(r.err){ok(false,`${dev} ${r.err}`);continue}
  ok(r.idx===st.i,`${dev} the card's speaker stands in the room (encounter would take it) ${JSON.stringify(r)}`);
  await p.waitForTimeout(700);
  const s1=await p.evaluate(()=>({scn:!!document.querySelector('.kscn'),playing:DLGS.playing,modal:!$("modal").hidden,enc:DF.encM===window.__encM}));
  ok(s1.scn&&s1.playing&&!s1.modal&&!s1.enc,`${dev} ${r.id}: the side-line scene plays FIRST (scene layer, card hidden, no encounter yet) ${JSON.stringify(s1)}`);
  for(let k=0;k<80;k++){const on=await p.evaluate(()=>{const L=document.querySelector('.kscn');if(DLGS.playing&&L)L.click();return DLGS.playing});if(!on)break;await p.waitForTimeout(250)}
  await p.waitForFunction(()=>!DLGS.playing&&!document.querySelector('.kscn'),null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(600);
  const s2=await p.evaluate(()=>({playing:DLGS.playing,scn:!!document.querySelector('.kscn'),done:!!(window.__encM.dlg&&window.__encM.dlg.done),enc:DF.encM===window.__encM&&!!DF.F,modal:!$("modal").hidden,q0:Q[0]===window.__encM}));
  ok(!s2.playing&&!s2.scn&&s2.done&&s2.enc&&!s2.modal&&s2.q0,`${dev} ${r.id}: after the last line the ENCOUNTER takes the card (focus view, centre modal hidden) ${JSON.stringify(s2)}`);
  await p.evaluate(()=>showModal());await p.waitForTimeout(300);const again=await p.evaluate(()=>!!document.querySelector('.kscn'));ok(!again,`${dev} ${r.id}: the scene never plays twice`);
  ok(!errs.length,`${dev} no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();srv.close();console.log(fail?`FAILED ${fail} (pass ${pass})`:`ALL PASS ${pass}`);process.exit(fail?1:0)})();
