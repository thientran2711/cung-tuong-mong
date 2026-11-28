/* f14role-rows (MAIN 182, 27/11; review/f14role-rows on review/f14role-inherit): LAW 11 scan of the F14ROLE family (jst14.js).
   Every cast role ({v}/{v2}) that any ARC67 text uses must resolve a row (own row, or f14Row's inherit along its road), and no road may
   turn a role hostile → not → hostile (f14Carried looks one chapter back only, so a 1→0→1 chain would hate the same carried person twice,
   against OD:L1247 «once, when cast»).
   Prints one line per road / premise: roles used, resolved, hostile; then the totals. With a 2nd URL (the base build) prints BEFORE too.
   usage: node dev/test/f14role-rows.js <url> [baseUrl]
   MUTATE=hole: one new row removed in the page (bd_san) → check 1 must FAIL; MUTATE=rehate: a synthetic {v:0} put at tt_co_6 between the
   hostile tt_co .4/.5 and an own {v:1} at tt_co_7 → check 2 must FAIL. */
const {chromium}=require('playwright');
const [,,URL,BASE]=process.argv;
async function scan(b,u,mut){const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof ARC67==='object'&&typeof F14ROLE==='object',null,{timeout:0});await p.waitForTimeout(1200);
 if(mut==='hole')await p.evaluate(()=>{delete F14ROLE.bd_san});
 if(mut==='rehate')await p.evaluate(()=>{F14ROLE.tt_co_6={v:0};F14ROLE.tt_co_7={v:1}});
 const R=await p.evaluate(()=>{const row=typeof f14Row==='function'?f14Row:(id=>F14ROLE[id]||null);
  const S2=x=>typeof x==='function'?String(x):String(x||'');
  const txt=a=>[a.g].concat(Object.values(a.B||{}).map(b=>b.t)).concat(Object.values(a.E||{}).map(e=>e.t)).map(S2).join(' ');
  const g={},miss=[],rehate=[];
  for(const id in ARC67){const a=ARC67[id];const T=txt(a);const key=a.o==='rd'&&a.road?a.road:id;
   for(const k of ['v','v2']){if(!T.includes('{'+k+'}'))continue;const G=g[key]=g[key]||{used:0,res:0,host:0};G.used++;
    const r=row(id);if(r&&k in r){G.res++;if(r[k]===1)G.host++}else miss.push(id+'.'+k)}}
  /* 1→0→1 along every road: premise (.4 = the road id) then each chapter .first … .last that exists */
  const roads=new Set();for(const id in ARC67){const a=ARC67[id];if(a.o==='rd'&&a.road)roads.add(a.road)}
  for(const rd of roads)for(const k of ['v','v2']){const seq=[];const r0=F14ROLE[rd];seq.push([rd,r0&&k in r0?r0[k]:null]);
   for(let n=BAL.road.first;n<=BAL.road.last;n++){const id=rd+'_'+n;if(!ARC67[id])continue;const r=row(id);seq.push([id,r&&k in r?r[k]:null])}
   let was1=false,drop=null;for(const [id,x] of seq){if(x===1){if(drop){rehate.push(rd+'.'+k+': '+drop+'→'+id);break}was1=true}else if(x===0&&was1&&!drop)drop=id}}
  return {g,miss,rehate,rows:Object.keys(F14ROLE).length}});
 R.errs=errs;await p.context().close();return R}
(async()=>{const b=await chromium.launch();const ok=[];const chk=(n,c,x)=>{ok.push(!!c);console.log((c?'PASS ':'FAIL ')+n+(c||x===undefined?'':' '+JSON.stringify(x).slice(0,600)))};
 const A=await scan(b,URL,process.env.MUTATE);const B0=BASE?await scan(b,BASE):null;
 console.log('road/premise | roles used | resolved'+(B0?' before → after':'')+' | hostile'+(B0?' before → after':''));
 for(const k of Object.keys(A.g).sort()){const a=A.g[k],z=B0&&B0.g[k];if(B0&&z&&z.res===a.res&&z.host===a.host)continue;
  console.log(k+' | '+a.used+' | '+(z?z.res+' → ':'')+a.res+' | '+(z?z.host+' → ':'')+a.host)}
 const tot=o=>Object.values(o.g).reduce((s,x)=>[s[0]+x.used,s[1]+x.res,s[2]+x.host],[0,0,0]);const t=tot(A),t0=B0&&tot(B0);
 console.log('TOTAL roles '+t[0]+' · resolved '+(t0?t0[1]+' → ':'')+t[1]+' · hostile '+(t0?t0[2]+' → ':'')+t[2]+' · rows '+(B0?B0.rows+' → ':'')+A.rows);
 chk('1) every role an arc text uses resolves a row ('+A.miss.length+' unresolved)',!A.miss.length,A.miss.slice(0,40));
 chk('2) no road turns a role hostile → not → hostile (same carried person hated twice)',!A.rehate.length,A.rehate);
 chk('3) no page errors',!A.errs.length,A.errs.slice(0,5));
 const bad=ok.filter(x=>!x).length;console.log(bad?'F14ROLE-ROWS FAIL '+bad+'/'+ok.length:'F14ROLE-ROWS PASS '+ok.length+'/'+ok.length);
 await b.close();process.exit(bad?1:0)})();
