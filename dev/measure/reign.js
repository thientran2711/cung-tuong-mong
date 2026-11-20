// review/reign-road: the Emperor's side story (Tân quân lập uy) + her faction road, bots per side.
// usage: node dev/measure/reign.js <page.html> <sides: emp,th,quyen,ngoai,sw> <seeds> [months=44] [seed0=0]
//   inpage6 "sens" bot plays the life; every "rg" dialog is answered by the side policy (join that side, then take that side's options;
//   "sw" = join Hoàng thượng, switch to quyền thần at Chương 4). Prints one JSON line per seed. env CAP = seconds per seed (default 900).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,SIDES,NS,MO,S0]=process.argv;const N=+NS||4,MONTHS=+MO||44,seed0=+S0||0,PAR=+process.env.PAR||3;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(const SIDE of SIDES.split(','))for(let si=seed0;si<seed0+N;si++)jobs.push([SIDE,si]);
 const run=async([SIDE,si])=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${3000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8').replace('function modalStep(sens){','function modalStep(sens){if(window.__rgHook&&window.__rgHook())return true;'));
  await p.evaluate(side=>{window.__rgb={side,beats:[],sw:0};
   window.__rgHook=function(){const m=Q[0];if(m&&m.pid==='rg'&&m.opts&&m.opts.length&&document.getElementById('ov').hidden){
     const ok=m.opts.map((c,i)=>[c,i]).filter(([c])=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)&&!(c.fx&&c.fx.suc&&S.suc+c.fx.suc<15));let want=side;
     if(side==='sw')want=(S.reign.done.c4b||m.pp.b==='c4b')?'quyen':'emp';
     let pick=null;const L=ok.length?ok:m.opts.map((c,i)=>[c,i]);
     if(want==='ngoai'){pick=L.find(([c])=>/đứng ngoài|Đứng ngoài|Cáo bệnh|Đóng cửa|giữ mình/.test(c.n+c.j67))||L[L.length-1]}
     else{const mine=L.filter(([c])=>c.rgS===want);const act=mine.filter(([c])=>!/Đổi phe/.test(c.n)||side==='sw');
      pick=(act.length?act[Math.floor(Math.random()*act.length)]:null)||L.find(([c])=>!/Đổi phe|Khéo từ chối|Từ chối|không dám|Không dám|Lui/.test(c.n))||L[0]}
     window.__rgb.beats.push(m.pp.b+':'+pick[1]);if(/Đổi phe/.test(pick[0].n))window.__rgb.sw++;chooseM(pick[1]);return true}
    return false}},SIDE);
  const t0=Date.now();let dead=false;const pT={};
  while(true){const st=await p.evaluate(([m])=>{const n0=window.__res.length;window.__bot.step(m,200);const W=S.trieu&&S.trieu.rg;return{t:S.turn,dead:window.__res.length>n0,p:W?Math.round(W.p):null,bien:S.trieu?S.trieu.bien:null,kho:S.trieu?S.trieu.kho:null}},['sens']);
   if(st.t%6===0&&!pT[st.t])pT[st.t]=[st.p,st.bien,st.kho];
   if(st.dead){dead=true;break}if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){console.error('time cap seed',si);break}}
  const r=await p.evaluate(()=>{const W=S.trieu&&S.trieu.rg,R=S.reign||{};const ev=liveRivals(true).reduce((a,v)=>a+((v.evm&&v.evm.me)||0),0);
   const L=S.rgL||{};return{turn:S.turn,origin:S.origin.k,side:R.side,tr:R.tr,res:R.res||'',out:W?W.out:'',p:W?Math.round(W.p):null,ch:W?W.ch:0,beats:window.__rgb.beats.length,sw:R.sw||0,
    rank:S.rank,sung:S.sung,th:S.th,hh:S.hh,danh:S.danh,duc:S.duc,bac:S.bac,shield:S.shield||0,evOnMe:ev,lines:Object.keys(L).filter(k=>L[k]&&L[k].done).length,
    linesStep:Object.keys(L).filter(k=>k!=='_t').map(k=>k+':'+(L[k].st||0)).join(' '),famSide:(typeof rgFam==='function'?rgFam():null),
    members:{emp:rgMembers('emp').length,th:rgMembers('th').length,quyen:rgMembers('quyen').length},
    rgLogs:S.logs.filter(x=>/Tân quân lập uy|Tâm nguyện/.test(x)).length}});
  console.log(JSON.stringify({seed:si,sideBot:SIDE,dead,...r,pT,errs:errs.slice(0,3),sec:Math.round((Date.now()-t0)/1000)}));
  await ctx.close()};
 const W=[];for(let k=0;k<PAR;k++)W.push((async()=>{while(jobs.length)await run(jobs.shift())})());await Promise.all(W);
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
