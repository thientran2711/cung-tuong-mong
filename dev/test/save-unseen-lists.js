/* save-unseen-lists (review/save-unseen-lists, LAW 11): what the player has not seen yet survives a TRUE page reload, and a new life is in the slot at once.
   Orders (FOREMAN_B_STATUS, MAIN 140 25/11): ~13:10Z robot M2 «unread Tin báo are LOST on true reload: before NT.list total 20 unread 5 → after
   reload+continue total 0 unread 0» + ~13:35Z robot M4 «0 s true reload right after a NEW LIFE starts → NO «Tiếp tục kiếp này»; 4 s reload → Danh/Sủng/Bạc drift».
   Cases (each: real page.reload() → title → «Tiếp tục kiếp này» of Sổ 1, as a player):
     tinbao     a seeded life plays 2 buổi, the «Tin báo» list is filled to 20 through the game's one entry point (kitNotice: real errand / Tai mắt /
                place notices with their buttons), 15 read → total 20 / unread 5 → reload → the same 20 ids in the same order, the same 5 unread, the
                box badge «5», the buttons back (go), a notice's panel opens.
     held       a held optional card (j68 EVHOLD, she has not seen it) waits → reload → still waiting, and shown at a later buổi as before.
     nl-0s      title «Bắt đầu kiếp mới» (+ one code card waiting behind the identity card, the robot's life) → «Thân phận kiếp này» → «Nhận thân phận» → reload at 0 ms → «Tiếp tục kiếp này» with her name, no identity card
                again, Danh / Sủng / Bạc (every top-bar number) exactly as on screen at the tap.
     nl-card    reload while the identity card is open → «Tiếp tục kiếp này» → the SAME card again (same name, same roll) → «Nhận thân phận» works.
     nl-death   a life dies → «Chuyển kiếp» → the new life's card → «Nhận thân phận» → reload at 0 ms → «Tiếp tục kiếp này» (the dead life's slot was empty).
     nl-4s      after «Nhận thân phận» she answers what comes for 4 s → reload → every top-bar number + date exactly as on screen.
     drift      a seeded life, taps over the new year with one act after each: after every moment the sổ equals the screen (Danh, Sủng, Bạc, Đức, Tài, Sắc,
                Tâm cơ, Sức, Thái hậu, date); reload 0 s and 4 s after the last tap → the same numbers.
   env SUL_ONLY=tinbao,nl-0s · SUL_MUTATE=nt (the sổ loses the notice list) | evh (loses the held cards) | nl (the life-start write is delayed: none while
   the identity card is open, none at once at «Nhận thân phận») — a MUTATE run must FAIL.
   usage: node dev/test/save-unseen-lists.js [page=index.html] [devices=fold,ipadAir] [seed=1]   (serves the repo root = the BUILT site)
   exit 0 = every case PASS. */
const {chromium}=require('playwright');const DBGD=!!process.env.SUL_DBGD;const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEVS='fold,ipadAir',SEED='1']=process.argv;
const ONLY=(process.env.SUL_ONLY||'').split(',').filter(Boolean);const want=n=>!ONLY.length||ONLY.includes(n);const MUT=process.env.SUL_MUTATE||'';
/* the player helpers of dev/test/save-boundary-reload.js (settle = answer every card / close scenes like a player; newLife; after) — one copy, read from that file */
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');
const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
const KEYS=['danh','sung','bac','duc','tai','sac','tamco','suc','th','age','rank','year','month','tuan','buoi','name'];
const VEC=`(o=>${JSON.stringify(KEYS)}.map(k=>k+'='+(typeof o[k]==='number'?Math.round(o[k]*100)/100:o[k])).join(' '))`;
const HUD=`(()=>[...document.querySelectorAll('#kstrow .kst')].map(e=>e.dataset.k+':'+e.textContent.replace(/\\s+/g,'')).join(' '))`;
/* page-side mutations (applied after every page load) */
const MUTJS={nt:`(()=>{const s0=ser;ser=function(){const d=s0.apply(this,arguments);if(d)delete d.nt;return d}})()`,
 rk:`(()=>{rcpMk=function(){return null}})()`,
 evh:`(()=>{const s0=ser;ser=function(){const d=s0.apply(this,arguments);if(d)delete d.evh;return d}})()`,
 /* nl: the life-start write is delayed — nothing written while the identity card is open (yet the buổi marked as written), no at-once write at «Nhận thân phận» */
 nl:`(()=>{window.jqSaveNow=function(){};const s0=save;save=function(){if(typeof NLP!=='undefined'&&NLP&&S&&!S.dead){JQ.k=[S.year,S.month,S.tuan,S.buoi||0,S.name].join('.');JQ.s=S;return}return s0.apply(this,arguments)}})()`};
async function play(b,dev,url,seed,fn){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,seed);
 await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
 const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1500);await p.evaluate(H);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}});if(MUT&&MUTJS[MUT])await p.evaluate(MUTJS[MUT]);if(DBGD)await p.evaluate(()=>{window.__dbgD=1})};
 try{return await fn(p,open,pe)}finally{await ctx.close()}}
/* a TRUE reload, then the title: what Sổ 1 offers, and (when it offers it) «Tiếp tục kiếp này» */
async function reloadTitle(p,open){await p.reload({waitUntil:'domcontentloaded'});await open();
 return p.evaluate(()=>{const s=document.getElementById('slots');const b=s.querySelector('button[data-load="1"]');return{cont:!!(b&&/Tiếp tục kiếp này/.test(b.textContent)),slot:(s.querySelector('.slot')||{}).innerText||''}})}
async function cont(p){await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(2500)}
/* the new life's origin (SUL_NLO, default td «Con gái tội thần»: Tiền truyện panels). The robot M4 life had a CODE card waiting behind the identity
   card when she tapped «Nhận thân phận» (an opening visitor «Có người đến»: its options run code, it cannot be written down — random, a few lives in
   ten): on LIVE that card held the first write of the whole life (jqsave marked the buổi as written by the save j52 had dropped). The case puts ONE
   such card behind the identity card (a visitor with a code option, as the game makes them) so the moment is the robot's every run. */
const NLO=process.env.SUL_NLO||'td';
const codeCard=p=>p.evaluate(()=>{Q.push({t:'Có người đến',who:null,h:'<p>Một cung nữ đứng ngoài cửa xin vào.</p>',opts:[{n:'Cho vào',fx:{},go:()=>{log('Cung nữ vào thưa chuyện.')}},{n:'Bảo về',fx:{},go:()=>{}}]})});
const titleNew=async p=>{await p.evaluate(o=>{window.__forceOrigin=o;document.querySelector('#slots button[data-new="1"]').click()},NLO);
 await p.waitForFunction(()=>typeof NLP!=='undefined'&&NLP&&Q.some(m=>m.nl),null,{timeout:90000});await p.waitForTimeout(400)};
const acceptTap=p=>p.evaluate(()=>{const b=document.querySelector('button[data-nl="ok"]');if(b&&b.offsetParent)b.click();else nlAccept(false)});
const snap=p=>p.evaluate(([v,h])=>({v:eval(v)(S),hud:eval(h)(),nl:!!(typeof NLP!=='undefined'&&NLP),card:Q.some(m=>m.nl)}),[VEC,HUD]);

/* ---------- tinbao ---------- */
async function tinbao(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();for(let i=0;i<2;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k)}
  const real=NT.list.length;/* top up through the ONE entry point with the real notice kinds (errand land, Tai mắt news, a place line) */
  for(let i=0;NT.list.length<BAL.noticeMax&&i<60;i++){const k=i%3;if(k===0&&typeof errNotify==='function')errNotify('t'+i,`Cung nữ ${i} đã về: có tin báo.`);
   else if(k===1)kitNotice({id:'tb:t'+i,kind:'tin',line:`Tai mắt báo: Ngự hoa viên có chuyện ${i}`,text:`Tai mắt báo: chuyện thứ ${i}`,go:()=>{},goLabel:'Để ta xem'});else kitNotice({line:`Tin trong cung số ${i}`})}
  const L=NT.list;L.forEach((x,i)=>{if(i>=5)x.seen=true});kitNoticeBox();render();await new Promise(r=>setTimeout(r,600));
  const sz=JSON.stringify(ser()).length,szNt=JSON.stringify(ser().nt||[]).length;
  return{real,total:L.length,unread:L.filter(x=>!x.seen).length,ids:L.map(x=>x.id),go:L.filter(x=>typeof x.go==='function').map(x=>x.id),sz,szNt,badge:(document.getElementById('kntbox')||{dataset:{}}).dataset.n||''}});
 const t=await reloadTitle(p,open);if(t.cont)await cont(p);
 const a=await p.evaluate(()=>{const L=(window.NT||{list:[]}).list;const box=document.getElementById('kntbox');
  const o={total:L.length,unread:L.filter(x=>!x.seen).length,ids:L.map(x=>x.id),go:L.filter(x=>typeof x.go==='function').map(x=>x.id),badge:box?box.dataset.n:'',opened:false};
  try{o.opened=!!kitNoticeOpen(L[0]&&L[0].id);closeModal()}catch(e){}/* the panel of one notice opens (after the counts: opening marks it read) */return o});
 const pass=t.cont&&r.total===20&&r.unread===5&&a.total===r.total&&a.unread===r.unread&&a.ids.join()===r.ids.join()&&a.go.join()===r.go.join()&&a.badge==='5'&&a.opened&&!pe.length;
 return{pass,line:`before total ${r.total} unread ${r.unread} (game-made ${r.real}, badge ${r.badge}, buttons ${r.go.length}) · after reload total ${a.total} unread ${a.unread} badge «${a.badge}» buttons ${a.go.length} order ${a.ids.join()===r.ids.join()?'same':'DIFFERENT'} panel ${a.opened?'opens':'NO'} · sổ ${r.sz} chars (Tin báo ${r.szNt})${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- held ---------- */
async function held(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();
  const m={t:'Chuyện lạ trong cung',h:'<p>Có người kể chuyện lạ ở Ngự hoa viên (thẻ thử, chưa xem).</p>',opt:1};EVHOLD.length=0;/* alone in the hold (the scheduler releases the oldest first) */EVHOLD.push({m,at:wk(),K:evKeys(m)});render();await new Promise(r=>setTimeout(r,400));
  return{n:EVHOLD.length,t:EVHOLD.map(h=>h.m.t)}});
 const t=await reloadTitle(p,open);if(t.cont)await cont(p);
 const a=await p.evaluate(async()=>{const n=typeof EVHOLD!=='undefined'?EVHOLD.length:-1,t=n>0?EVHOLD.map(h=>h.m.t):[];const seen=[];const sm=showModal;showModal=window.showModal=function(){try{if(Q[0])seen.push(String(Q[0].t||''))}catch(e){}return sm.apply(this,arguments)};
  /* the scheduler releases a held card right after a step when nothing else is up (j68 evRelease, at random): a player steps on; after each step the
     screen is cleared and the same release is asked again (as the next step would) */
  for(let i=0;i<12&&!seen.includes('Chuyện lạ trong cung');i++){const k=__sbr.key();used=BAL.time.khac;const nx=document.getElementById('next');nx.disabled=false;nx.click();await __sbr.after(k);
   for(let j=0;j<6&&!seen.includes('Chuyện lạ trong cung')&&!Q.length;j++){try{evRelease()}catch(e){}await __sbr.settle()}}
  return{n,t,shown:seen.includes('Chuyện lạ trong cung')}});
 const pass=t.cont&&r.n===1&&a.n===1&&a.t[0]===r.t[0]&&a.shown&&!pe.length;
 return{pass,line:`held before reload ${r.n} «${r.t[0]}» · after reload ${a.n} ${a.t[0]?'«'+a.t[0]+'»':''} · shown at a later buổi: ${a.shown?'yes':'NO'}${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- new life ---------- */
async function nl0(b,dev,url,seed,death){return play(b,dev,url,seed,async(p,open,pe)=>{await open();let old='';
 if(death){await titleNew(p);await acceptTap(p);await p.evaluate(async()=>{await __sbr.settle()});old=await p.evaluate(()=>{const n=S.name;die('Bệnh nặng không qua khỏi');return n});
  for(let i=0;i<80;i++){const st=await p.evaluate(()=>{if(typeof NLP!=='undefined'&&NLP&&Q.some(m=>m.nl))return 'card';if(Q.length){const m=Q[0];const o=m.opts||[];const j=o.findIndex(x=>/kiếp mới|luân hồi|đầu thai|chuyển kiếp/i.test(String(x.n||'')));try{if(o.length)chooseM(j<0?0:j);else closeModal()}catch(e){Q.shift()}return 'q'}
   const bt=[...document.querySelectorAll('#modal button,#title button')].find(x=>x.offsetParent&&/kiếp mới|luân hồi|bắt đầu|chuyển kiếp/i.test(x.textContent));if(bt){bt.click();return 'b'}return 'none'});if(st==='card')break;await p.waitForTimeout(300)}}
 else await titleNew(p);
 await codeCard(p);const slotAtCard=await p.evaluate(()=>!!localStorage.getItem('hclh-save-v2-1'));
 await acceptTap(p);const s=await snap(p);/* 0 ms: reload at once */const code=await p.evaluate(()=>Q.filter(m=>typeof jqSaveable==='function'?!jqSaveable(m):!!(m.opts&&!m.pid)).length);if(process.env.SUL_DEBUG)console.log(await p.evaluate(()=>JSON.stringify({Q:Q.map(m=>[String(m.t).slice(0,30),typeof jqSaveable==="function"?jqSaveable(m):"-",!!m.onClose]),jq:typeof JQ!=="undefined"?JQ.stat:0,org:S.origin.k})));
 const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 const pass=t.cont&&a&&!a.card&&!a.nl&&a.v===s.v&&a.hud===s.hud&&!pe.length;
 return{pass,line:`${death?'old life '+old+' died · ':''}slot at the card: ${slotAtCard?'yes':'empty'} · ${code} opening code card(s) open · at the tap ${s.v} · reload 0 ms → title ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục» ('+t.slot.replace(/\s+/g,' ').slice(0,60)+')'}${a?` → ${a.card?'IDENTITY CARD AGAIN · ':''}${a.v===s.v?'same numbers':'DRIFT '+a.v}${a.hud===s.hud?'':' · HUD '+a.hud}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}
async function nlCardCase(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();await titleNew(p);
 const s=await p.evaluate(()=>({name:S.name,seed:NLP.seed}));const t=await reloadTitle(p,open);let a=null;
 if(t.cont){await cont(p);a=await p.evaluate(()=>({name:S.name,nl:!!NLP,seed:NLP&&NLP.seed,card:Q.some(m=>m.nl),shown:!document.getElementById('modal').hidden&&!!document.querySelector('#modal button[data-nl="ok"]')}));
  await acceptTap(p);await p.waitForTimeout(500);a.after=await p.evaluate(()=>({nl:!!NLP,card:Q.some(m=>m.nl)}))}
 const pass=t.cont&&a&&a.name===s.name&&a.nl&&a.seed===s.seed&&a.card&&a.shown&&!a.after.nl&&!a.after.card&&!pe.length;
 return{pass,line:`card open: ${s.name} · reload → title ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục»'}${a?` → ${a.card&&a.shown?'the same card':'NO CARD'} (${a.name}${a.seed===s.seed?', same roll':', OTHER ROLL'}) → Nhận thân phận ${!a.after.nl&&!a.after.card?'ok':'STUCK'}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}
async function nl4(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();await titleNew(p);await codeCard(p);await acceptTap(p);
 await p.evaluate(async()=>{const t0=Date.now();while(Date.now()-t0<4000){await __sbr.settle1();await new Promise(r=>setTimeout(r,200))}});const s=await snap(p);
 const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 const pass=t.cont&&a&&!a.card&&a.v===s.v&&a.hud===s.hud&&!pe.length;
 return{pass,line:`4 s after «Nhận thân phận»: ${s.v} · reload → ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục»'}${a?` → ${a.v===s.v?'same numbers':'DRIFT '+a.v}${a.hud===s.hud?'':' · HUD '+a.hud+' (was '+s.hud+')'}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- flipcards (rv r2 FIX 2, save-year-rollback «## REVIEW r2» probe) ----------
   The cards of the new buổi are left OPEN at the month / year flip (stipend «Bổng lộc tháng …» + «· Lễ nghĩa», the Nội vụ phủ skim answers, «Danh
   hiệu mới», «Y phục dự Tết», «Chuyện bên lề», «Có người đến», data cards) for FC_WAIT ms (0 = the instant the step is over, 3000 = what a player who
   reloads has), then a TRUE reload → «Tiếp tục kiếp này»: every unseen card (Q + SP13.L + EVHOLD, data AND code) comes back, the date is the new one
   and every top-bar number is the same (no second stipend pay, no second Danh). Then «Chu toàn / Bớt lễ nghĩa» is answered after the reload and
   costs as on the card (LAW 2/3: the cost card cannot be skipped by reload). env SUL_FC=month,year (flips) · SUL_FCW=0,3000 (waits) · SUL_FCS=1,2 (seeds).
   MUTATE rk: the generator remake is dropped (rcpMk → nothing) → must FAIL. */
const FCAL={month:'S.tuan=2;S.buoi=B4L-1',year:'S.month=12;S.tuan=2;S.buoi=B4L-1'};
const UNSEEN=`(()=>{const t=m=>String(m&&(m.t||m.title||m.pid)||'').replace(/<[^>]+>/g,'').slice(0,60)+(m&&m.rum95?'#'+m.rum95:'');const L=[];for(const m of Q)if(!m.nl)L.push(t(m)+(m.opts&&m.opts.length?'*':''));
 if(typeof SP13!=='undefined')for(const x of SP13.L)L.push(t(x.m)+(x.m.opts&&x.m.opts.length?'*':''));if(typeof EVHOLD!=='undefined')for(const h of EVHOLD)L.push(t(h.m)+(h.m.opts&&h.m.opts.length?'*':''));return L.sort()})()`;
async function flipcards(b,dev,url,seed,flip,wait){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async([cal,wait,vec,hud,uns])=>{__sbr.newLife('thd');await __sbr.settle();eval(cal);used=0;render();await __sbr.settle();
  if(window.__dbgD){Error.stackTraceLimit=80;/* debug (SUL_DBGD=1): every Danh change and every slot write, with a stack */let d=S.danh;const W=window.__dd=[];const S0=S;Object.defineProperty(S0,'danh',{configurable:true,get(){return d},set(v){if(v!==d)W.push(['danh',d,v,Date.now(),new Error().stack.split('\n').slice(2,30).filter(x=>!/at apply \(/.test(x)).map(x=>x.trim().slice(0,90)).join(' < ')]);d=v}});
   const si=localStorage.setItem.bind(localStorage);localStorage.setItem=(k,v)=>{if(k==='hclh-save-v2-1'){try{W.push(['save',JSON.parse(v).S.danh,0,Date.now(),''])}catch(e){}}return si(k,v)}}
  const sl=t=>new Promise(r=>setTimeout(r,t));const tap=()=>{used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click()};
  {const k=__sbr.key();tap();await __sbr.after(k)}/* one buổi before the flip (→ tối), answered as a player */
  /* the flip tap (tối of the last tuần): the night before it (Kính sự phòng, the night scene) is answered as a player until the date changes;
     from the moment the date changes nothing is answered */
  const k0=__sbr.key();const b0=__sbr.busy;__sbr.busy=function(){if(__sbr.key()!==k0)throw 'flip';return b0.call(this)};/* settle stops the instant the date changes */
  tap();try{for(let i=0;i<240&&__sbr.key()===k0;i++){await __sbr.settle1();await sl(250);if(i%12===11&&__sbr.key()===k0&&!b0.call(__sbr))tap()}}catch(e){if(e!=='flip')throw e}finally{__sbr.busy=b0}
  for(let i=0;i<200&&((typeof SP13!=='undefined'&&SP13.nb)||__sbr.dawn()||!!document.querySelector('.kmov:not(.km-out) button,#kmrew button'));i++){/* the new-day host / a scene closes (not a card) */
   if(__sbr.dawn()){const d=document.getElementById('dawn');const bt=[...d.querySelectorAll('button')].filter(x=>__sbr.vis(x));if(bt.length)bt[bt.length-1].click();else{d.classList.remove('on');d.hidden=true}}
   const sc=document.querySelector('.kmov:not(.km-out) button,#kmrew button');if(sc)sc.click();await sl(100)}
  await sl(wait);const L=eval(uns);const all=Q.concat(typeof SP13!=='undefined'?SP13.L.map(x=>x.m):[],typeof EVHOLD!=='undefined'?EVHOLD.map(h=>h.m):[]);
  const code=all.filter(m=>m&&m.opts&&m.opts.length&&typeof jqSaveable==='function'&&!jqSaveable(m)).map(m=>String(m.t||'').slice(0,40)+(m.__rkLen?' ra '+m.__rkLen:''));return{sv:__sbr.saved(),dd:window.__dd||null,code,k0,key:__sbr.key(),v:eval(vec)(S),hud:eval(hud)(),L,stat:{sp:typeof SP13!=='undefined'?SP13.stat.unsaved||0:0,jq:typeof JQ!=='undefined'?JQ.stat:{}}}},[FCAL[flip],wait,VEC,HUD,UNSEEN]);
 if(DBGD)console.log((r.dd||[]).slice(-8).map(x=>[x[0],x[1],x[2],x[3]%100000,String(x[4]).split(' < ').filter(y=>!/index.html\?khost=0:(4453|66782):/.test(y)).slice(0,3).join(' < ')].join(' ')).join('\n'));
 const t=await reloadTitle(p,open);let a=null,duty=null;
 if(t.cont){await cont(p);a=await p.evaluate(([vec,hud,uns])=>({key:__sbr.key(),v:eval(vec)(S),hud:eval(hud)(),L:eval(uns),fail:(window.__rcpFail||[]).map(x=>x.slice(0,2).join(':'))}),[VEC,HUD,UNSEEN]);
  /* the cost card answered after the reload: «Chu toàn lễ nghĩa» pays bạc (or «Bớt lễ nghĩa» costs Danh) as on the card */
  duty=await p.evaluate(()=>{const all=Q.concat(typeof SP13!=='undefined'?SP13.L.map(x=>x.m):[]);const m=all.find(x=>/· Lễ nghĩa$/.test(String(x.t||''))||(x.opts||[]).some(o=>o.n==='Chu toàn lễ nghĩa'));if(!m)return null;
   const o=m.opts.find(o=>o.n==='Chu toàn lễ nghĩa');const b0=S.bac,d0=S.danh;const i=Q.indexOf(m);if(i<0){Q.unshift(m);const j=SP13.L.findIndex(x=>x.m===m);if(j>=0)SP13.L.splice(j,1)}else if(i>0){Q.splice(i,1);Q.unshift(m)}
   showModal();chooseM(m.opts.indexOf(o));return{fx:o.fx,db:S.bac-b0,dd:S.danh-d0}})}
 const miss=[];if(a){const A=a.L.slice();for(const x of r.L){const i=A.indexOf(x);if(i<0)miss.push(x);else A.splice(i,1)}}
 const dutyOk=!duty||(duty.db===duty.fx.bac||duty.dd<0);
 if(DBGD)console.log('at capture: screen '+r.v.slice(0,40)+' | sổ '+r.sv);
 const pass=t.cont&&a&&a.key===r.key&&a.v===r.v&&a.hud===r.hud&&!miss.length&&dutyOk&&!pe.length;
 return{pass,line:`${flip} ${wait} ms · ${r.k0} → ${r.key} · open/waiting ${r.L.length} (${r.L.filter(x=>x.endsWith('*')).length} with choices): ${r.L.join(' | ')}
    after reload ${a?a.key:'NO «Tiếp tục»'} · ${a?(miss.length?'LOST '+miss.length+': '+miss.join(' | '):'every card back ('+a.L.length+')'):''}${a&&a.v!==r.v?' · DRIFT '+a.v+' (was '+r.v+')':a?' · same numbers':''}${a&&a.hud!==r.hud?' · HUD '+a.hud:''}${duty?` · Lễ nghĩa after reload: Bạc ${duty.db} (card ${duty.fx.bac})${dutyOk?'':' WRONG'}`:' · no Lễ nghĩa card'}${r.code.length?' · code cards with no generator at the flip: '+r.code.join(' | '):''}${a&&a.fail.length?' · rcpFail '+a.fail.join(','):''}${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- drift ---------- */
async function drift(b,dev,url,seed){const one=wait=>play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async([v])=>{const V=eval(v);__sbr.newLife('thd');await __sbr.settle();S.month=12;S.tuan=2;S.buoi=B4L-1;used=0;render();await __sbr.settle();
  const sv=()=>{try{return V(JSON.parse(localStorage.getItem('hclh-save-v2-1')).S)}catch(e){return 'none'}};let mis=0;const L=[];
  const act1=async()=>{const u0=used;for(let i=0;i<(deck||[]).length&&used===u0;i++){const a=deck[i];if(!a||a.done)continue;try{act(i)}catch(e){}if(used!==u0||Q.length){await __sbr.settle();return String(a.n||'').slice(0,20)}}return ''};
  for(let t=0;t<5;t++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k);let a=V(S),s=sv();if(a!==s){mis++;L.push('tap ≠ '+a+' | sổ '+s)}
   const an=await act1();a=V(S);s=sv();if(a!==s){mis++;L.push('act «'+an+'» ≠ '+a+' | sổ '+s)}}
  return{mis,L}},[VEC]);
 if(wait)await p.waitForTimeout(wait);const s=await snap(p);const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 return{mis:r.mis,L:r.L,pass:!r.mis&&t.cont&&a&&a.v===s.v&&a.hud===s.hud&&!pe.length,s,a,pe}});
 const z=await one(0),f=await one(4000);
 return{pass:z.pass&&f.pass,line:`moments sổ ≠ screen: ${z.mis+f.mis} · reload 0 s ${z.a&&z.a.v===z.s.v&&z.a.hud===z.s.hud?'same':'DRIFT '+(z.a&&z.a.v)} · reload 4 s ${f.a&&f.a.v===f.s.v&&f.a.hud===f.s.hud?'same':'DRIFT '+(f.a&&f.a.v)} (${f.s.v})`+(z.L.concat(f.L).length?'\n    '+z.L.concat(f.L).slice(0,6).join('\n    '):'')+(z.pe.concat(f.pe).length?' · pageerror '+z.pe.concat(f.pe)[0]:'')}}

(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const url=srv.url+PAGE;let fail=0,n=0;const seed=+SEED;
 const C=[['tinbao',tinbao],['held',held],['nl-0s',(b,d,u,s)=>nl0(b,d,u,s,false)],['nl-card',nlCardCase],['nl-death',(b,d,u,s)=>nl0(b,d,u,s,true)],['nl-4s',nl4],['drift',drift]];
 const FCF=(process.env.SUL_FC||'month,year').split(','),FCW=(process.env.SUL_FCW||'0,3000').split(',').map(Number),FCS=(process.env.SUL_FCS||'1,2').split(',').map(Number);
 for(const f of FCF)for(const w of FCW)for(const s of FCS)C.push([`flip-${f}-${w/1000}s-s${s}`,(b,d,u)=>flipcards(b,d,u,s,f,w)]);
 for(const dev of DEVS.split(','))for(const [name,fn] of C){if(!want(name)&&!(ONLY.includes('flip')&&name.startsWith('flip-')))continue;let r;try{r=await fn(b,dev,url,seed)}catch(e){r={pass:false,line:'ERROR '+String(e&&e.message||e).slice(0,200)}}
  n++;if(!r.pass)fail++;console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${name} · ${r.line}`)}
 console.log(`${fail?'SAVE-UNSEEN FAIL '+fail+'/'+n:'SAVE-UNSEEN PASS '+n+'/'+n}${MUT?' (MUTATE '+MUT+')':''} · page ${PAGE}`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
