/* review/dialog-dedup (owner 21/11 mark #85): a fact must never be printed twice in one dialog, and a warning / report reads messenger → ONE plain fact line → evidence → options.
   Scan: every PEND dialog that can be built here (mkP with guessed args) + the head-maid warning (maidWarn) + the j70 warning stages, rendered through the real showModal; the text of the dialog
   body (without the option cards) is cut into sentences / rows; a sentence of >= 18 letters that appears twice (same words, ignoring case / voice) = DUP.
   Also checks the warning order (messenger first, no boxed .kth card above it).
   usage: node dev/test/dialog-dup-scan.js <root of BUILT site> <fold|ipadAir>   (exit 1 on any DUP / bad order; last line = summary) */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV]=process.argv;
(async()=>{const T=await boot(ROOT,DEV);const g=T.g;
 const res=await g.evaluate(async()=>{try{j95bOn=()=>false}catch(e){}const out=[];const R=liveRivals(true);const v=R.find(x=>!x.queen)||R[1];const key=s=>String(s).replace(/<[^>]*>/g,"").replace(/\s+/g," ").toLowerCase().replace(/[“”"«».,;:!?()]/g,"").trim();
  const dups=(txt)=>{const segs=String(txt).split(/\n+|·|\. |; /).map(key).filter(x=>x.length>=18);const c={};segs.forEach(x=>c[x]=(c[x]||0)+1);return Object.keys(c).filter(x=>c[x]>1)};
  const show=async(id,item)=>{try{Q.length=0;document.getElementById("modal").hidden=true;Q.push(item);showModal();await new Promise(r=>setTimeout(r,120));const mb=document.getElementById("mb");if(!mb||document.getElementById("modal").hidden)return null;const c=mb.cloneNode(true);c.querySelectorAll(".opts,button.ka,.kopt,.kofold").forEach(e=>e.remove());return {text:c.innerText,cards:mb.querySelectorAll(".kth").length}}catch(e){return null}};
  const ids=Object.keys(PEND);const args=[{v:v.id,a:v.id,t:v.id,x:v.id,id:v.id,h:"",m:1},{},{a:v.id,t:S.id,x:{}}];
  for(const id of ids){let d=null;for(const pp of args){try{d=mkP(id,Object.assign({},pp));if(d&&d.t)break;d=null}catch(e){d=null}}if(!d)continue;
   const r=await show(id,{t:"x",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,kit:d.kit});if(!r)continue;const dp=dups(r.text);out.push({id,dups:dp,cards:r.cards,order:null})}
  /* the head maid's warning, built exactly as j24 maidWarn builds it, then the j70 transform */
  try{const b=bandOf(danger(v,S));const r=await show("maidWarn",{ev:1,t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} thì thầm: “Người bên cung ${v.name} dò hỏi giờ giấc. E là có ý không lành.”</p><p>${kitParse(`thành: biết ${v.name} có ý hại ngươi, mức ${BANDS[b][1]}`)}</p>`});
   if(r){thrify70&&0;const t0=r.text.replace(/\n+/g," | ");out.push({id:"maidWarn(raw)",dups:dups(r.text),cards:r.cards,order:null})}
   Q.length=0;Q.push({ev:1,t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} thì thầm: “Người bên cung ${v.name} dò hỏi giờ giấc. E là có ý không lành.”</p><p>${kitParse(`thành: biết ${v.name} có ý hại ngươi, mức ${BANDS[b][1]}`)}</p>`});thrify70();document.getElementById("modal").hidden=true;showModal();await new Promise(r=>setTimeout(r,200));
   const mb=document.getElementById("mb");const c=mb.cloneNode(true);c.querySelectorAll(".opts,button.ka,.kopt,.kofold").forEach(e=>e.remove());const tx=c.innerText;const whisper=tx.indexOf("thì thầm"),fact=tx.indexOf("chưa tới mức")>=0?tx.indexOf("chưa tới mức"):tx.indexOf("có thể hại");
   out.push({id:"WARNING(j70thr after maidWarn)",dups:dups(tx),cards:mb.querySelectorAll(".kth").length,order:whisper>=0&&fact>whisper&&mb.querySelectorAll(".kth").length===0})}catch(e){out.push({id:"WARNING",dups:["ERR "+e],cards:9,order:false})}
  return out});
 const bad=res.filter(r=>r.dups.length||r.cards>0&&r.id.startsWith("WARNING")||r.order===false);
 console.log(`dialogs scanned: ${res.length}`);bad.slice(0,15).forEach(r=>console.log('BAD',r.id,JSON.stringify(r.dups).slice(0,200),'boxedCards',r.cards,'order',r.order));
 console.log(`dialog-dup-scan ${DEV}: ${res.length} dialogs, ${bad.length} bad, page errors ${T.errs.length}`);await T.close();process.exit(bad.length||T.errs.length||!res.length?1:0)})();
