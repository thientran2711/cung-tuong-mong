/* ACT-MOVE law-3 scan (ACT-MOVE-6; MAIN 172 LOOK FAIL 05:27Z: law 3 gain-and-loss on moved cards, law 11 whole family).
   Every bridged option (talk option amb:1 = an old card button moved onto the person's stage pop-up) of every person met on stage,
   scen cao / con / hh (rank 7, one rival in lãnh cung, one confined) × buổi 0–2 × every place, rendered through optLine (the kit rows the pop-up shows):
   NOGAIN  = the card shows no gain at all (no Được / Được ngay / Thành row holding a green value .ef.g) → a road with no gain (law 3)
   NONE    = a «Thành: Không được gì thêm» (j63 kaBody kr-none) row is shown; NONE-LOCKED = the same when the card is locked (kaBody dis)
   NOCOST  = the act takes bạc (raw x or w says Bạc −N) but no Tốn row names bạc (or, paid on success only, the Thành / Mất row)
   NATIVE=1: also every native pop-up option (not only the bridged ones), the whole person pop-up family; tier / group openers
   (rows = Tốn + «chọn mức và cách / chọn một trong …») are counted apart, notices (a.notice, e.g. «Cùng cung») skipped.
   usage: node dev/test/act-move-law3-scan.js [index.html] → prints a per-family table, exit 1 when any flag > 0 */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const RUN=String.raw`((sc,NAT)=>{window.__bot=1;const R={n:0,flag:0,per:{},ex:[],all:[],open:0};const dv=document.createElement('div');
 AA.scen(sc);if(sc==="hh"){S.rank=Math.max(S.rank,7);const L=rivals.filter(x=>x.alive&&!x.queen&&!sameHouse(S,x));if(L[0])L[0].out=1;if(L[1])L[1].confined=1}try{S.kids.push(mkKid('m',5),mkKid('f',2))}catch(e){}
 const go=k=>{Q.splice(0);used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}return S.place===k};
 const seen=new Set();const ks=["home"].concat(places().map(x=>x.k));
 for(const bu of [0,1,2]){S.buoi=bu;for(const k of ks){if(!go(k))continue;for(const p of curPeople()){let A=[];try{A=talkOpts(p)}catch(e){}
  for(const a of A){if(!a||(!a.amb&&!NAT)||a.notice)continue;const key=p.kind+"|"+a.n;if(seen.has(key))continue;seen.add(key);R.n++;const fam=p.kind+" · "+String(a.n).replace(/<[^>]+>/g,"");
   let h="";try{h=optLine(a)}catch(e){h="ERR "+e.message}dv.innerHTML=h;
   const rows=[...dv.querySelectorAll('.kr')].map(r=>({c:r.className,l:((r.querySelector('.krl')||{}).textContent||"").trim(),v:((r.querySelector('.krv')||{}).textContent||"").trim(),g:!!r.querySelector('.ef.g'),none:/kr-none/.test(r.className)}));
   /* a tier / group opener (its rows live in the picker it opens: «chọn mức và cách», «chọn một trong …») is counted apart, never gated */
   if(!a.amb&&rows.every(r=>r.l==="Tốn"||(r.l==="Ghi chú"&&/^chọn (mức|một trong)/.test(r.v)))&&rows.some(r=>r.l==="Ghi chú")){R.open=(R.open||0)+1;continue}
   const f=[];const gainRow=rows.some(r=>!r.none&&/^(Được|Được ngay|Thành)$/.test(r.l)&&r.g);
   if(!gainRow)f.push("NOGAIN");if(rows.some(r=>r.none&&r.l==="Thành"))f.push("NONE");
   /* the same card LOCKED (kaBody dis: red values leave the Thành block) must still name a gain, never «Không được gì thêm» */
   try{const d2=document.createElement('div');d2.innerHTML=kaBody(kaRows(kaModelStr(String(a.x||""))),true);if(d2.querySelector('.kr-none.kr-thanh'))f.push("NONE-LOCKED")}catch(e){}
   const raw=String(a.x||"")+" "+(typeof fmt==="function"?fmt(a.w||{}):"");if(/Bạc\s*[-−]\s*\d/.test(raw.replace(/<[^>]+>/g,""))&&!rows.some(r=>/^(Tốn|Thành|Mất)$/.test(r.l)&&/bạc/i.test(r.v)))f.push("NOCOST");
   const line=fam+" | "+rows.map(r=>r.l+": "+r.v+(r.g?"[g]":"")).join(" ‖ ");R.all.push((f.length?"✗ "+f.join(",")+" ":"✓ ")+line);
   const P=R.per[fam]||(R.per[fam]={n:0,f:0,flags:""});P.n++;if(f.length){P.f++;P.flags=f.join(",");R.flag++;if(R.ex.length<40)R.ex.push(f.join(",")+" "+line.slice(0,220))}}}}}
 return R})`;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);await p.evaluate(LIB);
 let n=0,fl=0,op=0;const per={},all=[];const ex=[];
 for(const sc of ['cao','con','hh']){const R=await p.evaluate(RUN+'('+JSON.stringify(sc)+','+(process.env.NATIVE?1:0)+')');n+=R.n;fl+=R.flag;op+=R.open||0;ex.push(...R.ex);all.push(...R.all.map(x=>sc+" "+x));for(const k in R.per){const q=per[k]||(per[k]={n:0,f:0,flags:""});q.n+=R.per[k].n;q.f+=R.per[k].f;if(R.per[k].flags)q.flags=R.per[k].flags}}
 await b.close();if(process.env.ALL)fs.writeFileSync(process.env.ALL,all.join("\n")+"\n");
 console.log('family | flagged/seen | flags');for(const k of Object.keys(per).sort())if(per[k].f||process.env.V)console.log(`${k} | ${per[k].f}/${per[k].n} | ${per[k].flags}`);
 console.log(`TOTAL | ${fl}/${n}`+(op?` · tier/group openers skipped ${op}`:""));if(ex.length){console.log('examples:');ex.slice(0,40).forEach(e=>console.log('  '+e))}
 console.log('page errors',perr.length,perr.slice(0,3).join(' | '));if(fl||perr.length){console.log('FAIL');process.exit(1)}console.log('PASS')})();
