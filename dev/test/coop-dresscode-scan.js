/* coop-dresscode-scan (E30r3 review, law 6c REAL OBJECTS, CO-OP): the holder count of dresscode-loan-scan.js on 2 seats against the LIVE Worker
   for ≥ 2 bot years (≥ 72 merged weeks). Every lent piece is tagged on the seat that lends it; after each merged week it must sit in exactly ONE
   place counted over the HOST's world (her S, every NPC, the ledger box) + the GUEST's own S (her copies of the NPCs are the host's world: not
   counted; the friend entries are copies of the other seat: not counted). A count ≠ 1 that is still wrong one week later = FAIL (a piece in
   flight inside one merge is reported as a transient). Loans come from the game's own roads on both seats (festival gate «Mượn …» / «Cài …»,
   the NPC ask frame «Cho mượn» answered through the real dialogs, NPC ↔ NPC on the host); a festival code is forced most weeks on both seats.
   Both seats: portrait id changed now and then (the move / confiscate disturbances are covered solo by dresscode-loan-scan.js; COOP_DIST=1 adds them here as raw edits, diagnostic).
   Helpers copied from coop-dresscode.js.   usage: python3 dev/build/assemble.py && node dev/test/coop-dresscode-scan.js [outdir] [workerURL] [weeks=76] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-dresscode-scan'));fs.mkdirSync(OUT,{recursive:true});
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
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
const NW=+process.argv[4]||76;/* COOP_DIST=1: also raw host-side edits (a held piece moved / boxed by direct array edits, outside the act system) — diagnostic only: the co-op merge does not expect them */
const DIST=+process.env.COOP_DIST||0;
/* installed on each seat once its world is up: tag at lend, forced festival, census */
const INST=([seat,world])=>{window.__T={};window.__st={her:0,lend:0,npc:0,fail:0};let seq=0;const b0=dcBorrow;
 dcBorrow=function(to,from,e){if(e&&!e.sc)e.sc=seat+(++seq);const r=b0.apply(this,arguments);if(r){__T[e.sc]={k:e.k,lender:from===S?'me':from.id,to:to===S?'me':to.id,wk:dcWk()};__st[to===S?'her':from===S?'lend':'npc']++}else __st.fail++;return r};
 const a0=aff;aff=(x,y)=>Math.max(a0(x,y),45);const F0=dcFestNow;window.__FK=null;dcFestNow=()=>window.__FK&&FEST[window.__FK]?Object.assign({k:window.__FK},FEST[window.__FK]):F0();
 window.__census=()=>{const M={};const seen=new Set();const P=[S].concat(world?rivals.filter(v=>v&&!v.coop):[]);const PS=new Set([S].concat(rivals));
  const walk=(o,pt,d)=>{if(!o||typeof o!=='object'||seen.has(o)||d>9)return;seen.add(o);if(typeof o.sc==='string'&&o.k)(M[o.sc]=M[o.sc]||[]).push(pt);
   for(const k in o){if(k==='dcLent'||k==='__inv0'||k==='coopAsk')continue;const v=o[k];if(v&&typeof v==='object'&&!PS.has(v))walk(v,pt+'.'+k,d+1)}};
  for(const q of P)walk(q,q===S?'me':'v'+q.id,0);for(const k in M)M[k]=M[k].filter(x=>!/\.(lost|il\.log)/.test(x));return M};
 const TR=Object.keys(BAL.dc.piece).filter(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt);
 window.__stock=r=>{const fams=[...new Set(TR.map(k=>BAL.dc.piece[k][0]))];S.inv=S.inv||[];let n=0;for(const f of fams)if((r*7+n++)%10<3){const k=TR.find(k=>BAL.dc.piece[k][0]===f);if(!S.inv.some(e=>e&&e.k===k))S.inv.push({k,from:'emp'})}
  if(world)for(const v of rivals)if(v&&!v.coop&&v.alive){v.inv=v.inv||[];if(v.inv.filter(e=>e&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='tram').length<2)for(let i=0;i<2;i++)v.inv.push({k:TR[(v.id*13+i*7+r)%TR.length],from:'emp'})}};
 return true};
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 for(const o of [A,B])await o.ctx.addInitScript(()=>{window.__forceOrigin='thd'});
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 ok(await A.p.evaluate(INST,['A',true])&&await B.p.evaluate(INST,['B',false]),'scan hooks on both seats');
 await A.p.evaluate(()=>__stock(1));await B.p.evaluate(()=>__stock(2));
 const FS=await A.p.evaluate(()=>Object.keys(BAL.dc.fest).filter(k=>FEST[k]));let rs=4242;const rnd=()=>{rs=(rs*48271)%2147483647;return rs/2147483647};
 let prev=new Set(),persist=[],trans=0,weeksOk=0,dist={move:0,box:0,pid:0};const t0=Date.now();
 for(let w=0;w<NW;w++){if(w%12===0){await A.p.evaluate(r=>__stock(r),w);await B.p.evaluate(r=>__stock(r),w+5)}
  const yr=await A.p.evaluate(()=>S.year);const fk=rnd()<.6?FS[Math.floor(rnd()*FS.length)]:null;
  for(const o of [A,B])await o.p.evaluate(fk=>{window.__FK=fk},fk);
  /* host disturbances on its world (a held piece moved / confiscated) */
  const r1=rnd(),r2=rnd();const dd=!DIST?null:await A.p.evaluate(([r1,r2])=>{const H=[];for(const q of rivals.filter(v=>v&&!v.coop)){const w=wdOf(q);if(w.tram&&w.tram.bor&&w.tram.sc)H.push({q,e:w.tram,sl:1});for(const e of q.inv||[])if(e&&e.bor&&e.sc)H.push({q,e})}
    if(!H.length||r1>.3)return null;const h=H[Math.floor(r2*H.length)];const w=wdOf(h.q);if(h.sl){w.tram=null;const pi=h.q.inv.findIndex(x=>x&&x.dcPrev);if(pi>=0){const pv=h.q.inv.splice(pi,1)[0];delete pv.dcPrev;w.tram=pv}}else h.q.inv.splice(h.q.inv.indexOf(h.e),1);
    if(r1<.18){const u=rivals.filter(v=>v&&!v.coop&&v!==h.q)[3];dcInv(u).push(h.e);return'move:'+h.e.sc+'>'+u.id}ilS().box.push({e:h.e,at:'nvp',why:'scan',own:h.q.id,w:0});return'box:'+h.e.sc},[r1,r2]);if(dd){dist[dd.split(':')[0]]++;console.log('dist',w,dd)}
  if(rnd()<.08){const o=rnd()<.5?A:B;await o.p.evaluate(()=>{const ids=Object.keys(BAL.dc.who).filter(k=>/^c/.test(k));S.pid=ids[(S.year*7+S.month)%ids.length]});dist.pid++}
  for(const o of [A,B])await o.p.evaluate(()=>{S.suc=Math.max(S.suc||0,80);S.out=0;S.confined=0});
  const okw=await weekAll(A,B,'w'+w);if(okw)weeksOk++;await sleep(1200);
  for(const o of [A,B])await o.p.evaluate(()=>{window.__FK=null});
  /* the count: host world + the guest's own S */
  const ca=await A.p.evaluate(()=>__census()),cb=await B.p.evaluate(()=>__census());const ta=await A.p.evaluate(()=>__T),tb=await B.p.evaluate(()=>__T);
  const all=Object.assign({},ta,tb);const now=new Set();
  for(const sc in all){const L=(ca[sc]||[]).map(x=>'A:'+x).concat((cb[sc]||[]).map(x=>'B:'+x));if(L.length!==1){now.add(sc);if(prev.has(sc)){const x={w,sc,k:all[sc].k,lender:all[sc].lender,to:all[sc].to,lw:all[sc].wk,at:L};persist.push(x);if(!prev.has('!'+sc))console.log('PERSIST',JSON.stringify(x));if(process.env.COOP_DBG)console.log('DBG',JSON.stringify(await A.p.evaluate(sc=>{const I=S.il||{};const bx=(I.box||[]).filter(x=>x&&x.e&&x.e.sc===sc).map(x=>({at:x.at,why:x.why,own:x.own,w:x.w,by:x.by,iu:x.e.iu,bor:x.e.bor}));const ius=[...new Set(bx.map(x=>x.iu))];const ppl=[S].concat(rivals).map(p=>[p.id,p.alive,(p.inv||[]).filter(e=>e&&e.sc===sc).map(e=>[e.iu,e.bor])]).filter(x=>x[2].length);return{bx,ppl,log:(I.log||[]).filter(l=>ius.includes(l[1])).slice(-12),lent:rivals.filter(v=>(v.dcLent||[]).some(r=>r.e&&r.e.sc===sc)).map(v=>[v.id,v.alive,v.dcLent.filter(r=>r.e&&r.e.sc===sc)])}},sc)));now.add('!'+sc)}else{trans++;console.log('trans',w,sc,JSON.stringify(all[sc]),JSON.stringify(L))}}}
  prev=now;if(w%8===7)console.log('week',w,'tags',Object.keys(all).length,'persist',persist.length,'trans',trans,Math.round((Date.now()-t0)/1000)+'s')}
 const sa=await A.p.evaluate(()=>__st),sb=await B.p.evaluate(()=>__st);
 ok(weeksOk>=72,`≥ 2 bot years merged (${weeksOk}/${NW} weeks advanced for both)`);
 ok(sa.her+sb.her>=3&&sa.lend+sb.lend>=3&&sa.npc>=10&&sb.her>=1,`loans on every road (host her ${sa.her} lend ${sa.lend} NPC↔NPC ${sa.npc} · guest her ${sb.her} lend ${sb.lend})`,{sa,sb,dist});
 ok(!persist.length,`every lent piece in exactly ONE place over both seats after each merged week (${persist.length} persistent, ${trans} one-week transients)`,persist.slice(0,6));
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
