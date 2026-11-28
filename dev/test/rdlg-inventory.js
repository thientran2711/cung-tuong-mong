/* ROAD DIALOGUE SCENES — inventory (law 11 STEP 1; brief dev/handover/briefs/b-row4-road-dialogue.md on the handover branch).
   After dev/site/build_site.sh:  node dev/test/rdlg-inventory.js [--check]
   Opens the built game, starts one life, and lists EVERY main-road unit that opens with a person (unit id «rd:<road or seed id>#<chapter or hồi>»):
     old    = the hand-typed roads (ROAD14, not composed): chapter .4 = the premise arc ARC67[road] → «rd:<road>#4»; chapters .5–.11 (jroad rdDef,
              ARC67[<road>_<n>], o:"rd") → «rd:<road>#<n>»
     prem   = THIN P8 composed roads: the premise arc (chapter .4) → «rd:<prem id>#4»
     open   = THIN P8 composed chapters .5–.11: a chapter's first hồi is ONE «open» part of the origin's pool (s1 = after a won chapter,
              s2 = after a middle / lost one; jroadc rdcChap) → the scene hangs on that part: «rd:<part id>#open»
     arc    = every other j67 arc a life can be dealt (shared «*», st / eg / tm chapters) → «rd:<arc id>#arc»
   Not here (already scenes or no person): NRASK ask hồi (side-line family «nr:*»), the rank milestones (MS67 «Lên …» info cards).
   For each unit: origin, title, goal, subject, the chapter's cast keys (rdCast / rdcRoles: the people cast ONCE before the first hồi, law 6b), the
   speakers of its hồi, and the first-hồi beats (h / w / t, raw with their j67 tokens) — the writers' source.
   Writes dev/test/rdlg_units.jsonl (read by dev/test/dlgs_validate.py, family rd); --check = fail when the file on disk differs (stale list). */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUTF=path.join(__dirname,'rdlg_units.jsonl');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const p=await b.newPage();
 await p.goto('http://127.0.0.1:'+srv.address().port+'/');await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function'&&typeof ARC67==='object',null,{timeout:180000});
 const U=await p.evaluate(()=>{SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();/* a road text can read the life's own rank (jrd_cn CNCHU_GAPT): pinned, so the list is the same every run (--check) */S.rank=1;
  const txt=x=>{try{return typeof x==="function"?String(x({act:{},f:{},sc:0,used:[],hist:[],sj:""})):String(x||"")}catch(e){return""}};
  const keysOf=a=>{const s=String(a.cast||"");const K=new Set();for(const m of s.matchAll(/rdCast\(A,\[([^\]]*)\]/g))for(const k of m[1].match(/"(\w+)"/g)||[])K.add(k.replace(/"/g,""));
   const T=[];for(const id in a.B||{}){const h=a.B[id];T.push(txt(h.t),txt(h.h));for(const o of (typeof h.o==="function"?[]:h.o||[]))T.push(txt(o.n),txt(o.rt))}T.push(txt(a.g));
   for(const k of ["v","v2"])if(T.some(t=>t.includes("{"+k+"}")))K.add(k);return[...K]};
  const beat=(a,id)=>{const h=a.B&&a.B[id];return h?{b:id,h:txt(h.h),w:h.w||a.w||"me",t:txt(h.t),need:h.need||[]}:null};
  const ws=a=>[...new Set(Object.values(a.B||{}).map(h=>h.w).filter(Boolean))];
  const L=[];const comp=r=>typeof RDC==="object"&&RDC.road&&RDC.road[r];
  for(const road of Object.keys(ROAD14)){const pa=ARC67[road];if(!pa)continue;const o=pa.o;
   if(comp(road)){L.push({id:`rd:${road}#4`,kind:"prem",o,road,n:4,t:pa.t,g:txt(pa.g),sj:txt(pa.sj),w:pa.w,roles:keysOf(pa),ws:ws(pa),first:(pa.p[0]||[]).map(id=>beat(pa,id)).filter(Boolean)});continue}
   L.push({id:`rd:${road}#4`,kind:"old",o,road,n:4,t:pa.t,g:txt(pa.g),sj:txt(pa.sj),w:pa.w,roles:keysOf(pa),ws:ws(pa),first:(pa.p[0]||[]).map(id=>beat(pa,id)).filter(Boolean)});
   for(const n of Object.keys(ROAD14[road]).map(Number).sort((x,y)=>x-y)){const a=ARC67[ROAD14[road][n]];if(!a)continue;
    L.push({id:`rd:${road}#${n}`,kind:"old",o,road,n,t:txt(a.t),g:txt(a.g),sj:txt(a.sj),w:a.w,roles:keysOf(a),ws:ws(a),first:(a.p[0]||[]).map(id=>beat(a,id)).filter(Boolean),after:{s1:"win",s2:"lose"}})}}
  /* composed opening parts (one pool per origin; a part can open any chapter of any of the origin's 4 new roads) */
  for(const r of (window.RDCSD||[]).filter(x=>x.type==="open")){const T=[r.h,r.t].concat((r.opts||[]).flatMap(o=>[o.n,o.rt]));
   L.push({id:`rd:${r.id}#open`,kind:"open",o:r.o,road:null,n:null,after:r.after,t:r.h,g:"",sj:"",w:r.w||"me",roles:["v","v2"].filter(k=>T.some(t=>String(t||"").includes("{"+k+"}"))),ws:[r.w||"me"],first:[{b:"s",h:r.h,w:r.w||"me",t:r.t,need:r.need||[]}]})}
  /* every other arc a life can be dealt (not a road premise, not a road chapter) */
  for(const id of Object.keys(ARC67)){const a=ARC67[id];if(a.o==="rd"||ROAD14[id])continue;if(QUEST67[a.o])continue;/* an origin pool arc that is no road premise: listed below */
   L.push({id:`rd:${id}#arc`,kind:"arc",o:a.o,road:null,n:null,t:txt(a.t),g:txt(a.g),sj:txt(a.sj),w:a.w,roles:keysOf(a),ws:ws(a),first:((a.p&&a.p[0]&&a.p[0].length?a.p[0]:a.ord?[].concat(a.ord[0]):[])).map(x=>beat(a,x)).filter(Boolean)})}
  for(const id of Object.keys(ARC67)){const a=ARC67[id];if(a.o==="rd"||ROAD14[id]||!QUEST67[a.o])continue;
   L.push({id:`rd:${id}#arc`,kind:"arc",o:a.o,road:null,n:null,t:txt(a.t),g:txt(a.g),sj:txt(a.sj),w:a.w,roles:keysOf(a),ws:ws(a),first:(a.p&&a.p[0]||[]).map(x=>beat(a,x)).filter(Boolean)})}
  return L});
 await b.close();srv.close();
 const body=U.map(u=>JSON.stringify(u)).join("\n")+"\n";
 const by={};for(const u of U){const k=u.kind+(u.o?":"+u.o:"");by[k]=(by[k]||0)+1}
 const fam={};for(const u of U)fam[u.kind]=(fam[u.kind]||0)+1;
 console.log("units",U.length,JSON.stringify(fam));
 if(process.argv.includes("--check")){const old=fs.existsSync(OUTF)?fs.readFileSync(OUTF,"utf8"):"";if(old!==body){console.log("FAIL rdlg_units.jsonl is stale: run node dev/test/rdlg-inventory.js");process.exit(1)}console.log("ok rdlg_units.jsonl up to date");return}
 fs.writeFileSync(OUTF,body);console.log("wrote",path.relative(ROOT,OUTF));
})().catch(e=>{console.error(e);process.exit(1)});
