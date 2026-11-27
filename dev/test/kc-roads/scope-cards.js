/* SX-SCOPE-FIX (27/11): «ReferenceError: sx is not defined» — a card's odds closure read a person looked up inside the click handler.
   For every origin that has a pre-palace road (jkc tiểu thư roads + jkc2 cnv / nc / bd / pf), builds EVERY kcE card (KCE) and every
   KCALT option builder, twice: with the whole family alive and with the family absent (every kcR lookup null), and
   (1) evaluates each kitRiskOpt odds closure (a ReferenceError there used to be swallowed → the option lost its odds word),
   (2) clicks every option (a ReferenceError in the roll lambda was the play-stopper).
   Fails on any ReferenceError (any page error too). Other thrown errors (null person in a face etc.) are counted, not failed.
   usage: node dev/test/kc-roads/scope-cards.js <url of the built dev/index.html, e.g. file:///…/dev/index.html>   exit 1 on any ReferenceError */
const {chromium}=require('playwright');const URL=process.argv[2];const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ORIGINS=(process.env.ORIGINS||'tt,dtq,muoi,thd,ch,td,cnv,nc,bd,pf').split(',');
(async()=>{const b=await chromium.launch();const rep={origins:{},refErrors:[],pageErrors:[],cards:0,options:0,clicked:0,otherErr:0,noOdds:[]};
 for(const o of ORIGINS){
  const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await c.newPage();p.on('pageerror',e=>{if(/is not defined/.test(e.message))rep.refErrors.push(o+' pageerror: '+e.message.slice(0,160));else rep.pageErrors.push(o+': '+e.message.slice(0,160))});
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  const r=await p.evaluate(async og=>{
   const out={cards:0,options:0,clicked:0,otherErr:0,ref:[],noOdds:[]};
   // record every odds closure that throws inside kitRiskOpt (the old code swallowed it and dropped the odds word)
   const kro=window.kitRiskOpt;let curTag="";
   window.kitRiskOpt=function(opt,p,loss,end){if(typeof p==="function"){try{p()}catch(e){if(e&&e.name==="ReferenceError")out.ref.push(curTag+" odds: "+e.message)}}return kro.apply(this,arguments)};
   const build=(absent)=>{S.dead=false;S.origin=Object.assign({},S.origin,{k:og});kcInit();if(absent)for(const m of S.kc.fam)if(m.r!=="me")m.alive=0;};
   const note=(tag,e)=>{if(e&&e.name==="ReferenceError")out.ref.push(tag+": "+e.message);else out.otherErr++};
   const clickAll=(tag,mk)=>{/* mk(): fresh card options; click option i on a fresh build */
    let n=0;try{curTag=tag;n=(mk()||[]).length}catch(e){note(tag+" build",e);return}
    for(let i=0;i<n;i++){let opts;try{curTag=tag;opts=mk()}catch(e){note(tag+" build",e);continue}const op=opts&&opts[i];if(!op)continue;out.options++;
     if(op.risk&&/rủi ro|liều/.test(op.risk)&&op.oddsP==null)out.noOdds.push(tag+" #"+i+" «"+op.n+"»");
     try{if(typeof op.go==="function"){op.go();out.clicked++}}catch(e){note(tag+" #"+i+" click",e)}}};
   for(const absent of [false,true]){
    for(const key of Object.keys(KCE)){build(absent);out.cards++;
     clickAll((absent?"absent ":"")+"KCE."+key,()=>{const d=KCE[key].b({e:key});return d&&(d.o||[]).filter(o=>!o.dis)})}
    for(const key of Object.keys(KCALT)){build(absent);out.cards++;
     clickAll((absent?"absent ":"")+"KCALT."+key,()=>{const L=KCALT[key]();return L.map(x=>Array.isArray(x)?x[0]:x)})}}
   window.kitRiskOpt=kro;return out},o);
  rep.origins[o]={cards:r.cards,options:r.options,clicked:r.clicked,otherErr:r.otherErr,ref:r.ref.length,noOdds:r.noOdds.length};
  rep.cards+=r.cards;rep.options+=r.options;rep.clicked+=r.clicked;rep.otherErr+=r.otherErr;
  for(const x of r.ref)rep.refErrors.push(o+' '+x);for(const x of r.noOdds)rep.noOdds.push(o+' '+x);
  await c.close()}
 await b.close();
 console.log(JSON.stringify({origins:rep.origins,cards:rep.cards,options:rep.options,clicked:rep.clicked,otherErr:rep.otherErr,noOddsOptions:rep.noOdds.length,noOddsSample:rep.noOdds.slice(0,8),refErrors:[...new Set(rep.refErrors)],pageErrors:[...new Set(rep.pageErrors)].slice(0,5)},null,1));
 process.exit(rep.refErrors.length?1:0)})();
