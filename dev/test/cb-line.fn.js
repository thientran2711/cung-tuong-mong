(()=>{tab="act";render();try{KSW.line("Đã mở bản mới",0)}catch(e){return String(e)}
 const l=document.getElementById('kupdline');const r=l.getBoundingClientRect();
 const hits=[...document.querySelectorAll('body *')].filter(e=>e!==l&&e.offsetParent&&e.children.length===0&&e.textContent.trim()&&(()=>{const q=e.getBoundingClientRect();return q.width&&q.right>r.left&&q.left<r.right&&q.bottom>r.top&&q.top<r.bottom})()).map(e=>e.className+':'+e.textContent.trim().slice(0,30));
 return{line:[r.left,r.top,r.width,r.height].map(Math.round),hits}})()
