/* bd-batu-switch (review/bd-roads, Ba Tư rewrite; Foreman E 19/11 06:50Z): ONE per-life switch (bdTxt / bdCountry in jrd_bd.js).
   (1) an OLD bd life (road bd_hoa/ngua/tuc/hoang) reads Bắc Địch everywhere: origin card, story, quest, lore, home phase, tokens, its chapters;
   (4) Cao Ly (review/caoly-road, nc renamed in place) and Ba Tư hold together in one build: an nc life reads Cao Ly ({land}, {kha}, KC2LAND.nc, OI_SELT envoy),
       no Ba Tư / Nam Chiếu word; the selection line names the envoy by country for old bd (Bắc Địch) / new bd (Ba Tư) / nc (Cao Ly);
   (2) a NEW bd life (a real start(), road one of bd_san/bd_soi/bd_tuyet/bd_hen) reads Ba Tư everywhere, and no steppe word is left in any
       text of its road (.4–.11 + rares, every text function evaluated); (3) 0 page errors.
   usage: node dev/test/bd-batu-switch.js <url of dev/index.html> */
const {chromium}=require('playwright');const URL=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
  const A={act:{},f:{},sc:0,q97:{p:0,b:0}};const ev=x=>{try{return typeof x==='function'?x(A):x}catch(e){return ''}};
  const rows=()=>{const o={};const add=(k,v)=>{v=ev(v);if(v!=null)o[k]=typeof v==='string'?v:JSON.stringify(v)};
   add('ORIGIN_BR.bd.n',ORIGIN_BR.bd.n);add('ORIGIN_BR.bd.land',ORIGIN_BR.bd.land);add('ORIGIN_BR.bd.t',ORIGIN_BR.bd.t);
   add('STORY.bd.t',STORY.bd.t);add('STORY.bd.goal',STORY.bd.goal);add('QUEST67.bd',QUEST67.bd);
   if(typeof ORIGIN_LORE==='object')add('ORIGIN_LORE.bd',ORIGIN_LORE.bd);if(typeof KC2LAND==='object')add('KC2LAND.bd',KC2LAND.bd);
   if(typeof ENT_INTRO==='object')add('ENT_INTRO.bd',ENT_INTRO.bd);if(typeof ENT_LINE==='object')add('ENT_LINE.bd',ENT_LINE.bd);
   if(typeof OI_TXT==='object')add('OI_TXT.bd',OI_TXT.bd);if(typeof OI_CAP==='object')add('OI_CAP.bd',OI_CAP.bd);
   if(typeof GE_ID==='object')add('GE_ID.bd',GE_ID.bd);add('{land}',fill67('{land}',A));add('{pv}',fill67('{pv}',A));add('{mh}',fill67('{mh}',A));return o};
  const out={};
  /* (1) old life */
  quiet=true;window.__forceOrigin='bd';start();quiet=false;S.origin.k='bd';S.st.f14.road='bd_hoa';out.old=rows();
  out.oldCh=fill67(ARC67.bd_hoa_5?ARC67.bd_hoa_5.g:ARC67.bd_hoa.g,A);
  /* (2) new life */
  const roads=['bd_san','bd_soi','bd_tuyet','bd_hen'];S.st.f14.road=roads[0];out.neu=rows();
  const STEP=/Bắc Địch|thảo nguyên|Khả hãn|Khả đôn|Phụ hãn|kim trướng|Tuyết Câu|Ba Đồ|Ô Lặc|Thát Mộc|Hô Diên Liệt|A Sử Na Cát|Thác Bạt|Âm Sơn|Bạch Thủy|Nhạn Môn|đống đá|sữa ngựa/;
  out.left=[];out.nTxt=0;
  for(const r of roads){S.st.f14.road=r;const ids=[r].concat(Object.values(ROAD14[r]||{}));
   const walk=(x,where,d)=>{if(d>6||x==null)return;if(typeof x==='function'&&!/=>\s*\{?\s*(?:bd|RD_|rd|e67|return\s*e67)/.test(String(x).slice(0,40))){const v=ev(x);if(typeof v==='string')walk(v,where,d+1);return}
    if(typeof x==='string'){out.nTxt++;const s=fill67(x,A);const m=s.match(STEP);if(m)out.left.push(where+': «'+m[0]+'» '+s.slice(0,70));return}
    if(Array.isArray(x)){x.forEach((y,i)=>walk(y,where,d+1));return}
    if(typeof x==='object')for(const k of ['t','g','h','n','rt','rf','wx','lx','sj','tag','ti','o','B','E'])if(k in x)walk(x[k],where+'.'+k,d+1);
    if(typeof x==='object'&&x.B)for(const bk in x.B)walk(x.B[bk],where+'.'+bk,d+1)};
   for(const id of ids)if(ARC67[id])walk(ARC67[id],id,0);
   for(const d of (typeof RD97L!=='undefined'?RD97L:[]).concat(typeof BD97!=='undefined'?BD97:[]))if(String(d.a).indexOf(r)===0)walk({t:d.t,n:d.n,tag:d.tag,ti:d.ti},'rare '+d.a,0)}
  /* (4) Cao Ly beside Ba Tư */
  const sel=()=>typeof OI_SELT==='object'&&OI_SELT.nc?OI_SELT.nc():'';
  S.st.f14.road='bd_san';out.selNew=sel();S.st.f14.road='bd_hoa';out.selOld=sel();
  S.origin.k='nc';S.st.f14.road='nc_su';out.nc={land:fill67('{land}',A),kha:fill67('{kha}',A),kc:typeof KC2LAND==='object'?JSON.stringify(KC2LAND.nc):'',sel:sel()};
  return out});
 const bad=[];const has=(o,re)=>Object.entries(o).filter(([k,v])=>!re.test(v)).map(([k])=>k);
 const oldNo=has(R.old,/Bắc Địch|Khả hãn|Khả đôn|Phụ hãn|thảo nguyên|hãn/);const oldBt=Object.entries(R.old).filter(([k,v])=>/Ba Tư|Tô Lận|lửa thánh/.test(v)).map(([k])=>k);
 const neuBd=Object.entries(R.neu).filter(([k,v])=>/Bắc Địch|Khả hãn|Khả đôn|Phụ hãn|thảo nguyên/.test(v)).map(([k])=>k);
 console.log('origin-level rows switched:',Object.keys(R.neu).join(', '));
 console.log('(1) OLD life rows:',Object.keys(R.old).length,'· with Ba Tư words',oldBt.length,oldBt.join(',')||'', '· old chapter text:',R.oldCh.slice(0,60));
 console.log('(2) NEW life rows:',Object.keys(R.neu).length,'· with Bắc Địch words',neuBd.length,neuBd.join(',')||'','· {land}={pv}/{mh}:',R.neu['{land}'],R.neu['{pv}'],R.neu['{mh}']);
 console.log('    road texts checked',R.nTxt,'· steppe words left',R.left.length);R.left.slice(0,+process.env.SHOW||20).forEach(s=>console.log('     '+s));
 const nc=R.nc;const ncBad=[];if(nc.land!=='Cao Ly')ncBad.push('{land}='+nc.land);if(!nc.kha||/\{kha\}/.test(nc.kha))ncBad.push('{kha}='+nc.kha);
 for(const [k,v] of Object.entries(nc))if(/Ba Tư|Tô Lận|Nam Chiếu|Bắc Địch/.test(v))ncBad.push(k+': '+v.match(/Ba Tư|Tô Lận|Nam Chiếu|Bắc Địch/)[0]);
 if(!/Cao Ly/.test(nc.sel))ncBad.push('sel nc no Cao Ly');if(!/Ba Tư/.test(R.selNew))ncBad.push('sel new bd no Ba Tư');if(!/Bắc Địch/.test(R.selOld))ncBad.push('sel old bd no Bắc Địch');
 console.log('(4) Cao Ly + Ba Tư: nc {land}',nc.land,'{kha}',nc.kha,'· faults',ncBad.length,ncBad.join(' / '));
 console.log('(3) page errors',errs.length,errs.slice(0,3).join(' / '));
 const ok=!ncBad.length&&!oldBt.length&&!neuBd.length&&!R.left.length&&!errs.length&&R.old['{land}']==='Bắc Địch'&&R.neu['{land}']==='Ba Tư';
 console.log(ok?'PASS':'FAIL');await b.close();process.exit(ok?0:1)})();
