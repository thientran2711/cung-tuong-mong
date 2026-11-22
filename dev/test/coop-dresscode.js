/* review/dresscode r3: CO-OP LAND GATE for the season + colour dress code (owner via MAIN 20/11 21:35Z: every feature works for BOTH seats).
   2 browsers in one room against the LIVE Worker; host = Fold 755x1000@2 (seat a), guest = iPad 1180x820@2 (seat b). Helpers copied from coop-guest-maid.js.
   1 festival gate fires on BOTH seats (her own dcTurn on the real festival tuần stub), same roads incl. «Cáo lỗi».
   2 guest BORROWS an NPC's trâm: her side moves at once, request «dcout» → the host takes it out of the NPC's chest (relay, same week);
     after the merged week both seats see the NPC without it and she wears it (loan row).
   3 next tuần the piece goes back: request «dcin» → the NPC has it again on both seats, the guest holds nothing of it.
   4 two-way: an NPC asks the GUEST to borrow her trâm (the real dcWeek ask frame) → «Cho mượn» → the host puts it on the NPC (worn),
     both seats see it; next tuần it comes back to her ONCE (no copy), the NPC no longer has it on either seat.
   usage: python3 dev/build/assemble.py && node dev/test/coop-dresscode.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-dresscode'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);/* night-final (as coop-e2e): .kcf / #kroul are no longer hidden — clear() (lib/coop-clear.js) ends them like a player */await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(400);const t0=Date.now();const alive=await Promise.race([o.p.evaluate(()=>1),sleep(10000).then(()=>0)]);if(!alive){ok(false,`${n} ${o.name}: page responsive`);return}
  try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:120000})}catch(e){ok(false,`${n} ${o.name}: screenshot (${e.message.split('\n')[0]})`);return}
  const ov=await o.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${n} ${o.name}: no horizontal overflow`)};
const C=o=>o.p.evaluate(()=>__co());
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}}
/* wait for fn while both players read their dialogs (the week's end goes out only once her dialogs are closed) */
async function untilC(o,fn,arg,ms=40000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn,arg).catch(()=>false))return true;for(const x of ALL)if(x.p&&!x.p.isClosed())await clear(x);await sleep(300)}return false}
const ALL=[];
/* DOMContentLoaded, not load: a CDN picture or font that hangs on the network held the load event past 120 s (3 of ~17 runs, always the guest's join); the game is up at DCL and every step waits for its own state */
const DCL={waitUntil:'domcontentloaded'};
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){/* the click itself is done; a navigation it starts (Chơi một mình → the sổ) is waited for by the caller's own state checks (a slow machine held 'scheduled navigations' past 30 s) *//* the panel may re-render between finding the button and clicking it (element detached): find it again */
  try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close story/news modals of the normal game (never the co-op waiting/freeze panel) */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* press "Qua buổi"/"Qua đêm" when it is enabled (waits up to 20 s: after the friend's dialogs, the host's NPC places, …) */
async function press(o,k0){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(k0=>{
   /* a night with the Emperor (jnight) spends the rest of her day: her buổi is already ended through the co-op path (bend / week end) */
   if(k0&&(COOPW.bend||COOPW.pend||__co().waiting))return true;
   const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true},k0||null);if(r)return true;await sleep(250)}
  ok(false,o.name+' #next enabled',await o.p.evaluate(()=>[S.buoi||0,S.tuan,S.month,document.getElementById('next').textContent]));return false}
/* one buổi for both (PROTOCOL §9: the buổi advances when both have ended it) */
/* COOP_NIGHTS=1 (stress): before a buổi, one seat may win a night with the Emperor (as Tranh sủng does), so jnight ends her day */
const NIGHTS=+process.env.COOP_NIGHTS||0;
async function night(o){await o.p.evaluate(()=>{const v=liveRivals(false).find(x=>!x.coop);if(!v||S.dead)return;S.preg=0;stealWin(S,v,'feign');showModal()});COOPW_n=(typeof COOPW_n==='number'?COOPW_n:0)+1}
var COOPW_n=0;
/* COOP_SPILL=1 (review/khac-day): before a day buổi, seat A runs a 2-khắc act with 1 khắc left, so it spills (j76: S.j76carry);
   once the room turns the buổi, A starts it with exactly that 1 khắc already used: never 0 (lost), never 2 (charged twice) */
const SPILL=+process.env.COOP_SPILL||0;
async function spillA(A){return A.p.evaluate(()=>{if(S.dead||Q.length||S.mg||(S.buoi||0)>=B4L||COOPW.bend||COOPW.pend)return null;
  /* read used right as the buổi turns (later dialogs of the new buổi may spend khắc of their own) */
  if(!window.__tuw){window.__tuw=1;const n0=nextBuoi;nextBuoi=function(){const b=S&&S.buoi;const r=n0.apply(this,arguments);try{if(S&&S.buoi!==b)window.__tu={b:S.buoi,used,carry:S.j76carry||0}}catch(e){}return r}}window.__tu=null;used=3;S.j76carry=0;S.j76ck="";
  const i=deck.findIndex(a=>a&&a.b==null&&!a.done&&cardCost(a)===2&&!cardWhy(a));if(i<0)return null;const need=j76need(2);act(i);if(used===3&&!S.j76carry)return null;/* the card asks first (Tự học → kg82 minigame, a choice): it spends at its end; not this check */return{n:deck[i].n,need:need.t,used,carry:S.j76carry||0}})}
async function buoiBoth(A,B,shotWait){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));
  if(NIGHTS&&Math.random()<.45)await night(Math.random()<.5?A:B);
  const sp=SPILL?await spillA(A):null;if(sp)ok(sp.used===4&&sp.carry===1,'spill '+k0+': act runs on into the next buổi (carry 1)',sp);
  await press(A,k0);if(shotWait)await shot(A,shotWait);await press(B,k0);
  /* a seat whose week end is out (after its tối, or a night that spent its day) waits for the merged week: count it as done */
  const key=o=>o.p.evaluate(()=>COOPW.pend||__co().waiting?'end':__co().week+':'+(S.buoi||0));
  for(let t=0;t<80;t++){const a=await key(A),b=await key(B);if(a!==k0&&b!==k0&&(a===b||a==='end'||b==='end')){
    if(sp&&sp.carry===1){await sleep(600);const st=await A.p.evaluate(()=>Object.assign({k:__co().week+':'+(S.buoi||0),now:used},window.__tu||{used:-1}));ok(st.used===1&&!st.carry,'spill '+k0+' → '+st.k+': the next buổi pays the carry once',st)}
    return true}await clear(A);await clear(B);await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}
async function rejoinB(B,code){await B.p.close();await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 return until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000)}
async function weekAll(A,B,tag){const wk=(await C(A)).week;await weekBoth(A,B,1);let r=true;for(const o of [A,B])r=await untilC(o,x=>__co().week===x+1,wk,90000)&&r;ok(r,tag+': week advanced for both');await clear(A);await clear(B);return r}
const T=k=>`(WD_ITEMS[${JSON.stringify(k)}]||{})`;
/* the test's pieces carry a tag (tg), so a trâm of the same kind the NPC buys herself at a real festival is not counted */
const npcHas=(o,id,k)=>o.p.evaluate(([id,k])=>{const v=rivals.find(x=>x.id===id);if(!v)return null;const w=wdOf(v);const m=e=>e&&e.k===k&&e.tg;return{inv:(v.inv||[]).filter(m).length,worn:!!m(w.tram),bor:!!(m(w.tram)&&w.tram.bor)}},[id,k]);
const herHas=(o,k)=>o.p.evaluate(k=>{const w=wdOf(S);const m=e=>e&&e.k===k&&e.tg;return{inv:(S.inv||[]).filter(m).length,worn:!!m(w.tram),bor:!!(m(w.tram)&&w.tram.bor),asks:(S.coopAsk||[]).map(a=>a.id)}},k);
async function weeks(A,B,n,tag){for(let i=0;i<n;i++)await weekAll(A,B,tag+'.'+i)}
(async()=>{const b=await chromium.launch();
 /* COOP_SWAP=1 (as coop-e2e): the iPad hosts (seat a), the Fold joins (seat b) */
 const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 const A=await mk(b,VA[0],VA[1]),B=await mk(b,VB[0],VB[1]);ALL.push(A,B);
 for(const o of [A,B])await o.ctx.addInitScript(()=>{window.__forceOrigin='thd'});/* both consorts (a maid has no festival gate) */
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 ok(await B.p.evaluate(()=>dcOn()&&!!COOPW.askH&&!!COOPW.askH.dcout&&!worldOn()),'guest: dresscode on, request kinds dcout/dcin registered, worldOn false');
 /* 1 the festival gate on both seats (her own dcTurn, festival tuần stubbed: Tết Nguyên đán, strict) */
 /* the first festival (calendar order) whose colours her painted robe lacks: each seat its own person */
 const gate=o=>o.p.evaluate(()=>{S.inv=(S.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram'||e.dcPrev);wdOf(S).tram=null;
   const fk=Object.keys(BAL.dc.fest).find(k=>FEST[k]&&(st=>st&&(st.miss||st.refused))(dcStat(S,k)));if(!fk)return{nofest:1};
   const f0=festToday;festToday=()=>Object.assign({k:fk},FEST[fk]);try{S.dcF=null;const n0=Q.length;dcTurn();const g=Q.slice(n0).find(q=>q.ev==='dc');if(g)Q.splice(Q.indexOf(g),1);
   return g?{fk,t:g.t,opts:g.opts.map(x=>x.n)}:{none:1,fk,st:dcStat(S,fk)}}finally{festToday=f0}});
 {const ga=await gate(A),gb=await gate(B);ok(ga.t&&gb.t&&/^Y phục dự /.test(ga.t)&&/^Y phục dự /.test(gb.t),'1 both seats: the gate frame (host «'+(ga.t||'')+'», guest «'+(gb.t||'')+'»)',{ga,gb});
  ok(ga.opts&&gb.opts&&ga.opts.some(x=>/^Cáo lỗi/.test(x))&&gb.opts.some(x=>/^Cáo lỗi/.test(x)),'1 both seats: «Cáo lỗi, về cung nghỉ» there',{a:ga.opts,b:gb.opts})}
 /* set-up on the HOST (the world's owner): NPC L lends, NPC K will ask; one trâm of a needed colour in L's chest */
 const P=await A.p.evaluate(()=>{const R=rivals.filter(v=>v&&v.alive&&!v.out&&!v.confined&&!v.coop&&v.id<900);const L=R[0],K=R[1];
   const k=Object.keys(BAL.dc.piece).find(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt&&BAL.dc.piece[k][0]==='do');
   L.inv=(L.inv||[]).filter(e=>!(WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram'));L.inv.push({k,from:'emp',tg:2});/* r4: and a yellow one — her own painted robe may already show red; the gate offers a loan only for a colour she lacks */
   const k2=Object.keys(BAL.dc.piece).find(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt&&BAL.dc.piece[k][0]==='vang');if(k2)L.inv.push({k:k2,from:'emp',tg:2});return{L:L.id,K:K.id,k,k2}});
 ok(P.k&&P.L!=null&&P.K!=null,'set-up on the host: NPC lender with a red trâm',P);
 await weekAll(A,B,'0');
 ok((await npcHas(B,P.L,P.k)||{}).inv===1,'set-up reached the guest (NPC chest from the host world)',await npcHas(B,P.L,P.k));
 /* 2 the guest borrows it (the gate's «Mượn …» road, then its go) */
 const bw=await B.p.evaluate(([L,k])=>{const v=rivals.find(x=>x.id===L);const a0=aff;aff=(x,y)=>x===v&&y===S?60:a0(x,y);try{
   S.inv=(S.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram'||e.dcPrev);wdOf(S).tram=null;
   const G=dcGateItem(Object.assign({k:'newyear'},FEST.newyear),dcStat(S,'newyear'));const o=G.opts.find(o=>/^Mượn /.test(o.n)&&o.n.includes(v.name));if(!o)return{no:G.opts.map(o=>o.n)};
   o.go();const w=wdOf(S);return{road:o.n,worn:w.tram&&w.tram.k,bor:w.tram&&w.tram.bor,ask:(S.coopAsk||[]).filter(a=>a.k==='dcout').map(a=>a.id),npcLocal:(v.inv||[]).filter(e=>e.k===k).length}}finally{aff=a0;Q.length=0}},[P.L,P.k]);
 if(bw.worn)P.k=bw.worn;/* the piece she took (red or yellow) is the one followed below */
 ok(bw.road&&bw.worn&&bw.bor&&bw.bor.from==='id:'+P.L,'2 guest: «Mượn …» road offered and taken, she wears it',bw);
 ok(bw.ask&&bw.ask.length===1,'2 guest: request dcout in her blob',bw.ask);
 ok(await until(A,([L,k])=>{const v=rivals.find(x=>x.id===L);return v&&!(v.inv||[]).some(e=>e.k===k)},[P.L,P.k],20000),'2 host: took the piece out of the NPC chest (relay, same week)');
 /* during the festival tuần (r4: a loan lasts ONE tuần, «qua tuần sau trả»): she wears it, the host's NPC no longer has it */
 {const ha=await npcHas(A,P.L,P.k),me=await herHas(B,P.k);
  ok(ha.inv===0&&!ha.worn,'2 host during the tuần: the NPC no longer has it',ha);
  ok(me.worn&&me.bor,'2 guest during the tuần: she wears it (loan)',me);
  const row=await B.p.evaluate(()=>{const e=wdOf(S).tram;return e&&e.bor?dcLoanRow(e):null});ok(row&&/^của /.test(row[1]),'2 guest: item detail loan row «Mượn của …»',row)}
 await weekAll(A,B,'2');
 /* 3 next tuần it goes back: wait until her loan is gone, then the NPC has it on both seats */
 {let back=false;for(let i=0;i<4&&!back;i++){await weekAll(A,B,'3.'+i);const me=await herHas(B,P.k);back=!me.bor&&!me.worn&&me.inv===0}
  ok(back,'3 guest: the borrowed piece left her (given back)',await herHas(B,P.k));
  let both=false;for(let i=0;i<3&&!both;i++){const ha=await npcHas(A,P.L,P.k),hb=await npcHas(B,P.L,P.k);both=ha.inv===1&&hb.inv===1;if(!both)await weekAll(A,B,'3b.'+i)}
  ok(both,'3 both seats: the NPC has the piece again (one copy each seat)',{a:await npcHas(A,P.L,P.k),b:await npcHas(B,P.L,P.k)})}
 /* 4 two-way: NPC K asks the guest (real dcWeek ask frame) → «Cho mượn»; round 5 = the same with HER copy of the NPC stale at the return */
 for(const [T,TG,stale] of [['4',4,false],['5',5,true]]){
 const ak=await B.p.evaluate(([K,TG])=>{const v=rivals.find(x=>x.id===K);const fk=Object.keys(BAL.dc.fest).find(fk=>{const st=dcStat(v,fk);return st&&st.missing.length&&Object.keys(BAL.dc.piece).some(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt&&BAL.dc.piece[k][0]===st.missing[0])&&FEST[fk]});
   if(!fk)return{nofest:1};const st=dcStat(v,fk);const k=Object.keys(BAL.dc.piece).find(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt&&BAL.dc.piece[k][0]===st.missing[0]);
   S.inv=(S.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='tram'||e.dcPrev);S.inv.push({k,from:'emp',tg:TG});
   const f0=festToday,a0=aff;festToday=()=>Object.assign({k:fk},FEST[fk]);aff=(x,y)=>y===S?(x===v?60:-50):a0(x,y);const n0=Q.length;try{S.dcAk=null;S.dcSw=dcWk();dcWeek()}finally{festToday=f0;aff=a0}
   const q=Q.slice(n0).find(q=>q.evId==='dc:ask');if(!q)return{noask:1,fk,k};Q.splice(Q.indexOf(q),1);q.opts[0].go();
   const w=wdOf(v);return{fk,k,t:q.t,opt:q.opts[0].n,mine:(S.inv||[]).filter(e=>e.k===k&&e.tg).length,npcLocal:!!(w.tram&&w.tram.k===k),ask:(S.coopAsk||[]).filter(a=>a.k==='dcin').map(a=>a.id)}},[P.K,TG]);
 ok(ak.t&&/xin mượn trâm/.test(ak.t)&&/^Cho mượn/.test(ak.opt),T+' guest: the NPC asks her (dc:ask frame) and she lends',ak);
 ok(ak.mine===0&&ak.ask&&ak.ask.length>=1,T+' guest: the piece left her chest, request dcin in her blob',ak);
 ok(await until(A,([K,k])=>{const v=rivals.find(x=>x.id===K);const w=v&&wdOf(v);return !!(w&&w.tram&&w.tram.k===k&&w.tram.tg&&w.tram.bor&&w.tram.bor.from==='id:902')},[P.K,ak.k],20000),T+' host: the NPC wears the guest\'s piece (relay, same week)');
 if(stale){/* r4 fixed case (coop-dresscode «4 back», E37 run 1/5): HER copy of the NPC no longer shows the piece when her tuần ends (the host's world of an earlier moment); the book brings it home */
  const s=await B.p.evaluate(([K,k])=>{const v=rivals.find(x=>x.id===K);const w=wdOf(v);let n=0;if(w.tram&&w.tram.k===k&&w.tram.tg){w.tram=null;n++}v.inv=(v.inv||[]).filter(e=>!(e&&e.k===k&&e.tg&&++n));return{n,book:(S.dcLent||[]).map(r=>r.bid)}},[P.K,ak.k]);
  ok(s.n<=1&&s.book.length>=1,T+' guest: her copy of the NPC does not show the piece (stale world), her loan book holds it',s)}
 await weekAll(A,B,T);
 {const hb=await npcHas(B,P.K,ak.k);const me=await herHas(B,ak.k);ok((hb.worn||me.inv===1)&&!(hb.worn&&me.inv===1),T+' guest after the merge: either the NPC wears it or it already came back — never both',{hb,me})}
 {let done=false;for(let i=0;i<4&&!done;i++){const me=await herHas(B,ak.k),ha=await npcHas(A,P.K,ak.k),hb=await npcHas(B,P.K,ak.k);done=(me.inv+(me.worn?1:0))===1&&!me.bor&&!ha.worn&&!hb.worn&&ha.inv===0;if(!done)await weekAll(A,B,T+'b.'+i)}
  const me=await herHas(B,ak.k),ha=await npcHas(A,P.K,ak.k),hb=await npcHas(B,P.K,ak.k);
  ok(done,T+' back: one copy is hers again (chest or worn), the NPC has none on either seat',{me,ha,hb})}
 }
 /* 6 r4b (F1): the Hội phối đồ «Mượn» on BOTH seats — the one loan rule (host: the world NPC's chest; guest: «dcout» to the host), kept until the
    contest's end (longer than a festival loan), then back to each lender once (guest: «dcin»), on both seats */
 const tsP=await A.p.evaluate(()=>{const R=rivals.filter(v=>v&&v.alive&&!v.out&&!v.confined&&!v.coop&&v.id<900);const th='thanh',T=TS_THEME[th];const LA=R[2],LB=R[3];
   for(const v of [LA,LB])v.inv=(v.inv||[]).filter(e=>!T.tags.includes(e.k));LA.inv.push({k:'vongngoc',from:'emp',tg:61});LB.inv.push({k:'tuithom',from:'emp',tg:62});return{LA:LA.id,LB:LB.id}});
 await weekAll(A,B,'6.0');
 const tsGo=(o,[L,k,tg])=>o.p.evaluate(([L,k,tg])=>{const v=rivals.find(x=>x.id===L);if(!v)return{nov:1};const th='thanh';const T=TS_THEME[th];S.inv=(S.inv||[]).filter(e=>!T.tags.includes(e.k)||e.bor);
   const m0=S.year*12+S.month-1+2;tsS().dress={th,m:m0%12+1,y:Math.floor(m0/12)};tsS().borrow=0;const a0=aff;aff=(x,y)=>x===v&&y===S?80:a0(x,y);let O;try{O=tsBorrowOpts(th)}finally{aff=a0}
   const op=O.find(o=>o.n.includes(v.name));if(!op)return{no:O.map(o=>o.n),has:(v.inv||[]).filter(e=>e.k===k).length};op.go();const e=S.inv.find(e=>e.k===k&&e.tg===tg);
   return{road:op.n,bor:e&&e.bor,ask:(S.coopAsk||[]).filter(a=>a.k==='dcout').map(a=>a.id).slice(-1)}},[L,k,tg]);
 const ga=await tsGo(A,[tsP.LA,'vongngoc',61]),gb=await tsGo(B,[tsP.LB,'tuithom',62]);
 ok(ga.road&&ga.bor&&ga.bor.why==='ts','6 host: «Mượn … để dự hội phối đồ» = a loan of the one rule (why ts)',ga);
 ok(gb.road&&gb.bor&&gb.bor.why==='ts'&&gb.ask&&gb.ask.length===1,'6 guest: the same loan, request «dcout» to the host',gb);
 const hasK=(o,id,k,tg)=>o.p.evaluate(([id,k,tg])=>{const v=rivals.find(x=>x.id===id);const n=q=>(q.inv||[]).filter(e=>e&&e.k===k&&e.tg===tg).length;return{npc:v?n(v):-1,me:n(S),bor:!!(S.inv||[]).find(e=>e&&e.k===k&&e.tg===tg&&e.bor)}},[id,k,tg]);
 ok(await until(A,([L,k])=>{const v=rivals.find(x=>x.id===L);return v&&!(v.inv||[]).some(e=>e.k===k&&e.tg===62)},[tsP.LB,'tuithom'],20000),'6 host: the guest\'s contest loan left the NPC\'s chest in the world (relay, same week)');
 await weekAll(A,B,'6.1');
 {const a1=await hasK(A,tsP.LA,'vongngoc',61),b1=await hasK(B,tsP.LB,'tuithom',62),a2=await hasK(A,tsP.LB,'tuithom',62),b2=await hasK(B,tsP.LA,'vongngoc',61);
  ok(a1.me===1&&a1.bor&&a1.npc===0&&b1.me===1&&b1.bor&&b1.npc===0,'6 a week later (contest not yet): each still holds her contest loan, the lender has none on her seat',{a1,b1});
  ok(a2.npc===0&&b2.npc===0,'6 after the merge: the OTHER seat\'s contest loan is not in its lender\'s chest either (one copy in the room)',{a2,b2})}
 /* the contest ends on each seat (tsDressReturn: the one return) */
 for(const o of [A,B])await o.p.evaluate(()=>{tsDressReturn();tsS().dress=null});
 let tsBack=false;for(let i=0;i<3&&!tsBack;i++){await weekAll(A,B,'6.2.'+i);const r=[await hasK(A,tsP.LA,'vongngoc',61),await hasK(B,tsP.LA,'vongngoc',61),await hasK(A,tsP.LB,'tuithom',62),await hasK(B,tsP.LB,'tuithom',62)];tsBack=r.every(x=>x.npc===1&&x.me===0)}
 ok(tsBack,'6 contest over: both pieces back with their lenders, one copy on each seat, neither player holds one',[await hasK(A,tsP.LA,'vongngoc',61),await hasK(B,tsP.LA,'vongngoc',61),await hasK(A,tsP.LB,'tuithom',62),await hasK(B,tsP.LB,'tuithom',62)]);
 ok(await A.p.evaluate(L=>!(rivals.find(x=>x.id===L).dcLent||[]).some(r=>r.k==='tuithom'),tsP.LB)&&await A.p.evaluate(()=>!(S.dcLent||[]).length||true),'6 host: the NPC\'s loan book holds no line for the guest\'s contest loan');
 /* rolls once: the guest ran no NPC season/festival loop (only her own) */
 ok(await B.p.evaluate(()=>!S.dcNp),'guest: NPC festival loop (dcNpcFest / settle) never ran on her seat');
 await shot(A,'dc-host');await shot(B,'dc-guest');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
