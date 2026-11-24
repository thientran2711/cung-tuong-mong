/* REVIEW looks-2 r1 repro (adapted for looks-2-2: the look reaches her LIVE, same week): B runs the REAL act runAct(S, friend, "tea") on A's entry; the tea stain must reach A (FAILS on 040ce3440: 20/21). usage as coop-looks.js */
/* CO-OP FACE MARKS (review/looks-2; setup copied from coop-toil-look.js / coop-e2e.js): both seats must show the SAME face marks for each player
   (her own seat vs her friend entry on the other seat): looks-2 states (stain, smudge on a made-up day, ink) + the old family (rash, slap, poison);
   and a mark one seat puts on the friend (tea / rash) must reach the friend after the merged week.
   usage: python3 dev/build/assemble.py && node dev/test/coop-looks.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/home/user/wt/coop-looks-shots');fs.mkdirSync(OUT,{recursive:true});
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
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(+process.env.E2E_TO||30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
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
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
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
    return true}await clear(A);await clear(B);
    if(t%8===7)for(const [o,k] of [[A,a],[B,b]])if(k===k0)await require('./lib/coop-real.js').repress(o);/* review/coop-driver-fails #2: a press that only opened a card is pressed again (lib/coop-real repress) */
    await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B),sA:await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),sB:await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 /* COOP_MLINE: the guest must be a consort with her own maids (a random cung nữ start has none, the mline check would be void) */
 for(const o of [A,B])await o.ctx.addInitScript(()=>{window.__forceOrigin='thd'});/* both consorts: the look rule is for a friend in rivals */
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
 const ev=(o,f,a)=>o.p.evaluate(f,a);
 const read=(o,friend)=>ev(o,fr=>{const p=fr?rivals.find(v=>v.coop):S;if(!p)return{none:1};const was=S.toilSeen;S.toilSeen=null;
   const out={};for(const h of ["th","emp"]){const t=toilFx(p,h,toilFOf(h),"ok");out[h]=t?[t.mk,t.dress,t.aff,t.danh]:null}
   out.face=toilLookOfP(p)||"";S.toilSeen=was;return out},friend);
 const same=async(tag)=>{for(let i=0;i<40;i++){const x=JSON.stringify(await read(A,false)),y=JSON.stringify(await read(B,true)),x2=JSON.stringify(await read(B,false)),y2=JSON.stringify(await read(A,true));if(x===y&&x2===y2)break;await clear(A);await clear(B);await sleep(300)}
   const ra=await read(A,false),rb=await read(B,true),rb2=await read(B,false),ra2=await read(A,true);
   ok(JSON.stringify(ra)===JSON.stringify(rb),tag+': A herself = A as seen on B',[ra,rb]);ok(JSON.stringify(rb2)===JSON.stringify(ra2),tag+': B herself = B as seen on A',[rb2,ra2]);return[ra,rb,rb2]};
 const marks=(o,friend)=>ev(o,fr=>{const p=fr?rivals.find(v=>v.coop):S;if(!p)return{none:1};const C=[];KIT_FACEFX.each(p,(d,st)=>{if(d.chip){const c=d.chip(p,st);if(c)C.push(d.id+':'+c[0])}});
   return{C:C.sort(),stain:(typeof lkStainOf==='function'&&lkStainOf(p))?lkStainOf(p).k:null,smu:(typeof lkSmuOf==='function'&&lkSmuOf(p))?lkSmuOf(p).lv:0,ink:!!(typeof lkInkOf==='function'&&lkInkOf(p)),rash:p.rash?p.rash.sev:0}},friend);
 const sameM=async(tag)=>{let x,y,x2,y2;for(let i=0;i<40;i++){x=JSON.stringify(await marks(A,false));y=JSON.stringify(await marks(B,true));x2=JSON.stringify(await marks(B,false));y2=JSON.stringify(await marks(A,true));if(x===y&&x2===y2)break;await clear(A);await clear(B);await sleep(300)}
   ok(x===y,tag+': A herself = A as seen on B',[x,y]);ok(x2===y2,tag+': B herself = B as seen on A',[x2,y2]);return[JSON.parse(x),JSON.parse(x2)]};
 await sameM('no marks');
 await ev(A,()=>{S.toilette=Object.assign({wk:toilWk(),day:toilWk()*10,F:1,occ:["th"],style:"fit",dv:"hopdip",makeup:true,score:80,look:"dep"});lkSmudge(S,2,'mua');lkStain(S,'uot');lkInk(S);render();return 1});
 await ev(B,()=>{S.rash={sev:2,until:wk()+3,at:wk()};S.slap={sev:1,until:wk()+2,at:wk()};lkStain(S,'tra');render();return 1});
 const [ma,mb]=await sameM('A smudge+wet+ink · B rash+slap+tea');ok(ma.smu>=2&&ma.stain==='uot'&&ma.ink&&mb.rash===2&&mb.stain==='tra','marks present',[ma,mb]);
 /* REVIEW: B's seat runs the REAL harm act 'tea' on A's entry (runAct path → sendRes) */
 const rb=await ev(B,()=>{const f=rivals.find(v=>v.coop);f.stain=null;const r0=roll;roll=()=>true;let out;try{out=runAct(S,f,'tea')}finally{roll=r0}render();return JSON.stringify({out:String(out).slice(0,160),stain:f.stain,lk:f.lk,b:f.__b&&f.__b.fx&&f.__b.fx.stain})});console.log('B act',rb);
 /* part 2 (looks-2-2): the look must reach her AT ONCE through the act's res message (a tuần look would be gone by the week write-back) */
 let wr=0;for(let i=0;i<40&&wr!=='tra';i++){wr=await ev(A,()=>lkItem(S,'tra')?'tra':0);await sleep(300)}
 ok(wr==='tra','REAL ACT tea on friend reaches her live (same week)',wr);
 const sm=await ev(A,()=>lkSmuOf(S)?lkSmuOf(S).lv:0);ok(sm>=1,'REAL ACT tea smudges her makeup on her own seat',sm);
 await sameM('after the act (both seats agree)');
 /* same family (reviewer r1): slap / rash / scar acts on the friend through runAct reach her live too */
 const fam=await ev(B,()=>{const f=rivals.find(v=>v.coop);const r0=roll,c0=caught;roll=()=>true;caught=()=>"";const out={};
   try{for(const k of ["tat","rash","huydung"]){f.slap=null;f.rash=null;f.scar=null;try{out[k]=String(runAct(S,f,k)||"").slice(0,80)}catch(e){out[k]="ERR "+e.message}}}finally{roll=r0;caught=c0}render();return out});console.log('B family acts',JSON.stringify(fam));
 let fr={};for(let i=0;i<40;i++){fr=await ev(A,()=>({slap:!!S.slap,rash:!!S.rash,scar:!!S.scar}));if(fr.slap&&fr.rash&&fr.scar)break;await sleep(300)}
 ok(fr.slap&&fr.rash&&fr.scar,'slap / rash / scar acts on the friend reach her live',fr);
 /* review looks-2 r2: the other direction — A's seat throws water and fans ink on B's entry (real runAct), B gets them live */
 const fa=await ev(A,()=>{const f=rivals.find(v=>v.coop);const r0=roll,c0=caught;roll=()=>true;caught=()=>"";const out={};try{for(const k of ["nuoc","ink"]){try{out[k]=String(runAct(S,f,k)||"").slice(0,80)}catch(e){out[k]="ERR "+e.message}}}finally{roll=r0;caught=c0}render();return out});console.log('A acts',JSON.stringify(fa));
 let fb={};for(let i=0;i<40;i++){fb=await ev(B,()=>({uot:!!lkItem(S,'uot'),muc:!!lkItem(S,'muc')}));if(fb.uot&&fb.muc)break;await sleep(300)}
 ok(fb.uot&&fb.muc,'A → B: water + ink acts on the friend reach her live',fb);
 await sameM('after A → B acts (both seats agree)');
 /* review looks-2 r2: lasting marks survive the week write-back + liveStats (one whole tuần for both seats) */
 const wk0=await ev(A,()=>__co().week),ru=await ev(A,()=>S.rash?S.rash.until:0);for(let i=0;i<6;i++){if(await ev(A,()=>__co().week)!==wk0)break;if(!await buoiBoth(A,B))break}
 await sleep(1500);let sv={};for(let i=0;i<40;i++){sv=await ev(A,([w,ru])=>({wk:__co().week,turned:__co().week!==w,rash:!!S.rash||ru<=wk(),scar:!!S.scar}),[wk0,ru]);if(sv.turned&&sv.rash&&sv.scar)break;await clear(A);await clear(B);await sleep(300)}
 ok(sv.turned&&sv.rash&&sv.scar,'after the week turns: rash (unless its own time ran out) + scar the friend put on her stay (week write-back / liveStats do not undo them)',sv);
 const sv2=await ev(B,ru=>{const f=rivals.find(v=>v.coop);return{rash:!!(f&&f.rash)||!(ru>wk()),scar:!!(f&&f.scar)}},ru);ok(sv2.rash&&sv2.scar,'after the week turns: B still sees them on A',sv2);
 for(const o of [A,B]){ok(!o.errs.length,o.name+' no page errors',o.errs.slice(0,4))}
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
