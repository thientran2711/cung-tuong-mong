
/* ---- j56: nhóm việc trên thẻ người thành thẻ (tab), như thẻ Phi tần ----
   Mọi thẻ người (pcard) mà các mô-đun sau chèn thêm mục "<h5>Tên</h5><div class=pcb>" xếp dọc
   (thẻ con: Học hành, Chăm con, Hôn sự, Tài nghệ...) được gom thành hàng tab .pctabs/.pct + .pcg,
   dùng đúng kiểu và trình bấm tab của pcard (j15/j25). Nhớ tab đã chọn theo từng thẻ (tên người) khi trang còn mở. */
(function(){
 window.__pcTab=window.__pcTab||{};
 /* thẻ không đặt tabKey: nhớ tab riêng cho từng người thay vì chung một khóa "p" */
 if(typeof pcard==="function"){const p0=pcard;pcard=function(o){if(o&&!o.tabKey&&o.name)o=Object.assign({},o,{tabKey:"p:"+String(o.name).replace(/<[^>]*>/g,"")});return p0.call(this,o)}}
 const live=b=>b.tagName==="BUTTON"&&!b.disabled;
 const nLive=el=>Array.from(el.querySelectorAll("button")).filter(live).length;
 const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
 function bareName(pcb){if(pcb.querySelector('[data-go="home"]'))return "Thăm con";return "Việc khác"}
 function tabify(pcr){
  const kids=Array.from(pcr.children);if(!kids.some(c=>c.tagName==="H5"))return;
  const card=pcr.closest(".pc");const nm=card&&card.querySelector(".pcname");
  const oldTabs=kids.find(c=>c.classList.contains("pctabs"));
  let role=oldTabs&&oldTabs.querySelector(".pct")?oldTabs.querySelector(".pct").dataset.role:"";
  if(!role)role="p:"+(nm?nm.textContent.trim():"");
  const G=[];let anchor=null;
  for(let i=0;i<kids.length;i++){const c=kids[i];
   if(c.tagName==="H5"&&kids[i+1]&&kids[i+1].classList.contains("pcb")){G.push({t:c.textContent.trim(),h5:c,el:kids[i+1]});if(!anchor)anchor=c;i++;continue}
   if(c.classList.contains("pcg")){G.push({t:c.dataset.g||"",el:c,g:1});if(!anchor)anchor=c;continue}
   if(c.classList.contains("pcb")){G.push({t:"",el:c});if(!anchor)anchor=c;continue}}
  if(G.length<2)return;
  /* tên trùng thì gộp; tên trống đặt tên rõ */
  const used={};G.forEach(s=>{if(!s.t)s.t=s.g?"Việc":bareName(s.el);let t=s.t,n=2;while(used[t])t=s.t+" "+(n++);used[t]=1;s.t=t});
  let act=window.__pcTab[role];
  if(!G.some(s=>s.t===act))act=(G.find(s=>nLive(s.el)>0)||G[0]).t;
  const bar=document.createElement("div");bar.className="pctabs";
  bar.innerHTML=G.map(s=>`<button class="pct${s.t===act?" on":""}" data-pct="${esc(s.t)}" data-role="${esc(role)}">${esc(s.t)} <i title="làm được ${nLive(s.el)} trên ${s.el.querySelectorAll("button").length} việc">${nLive(s.el)}/${s.el.querySelectorAll("button").length}</i></button>`).join("");
  pcr.insertBefore(bar,oldTabs&&oldTabs.compareDocumentPosition(anchor)&Node.DOCUMENT_POSITION_FOLLOWING?oldTabs:anchor);
  if(oldTabs)oldTabs.remove();
  G.forEach(s=>{let g=s.el;
   if(!s.g){g=document.createElement("div");g.className="pcg";s.el.parentNode.insertBefore(g,s.el);g.appendChild(s.el);if(s.h5)s.h5.remove()}
   g.dataset.g=s.t;g.classList.toggle("on",s.t===act)});
 }
 function scan(root){(root.querySelectorAll?root:document).querySelectorAll(".pcr").forEach(p=>{try{tabify(p)}catch(e){}})}
 window.pcTabify=scan;
 const mo=new MutationObserver(R=>{let hit=false;for(const r of R)if(r.addedNodes.length){hit=true;break}if(hit)scan(document)});
 const go=()=>{mo.observe(document.body,{childList:true,subtree:true});scan(document)};
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go);
})();
