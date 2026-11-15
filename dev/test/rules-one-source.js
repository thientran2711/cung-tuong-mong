/* rules-one-source check: every promotion threshold the player sees is the number the game checks (BAL / hhNeed), the Đức note
   keeps the stat name, an old save (published build) loads, 0 page errors.
   usage: node dev/test/rules-one-source.js <base url dir> <W>x<H>@dpr   (serves <base>/_aa.html = new build, <base>/index.html = published main) */
const {chromium}=require('playwright');
const [,,BASE,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const boot=async(ctx,url,errs)=>{lg('boot '+url);const p=await ctx.newPage();p.setDefaultTimeout(600000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');await p.waitForTimeout(1500);lg('ready');return p};
const fresh=()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<8;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};
(async()=>{const b=await chromium.launch();const R={size:SZ};const errs=[],errsOld=[];
 const mk=()=>b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 /* 1. an old save made by the published build */
 const c0=await mk();const p0=await boot(c0,BASE+'/index.html',errsOld);
 const old=await p0.evaluate(`(()=>{(${fresh})();SLOT=3;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}quiet=false;try{NLP=null}catch(e){}save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o})()`);
 lg('old saved keys '+Object.keys(old).map(k=>k+':'+String(old[k]).length).join(','));await c0.close();
 const c1=await mk();await c1.addInitScript(o=>{if(!sessionStorage.getItem('__seeded')){for(const k in o)localStorage.setItem(k,o[k]);sessionStorage.setItem('__seeded','1')}},old);
 const p=await boot(c1,BASE+'/_aa.html',errs);
 R.old=await p.evaluate(()=>{document.getElementById('title').hidden=true;let ok=true;try{const d=loadSlot(3);if(!d)return{ok:'NO SAVE'};SLOT=3;quiet=true;deser(d);quiet=false;deal();showModal()}catch(e){ok='ERR '+e.message}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){ok='RENDER '+e.message}try{nextBuoi()}catch(e){ok='NEXT '+e.message}Q.length=0;if(m)m.hidden=true;render();return{ok,turn:S.turn,rank:S.rank}});
 lg('old loaded '+JSON.stringify(R.old));
 /* 2. the numbers: shown text == checked rule, and equal to the old effective rule, over many states */
 R.rules=await p.evaluate(`(()=>{(${fresh})();const out={bad:[],n:0};
  const oldEff=(p)=>{const hieu=has("hieuthao"),tn=hieu?40:50,sn=sonsOf(p).length>0,nd=S.heir&&S.heir.k&&S.heir.k.alive&&(S.heir.v===(p===S?null:p))?40:50;
   return {th:Math.max(sn?tn:tn+30,BAL.hhTh),duc:nd}};
  const heirKid=()=>S.kids.find(k=>k.alive&&k.sex==="m");
  for(let i=0;i<200;i++){S.rank=6;S.out=0;S.confined=0;S.th=Math.floor(Math.random()*101);S.duc=Math.floor(Math.random()*101);S.sung=99;S.danh=99;S.lastPromo=-99;
   const wantSon=i%2===0;S.kids=S.kids.filter(k=>false);if(wantSon){S.kids.push({name:"Thử",sex:"m",alive:true,age:3,hp:90,tal:30,fond:50})}
   S.heir=wantSon&&i%4===0?{k:S.kids[0],v:null}:null;
   for(const q of rivals)if(q.queen){q.queen=false;q.rank=Math.min(q.rank,5)}
   const N=hhNeed(S),O=oldEff(S);out.n++;
   if(N.th!==O.th||N.duc!==O.duc)out.bad.push(['need',N,O]);
   const L=promoReqP(S),tl=L.find(x=>/Thái hậu/.test(x[1])&&/hoàng tử/.test(x[1])),dl=L.find(x=>/^Đức /.test(x[1]));if(L.some(x=>/\d\/\d/.test(x[1])))out.bad.push(['fraction',L.map(x=>x[1])]);
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
 /* 3. the promotion panel + HUD chip render with the same numbers */
 R.ui=await p.evaluate(()=>{render();const t=document.body.innerText;const m=t.match(/Ngôi Hoàng hậu về sau cần:[^\n]*/);const d=document.getElementById('hud-duc');return{help:m&&m[0].slice(0,220),chip:d&&(d.getAttribute('title')||''),ovf:document.documentElement.scrollWidth>innerWidth+1}});
 console.log(JSON.stringify({R,errs,errsOld},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
