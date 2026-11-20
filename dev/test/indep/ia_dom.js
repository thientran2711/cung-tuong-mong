/* Independent DOM audit: the REAL rendered map and stage at N random moments vs S.roster (own comparator).
   usage: node ia_dom.js <url> <outdir> <WxH@dpr> [N=40] [origin]
   Map: for every .mspot[data-go], silhouettes (aria-label "n bóng người", none = 0) == rows at that code in S.roster at the current khắc.
   Stage: every drawn token (name tag) is a person the record puts HERE now; every consort / Emperor / Thái hậu the record puts here
   (not of her own house when at home) is drawn. Also: no page error, no horizontal overflow, record rows == census (ia_hook).
   Random moments mix: next buổi, walk, spend a khắc on an act, save to the slot + full page RELOAD + continue (also with a card open). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,OUT,SZ='755x1000@2',NN='40',ORI='']=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const HOOK=fs.readFileSync(path.join(__dirname,'ia_hook.js'),'utf8');
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR||1,hasTouch:true,isMobile:W<1100});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const rep={size:SZ,moments:[],mapBad:[],stageBad:[],overflow:0,reloads:0,reloadBad:[],ia:null};
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(o=>{localStorage.clear();if(o)window.__forceOrigin=o;SLOT=2;document.getElementById('title').hidden=true;start();if(typeof NLP!=='undefined'&&NLP)nlAccept(true)},ORI);await p.waitForTimeout(600);
 const inject=async()=>{await p.evaluate(HOOK)};await inject();
 const clear=async(keepCard)=>{await p.evaluate(keep=>{for(let r=0;r<6;r++){const dg=document.getElementById('dawn-go');if(dg&&dg.offsetParent)dg.click();const ov=document.getElementById('ov');
   if(ov&&!ov.hidden){const ok=ov.querySelector('#mgok')||ov.querySelector('#mgskip');if(ok)ok.click();else{const bs=ov.querySelectorAll('button');if(bs.length)bs[bs.length-1].click()}}
   if(keep)break;let n=0;while(Q.length&&n++<20){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM((L=>L.length?L[L.length-1]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0)));else closeModal()}catch(e){Q.shift()}}}try{showModal()}catch(e){}},!!keepCard);await p.waitForTimeout(250)};
 await clear();
 for(let i=0;i<+NN;i++){
  const r=Math.random();let what="";
  if(r<.12){/* save, reload the page, continue from the slot */
   const keep=Math.random()<.5;const pre=await p.evaluate(()=>{save();return JSON.stringify({P:S.roster&&S.roster.P,key:S.roster&&S.roster.key,kh:j95kh(),place:S.place,q:Q.length})});
   await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2200);
   await p.evaluate(()=>{const bt=document.querySelector('#slots button[data-load="2"]');if(bt)bt.click()});await p.waitForTimeout(900);await inject();
   const post=await p.evaluate(()=>JSON.stringify({P:S.roster&&S.roster.P,key:S.roster&&S.roster.key,kh:j95kh(),place:S.place,q:Q.length}));rep.reloads++;
   if(pre!==post){const A=JSON.parse(pre),B=JSON.parse(post);const d=[];for(const k of ['key','kh','place','q'])if(A[k]!==B[k])d.push(`${k}: ${A[k]}→${B[k]}`);for(const id in A.P||{})if(JSON.stringify(A.P[id])!==JSON.stringify((B.P||{})[id]))d.push(`${id}: ${JSON.stringify(A.P[id][A.kh])}→${B.P&&B.P[id]?JSON.stringify(B.P[id][B.kh]):'mất'}`);for(const id in B.P||{})if(!(A.P||{})[id])d.push('thêm '+id);rep.reloadBad.push({i,d:d.slice(0,12)})}
   what="reload";if(!keep)await clear()}
  else{await p.evaluate(rr=>{try{if(rr<.45)nextBuoi();else if(rr<.8){const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)goTo(L[Math.floor(Math.random()*L.length)])}else{const b=[...document.querySelectorAll('#panel button.act-card:not([disabled]), #panel .acts button:not([disabled])')];if(b.length)b[Math.floor(Math.random()*b.length)].click()}}catch(e){}},r);
   what=r<.45?"buổi":r<.8?"đi":"hành sự";await clear(Math.random()<.3)}
  await p.evaluate(()=>{tab="go";render()});await p.waitForTimeout(500);
  const M=await p.evaluate(()=>{const R=S.roster,kh=j95kh();if(!R||R.key!==j95key())return{skip:1,key:R&&R.key,now:j95key()};/* j95c pass: a promotion card switches back to the stage tab; no map on screen = nothing to compare */if(!document.querySelector('.mapw'))return{skip:1,nomap:tab};const C={};for(const id in R.P){const k=R.P[id][kh][0];C[k]=(C[k]||0)+1}
   const out=[];const seen={};for(const sp of document.querySelectorAll('.mapw .mspot')){const k=sp.dataset.go||sp.dataset.ak;if(!k)continue;const s=sp.querySelector('.msil');const n=s?+(/(\d+)/.exec(s.getAttribute('aria-label'))||[0,0])[1]:0;
    if(seen[k]!=null&&seen[k]!==n)out.push(`${k}: hai ô khác số (${seen[k]} / ${n})`);seen[k]=n;if(n!==(C[k]||0))out.push(`${k}: bản đồ ${n}, sổ ${C[k]||0}`)}
   for(const k in C)if(seen[k]==null&&k!=="home"&&C[k])out.push(`${k}: sổ có ${C[k]} người mà bản đồ không có ô`);
   return{out,at:`${R.key}/${kh}`,place:S.place,n:Object.keys(R.P).length,ov:document.documentElement.scrollWidth>innerWidth+1}});
  if(M.ov)rep.overflow++;if(M.out&&M.out.length)rep.mapBad.push({i,what,at:M.at,d:M.out});
  if(i%10===0)await p.screenshot({path:path.join(OUT,`map-${SZ.replace(/[@x]/g,'_')}-${i}.png`)});
  await p.evaluate(()=>{tab="act";render()});await p.waitForTimeout(500);
  const T=await p.evaluate(()=>{const R=S.roster,kh=j95kh();if(!R||R.key!==j95key())return{skip:1};const here=S.place;const out=[];
   const byName={};for(const id in R.P){const w=R.who[id];if(w)(byName[w[0]]=byName[w[0]]||[]).push(id)}
   const TK=[...document.querySelectorAll('#tokens .tok')].map(t=>{const n=t.querySelector('.j59n')||t.querySelector('.j59only'),r=t.querySelector('.j59t');/* j95c pass: Thái hậu / Hoàng thượng carry only a title tag (.j59only) */const i=+t.dataset.p;const pp=S.visit&&S.visit.people?S.visit.people[i]:null;/* j61: a person not yet known is drawn as "Người lạ ???"; the j59 strip stage draws figures without a name tag in the token: the token's data-p names who it is */const nt=n?n.textContent.trim():'';return{nm:(!nt||nt==='???')&&pp&&pp.name?pp.name:nt,rl:r?r.textContent.trim():'',p:pp}}).filter(x=>x.nm);
   const toks=TK.map(x=>x.nm);
   for(const x of TK){const nm=x.nm;if(x.p&&(x.p.kind==="obj"||x.p.kind==="chest"||/^Rương/.test(nm)))continue;let n2=nm.replace(/^Hoàng hậu /,"");let ids=byName[n2]||byName[nm]||(nm==="Hoàng thượng"?["emp"]:nm==="Thái hậu"?["th"]:null);
    if(!ids&&x.p&&x.p.ref&&x.p.ref.id!=null){const rid=x.p.kind==="man"?x.p.ref.id:x.p.ref.rel!=null?"v"+x.p.ref.id:null;if(rid&&R.P[rid])ids=[rid]}
    if(!ids&&x.p&&x.p.kind==="ty")ids=["c:ty"];if(!ids&&x.p&&x.p.kind==="ksp")ids=["c:ksp"];if(!ids&&/Tổng quản/.test(nm+x.rl))ids=["c:tq"];if(!ids&&/Kính sự/.test(nm+x.rl))ids=["c:ksp"];
    if(!ids){const m=(S.men||[]).find(q=>q.name===nm||(x.p&&x.p.ref===q));out.push(`sân khấu vẽ "${nm}" (${x.rl}; kind ${x.p&&x.p.kind}) mà sổ không có${m?` (nam nhân ${m.id} ${m.rw}, sổ: ${R.P[m.id]?R.P[m.id][kh][0]:"không có dòng"}, menW: ${(S.menW||{})[m.id]})`:""}`);continue}if(!ids.some(id=>R.P[id][kh][0]===here))out.push(`sân khấu vẽ ${nm} mà sổ ghi ở ${ids.map(id=>R.P[id][kh][0]).join("/")} (đang ở ${here})`)}
   for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(!e||e[kh][0]!==here)continue;if(here==="home"&&sameHouse(S,v))continue;if(!toks.some(t=>t===v.name||t==="Hoàng hậu "+v.name))out.push(`sổ ghi ${v.name} ở đây (${here}, ${e[kh][1]}) mà sân khấu không vẽ`)}
   if(R.P.emp[kh][0]===here&&here!=="home"&&!toks.includes("Hoàng thượng")&&!(here==="dtd"&&S.sung<50))out.push(`sổ ghi Hoàng thượng ở đây (${here}) mà sân khấu không vẽ`);
   if(R.P.th&&R.P.th[kh][0]===here&&!toks.includes("Thái hậu"))out.push(`sổ ghi Thái hậu ở đây (${here}) mà sân khấu không vẽ`);
   return{out,toks,place:here,at:`${R.key}/${kh}`,ov:document.documentElement.scrollWidth>innerWidth+1}});
  if(T.ov)rep.overflow++;if(T.out&&T.out.length)rep.stageBad.push({i,what,at:T.at,place:T.place,d:T.out});
  await p.evaluate(()=>__IA.check("dom"));
  rep.moments.push({i,what,at:M.at||'',place:M.place,stage:T.toks?T.toks.length:0});
  if(i%10===5)await p.screenshot({path:path.join(OUT,`stage-${SZ.replace(/[@x]/g,'_')}-${i}.png`)});
  const dead=await p.evaluate(()=>!!(S&&S.dead));if(dead){await p.evaluate(()=>{start()});await p.waitForTimeout(500);await clear()}}
 rep.ia=await p.evaluate(()=>({n:__IA.n,err:__IA.err,ex:__IA.ex}));rep.pageErrors=errs;
 fs.writeFileSync(path.join(OUT,`dom-${SZ.replace(/[@x]/g,'_')}.json`),JSON.stringify(rep,null,1));
 console.log(SZ,'moments',rep.moments.length,'mapBad',rep.mapBad.length,'stageBad',rep.stageBad.length,'reloads',rep.reloads,'reloadBad',rep.reloadBad.length,'overflow',rep.overflow,'ia',JSON.stringify(rep.ia.err),'pageErr',errs.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
