/* review/tinh-net-word (MAIN 89 / mark-verify #4 note): ONE word for the trait row label on every person card: «Tính nết» (VANPHONG: nết = the traits; never «Tính cách»).
   Scan: the Hoàng thượng card (Chí tôn), Thái hậu card, her own card, the stage pop-up cards of the people at home (maid, ma ma, rival, ...), and the kit sample row: every visible text that is a
   trait-row label (own text «Tính cách» / «Tính nết» / «Tính tình») is listed; any «Tính cách» = FAIL. usage: node dev/test/tinh-net-scan.js <root of BUILT site> <fold|ipadAir>  (last line = summary) */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV]=process.argv;
const MEAS=()=>{const out=[];for(const e of document.querySelectorAll('body *')){if(!(e.offsetParent!==null||getComputedStyle(e).position==='fixed'))continue;const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
  const m=/^(Tính cách|Tính nết|Tính tình)\b/i.exec(own);if(m&&own.length<60)out.push(m[1].toLowerCase())}return out};
(async()=>{const T=await boot(ROOT,DEV);const g=T.g,p=T.p;const rows=[];const add=async v=>{(await g.evaluate(MEAS)).forEach(l=>rows.push([v,l]))};
 const close=()=>g.evaluate(()=>{try{Q.length=0;document.getElementById('modal').hidden=true;popIdx=null;renderStage()}catch(e){}});
 for(const [v,f] of [['emp card','showEmp()'],['Thái hậu card',"Q.unshift({t:'Thái hậu',cls:'pcm',h:kitThCardHTML()});showModal()"],['her own card','showSelf()']]){
  await g.evaluate(f=>{eval(f)},f);await p.waitForTimeout(900);await add(v);await close()}
 /* stage pop-up cards of the people at home */
 await g.evaluate(()=>{S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};popIdx=null;renderStage()});await p.waitForTimeout(900);
 const n=await g.evaluate(()=>curPeople().length);
 for(let i=0;i<n;i++){await g.evaluate(i=>{popIdx=null;renderStage();const e=document.querySelector('[data-p="'+i+'"]');if(e)e.click()},i);await p.waitForTimeout(800);await add('home person '+i)}
 await g.evaluate(()=>{popIdx=null;renderStage()});
 /* the kit sample row */
 const sample=await g.evaluate(()=>{try{const s=KIT_SAMPLES.find(x=>x.id==="§73.2");const h=typeof s.html==="function"?s.html():s.html;const d=document.createElement('div');d.innerHTML=h;return [...d.querySelectorAll('*')].map(e=>[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim()).filter(t=>/^Tính (cách|nết|tình)/i.test(t))}catch(e){return []}});
 sample.forEach(t=>rows.push(['kit sample §73.2',t.toLowerCase()]));
 const tab={};rows.forEach(([v,l])=>{const k=l.replace(/:.*/,'');tab[k]=(tab[k]||0)+1});const bad=rows.filter(r=>/tính cách/.test(r[1]));
 rows.forEach(r=>console.log(r.join(' | ')));console.log(JSON.stringify(tab));
 console.log(`tinh-net-scan ${DEV}: ${rows.length} trait labels, ${bad.length} «Tính cách», page errors ${T.errs.length}`);await T.close();process.exit(bad.length||T.errs.length||!rows.length?1:0)})();
