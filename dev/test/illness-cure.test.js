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
  /* the nặng plaque (main kit-stage-r17: the card shows each way's Tốn / Thành / odds on its plaque; ONE tap runs it — RV-183 test update, no tap here):
     Tốn + odds word (law 7) + a REAL gain «khỏi bệnh», never its own cost read as a gain («Bạc +» / «Sủng +», law 3 / 4) */
  const nk=p.locator('#modal :is(button.ka,button.kpk-b,.kpk)',{hasText:'Truyền thái y'}).first();const flipped=await nk.count();await p.waitForTimeout(600);
  t=await card(p);const back=await p.evaluate(()=>!!S.ill);ok(flipped&&back&&/Tốn/i.test(t)&&/(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(t)&&/Truyền thái y · nặng/.test(t)&&!/Thành:? ?\|? ?(Bạc|Sủng|Sức) \+ \| ! \| (Truyền thái y|Cầu xin)/i.test(t)&&!/(Truyền thái y|Cầu xin ngự y|xin thuốc)[^!]*THÀNH \| (Bạc|Sủng|Sức) \+/.test(t),`${name} nặng plaque shows Tốn + odds word, no cost read as its gain: ${t.slice(-300)}`);
  /* r5c (RV-189 F1, law 2/4): every road's plaque Tốn prints its OWN price — «Cầu xin ngự y» shows «Sủng 4», «Truyền thái y» «Bạc 40», «xin thuốc» «Sức 8» */
  const tons=await p.evaluate(()=>{const o={};for(const b of document.querySelectorAll('#modal button')){const n=(b.querySelector('.kan')||b).textContent;const t=b.querySelector('.kr-ton');if(t)o[/Cầu xin/.test(n)?'cau':/Truyền/.test(n)?'ty':/xin thuốc/.test(n)?'vien':'x']=t.textContent.replace(/\s+/g,' ')}return o});
  ok(/Sủng 4/.test(tons.cau||'')&&/Bạc 40/.test(tons.ty||'')&&/Sức 8/.test(tons.vien||''),`${name} r5c each road's Tốn prints its own price (Sủng 4 · Bạc 40 · Sức 8) ${JSON.stringify(tons)}`);
  /* LIVE R11 (owner 27/11 ~06:42Z, DOOR.card tabdoor): a tab door is the LIVE list frame — ONE tap runs the road (Truyền thái y on LIVE = a summons, jptime) */
  const nk2=p.locator('#modal button.ka',{hasText:'Truyền thái y · nặng'}).first();const tapped=await nk2.count();if(tapped)await nk2.click();await p.waitForTimeout(1100);
  const ran=await p.evaluate(()=>{const r={busy:typeof ptBusy==="function"&&ptBusy(ptDocId()),ill:!!S.ill};try{S.away=[]}catch(e){}return r});
  ok(tapped&&ran.busy&&ran.ill,`${name} one tap on «Truyền thái y · nặng» runs it (the thái y is summoned, LIVE jptime) ${JSON.stringify(ran)}`);
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
 /* ---------- r5 (Foreman E E-ILL-RATE, law 1 + law 11): every NPC group that falls ill (jface fxIllMonth) takes a road on the same BAL odds; child illness no deadlier than LIVE ---------- */
 {const p=await b.newPage({viewport:{width:755,height:1000},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/ill staff/.test(m.text()))errs.push(m.text())});
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
  const r5=await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
   const out={kinds:{},ways:{},srvTy:0,srvCau:0,courtTy:null,off:null,kid:{},mom:null,bal:{worse:BAL.kidIll.worse,heal:BAL.kidIll.heal}};const npc0=BAL.illCure.npc;
   const ppl=KIT_FACEFX.everyone().filter(x=>x&&x!==S&&KIT_FACEFX.live(x));const by={};for(const x of ppl){const k=KIT_FACEFX.kind(x);(by[k]=by[k]||[]).push(x)}
   BAL.illCure.npc=100;
   for(const k of Object.keys(by)){if(["emp","thaihau","consort","player","cold"].includes(k))continue;const x=by[k][0];
    let v=null,vb=0,vs=0;if(k==="kid"){v=KIT_FACEFX.owner(x);if(!v||v===S)continue;vb=v.bac;vs=v.suc;v.bac=500;v.suc=80}
    const ill0=x.ill;x.ill={k:"lao",st:2,known:true};const n0=IC.staff;for(let t=0;t<12&&IC.staff===n0;t++){x.ill={k:"lao",st:2,known:true};IC.staffRoad(x,k,x.ill)}/* roll(100) is capped by BAL.odds.hi: retry */out.kinds[k]=IC.staff-n0;x.ill=ill0;if(v){v.bac=vb;v.suc=vs}}
   for(const k of BAL.staffRoad.srv){const x=(by[k==="mama"?"maid":k]||[])[0];if(!x)continue;const b0=x.bac;x.bac=999;const w=IC.staffWay(x,k)[0];out.ways[k]=w;if(w==="ty")out.srvTy++;if(w==="cau")out.srvCau++;x.bac=b0}
   {const x=(by.man||by.guard||by.physician||[])[0];if(x){const b0=x.bac;x.bac=999;const [w,c]=IC.staffWay(x,KIT_FACEFX.kind(x));out.courtTy={w,c:c.bac};x.bac=b0}}
   /* the monthly path itself: jface fxIllMonth reaches the road (not only a direct call) */
   {const x=(by.maid||by.eunuch||[])[0];out.month=0;if(x){const keep={ill:x.ill,alive:x.alive};const own=typeof ownerOf==="function"?ownerOf(x):null;const st=own&&own.staff?own.staff.slice():null;const n0=IC.staff;
     for(let t=0;t<12&&IC.staff===n0;t++){x.ill={k:"lao",st:2,known:false};x.alive=true;fxIllMonth(x);if(own&&st)own.staff=st.slice()}out.month=IC.staff-n0;Object.assign(x,keep)}}
   BAL.illCure.npc=0;{const x=(by.maid||[])[0];if(x){x.ill={k:"lao",st:2,known:true};const n0=IC.staff;for(let i=0;i<50;i++)IC.staffRoad(x,"maid",x.ill);out.off=IC.staff-n0;x.ill=null}}
   BAL.illCure.npc=100;
   /* NPC mother pays her kid road and the child gains */
   {const v=(rivals||[]).find(r=>r.alive!==false&&!r.out);if(v){v.kids=v.kids||[];let k=v.kids.find(c=>c.alive);if(!k){k={name:"Tiểu Ngọc",sex:"f",age:2,hp:100,alive:true,mom:v.id};v.kids.push(k)}
     const b0=v.bac,s0=v.sung;v.bac=500;k.hp=40;const m0=IC.staff;for(let t=0;t<12&&IC.staff===m0;t++){k.ill={k:"lao",st:2,known:true};IC.staffRoad(k,"kid",k.ill)}out.mom={bac:500-v.bac,hp:k.hp,ill:!!illOf(k)};k.ill=null;v.bac=b0;v.sung=s0}}
   BAL.illCure.npc=npc0;
   /* a child ốm regains hpKidsMonth + heal a month (no hit this month) */
   {const K=BAL.kidIll,c0=JSON.stringify(K.ch),w0=K.worse;K.ch.young=0;K.ch.old=0;K.worse=0;S.kids=S.kids||[];const k={name:"Tiểu Lan",sex:"f",age:2,hp:30,alive:true,kIll:{t:-1,n:"sốt cao co giật"}};S.kids.push(k);
    kidsMonth();out.kid={hp:k.hp,want:Math.min(100,30+BAL.eff.j8.hpKidsMonth+K.heal)};S.kids.splice(S.kids.indexOf(k),1);K.ch=JSON.parse(c0);K.worse=w0}
   return out});
  const nk=Object.keys(r5.kinds);
  ok(nk.length>=4&&nk.every(k=>r5.kinds[k]===1),`r5 every NPC group that falls ill takes a road at BAL.illCure.npc (law 1): ${JSON.stringify(r5.kinds)}`);
  ok(r5.month===1,`r5 the monthly illness roll (jface fxIllMonth) takes the servant's road itself ${r5.month}`);
  ok(['maid','eunuch'].every(k=>r5.kinds[k]===1),`r5 cung nữ + thái giám have the road ${JSON.stringify(r5.kinds)}`);
  ok(!r5.srvTy&&!r5.srvCau&&Object.keys(r5.ways).length>=2,`r5 servants never summon a thái y / plead with Sủng, even with bạc (her cung nữ roads) ${JSON.stringify(r5.ways)}`);
  ok(r5.courtTy&&r5.courtTy.w==="ty"&&r5.courtTy.c===-40,`r5 a courtier with bạc summons a thái y at the same price (BAL.illCure.tyBac) ${JSON.stringify(r5.courtTy)}`);
  ok(r5.off===0,`r5 the staff road follows the BAL key (npc 0 → no road) ${r5.off}`);
  ok(r5.mom&&r5.mom.bac>0&&r5.mom.hp>40,`r5 an NPC mother pays her kid road (BAL.ag.cx2) and her child gains ${JSON.stringify(r5.mom)}`);
  ok(r5.bal.worse<30&&r5.bal.heal>0&&r5.kid.hp===r5.kid.want,`r5 a child ốm regains hpKidsMonth + BAL.kidIll.heal a month; worse lowered ${JSON.stringify(r5)}`);
  ok(!errs.length,`r5 no page errors ${errs.slice(0,3)}`);await p.close()}
 await b.close();console.log(fails?`FAILS ${fails}`:'ALL OK');process.exit(fails?1:0)})();
