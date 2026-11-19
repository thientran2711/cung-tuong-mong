/* caoly-road old-save test (E20): a Nam Chiếu-princess life (origin nc) saved MID-ROAD on the MAIN build (pre-rename) loads in this build, plays 60 buổi,
   and every princess-road surface now reads Cao Ly (no "Nam Chiếu" left in her origin card, story panel, chapter goal / texts). usage: node caoly-oldsave.js <this url> <main url> */
const {chromium}=require('playwright');const [,,URL,MAIN]=process.argv;
(async()=>{const b=await chromium.launch();const ok=[];const errs=[];const chk=(n,c,x)=>{ok.push(!!c);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,900))};
 const boot=async url=>{const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 const mk=async(url,k,months)=>{const q=await boot(url);const s=await q.evaluate(async([k,months])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
   for(let m=0;m<months;m++){const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){Q.length=0;used=0;nextBuoi()}
    const A=S&&S.st&&S.st.M;if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);res67(thKey67(A),A.cur,0,O[0]&&O[0].o!=null?oOf67(A,O[0],bd):100)}
    if(S&&S.st&&S.st.ms&&typeof msDone67==='function'){S.st.ms.t0=-99}}
   Q.length=0;return{save:JSON.stringify(ser()),land:S.origin&&S.origin.land,n:S.origin&&S.origin.n,arc:S.st&&S.st.M&&S.st.M.id,ch:S.st&&S.st.ch&&S.st.ch.n}},[k,months]);await q.context().close();return s};
 const old=await mk(MAIN,'nc',40);console.log('old save (main build):',JSON.stringify({land:old.land,n:old.n,arc:old.arc,ch:old.ch}));
 chk('old save is a Nam Chiếu life (pre-rename)',/Nam Chiếu/.test(old.save),old.land);
 const q=await boot(URL);
 const r=await q.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
  const out={land:S.origin&&S.origin.land,n:S.origin&&S.origin.n,k:S.origin&&S.origin.k};const n0=S.st&&S.st.ch&&S.st.ch.n;const txt=[];
  const grab=()=>{for(const t of['story','act']){tab=t;render();txt.push((document.getElementById('panel')||{}).textContent||'')}};
  for(let i=0;i<60;i++){Q.length=0;used=0;try{nextBuoi()}catch(e){return{err:e.message}}if(i%15===0)grab()}Q.length=0;grab();
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
 console.log(ok.filter(x=>x).length+'/'+ok.length+' pass');await b.close()})();
