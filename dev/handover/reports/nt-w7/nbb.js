const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.goto('file://'+process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForTimeout(600);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(600);await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const o={};const T=(k,f)=>{try{o[k]=f()}catch(e){o[k]='ERR '+e.message}};
T('tat',()=>ACT.tat.x);T('phat',()=>ACT.phatquy.x);T('rash',()=>ACT.rash.x);T('pet',()=>ACT.petcare.x);
T('aout',()=>[AOUT.tat,AOUT.phatquy,AOUT.rash,AOUT.petcare]);
// applied: real relAdd on two fresh consorts vs the shown range
T('apply',()=>{const L=rivals.filter(v=>v.alive&&!v.out);const a=L[0],t=L[1];const res=[];o.who=[a.name,t.name,typeof aaMulRange==='function'?aaMulRange(t,'slight'):0];o.tgtTxt=tatRelTxt(t);
 for(const sev of [1,2,3]){t.ro={};a.ro={};const f0=aff(t,a);SLAP.next=sev;const ok=ACT.tat.f(a,t);res.push({sev,oanTtoA:oan(t,a),oanAtoT:oan(a,t),aff:aff(t,a)-f0});t.slap=null}
 t.ro={};a.ro={};ACT.phatquy.f(a,t);res.push({phat:1,oanTtoA:oan(t,a),oanAtoT:oan(a,t)});o.tgt=AOUT.tat;return res});
return o});
console.log(JSON.stringify(r,null,1));console.log('errors',errs.length,errs.slice(0,3));await b.close()})();
