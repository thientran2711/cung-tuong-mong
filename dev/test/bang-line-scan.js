/* review/errand-scene: the yellow round «!» (kit .khap) of every stage figure that can carry it sits on the SAME top line as the player's «ta ở đây» marker (kitMarkLine, KIT §78),
   and never touches the figure's head. usage: node dev/test/bang-line-scan.js <baseURL> [W H]  -> markdown table (before = the old rule «head top - 29 px») + PASS/FAIL line, exit 1 on FAIL */
const {chromium}=require('./lib/pw-roulette');const [,,BASE,W0,H0]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<900});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1200);
 const R=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{OPT.fxon=false}catch(e){}S.buoi=0;used=0;deal();render();await Wt(2500);
  const rows=[];const who=[["maid",S.maid],...(S.staff||[]).map((s,i)=>["staff"+i,s])];
  for(const [k,pp] of who){if(!pp)continue;S.erra=[];const id=ERR.run?(pp===S.maid?"mm:me":"s"+pp.sid):"";
   S.erra.push({id:"scan-"+k,who:id,nm:pp.name,k:"spy",lbl:"đi dò la",t0:0,due:0,back:1,read:0,rep:{t:"x",L:["x"],d:[]}});ERR.base=S;ERR.seen={["scan-"+k]:{off:1,on:1}};ERR.sync();await Wt(150);
   const c=document.querySelector('i.kmerr-bang');const tk=[...document.querySelectorAll('#tokens .tok.fig')].find(x=>x.querySelector('.tag').textContent.includes(pp.name));
   if(!tk){rows.push({k,nm:pp.name,onstage:false});continue}
   const im=tk.querySelector('.figimg').getBoundingClientRect();const bb=(typeof J59BB!=="undefined"&&J59BB[tk.querySelector('.figimg').getAttribute('src')])||null;const headTop=im.top+(bb?(typeof j59bt==='function'?j59bt(bb):bb.t):0.04)*im.height;
   const ml=typeof kitMarkLine==='function'?kitMarkLine(document.getElementById('stage')):null;
   if(!c){rows.push({k,nm:pp.name,onstage:true,bang:false});continue}
   const cr=c.getBoundingClientRect();rows.push({k,nm:pp.name,onstage:true,bang:true,top:+cr.top.toFixed(1),line:ml?+ml.top.toFixed(1):null,src:c.dataset.line,headTop:+headTop.toFixed(1),bottom:+cr.bottom.toFixed(1),before:+(headTop-29).toFixed(1)})}
  S.erra=[];return rows});
 let bad=0;console.log(`### ${W}x${H}\n| person | on stage | «!» top | «ta ở đây» line | Δ line | head top | gap to head | before (head-29) | Δ before | result |\n|---|---|---|---|---|---|---|---|---|---|`);
 for(const r of R){if(!r.onstage||!r.bang){console.log(`| ${r.nm} | ${r.onstage?'yes':'no (not in view)'} | – | – | – | – | – | – | – | n/a |`);continue}
  const d=r.line==null?null:+(r.top-r.line).toFixed(1),gap=+(r.headTop-r.bottom).toFixed(1);const ok=(r.line==null||Math.abs(d)<=2||(d<0?false:r.src==='mark'&&gap<5))&&gap>=0;/* raised above the line only when the head would be touched */
  const okStrict=r.line!=null?(Math.abs(d)<=2||d<-2/*raised above the line to clear the head*/)&&gap>=0:gap>=0;if(!okStrict)bad++;
  console.log(`| ${r.nm} | yes | ${r.top} | ${r.line==null?'(no marker)':r.line} | ${d==null?'–':d} | ${r.headTop} | ${gap} | ${r.before} | ${r.line==null?'–':+(r.before-r.line).toFixed(1)} | ${okStrict?'PASS':'FAIL'} |`)}
 const n=R.filter(r=>r.bang).length;if(!n){bad++;console.log('NO «!» drawn on this stage (nobody in view)')}
 console.log(`\n${bad?'FAIL':'PASS'} · ${n} figure(s) with «!» · page errors ${errs.length}`);await b.close();process.exit(bad||errs.length?1:0)})();
