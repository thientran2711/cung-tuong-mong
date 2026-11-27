/* ================= jimg: ẢNH NGƯỜI SẮC NÉT, NGƯỜI LẠ LÀ HÌNH BÓNG (owner 11/15 08:05Z "mặt mờ nhòe, bị phóng to, chỉ thấy nửa mặt — kiểm tra toàn bộ ảnh") =================
   Audit: dev/test/img-quality.js → dev/test/IMG_QUALITY.md (every person picture on every screen at 755x1000@2 and 1180x820@2).
   Causes found and fixed here (wraps, edits nothing):
   1. Old 256x256 face-*.webp shown while a por-*.webp exists. porOf (j39/j57) and kidPor (j73) returned the old square face until the
      portrait had finished loading in a hidden Image(), then re-rendered only the main screen. On a phone (slow line, 600 MB of art
      still downloading) cards, strips, dialogs and the identity card showed the square face in the 3:4 kit window: object-fit cover
      on a 256 px square = up to 1.7x upscale, both sides cut away (half a face) and the j60 oval vignette mask on top (blurred edge).
      Now the por-* src is returned at once (the browser shows it as it arrives); the old face is used only when the por is known to
      be missing (load error) or no por exists for that person.
   2. Strangers in the wrong frame: a person whose face she has not seen is drawn by j61 as the grey silhouette, but when the face
      object reached the kit without its person (court eunuchs, Tổng quản, công tử, some servants) kitDecor still chose the role frame
      (frame-man walnut "khung nam", maid/eunuch frames) around the silhouette. Rule (KIT 4.3/4.4): silhouette ⇒ the grey stone
      frame-unknown + bg-unknown + tok-unknown; label "Người lạ", or the title when the name is known (j61 k61NoFace).
   3. The silhouettes themselves: img/kit/unknown-f|m|k.webp were 360x480 misty grey busts with a cloud ground, the head filling the
      window — read as a blurred, zoomed face. Re-cut (dev/figwork/silpor.py) from the painted stage silhouettes at 768x1012 with the
      portrait's bust framing (whole head + shoulders), clean soft edge, transparent ground (the stone frame's brocade shows).
      Stage silhouettes unknown-fig-* re-exported at 1350 px tall (no upscale on the Fold stage).
   4. Stage strangers: j59 drew the stranger's OWN figure grey and blurred (filter blur 2px) until the silhouette had loaded. A real
      face is never blurred: the figure stays hidden for that moment, and the silhouettes are fetched at start. */
(function(){
/* 1 — por at once */
/* before the three FIGURES manifests have loaded (j39 FIGSIG empty: the first seconds after start on a slow line) nobody's portrait is known
   yet: the frame shows the initials on its brocade for that moment, never the old square face (j39 re-renders once the manifests arrive) */
const figReady=()=>{try{return typeof FIGSIG==="undefined"||!!FIGSIG}catch(e){return true}};
const oldFace=s=>typeof s==="string"&&/(^|\/)face-[^/]*\.webp/.test(s);
if(typeof porOf==="function"){const p0=porOf;porOf=function(who,fb){const r=p0.apply(this,arguments);try{
  if(r===fb&&oldFace(fb)&&!figReady())return "";
  if(r===fb&&who&&typeof FIGS!=="undefined"&&FIGS.length&&typeof figFor==="function"){
   const src=figFor(who===S?S:who===S.emp?{kind:"emp"}:who===S.thO?{kind:"th"}:{ref:who},"por");
   if(src&&src!==fb&&PORK[src]!==0)return src}}catch(e){}return r}}
if(typeof kidPor==="function"){const k0=kidPor;kidPor=function(k,fb){const r=k0.apply(this,arguments);try{
  if(r===fb&&oldFace(fb)&&!figReady())return "";
  if(r===fb&&typeof kidFigSrc==="function"){const src=kidFigSrc(k,"por");if(src&&src!==fb&&KPORK[src]!==0)return src}}catch(e){}return r}}
/* review/small-bugs-2 (owner: blank header portrait on the cung nữ road at 1180x820): HER portrait never waits for the manifests. Her
   identity (S.fid "player:lookN") is kept for life and her por depends only on look + age band (one dress for every life type: cung nữ,
   lãnh cung, every origin), so before FIGURES*.json arrive the header, cards and dialogs still show her own face, never the initials. */
/* review r6 (player-dress on main: every life now has a consort identity S.pid, por-consort-*, which needs the manifests): her last
   resolved portrait is kept in S.porMe (saved) and shown until the manifests arrive — a reload never shows an empty frame */
function mePor(){try{const m=/^player:(.+)$/.exec(S&&S.fid||"");if(!m)return S&&typeof S.porMe==="string"&&!(typeof PORK!=="undefined"&&PORK[S.porMe]===0)?S.porMe:"";const a=S.age||BAL.ageMin;const b=BAL.ageArt[Math.min(3,ageBandIx(a))];/* the player set: bands 0–3 */
 const src=`img/por-player-${m[1]}-t1-${b}.webp`;return typeof PORK!=="undefined"&&PORK[src]===0?"":src}catch(e){return""}}
window.kitMePor=mePor;
if(typeof porOf==="function"){const p1=porOf;porOf=function(who,fb){const r=p1.apply(this,arguments);try{if(who===S&&S&&typeof r==="string"&&/(^|\/)por-[^/]*\.webp/.test(r)&&!oldFace(r))S.porMe=r;if(who===S&&S&&(!r||(oldFace(r)&&!figReady()))){const m=mePor();if(m)return m}}catch(e){}return r}}
/* a por that fails to load falls back to the old face in place (never a broken frame) */
document.addEventListener("error",e=>{try{const im=e.target;if(!im||im.tagName!=="IMG")return;const s=im.getAttribute("src")||"";if(!/(^|\/)por-/.test(s)||im.dataset.jimgFb)return;
  if(typeof PORK!=="undefined")PORK[s]=0;if(typeof KPORK!=="undefined"&&/por-kid-/.test(s))KPORK[s]=0;im.dataset.jimgFb="1";kitRenderSoon(300)}catch(x){}},true);

/* 2 — a silhouette always stands in the stone frame */
const isSil=f=>!!f&&(f.stranger||/kit\/unknown-[fmk]\.webp/.test(String(f.src||"")));
if(typeof kitDecor==="function"){const d0=kitDecor;kitDecor=function(f){const d=d0.apply(this,arguments);try{if(d&&d.role!=="unknown"&&isSil(f)){
  const e=(typeof k61PortEnt==="function"&&k61PortEnt(f))||f.__kp;let lab="Người lạ";try{if(e&&typeof k61NoFace==="function"&&k61NoFace(e))lab=k61Lab(e)}catch(x){}
  return Object.assign({},d,{role:"unknown",known:false,frame:KIT_DIR+"frame-unknown.webp",bg:KIT_DIR+"bg-unknown.webp",badge:KIT_DIR+"tok-unknown.webp",emb:null,tint:null,col:"#9aa0a6",unknownSrc:/kit\/unknown-[fmk]\.webp/.test(String(f.src||""))?f.src:d.unknownSrc,metal:(KIT_ROLES.unknown||{}).metal||d.metal,label:lab})}}catch(x){}return d}}

/* 5 — men's portraits: under the old j54 h54Face the công tử of the court families took the 11 "man" identities (FIGURES-others) first,
   so 6 of the 9 palace men (sứ thần, nhạc sư, thị vệ…) had no por and showed the old 256 px face-official-*.webp (1.55–1.7x upscale).
   jht.js (review/hoang-tu, on main) now gives công tử their own faces (FIGURES-congtu.json) and the grey silhouette while unknown, and never
   takes a men-pool identity, so h54Face is left to jht (reviewer r6: an extra silhouette wrapper here hid the công tử portrait even after
   "Dò hỏi gia thế" / hứa hôn). An old save whose men lost out still takes the identity back from a công tử (s.fid, unused by jht). */
if(typeof figPick==="function"){const p0=figPick;figPick=function(who){let r=p0.apply(this,arguments);try{
  if(!r&&who&&S&&(S.men||[]).includes(who)&&typeof FIGIX!=="undefined"&&FIGIX.man){
   const ct=(S.hPool||[]).find(s=>s&&s.fid&&FIGIX.man[s.fid]);
   if(ct){const k=ct.fid;delete ct.fid;who.fid=k;r=k}}}catch(e){}return r}}

/* 4 — stage strangers: never the real figure blurred */
try{["m","f"].forEach(g=>{if(typeof j59unkSrc==="function")j59unkSrc(g)})}catch(e){}
const st=document.createElement("style");st.id="jimg";st.textContent=
 ".stage.j59 .tok.fig.j59unk .figimg,.stage.j59 .tok.fig.j59unk.j59sel .figimg{filter:none!important;visibility:hidden!important}";
document.head.appendChild(st);
})();
