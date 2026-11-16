/* review/personality (D7): trọng + Thái hậu archetypes + one greeting rule.
   1) makes an OLD save with the main build (S.thTrait set, no S.thO.arch, no .trong anywhere), 2) loads it in the new build: archetype
   mapped from thTrait, everyone has 2 virtues, 3) greeting curves per archetype (36 mornings, every morning vs every 3rd), neglect month,
   4) person cards (Thái hậu / self / consort) at the test viewports: no page error, no horizontal overflow, "Trọng" chip present.
   usage: node dev/test/trong-check.js <old build file> <new build file> <shot dir or ""> */
const {chromium}=require('playwright');const fs=require('fs');const [,,OLDB,NEWB,SHOT]=process.argv;
const VPS=[[755,1000],[1000,755],[1180,820],[1366,1024],[844,390],[390,844]];
(async()=>{const b=await chromium.launch();const errs=[];
 /* 1. old save */
 let p=await b.newPage();p.on('pageerror',e=>errs.push('old:'+e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 await p.goto('file://'+OLDB,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(1500);
 const old=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;S.thTrait="Đa nghi";S.th=20;save();return JSON.stringify(ser())});
 await p.close();
 /* 2. load in the new build */
 p=await b.newPage();p.on('pageerror',e=>errs.push('new:'+e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 await p.goto('file://'+NEWB,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof loadSlot==='function');await p.waitForTimeout(1500);
 const r=await p.evaluate(d=>{const out={};localStorage.setItem(SK(2),d);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;
  out.mig={thTrait:S.thTrait,arch:thArch().n,thTr:trongOf("th"),me:trongOf(S),meTr:traitsOf(S),emp:trongOf(S.emp),maid:trongOf(S.maid)};
  out.rivals=liveRivals(true).map(v=>[v.name,traitsOf(v).join("/"),trongOf(v).join("+")]);
  out.det=liveRivals(true).every(v=>{const a=trongOf(v).join();delete v.trong;return trongOf(v).join()===a});
  /* virtue spread over 300 synthetic people */
  const cnt={};for(let i=0;i<300;i++)trongOf({id:1000+i,name:"x"+i,trait:"Nhu mì"}).forEach(v=>cnt[v]=(cnt[v]||0)+1);out.spread=cnt;
  /* greeting curves: 36 mornings */
  const save0=JSON.stringify(ser());const curve={};
  for(const k of Object.keys(TH_ARCH)){for(const every of [1,3]){deser(JSON.parse(save0));Q.length=0;S.thO=S.thO||{};S.thO.arch=k;S.th=0;S.grT=[];S.thO.emo=null;let sum=0,neg=0,G=[];
    for(let d=0;d<36;d++){S.turn=12+Math.floor(d/3);S.tuan=d%3;if(d%every===0){S.buoi=0;const a=talkOpts({kind:"th"})[0];const g=(a.w&&a.w.th)||0;G.push(g);if(g<=0)neg++;
      Math.random=(()=>{let s=d*7+1;return()=>((s=s*16807%2147483647)/2147483647)})();const b0=S.th;runOpt(a);sum+=S.th-b0}}
    curve[k+"/"+every]={th:S.th,first:G.slice(0,4).join(","),last:G.slice(-4).join(","),nonPos:neg}}}
  out.curve=curve;
  /* neglect month (Nghiêm khắc, no greeting) */
  deser(JSON.parse(save0));Q.length=0;S.thO.arch="nghiem";S.th=30;S.grT=[];S.tuan=2;S.turn=5;const t0=S.th;try{monthTick()}catch(e){out.mtErr=e.message}out.neglect=S.th-t0;Q.length=0;
  /* Hoàng hậu greeting card numbers + servant greet */
  deser(JSON.parse(save0));Q.length=0;S.buoi=0;const hh=talkOpts({kind:"hh",ref:rivals[0]}).find(a=>a.n==="Thỉnh an");out.hh={o:hh.o,w:hh.w,l:hh.l,x:hh.x};
  const th=talkOpts({kind:"th"})[0];out.th={o:th.o,w:th.w,l:th.l,x:th.x};out.dir=directActs().filter(a=>/^Thỉnh an/.test(a.n)).map(a=>[a.n,a.w,a.o]);
  out.topic=topicOpts(liveRivals(true)[1]).map(a=>a.n+": "+(a.x||""));
  return out},old);
 console.log(JSON.stringify(r,null,1));
 /* 3. cards at viewports */
 const ov=[];
 for(const [w,h] of VPS){await p.setViewportSize({width:w,height:h});
  for(const who of ["th","self","rv"]){const res=await p.evaluate(who=>{closeModal&&closeModal();Q.length=0;const v=liveRivals(true)[1];S.thO=S.thO||{};k61Know([S.thO,v],"t",true,3);S.thO.archK=1;
    if(who==="self")showSelf();else{const P=who==="th"?{kind:"th",name:"Thái hậu",col:"#c9a227"}:{kind:"rival",ref:v,name:v.name};Q.unshift({t:P.name,cls:"pcm",h:popCard(P,0)});showModal()}
    return new Promise(r=>setTimeout(()=>{const m=document.getElementById('modal');const txt=m.innerText;const chips=[...m.querySelectorAll('.kst-chip')].map(c=>c.innerText.replace(/\s+/g,' '));
     r({ov:document.documentElement.scrollWidth>innerWidth+1,trong:chips.filter(c=>/Trọng/.test(c)),net:chips.filter(c=>/nết/i.test(c)),raw:/Trọng/.test(txt)})},500))},who);
   ov.push([w+"x"+h,who,res.ov?"OVERFLOW":"ok",res.trong.join("|")||(res.raw?"(line)":"MISSING"),res.net.join("|")]);
   if(SHOT&&(w===755||w===844)&&who!=="rv")await p.screenshot({path:`${SHOT}/tr-${who}-${w}.png`})}}
 console.log(ov.map(x=>x.join("  ")).join("\n"));console.log("ERRS",JSON.stringify(errs));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
