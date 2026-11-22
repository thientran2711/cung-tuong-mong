/* coop-lost-scan (E42 jlost × Kỳ ngộ, law 6c REAL OBJECTS + law 1 TWO-WAY, CO-OP): every piece that ever went through a jlost «thất lạc» case
   must sit in exactly ONE place after each merged week, counted over the HOST's world (her S, every NPC chest / worn slot / pawn, the ledger
   box, an open case still holding its piece) + the GUEST's own S (her chest, her box, her open cases; her copies of the NPCs and both friend
   entries are copies of the other seat: not counted). Count ≥ 2 still wrong a week later = DUP (FAIL); count 0 of a durable piece = VANISH (FAIL).
   Traffic is forced on both seats through the game's own roads: loLose (real causes, loCauseOf for a rival thief) on her and NPCs each week,
   Kỳ ngộ «Ngọc rơi trên lối» / «Của mình tìm lại» kept eligible (seen reset, odds BAL.kyngo.p0 raised) so NPC finders return or keep.
   Harness helpers copied from coop-dresscode-scan.js (E30r3, review/dresscode-fix-r3 aa3c6854).
   usage: python3 dev/build/assemble.py && node dev/test/coop-lost-scan.js [outdir] [workerURL] [weeks=76]   (env LOST_DBG=1: dump each fault; COOP_SKEW=N: guest life clock N months ahead) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-lost-scan'));fs.mkdirSync(OUT,{recursive:true});
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
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B),sA:await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),sB:await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}
async function rejoinB(B,code){await B.p.close();await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 return until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000)}
async function weekAll(A,B,tag){const wk=(await C(A)).week;await weekBoth(A,B,1);let r=true;for(const o of [A,B])r=await untilC(o,x=>__co().week===x+1,wk,90000)&&r;ok(r,tag+': week advanced for both');if(!r)for(const o of [A,B])console.log('STALL',o.name,JSON.stringify(await o.p.evaluate(()=>({co:__co(),Q:Q.slice(0,3).map(q=>[q.t,q.evId,(q.opts||[]).map(x=>x.n)]),modal:(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText.slice(0,200):''})(),next:document.getElementById('next').textContent,sent:COOPW.sent,pend:COOPW.pend,tr:COOPW.tr.slice(-10),dead:!!S.dead,mg:!!S.mg})).catch(e=>e.message)).slice(0,1500));await clear(A);await clear(B);return r}
const NW=+process.argv[4]||76;
const INST=([seat,world,dbg])=>{window.__seat=seat;if(dbg&&!window.__gw){window.__gw=1;window.__rmT=[];window.__rcv=[];const wkN=()=>{try{return wk()}catch(e){return -1}};const rmOf=f=>(f||[]).filter(o=>o&&(o.op==='rm'||o.op==='gone'||o.op==='ret'||o.op==='add'||o.op==='plant')).map(o=>{const iu=o.iu||(o.e&&o.e.iu)||0;let cs=null;try{cs=(S.lost||[]).filter(c=>c&&c.e&&c.e.iu===iu).map(c=>[c.id,c.own,c.st,c.at,c.how,c.keep,c.by])}catch(e){}return [o.op,iu,o.k||(o.e&&o.e.k),o.how,o.by,cs]});
 try{const s0=COOP.send.bind(COOP);COOP.send=function(m){try{if(m&&Array.isArray(m.fam)){const r=rmOf(m.fam);if(r.length)__rmT.push([wkN(),m.t+':'+(m.k||''),'',r,new Error().stack.split('\n').slice(2,7).map(x=>x.trim().slice(0,70)).join(' | ')])}}catch(e){}return s0.apply(null,arguments)}}catch(e){__rmT.push(['ERR send',e.message])}
 setInterval(()=>{try{const D=COOPW.thin&&COOPW.thin.D;if(D&&D.resTo&&!D.resTo.__w){const r0=D.resTo;D.resTo=function(to,m,rid){try{if(m&&Array.isArray(m.fam)){const r=rmOf(m.fam);if(r.length)__rmT.push([wkN(),'D:'+(m.k||''),'',r,new Error().stack.split('\n').slice(2,7).map(x=>x.trim().slice(0,70)).join(' | ')])}}catch(e){}return r0.apply(this,arguments)};D.resTo.__w=1}}catch(e){}},500);
 try{COOP.on('res',m=>{if(m&&m.from!==COOPW.seat&&Array.isArray(m.fam)){const r=(m.fam||[]).filter(o=>o&&o.op).map(o=>[o.op,o.iu||(o.e&&o.e.iu)||0,o.k||(o.e&&o.e.k),o.how,o.by]);if(r.length)__rcv.push([wkN(),m.k||'',r])}})}catch(e){__rcv.push(['ERR on',e.message])}
window.__gst=[];const g0=ilGone;ilGone=window.ilGone=function(p,e,how,o){if(how==='dead')__gst.push([e&&e.iu,(o&&o.own),new Error().stack.split('\n').slice(2,9).map(x=>x.trim().slice(0,90)).join(' | ')]);return g0.apply(this,arguments)}}try{BAL.kyngo.p0=100;BAL.kyngo.cd=[0,0,0,0]}catch(e){}
 window.__kyReset=()=>{for(const p of [S].concat(world?rivals.filter(v=>v&&!v.coop):[]))if(p&&p.ky){if(p.ky.seen){delete p.ky.seen.vat_lac;delete p.ky.seen.vat_minh}p.ky.cd=-1}};
 window.__lose=r=>{const out=[];if(!world||r<.5){/* her chest always holds one piece worth taking (a guest's chest may have none) */const ks=Object.keys(IT).filter(k=>{const t=IT[k];return t&&!t.nt&&!t.evi&&(t.pr||0)>=LO.minPr&&ilDur({k})&&!/Thuốc|Trà|Hương|Điểm tâm|Rượu|Thư/.test(t.kd||'')});if(ks.length&&!(S.inv||[]).some(loOk)){S.inv.push({k:ks[Math.floor(r*ks.length)],from:'emp'})}}const P=world?[S].concat(rivals.filter(v=>v&&!v.coop&&v.alive)):[S];const n=world?3:1;
  for(let i=0;i<n;i++){const p=P[Math.floor(((r*(i+3)*7919)%1)*P.length)]||P[0];if(!p||!loAlive(p))continue;if(loL().some(c=>c.own===key(p)&&c.st!=="done"))continue;
   let cz=null;try{if(world)cz=loCause(p)}catch(e){}/* the guest: her own losses only by her own people (her loMonth runs ONLY_ME: no NPC thief there) */if(!cz){const th=(world?rivals.filter(v=>v&&!v.coop&&v.alive&&v!==p):[])[0];cz=th&&((r*100|0)%2)?loCauseOf(p,{who:th,why:"scan"}):{cause:((r*100|0)%3)?"srv":"mis",sv:"cung nữ"}}
   const c=loLose(p,cz);if(c)out.push([key(p),c.id,c.cause,c.st])}return out};
 window.__lc=()=>{const ids=new Set();for(const c of S.lost||[])if(c&&c.e&&c.e.iu)ids.add(c.e.iu);
  for(const l of (S.il&&S.il.log)||[])if(/^lo\d/.test(String(l[3]))||/^lo\d/.test(String(l[4])))ids.add(l[1]);
  const M={};const add=(iu,pt)=>{if(iu)(M[iu]=M[iu]||[]).push(pt)};const P=world?ilPeople():[S];
  for(const p of P)for(const e of ilSlots(p))add(e.iu,ilKey(p)+(e.lo?':lo'+e.lo:''));
  for(const x of ilS().box)if(x.e)add(x.e.iu,'box:'+x.at+':'+x.why);
  for(const c of ilCases())add(c.e.iu,'case:lo'+c.id);
  try{for(const m of Q)if(m&&m.pp&&m.pp.e&&typeof m.pp.e==='object')add(m.pp.e.iu,'dlg')}catch(e){}
  const D={};for(const id of ids){const e=(S.lost||[]).map(c=>c.e).find(e=>e&&e.iu===id);const lg=((S.il&&S.il.log)||[]).find(l=>l[1]===id);D[id]=ilDur(e||{k:lg&&lg[2]})}/* a used-up kind may end at 0 */
  const ky=((S.il&&S.il.log)||[]).filter(l=>/kyngo/.test(String(l[5]))).length;
  const NETL=((S.il&&S.il.log)||[]).filter(l=>l[5]==='net').map(l=>[l[0],l[1],l[2],l[3],ids.has(l[1])?'LOST-CASE':'other']);
  /* E42r: a host case held by a friend ENTRY (v.coop: a copy of the other seat) would live nowhere real */const coopHeld=world?(S.lost||[]).filter(c=>c&&c.at&&c.st!=='done'&&c.own!=='me'&&rivals.some(v=>v&&v.coop&&key(v)===c.at)).length/* E44: HIS own piece the friend took (famApply rm lost) is really in her chest: held there by design */:0;
  return{NETL,ids:[...ids],M,D,net:(S.il&&S.il.net)||0,ky,coopHeld,cases:(S.lost||[]).length,open:(S.lost||[]).filter(c=>c.st!=='done').length}};
 /* E44 coop-famops (COOP_FAM=1, default on): the friend-act item roads on BOTH seats, through the game's own acts: I steal from the
    friend's entry (laydo → res.fam «rm» lost), I hand back what I hold of hers («Cài đồ vào rương» onto her = «ret»; Tư trang › Việc
    «Lén trả lại» / «Trả lại» = the lostReturn hook), a host NPC steals from her entry (b4Ops «rm» by that NPC); the guest sometimes puts
    on a piece from her chest first (her entry on the host is a step behind: the rm op finds it on her, by id) */
 window.__fam=r=>{const out=[];if(S.dead||S.out||S.mg)return out;const t=rivals.find(v=>v&&v.coop&&v.alive!==false);if(!t)return['nofriend'];
  S.bac=Math.max(S.bac||0,5000);try{used=0}catch(e){}
  if(!(S.inv||[]).filter(loOk).length||r<.25){const ks=Object.keys(IT).filter(k=>{const x=IT[k];return x&&!x.nt&&!x.evi&&(x.pr||0)>=LO.minPr&&ilDur({k})&&!/Thuốc|Trà|Hương|Điểm tâm|Rượu|Thư/.test(x.kd||'')});if(ks.length)S.inv.push({k:ks[Math.floor(r*997)%ks.length],from:'emp'})}/* something worth taking on both seats */
  if(!world&&r<.35){const ix=(S.inv||[]).findIndex(e=>e&&!e.h&&!e.lo&&typeof wdItem==="function"&&wdItem(e)&&wdItem(e).sl!=="hd");if(ix>=0&&wdWear(S,ix))out.push('wear')}
  const mine=(S.lost||[]).filter(c=>c&&c.st!=="done"&&c.own===key(t)&&c.at==="me");
  const hx=(S.inv||[]).findIndex(e=>e&&e.lo&&!e.h&&String(e.gh)===String(key(t)));
  try{if((mine.length||hx>=0)&&r<.75){const c=mine[0];
    if((r<.35||!c)&&hx>=0){runAct(S,t,"plant",hx);out.push('plant')}else if(c){Q.length=0;loUI(r<.55?"sneak":"giveback",c.id);out.push('ui')}}
   else if((t.inv||[]).some(loOk)){const n0=(S.inv||[]).filter(e=>e&&e.lo).length;/* LIVE odds are hard (odds / caught / her maid begs): up to 4 tries so the scan has traffic */
    let g=false;for(let j=0;j<4&&!g&&(t.inv||[]).some(loOk);j++){S.bac=Math.max(S.bac||0,5000);try{used=0}catch(e){}runAct(S,t,r<.8?"laydo":"laydol");g=(S.inv||[]).filter(e=>e&&e.lo).length>n0}out.push(g?'steal':'steal-miss')}}catch(e){out.push('err:'+e.message)}
  if(world&&r>.5)try{const v=rivals.find(x=>x&&!x.coop&&x.alive&&!x.out&&loAlive(x));if(v&&(t.inv||[]).some(loOk)){v.bac=Math.max(v.bac||0,5000);runAct(v,t,"laydo");out.push('npc')}}catch(e){out.push('nerr:'+e.message)}
  try{Q.length=Math.min(Q.length,8);showModal()}catch(e){}return out};
 window.__fmiss=()=>(COOPW.famMiss||[]).slice();
 window.__why=id=>{const L=((S.il&&S.il.log)||[]).filter(l=>l[1]===id);const C=(S.lost||[]).filter(c=>c.e&&c.e.iu===id).map(c=>({id:c.id,own:c.own,st:c.st,at:c.at,how:c.how,keep:c.keep,by:c.by,cause:c.cause,w:c.w,end:c.end}));return{L,C}};
 return true};
(async()=>{const b=await chromium.launch();
 /* COOP_SWAP=1 (as coop-e2e): the iPad hosts (seat a), the Fold joins (seat b) */
 const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];const A=await mk(b,...VA),B=await mk(b,...VB);ALL.push(A,B);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 ok(await A.p.evaluate(INST,['A',true,!!process.env.LOST_DBG])&&await B.p.evaluate(INST,['B',false,!!process.env.LOST_DBG]),'scan hooks on both seats');
 /* COOP_SKEW=N (as coop-dresscode-scan): the guest's life clock N months ahead of the host's */
 const SKEW=+process.env.COOP_SKEW||0;if(SKEW)ok(await B.p.evaluate(n=>{S.turn=(S.turn|0)+n;return true},SKEW),'guest life clock '+SKEW+' months ahead of the host');
 const FAM=process.env.COOP_FAM!=='0';const fam={};
 let rs=(+process.env.SEED||4242);const rnd=()=>{rs=(rs*48271)%2147483647;return rs/2147483647};
 const prev={};const dups=[],vans=[],seen={};let coopH=0,weeksOk=0,lost={A:0,B:0},net0=null;const t0=Date.now();
 for(let w=0;w<NW;w++){
  for(const o of [A,B])await o.p.evaluate(()=>{S.suc=Math.max(S.suc||0,80);S.out=0;S.confined=0;__kyReset()});
  const la=await A.p.evaluate(r=>__lose(r),rnd()),lb=rnd()<.5?await B.p.evaluate(r=>__lose(r),rnd()):[];lost.A+=la.length;lost.B+=lb.length;
  if(FAM){const fb=await B.p.evaluate(r=>__fam(r),rnd());await sleep(300);const fa=await A.p.evaluate(r=>__fam(r),rnd());for(const x of fb.map(y=>"B."+y).concat(fa.map(y=>"A."+y)))fam[x]=(fam[x]||0)+1}
  const unstick=async()=>{for(const o of [A,B])await o.p.evaluate(()=>{for(let i=0;i<6&&Q.length&&Q[0]&&Array.isArray(Q[0].opts)&&Q[0].opts.length;i++){try{chooseM(Q[0].opts.length-1)}catch(e){Q.shift()}}try{showModal()}catch(e){}}).catch(()=>{})};
  await unstick();let okw=await weekAll(A,B,'w'+w);if(!okw){await unstick();okw=await untilC(A,x=>__co().week>=x,w+1,60000).catch(()=>false)}if(okw)weeksOk++;await sleep(1200);
  const ca=await A.p.evaluate(()=>__lc()),cb=await B.p.evaluate(()=>__lc());if(net0==null)net0=[ca.net,cb.net];coopH=Math.max(coopH,ca.coopHeld||0);
  const ids=new Set(ca.ids.concat(cb.ids));
  for(const id of ids){const L=(ca.M[id]||[]).map(x=>'A:'+x).concat((cb.M[id]||[]).map(x=>'B:'+x));seen[id]=1;
   const dur=(ca.D[id]!==undefined?ca.D[id]:cb.D[id])!==false;
   const bad=L.length>1?'dup':(!L.length&&dur?'van':'');if(L.length)(global.__last=global.__last||{})[id]={w,L};{const H=(global.__hist=global.__hist||{})[id]=(global.__hist[id]||[]);const j=L.join(',');if(!H.length||H[H.length-1][1]!==j){H.push([w,j]);if(H.length>8)H.shift()}}
   if(bad){if(prev[id]===bad){const x={w,id,bad,at:L,last:(global.__last||{})[id]||null,hist:(global.__hist||{})[id]||null};/* E44b (d): both seats' ledger lines + cases for the id (the host side alone could not trace a piece gone from her seat) */x.why=await A.p.evaluate(id=>__why(id),id);x.whyB=await B.p.evaluate(id=>__why(id),id);if(process.env.LOST_DBG){const F=id=>{const g=(L)=>(L||[]).filter(t=>String(JSON.stringify(t[3]||t[2])).includes(','+id+','));return {rmT:g(window.__rmT),rcv:(window.__rcv||[]).filter(t=>JSON.stringify(t[2]).includes(','+id+','))}};x.tA=await A.p.evaluate(F,id).catch(e=>'ERR '+e.message);x.tB=await B.p.evaluate(F,id).catch(e=>'ERR '+e.message)}if(process.env.LOST_DBG)x.st=await A.p.evaluate(id=>(window.__gst||[]).filter(g=>g[0]===id).slice(0,3),id);(bad==='dup'?dups:vans).push(x);if(!prev['!'+id]){console.log('PERSIST',JSON.stringify(x).slice(0,4000));prev['!'+id]=1}}prev[id]=bad}else{delete prev[id];delete prev['!'+id]}}
  if(w%8===7)console.log('week',w,'ids',Object.keys(seen).length,'dups',new Set(dups.map(x=>x.id)).size,'vanish',new Set(vans.map(x=>x.id)).size,'kyA',ca.ky,'kyB',cb.ky,'cases',ca.cases,cb.cases,Math.round((Date.now()-t0)/1000)+'s')}
 const ca=await A.p.evaluate(()=>__lc()),cb=await B.p.evaluate(()=>__lc());
 const dI=new Set(dups.map(x=>x.id)),vI=new Set(vans.map(x=>x.id));
 ok(weeksOk>=Math.min(72,NW-2),`merged weeks (${weeksOk}/${NW} advanced for both)`);
 ok(ca.cases+cb.cases>=20&&ca.ky>=3,`lost-case traffic on both seats (host cases ${ca.cases} · guest cases ${cb.cases} · forced losses A ${lost.A} B ${lost.B} · Kỳ ngộ lines host ${ca.ky} guest ${cb.ky})`);
 ok(!dI.size,`no piece in two places (${dI.size} pieces persistent dup, ${dups.length} piece-weeks)`,dups.slice(0,4).map(x=>({w:x.w,id:x.id,at:x.at})));
 ok(!vI.size,`no durable piece vanished (${vI.size} pieces, ${vans.length} piece-weeks)`,vans.slice(0,4).map(x=>({w:x.w,id:x.id})));
 const NL=ca.NETL.map(x=>['A'].concat(x)).concat(cb.NETL.map(x=>['B'].concat(x)));console.log('NET lines',JSON.stringify(NL));const nlo=NL.filter(x=>x[5]==='LOST-CASE');
 ok(!nlo.length,`ledger net: no unrouted removal of a lost-case piece on either seat (${nlo.length}; all pieces host +${ca.net-net0[0]} guest +${cb.net-net0[1]}, the others are outside jlost: reported)`,nlo);
  ok(!coopH,`no host lost case held by a friend entry in any week (max ${coopH})`);
 const miss=[...await A.p.evaluate(()=>__fmiss()),...await B.p.evaluate(()=>__fmiss())];console.log('FAM acts',JSON.stringify(fam),'famMiss',JSON.stringify(miss.slice(-12)));
 const fs_=x=>(fam['A.'+x]||0)+(fam['B.'+x]||0);if(FAM)ok((fam['A.steal']||0)>=3&&(fam['B.steal']||0)>=3&&fs_('npc')>=4&&fs_('plant')+fs_('ui')>=4,`friend-act item traffic (${JSON.stringify(fam)})`);
 console.log('SUMMARY',JSON.stringify({fam,miss:miss.length,weeks:weeksOk,ids:Object.keys(seen).length,dupPieces:dI.size,dupWeeks:dups.length,vanPieces:vI.size,vanWeeks:vans.length,casesA:ca.cases,casesB:cb.cases,kyA:ca.ky,kyB:cb.ky,lost}));
 fs.writeFileSync(OUT+'/faults.json',JSON.stringify({dups,vans},null,1));
 try{fs.writeFileSync(OUT+'/trace.json',JSON.stringify({A:await A.p.evaluate(()=>({rmT:__rmT,rcv:__rcv})),B:await B.p.evaluate(()=>({rmT:__rmT,rcv:__rcv}))}))}catch(e){console.log('trace dump',e.message)}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
