/* review/reign-road test: Tân quân lập uy (Emperor's side story + faction road) and the Tâm nguyện lines.
   usage: NODE_PATH=$(npm root -g) node dev/test/reign.js <url|file> [WxH] [shot-prefix]
   Checks (exit 1 on a failure): every beat builds for every side with no error; every Bạc option has a non-Bạc road in the same dialog;
   dialog title "Phụ tuyến · Tân quân lập uy · Chương c · Hồi i/n"; the kit hides outcomes (data-khide); joining / switching sides; the
   Mệnh truyện › Triều cục and › Tâm nguyện panes (kit parts only, no horizontal overflow); the outcome per power band; a pending beat
   survives save/load (serQ/deserQ); old saves (no S.ps) get nothing; a co-op guest never moves the court clock. */
const {chromium}=require('playwright');const path=require('path');
const [,,URL0,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof rgMonth==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv())&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true});
 await p.waitForTimeout(800);await p.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 const fails=[];const ok=(c,m)=>{if(!c)fails.push(m)};
 const clear=()=>p.evaluate(()=>{const md=document.getElementById('modal');md.hidden=true;md.className='modal';Q.length=0});
 const shot=async n=>{if(SHOT){await p.waitForTimeout(400);await p.screenshot({path:`${SHOT}-${W}x${H}-${n}.png`})}};
 /* 1. static audit: every beat × side builds; Bạc options have a sibling road without Bạc */
 let r=await p.evaluate(()=>{const out={n:0,bad:[],bac:0,bacAlt:0,noAlt:[]};const ids=Object.keys(RGBT).concat(['emp:e1','emp:e2','emp:e3','th:e1','th:e2','th:e3','quyen:e1','quyen:e2','quyen:e3']);
  const W=rgW();for(const side of [null,'ngoai','emp','th','quyen'])for(const o of ['emp','th','quyen']){S.reign.side=side;W.out=o;
   for(const id of ids){let d=null;try{d=PEND.rg({b:id})}catch(e){out.bad.push(id+':'+e.message)}if(!d){continue}out.n++;
    const O=d.o;for(const x of O){if(x.fx&&x.fx.bac){out.bac++;const alt=O.some(y=>y!==x&&!(y.fx&&y.fx.bac)&&(y.fx&&y.fx.suc||/Liều|Khó|Năm ăn|chắc|Chắc/.test(y.j67))&&!/từ chối|Từ chối|không dám|Không dám|Thôi|Lui|Cáo bệnh|Lấy cớ/.test(y.n));if(alt)out.bacAlt++;else out.noAlt.push(id+'/'+side+':'+x.n)}}
    if(/[{}]/.test(d.t+O.map(x=>x.n+x.j67).join('')))out.bad.push(id+': token left')}}
  S.reign.side=null;W.out='';return out});
 console.log('audit',JSON.stringify(r));ok(!r.bad.length,'beats build: '+r.bad.join('; '));ok(!r.noAlt.length,'Bạc without a non-Bạc road: '+r.noAlt.slice(0,5).join('; '));
 /* 2. the side choice dialog (Chương 2) */
 await clear();
 r=await p.evaluate(()=>{rgW().ch=2;S.reign.done.c1a=1;S.reign.done.c1b=1;const id=rgNext();rgFire(id);showModal();const m=Q[0];
  const btn=[...document.querySelectorAll('#modal .opts button')];return{id,t:m.t,n:m.opts.length,names:m.opts.map(o=>o.n),hide:btn.filter(x=>x.dataset.khide==='1').length,faces:!!m.faces,
   ovf:document.documentElement.scrollWidth>innerWidth+1}});
 console.log('c2a',JSON.stringify(r));ok(r.id==='c2a','next beat is c2a');ok(/^Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1\/1$/.test(r.t),'title '+r.t);ok(r.n===4,'4 options');ok(r.hide>=3,'kit hides outcomes');ok(!r.ovf,'no overflow (dialog)');
 await shot('c2a');
 r=await p.evaluate(()=>{const s0=serQ();const L=deserQ(s0);return{n:L.length,ok:L[0]&&L[0].pid==='rg'&&L[0].opts.length===Q[0].opts.length}});ok(r.ok,'pending beat survives save/load');
 r=await p.evaluate(()=>{const i=Q[0].opts.findIndex(o=>o.rgS==='emp');chooseM(i);Q.length=0;return{side:S.reign.side,tr:S.reign.tr,mem:rgMembers('emp').length+rgMembers('th').length+rgMembers('quyen').length}});
 console.log('join',JSON.stringify(r));ok(r.side==='emp','joined emp');ok(r.tr>0,'trust set');
 /* 3. Triều cục pane */
 await clear();
 r=await p.evaluate(()=>{tab='story';KTSUB.story='rg';render();const P=document.getElementById('panel');const t=P.innerText;
  return{has:/Tân quân lập uy/i.test(t)&&/phe của (ngươi|ta)/i.test(t)&&/phe hoàng thượng/i.test(t),sub:[...P.querySelectorAll('[data-ktsv]')].map(x=>x.dataset.ktsv).join(','),btn:!!P.querySelector('[data-rgsw]'),
   ovf:P.scrollWidth>P.clientWidth+1||document.documentElement.scrollWidth>innerWidth+1,own:[...P.querySelectorAll('[style]')].length}});
 console.log('pane',JSON.stringify(r));ok(r.has,'Triều cục pane text');ok(/rg,rgl/.test(r.sub),'sub-tabs Triều cục + Tâm nguyện');ok(r.btn,'Đổi phe button');ok(!r.ovf,'no overflow (pane)');
 await shot('pane');
 /* 4. switch side */
 r=await p.evaluate(()=>{S.reign.sideT=S.turn-99;rgSwitchOpen();const m=Q[0];const i=m.opts.findIndex(o=>/Thái hậu/.test(o.n));const d0=S.danh;chooseM(i);Q.length=0;return{side:S.reign.side,sw:S.reign.sw,dd:S.danh-d0,why:rgCanSwitch()}});
 console.log('switch',JSON.stringify(r));ok(r.side==='th'&&r.sw===1,'switched to th');ok(r.dd<0,'switch costs Danh');ok(!!r.why,'cooldown after a switch');
 /* 5. Tâm nguyện pane */
 r=await p.evaluate(()=>{KTSUB.story='rgl';render();const P=document.getElementById('panel');return{t:P.innerText.slice(0,2000),rows:(P.innerText.match(/bước 1\/3|đã thành|không còn/gi)||[]).length,kpl:P.querySelectorAll('.ktprow .kpl').length,ovf:P.scrollWidth>P.clientWidth+1}});
 ok(r.rows>=5,'Tâm nguyện lists the people ('+r.rows+')');ok(r.kpl>=5,'Tâm nguyện people are kit person lines ('+r.kpl+')');ok(!r.ovf,'no overflow (Tâm nguyện)');await shot('goal');
 /* 6. a line offer is a real j72 offer from its person */
 await clear();
 r=await p.evaluate(()=>{S.rgL={};const x=rgLNext();if(!x)return{none:1};q72Offer(x,'');showModal();const m=Q[0];return{t:m.t,h:plain(m.h).slice(0,120),tid:x.tid}});
 console.log('line',JSON.stringify(r));ok(r.tid&&/^rgl_/.test(r.tid),'line offer made');await shot('line');
 r=await p.evaluate(()=>{chooseM(0);Q.length=0;const q=q72();return{act:q.a.map(x=>x.tid).join(',')}});ok(/rgl_/.test(r.act),'line quest accepted');
 /* 7. outcome bands + her result */
 r=await p.evaluate(()=>{const res=[];for(const [pw,side] of [[75,'emp'],[52,'th'],[30,'quyen'],[30,'emp']]){const W=rgW();W.out='';W.p=pw;W.ch=6;S.reign.res='';S.reign.side=side;rgDecide();const before={sung:S.sung,th:S.th,bac:S.bac,rank:S.rank};const t=rgMine();
   res.push({pw,side,out:W.out,res:S.reign.res,t,d:{sung:S.sung-before.sung,th:S.th-before.th,bac:S.bac-before.bac,rank:S.rank-before.rank}})}return res});
 console.log('outcome',JSON.stringify(r));ok(r[0].out==='emp'&&r[0].res==='win','p 75 → thân chính, emp side wins');ok(r[1].out==='th'&&r[1].res==='win','p 52 → rèm châu');ok(r[2].out==='quyen'&&r[2].res==='win','p 30 → nhiếp chính');ok(r[3].res==='lose','emp side loses at p 30');ok((r[0].d.rank===1&&/không qua khảo hạch/.test(r[0].t))||/Ân chỉ chờ phong/.test(r[0].t)||(r[0].d.rank===0&&/ban thưởng hậu hĩnh/.test(r[0].t)),'emp win = direct rank +1, no exam (owner 16/11 06:20Z: long-road reward skips the exam)');
 r=await p.evaluate(()=>{const W=rgW();W.out='';W.p=75;S.reign.res='';S.reign.side='emp';S.sung=Math.max(S.sung,95);if(S.rank>=BAL.rg.rankCap)S.rank=2;const rk0=S.rank;rgDecide();const tm=rgMine();const e=S.ex||{};const g=S.rank===rk0+1&&!(e.grace===S.rank+1)&&!e.w1&&!deck.some(x=>x&&x.exam)&&/(tấn phong .* làm .*không qua khảo hạch|Ân chỉ chờ phong)/.test(tm);const t0=S.turn;S.empDead=1;const on=rgOn();S.empDead=0;S.succ={on:1};const on2=rgOn();S.succ=null;return{g,on,on2}});
 console.log('exam/emp-dead',JSON.stringify(r));ok(r.g,'emp win = direct rank +1, no exam (owner 16/11 06:20Z)');ok(!r.on&&!r.on2,'the road stops once the Emperor is dead / succession epilogue');
 r=await p.evaluate(()=>{Q.length=0;const W=rgW();W.out='emp';S.reign.side='emp';S.reign.done={};for(const c of RGC)for(const id of c.b)if(id!=='c6b')S.reign.done[id]=1;const id=rgNext();rgFire(id);showModal();return{id,t:Q[0].t}});
 ok(r.id==='c6b','after the outcome the last beat comes');await shot('c6b');
 /* 8. co-op guest never moves the court clock; old saves get nothing */
 r=await p.evaluate(()=>{Q.length=0;const W=rgW();W.out='';W.ch=1;const p0=W.p,c0=W.ch;window.COOPW=window.COOPW||{};const on=COOPW.on,seat=COOPW.seat;COOPW.on=true;COOPW.seat='b';
  S.turn+=20;rgMonth();const g={p:W.p,ch:W.ch};COOPW.on=on;COOPW.seat=seat;S.turn-=20;
  const ps=S.ps;S.ps=0;tab='story';KTSUB.story='now';render();const sub=[...document.querySelectorAll('#panel [data-ktsv]')].map(x=>x.dataset.ktsv).join(',');const q0=Q.length;rgMonth();const q1=Q.length;S.ps=ps;
  return{guestMoved:g.p!==p0||g.ch!==c0,oldSub:sub,oldFired:q1-q0}});
 console.log('coop/old',JSON.stringify(r));ok(!r.guestMoved,'co-op guest does not move the court');ok(!/rg/.test(r.oldSub),'old save: no Triều cục tab');ok(r.oldFired===0,'old save: no beat');
 /* 9. every Tâm nguyện line can be made from its person and runs to the end (each step closed ok → the chain queues the next) */
 r=await p.evaluate(()=>{Q.length=0;const out={};if(typeof qOn==='function'&&!qOn()){out.hh='no queen'}
  for(const k in RGL){S.rgL={};const q=q72();q.a=[];q.ch=[];const res=[];if(!rgLOk(k)){out[k]='n/a';continue}
   for(let i=0;i<3;i++){const T=T72I[RGL[k].q[i]];const A=rgLA(k);const x=A&&q72Make(T,A);if(!x){res.push('make'+i);break}q.a.push(x);
    const st=T.s[0];const why=st&&!st.w&&!st.ch?q72Why(x,q72X(x),st,null):'';q72End(x,'ok',q72X(x));res.push(i<2?(q.ch.some(c=>c.tid===RGL[k].q[i+1])?'ch':'noch'):'end');q.ch=[]}
   out[k]=res.join(',')+(S.rgL[k]&&S.rgL[k].done?' done':'')}
  return out});
 console.log('lines',JSON.stringify(r));for(const k in r)ok(r[k]==='ch,ch,end done'||r[k]==='n/a'||r[k]==='no queen','line '+k+': '+r[k]);
 ok(!errs.length,'page errors: '+errs.join(' | '));
 console.log(fails.length?'FAIL\n - '+fails.join('\n - '):'PASS',`(${W}x${H})`);await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
