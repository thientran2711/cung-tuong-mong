/* review/reign-end test: HẾT MỘT TRIỀU (jreignend.js) — nhường ngôi / phế / lật đổ.
   usage: node dev/test/reignend.js <url|file> [WxH] [shot-prefix]
   Checks (exit 1 on a failure): the three cards build (3 roads each, kit act-card rows, no % / digits-with-%, outcomes hidden by the kit);
   every road moves the case the way it says (block lowers / help raises, the stand-aside road is gain-only); each end (abd / phe / coup) answers
   mortEmpDue → emperorDies, the end words carry the cause and never «băng hà», nobody is buried with a living Emperor; with her son as heir the
   j99succ card shows the cause title + words; a natural death still says «băng hà»; co-op = off; an old save (no S.re) loads and runs a month. */
const {chromium}=require('playwright');const path=require('path');
const [,,URL0,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.reDbg,null,{timeout:120000});await p.waitForTimeout(1500);
 const fresh=()=>p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<60;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true;try{kmReset()}catch(e){}const dw=$("dawn");if(dw){dw.classList.remove("on","kbkdawn");dw.hidden=true;document.body.classList.remove("kbk-open")}
  /* a court with a strong Hộ bộ house, a son of one of its consorts, a grown heir */
  S.year=S.reign.y0+12;S.emp.age=34;const T=trS();T.H["Hộ bộ"].pow=80;T.bien=30;T.kho=30;
  const v=liveRivals(false)[0];v.clan="Hộ bộ";try{if(typeof clanOf==="function"&&clanOf(v)!=="Hộ bộ"){v.fam="Hộ bộ";v.house="Hộ bộ"}}catch(e){}v.sung=70;const k=mkKid("m",16);k.name="Hoàng tử Minh";(v.kids=v.kids||[]).push(k);
  return {house:tdHouse(v),kids:allKids().length}});
 await p.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 const fails=[];const ok=(c,m)=>{if(!c)fails.push(m)};
 const shot=async n=>{if(SHOT){await p.waitForTimeout(500);await p.screenshot({path:`${SHOT}-${W}x${H}-${n}.png`})}};
 let r=await fresh();console.log('setup',JSON.stringify(r));
 /* 1. the three cards */
 for(const k of ['abd','phe','coup']){await fresh();
  r=await p.evaluate(k=>{Q.length=0;const c=k==='abd'?null:'Hộ bộ';try{kmReset();const dt=document.getElementById('kdaytc');if(dt)dt.remove()}catch(e){}const okc=reDbg.card(k,c);showModal();const m=Q[0];const md=document.getElementById('modal');
   if(md.hidden){md.className='modal';showModal()}const txt=md.innerText;return{okc,t:m&&m.t,n:m&&m.opts.length,names:m?m.opts.map(o=>o.n):[],pct:/%/.test(txt),open:!md.hidden,ov:[Q.length,md.className,md.hidden,kmFree(),[...document.querySelectorAll("body>*")].filter(e=>!e.hidden&&getComputedStyle(e).display!=="none").map(e=>e.id).join(",")],lines:m?m.opts.map(o=>o.j67):[],art:!!(m&&m.headArt)}},k);
  console.log('card',k,JSON.stringify(r));ok(r.okc&&r.n===3&&r.open,`card ${k} builds with 3 roads`);ok(!r.pct,`card ${k}: no %`);ok(r.lines.every(x=>x&&/được|tốn/.test(x)),`card ${k}: every road shows tốn/được`);
  await shot('card-'+k);
  /* each road */
  for(let i=0;i<3;i++){const q=await p.evaluate(([k,i])=>{Q.length=0;const c=k==='abd'?null:'Hộ bộ';S.re.a=60;const f=reDbg.F('Hộ bộ');f.her=0;f.ev=5;f.pl=2;reDbg.card(k,c);
    const a0=S.re.a,h0=f.her,s0={sung:S.sung,danh:S.danh,duc:S.duc,bac:S.bac};S.bac=Math.max(S.bac,200);const A=[];const ap0=apply;apply=function(o){A.push(o);return ap0.apply(this,arguments)};try{chooseM(i)}finally{apply=ap0}return{da:S.re.a-a0,dh:f.her-h0,dsung:S.sung-s0.sung,dduc:S.duc-s0.duc,ducAsk:A.some(o=>o&&o.duc>0)}},[k,i]);
   console.log(' road',k,i,JSON.stringify(q));
   /* roads in tier order: 0 Nhẹ giữ mình · 1 block · 2 help */
   if(k==='abd')ok(i===1?q.da<0:i===2?q.da>0:q.da===0,`abd road ${i} moves the pressure`);else ok(i===1?q.dh<0:i>=2?q.dh>0:q.dh===0,`${k} road ${i} moves the odds`);
   if(i===0)ok(q.ducAsk,`${k} stand-aside road gains Đức`)}
  await p.evaluate(()=>{Q.length=0;$("modal").hidden=true;$("modal").className='modal';for(const id of ['ov','kres','kresult']){const e=document.getElementById(id);if(e)e.hidden=true}})}
 /* 1b. tiers (law 2, OD 27/11 ~00:46Z): Nhẹ costs nothing; a Vừa road costs t2 and gains t2; the Nặng road costs Bạc and gains more; NPC roads move a case exactly like hers */
 await fresh();
 r=await p.evaluate(()=>{const P=BAL.re.her,out={};for(const k of ['abd','phe','coup'])out[k]=[0,-1,1].map(s=>reDbg.roadFx(k,s,S));
  const v=liveRivals(false).find(x=>x.clan==='Hộ bộ');const f=reDbg.F('Hộ bộ');f.her=0;const h0=f.her;v.bac=500;const b0=v.bac;reDbg.road(v,'phe','Hộ bộ',1);const npc={dh:f.her-h0,bac:v.bac-b0,hp:f.hp.length};
  f.her=0;reDbg.road(S,'phe','Hộ bộ',1);const her={dh:f.her};S.re=S.re||{a:0,F:{},seen:{},her:0};S.re.a=60;const w=liveRivals(false).find(x=>x!==v)||v;const a0=S.re.a;reDbg.road(w,'abd',null,-1);npc.da=S.re.a-a0;
  const n=reDbg.npcRoads('phe','Hộ bộ');Q.length=0;
  /* law 2: the Bạc help has a matching stat road with the same result; an NPC without Bạc takes it */
  const m={b:reDbg.roadFx('phe',1,S),s:reDbg.roadFx('phe',2,S)};v.bac=0;const sung0=v.sung,bac0=v.bac;f.her=0;f.pm=0;reDbg.npcRoads('phe','Hộ bộ');m.npcBac=v.bac-bac0;m.npcDh=f.her;Q.length=0;
  /* ONE Nặng help road on her card: Bạc when she has it, else Sủng */
  const sb=S.bac;m.card=[];for(const b of [0,500]){S.bac=b;Q.length=0;reDbg.card('phe','Hộ bộ');const o=Q[0]&&Q[0].opts||[];m.card.push({n:o.length,fx:o[2]&&o[2].fx});Q.length=0}S.bac=sb;
  return{out,npc,her,n,P,m}});
 console.log('tiers/npc',JSON.stringify(r).slice(0,600));
 for(const k of ['abd','phe','coup']){const [a,b,c]=r.out[k];ok(a.tier===1&&!Object.keys(a.cost).length,`${k}: Nhẹ road costs nothing`);
  const sz=x=>Math.max(0,...Object.values(x).map(Math.abs));ok(sz(b.cost)===sz(b.gain),`${k}: Vừa block costs = gains`);ok(c.tier>=b.tier&&(c.tier===2?sz(c.cost)===sz(c.gain):sz(c.gain)>sz(b.gain)),`${k}: help road tier: cost and result rise together`)}
 ok(r.npc.dh===r.her.dh&&r.npc.dh>0,'NPC help moves the odds exactly like hers');ok(r.npc.bac===-r.P.t3.bac,'NPC pays the same Bạc');ok(r.npc.da===-r.P.blk,'NPC block moves the abdication pressure like hers');ok(r.n>=1,'NPC consorts with a stake take a road when a case opens');
 ok(r.m.s.tier===3&&!r.m.s.cost.bac&&JSON.stringify(r.m.s.gain)===JSON.stringify(r.m.b.gain),'Nặng Bạc road has a matching stat road with the same result');ok(r.m.npcBac===0&&r.m.npcDh>0,'an NPC without Bạc helps through the stat road');
 ok(r.m.card.every(x=>x.n===3)&&r.m.card[0].fx&&!r.m.card[0].fx.bac&&r.m.card[0].fx.sung<0&&r.m.card[1].fx.bac<0,'her card: ONE Nặng help road, Sủng without Bạc, Bạc when she has it');
 /* 2. each end through the real month (mortEmpDue → emperorDies) */
 for(const k of ['abd','phe','coup']){await fresh();
  r=await p.evaluate(k=>{let got=null;const o0=over;over=function(h,t,f,a){got={h,t:String(t).replace(/<[^>]+>/g,''),f,a};return o0.apply(this,arguments)};
   S.rank=Math.min(S.rank,3);S.heir=null;/* her: no son → her fate path (Thái phi / xuất gia …) */
   const T=trS();if(k==='abd'){S.re=S.re||{a:0,F:{},seen:{},her:0};S.re.a=99.9;S.re.seen.abd=1;T.H["Hộ bộ"].pow=40}
   if(k==='phe'){T.H["Hộ bộ"].pow=90;const f=reDbg.F('Hộ bộ');f.ev=8;f.pm=BAL.re.phe.mo-1;f.her=200;BAL.re.coup.pow=200}
   if(k==='coup'){T.H["Hộ bộ"].pow=95;const f=reDbg.F('Hộ bộ');f.pl=BAL.re.coup.mo-1;f.her=200;BAL.re.coup.pow=68}
   if(S.mort){S.mort.empDue=null;S.emp.tho=200}
   const hi0=BAL.odds.hi;BAL.odds.hi=100;/* the vote / strike odds are capped below sure: make the forced end deterministic for the test */
   let n=0;while(!got&&n<3){try{monthTick()}catch(e){BAL.odds.hi=hi0;return{err:String(e)}}n++;Q=Q.filter(m=>/^succ/.test(m.pid||''))}
   BAL.odds.hi=hi0;over=o0;BAL.re.coup.pow=68;return{got,end:S.re&&S.re.end,n}},k);
  console.log('end',k,JSON.stringify(r).slice(0,400));
  ok(r.got&&r.end&&r.end.k===k,`end ${k} fires`);
  if(r.got){ok(!/băng hà/.test(r.got.t),`end ${k}: no «băng hà» in «${r.got.t.slice(0,90)}»`);ok(!/tuẫn táng|suối vàng/.test(r.got.t),`end ${k}: no tuẫn táng`);
   ok(k==='abd'?/nhường ngôi/.test(r.got.t):k==='phe'?/phế/.test(r.got.t):/lật đổ/.test(r.got.t),`end ${k}: cause words`)}
  await p.waitForTimeout(600);await shot('end-'+k)}
 /* 3. her son is the heir: the j99succ card carries the cause */
 await fresh();
 r=await p.evaluate(()=>{Q.length=0;S.rank=7;const k=mkKid("m",15);k.name="Hoàng tử Khang";S.kids.push(k);S.heir={k,v:null};S.re=S.re||{a:0,F:{},seen:{},her:0};S.re.a=99.9;S.re.seen.abd=1;
  if(S.mort){S.mort.empDue=null;S.emp.tho=200}let n=0;while(!(S.succ&&S.succ.on)&&n<3&&!S.dead){monthTick();n++}showModal();const m=Q[0];return{on:!!(S.succ&&S.succ.on),t:m&&m.t,h:m&&String(m.h).replace(/<[^>]+>/g,'').slice(0,200),art:m&&m.headArt}});
 console.log('succ',JSON.stringify(r));ok(r.on&&r.t==='Hoàng thượng nhường ngôi',`succession card title (${r.t})`);ok(r.h&&!/băng hà/.test(r.h)&&/nhường ngôi/.test(r.h),'succession card words');
 await shot('succ-abd');
 /* 4. a natural death still says băng hà */
 await fresh();
 r=await p.evaluate(()=>{let got=null;const o0=over;over=function(h,t){got=String(t).replace(/<[^>]+>/g,'');return o0.apply(this,arguments)};S.rank=2;S.heir=null;S.mort=S.mort||{};S.mort.empDue="Ngài trúng phong";BAL.re.on=0;try{monthTick()}finally{BAL.re.on=1;over=o0}return got});
 console.log('natural',r&&r.slice(0,120));ok(r&&/băng hà/.test(r),'natural death keeps «băng hà»');
 /* 5. co-op off; old save loads */
 await fresh();
 r=await p.evaluate(()=>{window.COOPW=window.COOPW||{};const on0=COOPW.on;COOPW.on=true;S.re={a:99.9,F:{},seen:{abd:1},her:0};const x=reDbg.reMonth();COOPW.on=on0;
  delete S.re;let err=null;try{const s=ser();deser(s);monthTick();Q.length=0}catch(e){err=String(e)}return{coop:x,err,re:!!S.re}});
 console.log('coop/old',JSON.stringify(r));ok(r.coop===false,'co-op: no reign end');ok(!r.err,'old save loads + month: '+r.err);
 ok(!errs.length,'page errors: '+errs.slice(0,3).join(' | '));
 console.log(fails.length?'FAIL\n- '+fails.join('\n- '):'PASS');await b.close();process.exit(fails.length?1:0)})();
