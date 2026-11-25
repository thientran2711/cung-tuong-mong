/* save-growth (d): the browser sổ is packed (j6 slotEnc «CTMZ», sync) — old plain-JSON sổ still load, new sổ load back identical.
   For every <save.json> (a robot / old sổ = the plain JSON j6 used to write):
     1. OLD LOAD: the plain JSON put in Sổ 1 as an old build left it → title shows it, «Tiếp tục kiếp này» loads it, no page error
     2. PACK: save() → the sổ is «CTMZ…», its size (chars) before / after, save() time
     3. ROUND TRIP: reload the page → Sổ 1 loads → ser() equals the ser() before the reload (except the write time «at»)
     4. EXPORT: Sổ › xuất (j16 xioExport) still makes a CTM2/CTM1 code of the PLAIN JSON; readCode(code) = the sổ
     5. IMPORT: Sổ › Ghi vào ô writes the packed form; loadSlot reads it back
   usage: node dev/test/savegrow-slot.js <save.json> [more.json …]   exit 1 on a fail; prints the size table (markdown) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const FILES=process.argv.slice(2);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const rows=[];
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const F of FILES){const raw=fs.readFileSync(F,'utf8');const tag=path.basename(F);
  const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.CTM_VAULT_URL='http://127.0.0.1:9/'});
  /* the old sổ, as an old build left it in localStorage (once per context) */
  await ctx.addInitScript(r=>{if(!sessionStorage.getItem('sg-init')){sessionStorage.setItem('sg-init','1');try{localStorage.clear();localStorage.setItem('hclh-save-v2-1',r);localStorage.setItem('hclh-slot','1')}catch(e){window.__sgErr=String(e)}}},raw);
  const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e).slice(0,200)));
  const boot=async()=>{await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof loadSlot==='function'&&typeof slotGet==='function'&&document.querySelector('#slots'),null,{timeout:120000});await p.waitForTimeout(600)};
  await boot();
  const load=()=>p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,#dawn').forEach(e=>e.remove());const d=loadSlot(1);if(!d)return{none:1};
   const was=localStorage.getItem('hclh-save-v2-1');SLOT=1;quiet=true;d.tab="act";deser(d);quiet=false;try{Q.length=0;closeModal()}catch(e){}try{$("title").hidden=true;render()}catch(e){}
   const st=o=>{const d=JSON.parse(JSON.stringify(o));delete d.at;return JSON.stringify(d)};return{name:S.name,year:S.year,packedBefore:(was||'').slice(0,4)==='CTMZ',ser:st(ser())}});
  const a=await load();ok(!a.none&&a.name,`${tag} 1 OLD LOAD: the plain-JSON sổ loads`,{name:a.name,year:a.year,packed:a.packedBefore});
  ok(!a.packedBefore,`${tag} 1 the sổ was plain JSON (old form) before the first save`);
  const pk=await p.evaluate(()=>{const T=[];for(let i=0;i<5;i++){const t=performance.now();quiet=false;save();T.push(performance.now()-t)}T.sort((x,y)=>x-y);
   const z=localStorage.getItem('hclh-save-v2-1');const j=JSON.stringify(ser()).length;const t1=performance.now();const d=loadSlot(1);const tl=performance.now()-t1;
   const t2=performance.now();JSON.stringify(ser());const tj=performance.now()-t2;
   return{packed:z.slice(0,4)==='CTMZ',stored:z.length,json:j,saveMs:Math.round(T[2]),jsonMs:Math.round(tj),loadMs:Math.round(tl),okLoad:!!d}});
  ok(pk.packed&&pk.okLoad,`${tag} 2 PACK: save() writes «CTMZ», loadSlot reads it`,pk);
  /* the exact text save() wrote = JSON.stringify(ser()) (same render state, write time «at» aside) */
  const before=await p.evaluate(()=>{quiet=false;save();const d=ser();delete d.at;return JSON.stringify(d)});
  await boot();const c=await p.evaluate(()=>{const d=loadSlot(1);if(!d)return{none:1};delete d.at;const t=JSON.stringify(d);
   /* and the same loaded twice gives the same life (deser is deterministic on the packed sổ) */
   return{t,name:d.S.name}});
  ok(c.t===before,`${tag} 3 ROUND TRIP: after a page reload the packed sổ reads back identical to what save() wrote`,{same:c.t===before,lenA:before.length,lenB:(c.t||'').length});
  const c2=await load();ok(c2.name===a.name&&!c2.none,`${tag} 3 the reloaded packed sổ plays (Tiếp tục kiếp này)`,{name:c2.name,year:c2.year});
  const ex=await p.evaluate(async()=>{quiet=true;/* no background save between the export and the compare */const plain=slotGet('hclh-save-v2-1');await xioExport(1);const code=XIO.code;let back=null;try{back=JSON.stringify(await readCode(code))}catch(e){back='ERR '+e}
   const pl=JSON.stringify(JSON.parse(plain));let at=-1;if(back!==pl)for(let i=0;i<pl.length;i++)if(back[i]!==pl[i]){at=i;break}quiet=false;
   return{pre:code.slice(0,5),len:code.length,same:back===pl,diffAt:at,a:at>=0?pl.slice(Math.max(0,at-60),at+40):'',b:at>=0?String(back).slice(Math.max(0,at-60),at+40):''}});
  ok(/^CTM[12]:/.test(ex.pre)&&ex.same,`${tag} 4 EXPORT: the code is made from the plain JSON and reads back the same`,ex);
  const im=await p.evaluate(()=>{const d=loadSlot(1);XIO.imp=d;XIO.to=2;XIO.ask=1;const w=document.createElement('button');w.id='x-write';document.body.appendChild(w);
   try{slotPut(SK(2),JSON.stringify(d))}catch(e){return{err:String(e)}}const z=localStorage.getItem(SK(2));const e=loadSlot(2);return{packed:z.slice(0,4)==='CTMZ',name:e&&e.S.name,same:!!e&&JSON.stringify(e)===JSON.stringify(d)}});
  ok(im.packed&&im.same,`${tag} 5 IMPORT writer packs, loadSlot(2) reads the same`,im);
  ok(!pe.length,`${tag} no page errors`,pe.slice(0,3));
  rows.push({tag,year:a.year,json:pk.json,stored:pk.stored,saveMs:pk.saveMs,jsonMs:pk.jsonMs,loadMs:pk.loadMs});await ctx.close()}
 console.log('\n| save | game year | sổ before (plain JSON chars) | sổ after (CTMZ chars) | × smaller | save() ms (of which JSON.stringify) | loadSlot ms |');console.log('|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.tag} | ${r.year} | ${r.json.toLocaleString('en')} | ${r.stored.toLocaleString('en')} | ${(r.json/r.stored).toFixed(1)} | ${r.saveMs} (${r.jsonMs}) | ${r.loadMs} |`);
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
