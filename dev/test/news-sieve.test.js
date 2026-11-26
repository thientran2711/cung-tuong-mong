/* NEWS SIEVE test (owner OD 26/11 ~04:40Z; dev/build/jnsieve.js). One palace life played N tuần (default 36 = one year) by a plain bot
   (takes the first payable option of every card), then the whole family of checks:
   1 daily feed is small: lines that reach her per tuần = «Tin báo» know lines (kitKnowFlush batches) + sentences of the «Tin trong cung» cards
   2 0 NPC-only lines in that feed (a line that names other consorts and nothing of hers, no evidence / night / rank / birth / death word)
   3 the monthly summary «Tin trong cung · tổng kết tháng» is there (≥ months-1, the first month only takes the baseline)
   4 0 «lower rank openly mocks a higher one» in every NPC drama line (newsAdd texts + every queued card) — rank read at that moment
   5 0 duplicate «Tin báo» / status-icon panels after 5 taps; one «Lui» (closeModal) empties them
   6 old save: a life without S.nsA / S.nsM keeps playing; nết shown from the start (trKnown = traitsOf for every consort)
   usage: node dev/test/news-sieve.test.js [dev/index.html] [tuần] [seed] [--json out.json] [--report]   exit 1 on a FAIL (--report: never fails; before/after on main) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const jI=A.indexOf('--json');const JOUT=jI>=0?A.splice(jI,2)[1]:null;const REP=A.includes('--report');const P=A.filter(x=>!x.startsWith('--'));
const URL='file://'+path.resolve(P[0]||'dev/index.html');const DAYS=+P[1]||36;const SEED=+P[2]||1;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1500);
 const st=await p.evaluate((SEED)=>{let s=SEED*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render();
  const R=window.__T={day:0,feed:[],mock:[],sum:[],cards:0};
  const tx=h=>String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  /* feed 1: every batch of know lines that reaches the «Tin báo» box */
  R.ntSeen=new Set();window.__ntScan=function(){try{for(const x of (window.NT&&NT.list)||[]){if(!x||R.ntSeen.has(x.id))continue;R.ntSeen.add(x.id);if(x.kind!=='know'&&x.kind!=='tin')continue;const src=x.kind==='tin'?(typeof x.go==='function'?'tin-live':'tin'):'know';for(const l of String(x.text||'').split(' · '))if(tx(l))R.feed.push({d:R.day,src,t:tx(l)})}}catch(e){}};
  /* mockery seen anywhere: newsAdd texts (outermost wrapper = every producer) */
  const MOCK=/che miệng cười|khiêu khích|hạ nhục|châm chọc|mỉa mai|cười nhạt|giễu cợt|chế giễu|cười nhạo/;
  const byName=n=>(rivals||[]).find(v=>v&&v.name===n);
  const names=t=>{const L=[];for(const v of rivals||[])if(v&&v.name){const i=t.indexOf(v.name);if(i>=0)L.push([i,v])}return L.sort((a,b)=>a[0]-b[0]).map(x=>x[1])};
  window.__mockCk=function(src,txt,actor){const T0=tx(txt);if(!MOCK.test(T0))return;for(const t of T0.split(/(?<=[.])\s+/)){if(!MOCK.test(t))continue;let a=actor||null,tg=null;const N=names(t);
   if(/hỏi bí quyết[^.]*cười nhạt/.test(t)){/* «w thấy x điểm trang khéo; nàng hỏi bí quyết, bị cười nhạt»: x laughs at w */if(N.length>=2){a=N[1];tg=N[0]}}
   else{if(!a)a=N[0]||null;tg=/(^|[^\p{L}])(ngươi|Ngươi)([^\p{L}]|$)/u.test(t)?S:(N.find(v=>v!==a)||null)}
   if(!a||!tg||a===S&&tg===S)continue;const ra=a===S?S.rank:(a.queen?7:a.rank),rt=tg===S?S.rank:(tg.queen?7:tg.rank);
   R.mock.push({d:R.day,src,ra,rt,low:ra<rt,t:t.slice(0,160)})}};
  const n0=newsAdd;newsAdd=function(v,k,txt){try{__mockCk('news:'+k,txt,null)}catch(e){}return n0.apply(this,arguments)};
  return {rank:S.rank,month:S.month,year:S.year,place:S.place}},SEED);
 console.log('life',JSON.stringify(st));
 for(let d=0;d<DAYS;d++){
  const r=await p.evaluate((d)=>{const R=window.__T;R.day=d;const tx=h=>String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
   const SENT=/(?<=[.!?…])\s+(?=[^\s.,;:!?…)\]»”])/u;
   const drain=()=>{for(const m of Q){if(!m)continue;const who=m.who&&(m.who.name||m.who.n)||'';
     if(m.kit&&/tổng kết tháng/.test(m.t||'')){R.sum.push({d,m:S.month,y:S.year,rows:(m.kit.facts||[]).length,facts:(m.kit.facts||[]).map(f=>typeof f==='string'?f:((f.who&&f.who.name||'')+' · '+f.text+' '+JSON.stringify(f.chips||'')))});R.feed.push({d,src:'sum',t:'tổng kết tháng'});continue}
     if((m.kind==='news'||/^Tin trong cung/.test(m.t||''))&&typeof m.h==='string'){R.cards++;const ps=[...m.h.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g)].filter(x=>!/class="past"/.test(x[1]||''));
       for(const x of ps)for(const s of String(x[2]).split(SENT)){const t=tx(s);if(t)R.feed.push({d,src:'card',t})}}
     const body=tx(m.h||'')+' '+tx(m.t||'');try{const a=who?(rivals||[]).find(v=>v&&v.name===who):null;__mockCk('card:'+(m.t||''),body,a)}catch(e){}}
    let g=0;while(Q.length&&g++<40){const m=Q[0];try{if(m&&m.opts&&m.opts.length){let i=m.opts.findIndex(c=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));chooseM(i<0?0:i);if(Q[0]===m)Q.shift()}else Q.shift()}catch(e){Q.shift()}}
    Q.length=0;S.mg=0};
   for(let bb=0;bb<5;bb++){drain();try{placeWhere()}catch(e){}try{nextBuoi()}catch(e){R.err=(R.err||0)+1}try{kitKnowFlush()}catch(e){}__ntScan();drain();if(S.dead)break}
   try{R.her=R.her||new Set();R.her.add(S.name);if(S.maid)R.her.add(S.maid.name);for(const s of S.staff||[])if(s&&s.name)R.her.add(s.name)}catch(e){}
   try{kitKnowFlush()}catch(e){}__ntScan();return {dead:!!S.dead,m:S.month,y:S.year}},d);
  if(r.dead){console.log('dead at tuần',d,'→ a new palace life, the count goes on');await p.evaluate(()=>{window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;Q.length=0;try{deal()}catch(e){}})}}
 const out=await p.evaluate(()=>{const R=window.__T;const tx=h=>String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  /* NPC-only (independent of the sieve's own code): names a consort, nothing of hers, no keep word */
  const her=[...(R.her||new Set())].filter(x=>x&&x.length>1);
  const KEEP0=/trượt khảo hạch|không đỗ khảo hạch/;const KEEP=/phát bệnh sau khi dùng|ngài chọn sang cung|hậu thưởng|trúng độc|đầu độc|hạ độc|dấu độc|thấy dấu|thẻ bài|Đêm qua|Hoàng thượng sang cung|chặn ngự giá|chứng cứ|bằng chứng|tang vật|nhân chứng|tố giác|tố cáo|thị tẩm|lật thẻ|sủng hạnh|cướp đêm|giành đêm|đêm của|được gọi nhiều nhất|tấn phong|thăng phẩm|thăng bậc|giáng|bị phế|phế ngôi|lãnh cung|cấm túc|mang thai|có thai|hạ sinh|sinh hạ|sảy thai|băng hà|qua đời|mà chết|chết đuối|ban hiệu|được mời sang cung/i;
  const rn=(rivals||[]).filter(v=>v&&v.name).map(v=>v.name);
  const isHer=t=>/(^|[^\p{L}])(ngươi|Ngươi)([^\p{L}]|$)/u.test(t)||/(?<![\p{L}])(?<!nàng )(ta|Ta)(?![\p{L}])/u.test(t)||her.some(n=>t.includes(n));
  const npcOnly=t=>{if(/^tổng kết tháng$/.test(t))return false;if(/^(Qua câu chuyện|Ta biết|Ngươi biết)/.test(t))return false;if(/^Trong cung truyền tai nhau: (Hoàng thượng|Thái hậu)/.test(t))return false;if(/^Trong cung truyền tai nhau/.test(t))return !isHer(t);if(isHer(t))return false;if(KEEP0.test(t))return rn.some(n=>t.includes(n));if(KEEP.test(t))return false;return rn.some(n=>t.includes(n))};
  const F=R.feed.filter(x=>x.src!=='sum'&&x.src!=='tin-live'/* a live «go see» item opens a choice */);const per={};for(const x of R.feed)per[x.d]=(per[x.d]||0)+1;
  const days=Object.keys(per).length?Math.max(...Object.keys(per).map(Number))+1:0;const counts=[];for(let d=0;d<=R.day;d++)counts.push(per[d]||0);
  const npc=F.filter(x=>npcOnly(x.t));
  /* nết open */
  let netOpen=null;try{const L=liveRivals(true).filter(v=>v&&v.alive&&!v.out);netOpen={n:L.length,open:L.filter(v=>{const T=traitsOf(v),K=trKnown(v);return T.length&&T.every(t=>K.includes(t))}).length}}catch(e){netOpen={err:String(e)}}
  return {feed:R.feed,tuan:R.day+1,lines:R.feed.length,avg:+(R.feed.length/(R.day+1)).toFixed(2),max:Math.max(...counts),counts,npc:npc.length,npcEx:npc.slice(0,8),
   srcs:R.feed.reduce((o,x)=>(o[x.src]=(o[x.src]||0)+1,o),{}),sum:R.sum,mock:R.mock.length,low:R.mock.filter(x=>x.low),mockEx:R.mock.slice(0,5),netOpen,nsv:window.NSV?NSV.stat:null,err:R.err||0}});
 /* 5 duplicates: 5 taps on the box / a status icon, then one «Lui» */
 const dup=await p.evaluate(()=>{const o={};Q.length=0;try{kitNotice({id:'nsv-t1',line:'Tin thử',text:'Tin thử một dòng.'})}catch(e){}
  for(let i=0;i<5;i++){try{kitNoticeOpen()}catch(e){}}o.box=Q.filter(m=>m&&m.t==='Tin báo').length;try{closeModal()}catch(e){Q.shift()}o.boxAfterLui=Q.filter(m=>m&&m.t==='Tin báo').length;
  Q.length=0;let id=null;try{id=(kitStatusIcon.items()||[])[0]}catch(e){}o.icon=id;if(id){for(let i=0;i<5;i++){try{kitStatusIcon.open(id)}catch(e){}}const t=Q[0]&&Q[0].t;o.iconN=Q.filter(m=>m&&m.t===t).length;try{closeModal()}catch(e){Q.shift()}o.iconAfterLui=Q.filter(m=>m&&m.t===t).length}
  Q.length=0;try{for(let i=0;i<5;i++)kitToastTap('Ngự hoa viên sắp đóng cửa.')}catch(e){}o.toast=Q.filter(m=>m&&m.t==='Tin báo').length;Q.length=0;return o});
 /* 6 old save: drop the sieve fields, play one more tuần */
 const old=await p.evaluate(()=>{try{delete S.nsA;delete S.nsM;const raw=JSON.stringify(S);S=JSON.parse(raw);for(let i=0;i<5;i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){return{err:String(e)}}}Q.length=0;return{ok:true,nsA:!!S.nsA}}catch(e){return{err:String(e)}}});
 out.dup=dup;out.old=old;out.errs=errs.slice(0,10);
 console.log(JSON.stringify({tuan:out.tuan,lines:out.lines,avg:out.avg,max:out.max,srcs:out.srcs,npc:out.npc,sumN:out.sum.length,mock:out.mock,low:out.low.length,netOpen:out.netOpen,nsv:out.nsv,dup,old}));
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify(out,null,1));
 const months=Math.floor(out.tuan/3);
 ok(out.avg<=12&&out.max<=40,'1 daily feed small: lines per tuần (Tin báo know lines + Tin trong cung sentences + summary)',{avg:out.avg,max:out.max,srcs:out.srcs});
 ok(out.npc===0,'2 no NPC-only line in the daily feed',out.npcEx);
 ok(out.sum.length>=months-1&&out.sum.every(s=>s.rows>0),'3 monthly summary present',out.sum.map(s=>`${s.m}/${s.y}:${s.rows}`));
 ok(out.low.length===0,'4 no lower rank openly mocks a higher one',out.low.slice(0,5));
 ok(dup.box===1&&dup.boxAfterLui===0&&(!dup.icon||(dup.iconN===1&&dup.iconAfterLui===0))&&dup.toast<=1,'5 one copy per tapped panel; one «Lui» closes it',dup);
 ok(old.ok&&out.netOpen&&out.netOpen.n>0&&out.netOpen.open===out.netOpen.n,'6 old save plays on; every consort\'s nết shown from the start',{old,netOpen:out.netOpen});
 ok(errs.length===0&&!out.err,'no page errors',errs.slice(0,5));
 await b.close();const fail=res.filter(x=>!x).length;console.log(fail?`NEWS-SIEVE FAIL ${fail}/${res.length}`:`NEWS-SIEVE PASS ${res.length}/${res.length}`);process.exit(fail&&!REP?1:0)})();
