/* review/balance-core unit checks: one origin table (her + NPC), one course ladder, old-save migration, growth curve both ways,
   night odds from BAL.steal.m, rungDown, Emperor's month art, mode losses. usage: node dev/test/balance-core.js <index.html> → PASS/FAIL, exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1000,height:755}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{window.render=function(){};const out=[];const ok=(n,c,d)=>out.push([n,!!c,d===undefined?"":JSON.stringify(d)]);
  const go=k=>{window.__forceOrigin=k;for(let i=0;i<60;i++){try{localStorage.clear()}catch(e){}start();if(S.origin.k===k)break}Q.length=0;S.mg=0};
  for(const k of Object.keys(BAL.start).filter(k=>k!=="npcW"&&k!=="npc"&&k!=="quan")){go(k);const o=BAL.start[k],in_=(v,r)=>Array.isArray(r)?v>=r[0]&&v<=r[1]:v===r;
   ok(`${k}: Sắc/Tài/Tâm cơ/Đức from BAL.start`,in_(S.sac,o.sac)&&in_(S.tai,o.tai)&&in_(S.tamco,o.tamco)&&S.duc===o.duc,{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc});
   ok(`${k}: arts = table points`,Object.keys(o.art).every(a=>Math.abs(artPts(S,a)-o.art[a])<=1)&&Math.max(...ARTS.map(a=>artPts(S,a.k)))<=45,ARTS.map(a=>artPts(S,a.k)))}
  go("tt");const v=liveRivals(true)[0];ok("NPC has an origin from the same table",!!(v&&BAL.start[v.org]),v&&v.org);
  ok("NPC Sắc/Tài inside her origin's range",v&&v.sac>=BAL.start[v.org].sac[0]-10&&v.tai<=BAL.start[v.org].tai[1]+10,v&&[v.sac,v.tai]);
  /* ladder */const P={arts:{cam:0},artp:{cam:0}};let n=0;while(P.arts.cam<5&&n<500){crsPush(P.arts,P.artp,"cam",2);n++}
  ok("ladder: 2-point lessons to Tông sư take 70–130 lessons (old ladder: 8)",n>=70&&n<=130,n);ok("Tông sư = 100 points",artPts(P,"cam")===100);
  ok("tier names from BAL.art.nm",artNm(3)===BAL.art.nm[3]);ok("artO = BAL.art.odds[bậc]",artO({arts:{y:3}},"y")===BAL.art.odds[3]);
  /* NPC and her: same points for the same lesson */go("muoi");S.arts.ky=0;S.artp.ky=0;const w=liveRivals(true)[1];w.arts.ky=0;w.artp.ky=0;addArt("ky",3);addArtP(w,"ky",3);
  ok("two-way: addArt(her) = addArtP(NPC)",artPts(S,"ky")===artPts(w,"ky"),[artPts(S,"ky"),artPts(w,"ky")]);
  /* old save */const old={arts:{cam:3,ky:5},artp:{cam:4,ky:0},vir:{dung:2},virp:{dung:3}};crsMigrate(old);
  ok("old save keeps its bậc, progress share moves",old.arts.cam===3&&old.arts.ky===5&&Math.abs(old.artp.cam-4/5*artNeed(3))<.2&&old.vir.dung===2,old);
  /* growth curve */S.tamco=85;const t0=S.tamco;window.__noGrow=0;for(let i=0;i<20;i++)apply({tamco:2});const g1=S.tamco-t0;w.tamco=85;for(let i=0;i<20;i++)ap(w,{tamco:2});
  ok("growth curve: +40 Tâm cơ at 85 gives ≈4 (her) and the same for an NPC",g1>=1&&g1<=9&&Math.abs((w.tamco-85)-g1)<=5,[g1,w.tamco-85]);
  /* r1 note 7: a loss below her own peak heals at grow.back (×1), new heights stay slow */S.sac=88;apply({sac:0});S.pk.sac=88;S.sac=78;const s0r=S.sac;for(let i=0;i<5;i++)apply({sac:2});ok("regaining lost Sắc below her peak is not slowed by the curve",S.sac-s0r>=9&&S.sac<=88+1,[s0r,S.sac]);
  /* night odds */S.sung=40;S.sac=60;const f=oSteal(S,"feign"),r=oSteal(S,"road");S.sung=10;S.sac=85;const f2=oSteal(S,"feign"),r2=oSteal(S,"road");
  ok("Tranh sủng rides on Sủng, Chặn ngự giá on Sắc",f>r&&r2>f2,[f,r,f2,r2]);ok("oKeep is a number 5..95",oKeep(S)>=5&&oKeep(S)<=95,oKeep(S));
  ok("rungDown drops one word rung",ladIdx(rungDown(60,1))===ladIdx(60)-1&&rungDown(20,1)>=5,[rungDown(60,1),rungDown(20,1)]);
  S.emp.ea=null;empArtMonth();const ea=empArt();ok("Emperor's month art: one favoured, one disfavoured, different",ea&&ea.f!==ea.d&&ARTS.some(a=>a.k===ea.f),ea);
  S.mat=BAL.steal.ea.mat;S.eaK=-1;eaLearn(true);ok("Tai mắt ≥ ea.mat knows it at the month start",eaKnows(S));
  for(const k of ARTS.map(a=>a.k)){S.arts[k]=0;S.artp[k]=0}S.arts[ea.f]=3;const fav=oSteal(S,"road");S.arts[ea.f]=0;S.arts[ea.d]=3;const dis=oSteal(S,"road");S.arts[ea.d]=0;const none=oSteal(S,"road");
  ok("favoured art up, disfavoured art down",fav>none&&dis<none,[fav,none,dis,ea,empArt(),S.turn]);
  /* r1 note 6: the shown word leaves out the month art she does not know */{for(const k of ARTS.map(a=>a.k)){S.arts[k]=0;S.artp[k]=0}S.arts[ea.f]=3;S.eaK=-1;const tr=oSteal(S,"road"),sh=stealShown(S,"road");S.eaK=S.turn;const sh2=stealShown(S,"road");S.arts[ea.f]=0;
   ok("stealShown: unknown month art → shown odds without it; known → the true odds",sh<tr&&sh2===tr,[tr,sh,sh2])}
  /* F2 (r1): every person uses HER OWN best art (an NPC with Thêu while she has Cầm), Thêu/Nấu count like any art */
  {const z=liveRivals(true)[2]||w;for(const k of ARTS.map(a=>a.k)){S.arts[k]=0;S.artp[k]=0;z.arts[k]=0;z.artp[k]=0}S.arts.cam=3;z.arts.theu=3;S.emp.ea={m:S.turn,f:"theu",d:"cam"};
   ok("NPC night art bonus = her own best art (Thêu favoured → up), hers (Cầm disfavoured → down)",stealArtB(z,"road")>0&&stealArtB(S,"road")<0&&stBestArt(z).k==="theu"&&stBestArt(S).k==="cam",[stealArtB(z,"road"),stealArtB(S,"road")]);
   S.emp.ea={m:S.turn,f:"nau",d:"theu"};ok("disfavoured Thêu lowers the NPC who is best at it",stealArtB(z,"feign")<0,stealArtB(z,"feign"));z.arts.theu=0;S.arts.cam=0;S.emp.ea=ea}
  const s0=S.sung,d0=S.danh;stealFail(S,w,"road");ok("Chặn ngự giá failure = BAL.steal.m.road.lose",Math.abs((S.sung-s0)-BAL.steal.m.road.lose.sung)<=2/* sg(): the Emperor's trait scales Sủng */&&S.danh===Math.max(0,d0+(BAL.steal.m.road.lose.danh||0)),[S.sung-s0,S.danh-d0]);
  ok("word() reads BAL.lad",word(BAL.lad[2])==="Khá chắc"&&word(BAL.lad[2]-1)==="Năm ăn năm thua");
  ok("ARTFX texts print BAL.art.stUp",ARTFX.cam[0].startsWith(`Tài +${BAL.art.stUp}`),ARTFX.cam[0]);
  return out});
 let bad=0;for(const [n,c,d] of R){console.log(`${c?"PASS":"FAIL"} | ${n} | ${d}`);if(!c)bad++}console.log("page errors:",errs.length,errs.slice(0,3).join(" | "));
 await b.close();process.exit(bad||errs.length?1:0)})();
