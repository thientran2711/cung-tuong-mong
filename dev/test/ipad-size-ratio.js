/* review/ipad-size (owner OD 25/11 ~23:27Z: «Tại sao cái khung bên này nó to như vậy? Ở bên cái điện thoại tôi chơi nó đâu có to như vậy ... kiểm tra toàn bộ cái giao diện kiểu này»).
   KIT SIZE RATIO AUDIT: every kit part that sits ON a container (stage overlays, side column + rows, place name, rail, tab bars, cards, chips, top bar, pop-up frames)
   measured as a share of its container on the Fold (755x1000 portrait) and the iPad (1180x820 landscape + 820x1180 portrait), on every bottom tab.
   usage: node dev/test/ipad-size-ratio.js <url of dev/index.html> [out.json] [shotdir]
   Prints a table: part | container | Fold ratio | iPad L ratio | iPad P ratio | iPad/Fold. FAIL (exit 1) when a STAGE OVERLAY part (the parts that cover the
   scene: KIT_RATIO_STAGE) takes more than TOL x its Fold share of the stage height on an iPad (the owner's bug: the right column covers the iPad stage). */
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2]||'http://127.0.0.1:8765/dev/index.html';const OUT=process.argv[3]||'';const SHOT=process.argv[4]||'';
const TOL=+(process.env.TOL||1.15);const sleep=t=>new Promise(r=>setTimeout(r,t));
const DEV=[['fold',755,1000],['ipadL',1180,820],['ipadP',820,1180]];
/* part -> [selector, container selector, axis] ; axis h = height share, w = width share, a = area share */
const PARTS=[
 ['stage.rightcol','#stage #kshR','#stage','h',1],['stage.rightcol.w','#stage #kshR','#stage','w',0/* width = KIT_RCOLW 140 px, owner 17/11 06:45Z ruling: info only */],
 ['stage.rightcol.row','#stage #kshR .k3r','#stage','h',1],['stage.counters','#stage #kshR .kgfbtns','#stage','h',1],
 ['stage.placename','#stage #kpname','#stage','h',0/* text at the kit font size (owner 25/11: font per kit size): info only */],['stage.rail','#stage #krail','#stage','h',1],['stage.railbtn','#stage .krailb','#stage','h',1],
 ['stage.herecount','#stage .j59hchip','#stage','h',1],['stage.nametag','#stage .tok .tag, #stage #j59metag .tag','#stage','h',0/* text, kit font: info */],
 ['stage.more','#stage .j59more','#stage','h',1],['stage.entrychip','#stage #kpent .kchip','#stage','h',1],
 ['map.rightcol','.mapv #kshR','.mapv','h',0],['map.tag','.mapv .mspot .mlab','.mapv','h',0],
 ['topbar','#hud','body','h',0],['tabbar','#tabs','body','h',0],['tabbtn','#tabs button[data-tab]','body','h',0],
 ['subtabs','#panel .kcattabs','#panel','h',0],['subtab.btn','#panel .kcattabs button','#panel','h',0],
 ['actcard','#panel .ka','#panel','w',0],['actcard.h','#panel .ka','#panel','h',0],['chip','#panel .kchip','#panel','h',0],
 ['popup','#modal .dlg','body','a',0]];
const meas=()=>{const vis=e=>e&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>2&&e.getBoundingClientRect().height>2;
 return (window.__PARTS||[]).map(([k,sel,csel,ax])=>{const els=[...document.querySelectorAll(sel)].filter(vis);if(!els.length)return null;
  const e=els[0];const c=csel==='body'?{width:innerWidth,height:innerHeight}:(e.closest(csel)||document.querySelector(csel));if(!c)return null;
  const cr=c.getBoundingClientRect?c.getBoundingClientRect():c;if(!cr.width||!cr.height)return null;
  const mx=els.map(x=>x.getBoundingClientRect()).reduce((a,q)=>({w:Math.max(a.w,q.width),h:Math.max(a.h,q.height)}),{w:0,h:0});
  const r=ax==='h'?mx.h/cr.height:ax==='w'?mx.w/cr.width:(mx.w*mx.h)/(cr.width*cr.height);
  return [k,+r.toFixed(3),Math.round(mx.w),Math.round(mx.h),Math.round(cr.width),Math.round(cr.height),+parseFloat(getComputedStyle(e).fontSize).toFixed(1)]}).filter(Boolean)};
async function boot(b,W,H){const px=null;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1000);
 await p.evaluate(()=>{window.__bot=1;window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;quiet=true;tab="act";goTo("home");render();quiet=false;render()});
 for(let i=0;i<240;i++){const ok=await p.evaluate(()=>{const k=document.getElementById('kload');return !(k&&k.offsetParent)&&!!document.getElementById('kshR')});if(ok)break;await sleep(500)}
 await sleep(2500);await clean(p);return {ctx,p,errs}}
async function clean(p){await p.evaluate(()=>{const g=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent));if(g)g.click();const md=document.getElementById('modal');if(md&&!md.hidden){Q.length=0;md.hidden=true}
 document.querySelectorAll('[class^=km],[id^=kr]:not(#krail),.kchest,#kchest').forEach(e=>{if(getComputedStyle(e).position==='fixed')e.remove()});render()});await sleep(1200)}
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R={};const errsAll={};
 for(const [dv,W,H] of DEV){const {ctx,p,errs}=await boot(b,W,H);await p.evaluate(P=>{window.__PARTS=P},PARTS);R[dv]={};
  /* the stage first (on the Fold a 2nd tap on Hành sự swaps the stage for the act list) */
  {await sleep(1500);const m=await p.evaluate(meas);for(const row of m){const k=row[0];if(!R[dv][k]||row[1]>R[dv][k][1])R[dv][k]=row.concat(['stage'])}
   if(SHOT){fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/${dv}-stage.jpg`,type:'jpeg',quality:55})}}
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button[data-tab]')].filter(b=>b.getClientRects().length).map(b=>b.dataset.tab));
  for(const t of tabs){await p.evaluate(t=>{const bt=document.querySelector(`#tabs button[data-tab="${t}"]`);if(bt)bt.click()},t);await sleep(1800);await clean(p);
   const m=await p.evaluate(meas);for(const row of m){const k=row[0];if(k.startsWith('stage.'))continue;if(!R[dv][k]||row[1]>R[dv][k][1])R[dv][k]=row.concat([t])}
   if(SHOT){fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/${dv}-${t}.jpg`,type:'jpeg',quality:55})}}
  /* one kit pop-up: the identity card (menu) is page-type; use a plain notice frame */
  await p.evaluate(()=>{Q.push({t:'Thử khung',h:'<p>Một dòng chữ thử khung báo tin, đủ dài để xuống dòng trên điện thoại gập.</p>'});showModal()});await sleep(1500);
  {const m=await p.evaluate(meas);for(const row of m)if(row[0]==='popup')R[dv].popup=row.concat(['modal'])}
  errsAll[dv]=errs.slice(0,5);await ctx.close()}
 await b.close();
 const keys=[...new Set(Object.values(R).flatMap(o=>Object.keys(o)))];const fails=[];const rows=[];
 for(const k of keys){const f=R.fold[k],l=R.ipadL[k],q=R.ipadP[k];const part=PARTS.find(x=>x[0]===k)||[];const stage=part[4]||0;
  const rl=f&&l?+(l[1]/f[1]).toFixed(2):null,rp=f&&q?+(q[1]/f[1]).toFixed(2):null;
  rows.push({part:k,axis:part[3],fold:f&&f[1],ipadL:l&&l[1],ipadP:q&&q[1],LvsF:rl,PvsF:rp,px:{fold:f&&f.slice(2,7),ipadL:l&&l.slice(2,7),ipadP:q&&q.slice(2,7)},tab:{fold:f&&f[7],ipadL:l&&l[7]}});
  if(stage&&rl!=null&&rl>TOL)fails.push(`${k}: iPad landscape share ${l[1]} = ${rl}x the Fold share ${f[1]} (tol ${TOL})`);
  if(stage&&rp!=null&&rp>TOL)fails.push(`${k}: iPad portrait share ${q[1]} = ${rp}x the Fold share ${f[1]} (tol ${TOL})`)}
 console.log('part | axis | Fold | iPad L | iPad P | L/F | P/F');for(const r of rows)console.log([r.part,r.axis,r.fold,r.ipadL,r.ipadP,r.LvsF,r.PvsF].join(' | '));
 const out={rows,fails,errs:errsAll};if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));
 console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS (stage overlays within '+TOL+'x of the Fold share)');process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
