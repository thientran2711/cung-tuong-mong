/* ================= jlevel: HỌC THÀNH TÀI — level-up scene (review/scenes-3, sweep S3-203, owner OD:L712) — KIT §86 kitLearn =================
   "Art level-up (every art / Công Dung Ngôn Hạnh level): a short 'học thành tài' celebration scene (painted) that also shows what she gained: new
   effects / abilities / recipes shown as info lines."
   ONE hook for every road (lessons, teachers, Thái hậu, mini-games, works, events): addArt (the 6 tài nghệ, j2; addArtP(S) goes through it) and addVir (Công Dung
   Ngôn Hạnh, j85) — when HER level rises, kitLearn plays after the work that raised it (kmPush queue, behind any edict). NPC consorts: no scene (data only, as always).
   What she gained = the effect table's own lines (ARTFX / VIRFX, the same text as her skill card, ONE source) + the recipes the level opens (Tứ đức, RCP_ST via
   tdsOpenN). No number here.
   PAINTING (owner 17/11 07:45Z): ONE painting PER SUBJECT, img/scene-thanhtai-<k>.webp (k = cam ky thi hoa vu y cong dung ngon hanh, Foreman C, 3:4). kitLearnPic(k) returns it
   only when the CDN index (img/_index.json, KIT_CDNHAVE, jevban) lists it; otherwise (or while the index is not loaded) the skill's own painting (kitSkillArt, the one on her skill
   card) shows AT ONCE — a missing file is never requested, the scene is never black. The picture is warmed when the scene is queued (kmPush pre), the scene waits up to 1.5 s for it.
   ORDER (owner 07:28Z): the made item's result dialog first, then this scene (afterModals), then the buổi transition (jbuoi through the queue), then the next VIỆC (jorder gate).
   kitLearn({kind:"art"|"vir", k, from, to}) — the scene only; kitLearnHTML(o) = its HTML (kit sample page §86). Reduced motion / Hiệu ứng Gọn: final frame at once. */
(function(){
const esc=s=>typeof kmEsc==="function"?kmEsc(s):String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function kitLearnPic(k){const f=`img/scene-thanhtai-${k}.webp`;try{return typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.has(f.replace(/^.*?(?=img\/scene-)/,""))?f:""}catch(e){return""}}  /* build rewrites img/ to the CDN url; the index keys are img/… (as kitEvBanner) */
function info(kind,k,from,to){const V=kind==="vir",T=V?VIR.find(x=>x.k===k):ARTS.find(x=>x.k===k);if(!T)return null;
 const fx=(V?VIRFX:ARTFX)[k]||[];const L=[];for(let l=from+1;l<=to;l++)if(fx[l-1])L.push([`Bậc ${l}`,fx[l-1]]);
 let rec=[];if(V&&typeof RCP_ST==="object"&&typeof TDS_KIND==="object"&&typeof tdsOpenN==="function"){const kd=TDS_KIND[k],st=kd&&RCP_ST[kd];
  if(st)rec=st.slice(tdsOpenN(from),tdsOpenN(to)).map(s=>s[1]).filter(Boolean)}
 if(rec.length)L.push(["Mở thêm",`lối mới: ${rec.join(", ")}`]);
 const name=V?`${T.n} (${T.full})`:T.n;let img="";try{img=V?kitSkillArt("vir",k,T.n):(kitSkillArt("art",k,T.n)||(typeof AIMG==="object"&&AIMG[k]?AIMG[k]:""))}catch(e){}
 return{name,rows:L,img,pic:kitLearnPic(k)||img,levelWord:`${name} lên bậc ${to}`}}
function kitLearnHTML(o){const I=info(o.kind,o.k,o.from,o.to);if(!I)return"";
 const rows=typeof kitRows==="function"?kitRows(I.rows.map(([a,b])=>[a,esc(b)])):I.rows.map(([a,b])=>`<p><b>${esc(a)}</b> ${esc(b)}</p>`).join("");
 /* the same frame as kitPersonReveal (§65.2): header, the centre (here the painting), card with the info lines + ONE button */
 return `<div class="kprev klearn"><div class="kmrew-h kprev-h"><b>Học thành tài</b><small>${esc(I.levelWord)}</small></div>
  <div class="kprev-fig klearn-fig"><img class="klearn-pic" src="${I.pic}" alt="" draggable="false" decoding="async" ${I.pic&&I.img&&I.pic!==I.img?`onerror="this.onerror=null;this.src='${I.img}'"`:`onerror="this.remove()"`}></div>
  <div class="kprev-card klearn-card">${typeof kitSteps==="function"?kitSteps(o.to,0,"","Bậc"):""}<div class="kinvrows klearn-rows">${rows}</div><button type="button" class="kbtn kmtake" data-km-close>Tiếp theo</button></div></div>`}
function kitLearn(o){if(!o||typeof kmPush!=="function"||!kmOn())return;const I0=info(o.kind,o.k,o.from,o.to);
 /* deferred one tick: the road that raised the level pushes its result dialog / reward in the same call, after addArt; the scene is queued BEHIND them (afterModals) */
 setTimeout(()=>{if(!kmOn())return;kmPush(done=>{const st=kmStage("km-reward km-prev km-learn",kitLearnHTML(o),{manual:true,dur:60000,onEnd:done});st.ov.id="klearnov";
  try{if(typeof sfx==="function")sfx("sfx-open")}catch(e){}
  try{if(typeof kitFxBurst==="function"){const f=st.ov.querySelector(".klearn-fig");if(f){kitFxBurst("glowburst",f);kitFxBurst("spark",f,10)}}}catch(e){}},{pre:I0?[I0.pic]:[],afterModals:true})},0)}
window.kitLearn=kitLearn;window.kitLearnHTML=kitLearnHTML;
/* ---------- the hook: her level rose ---------- */
/* addArt / addVir are global function declarations: reassign the binding other code calls by name */
if(typeof addArt==="function"&&!addArt.__lrn){const f0=addArt;addArt=function(k){const l0=S&&S.arts?S.arts[k]|0:0;const r=f0.apply(this,arguments);
  try{const l1=S&&S.arts?S.arts[k]|0:0;if(l1>l0&&!S.dead)kitLearn({kind:"art",k,from:l0,to:l1})}catch(e){console.error("learn",e)}return r};addArt.__lrn=1}
if(typeof addVir==="function"&&!addVir.__lrn){const f0=addVir;addVir=function(p,k){const mine=p===S;const l0=mine&&S.vir?S.vir[k]|0:0;const r=f0.apply(this,arguments);
  try{if(mine){const l1=S.vir?S.vir[k]|0:0;if(l1>l0&&!S.dead)kitLearn({kind:"vir",k,from:l0,to:l1})}}catch(e){console.error("learn",e)}return r};addVir.__lrn=1}
/* ---------- CSS (kit part §86; the layout classes are §65.2's) ---------- */
(function(){const st=document.createElement("style");st.textContent=`
.klearn-fig{min-height:200px;overflow:hidden;border-radius:12px;box-shadow:0 6px 18px #000a}
.klearn-pic{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:kmFade calc(.8s*var(--pace)) ease both}
.klearn-fig::before{display:none}
.klearn-card{width:100%;max-width:520px}
.klearn-rows{width:100%;text-align:left}
`;document.head.appendChild(st)})();
/* ---------- kit sample page §86 ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§86",title:"kitLearn: Học thành tài (tài nghệ / Công Dung Ngôn Hạnh lên bậc)",where:"<b>Level-up scene</b> — every time HER tài nghệ (Cầm, Kỳ, Thi, Họa, Vũ, Y…) or Công Dung Ngôn Hạnh reaches a new bậc: the painting, the bậc steps, the effect lines of the skill card, the recipes it opens, ONE button.",
 html:()=>`<div class="kitpg-row" style="background:#1a0f0acc;padding:10px;border-radius:8px;height:460px">${kitLearnHTML({kind:"art",k:"cam",from:2,to:3}).replace('class="kprev klearn"','class="kprev klearn" style="height:440px"')}</div>`})}catch(e){}
})();
