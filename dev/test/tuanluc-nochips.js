/* review tuanluc-sync-r1 (OD:L1458(3), owner 17/11 ~03:15Z): Tuần lục = the literary line only; Được/Mất numbers live in the Sổ ghi.
   Whole-family scan: play scripted lives, and at the end of EVERY tuần build the real book (wkBookPages) and look at every page except the
   person relation table (KIT §52, stays): count number chips ({chips:[[label,number]]}, kitChips / kpChipify output) and signed numbers
   (+3 / −8) in any text, row or fact. Must be 0.  usage: node dev/test/tuanluc-nochips.js [lives=3] [weeks=8] [html=dev/index.html] */
const {chromium}=require('playwright');const path=require('path');
const LIVES=+(process.argv[2]||3),WEEKS=+(process.argv[3]||8),HTML=path.resolve(process.argv[4]||path.join(__dirname,'../index.html'));
(async()=>{const b=await chromium.launch();const tot={books:0,pages:0,chips:0,signed:0,ex:[],errs:[]};
 for(let L=0;L<LIVES;L++){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
  p.on('pageerror',e=>tot.errs.push(e.message.slice(0,160)));await p.route(/^https?:\/\//,r=>r.abort());await p.goto('file://'+HTML);await p.waitForTimeout(1500);
  const R=await p.evaluate(async([weeks,L])=>{const o={books:0,pages:0,chips:0,signed:0,ex:[],tuan:0};const sl=t=>new Promise(r=>setTimeout(r,t));
   const SIG=/(^|[\s>(:,·])[+\-−]\d/;const pl=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
   const look=pg=>{o.pages++;const W=(why,t)=>{if(o.ex.length<40)o.ex.push(pg.title+" | "+(pg.who&&pg.who.name||"")+" | "+why+": "+String(t).slice(0,400))};
    const walk=(x,k)=>{if(x==null||k==="rel"||k==="who"||k==="fig")return;
     if(k==="chips"&&Array.isArray(x)){for(const c of x){if(Array.isArray(c)&&typeof c[1]==="number"&&c[1]){o.chips++;W("chip",c.join(" "))}}return}
     if(typeof x==="string"){const t=pl(x);if(/class="[^"]*kchip/.test(x)&&SIG.test(t)){o.chips++;W("kchip",t)}else if(SIG.test(t)){o.signed++;W("signed",t)}return}
     if(Array.isArray(x)){x.forEach(y=>walk(y));return}if(typeof x==="object")for(const kk of Object.keys(x))walk(x[kk],kk)};
    walk(pg)};
   try{SLOT=3;const ti=document.getElementById('title');if(ti)ti.hidden=true;const OR=[...new Set(ORIGINS.map(o=>o.k))];window.__forceOrigin=OR[(L*3+1)%OR.length];start();Q.length=0;render();
    const e0=endTurn;endTurn=function(){o.tuan++;try{const P=wkBookPages();o.books++;(P.pages||P).forEach(look)}catch(e){o.err=String(e).slice(0,200)}return e0.apply(this,arguments)};
    const drain=async()=>{for(let j=0;j<16&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.floor(Math.random()*m.opts.length));else closeModal()}catch(e){Q.shift()}await sl(20)}};
    for(let i=0;i<weeks*40&&o.tuan<weeks&&!S.dead;i++){await drain();if(Q.length){Q.length=0;render()}
     try{tab='acts';render();const ix=(deck||[]).map((a,i)=>[a,i]).filter(([a])=>a&&!a.done&&!a.lock);for(let k=0;k<2&&ix.length;k++){const [a,i]=ix.splice(Math.floor(Math.random()*ix.length),1)[0];try{act(i)}catch(e){}await sl(10);await drain()}}catch(e){}
     try{const Lp=places().filter(p=>p.k&&p.k!==S.place);const q=Lp[Math.floor(Math.random()*Lp.length)];if(q){goTo(q.k);await drain()}}catch(e){}
     await drain();try{nextBuoi()}catch(e){try{Q.length=0;endTurn()}catch(e){}}await sl(20)}
   }catch(e){o.err=String(e&&e.stack||e).slice(0,300)}return o},[WEEKS,L]);
  if(R.err)tot.errs.push(R.err);for(const k of ["books","pages","chips","signed"])tot[k]+=R[k];tot.ex.push(...R.ex);await ctx.close()}
 await b.close();console.log(JSON.stringify(tot,null,1).slice(0,5000));
 console.log(`TUANLUC-NOCHIPS books ${tot.books} pages ${tot.pages} · number chips ${tot.chips} · signed numbers ${tot.signed} · errors ${tot.errs.length} · ${tot.books&&!tot.chips&&!tot.signed&&!tot.errs.length?"PASS":"FAIL"}`)})();
