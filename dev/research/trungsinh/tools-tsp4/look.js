const m=document.querySelector(".modal-backdrop");
const vis=e=>e.offsetParent!==null;
if(m){const btns=[...m.querySelectorAll("button")].filter(vis).map(b=>b.innerText.trim().replace(/\n/g," / ")).filter(Boolean);
return "[MODAL]\n"+m.querySelector(".modal-content")?.innerText+"\n[BTNS] "+btns.join(" || ");}
const t=document.body.innerText;return "[MAIN]\n"+t.slice(0,t.indexOf("Thủ công")).replace(/\n/g," ")+"\n"+t.slice(t.indexOf("Việc trong tháng"),t.indexOf("Nhật ký tháng")).replace(/\n/g," ");
