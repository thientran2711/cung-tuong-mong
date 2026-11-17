/* ================= jemocause: kitMoodCauseRows — the tap list of a mood seal (KIT 38.5; owner 17/11 ~18:25Z (a)) =================
   Input: the live causes of one person (AG-MOODKNOW mkCauses / emoCauses: [{k, v, why, left}], left = khắc left) and the key that drives the seal now (sealKeyFor).
   Rule (owner, verbatim sense): group the rows by feeling kind; the kind that DRIVES the seal comes FIRST with its rows in BOLD; then the other kinds in the order they would take over
   (summed strength, high -> low); inside a kind the soonest-to-fade first; every row shows its khắc left; a cause she does not know prints "Nguyên do chưa rõ".
   Output: kit rows [label, value, cls] for kitModal sections (the label sits on the first row of a kind, the following rows of that kind carry an empty label).
   Wording: KIT_EMOLABEL is the ONE string table of the feeling names shown in this list (ghen is shown as "Chạnh lòng" (owner 17/11 ~18:38Z; the key and the Ghen score keep their names); change a display name HERE only). ===== */
window.KIT_EMOLABEL=window.KIT_EMOLABEL||{ghen:"Chạnh lòng",chanh:"Chạnh lòng"};
/* TONE of a feeling = DATA (r4): KIT_EMOTONE[key] = "g" good (green) | "r" bad (red) | "" neutral; a key not in the table is neutral. Every colour of a mood row / word reads kitEmoTone — no inline kind list anywhere. */
window.KIT_EMOTONE=window.KIT_EMOTONE||{vui:"g",tutin:"g",hanghai:"g",tinhtu:"g",chuyentam:"g",hungkhoi:"g",tinhnghich:"g",binh:"",
 buon:"r",gian:"r",lo:"r",so:"r",hothen:"r",chan:"r",khochiu:"r",choang:"r",hon:"r",chanh:"r",ghen:"r",dau:"r",khoc:"r",phanno:"r",runso:"r",matngu:"r"};
window.kitEmoTone=function(k){return(window.KIT_EMOTONE&&window.KIT_EMOTONE[k])||""};
/* the name the player may read for a feeling / act key: KIT_EMOLABEL -> EMO -> KIT_FACENAME; a key with no registered name returns "" — NEVER the raw key (callers hide the row or use kitEmoWord) */
window.KIT_FACENAME=window.KIT_FACENAME||{khoc:"Khóc"};/* owner words only; C-AG adds the other act names here */
function kitFaceName(k){if(!k)return"";return window.KIT_EMOLABEL[k]||(typeof EMO!=="undefined"&&EMO[k])||window.KIT_FACENAME[k]||""}
window.kitFaceName=kitFaceName;
window.kitEmoWord=function(k){return kitFaceName(k)||"tâm tư"};/* generic word where a name is needed but none is registered yet (alt, headings) */
/* the key that DRIVES the seal now, one source for the seal, the sub line, the badge and the bold group: faceKeyFor(pid).feel.key, else the feel key, else the act's own feeling, else sealKeyFor, else the legacy mood */
function kitFaceDrive(p,m){try{if(typeof window.faceKeyFor==="function"){const f=window.faceKeyFor(p);if(f){if(f.feel&&f.feel.key)return f.feel.key;if(f.kind==="feel"&&f.key)return f.key}}
 if(typeof window.sealKeyFor==="function"){const k=window.sealKeyFor(p);if(k)return k}}catch(e){}return m&&m.k}
window.kitFaceDrive=kitFaceDrive;
/* the name of what the seal shows now (header sub line, badge alt, data-kemo, bold group): the seal key's name, else (an act with no name yet) its feeling's name, else the generic word */
window.kitSealName=function(p,m){const sk=window.emoSealKey?emoSealKey(p,m):m&&m.k;return kitFaceName(sk)||kitFaceName(kitFaceDrive(p,m))||kitEmoWord("")};
function kitMoodCauseRows(L,drive,o){o=o||{};const name=o.name||kitEmoWord;const cls=o.cls||kitEmoTone;
 /* group by the DISPLAY label (ghen + chanh are both "Chạnh lòng" = one group; old saves and new causes mix) */
 const g={};for(const x of L||[]){if(!x||!x.k)continue;const lb=name(x.k);(g[lb]=g[lb]||{k:x.k,lb,sum:0,rows:[]});g[lb].sum+=+x.v||0;g[lb].rows.push(x)}
 const dl=drive?name(drive):null;
 const order=Object.values(g).sort((a,b)=>((b.lb===dl)-(a.lb===dl))||b.sum-a.sum);
 const bold=(t,on)=>on?`<b>${t}</b>`:`<span class="kmcsub">${t}</span>`;const out=[];
 for(const G of order){G.rows.sort((a,b)=>(a.left==null)-(b.left==null)||a.left-b.left);const on=G.lb===dl;
  G.rows.forEach((x,i)=>{const why=x.why&&x.why!=="Nguyên do chưa rõ"?x.why:"Nguyên do chưa rõ";const left=x.left!=null?`còn ${Math.max(0,x.left)} khắc`:(o.ago?o.ago(x):"");
   out.push([i?"":bold(G.lb,on),bold(`${why}${left?" · "+left:""}`,on),cls(G.k)])})}
 return out}
window.kitMoodCauseRows=kitMoodCauseRows;
/* the top lines of the tap card (owner 19:25Z + 20:15Z, ONE seal = "vẻ mặt": active act > strongest feeling, NO intent face; C-AG FEELINGS-18 faceKeyFor(pid) -> {kind:'act'|'feel', key, level, feel?:{key,level}}):
   "Đang: <act>" (only when the face is an act) · "Cảm xúc: <name> (<bậc>)". Names: KIT_EMOLABEL -> EMO -> KIT_FACENAME; an unnamed key hides its row (never printed raw); tones from KIT_EMOTONE. [] while faceKeyFor is not there. */
function kitFaceRows(p,m,o){o=o||{};try{if(typeof window.faceKeyFor!=="function")return[];const f=window.faceKeyFor(p);if(!f||!f.key)return[];const out=[];const cls=o.cls||kitEmoTone;
 if(f.kind==="act"&&kitFaceName(f.key))out.push(["Đang",kitFaceName(f.key)]);/* an act with no registered name: row hidden, never the raw key */
 const fe=f.kind==="feel"?{key:f.key,level:f.level}:f.feel||{key:kitFaceDrive(p,m),level:m&&m.v!=null?m.level:null};
 if(fe&&fe.key&&fe.key!=="binh"&&kitFaceName(fe.key))out.push(["Cảm xúc",`${kitFaceName(fe.key)}${fe.level!=null&&fe.level!==""?` (${fe.level})`:""}`,cls(fe.key)]);
 /* owner 20:15Z: NO intent face — no Vẻ mặt line */
 return out}catch(e){return[]}}
window.kitFaceRows=kitFaceRows;
(function(){const st=document.createElement("style");st.id="kmc-css";st.textContent=`.kmcsub{font-weight:400}b:has(>.kmcsub){font-weight:400}`;document.head.appendChild(st)})();
