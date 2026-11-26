/* review/srv-rank — REAL-TAP video of the maid road at the cap: a trusted maid (Chủ tin 80) at her low master's cap with full Công lao
   taps her master on the stage → the talk list → «Xin chủ cho đi hầu cung khác» (LIVE: locked «Chủ tin dưới 60 mới dám xin»; branch: open)
   → taps it → the master's answer; then opens the Thân phận rows (Công lao / the cap line).
   usage: node dev/test/srv-rank-video.js <URL> <outdir> <WxH> [label]   → <outdir>/<label>-<WxH>.webm + step PNGs; prints a JSON line */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,OUT,SZ,LBL0]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);const LBL=LBL0||'run';fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const vdir=path.join(OUT,'v-'+LBL+'-'+SZ);fs.mkdirSync(vdir,{recursive:true});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',recordVideo:{dir:vdir,size:{width:W,height:H}}});
 await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,#klife,.krbox,#ktut,.ktip,#kmrew,#kdaytc{display:none!important}';document.head.appendChild(s)})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});await sleep(1500);
 const info=await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
  const L=liveRivals(true);let m=srvM();const lo=L.find(v=>rkOf(v)<4&&!v.queen);if(lo&&lo!==m)srvReassign("video",lo);m=srvM();Q.length=0;if(md)md.hidden=true;
  S.srv.rk=srvMax();S.srv.mp=srvMpNeed(S.srv.rk);S.tin=80;S.srv.lau=0;S.srv.lvCd=0;S.place="home";S.where=S.where||{};S.where[m.id]=palaceOf(m);/* her master is at home */S.visit=srvVisitOf("home");
  if(!S.visit.people.some(x=>x.sk==="mis")){S.visit.people.unshift({kind:"srv",sk:"mis",ref:m,name:m.name,ini:m.name.split(" ").pop()[0],col:RCOL[rkOf(m)],info:`${rkName(m)} · chủ nhân của ngươi · ${netTxt(m)}`});S.where=S.where||{};}
  S.visit.people=S.visit.people.filter(x=>x.sk==="mis"||x.sk==="sv").slice(0,3);render();
  return{m:m.name,mrk:rkOf(m),cap:SRK.maid[srvMax()],og:typeof spOutgrown==="function"?spOutgrown(m,S):null,pi:S.visit.people.findIndex(x=>x.sk==="mis")}});
 await sleep(1500);await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-1-stage.png`)});
 /* REAL TAP on her master's figure on the stage (#tokens .tok[data-p]) */
 const tapAt=async loc=>{const bb=await loc.boundingBox({timeout:4000}).catch(()=>null);if(!bb)return false;await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height*.4);return true};
 let pi=info.pi;for(let k=0;k<4&&!(pi>=0&&await p.locator(`#tokens button.tok[data-p="${pi}"]`).count());k++){pi=await p.evaluate(()=>{const m=srvM();let i=S.visit.people.findIndex(x=>x.sk==="mis");if(i<0){S.visit.people.unshift({kind:"srv",sk:"mis",ref:m,name:m.name,ini:m.name.split(" ").pop()[0],col:RCOL[rkOf(m)],info:"chủ nhân của ngươi"});i=0;render()}return i});await sleep(800)}
 let tapped=false;for(let k=0;k<5&&!tapped;k++){tapped=await tapAt(p.locator('#tokens button.tok',{hasText:info.m}).first());if(!tapped){await p.evaluate(()=>{const m=srvM();S.where[m.id]=palaceOf(m);S.place='home';S.visit=srvVisitOf('home');Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;render()});await sleep(1200)}}
 await sleep(1500);await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-2-talk.png`)});
 const opt=p.getByText('Xin chủ cho đi hầu',{exact:false}).last();const seen=await opt.count();let locked=null,res=null;
 if(seen){await opt.scrollIntoViewIfNeeded().catch(()=>{});await sleep(600);
  locked=await opt.evaluate(e=>{let x=e;for(let i=0;i<6&&x;i++){const f=getComputedStyle(x).filter||'';if(/grayscale|saturate\(0/.test(f)||x.matches('[disabled],.off,.lock,.locked,.kdim,[aria-disabled=true]'))return true;x=x.parentElement}return false}).catch(()=>null);const _old=()=>opt.evaluate(e=>{let x=e;for(let i=0;i<6&&x;i++){if(x.disabled||x.classList.contains('off')||x.classList.contains('lock')||x.getAttribute('aria-disabled')==='true')return true;x=x.parentElement}return false});
  await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-3-option.png`)});
  await tapAt(opt);await sleep(2000);
  /* a confirm button may follow (kit option card) */
  await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-3b-after-tap.png`)});
  res=await p.evaluate(()=>({mid:srvM()&&srvM().name,mrk:rkOf(srvM()),cap:SRK.maid[srvMax()],rk:SRK.maid[S.srv.rk],tin:S.tin|0,toast:(document.getElementById('rtoast')||{}).innerText||'',log:(S.log||[]).slice(-3).map(x=>String(x.t||x).replace(/<[^>]+>/g,'').slice(0,140))}));
  await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-4-result.png`)})}
 await sleep(1500);
 /* the next month: the next rung opens (exam card) when she moved up */
 const after=await p.evaluate(()=>{Q.length=0;try{const md=document.getElementById('modal');if(md)md.hidden=true;srvMonth();render()}catch(e){return{err:e.message}}return{ex:S.srv.ex&&S.srv.ex.to,rk:SRK.maid[S.srv.rk],cap:SRK.maid[srvMax()]}});
 await sleep(2000);await p.screenshot({path:path.join(OUT,`${LBL}-${SZ}-5-month.png`)});
 const v=p.video();await ctx.close();const vp=v?await v.path():null;const dst=path.join(OUT,`${LBL}-${W}x${H}.webm`);if(vp)fs.renameSync(vp,dst);
 console.log(JSON.stringify({LBL,SZ,info,tapped,seen,locked,res,after,errs:errs.slice(0,3),video:dst}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
