/* ================= jwkpics: pictures of the MATERIAL-CHOICE dialog per art / Tứ đức kind (item D53b, review/opt-pics3) =================
   The dialog "<recipe>: dùng vật liệu gì?" (jwkr wkrMat for the arts, jtds for the 4 Tứ đức courses) used to show the generic Tài nghệ banner
   (jevfit "contest-art") and the §59 placeholder on its three material cards. Data mapping only, through the EXISTING mechanisms (no kit change):
   - banner: a KIT_EVFIT function row (jevfit) → img/ev-wk-<key>.webp, spliced in before "contest-art";
   - option cards: KIT_OPT_RULES rows (jopic §6.2), one per kind, built from the recipe names of WKR (so new recipes map by themselves) → img/act-opt-wk-<key>.webp.
   <key> = the art key of the kind (WK[kind].a: cam ky thi hoa vu y theu nau) or, for the Tứ đức works, the kind itself (kimchi phanson thuchuc phucthien).
   Kind "kinh" (Chép kinh): banner = Thi's, its option cards keep their own older picture (chep-kinh-h rule). Pictures are on the CDN (kitPhOnCdn); not there → the old banner / placeholder. */
(function(){
 const SKIP={kinh:1};
 const keyOf=kind=>{try{return typeof tdsKinds==="function"&&tdsKinds().includes(kind)?kind:WK[kind].a}catch(e){return""}};
 const labOf=kind=>{try{if(typeof tdsKinds==="function"&&tdsKinds().includes(kind))return WK[kind].n;const a=ARTS.find(x=>x.k===WK[kind].a);return a?a.n:WK[kind].n}catch(e){return""}};
 let IDX=null;/* recipe name → kind (first kind wins) */
 const idx=()=>{if(IDX)return IDX;IDX={};try{for(const kind of Object.keys(WKR)){if(!WK[kind])continue;for(const r of WKR[kind])if(r&&r.n&&!IDX[r.n])IDX[r.n]=kind}}catch(e){}return IDX};
 window.kitWkBanner=function(m){try{const t=String(m&&(m.t||"")).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().replace(/: dùng vật liệu gì\?$/,"");
  const kind=idx()[t];if(!kind)return"";const k=keyOf(kind);if(!k)return"";const src=`img/ev-wk-${k}.webp`;
  if(typeof kitPhOnCdn==="function"&&!kitPhOnCdn(src))return"";return{src,lab:labOf(kind)}}catch(e){return""}};
 /* banner row before the generic Tài nghệ one */
 try{const i=KIT_EVFIT.findIndex(r=>r[0]==="contest-art");KIT_EVFIT.splice(i<0?0:i,0,["wk-material",m=>window.kitWkBanner(m),/: dùng vật liệu gì\?$/i,null])}catch(e){}
 /* option rows: per kind the regex of its recipe names, title form "<recipe> · <material>" (jwkr / jtds) and the older "<work> · <material>" (j83) */
 try{const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const by={};
  for(const [n,kind] of Object.entries(idx())){if(SKIP[kind])continue;const k=keyOf(kind);if(k)(by[k]=by[k]||[]).push(esc(n))}
  for(const kind of Object.keys(WK)){if(SKIP[kind]||!WK[kind].w)continue;const k=keyOf(kind);if(k)(by[k]=by[k]||[]).push(esc(WK[kind].w))}
  const rows=Object.entries(by).map(([k,L])=>[new RegExp("^(?:"+[...new Set(L)].join("|")+") ·","i"),"opt-wk-"+k]);
  KIT_OPT_RULES.unshift(...rows)}catch(e){}
})();
