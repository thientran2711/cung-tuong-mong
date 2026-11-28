/* review/temper-perception (seat T2): the onlooker rule (jtperc) + her reason gate (Option A), with REAL TAPS (dev/test/realtap.js) for every player act.
   usage: node dev/test/temper-perception.js <build url> <outdir> [WxH@dpr,...]   (default: Fold 755x1000@2 + iPad 1180x820@2)
   the life is started like a player starts it (as robot-rt on review/robot-realtap): real taps on the title → Chơi một mình → Bắt đầu kiếp mới …;
   one fixed life: seeded Math.random (env TPSEED, default 7) + thân phận "tt" via the game's own hook window.__forceOrigin (no tap simulated).
   A person off the stage view is reached with a real swipe (finger on Fold, pointer drag on iPad) after the scene has loaded.
   cases (state is prepared by script; every act SHE does is a real tap on the screen):
     gateNo   her «Khiêu khích» card on a rival with no reason: greyed «chưa có cớ»; a real tap changes nothing.
     gateYes  the same rival after a grudge (Oán 45): the card names its reason «cớ: oán 45»; a real tap lands: the rival's regard drops,
              every onlooker the ONE record puts at that place in the khắc she CHOSE it (one is set there, and gone the next khắc) judges it,
              never the doer or the victim; the Sổ line «Người chứng kiến» appears.
     eaHook   an outburst (eaDo, Mắng cung nữ) enters the rule as an outburst; the consorts at her place judge it.
     math     tpJudge on one onlooker: trọng Nhân harsher; a kind memory softens; reason known (×reason) < no reason (×noReason); hearsay ×hear;
              Phạm thượng before a Tín judge who knows the reason = approval (+); Thái hậu's yearly cap holds.
     label    3 outbursts + 3 kind deeds seen → «Khẩu xà tâm Phật»; her real taps Hậu cung → Phi tần → that consort show it VISIBLE on the «Tính nết» row.
     npcMood  the motive gate adds BAL.tp.moodM for a heavily angry NPC (law 1: the same term as hers).
     oldsave  a save without S.tp loads and the rule runs.
   Checks per case: no page error, no horizontal page overflow, the case's expectation (ok); dead buttons counted by realtap. */
const {chromium}=require('playwright');const fs=require('fs');const RT=require('./realtap.js');
const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  const rt=RT.make(p,{log:()=>{},ignoreCover:/kpop|rtoast/});const cdp=await ctx.newCDPSession(p);
  /* one fixed life (as robot-rt does): seeded Math.random from the first script + the thân phận picked before the first tap through the game's own hook window.__forceOrigin (no tap simulated) */
  await p.addInitScript(sd=>{let r=sd>>>0||1;Math.random=()=>{r^=r<<13;r>>>=0;r^=r>>>17;r^=r<<5;r>>>=0;return r/4294967296};window.__forceOrigin="tt"},+(process.env.TPSEED||7));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,.kroul,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof tpDeed==='function'&&typeof eaSync==='function',null,{timeout:120000});await sleep(2500);
  /* the life starts the way a player starts it (robot-rt, review/robot-realtap): REAL taps on the title → Chơi một mình → Bắt đầu kiếp mới → Bỏ qua → Nhận thân phận → Vào cung … */
  const tapStart=async()=>{const pref=[/^chơi một mình/i,/^bắt đầu kiếp mới/i,/bỏ qua/i,/nhận thân phận/i,/^(vào cung|bắt đầu|nhập cung)/i,/^(tiếp|đồng ý|ok|được)$/i];const log=[];
   for(let k=0;k<80;k++){const st=await p.evaluate(()=>{const m=document.getElementById('modal');const inLife=typeof S!=='undefined'&&S&&S.name&&!(m&&!m.hidden&&/kptitle/.test(m.className));
     const B=[];for(const e of document.querySelectorAll('button,.opt,[data-o],[data-nl]')){const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;const t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);if(t===e||e.contains(t))B.push(e)}
     window.__tpB=B;return {inLife:!!inLife,t:B.map(e=>e.textContent.replace(/\s+/g," ").trim().slice(0,40))}});
    if(st.inLife)return {ok:true,log};let j=-1;for(const re of pref){j=st.t.findIndex(x=>re.test(x));if(j>=0)break}
    if(j<0){await sleep(700);continue}log.push(st.t[j]);const h=await p.evaluateHandle(j=>window.__tpB[j],j);await rt.tap(h,{screen:'title',label:st.t[j]});await sleep(900)}
   return {ok:false,log}};
  let started=false;
  const fresh=async()=>{if(!started){const r=await tapStart();res.start=r;started=r.ok}await p.evaluate(()=>{SLOT=3;/* each case starts with no person card up (the previous case's focus card is closed, as her ✕ would) */try{if(typeof DF==='object'&&DF&&DF.F){const o=DF.F;DF.F=null;DF.tk=null;DF.p=null;o.destroy()}}catch(e){}popIdx=null;
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');S.mood.v=0;S.emo=null;S.tp=null;S.confined=0;S.suc=100;render()});await sleep(600)};
  const done=async(nm,r)=>{console.error('case',nm,r&&r.ok,JSON.stringify(r).slice(0,900));const hs=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);res[nm]=Object.assign({hscroll:hs},r);if(hs||!r||r.ok!==true)bad++;
   res[nm].sel=await p.evaluate(()=>String(getSelection()).length);await p.evaluate(()=>getSelection().removeAllRanges());await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:55})};
  /* go to the rival's palace (state), then a REAL tap on her figure opens the person card; returns the card's «Khiêu khích» button text */
  /* the rival comes to HER palace (state: her row of the ONE record says so); a REAL tap on her figure opens the person card */
  /* STALE-TESTS-8: a ring left open by an earlier step (kitRing auto-opens on a crowded place, jkring goTo wire) stays up when the harness moves her by state;
     a player never meets that: with a ring up the bottom bar does not switch (probe: tab stays «act», LIVE a96564ad the same) and home has no ring (wants()).
     She closes it the way a player does — real taps on its ✕ (a focused ring steps back first) — before the next step. */
  const ringX=async()=>{const t=[];for(let k=0;k<4;k++){const on=await p.evaluate(()=>typeof kitRing==='object'&&!!kitRing.cur);if(!on)break;
    const x=p.locator('.kring-x button').first();if(!(await x.count()))break;t.push(await rt.tap(x,{screen:'ring',label:'✕'}));await sleep(700)}
   return {left:await p.evaluate(()=>typeof kitRing==='object'&&!!kitRing.cur),t}};
  const openRival=async()=>{const i=await p.evaluate(()=>{const v=window.__tv;Q.length=0;const R=agRec();if(R&&R.P["v"+v.id])for(let q=0;q<J95.KH;q++)R.P["v"+v.id][q]=["home","visit","me","sang chơi"];
    S.where=S.where||{};S.where[v.id]="home";popIdx=null;goTo("home");Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return curPeople().findIndex(x=>x.ref===v&&x.kind==="rival")});
   if(i<0)return {i};await sleep(800);const rx=await ringX();if(rx.left)return {i,ringStuck:rx};
   /* STALE-TESTS-7: the people of a place stand in the RING (jkring kitRing «Vòng người», KIT §104, owner OD 26/11 ~18:55Z): the band over the stage turns the ring
      (a swipe there no longer pages #tokens), the FRONT slot is bright, tap it = focus → her plaques drop. A player turns the ring with the real ‹ › arrows until
      she is in front, then taps her figure (a real tap at the painted figure: ring slots take no pointer events, the ring layer hit-tests the point). */
   for(let w=0;w<20&&!(await p.$('.kring-s'));w++)await sleep(250);
   if(await p.$('.kring-s')){const turns=[];for(let k=0;k<14;k++){const g=await p.evaluate(i=>{const L=[...document.querySelectorAll('.kring-s')];const j=L.findIndex(s=>s.__g&&s.__g.members.some(m=>m.i===i));const f=L.findIndex(s=>s.classList.contains('kring-front'));
      const s=L[j];const r=s&&s.getBoundingClientRect();return {n:L.length,j,f,x:r?r.left+r.width/2:0,y:r?r.top+r.height*.45:0}},i);turns.push(g.j+'/'+g.f+'/'+g.n);
     if(g.j<0)break;if(g.j===g.f){await sleep(500);if(rt.touch)await p.touchscreen.tap(g.x,g.y);else await p.mouse.click(g.x,g.y);await sleep(1200);
      const pl=await p.evaluate(()=>!!document.querySelector('.kpk .kfoc-b'));return {i,ring:1,turns,tap:pl,btn:null}}
     const ar=p.locator('button.kring-ar').filter({hasText:'›'}).first();if(!await rt.tap(ar,{screen:'ring',label:'›'}))break;await sleep(700)}
    return {i,ring:1,turns,tap:false,btn:null}}
   /* swipe stage (KIT 33.9): a person off the view is reached the way a player does it — a real swipe across the stage (pointer drag), never a jump */
   let sw=0;const pgs=[];for(;sw<8;sw++){const g=await p.evaluate(i=>{const t=document.querySelector(`#tokens .tok[data-p="${i}"]`),st=document.getElementById('stage');const r=t&&t.getBoundingClientRect(),q=st.getBoundingClientRect();
     const pg=(st.dataset.j59pg||'0,1').split(',').map(Number),hid=!r||r.width<1;return {vis:!hid&&r.right>q.left+4&&r.left<q.right-4,pg,dir:hid?(pg[0]<pg[1]-1?1:-1):(r.left>=q.right-4?1:-1),x0:q.left+q.width*.62,x1:q.left+q.width*.08,y:q.top+q.height*.6}},i);pgs.push(g.pg.join('/')+(g.vis?'v':'')+g.dir+(g.vis?'':'@'+(await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y);const c=e&&e.closest('.kshL,.kshR,.kchip,#tomap');return e?(e.tagName+'.'+String(e.className).slice(0,24)+(c?'!EXCL':'')):'-'},[g.dir>0?g.x0:g.x1,g.y]))));if(g.vis)break;
    const [a,z]=g.dir>0?[g.x0,g.x1]:[g.x1,g.x0];
    /* a player waits for the scene to finish loading (kload cover) before swiping */for(let w=0;w<30;w++){const inSt=await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y),st=document.getElementById('stage');return !!(e&&st.contains(e))&&!st.__j59anim},[a,g.y]);if(inSt)break;await sleep(500)}
    if(W<1100){/* touch device (Fold): a finger swipe (CDP touch events → pointer events, as on the phone) */const T=pt=>[{x:pt,y:g.y,id:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:T(a)});
     for(let k=1;k<=12;k++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:T(a+(z-a)*k/12)});await sleep(16)}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}
    else{/* pointer device (iPad landscape = trackpad / mouse): a mouse drag */await p.mouse.move(a,g.y);await p.mouse.down();for(let k=1;k<=12;k++){await p.mouse.move(a+(z-a)*k/12,g.y);await sleep(16)}await p.mouse.up()}await sleep(900)}
   const ok=await rt.tap(`#tokens .tok[data-p="${i}"]`,{screen:'visit',label:'rival'});await sleep(1000);
   const btn=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return b?{t:b.textContent.replace(/\s+/g," ").trim().slice(0,160),o:b.dataset.o}:null});
   return {i,sw,pgs,tap:ok,btn}};
  /* the person card shows her acts as focus buttons (.kfoc-b, KIT focus card); the .opt rows behind it are zero-size data rows */
  const KB=`(()=>{const v=[...document.querySelectorAll('.kfoc-b,.opt[data-o]')].filter(x=>/Khiêu khích/.test(x.textContent)&&x.getBoundingClientRect().width>1);return v[0]||null})()`;
  const kbInfo=()=>p.evaluate(`(()=>{const b=${KB};return b?{t:b.textContent.replace(/\\s+/g," ").trim(),cls:b.className,dis:!!b.disabled}:null})()`);
  const kbTap=async()=>{const h=await p.evaluateHandle(KB);const el=h.asElement();if(!el)return false;return rt.tap(el,{screen:'card',label:'Khiêu khích'})};
  /* STALE-TESTS-7: since act-merge (jdoor, owner OD 26/11 ~07:25Z) «Khiêu khích» is a member way of the door «Khiêu khích» (P6, with «Khoe quà ngự ban»):
     the person card shows the DOOR as a plaque (kitPick, KIT §98: tap = lift, «Chọn» = pick) → the door's choice card → one row per way, each with its
     own lock / reason (the Option A gate of jtperc sits on the way, inside the door). Every step a real tap. */
  const PKOK='.kpk .khconf:not([hidden])>.khok';
  const doorOpenTap=async()=>{if(!await kbTap())return false;for(let i=0;i<10&&!(await p.$(PKOK));i++)await sleep(150);if(!(await p.$(PKOK)))return false;
   const ok=await rt.tap(PKOK,{screen:'card',label:'Chọn (Khiêu khích)'});for(let i=0;i<12;i++){if(await p.evaluate(()=>{const M=document.getElementById('modal');return !!(M&&!M.hidden&&M.querySelector('.dlg .opts > button'))}))break;await sleep(250)}return ok};
  const ROW=()=>p.locator('#modal .dlg .opts > button').filter({hasText:/Khiêu khích/}).first();
  const rowInfo=()=>p.evaluate(()=>{const M=document.getElementById('modal');const b=M&&!M.hidden&&[...M.querySelectorAll('.dlg .opts > button')].find(x=>/^\s*Khiêu khích/.test(x.textContent));
   if(!b)return null;return {t:b.textContent.replace(/\s+/g," ").trim(),cls:b.className,dis:!!b.disabled,off:b.matches('.kitoff,.kfoc-off,[aria-disabled="true"]')||!!b.disabled}});
  const tabTo=async()=>{/* the act may sit in another group tab of the card: tap the tab that holds it */
   /* STALE-TESTS-8: the plaques drop in after the tap (kpk animation): wait for them first */for(let w=0;w<16&&!(await kbInfo());w++)await sleep(200);
   if(await kbInfo())return;
   const n=await p.evaluate(()=>document.querySelectorAll('.kfoc-tabs .pct').length);for(let j=0;j<n;j++){await rt.tap(`.kfoc-tabs .pct:nth-child(${j+1})`,{screen:'card',label:'tab'});await sleep(400);
    if(await kbInfo())return}};
  const setup=()=>p.evaluate(()=>{const L=liveRivals(false).filter(x=>!x.queen&&!sameHouse(S,x)&&!x.confined);/* STALE-TESTS-7: not above her rank (else the rank lock «phận dưới không dám khiêu khích bậc trên» closes the way, whatever the reason) */const v=L.find(x=>rkOf(x)<=rkOf(S))||L[0];if(rkOf(v)>rkOf(S))v.rank=S.rank;window.__tv=v;try{k61Meet(v,"thử",3)}catch(e){}/* she has met her (state) — a stranger's card asks «Chưa biết người này là ai» first */S.ro[v.id]=0;S.rl[v.id]=0;v.rel=0;v.oan=0;S.sung=Math.max(S.sung,v.sung);for(const f of liveRivals(true))if(f.ag)f.ag.vent={};return !!v});
  /* gateNo: no reason → inside the door the «Khiêu khích» way is closed with «chưa có cớ»; her real tap on it changes nothing */
  await fresh();await setup();{const o=await openRival();await tabTo();const K=await kbInfo();const r0=await p.evaluate(()=>[window.__tv.rel,S.ro[window.__tv.id]||0,(S.tp&&S.tp.n)||0]);
   /* the way itself (read only): inside the door «Khiêu khích» the way «Khiêu khích» is closed «chưa có cớ» */
   const way=await p.evaluate(()=>{const v=window.__tv;const P=curPeople().find(x=>x.ref===v&&x.kind==="rival");const d=P&&talkOpts(P).find(a=>a&&a.door&&a.m&&a.m.some(x=>x.tw==="provoke"));const w=d&&d.m.find(x=>x.tw==="provoke");return w?{lock:!!w.lock,t:w.t||"",doorLock:!!d.lock}:null});
   let door=false,RI=null,tapped=false;
   if(K&&/kfoc-off|kitoff/.test(K.cls)){/* every way of the door is closed (the other way has its own reason): the plaque is greyed; her real tap only pops a reason */tapped=await kbTap()}
   else{door=K?await doorOpenTap():false;RI=await rowInfo();tapped=RI?await rt.tap(ROW(),{screen:'door',label:'Khiêu khích (closed)'}):false}
   const B=RI?RI.t:(way?way.t:"");await sleep(900);
   const pop=await p.evaluate(()=>{const e=document.querySelector('#kpop');const r=e&&e.getBoundingClientRect();return e&&!e.hidden&&r.width>1&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none'?e.textContent.replace(/\s+/g," ").trim().slice(0,120):""});
   const r1=await p.evaluate(()=>[window.__tv.rel,S.ro[window.__tv.id]||0,(S.tp&&S.tp.n)||0]);
   await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
   await done('gateNo',{o,K,way,door,RI,B,tapped,pop,r0,r1,ok:!!K&&tapped&&!!way&&way.lock&&/chưa có cớ/.test(way.t)&&(RI?RI.off&&/chưa có cớ/.test(RI.t):!!pop)&&String(r0)===String(r1)})}
  /* gateYes: after a grudge the button is open; the data row names the reason «cớ: oán 45»; her real tap lands */
  await fresh();await setup();{await p.evaluate(()=>{S.ro[window.__tv.id]=45;/* one onlooker for sure: another consort's row of the ONE record puts her at her palace this khắc */const v=window.__tv,R=agRec(),kh=j95kh();const w=liveRivals(false).find(x=>x!==v&&!x.confined&&R&&R.P['v'+x.id]);if(w){R.P['v'+w.id][kh]=['home','visit','me','thử'];/* …and gone the next khắc: the deed (1 khắc) is judged by who stood there when it STARTED */if(R.P['v'+w.id].length>kh+1)R.P['v'+w.id][kh+1]=['tp_away','đi','','thử'];window.__tw=w}});const o=await openRival();await tabTo();
   const K=await kbInfo();const door=K?await doorOpenTap():false;const B=await rowInfo();/* the open way names its reason «cớ: oán 45» on its row */
   const pre=await p.evaluate(()=>{const v=window.__tv,R=agRec(),kh=j95kh(),pl=tpWhere(S);const at=R?Object.keys(R.P).filter(id=>R.P[id][kh]&&j95at(R.P[id][kh][0],pl)&&id!=="me"&&id!=="v"+v.id&&(id==="emp"||id==="th"||/^v\d+$/.test(id))):[];const at1=R?Object.keys(R.P).filter(id=>R.P[id][kh+1]&&j95at(R.P[id][kh+1][0],pl)):[];const atAll=R?Object.keys(R.P).filter(id=>R.P[id][kh]&&j95at(R.P[id][kh][0],pl)):[];return {rel:v.rel,at,at1,atAll,kh,pl,n:(S.tp&&S.tp.n)||0}});
   const tapped=B&&!B.off?await rt.choose(ROW(),{screen:'door',label:'Khiêu khích'}):false;await sleep(1500);
   /* the act opens its mini-game (KIT focus play): she takes «Bỏ qua · kết quả thường» with a real tap, as a player may */
   const skips=[];for(let k=0;k<6;k++){const h=await p.evaluateHandle(()=>[...document.querySelectorAll('.kfoc-skip,button')].find(b=>/^\s*Bỏ qua/.test(b.textContent)&&b.getBoundingClientRect().width>1)||null);const el=h.asElement();if(!el)break;
    skips.push(await rt.tap(el,{screen:'play',label:'Bỏ qua'}));await sleep(1500)}
   /* a follow-up screen of the act (result / confirm) is read, not tapped through: the act has landed on the tap */
   const post=await p.evaluate(()=>{const v=window.__tv,q=(S.tp&&S.tp.q)||[];const it=q[q.length-1];const L=(S.logs||[]).slice(0,6).join(" ").replace(/<[^>]+>/g,"");return {rel:v.rel,it:it&&{d:it.d,x:it.x,v:it.v,j:Object.keys(it.j)},log:/Người chứng kiến/.test(L),logs:L.slice(0,300)}});
   /* every eye-witness the record put there judged it; the doer and the victim never judge it (later hearsay judges may add on) */const sameSet=!!post.it&&pre.at.length>0&&pre.at.every(id=>post.it.j.includes(id))&&!post.it.j.includes('me')&&!post.it.j.includes('v'+post.it.v);
   await done('gateYes',{o,B:B&&B.t,K,door,tapped,skips,pre,post,ok:!!B&&/cớ: oán 45/.test(B.t)&&tapped&&post.rel<pre.rel&&!!post.it&&post.it.d==="provoke"&&sameSet&&post.log})}
  /* eaHook: an outburst lands in the rule as an outburst; the consorts that stand at her place judge it */
  await fresh();{const r=await p.evaluate(()=>{const v=liveRivals(true)[0];const R=agRec(),kh=j95kh();const pl=tpWhere(S);if(R&&R.P["v"+v.id])R.P["v"+v.id][kh]=[pl,"visit","me","thử"];
    const a0=v.rel;const row=EA_REACT.find(x=>x.k==="mang"&&x.who==="c");const o=window.eaDo(S,row);const q=S.tp.q,it=q[q.length-1];return {o:!!o,it:it&&{d:it.d,o:it.o,j:Object.keys(it.j)},seen:it&&!!it.j["v"+v.id],a0,a1:v.rel,rec:!!R}});
   await done('eaHook',Object.assign(r,{ok:r.o&&r.it&&r.it.d==="mang"&&r.it.o===1&&(r.rec?r.seen:true)}))}
  /* math on one onlooker */
  await fresh();{const r=await p.evaluate(()=>{const P=BAL.tp;const [X,O]=liveRivals(false).filter(x=>!x.queen);const it=d=>({id:999,x:String(X.id),v:null,d,o:1,wk:wk(),j:{}});
    const run=(d,how,setup)=>{S.tp=null;const s0={r:O.rl[X.id]||0};O.rl[X.id]=0;/* STALE-TESTS-7: each run starts with a clean oán-pace store too (joanpace (b') ghét: O.opa = one bounded step per cause per buổi + day cap) — else run 2.. land inside run 1's spent buổi cap */O.opa={};delete O.agw;O.trong=setup.tr||["Cần","Trí"];if(setup.close)O.rl[X.id]=netTh(O,"than");const b=O.rl[X.id];
     const m0=window.memList;if(setup.kind)window.memList=(h,a)=>h===O&&a===X?[{s:1,w:wk(),n:1,g:20}]:m0(h,a);const m1=window.moodCauseKnownBy;if(setup.reason)window.moodCauseKnownBy=()=>"thử";
     S.tp=null;tpS().r={};const st=tpS();let v=0;for(let i=0;i<10;i++){v+=tpJudge(O,Object.assign(it(d),{id:999+i}),how)}window.memList=m0;window.moodCauseKnownBy=m1;const out=O.rl[X.id]-b;O.rl[X.id]=s0.r;return out};
    const base=run("mang","eye",{}),nhan=run("mang","eye",{tr:["Nhân","Trí"]}),kind=run("mang","eye",{kind:1}),rs=run("mang","eye",{reason:1}),hear=run("mang","hear",{}),ap=run("pham","eye",{tr:["Tín","Cần"],reason:1}),apNo=run("pham","eye",{tr:["Tín","Cần"]});
    /* Thái hậu cap: 30 harsh deeds by her in a year cost at most cap.th */
    S.tp=null;const th0=S.th;const itS=k=>({id:5000+k,x:"me",v:null,d:"danh",o:1,wk:wk(),j:{}});for(let k=0;k<30;k++)tpJudge("th",itS(k),"eye");const thLoss=th0-S.th;
    return {base,nhan,kind,rs,hear,ap,apNo,thLoss,cap:P.cap.th,
     ok:nhan<base&&kind>base&&rs>base&&hear>base&&base<0&&ap>0&&apNo===0&&thLoss<=P.cap.th&&thLoss>0}});
   await done('math',r)}
  /* label: 3 outbursts + 3 kind deeds seen by one consort → «Khẩu xà tâm Phật» on her card (real tap opens it) */
  await fresh();await setup();{const r=await p.evaluate(()=>{const v=window.__tv;S.tp=null;const m0=window.memList;window.__m0=m0;window.memList=(h,a)=>h===v&&a===S?[{s:1,w:wk(),n:3,g:20}]:m0(h,a);
    for(let i=0;i<3;i++)tpJudge(v,{id:700+i,x:"me",v:null,d:"mang",o:1,wk:wk(),j:{}},"eye");return {lab:tpLabOf(v)}});
   /* the player's road to a consort's facts: «Hậu cung» (bottom bar) → tap her row → the person card with the «Tính nết» row; every step a real tap, the label must be VISIBLE */
   const VIS=`(re)=>[...document.querySelectorAll('button,[data-o],[data-see],[data-pc],[data-p],.kbtn,.row,li,a,figure,.kport,.kpc')].filter(e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2||r.bottom<0||r.top>innerHeight)return false;const t=document.elementFromPoint(Math.min(innerWidth-1,Math.max(0,r.x+r.width/2)),Math.min(innerHeight-1,Math.max(0,r.y+r.height/2)));return (t===e||e.contains(t))&&re.test(e.textContent)}).sort((x,y)=>x.textContent.length-y.textContent.length)[0]||null`;
   const tapTxt=async(src,label)=>{const h=await p.evaluateHandle(`(${VIS})(${src})`);const el=h.asElement();if(!el)return false;const ok=await rt.tap(el,{screen:'nav',label});await sleep(1200);return ok};
   await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});const rx=await ringX();const steps=[];steps.push(await tapTxt('/^\\s*Hậu cung\\s*$/','Hậu cung'));steps.push(await tapTxt('/^\\s*Phi tần\\s*$/','Phi tần'));
   const nm=await p.evaluate(()=>window.__tv.name.split(/\s+/).slice(-2).join(' '));/* the portrait row captions the given name *//* a long row pages with ‹ › (iPad): she taps › until the portrait is in view */
   let got=false;for(let k=0;k<12&&!got;k++){const h=await p.evaluateHandle(`(${VIS})(new RegExp(${JSON.stringify(nm)}))`);if(h.asElement()){got=true;break}if(!await tapTxt('/^\\s*[›>❯]\\s*$/','›'))break}
   steps.push(await tapTxt(`new RegExp(${JSON.stringify(nm)})`,nm));
   const txt=await p.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(/Khẩu xà tâm Phật/.test(n.nodeValue)){const r=n.parentElement.getBoundingClientRect();if(r.width>1&&r.bottom>0&&r.top<innerHeight)return true}}return false});
   const o={tap:steps.every(Boolean),steps,rx};
   await p.evaluate(()=>{window.memList=window.__m0});await done('label',{lab:r.lab,tap:o.tap,steps:o.steps,txt,ok:r.lab==="good"&&o.tap&&txt})}
  /* npcMood */
  await fresh();{const r=await p.evaluate(()=>{/* a pair whose motive is short of the gate at oán 25 without mood (no scheming trait, same side): the mood term alone must open it */const L=liveRivals(false).filter(x=>!x.queen);let a=null,t=null,g0=null;for(const x of L){for(const y of L){if(x===y)continue;x.rl[y.id]=0;x.ro[y.id]=25;x.emo=null;const g=motiveOK(x,y,"provoke");if(!g.ok&&/động cơ yếu/.test(g.why)){a=x;t=y;g0=g;break}}if(a)break}if(!a)return {ok:false,why:"no pair"};
    a.emo={k:"gian",v:95,why:"thử",w:wk()};try{mkAdd(a,{kd:"tptest",k:"gian",s:95,why:"thử"},20)}catch(e){}const st=typeof feelSums==="function";const md=tpMoodM(a);const g1=motiveOK(a,t,"provoke");return {g0:g0.ok,g1:g1.ok,why:g1.why,md,
     ok:md===BAL.tp.moodM&&!g0.ok&&g1.ok&&/bức bối/.test(g1.why)}});await done('npcMood',r)}
  /* oldsave */
  await fresh();{const r=await p.evaluate(()=>{delete S.tp;const sv=JSON.stringify(S);S=JSON.parse(sv);delete S.tp;let e="";try{tpTick();tpDeed(S,"mang",null,{what:"thử"})}catch(x){e=String(x)}return {e,ok:!e&&!!S.tp}});await done('oldsave',r)}
  res.errs=errs;res.dead=rt.stats();if(errs.length)bad++;R[wh]=res}
 fs.writeFileSync(`${OUT}/temper-perception.json`,JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1).slice(0,6000));console.log(bad?`FAIL ${bad}`:"PASS");await b.close();process.exit(bad?1:0)})();
