/* ================= jcol: BỘ SƯU TẬP -> DANH HIỆU + PHÚC DUYÊN (D49; owner 11/14: OD L45-46) =================
   Per life, S.col = every distinct item kind she has ever held (chest or worn). Reaching BAL.col.ms counts (20/50/100/200) gives a
   danh hiệu (kept in Sổ luân hồi, shown in its Bộ sưu tập section) and Phúc duyên (pdAdd, so a kiếp dở dang loses it like every other
   Phúc duyên of the life). Once per life: the grant is also written to a persistent ledger keyed by the life ("cung-colms"), so loading
   an earlier save of the same life never pays twice. Old saves: S.col is built from what she holds now, milestones already reached are
   granted once (one card). Per-player: nothing here is sent in co-op. Replaces the jearn stand-in (wdColInfo).
   UI: kitRows (rows67) in the existing reward card (kind "reward") and in the Sổ luân hồi page; no new part. */
const COLL_KEY="cung-colms";
function colLedger(){let d=null;try{d=store.get(COLL_KEY)}catch(e){}if(!d||typeof d!=="object")d={best:0,ms:{},lives:{}};d.ms=d.ms||{};d.lives=d.lives||{};return d}
function colLedgerSave(d){try{const k=Object.keys(d.lives);if(k.length>BAL.col.keep)k.slice(0,k.length-BAL.col.keep).forEach(x=>delete d.lives[x]);store.set(COLL_KEY,d)}catch(e){}}
/* unique life id stamped when the life starts (a same-name same-origin new life must not inherit the old life's once-only grants); old saves without it fall back to name|origin */
function colId(){return S&&S.origin?(S.colLid||`${S.name}|${S.origin.k}`):""}
if(typeof start==="function")(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&S.origin&&!S.colLid)S.colLid="L"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}catch(e){}return r}})();
function colHeld(){const out={};try{const w=wdOf(S);for(const sl of ["tram","y"])if(w&&w[sl]&&w[sl].k)out[w[sl].k]=1}catch(e){}
 (S.inv||[]).forEach(e=>{if(e&&e.k&&!e.h&&typeof IT!=="undefined"&&IT[e.k])out[e.k]=1});return out}
function colN(){return S&&S.col?Object.keys(S.col).length:0}
function colMsList(){return BAL.col.ms}
function colTitleOf(n){let t=null;for(const m of colMsList())if(n>=m[0])t=m;return t}
function colNext(n){return colMsList().find(m=>n<m[0])||null}
/* what the old stand-in returned, now real: {n, title, next} */
window.wdColInfo=function(){const n=colN(),t=colTitleOf(n),x=colNext(n);return{n,title:t?t[2]:null,next:x?{at:x[0],more:x[0]-n,title:x[2]}:null}};
let colBusy=false;
function colCheck(){if(!S||S.dead||colBusy||!S.origin||!S.name||(typeof NLP!=="undefined"&&NLP))return;colBusy=true;try{
 S.col=S.col||{};const h=colHeld();for(const k in h)S.col[k]=1;const n=colN();
 const L=colLedger(),id=colId();const mine=L.lives[id]=L.lives[id]||{};S.colMs=S.colMs||{};
 const got=[];for(const m of colMsList()){if(n<m[0])continue;if(mine[m[0]]){S.colMs[m[0]]=1;continue}
  mine[m[0]]=1;S.colMs[m[0]]=1;L.ms[m[0]]=(L.ms[m[0]]||0)+1;got.push(m)}
 if(n>(L.best||0))L.best=n;
 if(got.length||n>(mine.n||0)){mine.n=n;colLedgerSave(L)}
 if(!got.length)return;
 let pd=0;for(const m of got){pd+=m[1];try{pdAdd(m[1],`bộ sưu tập đủ ${m[0]} món, được danh hiệu «${m[2]}»`,"col_"+m[0])}catch(e){}}
 const top=got[got.length-1],nx=colNext(n);
 Q.push({t:"Bộ sưu tập",kind:"reward",who:pMe(),h:`<p>Trong rương đã có ${n} món khác nhau.</p>`+rows67([["Danh hiệu",got.map(m=>`«${m[2]}»`).join(", "),"g"],["Phúc duyên",`+${pd}`,"g"],["Đã tích",`${n} món`,"t"],nx?["Mốc kế",`«${nx[2]}» khi đủ ${nx[0]} món`,"t"]:["Mốc kế","Đã đủ mọi danh hiệu","t"]])+`<p class="past">Danh hiệu ghi vào Sổ luân hồi. Phúc duyên chỉ nhận một lần mỗi kiếp; kiếp dở dang thì mất.</p>`});
 setTimeout(()=>{try{const M=$("modal");if(M&&M.hidden&&Q.length)showModal()}catch(e){}},0)
 }catch(e){console.error(e)}finally{colBusy=false}}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{colCheck()}catch(e){}return r}})();
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{colCheck()}catch(e){}return r}})();
/* Sổ luân hồi: Bộ sưu tập section (kitRows); old books have no ledger -> empty section hidden unless a life is running */
function colBookHTML(){const L=colLedger();const any=Object.keys(L.ms).length||L.best;const live=S&&!S.dead&&S.origin;if(!any&&!live)return"";
 const R=[];const n=live?(colN()||0):0;
 if(live){const x=colNext(n);R.push(["Kiếp này",`${n} món${colTitleOf(n)?` · «${colTitleOf(n)[2]}»`:""}`,colTitleOf(n)?"g":"t"]);if(x)R.push(["Mốc kế",`«${x[2]}» khi đủ ${x[0]} món (còn ${x[0]-n})`,"t"])}
 const bt=colTitleOf(L.best||0);R.push(["Nhiều nhất",`${L.best||0} món${bt?` · «${bt[2]}»`:""}`,bt?"g":"t"]);
 for(const m of colMsList())R.push([`Đủ ${m[0]} món`,`«${m[2]}»${L.ms[m[0]]?` · ${L.ms[m[0]]} kiếp`:" · chưa đạt"}`,L.ms[m[0]]?"g":""]);
 R.push(["Ghi chú","Món đồ không mang sang kiếp sau; danh hiệu thì ở lại trong sổ."]);
 return `<h3>Bộ sưu tập</h3>`+rows67(R)}
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+colBookHTML()}catch(e){return h}}})();
/* the life's Sổ luân hồi line gets the title it reached */
(function(){const l0=lifeSave;lifeSave=function(f){const r=l0.apply(this,arguments);try{if(S&&S.origin){colCheck();const t=colTitleOf(colN());if(t&&typeof kpLifeNote==="function")kpLifeNote(`Danh hiệu: «${t[2]}»`)}}catch(e){}return r}})();
/* old saves: nothing to migrate, S.col is built from what she holds on the first check after load */
