/* review/illness-cure (MAIN 182, Foreman E 23:36Z, robot R2-greedy-5 b1096): every illness has a cure road, tiered nhẹ · vừa · nặng, with an honest danger line.
   node dev/test/illness-cure.test.js [outdir]   (after dev/site/build_site.sh; shots go to outdir, never git). exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'/tmp/illness-cure';fs.mkdirSync(OUT,{recursive:true});
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}else console.log('ok  ',m)};
const boot=async p=>{await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}})};
const card=p=>p.evaluate(()=>{const m=document.querySelector('#modal');return m&&!m.hidden?m.innerText.replace(/\n+/g,' | '):''});
(async()=>{const b=await chromium.launch();
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await boot(p);
  /* (1) the robot case: Lao phổi · nặng, Sức high; her status chip → the illness card with 3 cure tiers + the danger line (never a bare «Lui») */
  await p.evaluate(()=>{S.ill={k:"lao",st:2,known:true};S.suc=93;S.bac=Math.max(S.bac,60);S.sung=Math.max(S.sung,20);Q.length=0;render()});await p.waitForTimeout(700);
  const chip=await p.evaluate(()=>{const b=document.querySelector('#hud2 [data-hx="ill"]');if(!b)return false;b.click();return true});await p.waitForTimeout(900);
  let t=await card(p);const BAL_CAP2=await p.evaluate(()=>BAL.illCure.sucCap[2]);
  ok(chip,`${name} status chip «Lao phổi · nặng» present`);
  ok(/Bắt mạch, chữa bệnh/.test(t)&&/· nhẹ/.test(t)&&/· vừa/.test(t)&&/· nặng/.test(t),`${name} chip opens the tier card nhẹ·vừa·nặng: ${t.slice(0,260)}`);
  ok(/Lao phổi · nặng\./.test(t)&&/không qua khỏi: khả năng/.test(t)&&new RegExp('Sức tối đa chỉ '+BAL_CAP2).test(t),`${name} card shows the honest danger line in words + the Sức cap`);
  ok(!/\d+ ?%/.test(t),`${name} no % on the card (law 7)`);
  ok(/Tĩnh dưỡng · nhẹ|Tự bốc thuốc · nhẹ/.test(t)&&/Sang Thái y viện xin thuốc · vừa/.test(t)&&/Truyền thái y · nặng/.test(t)&&/Cầu xin ngự y · nặng/.test(t),`${name} every tier is a CURE road (no pulse-only road while ill)`);
  await p.screenshot({path:`${OUT}/${name}-1-ill-card.png`});
  /* the flipped back of the nặng card: Tốn / Được (law 3) + an odds word (law 7) */
  const nk=p.locator('#modal button.ka',{hasText:'· nặng'}).first();const flipped=await nk.count();if(flipped)await nk.click();await p.waitForTimeout(1100);
  t=await card(p);const back=await p.evaluate(()=>!!S.ill);ok(flipped&&back&&/Tốn/i.test(t)&&/(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(t),`${name} nặng card back (real tap = flip, not run) shows Tốn + odds word: ${t.slice(-300)}`);
  await p.screenshot({path:`${OUT}/${name}-2-nang-back.png`});
  await p.evaluate(()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}render()});await p.waitForTimeout(400);
  /* (2) law 2: the bạc road always has its matching road in the SAME tier, both shown side by side (each its own Tốn / odds); the one she cannot pay is greyed with the reason */
  const nang=await p.evaluate(()=>{const r=(DOOR.D||[]).find(x=>x.k==="hs-thaiy");const run=()=>{IC.deck();const L=[];deck.forEach((a,i)=>{if(a&&r.re.test(a.n)){const off=!!(a.lock||!canPay(a));L.push({id:"d:"+a.n,n:a.n,a,x:optLine(a),off,why:off?(a.lock&&a.t)||"không đủ bạc":""})}});
    return ONE.tierRows(r,L,"me").filter(y=>y.t==="nặng").map(y=>(y.m?y.m.n:"—")+(y.off?" [off: "+y.off.why+"]":"")+(/Tốn|tốn/.test(y.x)?" +ton":""))};
   const b0=S.bac,s0=S.sung;S.bac=200;S.sung=30;deal();const both=run();S.bac=0;S.sung=30;deal();const poor=run();S.bac=200;S.sung=0;deal();const nos=run();S.bac=b0;S.sung=s0;deal();return{both,poor,nos}});
  const has=(L,n,off)=>L.some(x=>x.startsWith(n)&&(/\[off/.test(x)===off)&&/\+ton/.test(x));
  ok(nang.both.length===2&&has(nang.both,"Truyền thái y",false)&&has(nang.both,"Cầu xin ngự y",false),`${name} nặng tier shows BOTH roads with Tốn: ${JSON.stringify(nang.both)}`);
  ok(has(nang.poor,"Truyền thái y",true)&&has(nang.poor,"Cầu xin ngự y",false),`${name} no bạc: Truyền thái y greyed, Cầu xin open: ${JSON.stringify(nang.poor)}`);
  ok(has(nang.nos,"Cầu xin ngự y",true)&&has(nang.nos,"Truyền thái y",false),`${name} no Sủng: Cầu xin greyed, Truyền open: ${JSON.stringify(nang.nos)}`);
  const cardRows=await p.evaluate(()=>{S.bac=200;S.sung=30;Q.length=0;try{$("modal").hidden=true}catch(e){}illOpen();const o=(Q[0]&&Q[0].opts||[]).map(x=>x.n);Q.length=0;try{$("modal").hidden=true}catch(e){}return o});
  ok(cardRows.includes("Truyền thái y · nặng")&&cardRows.includes("Cầu xin ngự y · nặng"),`${name} the illness card lists both nặng roads: ${cardRows}`);
  /* (3) not ill: the door is the pulse door again (regression) */
  const well=await p.evaluate(()=>{S.ill=null;deal();const r=(DOOR.D||[]).find(x=>x.k==="hs-thaiy");return deck.filter(a=>a&&r.re.test(a.n)).map(a=>a.n+":"+ONE.tierOf(r,a))});
  ok(well.includes("Mời thái y bắt mạch:nặng")&&well.includes("Sang Thái y viện xin bắt mạch:vừa"),`${name} well: pulse roads keep their tiers ${well}`);
  if(name==='fold'){
   /* (4) numbers from BAL (law 4): the road odds = lot + BAL.illCure.way + care */
   const nb=await p.evaluate(()=>{S.ill={k:"lao",st:2,known:true};const c=careOdds(S),l=lotB(S,"Sức khỏe");return ["ty","cau","vien","rest"].every(w=>treatO(S,w)===oddsCl(l+BAL.illCure.way[w]+c))&&illCards().find(a=>a.n==="Truyền thái y").c.bac===-BAL.illCure.tyBac});
   ok(nb,'road odds + prices read BAL.illCure');
   /* (5) illness still kills (OD:L2670), but never in the month it turns nguy kịch (she gets the card + a month) */
   const dz=await p.evaluate(()=>{const d0=die;let dead=0,sameMonth=0,from3=0;die=()=>{dead=1};const s0=S.suc;
    try{for(let n=0;n<400;n++){dead=0;S.dead=false;S.ill={k:"lao",st:2,known:true};illMonthP(S);if(S.ill&&S.ill.st===3&&dead)sameMonth++;if(dead&&(!S.ill||S.ill.st!==3))sameMonth++}
     for(let n=0;n<400;n++){dead=0;S.dead=false;S.ill={k:"lao",st:3,known:true};illMonthP(S);if(dead)from3++}}finally{die=d0;S.dead=false;S.suc=s0}return{sameMonth,from3}});
   ok(dz.sameMonth===0&&dz.from3>40,`no death in the month it turns nguy kịch (${dz.sameMonth}); nguy kịch still kills (${dz.from3}/400)`);
   /* (6) the alarm: the month it turns nặng / nguy kịch, the card opens by itself */
   const al=await p.evaluate(async()=>{const d0=die;die=()=>{};let set=0;try{for(let n=0;n<60&&!set;n++){S.dead=false;S.ill={k:"lao",st:1,known:true};delete S.illAlarm;Q.length=0;illMonth();if(S.illAlarm)set=1}}finally{die=d0}
    if(!set)return{set};S.ill.st=2;Q.length=0;try{$("modal").hidden=true}catch(e){}render();await new Promise(r=>setTimeout(r,900));const m=document.querySelector('#modal');return{set,open:!!(m&&!m.hidden&&/Bắt mạch, chữa bệnh/.test(m.innerText)),left:!!S.illAlarm}});
   ok(al.set&&al.open&&!al.left,`alarm card opens once when the illness worsens ${JSON.stringify(al)}`);
   await p.evaluate(()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}});
   /* (7) NPCs take the same roads at the same prices (law 1) */
   const npc=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.coop&&x.alive!==false);if(!v)return null;const k0=BAL.illCure.npc;BAL.illCure.npc=100;const out={};
    try{out.ty=false;for(let n=0;n<8&&!out.ty;n++){v.ill={k:"lao",st:2,known:true};v.bac=100;v.sung=50;const b0=v.bac,n0=IC.npc;illMonthP(v);out.ty=IC.npc>n0&&b0-v.bac===BAL.illCure.tyBac}/* roll(100) is capped at BAL.odds.hi: retry */
     out.cau=false;for(let n=0;n<8&&!out.cau;n++){v.ill={k:"lao",st:2,known:true};v.bac=0;v.sung=50;v.out=false;illMonthP(v);out.cau=IC.bestWay(v)[0]==="cau"&&(IC.npcW||{}).cau>=1}/* same retry as the bạc row (roll cap) */
     v.ill={k:"lao",st:1,known:true};const n0=IC.npc;illMonthP(v);out.lightSkip=IC.npc===n0}finally{BAL.illCure.npc=k0;v.ill=null}return out});
   ok(npc&&npc.ty&&npc.cau&&npc.lightSkip,`NPC roads: bạc → thái y, no bạc → cầu xin, nhẹ → none ${JSON.stringify(npc)}`)}
  /* ---------- r3 (MAIN 185) ---------- */
  /* Q1: the illness caps Sức tối đa by stage (BAL.illCure.sucCap), she and NPCs alike (law 1); the HUD Sức follows at once; cured = the cap lifts */
  const q1=await p.evaluate(()=>{const C=BAL.illCure.sucCap,o={me:[],npc:[]};const v=liveRivals(true).find(x=>!x.coop&&x.alive!==false);
   S.ill=null;const base=sucCap(S);for(const st of [1,2,3]){S.ill={k:"lao",st,known:true};S.suc=99;render();const want=Math.min(base,C[st]);o.me.push(sucCap(S)===want&&S.suc===want);if(v){v.ill={k:"lao",st,known:true};v.suc=99;illMonthP===illMonthP;IC.fit(v);o.npc.push(sucCap(v)===C[st]&&v.suc<=C[st])}}
   S.ill=null;o.well=sucCap(S)===base;if(v)v.ill=null;
   S.ill={k:"lao",st:1,known:true};S.suc=99;S.ill.st=2;render();o.hud=S.suc===Math.min(base,C[2])&&sucCap(S)===Math.min(base,C[2]);
   const hx=HXNOW.suc();o.hx=JSON.stringify(hx);o.hxOk=hx.some(r=>r[0]==="Sức tối đa"&&/vì lao phổi/.test(r[1]));
   /* a typed cap would break when BAL changes (law 4): change the BAL key, the cap follows */
   const c0=C[2];C[2]=50;o.bal=sucCap(S)===50;C[2]=c0;S.ill=null;render();return o}).catch(e=>({me:[],err:String(e).slice(0,160)}));
  ok(q1.me.every(Boolean)&&q1.well&&q1.bal,`${name} Q1 her Sức tối đa = BAL.illCure.sucCap by stage, lifts when cured, reads BAL ${JSON.stringify(q1)}`);
  ok(!q1.npc.length||q1.npc.every(Boolean),`${name} Q1 NPC Sức capped the same (law 1) ${JSON.stringify(q1.npc)}`);
  ok(q1.hud&&q1.hxOk,`${name} Q1 the Sức shown follows the cap and says why ${q1.hx}`);
  /* Q3: a child illness gives a sign before it can kill — the first hit never kills (any size), she gets the card; only an already-sick child can die */
  const q3=await p.evaluate(()=>{const o={};const K=BAL.kidIll;const mk=(nm,age)=>({name:nm,sex:"m",age:age||2,hp:100,tal:50,fond:50,alive:true});
   const k=mk("Thử Nhi");S.kids.push(k);let dead=0,floor=1,flag=1;
   for(let n=0;n<300;n++){k.alive=true;k.hp=1+(n%100);k.kIll=null;const h0=k.hp;kidIllHit(S,k,999,"sốt cao co giật");if(!k.alive)dead++;if(k.hp!==Math.min(h0,K.floor))floor=0;if(!k.kIll)flag=0}
   o.firstNoKill=dead===0&&floor&&flag;
   /* a child with an illness of the ILL book (jface): the card the month her stage goes up */
   {k.alive=true;k.hp=100;k.kIll=null;k.ill={k:"lao",st:1,known:true};delete S.kidAlarm;const f0=fxIllMonth,d0=die;const sv=consorts().map(c=>[c,c.ill]);
    try{fxIllMonth=q=>{if(q===k&&k.ill)k.ill.st=2};die=()=>{};illMonth()}finally{fxIllMonth=f0;die=d0;for(const [c,i] of sv)c.ill=i}o.illBook=S.kidAlarm===k.name;k.ill=null;delete S.kidAlarm}k.alive=true;k.hp=20;k.kIll={t:-5,n:"sốt cao co giật"};kidIllHit(S,k,999,"sốt cao co giật");o.secondKills=!k.alive;
   /* every child-illness path runs that rule: the đậu mùa epidemic (j13) and the fever event's failed «Tự bốc thuốc» (j7 kidHurt) */
   const r0=window.roll;k.alive=true;k.hp=5;k.kIll=null;S.kidAlarm=null;
   const C0=consorts().map(c=>[c,c.ill,c.confined,(c.staff||[]).slice()]);try{window.roll=()=>true;roll=window.roll;for(let n=0;n<80&&!k.kIll&&k.alive;n++){k.hp=5;epidemic()}}finally{window.roll=r0;roll=r0;for(const [c,i,f,st] of C0){c.ill=i;c.confined=f;if(c.staff)c.staff=st}}o.epid=k.alive&&!!k.kIll;
   k.hp=5;k.kIll=null;kidHurt(k,999);o.fever=k.alive&&!!k.kIll;
   /* kidsMonth: no second hit in the month she fell ill; later months BAL.kidIll.worse */
   const w0=K.worse;K.worse=100;k.alive=true;k.hp=5;k.kIll={t:S.turn,n:"x"};const t0=S.turn;kidsMonth();o.sameMonth=k.alive;
   for(let n=1;n<=6&&k.alive;n++){S.turn=t0+n;k.hp=5;kidsMonth()}o.nextMonth=!k.alive;S.turn=t0;K.worse=w0;
   /* the same rule for NPC mothers' children (law 1) */
   const v=liveRivals(true).find(x=>!x.coop&&x.alive!==false);if(v){v.kids=v.kids||[];const nk=mk("Thử Tôn");v.kids.push(nk);kidIllHit(v,nk,999,"x");o.npc=nk.alive&&!!nk.kIll;v.kids.splice(v.kids.indexOf(nk),1)}
   S.kids.splice(S.kids.indexOf(k),1);return o}).catch(e=>({err:String(e).slice(0,160)}));
  ok(q3.firstNoKill&&q3.secondKills,`${name} Q3 first child-illness hit never kills (sign), an already-sick child can die ${JSON.stringify(q3)}`);
  ok(q3.epid&&q3.fever&&q3.sameMonth&&q3.nextMonth&&q3.illBook,`${name} Q3 every child path (epidemic, fever, kidsMonth) gives the sign first ${JSON.stringify(q3)}`);
  ok(q3.npc!==false,`${name} Q3 NPC children the same (law 1)`);
  /* Q3 roads (law 2): at Thái y viện the bạc road «Xin thuốc cho <con>» has its matching non-bạc road «Cầu xin ngự y cho <con>» (Sủng, the same gain); at home «Thức trông <con>» (Sức) */
  const rd=await p.evaluate(()=>{const X=BAL.ag.cx2,o={};const k={name:"Thử Nhi",sex:"m",age:2,hp:30,tal:50,fond:50,alive:true,kIll:{t:-1,n:"sốt cao co giật"}};S.kids.push(k);
   const kn0=K61RAW;K61RAW=true;S.sung=30;S.bac=100;const L=talkOpts({kind:"ty"});const a=L.find(x=>x.n==="Xin thuốc cho "+k.name),b=L.find(x=>x.n==="Cầu xin ngự y cho "+k.name);
   o.both=!!(a&&b);o.cost=!!(a&&b&&a.c.bac===X.kidMed.c.bac&&b.c.sung===X.kidAsk.c.sung&&!b.c.bac&&a.x===b.x&&!b.lock);
   S.sung=0;const b2=talkOpts({kind:"ty"}).find(x=>x.n==="Cầu xin ngự y cho "+k.name);o.lockNoSung=!!(b2&&b2.lock&&/Sủng/.test(b2.t||""));S.sung=30;
   const h0=k.hp;if(b)b.go();o.gain=k.hp===Math.min(100,h0+X.kidAsk.up);
   k.hp=30;deal();const w=deck.find(x=>x&&x.n==="Thức trông "+k.name);o.watch=!!(w&&w.c.suc===X.kidWatch.c.suc&&!w.c.bac);
   k.hp=55;w&&w.go();o.wellAt=k.hp>=BAL.kidIll.well?!k.kIll:true;
   /* the NPC mother has the same roads (law 1): registered deeds + the player's button names */
   o.npc=typeof AGRUN==="object"&&!!AGRUN["cx2:kidAsk"]&&!!AGRUN["cx2:kidWatch"]&&AGC2BTN.kidAsk==="Cầu xin ngự y cho"&&AGC2BTN.kidWatch==="Thức trông";
   const v=liveRivals(true).find(x=>!x.coop&&x.alive!==false&&!x.out);if(v){v.kids=v.kids||[];const nk={name:"Thử Tôn",sex:"f",age:2,hp:30,tal:50,fond:50,alive:true,kIll:{t:-1,n:"x"}};nk.hp=1;v.kids.push(nk);
    v.bac=0;v.sung=40;const s0=v.sung;AGRUN["cx2:kidAsk"](v);o.npcAsk=nk.hp===1+X.kidAsk.up&&v.sung===s0+X.kidAsk.c.sung;v.kids.splice(v.kids.indexOf(nk),1)}
   K61RAW=kn0;S.kids.splice(S.kids.indexOf(k),1);deal();return o}).catch(e=>{try{K61RAW=false}catch(x){}return{err:String(e).slice(0,160)}});
  ok(rd.both&&rd.cost&&rd.lockNoSung&&rd.gain,`${name} Q3 Thái y viện: Xin thuốc (bạc) + Cầu xin ngự y (Sủng) for the child, same gain; greyed with reason without Sủng ${JSON.stringify(rd)}`);
  ok(rd.watch&&rd.wellAt,`${name} Q3 home deck: Thức trông <con> (Sức, no bạc) ${JSON.stringify(rd)}`);
  ok(rd.npc&&rd.npcAsk!==false,`${name} Q3 NPC mothers: Cầu xin ngự y cho con / Thức trông con at the same prices ${JSON.stringify(rd)}`);
  /* Q3 sign: her child falls ill → the card opens by itself (words only, the roads named), once */
  const kc=await p.evaluate(async()=>{const k={name:"Thử Nhi",sex:"m",age:2,hp:90,tal:50,fond:50,alive:true};S.kids.push(k);Q.length=0;try{$("modal").hidden=true}catch(e){}
   kidIllHit(S,k,50,"sốt cao co giật");render();await new Promise(r=>setTimeout(r,900));const m=document.querySelector('#modal');const t=m&&!m.hidden?m.innerText:"";
   return{t,left:!!S.kidAlarm}}).catch(e=>({t:"",err:String(e).slice(0,160)}));
  ok(/Thử Nhi lâm bệnh/.test(kc.t)&&/Đường chữa/.test(kc.t)&&/Cầu xin ngự y cho Thử Nhi/.test(kc.t)&&/không qua khỏi: khả năng/.test(kc.t)&&!/\d+ ?%/.test(kc.t)&&!kc.left,`${name} Q3 the child card opens once, roads + odds in words, no % ${kc.t.replace(/\n+/g,' | ').slice(0,400)}`);
  await p.screenshot({path:`${OUT}/${name}-3-kid-card.png`});
  await p.evaluate(()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}const i=S.kids.findIndex(k=>k.name==="Thử Nhi");if(i>=0)S.kids.splice(i,1);render()});
  /* ---------- r4 (MAIN 186, Foreman F s21g): a MILD illness («Tâm bệnh · nhẹ») is never HUD-only ---------- */
  /* she falls ill (the real catchIll, as every game path) → her card opens by itself once: danger words + the tier roads, no % */
  const mild=await p.evaluate(async()=>{S.ill=null;delete S.illAlarm;Q.length=0;try{$("modal").hidden=true}catch(e){}render();catchIll(S,"tambenh");render();await new Promise(r=>setTimeout(r,900));
   const m=document.querySelector('#modal');const t=m&&!m.hidden?m.innerText.replace(/\s+/g," "):"";const left=!!S.illAlarm;Q.length=0;try{m.hidden=true}catch(e){}render();await new Promise(r=>setTimeout(r,300));
   const again=(()=>{const mm=document.querySelector('#modal');return !!(mm&&!mm.hidden)})();return{t,left,again}});
  ok(/Tâm bệnh · nhẹ\./.test(mild.t)&&/Bệnh này không nguy đến tính mạng/.test(mild.t)&&/tự khỏi: khả năng/.test(mild.t)&&/Tĩnh dưỡng · nhẹ/.test(mild.t)&&/xin thuốc · vừa/.test(mild.t)&&/Truyền thái y · nặng/.test(mild.t)&&/Cầu xin ngự y · nặng/.test(mild.t)&&!/\d+ ?%/.test(mild.t),`${name} r4 mild Tâm bệnh: the card opens by itself with danger words + the tier roads, no % ${mild.t.slice(0,300)}`);
  ok(!mild.left&&!mild.again,`${name} r4 the fall-ill card opens once (not again on the next render)`);
  /* the visible chip of a mild illness (top bar) opens the same card */
  const mtap=await p.evaluate(async()=>{const c=[...document.querySelectorAll('[data-k3="ill"],[data-hx="ill"]')].find(e=>e.offsetParent);if(!c)return"no visible chip";c.click();await new Promise(r=>setTimeout(r,500));
   const m=document.querySelector('#modal');const t=m&&!m.hidden?m.innerText.replace(/\s+/g," "):"nothing";Q.length=0;try{m.hidden=true}catch(e){}S.ill=null;render();return t});
  ok(/Tâm bệnh · nhẹ\./.test(mtap)&&/Tĩnh dưỡng · nhẹ/.test(mtap)&&/Cầu xin ngự y · nặng/.test(mtap),`${name} r4 the visible «Tâm bệnh · nhẹ» chip opens the card with roads: ${mtap.slice(0,200)}`);
  /* every path she falls ill by goes through catchIll: an illness of any kind at nhẹ gives the card (one per kind) */
  const kinds=await p.evaluate(async()=>{const bad=[];for(const k of Object.keys(ILL)){S.ill=null;delete S.illAlarm;Q.length=0;try{$("modal").hidden=true}catch(e){}catchIll(S,k);render();await new Promise(r=>setTimeout(r,120));
    const m=document.querySelector('#modal');const t=m&&!m.hidden?m.innerText:"";if(!/· nhẹ/.test(t)||!/Chọn mức/.test(t))bad.push(k)}Q.length=0;try{$("modal").hidden=true}catch(e){}S.ill=null;render();return bad});
  ok(!kinds.length,`${name} r4 every illness at nhẹ opens the card when she falls ill: missing ${kinds.join(",")}`);
  ok(!errs.length,`${name} no page errors ${errs.slice(0,3)}`);await p.close()}
 /* ---------- r4 (law 11, life family): a CUNG NỮ falls ill → her chip shows, the card opens by itself, and she has the roads a servant really has ---------- */
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
  const sv=await p.evaluate(async()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<300&&!isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
   if(!isSrv())return{srv:false};S.ill=null;render();catchIll(S,"lao");deal();render();await new Promise(r=>setTimeout(r,900));const m=document.querySelector('#modal');const sign=m&&!m.hidden?m.innerText.replace(/\s+/g," "):"";
   Q.length=0;try{m.hidden=true}catch(e){}render();await new Promise(r=>setTimeout(r,300));const c=[...document.querySelectorAll('[data-k3="ill"],[data-hx="ill"]')].find(e=>e.offsetParent);let tap="";
   if(c){c.click();await new Promise(r=>setTimeout(r,500));const mm=document.querySelector('#modal');tap=mm&&!mm.hidden?mm.innerText.replace(/\s+/g," "):""}
   Q.length=0;try{$("modal").hidden=true}catch(e){}deal();/* a fresh deal (next buổi), not the cards the open card pushed */const cards=deck.map(a=>a.n);
   /* a road really runs: Tĩnh dưỡng is a deck card of hers */const i=deck.findIndex(a=>a.n==="Tĩnh dưỡng");
   S.ill=null;render();return{srv:true,sign,chip:!!c,tap,cards,rest:i>=0}});
  if(!sv.srv){ok(false,`${name} r4 cung nữ life: no cung nữ start in 300 tries`);await p.close();continue}
  await p.screenshot({path:`${OUT}/${name}-4-srv.png`});
  ok(/Lao phổi · nhẹ\./.test(sv.sign)&&/Tĩnh dưỡng · nhẹ/.test(sv.sign)&&/xin thuốc · vừa/.test(sv.sign)&&/bệnh không tự khỏi/.test(sv.sign)&&/Sức tối đa chỉ/.test(sv.sign)&&!/\d+ ?%/.test(sv.sign),`${name} r4 cung nữ falls ill: the card opens by itself, roads + danger words ${sv.sign.slice(0,260)}`);
  ok(sv.chip&&/Tĩnh dưỡng · nhẹ/.test(sv.tap),`${name} r4 cung nữ: her illness chip is shown and opens the card ${sv.tap.slice(0,160)}`);
  ok(sv.rest&&sv.cards.includes("Sang Thái y viện xin thuốc")&&!sv.cards.includes("Truyền thái y")&&!sv.cards.includes("Cầu xin ngự y"),`${name} r4 cung nữ deck: Tĩnh dưỡng + Sang Thái y viện xin thuốc, no thái y summons / Sủng plea ${JSON.stringify(sv.cards.filter(n=>/thuốc|dưỡng|thái y|ngự y/.test(n)))}`);
  ok(!errs.length,`${name} r4 cung nữ no page errors ${errs.slice(0,3)}`);await p.close()}
 await b.close();console.log(fails?`FAILS ${fails}`:'ALL OK');process.exit(fails?1:0)})();
