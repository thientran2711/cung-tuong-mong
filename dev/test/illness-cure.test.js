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
  let t=await card(p);
  ok(chip,`${name} status chip «Lao phổi · nặng» present`);
  ok(/Bắt mạch, chữa bệnh/.test(t)&&/· nhẹ/.test(t)&&/· vừa/.test(t)&&/· nặng/.test(t),`${name} chip opens the tier card nhẹ·vừa·nặng: ${t.slice(0,260)}`);
  ok(/Lao phổi · nặng\./.test(t)&&/không qua khỏi: khả năng/.test(t)&&/Sức còn đầy/.test(t),`${name} card shows the honest danger line in words`);
  ok(!/\d+ ?%/.test(t),`${name} no % on the card (law 7)`);
  ok(/Tĩnh dưỡng · nhẹ|Tự bốc thuốc · nhẹ/.test(t)&&/Sang Thái y viện xin thuốc · vừa/.test(t)&&/(Truyền thái y|Cầu xin ngự y) · nặng/.test(t),`${name} every tier is a CURE road (no pulse-only road while ill)`);
  await p.screenshot({path:`${OUT}/${name}-1-ill-card.png`});
  /* the flipped back of the nặng card: Tốn / Được (law 3) + an odds word (law 7) */
  const nk=p.locator('#modal button.ka',{hasText:'· nặng'}).first();const flipped=await nk.count();if(flipped)await nk.click();await p.waitForTimeout(1100);
  t=await card(p);const back=await p.evaluate(()=>!!S.ill);ok(flipped&&back&&/Tốn/i.test(t)&&/(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(t),`${name} nặng card back (real tap = flip, not run) shows Tốn + odds word: ${t.slice(-300)}`);
  await p.screenshot({path:`${OUT}/${name}-2-nang-back.png`});
  await p.evaluate(()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}render()});await p.waitForTimeout(400);
  /* (2) the bạc road always has a matching road of the same tier: no bạc → Cầu xin ngự y; no Sủng → Truyền thái y */
  const nang=await p.evaluate(()=>{const r=(DOOR.D||[]).find(x=>x.k==="hs-thaiy");const run=()=>{IC.deck();const L=[];deck.forEach((a,i)=>{if(a&&r.re.test(a.n)){const off=!!(a.lock||!canPay(a));L.push({id:"d:"+a.n,n:a.n,a,x:a.x,off})}});const R=ONE.tierRows(r,L,"me");const x=R.find(y=>y.t==="nặng");return x&&x.m&&!x.off?x.m.n:"—"};
   const b0=S.bac,s0=S.sung;S.bac=0;S.sung=30;deal();const a=run();S.bac=200;S.sung=0;deal();const c=run();S.bac=b0;S.sung=s0;deal();return[a,c]});
  ok(nang[0]==="Cầu xin ngự y"&&nang[1]==="Truyền thái y",`${name} nặng tier: no bạc → ${nang[0]}; no Sủng → ${nang[1]}`);
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
    try{v.ill={k:"lao",st:2,known:true};v.bac=100;v.sung=50;let b0=v.bac;illMonthP(v);out.ty=b0-v.bac===BAL.illCure.tyBac;
     v.ill={k:"lao",st:2,known:true};v.bac=0;v.sung=50;v.out=false;illMonthP(v);out.cau=IC.bestWay(v)[0]==="cau"&&(IC.npcW||{}).cau>=1;
     v.ill={k:"lao",st:1,known:true};const n0=IC.npc;illMonthP(v);out.lightSkip=IC.npc===n0}finally{BAL.illCure.npc=k0;v.ill=null}return out});
   ok(npc&&npc.ty&&npc.cau&&npc.lightSkip,`NPC roads: bạc → thái y, no bạc → cầu xin, nhẹ → none ${JSON.stringify(npc)}`)}
  ok(!errs.length,`${name} no page errors ${errs.slice(0,3)}`);await p.close()}
 await b.close();console.log(fails?`FAILS ${fails}`:'ALL OK');process.exit(fails?1:0)})();
