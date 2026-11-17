/* review/opt-pics (KIT §6.2) — every dialog option card = small act card, 3:4 picture LEFT, info RIGHT.
   usage: node dev/test/opt-pics.js <build page url> <outdir> [WxH ...] [--titles static.json[,bot.json]]
   1. CLASSIFY: every option title (dev/test/opt-pics-scan.py static list + titles a bot met, opt-render json "dyn" list [[title,count],…])
      → kitOptPic(title): how (act | log | rule | face | item | own | ph) + key → <outdir>/opt-pics-cls.json and a markdown table
      <outdir>/opt-pics-table.md (before/after by source and by meaning group; the titles still on the placeholder).
   2. LAYOUT at each size (design sizes 1180x820 and 755x1000 by default): approachOne visits, every festival (FESTEV), a person picker
      (evpick), an item picker (giftpick), the toilette Kính sự phòng (ksp), Thái hậu's birthday — FAIL when an option has no picture slot,
      the slot is not 76x76 (KIT_ACT_ART) or not LEFT of the text, a card is wider than its box, the page overflows, an option keeps a tiny portrait in its
      title, or there is a page error. Screenshot per dialog kind (<outdir>/optpic-<kind>-<WxH>.jpg).
   3. ZOOM: a tap on the picture opens #kpzoom and does NOT choose the option (the dialog stays). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const args=process.argv.slice(2);const ti=args.indexOf('--titles');const TITLES=ti>=0?args.splice(ti,2)[1].split(','):[];
const [PAGE,OUT,...SZ]=args;fs.mkdirSync(OUT,{recursive:true});const SIZES=SZ.length?SZ:['1180x820','755x1000'];
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(b,W,H){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitOptPic==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name&&kitPhActReady()&&typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE,null,{timeout:90000});await sleep(2000);
 await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;S.bac=300;S.suc=80;S.th=40;render()});
 return {ctx,p,errs}}
(async()=>{const b=await chromium.launch();const R={fails:[],cls:null,layout:{},zoom:null};
 /* ---- 1. classify ---- */
 if(TITLES.length){const M=new Map();for(const f of TITLES){for(const [n,c] of JSON.parse(fs.readFileSync(f))){const e=M.get(n)||{n,c:0};e.c+=c;M.set(n,e)}}
  const {p}=await boot(b,1180,820);
  const L=await p.evaluate(L=>L.map(e=>{const r=kitOptPic(e.n.replace(/…/g,"X"),null);return Object.assign(e,{how:r.how,key:r.key||""})}),[...M.values()]);
  R.cls=L;fs.writeFileSync(path.join(OUT,'opt-pics-cls.json'),JSON.stringify(L));
  const by={};for(const e of L)(by[e.how]=by[e.how]||[]).push(e);const grp={};for(const e of L)if(e.how==="rule")(grp[e.key]=grp[e.key]||[]).push(e.n);
  const tmpl=e=>/…|\{/.test(e.n);
  let md=`# Option pictures — before / after (review/opt-pics, KIT §6.2)\n\n${L.length} distinct option titles (static scan of dev/build + titles a bot met).\n`+
   `BEFORE (main f012058f3): no option card had a picture; options naming a person had a 22 px portrait icon beside the title (j25).\n\n`+
   `| picture source (AFTER) | titles | example |\n|---|---|---|\n`;
  const lab={act:"own act / choice picture (ACTS.json key, reused)",log:"Tuần lục meaning rule (ACTS.json log, reused)",rule:"meaning group (KIT_OPT_RULES)",face:"person picker → portrait",item:"item picker → item picture",own:"picture carried by the option",ph:"§59 placeholder (still lacks one)"};
  for(const h of ["act","log","rule","face","item","own","ph"])if(by[h])md+=`| ${lab[h]} | ${by[h].length} | ${by[h].slice(0,3).map(e=>e.n.slice(0,30)).join(" · ")} |\n`;
  md+=`\n## Meaning groups (rule) → picture\n\n| group picture | new? | titles | examples |\n|---|---|---|---|\n`;
  for(const [k,v] of Object.entries(grp).sort((a,b)=>b[1].length-a[1].length))md+=`| act-${k}.webp | ${k.startsWith("opt-")?"painted":"reused"} | ${v.length} | ${v.slice(0,4).map(s=>s.slice(0,28)).join(" · ")} |\n`;
  const ph=(by.ph||[]);md+=`\n## Still on the placeholder: ${ph.length} (${ph.filter(tmpl).length} are run-time templates "…" whose real title is resolved in play; person names from an old save resolve to portraits in play)\n\n`+ph.filter(e=>!tmpl(e)).map(e=>"- "+e.n).join("\n")+"\n";
  fs.writeFileSync(path.join(OUT,'opt-pics-table.md'),md);await p.context().close()}
 /* ---- 2. layout ---- */
 for(const sz of SIZES){const [W,H]=sz.split('x').map(Number);const {p,errs}=await boot(b,W,H);const out=[];
  const audit=async(kind,open)=>{const r=await p.evaluate(async([open])=>{try{Q.length=0;const m=(0,eval)(open);if(!m)return null;if(!Q.length)Q.push(m);Q[0].must=1;document.getElementById('modal').hidden=true;showModal()}catch(e){return{err:e.message}}
    await new Promise(r=>setTimeout(r,900));
    await Promise.all([...document.querySelectorAll('#modal .kaart img')].map(im=>{im.loading='eager';return im.complete?0:new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,8000)})}));
    const M=document.getElementById('modal');if(M.hidden)return null;const t=String(Q[0]&&Q[0].t||"").replace(/<[^>]+>/g,"");
    return {t,ovf:document.documentElement.scrollWidth>innerWidth+1,o:[...M.querySelectorAll('.opts:not(.nlopts) > button.ka')].map(b=>{const a=b.querySelector(':scope > .kaart'),bd=b.querySelector(':scope > .kabody');
     const ra=a&&a.getBoundingClientRect(),rb=bd&&bd.getBoundingClientRect(),rr=b.getBoundingClientRect(),box=b.parentElement.getBoundingClientRect();const im=a&&a.querySelector('img');
     return{n:((b.querySelector('.kan')||b).textContent||"").trim().slice(0,40),how:b.dataset.kopic||"",art:ra?[Math.round(ra.width),Math.round(ra.height)]:null,left:!!(ra&&rb&&ra.right<=rb.left+1),
      img:!!(im&&im.naturalWidth),tb:[rr.left,rr.top,rr.right,rr.bottom],artOut:!!(ra&&ra.bottom>rr.bottom+1),wide:rr.right>box.right+1||b.scrollWidth>b.clientWidth+2,mini:!!b.querySelector('.kan .md, .kan > img')}})}},[open]);
   if(!r)return;if(r.err){R.fails.push([sz,kind,"ERR",r.err]);return}out.push(Object.assign({kind},r));
   if(r.ovf)R.fails.push([sz,kind,"page overflow"]);
   for(const o of r.o){if(/^(Thôi|Lui|Đóng)$/.test(o.n)&&!o.art)continue;
    if(!o.art)R.fails.push([sz,kind,o.n,"no picture slot"]);else{if(Math.abs(o.art[0]-76)>1||Math.abs(o.art[1]-76)>1)R.fails.push([sz,kind,o.n,"picture box not 76x76 (KIT_ACT_ART)",o.art.join("x")]);if(!o.left)R.fails.push([sz,kind,o.n,"picture not left of the info"])}
    if(o.wide&&W>H)R.fails.push([sz,kind,o.n,"wider than its box"]);if(o.artOut)R.fails.push([sz,kind,o.n,"picture sticks out below its card"]);
    /* r1: two cards must never overlap (the person-dialog min-height:max-content squeezed the rows at 844x390 / 755x1000) */
    for(const q of r.o)if(q!==o&&q.tb&&o.tb&&q.tb[1]>o.tb[1]&&q.tb[1]<o.tb[3]-1&&q.tb[0]<o.tb[2]-1&&q.tb[2]>o.tb[0]+1)R.fails.push([sz,kind,o.n,"overlaps the next card",q.n]);if(o.mini)R.fails.push([sz,kind,o.n,"tiny portrait still in the title"])}
   await p.screenshot({path:path.join(OUT,`optpic-${kind.replace(/[^a-z0-9]+/gi,'-')}-${sz}.jpg`),quality:55,type:'jpeg'})};
  const seen=new Set();for(let i=0;i<60&&seen.size<4;i++){const t=await p.evaluate(()=>{const m=approachOne();if(!m||!m.t)return"";window.__m=m;return String(m.t).replace(/<[^>]+>/g,"").split("·")[0].trim()});if(!t||seen.has(t))continue;seen.add(t);await audit("visit "+t,"__m")}
  const FK=await p.evaluate(()=>Object.keys(FESTEV));for(const k of FK.slice(0,SIZES.length>2?3:FK.length))await audit("fest "+k,`Object.assign({who:pEmp(),ev:"fest"},FESTEV["${k}"]())`);
  for(const [k,pp] of [["evpick","{ix:S.inv.findIndex(e=>e&&!e.h)}"],["giftpick","{v:liveRivals(true)[0].id,ix:S.inv.findIndex(e=>e&&!e.h)}"],["ksp","{}"],["thbirthday","{}"],["vlget","{}"]])
   await audit("pend "+k,`(()=>{const d=mkP("${k}",${pp});if(!d||!d.o)return null;pushDil(d,"${k}");return Q[Q.length-1]})()`);
  /* ---- 3. zoom: opens, does not choose ---- */
  const z=await p.evaluate(async()=>{const a=document.querySelector('#modal button.ka.kopt > .kaart');if(!a)return{none:1};const q0=Q[0];a.click();await new Promise(r=>setTimeout(r,300));const zz=document.getElementById('kpzoom');
   const open=!!zz&&!zz.hidden;const kept=Q[0]===q0&&!document.getElementById('modal').hidden;if(zz)zz.click();await new Promise(r=>setTimeout(r,200));return{open,kept,closed:!zz||zz.hidden}});
  if(!z.open||!z.kept||!z.closed)R.fails.push([sz,"zoom",JSON.stringify(z)]);R.zoom=z;
  if(errs.length)R.fails.push([sz,"page errors",errs.slice(0,3).join(" | ")]);R.layout[sz]=out;await p.context().close()}
 fs.writeFileSync(path.join(OUT,'opt-pics.json'),JSON.stringify(R,null,1));
 console.log(JSON.stringify({fails:R.fails.length,first:R.fails.slice(0,12),zoom:R.zoom,dialogs:Object.fromEntries(Object.entries(R.layout).map(([k,v])=>[k,v.length]))},null,1));
 await b.close();process.exit(R.fails.length?1:0)})();
