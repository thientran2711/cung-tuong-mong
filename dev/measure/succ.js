// Kế vị / con cái: đo con chết, Thái tử, người nối ngôi bằng bot hợp lý (inpage5.js, hoặc inpage4.js).
// usage: node dev/measure/succ.js <lives> <out.json>   env: GAME=path/to/index.html PROTECT=1 (canh con + thái y tâm phúc) CAP=giây
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const target=+process.argv[2]||30,out=process.argv[3]||'succ.json';
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html');
const INP=process.env.INP||(fs.existsSync(path.join(M,'inpage5.js'))?'inpage5.js':'inpage4.js');
const INST=`(function(){const K=window.__kv={lives:0,deaths:{},pDeath:0,nDeath:0,pSonMo:0,pSonDie:0,nSonMo:0,nSonDie:0,pSon15:0,nSon15:0,heirSet:0,heirP:0,heirDich:0,heirTruong:0,deb:0,debWin:0,plots:0,plotAct:{},succ:{},born:0};
 const PROT=${process.env.PROTECT?1:0};
 const d0=kidDie;kidDie=function(k,why,mine){if(k.alive){const m=allKids().find(z=>z[0]===k);const p=m&&m[1]===null;K.deaths[why]=(K.deaths[why]||0)+1;if(p)K.pDeath++;else K.nDeath++;if(k.sex==="m"&&k.age<15){if(p)K.pSonDie++;else K.nSonDie++}}return d0.apply(this,arguments)};
 const m0=monthTick;monthTick=function(){try{if(S&&!S.dead){allKids().forEach(([k,v])=>{if(!k.alive||k.sex!=="m")return;if(k.age<15){if(v===null)K.pSonMo++;else K.nSonMo++}if(k.age===15&&!k.__c15){k.__c15=1;if(v===null)K.pSon15++;else K.nSon15++}});
   if(PROT&&S.kids.some(k=>k.alive)){if(!(S.kidGuard>0)&&S.bac>=20){S.bac-=20;S.kidGuard=2}if(!S.doctor&&S.bac>=50){S.bac-=50;S.doctor=1}}}}catch(e){}
  const r=m0.apply(this,arguments);try{const t=String(r||"");if(/Triều đình bàn lệ lập đích/.test(t)){K.deb++;if(/Hoàng thượng phế/.test(t))K.debWin++}if(/làm Thái tử \\(/.test(t)){K.heirSet++;if(/con của ngươi, làm Thái tử/.test(t))K.heirP++;if(/lập đích/.test(t))K.heirDich++;if(/lập trưởng/.test(t))K.heirTruong++}}catch(e){}return r};
 if(typeof kvOrder==="function"){const n0=npcAct;npcAct=function(v,t){const s=window.__kvS;const r=n0.apply(this,arguments);if(s&&s.v===v){K.plots++;K.plotAct[t===S?"vsPlayer":"vsNPC"]=(K.plotAct[t===S?"vsPlayer":"vsNPC"]||0)+1}return r}}
 const e0=emperorDies;emperorDies=function(){let h=null;try{h=S.heir&&S.heir.k&&S.heir.k.alive?(S.heir.v?"heir:npc":"heir:player"):"noheir"}catch(e){}const r=e0.apply(this,arguments);try{const hh=S.heir&&S.heir.k?(S.heir.v?"npc":"player"):"none";const k=h+">"+hh;K.succ[k]=(K.succ[k]||0)+1}catch(e){}return r};
 const o0=over;over=function(){K.lives++;return o0.apply(this,arguments)};
})();`;
(async()=>{
 const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 page.on('pageerror',e=>console.log('PAGEERR',e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.click('#slots button[data-new="1"]');
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null`);
 await page.evaluate(fs.readFileSync(path.join(M,INP),'utf8'));await page.evaluate(INST);
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(()=>window.__bot.step('sens',300));
  if(n>=target)break;if(Date.now()-t0>(+process.env.CAP||3000)*1e3){console.log('time cap');break}}
 const res=await page.evaluate(()=>({kv:window.__kv,res:window.__res}));fs.writeFileSync(out,JSON.stringify(res));
 const K=res.kv,L=res.res.filter(x=>x.fate);const hh=L.filter(x=>x.maxRank>=7).length,old=/Thái phi|Thái hậu|tiên đế|Tuẫn|Vương gia|Xuất gia|Lên ngôi/;
 const early=L.filter(x=>x.maxRank<7&&!old.test(x.fate)).length;
 const hz=(d,m)=>m?(Math.exp(-d/m*12*15)).toFixed(2):'-';
 console.log(JSON.stringify({lives:L.length,HH:(hh/L.length).toFixed(2),early:(early/L.length).toFixed(2),pDeath:K.pDeath,nDeath:K.nDeath,deaths:K.deaths,
  pSonYears:(K.pSonMo/12).toFixed(1),pSonDie:K.pSonDie,pSurv15:hz(K.pSonDie,K.pSonMo),nSonYears:(K.nSonMo/12).toFixed(1),nSonDie:K.nSonDie,nSurv15:hz(K.nSonDie,K.nSonMo),pSon15:K.pSon15,nSon15:K.nSon15,
  heirSet:K.heirSet,heirP:K.heirP,heirDich:K.heirDich,heirTruong:K.heirTruong,deb:K.deb,debWin:K.debWin,plots:K.plots,plotAct:K.plotAct,succ:K.succ,secs:Math.round((Date.now()-t0)/1000)}));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
