/* Co-op bot run: two headless clients auto-play WEEKS weeks in one room on the LIVE Worker and compare their worlds every week.
   usage: python3 dev/build/assemble.py && node dev/test/coop-bot.js [weeks=52] [outdir] [workerURL]
   Each buổi each bot answers open choices at random, taps up to 3 random enabled act cards, then Qua buổi / Qua đêm.
   After every merged week both worlds are compared (Emperor, date, consorts id/name/rank/alive/out/queen, their children,
   Thái hậu, friend entry = the other player's real name + rank). Deaths → the bot takes the rebirth choice and goes on. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const WEEKS=+(process.argv[2]||52);const OUT=path.resolve(process.argv[3]||path.join(__dirname,'../shots/coop-bot'));if(require.main===module)fs.mkdirSync(OUT,{recursive:true});
const WURL=(require.main===module&&process.argv[4])||'https://ctm-coop.victoria-tntt.workers.dev';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const log=[];const L=s=>{console.log(s);log.push(s)};
async function mk(b,name,vp,wurl){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  /* THIN=n (host's wanted thin level, dev flag) + THINPART=4,… (test-only part flags, contract C1) for a thin-guest run on a Worker with part A */
  await ctx.addInitScript(([l,pts,host])=>{try{if(l&&host)localStorage.setItem('ctm-thin',l);for(const p of pts)if(p)localStorage.setItem('ctm-thin-part-'+p,'1')}catch(e){}},[process.env.THIN||'',(process.env.THINPART||'').split(','),name==='A']);
  await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const on=typeof c.on==='boolean'?c.on:!!(s.playing||(s.status&&s.status!=='off'));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},wurl||WURL);
  /* TRIP=1 (review/coop-thin-a): the guest tripwire (thin-guest progress meter) on the guest page */
  if(process.env.TRIP&&name==='B')await ctx.addInitScript({path:path.join(__dirname,'coop-thin-trip.js')});
  const p=await ctx.newPage();p.setDefaultTimeout(30000);const o={name,ctx,p,errs:[],acts:0,deaths:0,names:[],meets:0,harms:0,hk:{}};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const until=async(o,fn,arg,ms=30000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
/* one step of the bot inside the page: returns what it did */
/* THE shared co-op tap step (roulette «Bỏ qua», kit scene close, jfocus / jdfv, kg82 skip) runs before STEP: dev/test/lib/coop-clear.js (LAW 11) */
const CLR=require('./lib/coop-clear.js');
const STEP=()=>{const c=__co();if(c.frozen||c.waiting)return'coop';if(typeof S==='undefined'||!S)return'nos';if(S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
  if(S&&S.dead){const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung/.test(x.textContent))||b.find(x=>x.closest('#modal'));if(k){k.click();return'reborn:'+k.textContent.trim().slice(0,20)}return'dead'}
  const T=document.getElementById('title');if(T&&!T.hidden){const b=[...T.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Lật|Chọn/.test(x.textContent))||b[0];if(k){k.click();return'title'}}
  const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'overlay'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'book'}
  /* the toilette screen (jtoil, Điểm trang, makeup-lux on main): take a shown prize (Nhận), then keep yesterday's clothes (a player's road) */
  {const tk=document.getElementById('toilkeep');if(tk&&tk.offsetParent!==null){const nh=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&x.textContent.trim()==='Nhận');if(nh){nh.click();return'toil-take'}tk.click();return'toil'}}
  const m=document.getElementById('modal');if(m&&!m.hidden){const A0=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);const acc=A0.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||A0.find(x=>/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent));if(acc){acc.click();return'accept'}const o=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];const b=o.length?o[Math.floor(Math.random()*o.length)]:m.querySelector('#mr button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'modal'}return'stuck'}
  if(window.__actsThis==null)window.__actsThis=0;
  /* meet the friend / act on her like on an NPC (owner: full act set, place-dependent) */
  const f=rivals.find(v=>v.coop&&v.alive&&!v.out);
  if(f&&!window.__metThis&&Math.random()<.35){window.__metThis=1;try{const k=whereOf(f);if(k&&k!==S.place&&k!=='lc'){goTo(k);return'meet:'+k}}catch(e){}}
  if(f&&!window.__hitThis&&together(S,f)&&Math.random()<.5){window.__hitThis=1;
    const K=['rumor','trip','ally','gift','spy','frame','pushp','steal'].filter(k=>{try{return ACT[k]&&ACT[k].ok(S,f)}catch(e){return false}});
    if(K.length){const k=K[Math.floor(Math.random()*K.length)];try{if(k==='gift'||k==='plant')return'skipgift';spend&&spend(2);const r=runAct(S,f,k);if(r)log(r);render();return'harm:'+k}catch(e){return'harmerr:'+e.message}}}
  if(window.__actsThis<3&&Math.random()<.8){const cards=[...document.querySelectorAll('#panel button.card:not([disabled]),#panel button.kcard:not([disabled])')].filter(x=>x.offsetParent!==null);
    if(cards.length){window.__actsThis++;cards[Math.floor(Math.random()*cards.length)].click();return'act'}
    const t=[...document.querySelectorAll('[data-tab="act"]')].find(x=>x.offsetParent!==null);if(t&&!window.__tabTried){window.__tabTried=1;t.click();return'tab'}}
  const n=document.getElementById('next');if(n&&!n.disabled){window.__actsThis=0;window.__tabTried=0;window.__metThis=0;window.__hitThis=0;n.click();return'next'}return'idle'};
/* per-buổi view: NPC whereabouts (from the shared state) + where each sees the other */
const BUOI=()=>{if(typeof S==='undefined'||!S||S.dead)return null;const c=__co();const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);
  /* one place name on both pages (robot-coop-fix-1): my own 'home' = H:<my seat>; the friend's palace as THIS page names it (palaceOf(f), e.g. r3 on the host; the game maps her 'home' there, jcoopworld mapPlace) = H:<her seat>. Was: 'home' → r901/r902 on each page, so the host's r3 for her palace never matched her r902 (false coop-pos every buổi). */
  const ms=((window.COOP&&COOP.state&&COOP.state.you)||COOPW.seat)==='a'?'a':'b'/* the room seat (CW.seat can be the other seat inside a thin withSeat step) */,fs=ms==='a'?'b':'a';let fp=null;try{fp=f&&f.id!=null?palaceOf(f):null}catch(e){}const hm=x=>x==='home'?'H:'+ms:(fp&&x===fp?'H:'+fs:x);
  return{key:c.week+'.'+(S.buoi||0),ready:!c.waiting&&!c.frozen&&!document.querySelector('#coopfz')&&(COOPW.seat==='a'||COOPW.whereKey===c.week+':'+(S.buoi||0)),where:Object.entries(S.where||{}).filter(([k,v])=>!(+k>=900)&&typeof v==='string').map(([k,v])=>k+'@'+v).sort().join(),
   fpl:f&&f.id!=null?hm(whereOf(f)):null,me:f&&f.id==null?null:hm(S.place||'home'),fst:f&&f.id!=null?[f.sung,f.danh,f.suc].join('/'):null,fk:f?k61St(f):-1,mst:[S.sung,S.danh,S.suc].join('/')}};
/* the world as this client sees it (only shared truth, no personal data) */
const WORLD=()=>{const kidsOf=v=>(v.kids||[]).map(k=>k.name+(k.alive?'':'†')).join('/');
  return{date:[S.year,S.month,S.tuan],emp:[S.emp.era,S.emp.age,(S.emp.traits||[]).join('+'),!!S.emp.dead],th:!!S.thDead,
   R:rivals.filter(v=>!v.coop).map(v=>[v.id,v.name,v.queen?7:v.rank,v.alive?1:0,v.out?1:0,kidsOf(v)].join(':')).sort(),
   friend:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||null)&&(({name,rank,alive,queen,sid,id})=>({name,rank:id==null?'srv':queen?7:rank,alive}))((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)),
   me:{name:S.name,rank:S.srv&&!S.srv.risen?'srv':S.rank,dead:!!S.dead,srv:!!S.srv},mst:{sung:S.sung,danh:S.danh,suc:S.suc},fst:(f=>f&&f.id!=null?{sung:f.sung,danh:f.danh,suc:f.suc}:null)((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)),where:Object.entries(S.where||{}).filter(([k])=>!(+k>=900)).map(([k,v])=>k+'@'+v).sort().join(),buoi:S.buoi||0}};

/* robot10-coop.js (ROBOT-10 co-op runner) requires this file for mk / STEP / BUOI / WORLD: the run below starts only as a script */
if(require.main===module)(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});/* a local Worker (wrangler dev) */const A=await mk(b,'A',[755,1000]),B=await mk(b,'B',[1180,820]);
 await A.p.goto(BASE);await A.p.waitForTimeout(3000);await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/);await A.p.waitForTimeout(500);await tapText(A,/^(Mời bạn|Mời hảo hữu)/);
 await until(A,()=>__co().code&&__co().seat==='a');const code=(await A.p.evaluate(()=>__co())).code;L('room '+code);
 await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 if(!await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000))L('FAIL B could not join');
 const div=[];let weeks=0,whereDiff=0,lastKey='',buoiN=0,statLag=0,pend={};const knownLog={};const posDiff=[];const t0=Date.now();
 for(let w=0;w<WEEKS;w++){const wk=(await A.p.evaluate(()=>__co().week));
  const done={A:false,B:false};const t=Date.now();
  const KILL={10:['B',0],20:['A',1500],30:['B',2500]}[w];let killed=!KILL;  /* forced deaths: guest at buổi start, host and guest mid-week */
  while(Date.now()-t<120000){
   if(!killed&&Date.now()-t>=KILL[1]){killed=true;const o=KILL[0]==='A'?A:B;const r=await o.p.evaluate(()=>{if(typeof S==='undefined'||!S||S.dead)return'no';const b=S.buoi||0;die('Thử: trúng gió');return 'buổi '+b}).catch(e=>e.message);L(`week ${w}: forced death of ${o.name} (${r})`)}
   const [pa,pb]=[await A.p.evaluate(BUOI).catch(()=>null),await B.p.evaluate(BUOI).catch(()=>null)];
   if(pa&&pb&&pa.key===pb.key&&pa.ready&&pb.ready&&pa.key!==lastKey){
     const pd=[];if(pa.fpl&&pb.me&&pa.fpl!==pb.me)pd.push(`A sees B at ${pa.fpl}, B is at ${pb.me}`);if(pb.fpl&&pa.me&&pb.fpl!==pa.me)pd.push(`B sees A at ${pb.fpl}, A is at ${pa.me}`);
     const same=pa.where===pb.where&&!pd.length&&(!pa.fst||pa.fst===pb.mst)&&(!pb.fst||pb.fst===pa.mst);/* robot-coop-fix-1: stats settle too */
     if(pend.key!==pa.key)pend={key:pa.key,t:Date.now()};
     if(same||Date.now()-pend.t>5000){lastKey=pa.key;buoiN++;
       if(pa.where!==pb.where){whereDiff++;if(whereDiff<=5)L(`buổi ${pa.key} NPC places differ: A-only [${pa.where.split(',').filter(x=>!pb.where.split(',').includes(x)).slice(0,6)}] B-only [${pb.where.split(',').filter(x=>!pa.where.split(',').includes(x)).slice(0,6)}]`)}
       pd.forEach(x=>posDiff.push(pa.key+' '+x));
       if((pa.fst&&pa.fst!==pb.mst)||(pb.fst&&pb.fst!==pa.mst)){statLag++;if(statLag<=4)L(`buổi ${pa.key} stats: A sees B ${pa.fst} (B ${pb.mst}) · B sees A ${pb.fst} (A ${pa.mst})`)}
       if(buoiN===1)L(`first buổi: friend known-state A ${pa.fk} B ${pb.fk} (0 = Người lạ)`);knownLog[pa.fk+'/'+pb.fk]=(knownLog[pa.fk+'/'+pb.fk]||0)+1;}}
   for(const o of [A,B]){const r=await CLR.first(o,STEP).catch(e=>'err:'+e.message);if(r==='act')o.acts++;if(/^meet/.test(r))o.meets++;if(/^harm:/.test(r)){o.harms++;o.hk[r.slice(5)]=(o.hk[r.slice(5)]||0)+1}if(/^harmerr/.test(r))L(o.name+' '+r);if(/^reborn/.test(r)){o.deaths++;L(`week ${w}: ${o.name} died → ${r}`)}}
   const wa=await A.p.evaluate(()=>__co().week),wb=await B.p.evaluate(()=>__co().week);if(wa>wk&&wb>wk)break;await sleep(60)}
  const wa=await A.p.evaluate(()=>__co().week),wb=await B.p.evaluate(()=>__co().week);if(!(wa>wk&&wb>wk)){L(`FAIL week ${w}: stuck (A week ${wa}, B week ${wb})`);
   for(const o of [A,B])L(o.name+' trace: '+await o.p.evaluate(()=>JSON.stringify({buoi:S&&S.buoi,week:COOP.state.week,bend:COOPW.bend,pendBuoi:COOPW.pendBuoi,pend:COOPW.pend,sent:COOPW.sent,whereKey:COOPW.whereKey,Q:Q.length,Qt:Q.map(x=>x.t+(x.cls?'/'+x.cls:'')),mh:document.getElementById('modal').hidden,book:!!document.querySelector('.kbk-bar'),mg:!!(S&&S.mg),dead:S&&S.dead,next:document.getElementById('next').textContent+(document.getElementById('next').disabled?' (off)':''),tr:COOPW.tr.slice(-25)})).catch(e=>e.message));
   try{L('room: '+JSON.stringify(await (await fetch(WURL+'/api/room/'+code)).json()))}catch(e){}
   await A.p.screenshot({path:`${OUT}/stuck-A.png`});await B.p.screenshot({path:`${OUT}/stuck-B.png`});break}
  await sleep(400);weeks++;
  const a=await A.p.evaluate(WORLD),c=await B.p.evaluate(WORLD);
  const d=[];if(String(a.date)!==String(c.date))d.push(`date ${a.date} vs ${c.date}`);if(String(a.emp)!==String(c.emp))d.push(`emp ${a.emp} vs ${c.emp}`);if(a.th!==c.th)d.push('thái hậu');
  const ra=new Set(a.R),rc=new Set(c.R);const onlyA=a.R.filter(x=>!rc.has(x)),onlyB=c.R.filter(x=>!ra.has(x));if(onlyA.length||onlyB.length)d.push(`consorts A-only [${onlyA}] B-only [${onlyB}]`);
  if(!a.friend||a.friend.name!==c.me.name)d.push(`A sees friend ${a.friend&&a.friend.name}, B is ${c.me.name}`);if(!c.friend||c.friend.name!==a.me.name)d.push(`B sees friend ${c.friend&&c.friend.name}, A is ${a.me.name}`);
  if(a.friend&&a.friend.rank!==c.me.rank)d.push(`A sees B rank ${a.friend.rank}, B has ${c.me.rank}`);if(c.friend&&c.friend.rank!==a.me.rank)d.push(`B sees A rank ${c.friend.rank}, A has ${a.me.rank}`);
  for(const [x,y,nx,ny] of [[a,c,'A','B'],[c,a,'B','A']]){if(x.fst&&y.mst){for(const k of ['sung','danh','suc'])if(Math.abs((x.fst[k]||0)-(y.mst[k]||0))>0)d.push(`${nx} sees ${ny}.${k}=${x.fst[k]}, ${ny} has ${y.mst[k]}`)}}
  if(d.length){div.push([w+1,d]);L(`week ${w+1} DIVERGE: ${d.join(' | ')}`)}
  if(w%4===3)L(`week ${w+1} ok-ish · date ${a.date} · A ${a.me.name} r${a.me.rank} · B ${c.me.name} r${c.me.rank} · consorts ${a.R.length}`);
  if(w===0||w===25||w===WEEKS-1){await A.p.screenshot({path:`${OUT}/w${w+1}-A-fold.png`});await B.p.screenshot({path:`${OUT}/w${w+1}-B-ipad.png`})}}
 const mins=((Date.now()-t0)/60000).toFixed(1);
 L(`\nweeks played ${weeks}/${WEEKS} in ${mins} min · acts A ${A.acts} B ${B.acts} · deaths A ${A.deaths} B ${B.deaths} · weeks with divergence ${div.length}`);
 L(`buổi compared ${buoiN} · buổi with NPC places differing ${whereDiff} · friend-position mismatches ${posDiff.length} · buổi where the friend's Sủng/Danh/Sức shown ≠ her own ${statLag} · meets A ${A.meets} B ${B.meets} · acts on the friend A ${A.harms} ${JSON.stringify(A.hk)} B ${B.harms} ${JSON.stringify(B.hk)}`);L('friend known-state A/B per buổi (0 stranger,1 face,3 face+name): '+JSON.stringify(knownLog));posDiff.slice(0,8).forEach(x=>L('  pos: '+x));
if(process.env.TRIP){const t=await B.p.evaluate(()=>window.__trip&&__trip()).catch(e=>({err:e.message}));L(`\nTRIPWIRE guest writes outside fromCanon: ${t&&t.total} (every write incl. same value ${t&&t.raw}) · by root ${JSON.stringify(t&&t.byRoot)} · S replaced ${t&&t.sReplaced} rivals replaced ${t&&t.rReplaced} · fn|root pairs ${t&&t.pairs}`);L(`TRIPWIRE by part (owner of the write, audit §3; "?" = no engine entry found): ${JSON.stringify(t&&t.byPart)}`);L(`TRIPWIRE STATE (without private "__" markers/guards = the meter to report): ${t&&t.state} · by part ${JSON.stringify(t&&t.statePart)}`);(t&&t.top||[]).forEach(x=>L(`  ${x[2]}\t${x[0]}\t${x[1]}`));fs.writeFileSync(OUT+'/trip.json',JSON.stringify(t,null,1))}
 L(`page errors A ${A.errs.length} B ${B.errs.length}`);[...new Set([...A.errs,...B.errs])].slice(0,10).forEach(e=>L('  err: '+e.slice(0,200)));
 fs.writeFileSync(OUT+'/bot-log.txt',log.join('\n')+'\n');await b.close();process.exit(div.length||weeks<WEEKS||whereDiff||posDiff.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
module.exports={mk,tapText,until,STEP,BUOI,WORLD,CLR,WURL};
