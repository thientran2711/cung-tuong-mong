/* hall-names r2 (OD:L1474): residence lines carry the side-hall plaque; same-house notes say the shared palace ("cùng cung").
   usage: node dev/test/hall-names-lines.js <url of index.html> <W>x<H>@dpr <outdir> <tag>   (serves the repo at http://t.local/; exit 1 on failure)
   Writes <tag>-1-visit.jpg (palace screen of the second palace). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const ROOT=path.resolve(__dirname,'../..');
const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css'};
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82,animations:'disabled'})};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  /* she is a Phi, chủ vị of slot 0; two lower consorts live in her side halls. A second Phi heads slot 1 with one side resident. */
  const L=rivals.filter(v=>v.alive&&!v.out&&!v.queen);rivals.forEach(v=>{if(v.pal===0||v.pal===1)v.pal=null});S.rank=4;S.pal=0;
  const hd=L[0];hd.rank=4;hd.pal=1;const low=L.filter(v=>v!==hd&&rkOf(v)<PAL_HEAD);const mine=low.slice(0,2),hers=low.slice(2,3);
  mine.forEach(v=>v.resHead=key(S));hers.forEach(v=>v.resHead=hd.id);palFix();
  low.concat([hd]).forEach(v=>{try{S.known=S.known||{};S.known[kOf61(v)]=2;k61Meet(v,"gặp",2)}catch(e){}});/* known faces: names print (kitKnownName) */
  const M=low.filter(v=>sameHouse(S,v)),H=low.filter(v=>v.resHead===hd.id&&palaceOf(v)===palaceOf(hd));
  const W=S.where||(S.where={});M.forEach(v=>W[v.id]="home");S.place="home";used=0;tab="go";render();
  const pl=places().find(x=>x.k===palaceOf(hd));
  return {pal0:PALN[0],pal1:PALN[1],rvb:String(rvButtons(M[0],0)).replace(/<[^>]+>/g,' ').slice(0,160),note:(rvButtons(M[0],0).match(/Cùng [^:]*với ngươi/)||[])[0],mine:M.map(v=>({n:v.name,house:houseName(v),hall:resHallOf(v),cung:houseCung(v),same:sameHouse(S,v)})),
   hers:H.map(v=>({n:v.name,house:houseName(v),hall:resHallOf(v)})),listD:pl&&pl.d,hdHouse:houseName(hd)}});
 /* visit the second palace: the palace screen line names each side resident's hall */
 const vis=await p.evaluate(()=>{const hd=rivals.find(v=>v.pal===1&&rkOf(v)>=PAL_HEAD);const k=palaceOf(hd);residents(k).forEach(v=>{(S.where||(S.where={}))[v.id]=k});used=0;Q.length=0;S.place='home';window.__accStay=window.__accSilent=window.__j77etq=1;goTo(k);render();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  return {k,msg:S.visit&&S.visit.msg,sct:(document.getElementById('sc-t')||{}).textContent,ox:document.documentElement.scrollWidth>innerWidth}});
 for(let i=0;i<12;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.offsetParent&&/^\s*(Đã hiểu|Khâm thử|Tạ ơn|Nhận|Đóng)\s*$/.test(x.textContent));if(b){b.click();return 1}return 0});if(!c)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await p.waitForTimeout(1500);await shot('1-visit');
 const F=[];const ok=(c,m)=>{if(!c)F.push(m)};
 ok(r.mine.length>=1,'no housemate kept by palFix');r.mine.forEach(x=>{ok(x.hall&&/(hiên|trai)$/.test(x.hall),'no plaque for '+x.n);ok(x.house.startsWith(x.hall+' · '+r.pal0),'houseName '+x.house);ok(x.cung===r.pal0,'houseCung '+x.cung);ok(x.same,'not same house '+x.n)});
 ok(r.mine.length<2||r.mine[0].hall!==r.mine[1].hall,'two side halls differ');ok(r.hers.length>=1,'no side resident at palace 2');
 r.hers.forEach(x=>ok(x.house===x.hall+' · '+r.pal1,'hers houseName '+x.house));
 ok(r.listD&&r.hers.every(x=>r.listD.includes(x.hall+': ')),'palace list line '+r.listD);ok(!/thiên điện/.test(r.listD||''),'generic thiên điện in list');
 ok(r.note==='Cùng '+r.pal0+' với ngươi','card note '+r.note);ok(r.hers.every(x=>(vis.msg||'').includes(x.hall+')')),'visit line '+vis.msg);ok(!vis.ox,'overflow');ok(!errs.length,'page errors '+errs.join(' | '));
 console.log(JSON.stringify({TAG,r,vis,errs},null,1));console.log(F.length?'HALL-NAMES LINES FAIL\n'+F.join('\n'):'HALL-NAMES LINES OK');await b.close();process.exit(F.length?1:0)})();
