/* j65: each fact once per view (owner 11/14: "the same information is repeated over and over").
   Builds on j62 (kid age once). Only wraps renderers / rewrites their output; no new styles.
   Kept place -> removed repeat:
   - age: "Tuổi N" everywhere; the 4-band "(18–25)" is derived from the age, dropped on every card
   - date + buổi: top bar (me-d) -> status panel date chip hidden, buổi chip shows only "còn N khắc"; map header drops the buổi
   - her own stats: HUD + status panel -> Quan hệ "Ngươi" drops the Hoàng thượng / Thái hậu rows; Rương đồ drops "Bạc N"
   - servant loyalty: her card in Kẻ hầu -> panel chip "Lòng X" hidden while X's card is open
   - consort card: "Nàng với ngươi: <label> · n" line -> chip "Thù ngươi / Thân với ngươi / Bình thường" dropped
   - "Đã biết": same report kept once (newest)
   - kid card: chip "Hoàng tử · 8 tuổi" -> heading drops the title, acts say "con" not the kid's name,
     latest test result stays in the Thượng thư phòng list, Thái tử line drops the mother when the list shows her
   - scene name tags for kids drop the title (frame + strip already say it; stops "Hoàng tử Vĩ…")
   - act cards: "Chỉ buổi tối — chờ…" reason -> meta "· Chỉ buổi tối" dropped while the reason shows; Đức warning no longer repeats "Đức"
   - servant card: role chip -> second line drops the role (a higher title moves into the chip)
   - Hoàng thượng card: chip "Hoàng thượng" -> heading "Niên hiệu …"; self card drops "Hoàng hậu 0" once she is Hoàng hậu
   - end card: "Phẩm cao nhất" row -> portrait caption hidden when equal; identity card: rows -> bio sentence drops name/age/origin, "Vào cung" row = caption rank dropped, "Phúc duyên đang có" kept on the button only
   - Nhật ký: date shown once per run of same-date entries; "Ngươi tố giác X …: thành." dropped when "X bị tố giác …" is logged
   - result card: log line under the numbers drops the title, the verdict word and the deltas already shown
   - stated deltas are the real ones: "Lòng cung nữ +6" at 97 becomes "+3 (đã đầy 100)" in log, pop card, toast, week card
   - talk in a pop card: one statement in the card (no repeat line, no toast while the card shows it); card numbers read live
   - tooltips equal to the visible (uncut) text dropped; consort roster: one "thiên điện riêng" group
   j65b: week summary facts de-duplicated (no lone choice labels, own act results folded into the week totals incl. Lòng cung nữ);
   names/faces/rank colours are NOT drawn here: the kit (j79 kitFacts/kitName, kpBuild, dawn) draws them; Nhật ký rows use kpPeopleIn. j65c: Việc list drops acts that live in their own tab. */
(function(){
const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const HIDE=(e,on)=>{if(on===false)e.style.removeProperty("display");else e.style.setProperty("display","none","important")};
const KT=/^(Hoàng tử|Công chúa|Hoàng nữ|Thái tử) /;
/* ---- age band ---- */
try{const t0=tuoi;tuoi=function(n){const h=t0.apply(this,arguments);return h?h.replace(/\s*<span class="past">\([^)]*\)<\/span>/,""):h}}catch(e){}
try{const a0=ageLine;ageLine=function(p){const h=a0.apply(this,arguments);try{const ag=p===S?S.age:p.age;const b=BAND4N[band4(ag)];return h.replace(` · ${b}`,"")}catch(e){return h}}}catch(e){}
/* ---- Đức warning: the cost already says "Đức -n" ---- */
/* (rules-one-source: the old shortening "Đức 33 → 28: …" → "còn 28: …" dropped the stat name; removed. The note keeps "Đức a → b".) */
/* ---- consort card: relation chip repeats the "Nàng với ngươi" line ---- */
try{const r0=rvCard;rvCard=function(){const h=r0.apply(this,arguments);return h.replace(/<span class="chip (hot|ok|)">(Thù ngươi|Thân với ngươi|Bình thường)<\/span>/,"")}}catch(e){}
/* ---- "Đã biết": one line per distinct report ---- */
try{notesLine=function(v){kn();const L=S.notes[v.id]||[];const seen=new Set(),U=[];for(const x of L){const k=T(x).replace(/^T\d+\/\d+ \S+ tuần: /,"").replace(/\d+/g,"#");if(seen.has(k))continue;seen.add(k);U.push(x);if(U.length>=2)break}return U.length?`<span class="past">Đã biết: ${U.join(" · ")}</span>`:""}}catch(e){}
/* ---- kid card ---- */
const TTL=/^.*?(?:[Cc]ông chúa|Hoàng tử|Hoàng nữ|Thái tử) /;
try{const k0=kidCard;kidCard=function(k){let h=k0.apply(this,arguments);if(!k||!k.name)return h;
 const nm=k.name;
 /* heading: the chip under it carries the title */
 h=h.replace(/<b class="pcname">([^<]*)<\/b>/,(m,t)=>`<b class="pcname">${t.replace(TTL,"")||t}</b>`);
 /* princess: "Tước hiệu: X" goes into the chip instead of a third mention */
 const tm=h.match(/<span>Tước hiệu: <b>([^<]*)<\/b><\/span>/);
 if(tm){h=h.replace(tm[0],"");h=h.replace(/(<span class="pcrk">(?:<img[^>]*>)?)Công chúa( · )/,(m,a,b)=>a+(tm[1]||"Công chúa")+b)}
 if(k.alive){const esc=nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  /* inside this card's buttons the kid is "con" (as "Sức khỏe con", "Hoàng thượng thương con") */
  h=h.replace(new RegExp(`(<span class="ef [gr]">[^<]*?) ${esc}( [+\\-][^<]*</span>)`,"g"),"$1 con$2")}
 return h}}catch(e){}
/* consort card: her daughter "Công chúa Tĩnh An · 14 tuổi · Hòa Thạc công chúa" -> "Hòa Thạc công chúa Tĩnh An · 14 tuổi" */
try{const r1=rvCard;rvCard=function(v){let h=r1.apply(this,arguments);try{if(typeof H54T!=="undefined"&&typeof h54Name==="function")for(const k of (v.kids||[]).filter(k=>k.alive&&k.sex==="f"&&k.hT)){const t=H54T[k.hT];const a=`${k.name} · ${k.age} tuổi · ${t}`;if(h.includes(a))h=h.split(a).join(`${h54Name(k)} · ${k.age} tuổi`)}}catch(e){}return h}}catch(e){}
try{const t0=kidTabHTML;kidTabHTML=function(){let h=t0.apply(this,arguments);try{
 const box=h.indexOf('<div class="ktbox">');if(box<0)return h;const list=h.slice(box);
 const cn=(h.match(/<b class="pcname">([^<]*)<\/b>/)||[])[1];
 if(cn){const card=h.slice(0,box);let c2=card;
  /* latest test: shown in the Thượng thư phòng row */
  const tt=list.indexOf("<h5>Thượng thư phòng</h5>"),hs=list.indexOf('<div class="h54box">');
  const tList=tt>=0?list.slice(tt,hs>tt?hs:undefined):"",hList=hs>=0?list.slice(hs):"";
  if(tList.includes(` ${cn} · `))c2=c2.replace(/<span>Lần thi gần nhất: [^<]*<\/span>/,"");
  /* marriage state: shown in the Hôn sự row */
  if(hList.includes(` ${cn} · `))c2=c2.replace(/<span>Hôn sự: [^<]*(?:<b>[^<]*<\/b>[^<]*)*<\/span>/,"");
  h=c2+list}
 /* Thái tử line: the mother is in his row */
 h=h.replace(/(<span>Thái tử: )([^,<]+), con của ([^.<]+)\.(<\/span>)/,(m,a,heir,mom,z)=>list.includes(`${heir} · `)&&list.includes(`con ${mom}`)?`${a}${heir}.${z}`:m);
 }catch(e){}return h}}catch(e){}
/* ---- DOM pass after every render ---- */
function fixHud2(){const el=document.getElementById("hud2");if(!el)return;
 const me=document.getElementById("me-d");const top=me?T(me.textContent):"";
 const d=el.querySelector('.hc[data-hx="date"]');if(d&&top&&top.startsWith(T(d.textContent)))HIDE(d);
 const b=el.querySelector('.hc[data-hx="buoi"]');if(b&&top){const f=b.firstChild;if(f&&f.nodeType===3&&/·\s*còn/.test(f.textContent)){const w=f.textContent.split("·")[0].trim();if(w&&top.toLowerCase().includes("buổi "+w.toLowerCase()))f.textContent="còn "}}
 /* servant loyalty: hidden while her own card (with the Lòng bar) is open */
 const m=el.querySelector('.hc[data-hx="maid"]');if(m){const pn=document.querySelector('#popw .pcname')||document.querySelector('#panel[data-tab="staff"] .pc .pcname');const nm=(T(m.textContent).match(/^Lòng (.+?) \d+/)||[])[1];HIDE(m,!!(pn&&nm&&T(pn.textContent)===nm))}}
function fixStage(){document.querySelectorAll("#tokens .tok").forEach(t=>{if(!t.querySelector(".rk-kid"))return;const g=t.querySelector(".tag");if(g&&KT.test(g.textContent)){g.title=g.textContent;g.textContent=g.textContent.replace(KT,"")}})}
function fixPanel(){const P=document.getElementById("panel");if(!P)return;const tab=P.dataset.tab;
 /* act cards: time limit said once */
 P.querySelectorAll(".kcard").forEach(c=>{const tm=c.querySelector(".ktime");if(!tm)return;const m=tm.innerHTML.match(/ · Chỉ (buổi \S+)/);if(!m)return;
  const rest=T(c.textContent.replace(tm.textContent,""));if(rest.toLowerCase().includes("chỉ "+m[1].toLowerCase()))tm.innerHTML=tm.innerHTML.replace(m[0],"")});
 /* map header: buổi is in the top bar */
 document.querySelectorAll(".maptools > span.past").forEach(s=>{const f=s.firstChild;if(f&&f.nodeType===3&&!s.dataset.nr){s.dataset.nr=1;f.textContent=f.textContent.replace(/ · Buổi [^·]+(?= · còn)/,"")}});
 /* Con cái with the succession box (j51): who is heir / where each son stands is said there, once */
 if(tab==="kid"){const kv=P.querySelector(".kvbox");if(kv&&!kv.dataset.nr){kv.dataset.nr=1;const kvt=T(kv.textContent);const inKv=n=>n&&kvt.includes(n+" · ");
  P.querySelectorAll(".ph > span").forEach(s=>{const m=T(s.textContent).match(/^Thái tử: (.+?)\.$/);if(m&&inKv(m[1]))s.textContent=""});
  const cn=T(P.querySelector(".pc .pcname")?.textContent);const full=[...kv.querySelectorAll(".pcrow,.kr")].map(r=>T(r.textContent)).find(t=>t.includes(" "+cn+" · "));
  if(cn&&full)P.querySelectorAll(".pc .chips .chip").forEach(c=>{if(/^(Đích tử|Trưởng tử|Thái tử|Kế vị thứ \d+)$/.test(T(c.textContent)))c.remove()});
  /* Thượng thư phòng rows: age and mother already in the succession row */
  P.querySelectorAll(".ktbox .pcrow > span > span:last-child,.ktbox .kr > .krl > span:last-child").forEach(s=>{const m=T(s.textContent).match(/^(.+?) · \d+ tuổi · con .+$/);if(m&&inKv(m[1])&&!/con ngươi$/.test(T(s.textContent)))s.textContent=m[1];else if(m&&inKv(m[1]))s.innerHTML=s.innerHTML.replace(/ · \d+ tuổi · /," · ")})}}
 /* Triều đình: the Emperor's mood is on his chip in the top bar */
 if(tab==="fac"){const em=document.getElementById("emp-m");P.querySelectorAll(".ph > span").forEach(s=>{const m=T(s.textContent).match(/^Tâm trạng Hoàng thượng: (.+)$/);if(m&&em&&T(em.textContent)===m[1])s.remove()})}
 /* Bảng phẩm vị: her Sủng/Danh are in the HUD */
 if(tab==="rv"&&typeof S!=="undefined"&&S)P.querySelectorAll(".rboard .rrow2").forEach(r=>{if(T(r.querySelector("b")?.textContent)!=="Ngươi")return;const l=r.querySelector(".rl");if(!l||l.dataset.nr)return;l.dataset.nr=1;
  const k=`Sủng ${S.sung} · Danh ${S.danh} · `;if(T(l.textContent).startsWith(k)){l.querySelectorAll("img").forEach(i=>i.remove());l.textContent=T(l.textContent).slice(k.length)}});
 /* roster strip: "thiên điện của Thẩm Bạch Lộ" over "Bạch Lộ" -> one "thiên điện riêng" group */
 if(tab==="rv"){let prev=null;P.querySelectorAll(".pfaces .pgrp").forEach(g=>{const sp=g.querySelector(".psep"),fs=g.querySelectorAll(".pface");if(!sp)return;
  const m=T(sp.textContent).match(/^thiên điện của (.+)$/);const own=m&&fs.length===1&&m[1].endsWith(" "+T((fs[0].querySelector(":scope > span:last-child")||fs[0]).textContent));
  if(own){if(prev){prev.querySelector(".pgf").appendChild(fs[0]);g.remove();return}sp.textContent="thiên điện riêng";prev=g}else if(T(sp.textContent)!=="thiên điện riêng")prev=null})}
 if(tab==="inv"){const ph=P.querySelector(".ph");if(ph){const L=ph.lastElementChild;if(L&&/^Bạc -?\d+$/.test(T(L.textContent))&&typeof S!=="undefined"&&T(L.textContent)==="Bạc "+S.bac)L.remove()}}
 if(tab==="rel"){const me=P.querySelector('.relsel button[data-rel="me"][aria-pressed="true"]');if(me)P.querySelectorAll(".rrow2").forEach(r=>{const b=r.querySelector("b");if(b&&/^(Hoàng thượng|Thái hậu)$/.test(T(b.textContent))&&/^(Ngài|Người) với ngươi/.test(T(r.querySelector(".rl")?.textContent)))r.remove()})}
 if(tab==="staff"){const c=P.querySelector(".pc");if(c){const rk=c.querySelector(".pcrk"),ln=[...c.querySelectorAll(".pcinfo > span")].find(s=>/ · /.test(s.textContent));
  if(rk&&ln&&ln.firstChild&&ln.firstChild.nodeType===3){const ttl=ln.firstChild.textContent.split(" · ")[0];const all=[].concat(SRK.maid,SRK.eunuch);
   if(all.includes(ttl)&&all.includes(T(rk.textContent))){if(ttl!==T(rk.textContent))rk.textContent=ttl;ln.firstChild.textContent=ln.firstChild.textContent.slice(ttl.length+3)}}}}
 if(tab==="log"&&!P.querySelector("[data-nrh]")){const rows=[...P.querySelectorAll(".logs > div")];const dt=r=>{const d=r.querySelector(".ld");return d?T(d.textContent):""};
  /* the accusation and its outcome are one event */
  rows.forEach(r=>{const m=T(r.textContent).match(/Ngươi tố giác (.+?) trước .*: thành\.$/);if(!m)return;const d=dt(r);if(rows.some(o=>o!==r&&dt(o)===d&&T(o.textContent).includes(m[1]+" bị tố giác")))r.remove()});
  /* date once, as a line of its own above its entries */
  let last="";P.querySelectorAll(".logs > div").forEach(r=>{const d=r.querySelector(".ld");if(!d)return;const t=T(d.textContent);
   if(t!==last){const h=document.createElement("div");h.dataset.nrh=1;h.appendChild(d.cloneNode(true));r.before(h);last=t}d.remove()})}
}
function fixModal(){const M=document.getElementById("modal");if(!M||M.hidden)return;
 /* rows: legacy .pcrow (span | b) or the kit table row .kr (.krl | .krv), KIT §51 */
 const RWS=()=>[...M.querySelectorAll(".pcrow,.kb>.kr")],RL=x=>x.querySelector(":scope>.krl")||x.querySelector("span"),RV=x=>x.querySelector(":scope>.krv")||x.querySelector("b");
 const nm=M.querySelector(".pcname"),rk=M.querySelector(".pcrk");
 if(nm&&rk){const n=T(nm.textContent),r=T(rk.textContent);
  if(r==="Hoàng thượng"&&n.startsWith("Hoàng thượng niên hiệu "))nm.textContent="Niên hiệu "+n.slice(23);
  if(typeof S!=="undefined"&&S&&n===S.name&&(S.rank>=7||S.queen))RWS().forEach(x=>{if(T(RL(x)?.textContent)==="Hoàng hậu")x.remove()})}
 /* end card: caption = highest rank */
 const cap=M.querySelector(".pfwrap .pfrw");if(cap){const row=RWS().find(x=>T(RL(x)?.textContent)==="Phẩm cao nhất");if(row&&T(RV(row)?.textContent)===T(cap.textContent))HIDE(cap)}
 /* portrait captions: "Hoàng thượng / Hoàng thượng" */
 M.querySelectorAll("figcaption").forEach(f=>{const b=f.querySelector("b"),sm=f.querySelector("small");if(b&&sm&&T(b.textContent)===T(sm.textContent))sm.remove()});
 /* identity card */
 const rows=RWS();const rv=l=>rows.find(x=>T(RL(x)?.textContent)===l);
 const xo=rv("Xuất thân"),vc=rv("Vào cung"),tu=rv("Tuổi");
 if(xo&&tu&&typeof S!=="undefined"&&S){
  const bio=[...M.querySelectorAll("p")].find(p=>p.querySelector("b")&&T(p.querySelector("b").textContent)===S.name&&!p.dataset.nr);
  if(bio){bio.dataset.nr=1;const o=T(RV(xo)?.textContent);const t=T(bio.textContent);const pre=`${S.name}, ${S.age} tuổi, ${o}.`;if(t.startsWith(pre)){const rest=t.slice(pre.length).trim();if(rest)bio.textContent=rest;else bio.remove()}}
  const capR=[...M.querySelectorAll(".pcrk,.pfrw,figcaption small")].map(e=>T(e.textContent));
  if(vc&&capR.includes(T(RV(vc)?.textContent)))vc.remove();
  M.querySelectorAll("p.past").forEach(p=>{if(/Phúc duyên đang có/.test(p.textContent)&&/đang có/.test(T(M.querySelector("button[disabled]")?.textContent))){p.innerHTML=p.innerHTML.replace(/\s*Phúc duyên đang có: <b>\d+<\/b>\./,"")}})}
}
/* result card: title, verdict and numbers are already on the card; the log line keeps only what is new */
function fixToast(){const t=document.getElementById("rtoast");if(!t||t.dataset.nr===t.innerHTML.length+"")return;const sm=t.querySelector(".rt > small:not(.past)");const ti=T(t.querySelector(".rt > b")?.textContent);const seal=T(t.querySelector(".seal")?.textContent);
 if(sm){let w=T(sm.textContent);if(ti&&w.startsWith(ti+"."))w=w.slice(ti.length+1).trim();
  const sw={"THÀNH":"Thành.","BẠI":"Bại.","XONG":"Xong."}[seal];if(sw&&w.startsWith(sw))w=w.slice(sw.length).trim();
  t.querySelectorAll(".rd .ef").forEach(e=>{const m=T(e.textContent).match(/^(.+?) (-?\d+) → (-?\d+)$/);if(!m)return;const d=+m[3]-+m[2];if(!d)return;
   const labs=[m[1]];if(typeof S!=="undefined"&&S&&S.maid&&m[1]==="Lòng "+S.maid.name)labs.push("Lòng cung nữ");
   for(const lb of labs){const tok=`${lb} ${d>0?"+":"-"}${Math.abs(d)}`;const esc=tok.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");w=w.replace(new RegExp(`(^|·\\s*|\\s)${esc}(?: \\((?:đã đầy|chạm đáy) -?\\d+\\))?(?=\\s|·|$|\\.|,|;)`),"$1");const e2=`${lb} ${m[2]} → ${m[3]}`.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");w=w.replace(new RegExp(`(^|·\\s*|\\s)${e2}(?: \\((?:đã đầy|chạm đáy)\\))?(?=\\s|·|$|\\.|,|;)`),"$1")}});
  w=w.replace(/^[\s·.]+/,"").replace(/(\s*·\s*)+$/,"").replace(/·\s*·/g,"·").trim();
  if(w)sm.textContent=w;else sm.remove()}
 t.dataset.nr=t.innerHTML.length+""}
try{const rs0=resultShow;resultShow=function(){const r=rs0.apply(this,arguments);try{fixToast()}catch(e){console.error(e)}return r}}catch(e){}
/* tooltips that only repeat the visible text (kept where the text is cut off) */
/* lag-play: all measurements first, then the removals (a removal between two reads forced one layout per titled element) */
function fixTitles(){const R=[];document.querySelectorAll("[title]").forEach(e=>{const a=T(e.getAttribute("title")).replace(/^·\s*/,""),b=T(e.textContent).replace(/^·\s*/,"");if(a&&a===b&&e.scrollWidth<=e.clientWidth+1&&e.clientWidth>0)R.push(e)});R.forEach(e=>e.removeAttribute("title"))}

/* ===== stated deltas = real deltas (owner 11/14: "Lòng cung nữ +6" when only +3 fitted under 100) ===== */
const BOUNDS={th:[-100,100],hh:[-100,100]};
function realD(b){const o={};if(!b||!S)return o;for(const k in NAMES){const now=k==="maid"?(S.maid?S.maid.loyal:null):(S[k]||0);const was=k==="maid"?b.maid:b[k];if(now==null||was==null)continue;o[NAMES[k]]={k,d:now-was,now}}return o}
function trueText(h,R){if(!h)return h;for(const L in R){const {k,d,now}=R[L];const bd=BOUNDS[k]||[0,100];const at=now>=bd[1]||now<=bd[0];if(!at&&d!==0)continue;
  const esc=L.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  h=h.replace(new RegExp(`${esc} ([+-])(\\d+)(?![\\d.,]| \\((?:đã đầy|chạm đáy))`,"g"),(m,sg,n)=>{const st=(sg==="-"?-1:1)*+n;if(st===d)return m;
   if(d!==0&&Math.sign(d)!==Math.sign(st))return m;if(Math.abs(d)>Math.abs(st))return m;if(!at)return m;
   const full=st>0?"đã đầy":"chạm đáy";/* owner 15/11: "Tài +1 (đã đầy 100)" read unclear → "Tài 99 → 100 (đã đầy)" (jlogsync) */return d===0?`${L} ${full} ${now}`:`${L} ${now-d} → ${now} (${full})`})}return h}
function fixTrue(b){if(!b||!S)return;const R=realD(b);const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(b.seq||0)));
 for(let i=0;i<n;i++)S.logs[i]=trueText(S.logs[i],R);if(popMsg)popMsg=trueText(popMsg,R)}
let nrTalk=null;
try{const rs1=resultShow;resultShow=function(title,before){try{fixTrue(before)}catch(e){console.error(e)}
  /* a talk in an open pop card: the card itself shows the result; the toast only if the card is gone */
  if(nrTalk){nrTalk.args=[...arguments];return}
  return rs1.apply(this,arguments)};
 const tk0=talk;talk=function(oi){let ttl="";try{ttl=talkOpts(curPeople()[popIdx])[oi].n}catch(e){}const b=rsnap();nrTalk={};let r;
  try{r=tk0.apply(this,arguments)}finally{const pend=nrTalk.args;nrTalk=null;
   try{fixTrue(b);popMsg=onePop(popMsg,ttl,b)}catch(e){console.error(e)}
   const shown=popIdx!=null&&popMsg&&!(document.getElementById("modal")&&!document.getElementById("modal").hidden);
   if(pend&&!shown)resultShow.apply(null,pend);try{renderStage()}catch(e){}}
  return r}}catch(e){console.error(e)}
/* pop card result: one statement; later lines that only repeat it are dropped */
function onePop(h,ttl,b){if(!h)return h;const seg=h.split("<br>");if(seg.length<2)return h;const first=T(seg[0]);
 const norm=x=>T(x).replace(new RegExp("^"+ttl.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*[:.]\\s*"),"").replace(/^(thành|hỏng|bại|Thành|Hỏng|Bại)\.\s*/,"").trim();
 const f=norm(seg[0]);const R=realD(b);const out=[seg[0]];
 for(const sgm of seg.slice(1)){let t=T(sgm);
  if(/→/.test(t)&&!/[.:;]/.test(t.replace(/·/g,""))){ /* "Sủng 30 → 34 · …" line: drop items already stated in line one */
   const items=t.split("·").map(x=>x.trim()).filter(x=>{const m=x.match(/^(.+?) -?\d+ → -?\d+$/);if(!m)return true;const lb=m[1];const al=S.maid&&lb==="Lòng "+S.maid.name?"Lòng cung nữ":lb;return !(first.includes(lb+" ")||first.includes(al+" "))});
   if(!items.length)continue;if(items.length===t.split("·").length){out.push(sgm);continue}
   out.push(items.map(x=>`<span class="ef ${/→ /.test(x)&&(+x.split("→")[1]>+x.split("→")[0].split(" ").pop())?"g":"r"}">${x}</span>`).join('<span class="ksep">·</span>'));continue}
  if(f){for(const v of [`${ttl}. ${f}`,`${ttl}: ${f}`,`${ttl}. Thành. ${f}`,`${ttl}. Hỏng. ${f}`,`${ttl}. Bại. ${f}`,f])t=t.split(v).join("");t=t.replace(/\s+/g," ").trim();if(!t||/^[.·\s]*$/.test(t))continue;
   if(t!==T(sgm)){out.push(`<span class="past">${t}</span>`);continue}}
  out.push(sgm)}
 return out.join("<br>")}
/* pop card: numbers read live (the visit list keeps a snapshot "lòng 97") */
try{const pc0=popCard;popCard=function(p){try{if(p&&p.info){if(p.kind==="maid"&&S.maid)p.info=p.info.replace(/lòng -?\d+/,"lòng "+S.maid.loyal);if(p.kind==="th")p.info=p.info.replace(/lòng -?\d+/,"lòng "+S.th)}}catch(e){}return pc0.apply(this,arguments)}}catch(e){}
/* review/lag-play-2: fixTitles only drops tooltips (no visible change) but reads scrollWidth = a forced layout in the middle of a render;
   it now runs once in the next frame, after every write of the render is done (one layout, the one the paint needs anyway). */
let nrTT=0;function fixTitlesSoon(){if(nrTT)return;nrTT=requestAnimationFrame(()=>{nrTT=0;try{fixTitles()}catch(e){}})}
function nrDOM(){try{fixTitlesSoon()}catch(e){}try{fixHud2()}catch(e){console.error(e)}try{fixStage()}catch(e){console.error(e)}try{fixPanel()}catch(e){console.error(e)}try{fixModal()}catch(e){console.error(e)}}
window.nrDOM=nrDOM;
/* review/lag-play-2: nrDOM ran after renderHUD, renderHud2, renderStage, renderPanel AND render (5x per render, each a full DOM pass).
   Nested calls now only count; the outermost wrapped call runs it once, when everything inside has been drawn (same end state). */
let nrDepth=0;const W=o=>function(){nrDepth++;let r;try{r=o.apply(this,arguments)}finally{nrDepth--}if(!nrDepth)nrDOM();return r};
try{renderHUD=W(renderHUD)}catch(e){}try{if(typeof renderHud2==="function")renderHud2=W(renderHud2)}catch(e){}
try{renderStage=W(renderStage)}catch(e){}try{renderPanel=W(renderPanel)}catch(e){}try{showModal=W(showModal)}catch(e){}try{render=W(render)}catch(e){}
/* tab / strip clicks re-render through these, but some handlers patch the DOM afterwards */
document.addEventListener("click",()=>setTimeout(nrDOM,0));
})();
/* ===== j65b (owner 11/14, later screenshots) ===== */
(function(){
const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* --- 1+2. names and faces: drawn by the kit (j79). Panels: kpBuild/kitFacts put the face beside each fact and the first mention
   as rank title + name in rank colour (kitName). Nhật ký rows use the same kit function at render time (stored log text stays plain). --- */
function kitNames(h){try{if(typeof kpPeopleIn!=="function"||typeof kpPeople!=="function"||!h)return h;if(typeof kitDedupTitle==="function")h=kitDedupTitle(h);/* KIT 9: old stored log lines */return kpPeopleIn(h,kpPeople())[0]}catch(e){return h}}
/* --- 3. week card: true deltas, no leftover choice labels, each fact once, faces beside their lines --- */
const LONE=/^[^\s.·:]+(?: [^\s.·:]+)?\.$/;          /* "Thôi." — a choice label with nothing after it */
const ACTRES=/^[^.]{1,60}\.(?: (?:Thành|Hỏng|Bại)\.)?\s*((?:[A-ZĐÀ-Ỹ][^·.+\-\d]*? (?:[+-]\d+(?: \((?:đã đầy|chạm đáy) -?\d+\))?|-?\d+ → -?\d+(?: \((?:đã đầy|chạm đáy)\))?|đã đầy -?\d+|chạm đáy -?\d+)\s*(?:·\s*)?)+)$/;
try{const ws0=wkSnap;wkSnap=function(){const r=ws0.apply(this,arguments);try{r.maid=S.maid?S.maid.loyal:null}catch(e){}return r}}catch(e){}
try{const wk0=wkSummary;wkSummary=function(){const s=S.wkSnap;const r=wk0.apply(this,arguments);try{if(r&&r.groups){
  if(s&&s.maid!=null&&S.maid&&S.maid.loyal!==s.maid)r.D.push([`Lòng ${S.maid.name}`,S.maid.loyal-s.maid]);
  const seen=new Set();const ok=x=>{const t=T(x);if(!t||LONE.test(t))return false;const k=t;if(seen.has(k))return false;seen.add(k);return true};
  r.groups=r.groups.filter(g=>g[0]!=="Chuyện khác").map(([h,L])=>[h,L.filter(ok)]);
  /* "Chuyện khác" rebuilt from the whole week: no leftover labels, no own act results (their numbers are the totals above) */
  const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-((s||{}).seq||0)));const used=new Set(r.groups.flatMap(g=>g[1]));
  const oth=S.logs.slice(0,n).map(plain).filter(x=>x&&!/^Xin xăm|^Gieo lại|^Đến /.test(x)&&!used.has(x)&&!ACTRES.test(T(x))).filter(ok).slice(0,3);
  if(oth.length)r.groups.push(["Chuyện khác",oth]);r.groups=r.groups.filter(g=>g[1].length);
  window.__nrWk=r}}catch(e){console.error(e)}return r}}catch(e){}
/* week card markup: j79 dawn() draws wkSummary() (groups above) through kitFacts; no markup here */
/* Nhật ký: no lone choice labels */
const rp0=renderPanel;renderPanel=function(){const r=rp0.apply(this,arguments);try{const P=document.getElementById("panel");if(P&&P.dataset.tab==="log")P.querySelectorAll(".logs > div:not([data-nrh])").forEach(d=>{if(LONE.test(T(d.textContent))){d.remove();return}if(d.dataset.nrk)return;d.dataset.nrk=1;const h=d.innerHTML,t=kitNames(h);if(t!==h)d.innerHTML=t})}catch(e){}return r};
})();
/* ===== j65c: one place per job — Việc list drops acts that live in their own tab (owner 11/14) =====
   Luyện cầm kỳ thi họa -> Tài nghệ tab · Dạy hoàng tử/công chúa học chữ, Đưa con đến thỉnh an -> Con cái tab · Thưởng cung nữ -> Kẻ hầu tab */
(function(){const DUP=/^(Luyện cầm kỳ thi họa|Dạy (hoàng tử|công chúa) học chữ|Dạy dỗ|Đưa con đến thỉnh an Hoàng thượng|Thưởng cung nữ)$/;
 try{const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(Array.isArray(deck)&&!(typeof isSrv==="function"&&isSrv()))deck=deck.filter(a=>!DUP.test(a.n||""))}catch(e){}return r}}catch(e){}})();
/* ===== j65d: consort intel said once, as a plain fact (owner 11/14, Hoàng quý phi card) ===== */
(function(){const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
 const FACT=h=>String(h).replace(/nàng có thể hại ngươi \(/g,"nàng muốn hại ngươi (").replace(/Có thể hại ngươi:/g,"Muốn hại ngươi:");
 let onCard=false;
 try{const n0=notesLine;notesLine=function(v){let h=n0.apply(this,arguments);if(!h)return h;
   /* on her card the danger line already says it (live); older reports of it are dropped there */
   if(onCard){const m=h.match(/^(<span class="past">Đã biết: )([\s\S]*)(<\/span>)$/);if(m){const it=m[2].split(" · ").filter(x=>!/báo: nàng (có thể|muốn) hại ngươi/.test(x));h=it.length?m[1]+it.join(" · ")+m[3]:""}}
   return FACT(h)}}catch(e){}
 try{const r0=rvCard;rvCard=function(){onCard=true;try{return FACT(r0.apply(this,arguments))}finally{onCard=false}}}catch(e){}
 try{const p0=popCard;popCard=function(){return FACT(p0.apply(this,arguments))}}catch(e){}
 try{const l0=log;log=function(h){return l0.call(this,FACT(h))}}catch(e){}
 /* act buttons: the same note never twice in one button */
 function dedupeBtns(){document.querySelectorAll("button small").forEach(sm=>{const seen=new Set();sm.querySelectorAll(".ef").forEach(e=>{const t=T(e.textContent);if(!t)return;if(seen.has(t)){const p=e.previousElementSibling;if(p&&p.classList.contains("ksep"))p.remove();e.remove()}else seen.add(t)})})}
 const W=o=>function(){const r=o.apply(this,arguments);try{dedupeBtns()}catch(e){}return r};
 try{renderPanel=W(renderPanel)}catch(e){}try{renderStage=W(renderStage)}catch(e){}try{showModal=W(showModal)}catch(e){}
})();
