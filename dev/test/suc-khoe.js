/* review/suc-khoe (jkh.js): health = the Sức ceiling + the pregnancy bundle. Logic checks on one viewport (no UI part added).
   1 sucCap by age / scars, every clamp (apply, ap, weekly regen) obeys it, regen unchanged (jmort tired off)
   2 ở cữ = BAL.kh.ocuMo, no ×0.7 cut          3 preterm → kid.pre, health cost, lệch sổ fact
   4 overdue waits a month                      5 'lệch sổ' → rival with motive → blood test on her child (rtNgSet); NPC twin, truth rule
   6 miscarriage causes table                   7 thuốc thúc sinh card + birth looks full-term   8 old save (no kh fields) loads
   usage: node dev/test/suc-khoe.js <index.html> */
const {chromium}=require('playwright');const fs=require('fs');
const IDX=process.argv[2];const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
 await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__nlInner=1;for(let i=0;i<60;i++){start();if(!isSrv())break}window.__nlInner=0;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
 await p.waitForTimeout(1000);
 const L=await p.evaluate(()=>{const f=[],info={};const K=BAL.kh,P=BAL.preT;const clr=()=>{Q.length=0};
  const saveB=JSON.stringify({kh:BAL.kh,preT:BAL.preT,pg:BAL.pgRisk});const restore=()=>{const o=JSON.parse(saveB);Object.assign(BAL.kh,o.kh);Object.assign(BAL.preT,o.preT);Object.assign(BAL.pgRisk,o.pg)};
  /* births in this test never kill (the death rule itself is untouched and tested by mortality.js) */
  const MB=BAL.mort.birth;MB.hardX=0;MB.stillP=0;MB.stillAge=0;BAL.mort.birth.newbornP=0;
  /* 1 ceiling */
  S.age=20;S.khScar=0;S.khTmp=0;if(sucCap(S)!==100)f.push('cap at 20 = '+sucCap(S));
  S.age=60;const c60=sucCap(S);info.cap60=c60;info.kh60=khOf(S);if(!(c60<100&&c60>=K.maxBase))f.push('cap at 60 '+c60);
  S.suc=50;apply({suc:80});if(S.suc!==c60)f.push('apply over cap '+S.suc+'/'+c60);
  const v=liveRivals(true)[0];v.age=60;v.khScar=0;v.khTmp=0;v.suc=50;ap(v,{suc:80});if(v.suc!==sucCap(v))f.push('ap over cap '+v.suc);
  S.suc=10;const rg=j76sleep(S);S.age=20;const rg20=j76sleep(S);if(rg!==rg20)f.push('regen differs by age (tired not folded) '+rg+' vs '+rg20);
  S.age=40;S.khScar=10;info.cap40scar10=sucCap(S);S.khScar=0;S.age=20;
  /* 2 ở cữ */
  S.preg=0;S.fake=0;S.barren=0;S.lastBirth=null;const c0=conceiveCh(S);S.lastBirth=S.turn;if(conceiveCh(S)!==0)f.push('ở cữ not blocking');
  S.lastBirth=S.turn-(K.ocuMo-1);if(conceiveCh(S)!==0)f.push('ở cữ not blocking its last month');S.lastBirth=S.turn-K.ocuMo;const c1=conceiveCh(S);/* exactly ocuMo months blocked (review r1) */if(c1!==c0)f.push('after ở cữ '+c1+' vs '+c0+' (×0.7 still?)');S.lastBirth=null;info.conc=[c0,c1];
  /* 3 preterm */
  BAL.preT.m8=100;BAL.preT.die8=0;S.preg=7;S.trueFather=null;S.pregMismatch=false;S.age=24;S.suc=90;const n0=S.kids.length,sc0=S.khScar||0;
  let ev=pregMonthP(S);const kid=S.kids[n0];if(!kid)f.push('preterm: no birth '+ev.slice(0,120));else{if(kid.pre!==8)f.push('kid.pre '+kid.pre);if(kid.dateOff!=="pre")f.push('no lệch sổ on innocent preterm');}
  if(!((S.khScar||0)>sc0))f.push('no lasting scar after birth');if(!(S.khTmp>0))f.push('no healing harm after birth');info.pre=ev.replace(/<[^>]+>/g,'').slice(0,240);
  if(S.khOcuT==null)f.push('ở cữ not started');restore();clr();
  /* ở cữ broken by a move */
  S.khOcuX=0;const pl=places().find(x=>x.k!=="home");used=0;S.confined=0;S.out=false;S.place="home";goTo(pl.k);if(!S.khOcuX)f.push('ở cữ not broken by a move');goTo("home");
  /* 4 overdue */
  BAL.preT.od=100;BAL.preT.m9=0;BAL.preT.m8=0;S.lastBirth=null;S.preg=9;S.khOd=0;const n1=S.kids.length;ev=pregMonthP(S);if(S.preg!==9||!S.khOd)f.push('overdue did not wait '+S.preg);
  ev=pregMonthP(S);const k2=S.kids[n1];if(S.preg)f.push('overdue: still pregnant');if(k2&&k2.dateOff!=="od")f.push('overdue kid dateOff '+(k2&&k2.dateOff));restore();clr();
  /* 5 lệch sổ → blood test on her child */
  const kk=k2||kid;if(kk){kk.alive=true;kk.tfOk=0;kk.dateOff="pre";const a=liveRivals(true).find(x=>x!==S);a.oan=90;a.ghen=90;a.alive=true;a.out=false;S.rt=S.rt||{};S.rt.ng=null;
   a.evm=a.evm||{};a.evm[key(S)]=P.accEv+1;BAL.preT.accP=100;window.__rtN={};khWorld();if(!(S.rt&&S.rt.ng))f.push('no blood test after lệch sổ (motive '+khMotive(a,S,kk)+' gate '+JSON.stringify(rtGateT(a,S,'accuse'))+' dead '+S.dead+')');else info.ngAcc=S.rt.ng.acc;S.rt.ng=null;restore();}
  /* NPC twin: innocent child, honest bowl → blood mixes, accuser backlash */
  const m=liveRivals(true)[1],a2=liveRivals(true)[2];if(m&&a2){const nk=mkKid("m",0);nk.dateOff="od";nk.tf=null;(m.kids=m.kids||[]).push(nk);a2.oan=0;a2.ro=a2.ro||{};a2.ro[m.id]=90;a2.ghen=90;m.rl=m.rl||{};a2.rl=a2.rl||{};a2.rl[m.id]=-50;
   a2.trait="";a2.tamco=0;a2.sung=50;const s2=a2.sung;a2.evm=a2.evm||{};a2.evm[key(m)]=P.accEv+1;BAL.preT.accP=100;window.__khN={};khWorld();
   if(!nk.tfOk)f.push('NPC lệch sổ not tested (motive '+khMotive(a2,m,nk)+' gate '+JSON.stringify(rtGateT(a2,m,'accuse'))+')');if(!nk.alive)f.push('innocent NPC child lost with an honest bowl');if(!(a2.sung<s2))f.push('accuser no backlash');info.npcStats=window.__khN;restore()}
  /* 6 miscarriage causes */
  BAL.pgRisk.cap=100;BAL.pgRisk.khac=100;S.preg=3;S.fake=0;S.pgK=50;S.anthai=0;const mis0=S.misN||0;ev=pregMonthP(S);if(S.preg||(S.misN||0)!==mis0+1)f.push('cause miscarriage did not happen');if(!/đi lại nhiều/.test(ev))f.push('cause not named: '+ev.slice(0,100));restore();
  S.preg=3;S.pgK=7;const [x7]=khPgRisk(S);S.pgK=0;S.pgR=0;S.pgS=0;S.suc=90;const [x0]=khPgRisk(S);if(x0!==0)f.push('careful play adds risk '+x0);info.risk7k=x7;S.preg=0;
  /* 7 thuốc thúc sinh */
  const man=(S.men||[])[0];S.preg=8;S.fake=0;S.trueFather=man?man.id:999;S.pregMismatch=false;S.khBook=0;S.pregWk=wk();S.nightLog=[wk()-4];S.out=false;
  if(khRecOff(S)!==1)f.push('recOff '+khRecOff(S));deal();const dc=deck.find(c=>c.n==="Uống thuốc thúc sinh");if(!dc)f.push('no drug card');else info.drugX=dc.x;
  S.khInd=1;BAL.preT.die9=0;const n3=S.kids.length;ev=pregMonthP(S);const k3=S.kids[n3];if(!k3)f.push('drug: no birth');else{if(k3.pre!==9)f.push('drug kid pre '+k3.pre);if(k3.dateOff)f.push('drug birth shows lệch sổ')}restore();
  /* without the drug the same pregnancy looks a month late */
  S.preg=9;S.trueFather=man?man.id:999;S.pregMismatch=false;S.pregWk=wk();S.nightLog=[wk()-4];S.khInd=0;S.khOd=0;BAL.preT.od=0;const n4=S.kids.length;pregMonthP(S);const k4=S.kids[n4];if(k4&&k4.dateOff!=="od")f.push('affair w/o drug: dateOff '+(k4&&k4.dateOff));restore();
  /* 8 old save */
  const d=ser();delete d.S.khScar;delete d.S.khTmp;(d.R||[]).forEach(r=>{delete r.khScar;delete r.khTmp});const js=JSON.parse(JSON.stringify(d));deser(js);
  if(S.khScar==null)f.push('old save: khScar not set');if(!(sucCap(S)>0))f.push('old save cap');if(S.suc>sucCap(S))f.push('old save Sức above cap');
  render();const hc=document.getElementById('hud-suc');info.hudTitle=hc&&hc.title;if(hc&&!/tối đa/.test(hc.title))f.push('HUD title without ceiling');
  info.thy=typeof verdict;return{f,info}});
 console.log(JSON.stringify(L,null,1));if(errs.length)console.log('PAGE ERRORS',errs);
 await b.close();process.exit(L.f.length||errs.length?1:0)})();
