/* caoly-road old-save test (E20): a Nam Chiếu-princess life (origin nc) saved MID-ROAD on the MAIN build (pre-rename) loads in this build, plays 60 buổi,
   and every princess-road surface now reads Cao Ly (no "Nam Chiếu" left in her origin card, story panel, chapter goal / texts). usage: node caoly-oldsave.js <this url> <main url> */
const {chromium}=require('playwright');const [,,URL,MAIN]=process.argv;
(async()=>{const b=await chromium.launch();const ok=[];const errs=[];const chk=(n,c,x)=>{ok.push(!!c);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,900))};
 const boot=async url=>{const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();await p.addInitScript(require('./lib/qdrain').init);/* headless loop: __bot + answer the night choice (lib/qdrain.js, NPCROADS-RED) */p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 const mk=async(url,k,months)=>{const q=await boot(url);const s=await q.evaluate(async([k,months])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
   for(let m=0;m<months;m++){const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){__qDrain();used=0;nextBuoi()}
    const A=S&&S.st&&S.st.M;if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);res67(thKey67(A),A.cur,0,O[0]&&O[0].o!=null?oOf67(A,O[0],bd):100)}
    if(S&&S.st&&S.st.ms&&typeof msDone67==='function'){S.st.ms.t0=-99}}
   Q.length=0;return{save:JSON.stringify(ser()),land:S.origin&&S.origin.land,n:S.origin&&S.origin.n,arc:S.st&&S.st.M&&S.st.M.id,ch:S.st&&S.st.ch&&S.st.ch.n}},[k,months]);await q.context().close();return s};
/* PRE-RENAME FIXTURE (E40r, bang-words review): main is already Cao Ly, so no main build can write a Nam Chiếu save any more. The rename kept
   every id / key (jkc2 kc2MigNc comment), so an old save differs only in the stored STRINGS: S.origin land / name, S.kc.fam titles and the
   thanh-mai's strings. ageNc() writes exactly those old strings back into a save made on this build -> the same bytes an old device holds. */
const AGE_FAM={"Thế tử huynh":"Hoàng huynh","Vương thúc":"Hoàng thúc","Vương hậu":"Mẫu hậu"};
const ageNc=async(q,save)=>q.evaluate(([s,F])=>{const o=JSON.parse(s);const sub=v=>typeof v==="string"?v.split("Cao Ly").join("Nam Chiếu"):v;
  const walk=x=>{if(!x||typeof x!=="object")return;for(const k in x){if(typeof x[k]==="string")x[k]=sub(x[k]);else walk(x[k])}};
  const find=(x,d)=>{if(!x||typeof x!=="object"||d>3)return null;if(x.origin&&x.origin.k)return x;for(const k in x){const r=find(x[k],d+1);if(r)return r}return null};
  const R=o.S||find(o,0)||o;if(R.origin)walk(R.origin);if(R.kc&&Array.isArray(R.kc.fam))for(const m of R.kc.fam)if(m&&F[m.t])m.t=F[m.t];
  if(Array.isArray(R.men))R.men.forEach(m=>{if(m&&/Phó sứ (Cao Ly|Nam Chiếu)/.test(m.role||""))walk(m)});return JSON.stringify(o)},[save,AGE_FAM]);
 const old0=await mk(MAIN,'nc',40);let old=old0;
 if(old0.land==='Cao Ly'){const qa=await boot(MAIN);old={...old0,save:await ageNc(qa,old0.save),land:'Nam Chiếu',aged:1};await qa.context().close();console.log('main is post-rename: save AGED to the pre-rename strings (fixture)')}console.log('old save (main build):',JSON.stringify({land:old.land,n:old.n,arc:old.arc,ch:old.ch}));
 chk('old save is a Nam Chiếu life (pre-rename)',old.land==='Nam Chiếu',old.land);
 const q=await boot(URL);
 const r=await q.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
  const out={land:S.origin&&S.origin.land,n:S.origin&&S.origin.n,k:S.origin&&S.origin.k};const n0=S.st&&S.st.ch&&S.st.ch.n;const txt=[];
  const grab=()=>{for(const t of['story','act']){tab=t;render();txt.push((document.getElementById('panel')||{}).textContent||'')}};
  for(let i=0;i<60;i++){__qDrain();used=0;try{nextBuoi()}catch(e){return{err:e.message}}if(i%15===0)grab()}Q.length=0;grab();
  const A=S.st&&S.st.M;let goal='';try{goal=String(plain(nrS(ARC67[A?A.id:'nc_tuc'].g,A))||'')}catch(e){}
  let lore='';try{lore=JSON.stringify(ORIGIN_LORE&&ORIGIN_LORE.nc||'')}catch(e){}
  return{...out,n0,n:S.st&&S.st.ch&&S.st.ch.n,txt:txt.join('\n'),goal,lore,arc:A&&A.id}},old.save);
 console.log('after load:',JSON.stringify({land:r.land,n:r.n,k:r.k,arc:r.arc,n0:r.n0,ch:r.n,err:r.err}));
 chk('loads and plays 60 buổi',!r.err&&r.n>=r.n0,r);
 chk('still the nc princess life (legacy id kept)',r.k==='nc',r);
 chk('no "Nam Chiếu" on any surface of the loaded life (panels + goal)',!/Nam Chiếu/.test((r.txt||'')+(r.goal||'')),(((r.txt||'')+(r.goal||'')).match(/.{40}Nam Chiếu.{40}/)||[])[0]);
 chk('reads Cao Ly',/Cao Ly/.test((r.txt||'')+(r.goal||'')+(r.land||'')),{land:r.land});
 chk('no old Yunnan props (chim công / voi trắng / hoa trà) on a surface',!/chim công|voi trắng|hoa trà|Hoàng huynh/.test(r.txt||''),((r.txt||'').match(/.{30}(chim công|voi trắng|hoa trà|Hoàng huynh).{30}/)||[])[0]);
 chk('no page errors',errs.length===0,errs.slice(0,3));

 /* CASE B (r2): a Nam Chiếu life saved in the HOME phase (S.kc present) keeps stored titles -> migrated on load (ids unchanged) */
 const mkHome=async()=>{const q=await boot(MAIN);const s=await q.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin='nc';document.getElementById('title').hidden=true;quiet=true;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
   if(!S.kc&&kcOk(S.origin.k))kcInit();for(let i=0;i<8;i++){try{__qDrain();used=0;nextBuoi()}catch(e){}}
   return{save:JSON.stringify(ser()),fam:S.kc&&S.kc.fam.map(m=>m.r+'/'+m.t),ids:S.kc&&S.kc.fam.map(m=>m.id||m.r)}});await q.context().close();return s};
 let oh=await mkHome();if(!/Hoàng huynh/.test((oh.fam||[]).join())){const qa=await boot(MAIN);const sv=await ageNc(qa,oh.save);await qa.context().close();
  oh={...oh,save:sv,fam:(sv.match(/Hoàng huynh|Hoàng thúc|Mẫu hậu/g)||[]),aged:1};console.log('home save AGED to the pre-rename titles (fixture)')}console.log('old HOME save fam:',JSON.stringify(oh.fam));
 chk('old home save really holds the old titles',/Hoàng huynh/.test((oh.fam||[]).join()),oh.fam);
 const q2=await boot(URL);
 const rh=await q2.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
  const fam=S.kc.fam.map(m=>m.r+'/'+m.t);const ids=S.kc.fam.map(m=>m.id||m.r);const men=JSON.stringify(S.men||[]);
  const txt=[];for(let i=0;i<40;i++){__qDrain();used=0;try{nextBuoi()}catch(e){return{err:e.message}}if(i%10===0){for(const t of['story','act']){tab=t;render();txt.push((document.getElementById('panel')||{}).textContent||'')}}}
  const stored=JSON.stringify(S.kc);return{fam,ids,men,stored,txt:txt.join('\n'),k:S.origin.k,err:0}},oh.save);
 console.log('after HOME load:',JSON.stringify(rh.fam));
 chk('home life loads and plays 40 buổi',!rh.err,rh);
 chk('family titles migrated: no Hoàng huynh / Hoàng thúc / Mẫu hậu in S.kc',!/oàng huynh|oàng thúc|Mẫu hậu/.test(rh.stored||''),rh.fam);
 chk('migrated titles are Thế tử huynh / Vương thúc / Vương hậu',/Thế tử huynh/.test((rh.fam||[]).join())&&/Vương thúc/.test((rh.fam||[]).join())&&/Vương hậu/.test((rh.fam||[]).join()),rh.fam);
 chk('ids / roles unchanged by the migration',JSON.stringify(rh.ids)===JSON.stringify(oh.ids),{a:rh.ids,b:oh.ids});
 chk('no Nam Chiếu in her stored thanh-mai / panels of the home life',!/Nam Chiếu/.test((rh.men||'')+(rh.txt||'')),((rh.men||'')+(rh.txt||'')).match(/.{30}Nam Chiếu.{30}/));
 chk('home life: no page errors',errs.length===0,errs.slice(0,3));
 console.log(ok.filter(x=>x).length+'/'+ok.length+' pass');await b.close()})();
