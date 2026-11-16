/* review/face-reveal r1: panels she opens herself (Đã biết về X, Chứng cứ về X, Tâm trạng · X) on an unmet stranger must NOT reveal / meet her.
   usage: node dev/test/face-reveal-look.js <page url>  -> each: st0 == st1, met false, sil true */
const {chromium}=require('playwright');const URL=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 const r=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start();
  const W=t=>new Promise(r=>setTimeout(r,t));await W(1500);Q.length=0;document.getElementById('modal').hidden=true;
  const out={};const cands=liveRivals(true).filter(v=>!v.queen&&!sameHouse(S,v)&&!(S.met&&S.met[v.id]!=null));
  const tests=[['intel',v=>kitIntelPanel(v)],['evidence',v=>{kitEvidencePanel(v);showModal()}],['mood',v=>emoBox(emoKey(v))]];
  tests.forEach(([k,f],i)=>{const v=cands[i];if(!v){out[k]='no cand';return}const st0=k61St(v);try{f(v)}catch(e){out[k]='err '+e.message;return}
   const h=document.getElementById('modal').innerHTML;out[k]={shown:!document.getElementById('modal').hidden,st0,st1:k61St(v),met:S.met&&S.met[v.id]!=null,sil:/unknown-/.test(h)};Q.length=0;document.getElementById('modal').hidden=true});
  return out});
 console.log(JSON.stringify({r,errs}));await b.close()})();
