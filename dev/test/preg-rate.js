/* review/preg-rate (D57, owner 16/11 option 4 = 1+3): conception doubled (BAL.conc) + fertile window from her cycle (BAL.cyc.fert).
   Logic only (no UI part of its own: the notice is a Sổ ghi log line, the chance shows through the existing chanceLvl cells).
   Checks: BAL.conc = .5; for her and every NPC consort the phase is peak in the tuần after her cycle tuần, cyc in it, low in the other;
   conceiveCh in each phase = round(raw × BAL.cyc.fert[phase]) (raw = with fert = 1); pregnant / age ≥ 50 → no phase (× 1);
   the peak notice is logged once per peak tuần and never while pregnant; the phase is the same for a co-op friend entry (name only);
   an old save (no S.cyb.ft, no fert field) loads (deser) and works.  usage: node dev/test/preg-rate.js <index.html> */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2000);
 const r=await p.evaluate(()=>{const f=[];try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const F=BAL.cyc.fert;
  if(BAL.conc!==.5)f.push('BAL.conc '+BAL.conc);if(!(F.peak>1&&F.low<1&&F.cyc<F.low))f.push('fert shape '+JSON.stringify(F));
  const all=consorts().filter(q=>!(q.preg&&!q.fake)&&cyAge(q)<50);let n=0;
  for(const q of all){const t=cyBase(q).t;for(let tu=0;tu<3;tu++){S.tuan=tu;const h=cyPhase(q);const want=tu===t?"cyc":tu===(t+1)%3?"peak":"low";if(h!==want)f.push(`phase ${q.name||'me'} tuần ${tu}: ${h}≠${want}`);
    const keep=Object.assign({},F);BAL.cyc.fert={peak:1,low:1,cyc:1};const raw=conceiveCh(q);BAL.cyc.fert=keep;const c=conceiveCh(q);if(Math.abs(c-raw*F[want])>F[want]/2+.5)f.push(`conc ${q.name||'me'} ${want}: ${c} vs raw ${raw}`);n++}}
  const v=liveRivals(true).find(q=>cyAge(q)<50);if(v){const o=v.preg;v.preg=3;if(cyPhase(v))f.push('phase while pregnant');v.preg=o;const a=v.age;v.age=50;if(cyPhase(v))f.push('phase at 50');v.age=a}
  if(cyPhase({name:S.name})!==cyPhase(S))f.push('friend entry phase differs');
  /* trysts / affairs (reviewer r1): one function trystCh = BAL.trystC bounds on the raw chance, then the cycle factor; no typed roll left */
  {const T=BAL.trystC;const keep=Object.assign({},F);for(let tu=0;tu<3;tu++){S.tuan=tu;const h=cyPhase(S);BAL.cyc.fert={peak:1,low:1,cyc:1};/* a tryst is not a Kính sự phòng night: its chance never carries the ledger's BAL.nt.concF (jledger) */const nt0=BAL.nt&&BAL.nt.on;if(BAL.nt)BAL.nt.on=false;const raw=conceiveCh(S);if(BAL.nt)BAL.nt.on=nt0;BAL.cyc.fert=keep;
    const want=Math.min(T[1],Math.round(Math.max(T[0],Math.min(T[1],raw))*F[h]));if(trystCh(S)!==want)f.push(`trystCh ${h}: ${trystCh(S)} vs ${want}`)}
   /* main's j24/j95 wrap tryst / affairMonth: read the j22 bodies from the page source, not the wrappers */const src=[...document.scripts].map(x=>x.text).join('\n').split(/\nfunction (?=tryst\(|affairMonth\()/).slice(1).map(x=>x.split('\nfunction ')[0]).join('\n');if(/roll\((5|15)\)\)\{/.test(src)||!/trystCh/.test(src))f.push('tryst/affair roll not via trystCh')}
  /* notice */
  S.preg=0;S.fake=0;S.buoi=3;/* flip-entry: the card flip (and its peak notice) runs only at buổi tối */S.tuan=(cyBase(S).t+1)%3;const nL=()=>(S.logs||[]).filter(x=>/dễ đậu thai/.test(x)).length;
  const L0=nL();S.cyb=S.cyb||{};S.cyb.ft=null;flip();Q.length=0;const L1=nL();flip();Q.length=0;const L2=nL();
  if(L1!==L0+1)f.push('peak notice not logged '+L0+'→'+L1);if(L2!==L1)f.push('peak notice twice');
  S.cyb.ft=null;S.preg=2;flip();Q.length=0;if(nL()!==L2)f.push('notice while pregnant');S.preg=0;
  /* old save */
  const o=JSON.parse(JSON.stringify(ser()));if(o.S.cyb)delete o.S.cyb.ft;delete o.S.cyb;let ok=true;try{deser(o);conceiveCh(S);cyPhase(S);flip();Q.length=0}catch(e){ok=false;f.push('old save '+e)}
  return {f,n,oldSave:ok,sample:{peak:(S.tuan=(cyBase(S).t+1)%3,conceiveCh(S)),low:(S.tuan=(cyBase(S).t+2)%3,conceiveCh(S)),lvl:chanceLvl(conceiveCh(S))}}});
 console.log(JSON.stringify(r));console.log('page errors',errs.slice(0,5));console.log(r.f.length||errs.length?'FAIL':'PASS');await b.close()})();
