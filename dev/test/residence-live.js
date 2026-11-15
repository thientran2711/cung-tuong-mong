/* Live test of jres (residence rooms) on the real layout.
   usage: node dev/test/residence-live.js <W>x<H>@dpr <outdir> <tag>   (serves the repo itself at http://mock.local/, no server process)
   Shots: <tag>-1-thuongtai-home.jpg (Thường tại at home = Ngọc Thanh các), <tag>-2-tan-home.jpg (promoted to Tần → her own palace chính điện),
          <tag>-3-phoidien-visit.jpg (visit a low-rank consort: her phối điện with roommates who are home this buổi),
          <tag>-4-night.jpg (same room, tối). Prints JSON audit (scene per step, residenceOf, people on stage, errors, overflow). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const ROOT=path.resolve(__dirname,'../..');
const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 await ctx.route('http://mock.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  if(u==='/dev/index.html')return r.fulfill({status:200,contentType:MT.html,body:'<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><base href="/">'+fs.readFileSync(f,'utf8')});
  r.fulfill({status:200,contentType:MT[path.extname(f).slice(1)]||'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://mock.local/dev/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{const K=k61S();rivals.forEach(v=>K['r'+v.id]=3)}catch(e){}
  S.rank=1;S.pal=null;S.resHead=null;palFix();render()});
 await p.waitForTimeout(6000);
 const A=[];const audit=n=>p.evaluate(n=>{const im=document.getElementById('scimg');const bg=(im&&im.style.backgroundImage)||'';const r=residenceOf(S);
  return{n,scene:(bg.match(/img\/([^"')]+)\.webp/)||[])[1],room:resRoomName(r),part:r.part,pal:r.pal,rank:RANKS[S.rank].n,title:(document.querySelector('#sc-t .rt1')||{}).textContent,
   ppl:curPeople().map(x=>x.name),overflowX:document.documentElement.scrollWidth>innerWidth}},n);
 const shot=async n=>{await p.waitForTimeout(2600);await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kmov,.rtoast').forEach(e=>e.remove());popIdx=null;const pw=document.getElementById('popw');if(pw)pw.innerHTML='';render();if(typeof k3Phone==='function'&&k3Phone()&&typeof k3Home==='function')k3Home()});await p.waitForTimeout(1400);await p.evaluate(()=>{document.querySelectorAll('.kmov,.rtoast').forEach(e=>e.remove());if(typeof k3Phone==='function'&&k3Phone()&&typeof k3Home==='function')k3Home()});await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:84});A.push(await audit(n))};
 /* 1. Thường tại, no palace: Ngọc Thanh các */
 await p.evaluate(()=>{S.rank=1;S.pal=null;S.resHead=null;palFix();S.buoi=0;goTo('home')});await shot('1-thuongtai-home');
 /* 2. promoted to Tần → palace head; the room follows at once */
 await p.evaluate(()=>{S.rank=3;palFix();goTo('home')});await shot('2-tan-home');
 /* 3. visit a low-rank consort in her phối điện; make her roommates home this buổi */
 const vis=await p.evaluate(()=>{S.rank=1;S.pal=null;palFix();
  const low=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&rkOf(v)<PAL_HEAD);let v=null,mates=[];
  for(const x of low){const r=residenceOf(x);if(r.pal==null||!(r.part==='dong'||r.part==='tay'))continue;const m=roomResidents(r.pal,r.part);if(m.length>=2&&(!v||m.length>mates.length)){v=x;mates=m}}
  if(!v){/* no shared room this game: give one head two lower consorts (what palFix does with ≤3 per head) */
   const h=rivals.find(x=>x.alive&&!x.out&&!x.queen&&rkOf(x)>=PAL_HEAD&&x.pal!=null);const two=low.slice(0,2);if(!h||two.length<2)return{none:true};
   two.forEach(x=>x.resHead=key(h));v=two[0];const r=residenceOf(v);mates=roomResidents(r.pal,r.part)}
  S.where=S.where||{};mates.forEach(m=>{if(m!==S)S.where[m.id]=palaceOf(m)});
  used=0;S.suc=100;S.place='home';S.confined=0;const e0=window.accEtq;if(e0)window.accEtq=()=>false;try{visitPal(v.id)}finally{if(e0)window.accEtq=e0}return{v:v.name,room:resRoomName(residenceOf(v)),mates:mates.map(m=>m.name),place:S.place,want:palaceOf(v)}});
 await shot('3-phoidien-visit');
 await p.evaluate(()=>{const four=BUOI.length>=4;S.buoi=four?3:2;render()});await p.waitForTimeout(3000);await p.evaluate(()=>{render()});await shot('4-night');
 const bgs=await p.evaluate(()=>[...document.querySelectorAll('#stage *')].filter(e=>getComputedStyle(e).backgroundImage.includes('url')).map(e=>(e.id||e.className)+' '+getComputedStyle(e).backgroundImage.slice(-80)));console.error(JSON.stringify(bgs));
 console.log(JSON.stringify({TAG,vis,A,errs}));await b.close()})();
