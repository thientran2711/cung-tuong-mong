/* LUẬT SỬA CẢ NHÓM audit for owner 17:06Z (story labels, deadlines, routes without silver, banners): every chính tuyến beat (ARC67 arcs +
   GB67 shared beats, j4 old story) and every phụ tuyến quest (j72 Việc nhờ) is read in the page. Writes dev/review/story-deadlines.md.
   usage: NODE_PATH=$(npm root -g) node dev/review/story_audit.js <url of the built page> [before.json]
   Columns: line · arc/quest · beat · silver options (price at Đáp ứng → Quý phi) · other routes · severity → deadline · own banner. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const T=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();const GIVE=/Mặc kệ|Đứng ngoài|^Thôi|Từ chối|Thoái thác|Đợi thời|Làm ngơ|Bỏ qua|Khéo từ chối/i;
  const has=typeof jstory!=='undefined'||typeof opts67!=='undefined';const jsOn=typeof pl67Open==='function';const out={arcs:[],q72:[],j4:[]};const ev=(typeof EVART!=='undefined'&&EVART)||{};
  S.bac=999;
  for(const id of Object.keys(ARC67)){const a=ARC67[id];let A=null;try{A=newThread67(id,'m')}catch(e){}if(!A){A={a:id,kind:'m',act:{},f:{},sc:0,used:[],hist:[],i:0,seq:['s','c','x']}}
   const st=(ev.stories||{})[id];const beats=Object.keys(a.B||{});
   for(const bid of beats){const bd=a.B[bid];let O=[];try{A.cur=bid;O=opts67(A,bd)}catch(e){O=[]}
    const sil=O.filter(o=>o.c&&o.c.bac<0&&!o.alt67),alt=O.filter(o=>o.alt67),free=O.filter(o=>!o.alt67&&!(o.c&&o.c.bac<0));
    const nat=free.filter(o=>!GIVE.test(T(typeof o.n==='function'?o.n(A):o.n)));
    let sev='',dl='';if(jsOn&&sil.length){try{sev=sev67(A,bid,bd);dl=dlT67(BAL['dl67'+sev])}catch(e){}}
    const raw=(typeof bd.o==='function'?(()=>{try{return bd.o(A)}catch(e){return[]}})():bd.o)||[];const rawSil=raw.filter(o=>o.c&&typeof o.c==='object'&&o.c.bac<0);
    out.arcs.push({line:'Chính tuyến',arc:id,t:a.t,bid,h:T(bd.h),sil:rawSil.map(o=>`${T(o.n)} (${o.c.bac})`),alt:alt.map(o=>T(fill67(o.n,A))),nat:nat.map(o=>T(fill67(o.n,A))),give:free.length-nat.length,
     sev,dl,art:!!(st&&st.files&&st.files[bid]),bia:!!(st&&st.files&&st.files.bia)})}}
  for(const k of Object.keys(GB67||{})){const bd=GB67[k];const A={a:'st_the',act:{},f:{},sc:0,used:[],hist:[],i:0,seq:['s','c','x']};let raw=[];try{raw=typeof bd.o==='function'?bd.o(A):bd.o}catch(e){}
   const rawSil=(raw||[]).filter(o=>o.c&&typeof o.c==='object'&&o.c.bac<0);out.arcs.push({line:'Chính tuyến (chung)',arc:'G',t:'beat chung',bid:'G.'+k,h:T(bd.h),sil:rawSil.map(o=>`${T(o.n)} (${o.c.bac})`),alt:rawSil.length?['(nhờ người quen, tự thêm)']:[],nat:[],give:0,sev:rawSil.length?'Vua':'',dl:rawSil.length&&jsOn?dlT67(BAL.dl67Vua):'',art:false,bia:false})}
  for(const Tq of (typeof T72!=='undefined'?T72:[])){const steps=(Tq.s||[]).map((s,i)=>{const c=s.c||{};const os=(s.ch||[]);return{i,n:T(s.n||''),bac:s.ch?0:(c.bac||0),obac:os.filter(o=>o.c&&o.c.bac<0).length,ofree:os.filter(o=>!(o.c&&o.c.bac<0)).length,alt:os.filter(o=>o.alt72).length}});
   const sil=steps.filter(s=>s.bac<0||s.obac);if(!sil.length)continue;out.q72.push({id:Tq.id,t:T(typeof Tq.t==='string'?Tq.t:''),dl:Tq.dl||6,steps:steps.length,sil:sil.map(s=>`${s.i+1}. ${s.n}${s.bac?` (${s.bac})`:''}`),free:sil.filter(s=>s.ofree>0).length,alt:sil.filter(s=>s.alt>0).length})}
  for(const k of Object.keys(PEND)){if(!/^(tt|dtq|muoi|cn|nc|td|ch|thd|cnv)\d$/.test(k))continue;let d=null;try{d=PEND[k]({o:50,son:null})}catch(e){}if(!d||!d.o)continue;
   const sil=d.o.filter(o=>o.fx&&o.fx.bac<0);if(sil.length)out.j4.push({k,sil:sil.map(o=>`${T(o.n)} (${o.fx.bac})`),other:d.o.filter(o=>!(o.fx&&o.fx.bac<0)).map(o=>T(o.n))})}
  out.mul=jsOn?BAL.cost67.slice():null;return out});
 R.errs=errs;fs.writeFileSync(path.join(__dirname,'../tmp/story_audit.json'),JSON.stringify(R,null,1));
 const A=R.arcs;const withSil=A.filter(r=>r.sil.length);const noArt=A.filter(r=>!r.art);
 const md=[];md.push('# Story deadlines · routes without silver · banners (owner 15/11 17:06Z) — audit','',
  'Script: `dev/review/story_audit.js` (reads ARC67 / GB67 / T72 / j4 PEND in the built page). Re-run after any story change.','',
  '## Rules now in the game (jstory.js)',
  '- Label on every story dialog: `Chính tuyến · <quest of her origin> · Bước i/n` (j67), `… · Cơ duyên hiếm` (j97), `Phụ tuyến · <việc> · Lời nhờ (n bước)` (j72), old saves `Chính tuyến · <quest> · Bước n` (j4).',
  `- Price by rank: chapter Bạc costs × BAL.cost67 = ${JSON.stringify(R.mul)} (rank 0 Đáp ứng … 8), rounded to 5.`,
  '- Deadline by severity when she cannot pay now: khẩn BAL.dl67Khan = 4 buổi · vừa dl67Vua = 9 buổi (3 ngày) · lớn dl67Lon = 21 buổi (7 ngày). Option "<việc>: nhận lời, lo liệu trong N"; countdown chip in the top-bar state row + Mệnh truyện tab; tap = the same choice again (pay, or another route, or "Để sau"). Fails only when the deadline passes (resolves as giving up, Danh −2).',
  '- Every chapter beat with a Bạc option also offers a route without silver (hand-written in ALT67, else "Nhờ người quen lo liệu, không dùng bạc": Sức −6, odds of the silver route −15 + Tai mắt + Lòng cung nữ).','',
  '## Summary',`- Chính tuyến beats: ${A.length}; with a Bạc option: ${withSil.length}; of those with a route without silver BEFORE (a non-give-up option without Bạc): ${withSil.filter(r=>r.nat.length).length}; AFTER (native or added): ${withSil.filter(r=>r.nat.length||r.alt.length).length}.`,
  `- Severity of the ${withSil.length} silver beats: khẩn ${withSil.filter(r=>r.sev==='Khan').length} · vừa ${withSil.filter(r=>r.sev==='Vua').length} · lớn ${withSil.filter(r=>r.sev==='Lon').length}.`,
  `- Phụ tuyến (j72) quests with a Bạc step: ${R.q72.length} (they already have a deadline in tuần, fail only when it passes, countdown in the Việc nhờ tab). Quests whose Bạc step has a branch without silver: ${R.q72.filter(q=>q.free).length} (before jstory: none — a Bạc step was a single act, blocked while she lacked the silver).`,
  `- Old story (j4, saves before chapters) beats with Bạc: ${R.j4.length} (td1 lão Vương got a route without silver + rank price).`,
  `- Chapter beats WITHOUT their own banner picture (fall back to the arc cover or a room picture): ${noArt.length} of ${A.length} (list at the end, for act-pics2).`,'',
  '## Chính tuyến beats with a Bạc option','','| arc | beat | silver option (base) | route without silver: before | added | severity → deadline |','|---|---|---|---|---|---|');
 for(const r of withSil)md.push(`| ${r.t} (${r.arc}) | ${r.bid} ${r.h} | ${r.sil.join('; ')} | ${r.nat.join('; ')||'— (only giving up)'} | ${r.alt.join('; ')||'—'} | ${({Khan:'khẩn',Vua:'vừa',Lon:'lớn'})[r.sev]||''} → ${r.dl} |`);
 md.push('','## Phụ tuyến (j72 Việc nhờ) with a Bạc step','','| quest | deadline (tuần) | steps | Bạc steps | Bạc steps with a free branch |','|---|---|---|---|---|');
 for(const q of R.q72)md.push(`| ${q.t||q.id} | ${q.dl} | ${q.steps} | ${q.sil.join('; ')} | ${q.free} |`);
 md.push('','## Old story j4 (only saves from before chapters)','','| beat | Bạc option | other options |','|---|---|---|');for(const r of R.j4)md.push(`| ${r.k} | ${r.sil.join('; ')} | ${r.other.join('; ')} |`);
 md.push('','## Banners missing (story events may show people) → act-pics2','',`${noArt.length} chapter beats have no own picture (\`EVENTS.json stories.<arc>.files.<beat>\`); they show the arc cover (bìa) when there is one, else a room picture. Arcs without even a cover: ${[...new Set(A.filter(r=>!r.bia&&r.arc!=='G').map(r=>r.arc))].join(', ')||'none'}.`,'','| arc | beats without own picture |','|---|---|');
 const by={};for(const r of noArt){if(r.arc==='G')continue;(by[r.t+' ('+r.arc+')']=by[r.t+' ('+r.arc+')']||[]).push(r.bid+' '+r.h)}for(const k in by)md.push(`| ${k} | ${by[k].join('; ')} |`);
 fs.writeFileSync(path.join(__dirname,'story-deadlines.md'),md.join('\n')+'\n');console.log(JSON.stringify({beats:A.length,silver:withSil.length,before:withSil.filter(r=>r.nat.length).length,after:withSil.filter(r=>r.nat.length||r.alt.length).length,q72:R.q72.length,j4:R.j4.length,noArt:noArt.length,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
