/* review/ghen-shown: ONE CORE (OD:L1267) for "every consort ghen +n" — the number a text shows === the jealousy ghenAll really adds,
   with the Emperor đa tình (× BAL.ghen.datinh) and without. usage: node dev/test/ghen-shown.js
   0. static: dev/measure/ghen_shown_scan.py → 0 BAD texts, 0 typed ghenAll numbers, 0 text keys no rule applies.
   1. unit: every BAL.ghen key + BAL.night.ghen, BAL.visit.ghen, BAL.psk.ghen, jcycle giauGhen: ghenAll(n) adds ghenN(n) to every rival; ghenN = round(n×datinh) / n.
   2. live: real cards/acts built by the game; the shown "ghen +N" is parsed, the option is run, every rival's real delta must equal N:
      pool() Múa trong yến tiệc · artActs() Kinh hồng vũ · deal() Báo tin có thai · j7 event phoenix (Để lời đồn lan xa) · j75 pregFind card (Báo tin cho Hoàng thượng) ·
      j20 bestow card · jvisit empnight Thắp đèn line (shown == ghenN(BAL.visit.ghen) == visAfter's real gain). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');const R=path.resolve(__dirname,'../..');
(async()=>{const fail=[];const sc=cp.spawnSync('python3',[R+'/dev/measure/ghen_shown_scan.py'],{encoding:'utf8'});const tot=(sc.stdout.match(/TOTAL .*/)||[''])[0];
 if(sc.status!==0)fail.push('scan: '+tot);console.log('scan',tot);
 const b=await chromium.launch({args:['--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
 const res=await page.evaluate(()=>{const out={fail:[],rows:[]};const F=m=>out.fail.push(m);const strip=x=>String(x||"").replace(/<[^>]+>/g,"");
  const quiet=()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}};
  SLOT=3;start();quiet();S.preg=0;S.out=0;
  const setDT=on=>{const T=S.emp.traits.filter(t=>t!=="datinh"&&!(on&&t==="lanhlung")&&!(on&&t==="chamchinh"));if(on)T.push("datinh");S.emp.traits=T};
  const base=()=>{const L=liveRivals(true);L.forEach(v=>v.ghen=20);return L};
  const delta=(L)=>{const d=[...new Set(L.map(v=>v.ghen-20))];return d.length===1?d[0]:"mixed "+d.join("/")};
  const GRP=/(?:phi tần|hậu cung|ai cũng|Lục cung)[^·]*?ghen \+(\d+)/;
  /* run(text, act): shown N from text; act() applies; real delta of every rival must be N */
  const chk=(dt,place,text,act)=>{const m=strip(text).match(GRP);if(!m){F(`${place} dt${dt}: no ghen number in "${strip(text).slice(0,120)}"`);return}
   const N=+m[1];const L=base();try{act()}catch(e){F(`${place}: ${e.message}`);return}const d=delta(L);out.rows.push({place,datinh:dt,shown:N,applied:d});if(d!==N)F(`${place} dt${dt}: shown ${N} applied ${d}`)};
  const runO=o=>{(o.go||(()=>{}))();if(o.fx&&Object.keys(o.fx).length)apply(o.fx)};
  for(const dt of [0,1]){setDT(dt);
   /* 1. unit */
   const K=Object.assign({},BAL.ghen);delete K.datinh;Object.assign(K,{night:BAL.night.ghen,visit:BAL.visit.ghen,psk:BAL.psk.ghen,giau:BAL.cyc&&BAL.cyc.rep?BAL.cyc.rep.giauGhen:4});
   for(const k in K){const n=K[k],want=Math.round(n*(dt?BAL.ghen.datinh:1));if(ghenN(n)!==want)F(`ghenN ${k} dt${dt}: ${ghenN(n)} != ${want}`);const L=base();ghenAll(n);const d=delta(L);if(d!==want)F(`ghenAll ${k} dt${dt}: ${d} != ${want}`)}
   /* 1b. her mood Hân hoan (jmood ×(1+BAL.mood.ghen)) rides inside ghenN too: shown == applied (review r1) */
   if(typeof mbS==="function"&&mbS()){const M=mbS(),v0=M.v;M.v=BAL.mood.band[3]+5;try{for(const k in K){const n=K[k],want=Math.round(Math.round(n*(1+BAL.mood.ghen))*(dt?BAL.ghen.datinh:1));if(ghenN(n)!==want)F(`mood ghenN ${k} dt${dt}: ${ghenN(n)} != ${want}`);const L=base();ghenAll(n);const d=delta(L);if(d!==want)F(`mood ghenAll ${k} dt${dt}: ${d} != ${want}`)}}finally{M.v=v0}}else F("mood: no mbS")
   /* 2. live */
   {const a=pool().find(x=>x.n==="Múa trong yến tiệc");if(!a)F("pool: no Múa trong yến tiệc");else chk(dt,"j2 pool Múa trong yến tiệc",a.x,()=>a.go())}
   {const v0=S.arts.vu;S.arts.vu=3;const a=artActs().find(x=>x.n==="Kinh hồng vũ");S.arts.vu=v0;if(!a)F("artActs: no Kinh hồng vũ");else chk(dt,"j2 artActs Kinh hồng vũ",a.x,()=>a.go())}
   {S.preg=2;S.hidden=true;S.fake=0;S.pregUnk=0;deal();const a=(deck||[]).find(x=>x&&x.n==="Báo tin có thai");if(!a)F("deal: no Báo tin có thai");else chk(dt,"j2 deal Báo tin có thai",a.x,()=>{S.hidden=true;a.go()});S.preg=0;S.hidden=false}
   {quiet();const c=mkEv("phoenix");const o=c&&(c.o||c.opts||[]).find(x=>x.n==="Để lời đồn lan xa");if(!o)F("phoenix: no option");else chk(dt,"j7 phoenix Để lời đồn lan xa",o.x,()=>o.go());quiet()}
   {quiet();S.preg=2;S.hidden=true;S.pregUnk=1;S.pregDisc=0;S.fake=0;pregFind();const c=Q.find(x=>x.t==="Thái y bắt mạch");const o=c&&(c.opts||[]).find(x=>x.n==="Báo tin cho Hoàng thượng");
    if(!o)F("pregFind: no Báo tin cho Hoàng thượng");else chk(dt,"j75 pregFind Báo tin cho Hoàng thượng",o.x,()=>{S.hidden=true;o.go()});S.preg=0;S.hidden=false;S.pregUnk=0;quiet()}
   {quiet();const pre=liveRivals(true);pre.forEach(v=>v.ghen=20);const lg=[],L0=log;log=function(h){lg.push(String(h));return L0.apply(this,arguments)};try{bestow(S,"night")}finally{log=L0}
    const c=Q.find(x=>x.t==="Thánh thượng ban thưởng");const d=delta(pre);
    for(const [w,tx] of [["card",c&&c.h],["log",lg.find(x=>/Ân thưởng/.test(x))]]){const m=strip(tx).match(GRP);if(!m){if(w==="log")F("bestow: no ghen in "+w);continue}
     out.rows.push({place:"j20 bestow "+w,datinh:dt,shown:+m[1],applied:d});if(+m[1]!==d)F(`bestow ${w} dt${dt}: shown ${m[1]} applied ${d}`)}quiet()}
   {quiet();const V=BAL.visit;const k=["base","cap"].map(x=>V[x]);V.base=1000;V.cap=100;S.visW=null;S.emp.visit=null;S.tonight=null;S.sung=50;S.an=30;S.preg=0;S.out=0;try{const b=cyBase(S);if(b&&S.tuan===b.t)S.tuan=(S.tuan+1)%3}catch(e){}
    const vr=visRoll();V.base=k[0];V.cap=k[1];const c=Q.find(x=>x.pid==="empnight");const o=c&&c.opts.find(x=>/^Thắp đèn hầu rượu/.test(x.n));
    if(!o)F("visit: no Thắp đèn line, roll "+vr+" Q "+Q.map(x=>x.pid||x.t).join(","));else chk(dt,"jvisit empnight Thắp đèn → visAfter",o.x,()=>{S.visLost=null;visAfter()});quiet()}
  }
  return out});
 fail.push(...res.fail,...errs.map(e=>'pageerror '+e));
 console.log('| place | đa tình | shown | applied |\n|---|---|---|---|');for(const r of res.rows)console.log(`| ${r.place} | ${r.datinh?'yes':'no'} | ${r.shown} | ${r.applied} |`);
 console.log(fail.length?'FAIL\n'+fail.join('\n'):'ALL OK');await b.close();process.exit(fail.length?1:0)})();
