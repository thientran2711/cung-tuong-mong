/* review/gift-ui (owner 11/15 "Sửa ảnh Triều chính" + LUẬT SỬA CẢ NHÓM): class scan for stand-in pictures.
   The bot (dev/measure/inpage4.js) plays real lives; every dialog it sees and every log line it writes is checked:
     · dialogs: the picture shown (#mb) — FAIL when it is ev-trieu-chinh-* and the dialog's id is not a court event (evArtCat ≠ trieu-chinh)
     · Tuần lục lines (kbkArt, ctx "me"): which picture each distinct line gets — counts of NO picture / own act picture / event category /
       the old catch-all "Có người đến" room (j24:co-nguoi-den) / Triều chính / a broken key ("img/act--.webp")
     · own dialog banners img/ev-<key>.webp shown (kitEvBanner)
   usage: node dev/test/pic-fallback-scan.js <build url> [steps=6] → JSON summary; exit 1 when a Triều chính stand-in or a broken key is seen */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,URL,ST]=process.argv;const N=+ST||6;
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=4242;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 /* ACTS_FILE=<local ACTS.json>: test a manifest before it goes to the CDN */
 if(process.env.ACTS_FILE)await ctx.route(/img\/ACTS\.json/,r=>r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(process.env.ACTS_FILE)}));
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(6000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  window.__lines=new Set();window.__dlg=[];const l0=log;log=function(t){try{window.__lines.add(String(t))}catch(e){}return l0.apply(this,arguments)};
  const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];const M=document.getElementById('modal');if(m&&M&&!M.hidden){
    const img=M.querySelector('#mb .kdlgart .ksart > img, #mb .kpsubj .ksart > img, #mb .kpsubj img');const src=img?(img.getAttribute('src')||"").split('/').pop():"";
    const id=typeof kitDlgId==="function"?kitDlgId(m):(m.pid||"");window.__dlg.push([id,String(m.t||"").replace(/<[^>]+>/g,"").slice(0,40),src,typeof evArtCat==="function"&&evArtCat(id)||""])}}catch(e){}return r};
  start()});
 await p.evaluate(INP);
 /* minigames: finish at once with a middling score (the bot cannot play them) */
 await p.evaluate(()=>{const o=openMG;openMG=function(k,l,cb){try{cb(2)}catch(e){}};if(S&&S.mg)S.mg=null});
 for(let i=0;i<N;i++)await p.evaluate(()=>{for(let j=0;j<10;j++){if(S&&S.mg){try{resumeMG()}catch(e){S.mg=null}}window.__bot.step('sens',30);if(S&&!S.dead&&!Q.length&&!S.mg){try{nextBuoi()}catch(e){}}}});
 const res=await p.evaluate(()=>{const dbg=[Q.length,Q[0]&&String(Q[0].t).slice(0,40),!!S.mg,S.buoi,typeof used!=="undefined"?used:-1,S.place,window.__iter,(window.__bot.extra()||{}).idle];const turn=S&&S.turn,lives=window.__res.length,logs=S&&S.logSeq;const P=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const lines=[...window.__lines];const C={lines:lines.length,none:0,act:0,cat:0,scene:0,khachDen:0,trieuChinh:0,broken:0};const ex={khachDen:[],trieuChinh:[],broken:[]};
  const kd=new Set(((EVART.categories["khach-den"]||{}).files)||[]),tc=new Set(((EVART.categories["trieu-chinh"]||{}).files)||[]);
  const F=kbkArt(lines.map(t=>({text:t})),"me");F.forEach((f,i)=>{const a=f.art||"";const t=P(lines[i]).slice(0,70);
   if(!a)C.none++;else if(/act--|act-\.webp|undefined/.test(a)){C.broken++;ex.broken.push(t)}else if(tc.has(a)||/ev-trieu-chinh/.test(a)){C.trieuChinh++;ex.trieuChinh.push(t)}
   else if(kd.has(a)){C.khachDen++;if(ex.khachDen.length<12)ex.khachDen.push(t)}else if(/img\/act-/.test(a))C.act++;else if(/img\/ev-/.test(a))C.cat++;else C.scene++});
  const D={dialogs:window.__dlg.length,trieuChinhStandIn:[],ownBanner:0,room:0,none:0};
  window.__dlg.forEach(([id,t,src,cat])=>{if(/ev-trieu-chinh/.test(src)&&cat!=="trieu-chinh")D.trieuChinhStandIn.push(id+" · "+t);
   else if(/^ev-/.test(src)&&typeof kitDlgKey==="function"&&src==="ev-"+kitDlgKey({pid:id})+".webp")D.ownBanner++;else if(!src)D.none++});
  D.trieuChinhStandIn=[...new Set(D.trieuChinhStandIn)];return{dbg,turn,lives,logs,book:C,ex,dlg:D}});
 console.log(JSON.stringify(Object.assign(res,{errs:errs.slice(0,5)}),null,1));await b.close();
 process.exit(res.book.trieuChinh||res.book.broken||res.dlg.trieuChinhStandIn.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
