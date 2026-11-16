/* ================= jrd_cnv: the four full roads of «Cung nữ tuyển vào cung» (cnv, servant start), chapters .5–.11 (ROAD_MAP.md §4.9) =================
   Pattern = jrd_tt.js. ROAD_MAP §8.4 decision (B3): the road stays 8 chapters; the rise to tiểu chủ happens INSIDE the roads (each road has a
   real path that raises «Hoàng thượng để ý», the game's own rise rule BAL.ntRise then offers the rise; cnv_mat .8 may raise her at once), so
   ms:len14 is no longer a middle chapter. Every chapter reads right whether she is still a maid or already raised (S.srv.risen); if she is
   still a maid when the road ends, chapter 12 is «Từ kẻ hầu thành tiểu chủ» (jend14.js). */

/* ---------- who holds the inner palace (review road-b3-r1 items 3/5) ----------
   "hh" = a Hoàng hậu sits (qOn), "th" = the seat is empty and the Thái hậu speaks for it, "emp" = both are gone: the Emperor's own word
   (through Nội vụ phủ / Thận hình ty). CNV_QK = the favour stat behind that voice: hh, th, or the Emperor's eye («Hoàng thượng để ý» while
   she serves — Sủng is 0 for a maid — and Sủng once raised). Odds that read this favour use CNV_QV, never S.hh directly. */
const CNV_QM=()=>{let q=true;try{q=qOn()}catch(e){}return q?"hh":S.thDead?"emp":"th"};
const CNV_QN=()=>({hh:"Hoàng hậu",th:"Thái hậu",emp:"Hoàng thượng"})[CNV_QM()];
const CNV_QON=()=>CNV_QM()!=="emp";/* a woman still holds the inner palace (beats where she acts in person) */
const CNV_QK=()=>{const m=CNV_QM();return m==="hh"?"hh":m==="th"?"th":(typeof isSrv==="function"&&isSrv()?"nt":"sung")};
const CNV_QV=()=>S[CNV_QK()]||0;

/* ---------- the road's mistress {mis} (review road-b3-r1 item 6) ----------
   {mis} is the woman the road is about, cast ONCE: S.st.f14.act.mis (saved with the life). j42 srvReassign gives a maid a new S.srv.mid when
   her mistress dies, and srvM keeps a dead mistress after the rise, so S.srv.mid is never read for the road once act.mis is set. Old saves
   without act.mis fall back to srvM() (the mistress of the moment, as before). A gone mistress (dead, or sent to the cold palace) is told
   once (log + the chapter's first card, like rdCast) and never acts again: chapters that need her (cnv_chu, cnv_mat .5–.9, cnv_ban .9)
   cast false (jst14 puts a shared chapter in the slot; jroad tells the origin ending from the last road chapter that ran); the others guard
   her options with if:CNV_MOK and switch her texts with CNV_MT. */
function CNV_MID(){try{const K=S.st&&S.st.f14&&S.st.f14.act;if(K&&K.mis!=null)return K.mis}catch(e){}const m=srvMis67();return m?m.id:null}
function CNV_MIS(){const id=CNV_MID();if(id==null)return null;try{return RV(id)||null}catch(e){return null}}
function CNV_MOK(){const m=CNV_MIS();return !!(m&&m.alive&&!m.out)}
/* she is still the woman this maid serves (Chủ tin belongs to the mistress of the moment) */
function CNV_MCUR(){return CNV_MOK()&&typeof isSrv==="function"&&isSrv()&&S.srv.mid===CNV_MID()}
/* text switch: living mistress / gone mistress */
const CNV_MT=(a,b)=>()=>CNV_MOK()?(typeof a==="function"?a():a):(typeof b==="function"?b():b);
/* the road's first need of her: keep her id once; tell once when she is gone; need=1 → the chapter cannot run without her */
function CNV_MC(A,need){try{const f=S.st&&S.st.f14;if(f){const K=f.act||(f.act={});if(K.mis==null){const m=srvMis67();if(m)K.mis=m.id}
  if(K.mis!=null)A.act.mis=K.mis;const m=CNV_MIS();
  if(m&&!(m.alive&&!m.out)&&f.misT!==m.id){f.misT=m.id;const L=`${m.name} ${m.alive?"đã bị đưa vào lãnh cung":"nay đã khuất"}, ${need?"chuyện của nàng khép lại tại đây":"việc còn lại ngươi tự gánh"}.`;
   (A.rc=A.rc||[]).push(L);try{log(`<i>${L}</i>`)}catch(e){}}}}catch(e){}
 return !need||CNV_MOK()}
/* relation with the road's mistress (real both ways, OD:L1247); Chủ tin only while she is the mistress this maid serves */
function CNV_REL(n){try{const m=CNV_MIS();if(m&&m.alive){relAdd(S,m,n);if(n<0&&typeof oanAdd==="function")oanAdd(m,S,-n)}
 if(CNV_MCUR())S.tin=Math.max(0,Math.min(100,(S.tin||0)+n))}catch(e){}return""}
/* {mis} and the speaker "mis" of a cnv road chapter read the road's mistress (never the silently reassigned one); a gone mistress has no
   portrait. The .4 premise thread keeps her id the moment the road starts, so a death between .4 and .5 is not a silent recast. */
(function(){const cnvA=A=>{try{const a=A&&ARC67[A.a];return !!(a&&a.o==="rd"&&/^cnv_/.test(a.road||""))}catch(e){return false}};
 if(typeof TOK67==="object"&&TOK67){const t0=TOK67.mis;TOK67.mis=function(A){if(cnvA(A)){const m=CNV_MIS();return m?m.name:"chủ nhân"}return t0.apply(this,arguments)}}
 if(typeof who67==="function"){const w0=who67;who67=function(w,A){if(w==="mis"&&cnvA(A)){const m=CNV_MIS();try{return m&&m.alive&&!m.out?pv(m):null}catch(e){return null}}return w0.apply(this,arguments)}}
 if(typeof newThread67==="function"){const n0=newThread67;newThread67=function(id){const A=n0.apply(this,arguments);
  try{const f=S.st&&S.st.f14;if(A&&f&&f.rd===id&&/^cnv_/.test(id)&&rdOn()){const K=f.act||(f.act={});if(K.mis==null){const m=srvMis67();if(m)K.mis=m.id}}}catch(e){}return A}}})();

/* ---------- Empty Hoàng hậu seat / both gone (CNV_QFIX, shared by the four cnv roads, called once per road) ----------
   qOn() false: every text of the road that names the Hoàng hậu / Càn Ninh cung / Trung cung reads the Thái hậu / Đức Thọ cung, Hoàng hậu
   favour (hh) becomes Thái hậu favour (th), and the speaker portrait follows. When the Thái hậu is dead too (S.thDead) the same texts read
   the Emperor (Dưỡng Tâm điện, «Trẫm»), hh becomes his favour (CNV_QK) and the speaker is the Emperor: nobody dead ever speaks. Texts that
   need the exact wording of a mode are functions of CNV_QM and use none of the trigger words outside the "hh" mode.
   Getters keep strings as strings (arcReveal67 and rare-path matching still see text). */
function CNV_QFIX(road){
 const W=/Hoàng hậu|Càn Ninh cung|Trung cung/,qn=()=>CNV_QM()==="hh";
 const sub=s=>{if(typeof s!=="string"||!W.test(s))return s;if(CNV_QM()==="emp")return s.replace(/“Bổn cung/g,"“Trẫm").replace(/cung Hoàng hậu/g,"Dưỡng Tâm điện").replace(/Càn Ninh cung/g,"Dưỡng Tâm điện").replace(/Trung cung/g,"Hoàng thượng").replace(/Hoàng hậu/g,"Hoàng thượng");
  return s.replace(/“Bổn cung/g,"“Ai gia").replace(/Càn Ninh cung/g,"Đức Thọ cung").replace(/Trung cung/g,"Thái hậu").replace(/Hoàng hậu/g,"Thái hậu")};
 const map=o=>{const k2=CNV_QM()==="th"?"th":CNV_QK();const r={};for(const k in o){const j=k==="hh"?k2:k;r[j]=(r[j]||0)+o[k]}return r};
 const fix=(ob,keys)=>{if(!ob)return;for(const k of keys){if(!Object.prototype.hasOwnProperty.call(ob,k))continue;const v=ob[k];
  if(k==="w"&&typeof v==="string"){if(v==="hh")Object.defineProperty(ob,k,{get:()=>({hh:"hh",th:"th",emp:"emp"})[CNV_QM()],enumerable:true,configurable:true});continue}
  if(typeof v==="string"){if(W.test(v))Object.defineProperty(ob,k,{get:()=>qn()?v:sub(v),enumerable:true,configurable:true})}
  else if(typeof v==="function"){if(k!=="n")ob[k]=function(A){const s=v.apply(this,arguments);return qn()?s:sub(s)}}
  else if(v&&typeof v==="object"&&"hh" in v){Object.defineProperty(ob,k,{get:()=>qn()?v:map(v),enumerable:true,configurable:true})}}};
 for(const id in ARC67){const a=ARC67[id];if(!a||a.road!==road)continue;fix(a,["g","t","w"]);
  for(const bk in a.B||{}){const b=a.B[bk];fix(b,["t","h","l","w"]);if(Array.isArray(b.o))for(const o of b.o)fix(o,["n","rt","rf","lx","wx","c","w","l"])}
  for(const ek in a.E||{})fix(a.E[ek],["t","tag","fx","w"])}
 for(const r of (typeof RD97L!=="undefined"?RD97L:[]))if(r&&String(r.a).indexOf(road+"_")===0)fix(r,["t","tag","ti","n","fx","w"])}
