/* review/dialog-stack #66 (owner 21/11): NO info-chip cloud in any quest / request / phụ tuyến dialog. For EVERY quest template (T72) open the real offer dialog (PEND q72o via q72Offer)
   and count chips (.kchip) and require TWO tags on the picture (.ksart-tags: type + «Hạn N tuần») and the steps as kit rows «Bước n | …»; also the phụ tuyến chapter news (nroad "Tin trong cung · … · chương") as kit panels.
   usage: node dev/test/quest-chips-scan.js <root of BUILT site> <fold|ipadAir>  (exit 1 if any chip / old line)  */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV]=process.argv;
(async()=>{const T=await boot(ROOT,DEV);const g=T.g;
 const res=await g.evaluate(async()=>{const out=[];for(const t of T72){let r={id:t.id||t.tid||t.n,chips:-1,old:false,err:""};try{
   Q.length=0;const A=(()=>{try{const L=liveRivals(true);return L.find(x=>!x.queen)}catch(e){return null}})();
   const x=q72Make(t,null);if(!x){r.err="no make";out.push(r);continue}q72Offer(x,"");showModal();await new Promise(r=>setTimeout(r,60));
   const d=document.querySelector('#modal .dlg');r.chips=d?d.querySelectorAll('.kchip,.kpsec .kchip.n').length:-1;r.old=!d||!(d.querySelectorAll('.ksart-tags .ksart-tag').length===2||/Loại/.test((d.querySelector('.kqtrows')||{}).textContent||''))||!/Bước 1/.test(d.textContent)||/bước:/.test(d.textContent)||d.querySelector('.ksart-tags')&&/Hạn \d+ tuần/.test(d.querySelector('.kpkb')?d.querySelector('.kpkb').textContent:'');
   Q.length=0;document.getElementById('modal').hidden=true}catch(e){r.err=String(e).slice(0,80)}out.push(r)}return out});
 const made=res.filter(r=>!r.err),bad=made.filter(r=>r.chips>0||r.old);
 console.log(`templates ${res.length}, rendered ${made.length}, skipped ${res.length-made.length}`);bad.slice(0,10).forEach(r=>console.log('BAD',JSON.stringify(r)));
 console.log(`quest-chips-scan ${DEV}: ${made.length} offer dialogs, ${bad.length} with chips/old line, page errors ${T.errs.length}`);await T.close();process.exit(bad.length||!made.length||T.errs.length?1:0)})();
