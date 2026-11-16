/* Co-op end-to-end: two Playwright browsers in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-e2e.js [outdir] [workerURL]
   A = Fold portrait 686x880@2.2 (host), B = iPad landscape 1180x820@2 (guest).
   Steps: create room, join by ?room=, play 3 weeks (both end → merged week), B leaves → A frozen ("Đợi bạn trở lại"),
   B comes back → resumes same week, B dies → normal rebirth choice → new person in the SAME world, single-player + old save still load.
   Hooks used (PROTOCOL.md / jcoop.js): window.COOP {code,seat,week,online,ended,frozen,waiting,on}, rivals entry coop:true id 901/902. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul{display:none!important}';document.head.appendChild(s)})});await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(+process.env.E2E_TO||30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])');if(b){b.click();return'x'}return'stuck'});
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

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 /* COOP_MLINE: the guest must be a consort with her own maids (a random cung nữ start has none, the mline check would be void) */
 if(+process.env.COOP_MLINE)await B.ctx.addInitScript(()=>{window.__forceOrigin='thd'});
 /* 1 host makes a room */
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);await shot(A,'01-title');
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);await shot(A,'02-coop-menu');
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code, seat a');
 const code=(await C(A)).code;console.log('room',code);await clear(A);await shot(A,'03-invite-waiting');
 const w0=await A.p.evaluate(()=>!!(__co().frozen));ok(w0,'A waits for the friend (frozen before join)');
 /* 2 guest joins by link */
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await shot(B,'04-join');
 await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 ok(await until(A,()=>!__co().frozen,null,20000),'A unfrozen when B is in');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}}
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both players are in the shared world');await clear(A);await clear(B);
 const same=async tag=>{const a=await A.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join(),N:rivals.filter(v=>!v.coop).flatMap(v=>[v.name,...(v.staff||[]).map(x=>x.name),...(v.kids||[]).map(k=>k.name)]).concat(Object.values(S.court||{}).map(c=>c&&(c.pn||c.name))).join('|')}));
   const c=await B.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join(),N:rivals.filter(v=>!v.coop).flatMap(v=>[v.name,...(v.staff||[]).map(x=>x.name),...(v.kids||[]).map(k=>k.name)]).concat(Object.values(S.court||{}).map(c=>c&&(c.pn||c.name))).join('|')}));
   ok(a.era===c.era&&a.R===c.R,tag+': same Emperor and same consorts',[a.era,c.era]);ok(String(a.d)===String(c.d),tag+': same date',[a.d,c.d]);if(tag!=='start')ok(a.N===c.N,tag+': same names of the world people (consorts, their staff and kids, court) on both seats',a.N===c.N?a.N.split('|').length:[a.N.slice(0,300),c.N.slice(0,300)]);
   ok(a.fr===c.me&&c.fr===a.me,tag+': each sees the other as a person',[a.me,a.fr,c.me,c.fr]);return[a,c]};
 await same('start');
 for(const o of [A,B]){const r=await o.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);if(!f)return{ok:false,why:'no friend'};
   const unk=k61St(f)===0;/* known for a reason any NPC would be: reigning Hoàng hậu, her own mistress, or in the same palace */
   const why=f.queen?'Hoàng hậu':(S.srv&&!S.srv.risen&&S.srv.mid===f.id)?'chủ nhân':(f.id!=null&&together(S,f))?'cùng chỗ':(f.id==null&&(S.staff||[]).includes(f))?'kẻ hầu của ngươi':'';
   return{ok:unk||!!why,unk,why,st:k61St(f),srv:!!(S.srv&&!S.srv.risen),fsrv:f.id==null}});
  ok(r.ok,o.name+': friend starts as Người lạ (unknown, like any NPC)'+(r.unk?'':' — known: '+r.why),r.ok?undefined:r)}await shot(A,'05-world');await shot(B,'05-world');
 /* COOP_MLINE=1 (review/servant-mline-r3): the guest's own maids are a target of the NPC maid line on the guest (forced odds on B only);
    her proof on NPCs (ep[pid]) survives the week merges, and the host's own proof is not touched by hers */
 const ML=+process.env.COOP_MLINE||0;let mlA0=null,mlB0=null;
 if(ML){mlB0=await B.p.evaluate(()=>{for(let i=0;i<3;i++){const s=mkServ('maid');s.age=17+i;S.staff.push(s)}Object.assign(BAL.mline,{feud:100,feudHost:-999,hit:100,frameCatch:100,hitCatch:100,poisonCatch:100,hitBribe:0});window.__mlN={};
   window.__mlHit=0;window.__mlCalls=[];const mm0=mlMonth;mlMonth=function(){window.__mlCalls.push([S.month,(S.staff||[]).filter(x=>x.role==='maid').length,!!(S.srv&&!S.srv.risen),consorts().includes(S),S.rank,S.place]);return mm0.apply(this,arguments)};const f0=mlFx;mlFx=function(g,s){if((S.staff||[]).includes(s))window.__mlHit++;return f0.apply(this,arguments)};
   const d0={};rivals.filter(v=>!v.coop).forEach(v=>d0[v.id]=v.duc||0);return{ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),d0,maids:S.staff.filter(x=>x.role==='maid').length,srv:!!(S.srv&&!S.srv.risen),inC:consorts().includes(S),rank:S.rank}});
  mlA0=await A.p.evaluate(()=>{window.__mlN={};const d0={};rivals.filter(v=>!v.coop).forEach(v=>d0[v.id]=v.duc||0);return{ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),d0}})}
 /* 3 three weeks */
 for(let w=0;w<3;w++){const wk=(await C(A)).week;
  await weekBoth(A,B,w);
  for(const o of [A,B]){const r=await untilC(o,x=>__co().week===x+1,wk,90000);ok(r,`week ${w+1}: ${o.name} advanced`,r?undefined:await o.p.evaluate(()=>({co:__co(),sent:COOPW.sent,pend:COOPW.pend,pendBuoi:!!COOPW.pendBuoi,bend:COOPW.bend,buoi:S.buoi,Q:Q.map(m=>(m.pid||'')+':'+String(m.t||'').slice(0,30)),mg:!!S.mg,tm:S.toMorning,stale:window.__nightStale,modal:(document.getElementById('modal')||{}).hidden,tr:COOPW.tr.slice(-20)})))}
  await clear(A);await clear(B);await same('after week '+(w+1))}
 await shot(A,'07-after3');await shot(B,'07-after3');
 if(ML){const b1=await B.p.evaluate(()=>({hit:window.__mlHit,N:window.__mlN,ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),maids:S.staff.filter(x=>x.role==='maid').length,month:S.month,calls:window.__mlCalls,feud:BAL.mline.feud}));
  const a1=await A.p.evaluate(()=>({N:window.__mlN,ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),duc:Object.fromEntries(rivals.filter(v=>!v.coop).map(v=>[v.id,v.duc||0]))}));
  const evMeB=+(b1.N.evMe||0),evMeA=+(a1.N.evMe||0);
  ok(b1.hit>0,'mline: NPC acts hit the guest\'s own maids on the guest',{hit:b1.hit,N:b1.N});
  ok(b1.ev-mlB0.ev>=evMeB,'mline: the guest\'s proof from her maids\' cases survives the merges',{before:mlB0.ev,after:b1.ev,given:evMeB});
  const dA=Object.keys(mlA0.d0).reduce((a,k)=>a+((a1.duc[k]||0)-mlA0.d0[k]),0);
  console.log('mline info',JSON.stringify({b0:mlB0,b1:[b1.maids,b1.month,b1.calls,b1.feud],hostEv:[mlA0.ev,a1.ev,evMeA],hostNpcDucDelta:dA,guestCaught:Object.fromEntries(Object.entries(b1.N).filter(([k])=>/caught|Out|ev/.test(k)))}));if(process.env.COOP_MLINE_ONLY){for(const o of [A,B])await o.ctx.close().catch(()=>{});process.exit(res.every(r=>r[0])?0:1)}}
 /* 4 B leaves → A freezes; B returns */
 await A.p.evaluate(()=>{window.__prLog=[];const t0=Date.now();COOP.on('presence',m=>__prLog.push([Date.now()-t0,'p',JSON.stringify(m.seats)]));COOP.on('room',m=>__prLog.push([Date.now()-t0,'room',JSON.stringify(m.seats)]));COOP.on('lost',m=>__prLog.push([Date.now()-t0,'lost']))});
 await B.p.close();
 /* a closed page whose socket close never reaches the Worker (proxy keeps the upstream open) is dropped by the Worker's STALE rule: 45 s silence, checked by a 20 s alarm → up to 65 s */
 {const fz=await until(A,()=>__co().frozen,null,90000);ok(fz,'A frozen when B left',fz?undefined:await A.p.evaluate(()=>({co:__co(),st:{status:COOP.state.status,peer:COOP.state.peerOnline,seats:COOP.state.seats},pr:window.__prLog||null})))}await shot(A,'08-frozen');
 ok(await A.p.evaluate(()=>document.getElementById('next').disabled||!!__co().frozen),'A cannot advance while frozen');
 const wkF=(await C(A)).week;
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 ok(await until(B,x=>__co().seat==='b'&&__co().week===x&&!__co().frozen,wkF,40000),'B back in same seat and week');
 ok(await until(A,()=>!__co().frozen,null,20000),'A resumes');await clear(A);await clear(B);await same('after rejoin');await shot(B,'09-rejoined');
 /* 5 B dies → normal rebirth choice → new person in the same world */
 const before=await B.p.evaluate(()=>({n:S.name,era:S.emp.era}));
 await B.p.evaluate(()=>die('Thử: trúng gió'));await B.p.waitForTimeout(600);await shot(B,'10-death');
 for(let i=0;i<12;i++){const st=await B.p.evaluate(()=>S&&!S.dead&&S.name);if(st&&st!==before.n)break;
  const m=await B.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) button:not([disabled]), #title:not([hidden]) button:not([disabled]), .kroul button:not([disabled]), [data-coop-reborn]')].filter(x=>x.offsetParent!==null);
    const pref=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung|Lật|Chọn/.test(x.textContent))||b[0];if(pref){const t=pref.textContent.trim();pref.click();return t}return''});
  if(i===1)await shot(B,'11-rebirth-choice');await B.p.waitForTimeout(900)}
 const after=await B.p.evaluate(()=>({n:S.name,dead:S.dead,era:S.emp.era}));
 ok(!after.dead&&after.n!==before.n&&after.era===before.era,'B reborn as a new person in the same world',[before,after]);
 {let seen=false;const t0=Date.now();while(Date.now()-t0<40000){await clear(A);await clear(B);seen=await A.p.evaluate(n=>!!(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop))&&(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null).name===n,after.n);if(seen)break;await sleep(700)}
  ok(seen,'A sees the reborn friend by her new name',await A.p.evaluate(()=>((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name));}
 {const r=await A.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);return{ok:!!f&&k61St(f)===0,srv:f&&f.id==null,st:f&&k61St(f),here:f&&f.id!=null&&whereOf(f),me:S.place,tr:COOPW.tr.slice(-12)}});
  ok(r.ok,'reborn friend is a stranger again (Người lạ)',r.ok?undefined:r)}
 await clear(A);await clear(B);await shot(A,'12-reborn-seen');await shot(B,'12-reborn');
 /* 6 one more week after rebirth */
 {const wk=(await C(A)).week;await weekBoth(A,B,1);const adv=await untilC(B,x=>__co().week===x+1,wk,90000);
  const dump=o=>o.p.evaluate(()=>({co:__co(),k:wk()+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,dead:!!S.dead,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,rb:[COOPW.rweek,COOPW.rbuoi],tm:S.toMorning,tr:COOPW.tr.slice(-20)})).catch(e=>e.message);
  ok(adv,'week after rebirth advances',adv?undefined:{w0:wk,A:await dump(A),B:await dump(B)});}
 /* 7 single player untouched + old save loads */
 /* COOP_OLD_REF: the build whose save must still load (default origin/main; in a shared checkout whose origin/main ref was moved, pass the base main commit) */
 const oldHtml=execSync('git -C '+JSON.stringify(ROOT)+' show '+(process.env.COOP_OLD_REF||'origin/main')+':index.html',{maxBuffer:64e6}).toString();
 const D=await mk(b,'solo',[686,880,2.2]);await D.ctx.route(BASE+'old.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:oldHtml.replace(/navigator\.serviceWorker\.register/g,'(()=>Promise.reject())')}));
 await D.page();await D.p.goto(BASE+'old.html',DCL);await D.p.waitForTimeout(3500);
 /* a loaded machine: wait for the old game's code; __nlInner = start() builds the life at once (no Luân hồi screen, which left S unset) */
 await D.p.waitForFunction(()=>typeof start==='function'&&typeof ser==='function'&&typeof SK==='function',null,{timeout:120000});
 await D.p.evaluate(()=>{SLOT=2;window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem('hclh-slot','2')});const oldName=await D.p.evaluate(()=>S.name);
 await D.p.goto(BASE,DCL);await D.p.waitForTimeout(3500);await shot(D,'13-title-solo');
 ok(await tapText(D,/^Chơi một mình/),'solo: Chơi một mình');await D.p.waitForTimeout(800);
 /* Chơi một mình = Tiếp tục the last sổ (old save) when there is one */
 if(!await D.p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!S.name))await tapText(D,/^Tiếp tục kiếp này/,4000);await D.p.waitForTimeout(1500);
 const ld=await D.p.evaluate(()=>({n:typeof S!=='undefined'&&S&&S.name,coop:!!__co().on,fr:typeof rivals!=='undefined'&&(rivals||[]).some(v=>v.coop)}));ok(ld.n===oldName&&!ld.coop&&!ld.fr,'solo: old save loads, no co-op',ld);
 await clear(D);await shot(D,'14-solo-game');
 /* real buổi lengths (co-op clock, jcooptimer): wall time from a buổi's clock start to the room's step, as the host measured them */
 try{const L=await A.p.evaluate(()=>window.COOPW&&COOPW.tm&&COOPW.tm.lens?COOPW.tm.lens():[]);const ms=L.map(x=>x.ms).sort((a,b)=>a-b);
  const q=f=>ms.length?Math.round(ms[Math.min(ms.length-1,Math.floor(f*ms.length))]/100)/10:0;
  const line=`buổi lengths (s): n=${ms.length} median=${q(.5)} p90=${q(.9)} max=${q(1)} timeouts=${L.filter(x=>x.up).length}`;console.log(line);fs.appendFileSync(OUT+'/buoi-lengths.txt',line+'\n')}catch(e){console.log('buổi lengths: n/a',e.message)}
 for(const o of [A,B,D])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);if(NIGHTS)console.log('forced nights',COOPW_n);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
