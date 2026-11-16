/* ================= jpres — EVENT PRESENTATION BY GROUP (owner 15/11 20:05Z items 11-13 + 22:45Z list; D11, review/presentation) =================
   ONE table, no new art: every event dialog belongs to a GROUP (its picture category from EVENTS.json = evArtCat, the same key that picks the
   event picture and its kit category frame KIT §32.3). The group decides, ONCE when the card opens:
     - SOUND   a sting (SFXN moment) unless the card text already matches a keyword sound (jsfx SFXTXT wins: one sound per card)
     - MUSIC   the background track while the card is up (j11 musicCtx used to say "tension" for every event card)
     - VOICE   a fallback voice only when j36's tone logic found none (never over it)
     - FX      a painted §68 effect through kitFx / kitFxBurst / kitFxEdge (Gọn / reduced motion / bots: those functions do nothing)
     - FRAME   data hooks on the dialog: data-kpres-grp, data-kpres-cat, and for story cards data-kpres-story=main|side + data-kpres-origin=<k>
               (the kit's category frame colour already follows the group; the 9 origin frames need kit art = KIT REQUEST in the report).
   Wrap only: showModal (after jsfx) + musicCtx. Co-op: local presentation after the card is shown, nothing is sent or awaited.
   Test hook: window.KPRES_LOG [{cat,grp,sfx,mus,vo,fx,story}]; test dev/test/presentation.js. =================================================== */
/* group → default presentation. sfx = SFXN moment · mus = bgm file · vo = voice key (fallback) · fx = {kit}|{px:[sprite,n]}|{edge} */
const KPG={
 "trieu-chinh":{sfx:"edict",mus:"bgm-day"},
 "sung-ai":    {sfx:"favour",mus:"bgm-night",fx:{px:["petal-peach",7]}},
 "trung-phat": {sfx:"gloom",mus:"bgm-tension",fx:{kit:"ink"}},
 "le-nghi":    {sfx:"rite",mus:"bgm-festival"},
 "cham-con":   {sfx:"bloom",mus:"bgm-day"},
 "giao-thiep": {sfx:"visitor",mus:"bgm-day"},
 "hau-ha":     {sfx:"notice",mus:"bgm-day"},
 "hoc-tap":    {sfx:"notice",mus:"bgm-day"},
 "nghi-ngoi":  {sfx:"notice",mus:"bgm-day"},
 "muu-ke":     {sfx:"schemeOk",mus:"bgm-tension"},
 "hai-nguoi":  {sfx:"poison",mus:"bgm-tension",fx:{edge:"poison"}}};
/* per picture category: overrides of its group (only what differs) */
const KPC={
 /* triều chính: bad news vs good news vs rites */
 "lu-lut":{sfx:"alarm",mus:"bgm-tension"},"han-han":{sfx:"alarm",mus:"bgm-tension"},"bien-ai":{sfx:"alarm",mus:"bgm-tension"},"tham-quan":{sfx:"gloom",mus:"bgm-tension"},
 "thang-tran":{sfx:"win",fx:{px:["petal-gold",8]}},"duoc-mua":{sfx:"win"},"dai-xa":{sfx:"decree",fx:{px:["petal-gold",8]}},
 "su-than":{sfx:"visitor"},"hoa-than":{sfx:"gloom",mus:"bgm-sorrow"},
 "quoc-tang":{sfx:"death",mus:"bgm-sorrow",vo:"f-sigh"},"tang-le":{sfx:"death",mus:"bgm-sorrow",vo:"f-sigh"},
 /* sủng ái */
 "hoang-de-vui":{sfx:"favour",fx:{kit:"favour"},vo:"f-laugh-soft"},"hoang-de-dem":{sfx:"night",fx:{kit:"night"}},
 "vi-hanh":{sfx:"step",mus:"bgm-day"},"di-san":{sfx:"favour"},"tu-tinh":{sfx:"favour",fx:{kit:"romance"},vo:"f-laugh-soft"},"mat-uoc":{sfx:"favour",fx:{kit:"romance"}},"nguy-gia":{sfx:"step",fx:0},
 /* trừng phạt */
 "hoang-de-gian":{sfx:"gloom",fx:{kit:"ink"},vo:"m-angry"},"hinh-phat":{sfx:"cane",fx:{kit:"ink"}},"lanh-cung":{sfx:"doorShut",mus:"bgm-cold",fx:{kit:"ash"}},"hoa-hoan":{sfx:"alarm",fx:{px:["ember",10]}},
 /* lễ nghi */
 "le-xuan":{sfx:"festival",mus:"bgm-festival",fx:{px:["petal-plum",8]}},"le-ha":{sfx:"festival",mus:"bgm-festival",fx:{px:["petal-lotus",6]}},
 "le-thu":{sfx:"festival",mus:"bgm-festival",fx:{px:["leaf",6]}},"le-dong":{sfx:"festival",mus:"bgm-festival",fx:{px:["snow",8]}},
 "te-le":{sfx:"rite",mus:"bgm-sorrow"},"yen-tiec":{sfx:"banquet",mus:"bgm-festival",vo:"crowd-gossip"},
 "tan-phong":{sfx:"edict",fx:{px:["petal-gold",8]}},"tuyen-tu":{sfx:"visitor",mus:"bgm-day"},"thinh-an":{sfx:"kneel",mus:"bgm-day"},"hh-viec":{sfx:"rite",mus:"bgm-day"},
 /* chăm con */
 "sinh-no":{sfx:"bloom",fx:{px:["petal-lotus",6]}},"con-tre":{sfx:"bloom",vo:"child-laugh"},
 /* giao thiệp */
 "khach-den":{sfx:"visitor"},"thu-nha":{sfx:"notice",fx:{px:["paper",6]}},"chuyen-la":{sfx:"notice",mus:"bgm-night"},"tham-hoi":{sfx:"visitor"},
 "qua-tang":{sfx:"lidGift",fx:{px:["spark",6]}},"bac-tien":{sfx:"coin"},"hao-huu":{sfx:"join"},"tin-cung":{sfx:"notice"},
 /* hầu hạ */
 "cung-nhan":{sfx:"step"},"cung-nu":{sfx:"step"},"canh-phong":{sfx:"notice"},
 /* học tập, thiên thời */
 "tai-nghe":{sfx:"mgwin"},"thoi-tiet":{sfx:"wind"},"dieu-troi":{sfx:"xamDrop",mus:"bgm-night"},"dieu-lanh":{sfx:"lotGood",fx:{px:["petal-lotus",6]}},
 "benh-tat":{sfx:"sick",mus:"bgm-sorrow",vo:"f-sigh"},"dich-benh":{sfx:"sick",mus:"bgm-sorrow"},
 /* mưu kế */
 "tranh-sung":{sfx:"schemeOk"},"tin-don":{sfx:"schemeOk",fx:{kit:"rumour"},vo:"crowd-gossip"},"tai-mat":{sfx:"search",fx:{px:["paper",6]}},"mat-bao":{sfx:"search",fx:{px:["paper",6]}},
 "am-muu":{sfx:"schemeOk"},"vu-oan":{sfx:"expose",fx:{kit:"ink"}},"hoi-lo":{sfx:"coin",fx:{kit:"coin"}},
 /* hại người */
 "dau-doc":{sfx:"poison",fx:{edge:"poison"}},"hai-thai":{sfx:"gloom",fx:{edge:"blood"},mus:"bgm-sorrow"}};
const KPFEST={sfx:"festival",mus:"bgm-festival",fx:{kit:"lantern"}};
const KPRES_LOG=window.KPRES_LOG=[];const KPRES_LAST={};
/* the picture category of a card (null = not an event card): same sources as the picture itself (jk2b kitEvArt chain) */
function kpresCat(m){try{if(!m||m.kit&&(m.kit.shop||m.kit.pick))return null;
 let c=null;if(typeof evArtCat==="function"){const pp=m.pp||{};const id=m.evId||(m.pid?m.pid+(pp.id||pp.k?":"+(pp.id||pp.k):""):"");c=(id&&evArtCat(id))||(m.pid&&evArtCat(m.pid))||null}
 if(!c&&typeof kitEvArt==="function"){const a=kitEvArt(m);const mm=a&&/\/ev-([a-z0-9]+(?:-[a-z0-9]+)*?)(?:-[b-z]|-\d+)?\.webp/.exec(String(a.src||""));if(mm)c=mm[1]}
 return c||null}catch(e){return null}}
function kpresGrp(c){try{return c&&(/^fest/.test(c)?"le-nghi":(typeof KIT_EVCAT==="object"&&KIT_EVCAT[c])||null)}catch(e){return null}}
/* story cards: "Chính tuyến · …" / "Phụ tuyến · …" (jstory labels); main = her origin's line */
function kpresStory(m){const t=String(m&&m.t||"").replace(/<[^>]+>/g,"");return /^\s*Chính tuyến/.test(t)?"main":/^\s*Phụ tuyến/.test(t)?"side":""}
function kpresPlan(m){const c=kpresCat(m),story=kpresStory(m);if(!c&&!story)return null;const g=kpresGrp(c);
 const P=Object.assign({},KPG[g]||{},/^fest/.test(c||"")?KPFEST:{},KPC[c]||{});
 if(!c&&story){/* story card with no event picture: main line = grave (court), side = plain */ Object.assign(P,story==="main"?{sfx:"edict",mus:"bgm-day"}:{sfx:"notice"})}
 return Object.assign(P,{cat:c||"",grp:g||(story?"story":""),story})}
function kpresFx(f,el){if(!f)return"";try{
 if(f.kit&&typeof kitFx==="function"){if(!KPRES_LAST[f.kit]||performance.now()-KPRES_LAST[f.kit]>6000){KPRES_LAST[f.kit]=performance.now();kitFx(f.kit,{el})}return"kit:"+f.kit}
 if(f.px&&typeof kitFxBurst==="function"){kitFxBurst(f.px[0],null,f.px[1]);return"px:"+f.px[0]}
 if(f.edge&&typeof kitFxEdge==="function"){kitFxEdge(f.edge,{in:500,hold:900,out:1100,opacity:.7});return"edge:"+f.edge}}catch(e){}return""}
function kpresShow(m){try{if(!m||m.__pres)return;const P=kpresPlan(m);if(!P)return;m.__pres=P;
 const md=document.getElementById("modal"),dlg=md&&md.querySelector(".dlg");
 if(dlg){dlg.dataset.kpresGrp=P.grp;dlg.dataset.kpresCat=P.cat;if(P.story){dlg.dataset.kpresStory=P.story;try{if(P.story==="main"&&S&&S.origin)dlg.dataset.kpresOrigin=S.origin.k}catch(e){}}}
 if(typeof S!=="undefined"&&S&&!S.dead&&P.mus)m.__presMus=P.mus;
 let sfx="",vo="",fx="";
 const kw=typeof ksfxText==="function"?ksfxText((m.t||"")+" "+(m.h||"")):null;
 if(P.sfx&&!kw&&typeof kitSfx==="function"&&kitSfx(P.sfx,{at:140}))sfx=P.sfx;
 try{if(P.vo&&typeof voKind==="function"&&!voKind(m)&&typeof voice==="function"){voice(P.vo);vo=P.vo}}catch(e){}
 fx=kpresFx(P.fx,dlg||null);
 KPRES_LOG.push({cat:P.cat,grp:P.grp,sfx,mus:P.mus||"",vo,fx,story:P.story||""});if(KPRES_LOG.length>80)KPRES_LOG.shift()}catch(e){console.error("kpres",e)}}
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function"||o.__kpres)return;const w=f(o);w.__kpres=1;window[n]=w;try{(0,eval)(n+"=window."+n)}catch(e){}};
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{kpresShow(typeof Q!=="undefined"&&Q[0])}catch(e){}return r});
 W("musicCtx",o=>function(){try{const m=typeof Q!=="undefined"&&Q[0];if(m&&m.__presMus&&S&&!S.dead&&S.place!=="lc"&&(m.pid||m.evId))return m.__presMus}catch(e){}return o.apply(this,arguments)})})();
window.kpresPlan=kpresPlan;window.kpresCat=kpresCat;window.KPC=KPC;window.KPG=KPG;
