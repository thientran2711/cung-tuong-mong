// node resolve.js BASEURL inv.json out.json : runs the game's own picture choice (kbkCands / kitActKey) on every sample sentence
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const [,,BASE,INV,OUT]=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();p.setDefaultTimeout(180000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
 for(let i=0;i<60;i++){const ok=await p.evaluate(()=>typeof KIT_ACTS!=='undefined'&&KIT_ACTS.log&&KIT_ACTS.log.length>0&&typeof EVART!=='undefined'&&EVART&&EVART.categories);if(ok)break;await sleep(500)}
 const inv=JSON.parse(fs.readFileSync(INV,'utf8'));
 const R=await p.evaluate(inv=>{const res={acts:[],lines:[]};
  const pic=(t,ctx)=>{try{return kbkCands({text:t},ctx,"0:0").slice(0,3)}catch(e){return['ERR '+e.message]}};
  for(const a of inv.acts)for(const n of a.names){let k="";try{k=kitActKey(n)}catch(e){}let c="";try{c=kitActCat(n)}catch(e){}
   res.acts.push({f:a.f,l:a.l,kind:a.kind,n,key:k,cat:c,book:pic(n+".","me")})}
  const doLine=(src,f,l,t)=>{let ss=[];try{ss=kpSentences(t)}catch(e){ss=[t]}
   for(const s of ss){const tp=kpPlain(s).replace(/[\s ]+/g," ").trim();if(!tp||KBK_DELTA_ONLY.test(tp))continue;
    const w=/^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:/.test(tp)||KBK_WORLD.test(tp);
    res.lines.push({src,f,l,t:tp,world:w,pics:pic(tp,w?"world":"me")})}};
  for(const g of inv.logs)for(const t of g.alts)doLine('log',g.f,g.l,t);
  for(const g of (inv.rets||[]))for(const t of g.alts)doLine('ret',g.f,g.l,t);
  for(const o of inv.opts)for(const n of o.names)doLine('opt',o.f,o.l,(o.lg||n)+".");
  return res},inv);
 R.errs=errs;fs.writeFileSync(OUT,JSON.stringify(R));console.log('acts',R.acts.length,'lines',R.lines.length,'errs',errs.slice(0,3));await b.close()})();
