/* ================= jkalbum: kitAlbum = the CARD ALBUM (KIT §100; KIT REQUEST «moment album», Foreman E / E69 B-MOMENT, 24/11; owner law 9) =================
   ONE kit part for collectible paintings (Khoảnh khắc chân dung today; any later collection): a grid of portrait CARDS (3:4, the kit art frame), all the SAME size per device.
   An OWNED card shows its painting + name + a small line (year); a MISSING card is a veiled empty card (never a blank tile): the veil, the moment's name and WHEN IT OPENS (the caller's text).
   Tap a card → o.onTap(k, card) (the caller opens its own panel, e.g. kitItemInfo). Optional tabs (kit .ksub sub-tab look, e.g. «Của ta / Người khác tặng»); a card with `tab` shows only in that tab.
   API:  kitAlbum({id, tabs:[{k,n}], tab, cards:[{k, name, sub, art, fb, owned, opens, tab}], note, onTap(k,card)}) -> html (a .kalb block; replaces itself on a tab tap).
   PURE DISPLAY: no numbers, no game rules; texts come in. Names never cut (wrap, up to 3 lines). Test: dev/test/kit-album.js (Fold 755x1000 + iPad 1180x820). */
(function(){try{
const KIT_ALBUM=window.KIT_ALBUM_REG=window.KIT_ALBUM_REG||{};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function kitAlbum(o){o=o||{};if(o.id)KIT_ALBUM[o.id]=o;const tabs=o.tabs&&o.tabs.length>1?o.tabs:null;const tab=o.tab||(tabs&&tabs[0].k)||"";
 const cards=(o.cards||[]).filter(c=>!tabs||!c.tab||c.tab===tab);
 const tb=tabs?`<nav class="ksub kalbt" role="tablist">${tabs.map(t=>`<button type="button" class="ksubb${t.k===tab?" on":""}" data-albt="${esc(t.k)}" role="tab" aria-selected="${t.k===tab}">${esc(t.n)}</button>`).join("")}</nav>`:"";
 const g=cards.map(c=>{const own=!!c.owned,line=own?(c.sub||""):(c.opens||"");const lab=[c.name,line].filter(Boolean).join(" · ");
  const art=own?kitSceneArt(c.art||"","",{shape:"tall",cap:false,cls:"kalb-art",fb:c.fb}):`<figure class="ksart ksart-tall kalb-art kalb-veil" aria-hidden="true"><svg class="kalb-seal" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M24 11 37 24 24 37 11 24Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="3.2" fill="currentColor"/></svg></figure>`;
  return `<button type="button" class="kalb-c ${own?"own":"miss"}" data-alb-k="${esc(c.k)}" aria-label="${esc(lab)}${own?"":" · chưa có"}">${art}<span class="kalb-t"><b>${esc(c.name||"")}</b>${line?`<small>${esc(line)}</small>`:""}</span></button>`}).join("");
 return `<div class="kpsec kalb" data-alb="${esc(o.id||"")}">${tb}<div class="kalb-grid">${g}</div>${o.note?`<div class="kpnote">${o.note}</div>`:""}</div>`}
window.kitAlbum=kitAlbum;
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;const root=t.closest(".kalb");if(!root)return;const o=KIT_ALBUM[root.dataset.alb];if(!o)return;
 const tb=t.closest("[data-albt]");if(tb){e.stopPropagation();o.tab=tb.dataset.albt;const w=document.createElement("div");w.innerHTML=kitAlbum(o);root.replaceWith(w.firstElementChild);return}
 const c=t.closest("[data-alb-k]");if(c){const k=c.dataset.albK,card=(o.cards||[]).find(x=>String(x.k)===k);if(o.onTap&&card){e.stopPropagation();o.onTap(k,card)}}}catch(x){console.error("kitAlbum",x)}},true);
const css=document.createElement("style");css.id="kit-album";css.textContent=`
:root{--kalbw:112px}html.kv2{--kalbw:132px}
.kalb{display:flex;flex-direction:column;gap:8px}
.kalb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--kalbw),1fr));gap:8px;grid-auto-rows:1fr;align-items:stretch}
.kalb-c{display:flex;flex-direction:column;gap:5px;min-width:0;padding:5px;border:1px solid var(--k-hair,#e6d3ac);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0);color:var(--ink,#3a2418);font:inherit;text-align:left;cursor:pointer}
.kalb-c.own{border-color:var(--gold,#b8892b);box-shadow:inset 0 0 0 1px #fffaf0}
.kalb-art{width:100%;margin:0;position:relative}.kalb-art img{width:100%;height:100%;object-fit:cover}
.kalb-veil{display:flex;align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,#efe3c8,#efe3c8 7px,#e8d9b8 7px,#e8d9b8 14px);border-radius:6px;overflow:hidden}
.kalb-veil::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 35%,#fffaf0aa,#fffaf000 70%)}
.kalb-seal{position:relative;z-index:1;width:46%;max-width:56px;height:auto;color:#b8892bb0}/* a seal, never a «?» (owner: «???» reads as a bug) */
.kalb-t{display:flex;flex-direction:column;gap:1px;min-width:0}.kalb-t b{font-size:.8rem;line-height:1.2;overflow-wrap:anywhere}.kalb-t small{font-size:.7rem;line-height:1.2;color:var(--dim,#7a6a58);overflow-wrap:anywhere}
.kalb-c.miss .kalb-t b{color:var(--dim,#7a6a58)}
.kalb-c:active{filter:brightness(.97)}.kalb-c:focus-visible{outline:2px solid var(--gold,#b8892b);outline-offset:2px}
`;document.head.appendChild(css);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§100",title:"kitAlbum: album of portrait cards (owned / veiled missing / tabs)",html:()=>kitAlbum({id:"kitpg-album",tabs:[{k:"a",n:"Của ta"},{k:"b",n:"Người khác tặng"}],cards:[
  {k:1,name:"Ngày nhập cung",sub:"Năm thứ nhất",owned:true,art:"",tab:"a"},{k:2,name:"Lễ sắc phong",owned:false,opens:"Khi được thăng phong",tab:"a"},{k:3,name:"Đêm Trung thu ngắm trăng ở vườn thượng uyển",owned:false,opens:"Thu · Ngự hoa viên",tab:"a"},{k:4,name:"Quà của Thục phi",sub:"Năm thứ hai",owned:true,art:"",tab:"b"}],note:"Chạm một thẻ để xem."})})}catch(e){}
}catch(e){console.error("jkalbum",e)}})();
