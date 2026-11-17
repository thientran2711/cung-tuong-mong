/* ================= jemocause: kitMoodCauseRows — the tap list of a mood seal (KIT 38.5; owner 17/11 ~18:25Z (a)) =================
   Input: the live causes of one person (AG-MOODKNOW mkCauses / emoCauses: [{k, v, why, left}], left = khắc left) and the key that drives the seal now (sealKeyFor).
   Rule (owner, verbatim sense): group the rows by feeling kind; the kind that DRIVES the seal comes FIRST with its rows in BOLD; then the other kinds in the order they would take over
   (summed strength, high -> low); inside a kind the soonest-to-fade first; every row shows its khắc left; a cause she does not know prints "Nguyên do chưa rõ".
   Output: kit rows [label, value, cls] for kitModal sections (the label sits on the first row of a kind, the following rows of that kind carry an empty label).
   Wording: KIT_EMOLABEL is the ONE string table of the feeling names shown in this list (ghen is shown as "Chạnh lòng" (owner 17/11 ~18:38Z; the key and the Ghen score keep their names); change a display name HERE only). ===== */
window.KIT_EMOLABEL=window.KIT_EMOLABEL||{ghen:"Chạnh lòng"};
function kitMoodCauseRows(L,drive,o){o=o||{};const name=o.name||(k=>(window.KIT_EMOLABEL[k])||(typeof EMO!=="undefined"&&EMO[k])||k);const cls=o.cls||(()=>"");
 const g={};for(const x of L||[]){if(!x||!x.k)continue;(g[x.k]=g[x.k]||{k:x.k,sum:0,rows:[]});g[x.k].sum+=+x.v||0;g[x.k].rows.push(x)}
 const order=Object.values(g).sort((a,b)=>(b.k===drive)-(a.k===drive)||b.sum-a.sum);
 const bold=(t,on)=>on?`<b>${t}</b>`:`<span class="kmcsub">${t}</span>`;const out=[];
 for(const G of order){G.rows.sort((a,b)=>(a.left==null)-(b.left==null)||a.left-b.left);const on=G.k===drive;
  G.rows.forEach((x,i)=>{const why=x.why&&x.why!=="Nguyên do chưa rõ"?x.why:"Nguyên do chưa rõ";const left=x.left!=null?`còn ${Math.max(0,x.left)} khắc`:(o.ago?o.ago(x):"");
   out.push([i?"":bold(name(G.k),on),bold(`${why}${left?" · "+left:""}`,on),cls(G.k)])})}
 return out}
window.kitMoodCauseRows=kitMoodCauseRows;
(function(){const st=document.createElement("style");st.id="kmc-css";st.textContent=`.kmcsub{font-weight:400}b:has(>.kmcsub){font-weight:400}`;document.head.appendChild(st)})();
