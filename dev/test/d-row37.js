/* D-ROW37 test (OB 55 + daily noise): (A) the liking falls toward her that were typed straight into v.rel now go through the one door
   (j9 affAdd → joanpace ghét pace opDn + stat-pace): one incident (same buổi) never stacks; rollback BAL.oanPace.on = 0 gives the raw size;
   the static family scan dev/measure/ghet-door-scan.py exits 0. (B) trung y: once she chose «Vẫn đi», the next walks of the SAME buổi ask
   no more but still cost Danh (tyCharge); a new buổi asks again. usage: node dev/test/d-row37.js [dev/index.html] → last line ALL PASS n / FAIL n */
const {chromium}=require('playwright');const path=require('path');const {execFileSync}=require('child_process');
const PAGE=process.argv[2]||'dev/index.html';let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('PASS '+m)}else{fail++;console.log('FAIL '+m)}};
(async()=>{
 try{execFileSync('python3',[path.join(__dirname,'..','measure','ghet-door-scan.py')],{stdio:'pipe'});ok(true,'S1 ghet-door-scan: 0 FALL / 0 RAISE-OAN outside the doors')}catch(e){ok(false,'S1 ghet-door-scan: '+String(e.stdout||'').split('\n').slice(-2).join(' '))}
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});
 await ctx.addInitScript(`(function(){let s=4242;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();p.setDefaultTimeout(120000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tyOn==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;render()});
 /* (A) the ghét door */
 const A=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x&&!x.queen)||liveRivals(true)[0];const r={};const G=BAL.ghetHit||{tell:30,side:15};
  const fresh=()=>{v.rel=0;v.opa={};v.agw={};S.buoi=((S.buoi||0)+1)%4;if(S.buoi===0)S.tuan=(S.tuan+1)%3};
  fresh();r.see=typeof opDnSee==='function'?opDnSee(v,S,G.tell):Math.abs(+spSee('rel',-G.tell,v));affAdd(v,S,-G.tell);r.one=-aff(v,S);affAdd(v,S,-G.side);r.two=-aff(v,S);
  fresh();const on=BAL.oanPace.on,sp=BAL.stp&&BAL.stp.on;BAL.oanPace.on=0;if(BAL.stp)BAL.stp.on=0;affAdd(v,S,-G.tell);r.raw=-aff(v,S);BAL.oanPace.on=on;if(BAL.stp)BAL.stp.on=sp;
  r.tell=G.tell;r.side=G.side;r.keys=BAL.ghetHit?Object.keys(G).length:0;return r});
 ok(A.keys===9,'A0 BAL.ghetHit holds the 9 sizes ('+A.keys+')');
 ok(A.one>0&&A.one<=A.tell,`A1 «Mật báo» size goes through the door: ${A.one} (BAL ${A.tell})`);
 ok(Math.abs(A.see-A.one)<=0.5,`A4 the card prints what lands: shown ${A.see}, landed ${A.one}`);
 ok(A.two<=Math.max(A.one,A.side)+0.01,`A2 a second cause in the same buổi does not stack: ${A.two} ≤ max(${A.one}, ${A.side})`);
 ok(A.raw===A.tell,`A3 rollback BAL.oanPace.on=0 (+ stat-pace off) = the raw old size ${A.raw}`);
 /* (B) trung y: ask once per buổi */
 const B=await p.evaluate(async()=>{window.__accStay=1;window.__accSilent=1;const r={};const w=wdOf(S);w.y=null;/* rv: put her in trung y for sure (the old line kept her dressed when the seeded start had a robe → flaky B0..B5) */render();r.ty=tyOn(S);
  const K=['vuon','ngu','tyv','thu','nvp','ycv','bh'].filter(k=>{try{return accessOf(S,k).ok}catch(e){return false}});r.K=K;S.buoi=0;S.tyWent=null;
  const home=()=>{Q.length=0;document.getElementById('modal').hidden=true;S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.out=null};
  home();goTo(K[0]);r.card1=(Q[0]||{}).t||null;const o=(Q[0]&&Q[0].opts||[]).find(x=>x.n==='Vẫn đi');if(o){Q.shift();o.go()}await new Promise(z=>setTimeout(z,50));r.at1=S.place;
  home();const d0=S.danh;goTo(K[1]||K[0]);r.card2=(Q[0]||{}).t||null;r.at2=S.place;r.lost2=d0-S.danh;
  home();S.buoi=1;goTo(K[0]);r.card3=(Q[0]||{}).t||null;Q.length=0;return r});
 ok(B.ty,'B0 she is in trung y');
 ok(B.card1==='Ra ngoài khi mặc trung y?','B1 first walk asks: '+B.card1);
 ok(B.at1===B.K[0],'B2 «Vẫn đi» walks her there: '+B.at1);
 ok(!B.card2&&B.at2===(B.K[1]||B.K[0]),'B3 the next walk of the same buổi asks no more: card '+B.card2+', at '+B.at2);
 ok(B.lost2>0,'B4 …and still costs Danh: −'+B.lost2);
 ok(B.card3==='Ra ngoài khi mặc trung y?','B5 a new buổi asks again: '+B.card3);
 ok(errs.length===0,'E page errors: '+(errs[0]||0));
 await b.close();console.log(fail?`FAIL ${fail} / PASS ${pass}`:`ALL PASS ${pass}`);process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
