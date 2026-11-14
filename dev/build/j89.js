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
