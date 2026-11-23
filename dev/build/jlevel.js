/* ================= jlevel: HỌC THÀNH TÀI — level-up scene (review/scenes-3, sweep S3-203, owner OD:L712) — KIT §86 kitLearn =================
   "Art level-up (every art / Công Dung Ngôn Hạnh level): a short 'học thành tài' celebration scene (painted) that also shows what she gained: new
   effects / abilities / recipes shown as info lines."
   ONE hook for every road (lessons, teachers, Thái hậu, mini-games, works, events): addArt (the 6 tài nghệ, j2; addArtP(S) goes through it) and addVir (Công Dung
   Ngôn Hạnh, j85) — when HER level rises, kitLearn plays after the work that raised it (kmPush queue, behind any edict). NPC consorts: no scene (data only, as always).
   What she gained = the effect table's own lines (ARTFX / VIRFX, the same text as her skill card, ONE source) + the recipes the level opens (Tứ đức, RCP_ST via
   tdsOpenN). No number here.
   FULL SCREEN (owner 21/11 mark #52: "Vẽ … một cái nền tranh ứng với từng cái môn học đó … trên iPad là phải ngang nguyên một cái màn hình, full nguyên cái màn hình"):
   the scene is a full-bleed scene (KIT 81b .km-full) on THE full-screen picture (KIT 81c kitFullPic): one painting PER SUBJECT, portrait on the phone
   img/learn-<art|vir>-<k>-port.webp, landscape on the iPad img/learn-<art|vir>-<k>-land.webp (ART REQUEST to Foreman C; live once listed in img/INFO.json).
   Until a subject's painting lands: the skill's own painting (kitSkillArt, the one on her skill card) blurred over the screen with the sharp one in the middle.
   Title on top, the card (bậc, what she gained, ONE button) at the bottom, both ON the picture.
   kitLearn({kind:"art"|"vir", k, from, to}) — the scene only; kitLearn({t}) = a learning without a subject level (a new lối, jky): title + the line, no bậc.
   kitLearnHTML(o) = its HTML (kit sample page §86). Reduced motion / Hiệu ứng Gọn: final frame at once. */
(function(){
const esc=s=>typeof kmEsc==="function"?kmEsc(s):String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function info(kind,k,from,to){const V=kind==="vir",T=V?VIR.find(x=>x.k===k):ARTS.find(x=>x.k===k);if(!T)return null;
 const fx=(V?VIRFX:ARTFX)[k]||[];const L=[];for(let l=from+1;l<=to;l++)if(fx[l-1])L.push([`Bậc ${l}`,fx[l-1]]);
 let rec=[];if(V&&typeof RCP_ST==="object"&&typeof TDS_KIND==="object"&&typeof tdsOpenN==="function"){const kd=TDS_KIND[k],st=kd&&RCP_ST[kd];
  if(st)rec=st.slice(tdsOpenN(from),tdsOpenN(to)).map(s=>s[1]).filter(Boolean)}
 if(rec.length)L.push(["Mở thêm",`lối mới: ${rec.join(", ")}`]);
 const name=V?`${T.n} (${T.full})`:T.n;let img="";try{img=V?kitSkillArt("vir",k,T.n):(kitSkillArt("art",k,T.n)||(typeof AIMG==="object"&&AIMG[k]?AIMG[k]:""))}catch(e){}
 return{name,rows:L,img,levelWord:`${name} lên bậc ${to}`}}
function kitLearnHTML(o){o=o||{};let I=info(o.kind,o.k,o.from,o.to);let key=I?`learn-${o.kind==="vir"?"vir":"art"}-${o.k}`:"";
 /* a learning with no subject level (jky: a new lối) — same scene, its own line, no bậc (before: an empty overlay with no button) */
 if(!I){if(!o.t)return"";let img="";try{img=kitSkillArt("art","")}catch(e){}I={name:"",rows:[],img,levelWord:String(o.t)}}
 const rows=typeof kitRows==="function"?kitRows(I.rows.map(([a,b])=>[a,esc(b)])):I.rows.map(([a,b])=>`<p><b>${esc(a)}</b> ${esc(b)}</p>`).join("");
 /* §65.2 classes (header, card + ONE button) on THE full-screen picture (KIT 81c): header on top, card at the bottom */
 const pic=typeof kitFullPicHTML==="function"?kitFullPicHTML({key,fb:I.img,mode:"blur",cls:"klearn-fig"}):"";
 return `<div class="kprev klearn">${pic}<div class="kmrew-h kprev-h klearn-h"><b>Học thành tài</b><small>${esc(I.levelWord)}</small></div>
  <div class="klearn-sp"></div>
  <div class="kprev-card klearn-card">${o.to&&typeof kitSteps==="function"?kitSteps(o.to,0,"","Bậc"):""}${I.rows.length?`<div class="kinvrows klearn-rows">${rows}</div>`:""}<button type="button" class="kbtn kmtake" data-km-close>Tiếp theo</button></div></div>`}
function kitLearn(o){if(!o||typeof kmPush!=="function"||!kmOn()||!kitLearnHTML(o))return;kmPush(done=>{const st=kmStage("km-reward km-prev km-learn km-full",kitLearnHTML(o),{manual:true,dur:60000,onEnd:done});st.ov.id="klearnov";
  try{if(typeof sfx==="function")sfx("sfx-open")}catch(e){}
  try{if(typeof kitFxBurst==="function"){const f=st.ov.querySelector(".klearn-fig");if(f){kitFxBurst("glowburst",f);kitFxBurst("spark",f,10)}}}catch(e){}})}
window.kitLearn=kitLearn;window.kitLearnHTML=kitLearnHTML;
/* ---------- the hook: her level rose ---------- */
/* addArt / addVir are global function declarations: reassign the binding other code calls by name */
if(typeof addArt==="function"&&!addArt.__lrn){const f0=addArt;addArt=function(k){const l0=S&&S.arts?S.arts[k]|0:0;const r=f0.apply(this,arguments);
  try{const l1=S&&S.arts?S.arts[k]|0:0;if(l1>l0&&!S.dead)kitLearn({kind:"art",k,from:l0,to:l1})}catch(e){console.error("learn",e)}return r};addArt.__lrn=1}
if(typeof addVir==="function"&&!addVir.__lrn){const f0=addVir;addVir=function(p,k){const mine=p===S;const l0=mine&&S.vir?S.vir[k]|0:0;const r=f0.apply(this,arguments);
  try{if(mine){const l1=S.vir?S.vir[k]|0:0;if(l1>l0&&!S.dead)kitLearn({kind:"vir",k,from:l0,to:l1})}}catch(e){console.error("learn",e)}return r};addVir.__lrn=1}
/* ---------- CSS (kit part §86; the layout classes are §65.2's) ---------- */
(function(){const st=document.createElement("style");st.textContent=`
/* full screen (owner mark #52): the overlay is a full-bleed scene (81b), the picture layer is kitFullPic (81c); title on top, card at the bottom, ON the picture */
.km-learn .kmst{position:absolute;inset:0;width:auto;max-width:none;max-height:none}
.kprev.klearn{position:absolute;inset:0;width:auto;max-width:none;height:auto;padding:max(12px,env(safe-area-inset-top,0px)) 16px max(16px,env(safe-area-inset-bottom,0px));justify-content:space-between;gap:10px}
.klearn>.klearn-fig{animation:kmFade calc(.8s*var(--pace)) ease both}
.klearn>.klearn-h,.klearn>.klearn-card{position:relative;z-index:2}
.klearn-h b{text-shadow:0 1px 3px #000c,0 0 14px #000a}.klearn-h small{text-shadow:0 1px 3px #000c}
.klearn-sp{flex:1 1 auto;min-height:0}
.klearn-card{width:100%;max-width:520px}
.klearn-rows{width:100%;text-align:left}
`;document.head.appendChild(st)})();
/* ---------- kit sample page §86 ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§86",title:"kitLearn: Học thành tài (tài nghệ / Công Dung Ngôn Hạnh lên bậc)",where:"<b>Level-up scene</b> — every time HER tài nghệ (Cầm, Kỳ, Thi, Họa, Vũ, Y…) or Công Dung Ngôn Hạnh reaches a new bậc: the painting, the bậc steps, the effect lines of the skill card, the recipes it opens, ONE button.",
 html:()=>`<div class="kitpg-row" style="position:relative;overflow:hidden;background:#1a0f0acc;border-radius:8px;height:460px">${kitLearnHTML({kind:"art",k:"cam",from:2,to:3})}</div>`})}catch(e){}
})();
