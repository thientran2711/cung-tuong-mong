/* Build line in the game menu (go-live kit, owner OD:L1370 (d)): title > Thiết lập row shows "mã <sha> · <time>"; its sub-screen
   "Sổ đổi mới" starts with "Bản đang chơi" (Mã / Lúc / Điều mới) + "Các lần trước" (≤ 10), kit rows only.
   Real device profiles (dev/test/lib/device.js), HOST mode = the built root index.html exactly as players get it.
   usage: bash dev/site/build_site.sh && node dev/test/build-line.js [outdir] [device ...]   (default fold ipadAir = 755x1000, 1180x820; exit 1 on any FAIL) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const OUT=process.argv[2]?process.argv[2]:require('path').resolve(__dirname,'../shots/build-line');fs.mkdirSync(OUT,{recursive:true});
const DEVS=process.argv.slice(3).length?process.argv.slice(3):['fold','ipadAir'];
let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const srv=await D.serveRoot(process.env.CTM_ROOT||undefined);const b=await chromium.launch();
 for(const dev of DEVS){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const p=await D.openHost(pg,srv.url);await p.waitForFunction(()=>window.CTM_NOTES_UI&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  /* the first-visit download cover (kload) is not what this test looks at: wait a little, then lift it */
  await p.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:8000}).catch(()=>{});await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  const bi=await p.evaluate(()=>window.CTM_BI);ok(bi&&bi.s&&bi.t&&bi.c,`${tag} window.CTM_BI present`,bi&&{s:bi.s,t:bi.t,c:bi.c,h:(bi.h||[]).length});
  await p.evaluate(()=>{document.querySelector('[data-tgo="opt"]').click()});await p.waitForTimeout(600);
  const row=await p.evaluate(()=>{const b=document.querySelector('#modal button[data-tgo="notes"]');const r=b&&b.closest('.kctl');return r?r.innerText.replace(/\s+/g,' '):null});
  ok(row&&/mã \S+ · \d\d\/\d\d\/\d{4} \d\d:\d\d/.test(row),`${tag} Settings row shows the build`,row);
  await p.evaluate(()=>document.querySelector('#modal button[data-tgo="notes"]').click());await p.waitForTimeout(700);
  const pn=await p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg');const s=M.querySelector('.kbuild');const hs=M.querySelector('.kbuilds');
   const priv=[...M.querySelectorAll('.kbuild *,.kbuilds *')].filter(e=>e.getAttribute('style')).length;
   const cut=[...M.querySelectorAll('.kbuild .krv,.kbuild .krl,.kbuilds .krl')].filter(e=>e.scrollWidth>e.clientWidth+1).length;
   return {now:s?s.innerText.replace(/\s+/g,' ').slice(0,160):null,hist:hs?hs.querySelectorAll('.kr').length:0,kitRows:!!(s&&s.querySelector('.kb.kpkb .kr .krl')),
    privStyle:priv,cut,pageOvf:document.documentElement.scrollWidth-innerWidth,dlgOvf:d?d.scrollWidth-d.clientWidth:0}});
  ok(pn.now&&/Mã/i.test(pn.now)&&/Điều mới/i.test(pn.now)&&pn.kitRows,`${tag} notes sub-screen starts with the build (kit rows)`,pn);
  ok(pn.privStyle===0&&pn.cut===0&&pn.pageOvf<=0&&pn.dlgOvf<=0,`${tag} no inline style, no cut label, no overflow`,{priv:pn.privStyle,cut:pn.cut,page:pn.pageOvf,dlg:pn.dlgOvf});
  await pg.screenshot({path:`${OUT}/build-line-${tag}.jpg`,type:'jpeg',quality:70});
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,3));
  await ctx.close()}
 await b.close();srv.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
