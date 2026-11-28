/* KK63 K-HAND-MAT family scan (law 3 + law 11; TMK-WARN F seat s21e): every option card's read-only copies — the hand plate (jkhand kitHandPlate)
   and the «!» overlay (kitOptInfo) — must SHOW every Được / Thành / Mất / Bại / Kèm / Tốn row the card's model holds.
   Corpus: every PEND dialog buildable here (mkP with guessed args, as dialog-dup-scan) in TWO passes: a consort game and a servant game
   (+ the servant bribe set cnvBribeOpts, the s21e card). Per card: model rows = the card's own source rows (.kb > .kr, minus kitOptFinal copies);
   shown = the same row visible (display ≠ none, has a box) in the copy. lost = model − shown.
   usage: node dev/test/kit-hand-mat-scan.js <root of BUILT site> <fold|ipadAir>   (exit 1 when lost > 0; last line = summary) */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV]=process.argv;
(async()=>{const T=await boot(ROOT,DEV);const g=T.g;
 const pass=async(mode)=>g.evaluate(async(mode)=>{try{j95bOn=()=>false}catch(e){}
  if(mode==="srv"){for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(isSrv())break}Q.length=0;document.getElementById("modal").hidden=true;render()}
  document.querySelectorAll('.klife,#curtain').forEach(e=>e.remove());
  const R=liveRivals(true);const v=R.find(x=>!x.queen&&x!==(typeof srvM==="function"&&srvM()))||R[1];
  const KEEP=["kr-duoc","kr-thanh","kr-mat","kr-bai","kr-kem","kr-ton"];const norm=t=>String(t||"").replace(/\s+/g," ").replace(/^(Được|Thành|Mất|Bại|Kèm|Tốn)\s*/i,"").trim();
  const vis=e=>e&&e.getClientRects().length>0&&getComputedStyle(e).display!=="none"&&getComputedStyle(e).visibility!=="hidden";
  const model=b=>{const kb=b.querySelector(".kb");if(!kb)return [];return [...kb.querySelectorAll(":scope > .kr")].filter(r=>!r.matches(".kdup,.kfill,.kdup0")&&KEEP.some(k=>r.classList.contains(k))).map(r=>({k:KEEP.find(k=>r.classList.contains(k)),t:norm(r.textContent)})).filter(x=>x.t&&!/^không$/.test(x.t))};
  const shown=(c,m)=>{const rows=[...c.querySelectorAll(".kr")].filter(r=>{let e=r,ok=true;while(e&&e!==c.parentElement){if(getComputedStyle(e).display==="none"){ok=false;break}e=e.parentElement}return ok});return m.filter(x=>rows.some(r=>r.classList.contains(x.k)&&norm(r.textContent)===x.t))};
  const out=[];const why=r=>{const hits=[];let e=r;while(e&&e.tagName!=='BODY'){if(getComputedStyle(e).display==='none'){for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(x){continue}const walk=L=>{for(const q of L){if(q.cssRules&&!q.selectorText)walk(q.cssRules);else if(q.selectorText&&q.style&&q.style.display==='none'){try{if(e.matches(q.selectorText))hits.push(q.selectorText.slice(0,200))}catch(x){}}}};walk(rs)}if(e.hidden)hits.push('[hidden] '+e.className);break}e=e.parentElement}return hits.join(' || ')||'not found / text differs'};
  const show=async(id,item)=>{try{Q.length=0;document.getElementById("modal").hidden=true;Q.push(item);showModal();await new Promise(r=>setTimeout(r,150));if(document.getElementById("modal").hidden)return;
   const cards=[...document.querySelectorAll("#modal button.kopt")];
   for(const b of cards){const m=model(b);if(!m.length)continue;const isLock=b.disabled||b.classList.contains("kdis");const name=((b.querySelector(".kan,b")||b).textContent||"").trim().slice(0,40);
    kitOptInfo(b);const z=document.getElementById("kpinfo");const si=z?shown(z.querySelector("button.kopinfo")||z,m):[];const wI=z?m.filter(x=>!si.includes(x)).map(x=>{const r=[...z.querySelectorAll('.'+x.k)][0];return r?why(r)+' :: '+r.textContent.slice(0,40):'no row'}):[];if(z)z.hidden=true;
    let sp=null;if(b.parentElement&&b.parentElement.classList.contains("khand")&&typeof kitHandPlate==="function"){kitHandPlate(b);const p=b.closest(".dlg").querySelector(":scope>.khplate");sp=p?shown(p.querySelector("button.kopinfo")||p,m):[];if(p)p.hidden=true}
    out.push({mode,id,name,lock:isLock,hand:sp!=null,model:m.length,mat:m.filter(x=>/mat|bai|kem/.test(x.k)).length,info:si.length,plate:sp?sp.length:null,whyI:wI,lostInfo:m.filter(x=>!si.includes(x)).map(x=>x.k+":"+x.t.slice(0,50)),lostPlate:sp?m.filter(x=>!sp.includes(x)).map(x=>x.k+":"+x.t.slice(0,50)):[]})}}catch(e){}};
  const ids=Object.keys(PEND);const args=[{v:v.id,a:v.id,t:v.id,x:v.id,id:v.id,r:v.id,h:"",m:1},{},{a:v.id,t:S.id,x:{}}];
  for(const id of ids){let d=null;for(const pp of args){try{d=mkP(id,Object.assign({},pp));if(d&&(d.o||d.opts))break;d=null}catch(e){d=null}}if(!d)continue;
   await show(id,{t:"x",h:d.t,opts:d.o||d.opts,who:d.who,pid:d.pid,pp:d.pp,kit:d.kit})}
  if(mode==="srv"&&isSrv()){const m=srvM();await show("cnvBribeOpts",{t:"x",h:"<p>probe</p>",who:pv(v),opts:cnvPend(S,cnvBribeOpts(S,v,m,BAL.coopBribe.pay))})}
  Q.length=0;document.getElementById("modal").hidden=true;return out},mode);
 const A=[...await pass("consort"),...await pass("srv")];
 const live=A.filter(x=>!x.lock);const lostI=live.reduce((s,x)=>s+x.lostInfo.length,0),lostP=live.reduce((s,x)=>s+x.lostPlate.length,0);
 const bad=live.filter(x=>x.lostInfo.length||x.lostPlate.length);bad.slice(0,40).forEach(x=>console.log("LOST",x.mode,x.id,"«"+x.name+"»",JSON.stringify({info:x.lostInfo,plate:x.lostPlate,why:x.whyI})));
 const tag=x=>x.id+"|"+x.name;const s21=A.find(x=>x.id==="cnvBribeOpts");if(s21)console.log("s21e card",JSON.stringify(s21));
 console.log(`SUMMARY ${DEV}: dialogs ${new Set(A.map(x=>x.mode+x.id)).size}, live cards with rows ${live.length} (hand ${live.filter(x=>x.hand).length}), model rows ${live.reduce((s,x)=>s+x.model,0)} (Mất/Bại/Kèm ${live.reduce((s,x)=>s+x.mat,0)}), lost «!» ${lostI}, lost plate ${lostP}, cards with a loss ${bad.length}, locked skipped ${A.length-live.length}, pageerrors ${T.errs.length}`);
 await T.close();process.exit(lostI+lostP?1:0)})().catch(e=>{console.error(e);process.exit(2)});
