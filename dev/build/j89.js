/* ================= j89 TRANH SỰ KIỆN (data only: no CSS, no HTML, no UI) =================
   img/EVENTS.json = {default, categories:{cat:{title,files:[...]}}, events:{eventId:cat}}; art = img/ev-<cat>[-n].webp, 3:4, no faces.
   evArtOf(eventId, salt) -> image path ("" before the manifest loads). The kit owner wires it into news / week-book pages.
   Name note: the old global evArt() (room backdrop by place, j-core) is NOT touched; this module uses evArtOf / evArtCat.
   eventId is namespaced: "e68:<EV6 id>", "j7:<ev id>", "arc:<ARC67 id>", "plot:<j70 kind>", "qs:<j55 kind>", "fest:<festival>",
   "news:<k>", "sys:<k>", "j3:<dilemma>", "j24:<approach>", "j54:<id>", "j55:tdPop", "j22:affair"; "hh:*", "lc:*", "cnv:*", "j42:*" match a whole prefix.
   A bare id without namespace is tried against every namespace. salt (e.g. variant index or week) picks among the category's files, stably. */
let EVART=null;
(function(){try{fetch("img/EVENTS.json").then(r=>r.ok?r.json():null).then(j=>{if(j&&j.categories)EVART=j}).catch(()=>{})}catch(e){}})();
function evArtCat(id){const A=EVART;if(!A||!id)return null;id=String(id);const E=A.events||{};
 if(E[id])return E[id];
 const ns=id.indexOf(":");if(ns>0&&E[id.slice(0,ns)+":*"])return E[id.slice(0,ns)+":*"];
 if(ns<0){for(const k in E){const i=k.indexOf(":");if(i>0&&k.slice(i+1)===id)return E[k]}}
 return null}
function evArtOf(id,salt){try{const A=EVART;if(!A)return"";const c=evArtCat(id)||A.default;const C=A.categories[c]||A.categories[A.default];if(!C||!C.files||!C.files.length)return"";
 const s=String(id)+"|"+(salt==null?"":salt);let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return C.files[h%C.files.length]}catch(e){return""}}
function evArtTitle(id){const A=EVART;const c=A&&(evArtCat(id)||A.default);return c&&A.categories[c]?A.categories[c].title:""}
/* ---- Mệnh truyện (j67): stArtOf(arcId, beat, ending) -> image path. beat = beat id ("s1","c2","t1","x1"...; "G.x" global beats use ev art),
   ending = ending key ("win","mid","lose",...) or null; with neither -> the arc cover ("bia"). Missing file -> the arc's own cover,
   then the ev-* category that fits (EVENTS.json stories[arc].fb / efb). */
function stArtOf(arc,beat,ending){try{const A=EVART;if(!A||!A.stories)return"";const s=A.stories[arc];
 const G={rumor:"tin-don",emp:"hoang-de-vui",spy:"tai-mat",th:"thinh-an",rival:"tranh-sung",hh:"thinh-an",gift:"khach-den",night:"hoang-de-dem",srv:"cung-nhan",ill:"benh-tat"};
 const evc=c=>{const C=c&&A.categories[c];return C&&C.files.length?C.files[0]:""};
 if(beat&&String(beat).startsWith("G."))return evc(G[String(beat).slice(2)])||evArtOf("j67:"+beat);
 if(!s)return evArtOf("arc:"+arc);
 const key=ending?"ket-"+ending:(beat||"bia");
 return s.files[key]||(ending&&s.efb&&evc(s.efb[ending]))||s.files.bia||evc(s.fb)||evArtOf("arc:"+arc)}catch(e){return""}}
