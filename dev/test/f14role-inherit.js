/* f14role-inherit (review/f14role-inherit, MAIN 178 ruling 27/11 ~11:03Z): road chapters .5–.11 (jroad rdDef ARC67["<road>_<n>"], o:"rd")
   INHERIT the F14ROLE row of the nearest EARLIER chapter (<road>_<n-1> … <road>_5, then <road> = the .4 premise); their own row overrides;
   only a real road chapter inherits (an id that only looks like "<x>_<n>" never borrows a row). jst14.js f14Row + f14Hostile.
   Checks:
   1) every road chapter whose road has a row at .4 or an earlier chapter resolves a row for each {v}/{v2} its text uses (LIVE: none does);
   2) f14Hostile reads the resolver: a road chapter of a hostile .4 cast (tt_co, tt_oan, dtq_bien …) is hostile; one of a non-hostile .4
      (tt_tranh, muoi_no, ch_ho) is not;
   3) own row overrides, and the NEAREST earlier row wins (synthetic rows put in and taken out again);
   4) non-road ids never inherit: a made-up "<road>_<n>" not in ARC67, and every non-road ARC67 id resolves only its own row;
   5) hate once per person (OD:L1247 «once, when cast»): in a 14-chapter tt life the tt_co .5 cast is hated once; the SAME person carried
      into .6 / .7 (S.st.f14.act, hostile row inherited) is not hated again (jst14 f14Carried);
   6) no page errors.
   Prints the before/after count (resolved roles by own row vs by the resolver) and the roles no row resolves anywhere on the road
   (roads with no reviewed row at all: NOT this ruling — listed for MAIN).
   usage: node dev/test/f14role-inherit.js <url>   (MUTATE=1: f14Hostile/f14Row put back to the own-row lookup → must FAIL;
   MUTATE=carry: f14Carried always false → check 5 must FAIL) */
const {chromium}=require('playwright');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'PASS ':'FAIL ')+n+(c||x===undefined?'':' '+JSON.stringify(x).slice(0,700)))};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ARC67==='object'&&typeof F14ROLE==='object'&&typeof f14Hostile==='function',null,{timeout:0});await p.waitForTimeout(1200);
 if(process.env.MUTATE==='carry')await p.evaluate(()=>{f14Carried=()=>false});else if(process.env.MUTATE)await p.evaluate(()=>{window.f14Row=id=>F14ROLE[id]||null;f14Hostile=function(A,k){return !!(A&&F14ROLE[A.a]&&F14ROLE[A.a][k]===1)}});
 const R=await p.evaluate(()=>{const row=typeof f14Row==='function'?f14Row:(id=>F14ROLE[id]||null);
  const txt=a=>[a.g].concat(Object.values(a.B||{}).map(b=>b.t)).concat(Object.values(a.E||{}).map(e=>e.t)).map(x=>typeof x==='function'?String(x):String(x||'')).join(' ');
  /* the row a road chapter SHOULD get by the ruling, computed here independently of the game code */
  const want=id=>{if(F14ROLE[id])return F14ROLE[id];const a=ARC67[id];if(!a||a.o!=='rd')return null;for(let n=a.rn-1;n>=BAL.road.first;n--)if(F14ROLE[a.road+'_'+n])return F14ROLE[a.road+'_'+n];return F14ROLE[a.road]||null};
  const o={roles:0,own:0,after:0,should:0,wrong:[],none:{},nonRoad:[],hostBad:[]};
  for(const id in ARC67){const a=ARC67[id];const T=txt(a);
   if(a.o!=='rd'){if(row(id)!==(F14ROLE[id]||null))o.nonRoad.push(id)}
   for(const k of ['v','v2']){if(!T.includes('{'+k+'}'))continue;o.roles++;
    if(F14ROLE[id]&&k in F14ROLE[id])o.own++;
    const r=row(id),w=want(id);if(r&&k in r)o.after++;
    if(w&&k in w){o.should++;if(!(r&&k in r)||r[k]!==w[k])o.wrong.push(id+'.'+k)}
    else if(a.o==='rd'){(o.none[a.road]=o.none[a.road]||[]).push(a.rn+'.'+k)}else (o.none['(premise)']=o.none['(premise)']||[]).push(id+'.'+k)}}
  /* 2) hostility through the resolver */
  const H=(id,k)=>f14Hostile({a:id},k);
  for(const [r,h] of [['tt_co',1],['tt_oan',1],['dtq_bien',1],['muoi_tuoc',1],['cn_chu',1],['tt_tranh',0],['muoi_no',0],['ch_ho',0],['cnv_mat',0]])
   for(let n=5;n<=11;n++){const id=r+'_'+n;if(!ARC67[id]||F14ROLE[id])continue;if(H(id,'v')!==!!h)o.hostBad.push(id+'='+H(id,'v'))}
  o.hostPremise=[H('tt_oan','v'),H('muoi_no','v'),H('ch_ho','v')];
  /* 3) own row overrides + nearest earlier row wins (synthetic, removed again) */
  const s={};const put=(id,v)=>{s[id]=F14ROLE[id];F14ROLE[id]=v};
  put('tt_co_7',{v:0});o.ov={c6:H('tt_co_6','v'),c7:H('tt_co_7','v'),c8:H('tt_co_8','v'),c11:H('tt_co_11','v')};
  put('tt_co_9',{v:1});o.ov.c10=H('tt_co_10','v');o.ov.c9=H('tt_co_9','v');o.ov.c8b=H('tt_co_8','v');
  for(const id in s){if(s[id]===undefined)delete F14ROLE[id];else F14ROLE[id]=s[id]}
  o.ovClean=!F14ROLE.tt_co_7&&!F14ROLE.tt_co_9&&H('tt_co_8','v');
  /* 4) a made-up id shaped like a road chapter never borrows a row */
  o.fake=[row('tt_co_99'),row('tt_co_x_7'),row('st_dong_5'),row('zz_5')].map(x=>x?1:0);
  return o});
 const C=await p.evaluate(()=>{quiet=true;try{localStorage.clear()}catch(e){}window.__forceOrigin='tt';start();quiet=false;Q.length=0;const o={f14:f14()};
  let n=0;const h0=f14Hate;f14Hate=function(v){n++;return h0.apply(this,arguments)};
  const t=id=>{n=0;let A=null;try{A=newThread67(id,'s')}catch(e){o.err=e.message}return{id,n,v:A&&A.act&&A.act.v}};
  o.a=t('tt_co_5');S.st.f14.act=S.st.f14.act||{};if(o.a.v!=null)S.st.f14.act.v=o.a.v;o.b=t('tt_co_6');o.c=t('tt_co_7');f14Hate=h0;return o});
 const nNone=Object.values(R.none).reduce((s,a)=>s+a.length,0);
 console.log('BEFORE (own row only): '+R.own+'/'+R.roles+' roles resolve · AFTER (f14Row): '+R.after+'/'+R.roles+' · by the ruling: '+R.should+' should resolve');
 console.log('NO ROW anywhere on the road ('+nNone+' roles, '+Object.keys(R.none).length+' roads/premises; not this ruling, listed for MAIN): '+Object.entries(R.none).map(([k,v])=>k+'['+v.length+']').join(' '));
 chk('1) every road chapter with a row at .4 or earlier resolves it (before '+R.own+', after '+R.after+', want '+R.should+')',R.should>R.own&&!R.wrong.length&&R.after===R.should,R.wrong.slice(0,40));
 chk('2) f14Hostile reads the resolver: hostile .4 → road chapters hostile, non-hostile .4 → not; premise rows unchanged',!R.hostBad.length&&R.hostPremise.join()==='true,false,false',{bad:R.hostBad.slice(0,30),prem:R.hostPremise});
 chk('3) own row overrides; nearest earlier row wins; synthetic rows removed',R.ov.c6===true&&R.ov.c7===false&&R.ov.c8===false&&R.ov.c11===false&&R.ov.c9===true&&R.ov.c10===true&&R.ov.c8b===false&&R.ovClean,R.ov);
 chk('4) only real road chapters inherit (non-road ids: own row only; made-up ids: null)',!R.nonRoad.length&&R.fake.join()==='0,0,0,0',{nonRoad:R.nonRoad.slice(0,20),fake:R.fake});
 chk('5) hate once per person: .5 cast hated once, the same person carried into .6/.7 not again',C.f14&&C.a.v!=null&&C.a.n===1&&C.b.v===C.a.v&&C.b.n===0&&C.c.v===C.a.v&&C.c.n===0&&!C.err,C);
 chk('6) no page errors',!errs.length,errs.slice(0,5));
 const bad=ok.filter(x=>!x[1]).length;console.log(bad?'F14ROLE-INHERIT FAIL '+bad+'/'+ok.length:'F14ROLE-INHERIT PASS '+ok.length+'/'+ok.length);
 await b.close();process.exit(bad?1:0)})();
