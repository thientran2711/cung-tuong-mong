/* KC-ODDS-CHIP (27/11, law 7 + law 11): lists EVERY pre-palace (kc) option marked risky («có rủi ro» / «liều») that shows NO odds word,
   and every option that shows an odds word but is marked safe / carries two words. Runs the real built dev/index.html: builds every KCE card
   and every KCALT builder for each origin, full family alive, after the same PEND.kcE hint pass the player gets.
   usage: node dev/measure/kc-odds-scan.js <file:///…/dev/index.html> [--json out.json]   exit 1 when a risky option has no odds word. */
const {chromium}=require('playwright');const URL=process.argv[2];const JO=process.argv.indexOf('--json');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ORIGINS=(process.env.ORIGINS||'tt,dtq,muoi,thd,ch,td,cnv,nc,bd,pf').split(',');
(async()=>{const b=await chromium.launch();const rows=new Map();
 for(const o of ORIGINS){
  const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
  const p=await c.newPage();p.on('pageerror',()=>{});
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  const r=await p.evaluate(og=>{
   const out=[];const RISK=/rủi ro|liều/;const W=/Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Rất vững|Vững/g;
   const build=()=>{S.dead=false;S.origin=Object.assign({},S.origin,{k:og});kcInit()};
   const rec=(tag,op)=>{if(!op)return;let h=op.hint;try{if(typeof h==="function")h=h(1)}catch(e){h=""}
    const words=(String(op.j67||"").match(W)||[]).length;
    out.push({tag,n:op.n,risk:op.risk||"",oddsP:op.oddsP==null?null:op.oddsP,word:op.oddsP==null?"":word(op.oddsP),words,hint:String(h||"").slice(0,90)})};
   // KCE cards go through PEND.kcE (the hint/risk pass); fall back to the raw builder
   for(const key of Object.keys(KCE)){build();let d=null;try{d=PEND.kcE({e:key,s:1})}catch(e){try{d=KCE[key].b({e:key})}catch(e2){}}
    if(d)(d.o||[]).forEach((op,i)=>rec("KCE."+key+"#"+i,op))}
   for(const key of Object.keys(KCALT)){build();let L=[];try{L=KCALT[key]().map(x=>Array.isArray(x)?x[0]:x)}catch(e){}
    L.forEach((op,i)=>rec("KCALT."+key+"#"+i,op))}
   return out},o);
  for(const x of r){/* a card is only REACHABLE in its own origins: d_* = the cnv road, n_* = nc / bd / pf (an out-of-origin build has no kim / no sx, its odds closure is NaN and is never shown) */
   const nat=/^KC(?:E|ALT)\.d_/.test(x.tag)?o==="cnv":/^KC(?:E|ALT)\.n_/.test(x.tag)?/^(nc|bd|pf)$/.test(o):true;if(!nat)continue;
   rows.set(o+"|"+x.tag+"|"+x.n,Object.assign({origin:o},x))}
  await c.close()}
 await b.close();
 const all=[...rows.values()];const risky=all.filter(x=>/rủi ro|liều/.test(x.risk));const noOdds=risky.filter(x=>x.oddsP==null);
 const wrong=all.filter(x=>x.oddsP!=null&&x.words!==1);
 console.log(JSON.stringify({options:all.length,risky:risky.length,riskyNoOdds:noOdds.length,withOdds:all.filter(x=>x.oddsP!=null).length,oddsButWordsNot1:wrong.length}));
 for(const x of noOdds)console.log("NOODDS",x.origin,x.tag,"«"+x.n+"»",x.risk,"|",x.hint);
 for(const x of wrong)console.log("WORDS!=1",x.origin,x.tag,"«"+x.n+"»",x.words);
 if(JO>0)require('fs').writeFileSync(process.argv[JO+1],JSON.stringify(all,null,1));
 process.exit(noOdds.length||wrong.length?1:0)})();
