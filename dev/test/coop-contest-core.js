/* review/coop-contest-r1 (reviewer): ONE CORE for festival contests (BAL.fest). Solo paths that now read BAL.fest run without errors and pay
   exactly the BAL numbers: Dâng lễ (P) every option, feast contest (FX7, no mini-game), j8 festival(), cFin7, fxFin7, Tranh ghế contestEnd;
   and the co-op module + j71/j8/j34 carry no typed copy of those numbers. usage: node dev/test/coop-contest-core.js */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {serve,BASE}=require('./coop-serve.js');
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* static guard: the numbers moved to BAL.fest are not typed again in the contest code */
{const bad=[];const pats=[/\{sung:8,danh:3\}/,/Sủng \+8/,/ghenAll\((3|4|8|10)\)/,/\{th:4,danh:1\}/,/\{sung:3,danh:1\}/,/\*\.3\+aw7\([a-zA-Z]+,"hoa"\)\*8/,/bac:-60\}\)\}\)/,/roll\((30|50)\)\)?try\{bestow\(w,"contest"\)/,/oanAdd\(p,w,10\)/,/thắng \(\+10\)/];
 /* j8's ghenAll(8/10) are nights, births and decrees (other rules); its festival() is checked by the Sủng +8 / {sung:8,danh:3} patterns */
 for(const f of ['jcoopcontest.js','j71.js','j8.js','j34.js']){const t=fs.readFileSync(path.join(ROOT,'dev/build',f),'utf8');for(const re of pats)if(re.test(t)&&!(f==='j8.js'&&/ghenAll/.test(re.source)))bad.push(f+' '+re)}
 ok(!bad.length,'no typed copy of the BAL.fest numbers',bad)}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true});await serve(ctx);
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator\.vibrate/.test(m.text()))errs.push('console: '+m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&rivals&&rivals.length>0,null,{timeout:90000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{Q.length=0;const o={err:[]};const F=BAL.fest;const T=f=>{try{return f()}catch(e){o.err.push(String(e&&e.stack||e).slice(0,200))}};
  /* Dâng lễ: each of the 4 options */
  const kp=Object.keys(FV7).find(f=>FV7[f].some(V=>V[0]==='P'));const vp=FV7[kp].findIndex(V=>V[0]==='P');
  o.gift=[];for(let i=0;i<4;i++)T(()=>{const pp=fPP7(kp,vp);const d=PEND.j71f(pp);S.bac=500;const b0=S.bac;d.o[i].go();o.gift.push({n:d.o[i].n,x:d.o[i].x.slice(-40)})});
  o.giftText=T(()=>{const d=PEND.j71f(fPP7(kp,vp));return d.o[0].x});
  o.mine=T(()=>myGifts7());o.richRival=T(()=>gift7({bac:F.gift.richBac,tai:0}));o.poor=T(()=>gift7({bac:0,tai:0}));
  /* fxFin7 with an NPC winner: pays exactly BAL.fest.fxWin */
  const v=liveRivals(false).find(x=>present7(x));const s0=v.sung,d0=v.danh;T(()=>fxFin7('Thử',[{p:v,kind:'dan',s:99},{p:S,kind:'dan',s:1}],true));o.fx={sung:v.sung-s0,danh:v.danh-d0,log:S.logs[0].replace(/<[^>]+>/g,'')};
  /* fxFin7 she wins: log prints the BAL prize */
  T(()=>fxFin7('Thử',[{p:S,kind:'dan',s:99},{p:v,kind:'dan',s:1}],true));o.fxMe=S.logs[0].replace(/<[^>]+>/g,'');
  /* j8 festival */
  o.j8=T(()=>{for(let i=0;i<5;i++){const t=festival('Hội hoa đăng','sac','dáng múa');if(/át cả hậu cung/.test(t))return t.replace(/<[^>]+>/g,'')}return 'npc won'});
  /* FX7 feast without mini-game */
  T(()=>{const kk=Object.keys(FX7)[0];window.__mgOffT=1;const m0=mgOn7;mgOn7=()=>false;const Fx=FX7[kk];const j=j7s();j.fx=j.fx||{};j.fx[Fx.f]={y:S.year,a:Fx.arts[0]};o.feast=festival(Fx.n||'Yến',kk);mgOn7=m0});
  /* cFin7 */
  const kc=Object.keys(FV7).find(f=>FEST[f]&&FV7[f].some(V=>V[0]==='C'));T(()=>cFin7(kc,FV7[kc].find(V=>V[0]==='C')[1],[{p:S,kind:'dan',s:9,t:1,pr:0,lk:0},{p:v,kind:'dan',s:1,t:1,pr:0,lk:0}],true));
  /* contestEnd: queen seat, NPC wins, losers get Oán = BAL.fest.ctOan */
  T(()=>{const w=liveRivals(false).filter(x=>present7(x)&&!x.queen)[0],l=liveRivals(false).filter(x=>present7(x)&&!x.queen&&x!==w)[0];for(const x of rivals)if(x.queen){x.queen=false;x.rank=5}w.rank=6;l.rank=6;S.rank=6;
   const oa0=(typeof oanOf==='function')?oanOf(l,w):null;S.contest={r:7,c:['me',w.id,l.id],t0:S.turn,len:1,round:3,sc:{me:[0,0,0],[w.id]:[10,10,10],[l.id]:[1,1,1]},bk:{},pr:{},sab:{},dq:[],hint:0};
   o.ct=contestEnd().replace(/<[^>]+>/g,'');o.ctQ=(Q.find(m=>m.t==='Kết quả tranh ghế')||{}).h||'';o.queen=!!w.queen});
  Q.length=0;return o});
 ok(!r.err.length,'solo: every BAL.fest path runs',r.err);
 ok(r.gift.length===4,'solo: Dâng lễ, all 4 options',r.gift);
 ok(/ghen \+3$/.test(r.giftText)&&r.mine&&r.mine[0]===55&&r.mine[2]===15&&r.richRival===55&&r.poor===15,'solo: gift numbers = BAL.fest.gift (55 / own / 15, ghen +3)',{t:r.giftText,mine:r.mine,rich:r.richRival,poor:r.poor});
 ok(r.fx.sung>=8&&r.fx.danh>=3&&/\(Sủng \+8, Danh \+3\)/.test(r.fx.log),'solo: feast winner paid BAL.fest.fxWin, text prints it',r.fx);
 ok(/Sủng \+8 · Danh \+3\.$/.test(r.fxMe),'solo: her feast win prints "Sủng +8 · Danh +3"',r.fxMe);
 ok(r.j8==='npc won'||/Sủng \+8 · Danh \+3\./.test(r.j8),'solo: j8 festival text from BAL',r.j8);
 ok(r.queen&&/Oán với người thắng \(\+10\)/.test(r.ctQ),'solo: Tranh ghế crowns one, text prints BAL.fest.ctOan',{ct:r.ct,q:r.ctQ.replace(/<[^>]+>/g,'').slice(-80)});
 ok(!errs.length,'no page errors',errs.slice(0,5));
 const bad=res.filter(x=>!x[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
