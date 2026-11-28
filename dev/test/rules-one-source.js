/* rules-one-source check: every promotion threshold the player sees is the number the game checks (BAL / hhNeed), the Đức note
   keeps the stat name, the ONE CORE constants (BAL.time/lot/walk/sneak/age/night, mirrors BL/SEATCAP/WVAL) are what texts and rules
   print and check (§2b, perturbation), an old save (published build) loads, 0 page errors. Static half: dev/test/one-core-guard.js.
   usage: node dev/test/rules-one-source.js <base url dir> <W>x<H>@dpr   (serves <base>/_aa.html = new build, <base>/index.html = published main) */
const {chromium}=require('playwright');
const [,,BASE,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const boot=async(ctx,url,errs)=>{lg('boot '+url);const p=await ctx.newPage();p.setDefaultTimeout(600000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&window.__ctmBuilt===1);/* real condition (the game script ran to its end), not a 1.5 s timer */lg('ready');return p};
const fresh=()=>{try{localStorage.clear()}catch(e){}window.__nlInner=1;for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.getElementById('title').hidden=true;for(let i=0;i<8;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};
(async()=>{const b=await chromium.launch();const R={size:SZ};const errs=[],errsOld=[];
 const mk=()=>b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 /* 1. an old save made by the published build */
 /* the old save is made at the Fold size (the published build's landscape start may wait on the identity screen); it is loaded at the size under test */
 const c0=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});const p0=await boot(c0,process.env.OLD_URL||BASE+'/index.html',errsOld);
 const old=await p0.evaluate(`(()=>{(${fresh})();SLOT=3;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}quiet=false;try{NLP=null}catch(e){}save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o})()`);
 lg('old saved keys '+Object.keys(old).map(k=>k+':'+String(old[k]).length).join(','));await c0.close();
 const c1=await mk();await c1.addInitScript(o=>{if(!sessionStorage.getItem('__seeded')){for(const k in o)localStorage.setItem(k,o[k]);sessionStorage.setItem('__seeded','1')}},old);
 const p=await boot(c1,BASE+'/_aa.html',errs);
 R.old=await p.evaluate(()=>{document.getElementById('title').hidden=true;let ok=true;try{const d=loadSlot(3);if(!d)return{ok:'NO SAVE'};SLOT=3;quiet=true;deser(d);quiet=false;deal();showModal()}catch(e){ok='ERR '+e.message}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){ok='RENDER '+e.message}try{nextBuoi()}catch(e){ok='NEXT '+e.message}Q.length=0;if(m)m.hidden=true;render();return{ok,turn:S.turn,rank:S.rank}});
 lg('old loaded '+JSON.stringify(R.old));
 /* 2. the numbers: shown text == checked rule, and equal to the old effective rule, over many states */
 R.rules=await p.evaluate(`(()=>{(${fresh})();const out={bad:[],n:0};
  /* ROW 9: the Thái hậu part is HER level (her archetype nết): with a son netTh("th","than2"), without netAt("th","than2",BAL.hhThNoSon / hhThNoSonHieu) */
  const oldEff=(p)=>{const hieu=has("hieuthao"),sn=sonsOf(p).length>0,nd=S.heir&&S.heir.k&&S.heir.k.alive&&(S.heir.v===(p===S?null:p))?40:50;
   return {th:sn?netTh("th","than2"):netAt("th","than2",hieu?BAL.hhThNoSonHieu:BAL.hhThNoSon),duc:nd}};
  const heirKid=()=>S.kids.find(k=>k.alive&&k.sex==="m");
  for(let i=0;i<200;i++){S.rank=6;S.out=0;S.confined=0;S.th=Math.floor(Math.random()*101);S.duc=Math.floor(Math.random()*101);S.sung=99;S.danh=99;S.lastPromo=-99;
   const wantSon=i%2===0;S.kids=S.kids.filter(k=>false);if(wantSon){S.kids.push({name:"Thử",sex:"m",alive:true,age:3,hp:90,tal:30,fond:50})}
   S.heir=wantSon&&i%4===0?{k:S.kids[0],v:null}:null;
   for(const q of rivals)if(q.queen){q.queen=false;q.rank=Math.min(q.rank,5)}
   const N=hhNeed(S),O=oldEff(S);out.n++;
   if(N.th!==O.th||N.duc!==O.duc)out.bad.push(['need',N,O]);
   const L=promoReqP(S),tl=L.find(x=>/Thái hậu/.test(x[1])&&/hoàng tử/.test(x[1])),dl=L.find(x=>/^Đức /.test(x[1]));if(L.some(x=>/\\d\\/\\d/.test(x[1])))out.bad.push(['fraction',L.map(x=>x[1])]);
   if(!tl||!tl[1].includes('(cần '+N.th+')'))out.bad.push(['thText',tl&&tl[1],N.th]);
   if(!dl||!dl[1].includes('(cần '+N.duc))out.bad.push(['ducText',dl&&dl[1],N.duc]);
   if(tl&&tl[0]!==(S.th>=O.th))out.bad.push(['thCheck',S.th,O.th]);
   if(dl&&dl[0]!==(S.duc>=O.duc))out.bad.push(['ducCheck',S.duc,O.duc]);
   if(L.some(x=>/Thái hậu với ngươi \\d+\\+/.test(x[1])))out.bad.push(['dupLine']);
   const w=ducWarnTxt({duc:-5});if(S.duc-5<N.duc&&w!=='Đức '+S.duc+' → '+(S.duc-5))out.bad.push(['ducWarn',w]);if(/còn \\d+:/.test(w)||/cần \\d+/.test(w))out.bad.push(['ducWarnName',w]);
   if(out.bad.length>8)break}
  S.duc=33;out.warn=ducWarnTxt({duc:-5});out.gloss=KIT_GLOSS["Đức"];out.bl=KIT_GLOSS["Bổng lộc"];out.hx=HX.duc;out.vp=VP.fix(ducWarnTxt({duc:-5}));
  S.rank=6;S.kids=[];out.reqNoSon=promoReqP(S).map(x=>x[1]);return out})()`);
 lg('rules done');
 /* 2b. ONE CORE (owner OD:L1267, review/one-core): the mirror tables equal BAL, and every moved text PRINTS the constant: each core
    number is set to an odd value, the texts / rules are read again and must show it, then BAL is put back (dev/test/one-core-guard.js
    is the static half: no second value, no typed core text, no new inline rule number) */
 R.core=await p.evaluate(()=>{const bad=[];const J=x=>JSON.stringify(x);const keep=J({time:BAL.time,lot:BAL.lot,walk:BAL.walk,sneak:BAL.sneak,srvAge:BAL.srvAge,age:BAL.age,night:BAL.night,pay:BAL.pay});
  if(J(BL)!==J(BAL.pay))bad.push(['BL≠BAL.pay',BL,BAL.pay]);for(const k in BAL.seat)if(SEATCAP[k]!==BAL.seat[k])bad.push(['SEATCAP≠BAL.seat',k]);
  if(J(WVAL)!==J(BAL.craftGift))bad.push(['WVAL≠BAL.craftGift',WVAL,BAL.craftGift]);
  const used0=used,suc0=S.suc,buoi0=S.buoi;
  try{Object.assign(BAL.lot,{bac:13,k:3});Object.assign(BAL.time,{khac:7,sucMin:11});BAL.pay[0]=41;Object.assign(BAL.night,{sung:9,an:6});
   Object.assign(BAL.sneak,{danh:17,heavy:23,seen:6});Object.assign(BAL.walk,{near:5,far:6,farWet:6});Object.assign(BAL.age,{betroth:15,wed:19,reign:17});
   const has=(name,txt,re)=>{if(!re.test(String(txt)))bad.push([name,String(txt).slice(0,160)])};
   has('gloss Quẻ',KIT_GLOSS["Quẻ"],/13 bạc và 3 khắc/);has('HX.lot',HX.lot,/13 bạc và 3 khắc/);has('gloss khắc',KIT_GLOSS["khắc"],/7 khắc/);has('HX.buoi',HX.buoi,/7 khắc/);
   has('gloss Bổng lộc',KIT_GLOSS["Bổng lộc"],/\(41–/);
   {/* ghen-shown-r1 nx(): best night = nightGain(q+v+2), worst = nightGain(q+v) with q 1, v = b + his mood (j8) */const v=1+[1,0,-1,-2][S.emp.mood],hi=nightGain(1+v+2),lo=nightGain(1+v);if(lo.sung<9||lo.an<6)bad.push(['night floor not from BAL.night',lo]);
    has('night card',nx(1),new RegExp('Sủng[ \u00a0]\\+'+sg(hi.sung)+', Ân tình \\+'+hi.an+'.*Sủng[ \u00a0]\\+'+sg(lo.sung)+', Ân tình \\+'+lo.an))/* sg-card (law 4 shown == applied): the card draws her Sủng as nightFx applies it, apply → sg(nightGain) (Hoàng thượng nồng nàn / lạnh lùng), marked with the no-break space (j1 SG_NB) */}{/* palace distance (jpdist, BAL.palDist.nightSung): her night Sủng + round(nightSung × far of where she lives) */const pdA=typeof pdNightAdd==='function'?pdNightAdd(S):0;if(nightG(0)!==9+pdA||nightA(0)!==6)bad.push(['nightG/A',nightG(0),nightA(0),'pd+'+pdA])}
   has('sneak pen',accSneakPen("vuon").txt,/Danh -17/);has('sneak pen heavy',accSneakPen("dtd").txt,/Danh -23/);if(accSneakPen("vuon").danh!==-17)bad.push(['sneak rule',accSneakPen("vuon")]);
   has('walk',travel(S.place==="home"?"home":S.place,S.place==="home"?"vuon":"home")+'',/^[56]$/);has('walk text',typeof walkFarK==="function"?walkFarK():'',/^6$/);
   used=7;if(can(1))bad.push(['can(1) with the buổi spent (BAL.time.khac)']);used=6;if(!can(1))bad.push(['can(1) with 1 khắc left (BAL.time.khac)']);
   used=0;S.suc=10;has('Sức floor',whyTime(2),/11/);if(can(2))bad.push(['can(2) with Sức under sucMin']);S.suc=12;if(!can(2))bad.push(['can(2) with Sức over sucMin']);
  }catch(e){bad.push(['ERR',e.message])}
  finally{const K=JSON.parse(keep);for(const k of ['time','lot','walk','sneak','srvAge','age','night'])Object.assign(BAL[k],K[k]);BAL.pay.splice(0,BAL.pay.length,...K.pay);used=used0;S.suc=suc0;S.buoi=buoi0}
  return{bad,n:16}});
 lg('core done '+JSON.stringify(R.core.bad));
 /* 3. the promotion panel + HUD chip render with the same numbers */
 R.ui=await p.evaluate(()=>{render();const t=document.body.innerText;const m=t.match(/Ngôi Hoàng hậu về sau cần:[^\n]*/);const d=document.getElementById('hud-duc');return{help:m&&m[0].slice(0,220),chip:d&&(d.getAttribute('title')||''),ovf:document.documentElement.scrollWidth>innerWidth+1}});
 console.log(JSON.stringify({R,errs,errsOld},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
