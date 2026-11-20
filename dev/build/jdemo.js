/* ================= jdemo: GIÁNG PHẨM / LÃNH CUNG — Nội vụ phủ thu đồ vượt phẩm (review/scenes-3, sweep S3-82, owner OD:L374 08:35Z) =================
   "Demoted / sent to cold palace: above-rank items are CONFISCATED in a scene — Nội vụ phủ eunuch (person dialog) takes each item cell onto a tray,
   announcing the confiscation by decree."
   ONE rule for her and every consort (two-way): jdh2's weekly state check (dhCheck → window.dhConfiscate, every route caught: demote, fall, cold, inline
   rank drops) is the ONE hook. After it, demoSeize(p, kind, why) takes every WORN piece above the person's new standing:
     · jewellery in the chest worn (e.w) with IT.rk > rank (lãnh cung: any worn piece; plain clothes, no jewellery — art rule),
     · wardrobe slots tram / y (j92 wdOf) with phẩm > her phẩm (wdPOf; lãnh cung 0); the issued base robe (from:"base") stays.
   The pieces go to the Nội vụ phủ store (S.il.box, why "demote", own = pk) and come home by themselves once the owner stands high enough again
   (demoReturn, weekly): nothing is ever lost for good. Her side: the scene = KIT person dialog (kitPanel notice, subject = the Nội vụ phủ eunuch
   pEunCourt("ped")), the decree line, the tray = the kit item tags (kitItemTag, KIT §70) of each piece; no per-piece kitLose card (tagged "use").
   An NPC consort loses them the same way (data + news line, co-op host only like every NPC rule). No numbers here: the rank rule is vpItems' own. */
(function(){
const npcOK=()=>!(window.COOPW&&COOPW.on&&COOPW.seat!=="a");
const pk=p=>p===S?"me":String(p&&p.id);
const byK=k=>{if(k==="me")return S;try{return (rivals||[]).find(v=>String(v.id)===String(k))||null}catch(e){return null}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const alive=p=>{try{return typeof window.alive==="function"?window.alive(p):!!p&&!p.dead}catch(e){return !!p}};
function box(){if(!S.il||typeof S.il!=="object")S.il={};S.il.box=S.il.box||[];S.il.log=S.il.log||[];return S.il.box}
function nameOf(e){try{const w=typeof wdItem==="function"?wdItem(e):null;if(w)return w.n}catch(x){}return IT[e.k]?IT[e.k].n:String(e.k)}
/* her standing after the fall: lãnh cung = below every rank */
function stand(p){return p.out?-1:rkOf(p)}
/* what the person wears above that standing: [{e, sl}] (sl = wardrobe slot, "" = a piece worn from the chest) */
function above(p){const r=stand(p),L=[];
 for(const e of p.inv||[])if(e&&e.w&&!e.h&&IT[e.k]&&IT[e.k].sl&&IT[e.k].rk>r)L.push({e,sl:""});
 try{const w=wdOf(p);for(const sl of ["tram","y"]){const e=w&&w[sl];if(!e||e.from==="base")continue;const it=wdItem(e);if(it&&wdP(e,p)>wdPOf(p))L.push({e,sl})}}catch(x){}
 return L}
function seize(p,L,kind){const got=[];for(const {e,sl} of L){
  if(sl){const w=wdOf(p);w[sl]=null;if(sl==="y"){try{const k=wdDefault(p,"y");if(k)w.y={k,from:"base"}}catch(x){}}}
  else{const i=p.inv.indexOf(e);if(i<0)continue;p.inv.splice(i,1);try{KFX.lt.set(e,{why:"use"})}catch(x){}}
  delete e.w;box().push({e,at:"nvp",why:"demote",own:pk(p),w:wk(),by:"",rel:1e9});
  try{S.il.log.push([wk(),e.dhid||0,e.k,pk(p),"nvp",kind==="cold"?"thu khi vào lãnh cung":"thu khi giáng phẩm"]);if(S.il.log.length>600)S.il.log.splice(0,S.il.log.length-600)}catch(x){}
  got.push(e)}return got}
/* the decree (cổ trang, VANPHONG): who and why, what comes back */
function decree(p,kind){const rk=kind==="cold"?"":(RANKS[rkOf(p)]||{}).n||"";
 return kind==="cold"?`«Phụng chỉ: phế phi vào lãnh cung, y phục trang sức đeo trên người đều thu về Nội vụ phủ, chỉ giữ áo vải mộc.»`
  :`«Phụng chỉ: giáng xuống ${esc(rk)}, trang sức y phục quá phẩm không còn hợp lệ, thu về Nội vụ phủ cất giữ, đợi ngày thăng phẩm sẽ hoàn lại.»`}
function tag(e){try{if(typeof kitItemTag==="function"&&typeof kitItemInfo==="function")return kitItemTag(kitItemInfo(e)).replace('class="kiev"','class="kiev kiev-own kiev-txt"')}catch(x){}return `<p>${esc(nameOf(e))}</p>`}
function scene(p,got,kind,why){const names=got.map(nameOf);
 const t=`Nội vụ phủ thu ${names.join(", ")} của ngươi (${kind==="cold"?"vào lãnh cung":"bị giáng phẩm"}).`;log(`<span class="r">${esc(t)}</span>`);
 if(typeof kitPanel!=="function")return;
 kitPanel({kind:"notice",title:"Nội vụ phủ thu đồ",subject:typeof pEunCourt==="function"?pEunCourt("ped"):null,
  sections:[{h:"",html:`<p>${decree(p,kind)}</p>`},{h:"Mâm thu về",html:`<div class="kdemo-tray">${got.map(tag).join("")}</div>`},
   {h:"",rows:[["Vì sao",esc(why||(kind==="cold"?"vào lãnh cung":"bị giáng phẩm"))],["Bị thu",esc(names.join(", "))],["Lấy lại",kind==="cold"?"ra khỏi lãnh cung, đủ phẩm thì Nội vụ phủ tự trả về rương":"đủ phẩm trở lại thì Nội vụ phủ tự trả về rương"]]}],btn:"Tuân chỉ"})}
function demoSeize(p,kind,why){if(!p||!alive(p))return[];const L=above(p);if(!L.length)return[];const got=seize(p,L,kind);if(!got.length)return[];
 if(p===S)scene(p,got,kind,why);else{try{newsAdd(p,"conf",`${p.name} ${kind==="cold"?"vào lãnh cung":"bị giáng phẩm"}, Nội vụ phủ thu ${got.map(nameOf).join(", ")}.`)}catch(x){}}
 return got}
/* the tray: the item tags side by side on one row (wrapping), the same tag as every other item reveal (KIT §70) */
(function(){const st=document.createElement("style");st.textContent=`.kdemo-tray{display:flex;flex-wrap:wrap;gap:6px;align-items:flex-start}.kdemo-tray .kiev{flex:0 0 auto!important;width:auto!important;max-width:46%;margin:0!important}`;document.head.appendChild(st)})();
window.demoSeize=demoSeize;window.demoAbove=above;
/* the ONE hook: jdh2's state check names the kind (cold / giang) for every person, every route */
(function(){const c0=window.dhConfiscate;if(typeof c0!=="function"||c0.__demo)return;
 const g=function(p,kind,why){const r=c0.apply(this,arguments);try{if(kind==="cold"||kind==="giang")demoSeize(p,kind,why)}catch(e){console.error("demo",e)}return r};g.__demo=1;window.dhConfiscate=g})();
/* home again: weekly, an owner who is out of lãnh cung and stands high enough gets each piece back (jewellery: rank; wardrobe: phẩm) */
function worthy(p,e){if(p.out)return false;const w=typeof wdItem==="function"?wdItem(e):null;if(w)return wdP(e,p)<=wdPOf(p);const it=IT[e.k];return !it||!it.sl||it.rk<=rkOf(p)}
function demoReturn(){const B=box();for(const x of B.slice()){if(x.why!=="demote")continue;const o=byK(x.own);if(!o||!alive(o)||(o!==S&&!npcOK()))continue;if(!worthy(o,x.e))continue;
 B.splice(B.indexOf(x),1);o.inv=o.inv||[];o.inv.push(x.e);
 if(o===S){log(`Nội vụ phủ trả lại ${nameOf(x.e)}.`);Q.push({t:"Nội vụ phủ trả đồ",who:typeof pEunCourt==="function"?pEunCourt("ped"):null,h:`${tag(x.e)}<p>Ngươi đã đủ phẩm, Nội vụ phủ sai người đem <b>${esc(nameOf(x.e))}</b> trả về rương.</p>`})}}}
window.demoReturn=demoReturn;
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w0=S&&wk();const r=e0.apply(this,arguments);
 try{if(S&&!S.dead&&wk()!==w0){const q=Q.length;demoReturn();if(Q.length>q&&typeof showModal==="function"){showModal();render()}}}catch(e){console.error("demo",e)}return r}})();
})();
