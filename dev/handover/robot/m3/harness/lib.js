const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root='/home/user/cung-tuong-mong';
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};
function serve(port){return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(root,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(port,()=>res(sv))})}
// list visible clickable leaf controls with centre + hit-check
const LIST=()=>{const out=[];const vis=e=>{const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return false;for(let x=e;x&&x!==document.body;x=x.parentElement){const s=getComputedStyle(x);if(s.display==='none'||s.visibility==='hidden'||+s.opacity<.05)return false}return true};
 const W=innerWidth,H=innerHeight;
 const base=new Set(document.querySelectorAll('button,[role=button],a[href],[onclick],.kbtn,input,select,textarea'));const ptr=new Set();document.querySelectorAll('div,span,li,img,b,p,section,article').forEach(e=>{if(base.has(e))return;if(getComputedStyle(e).cursor!=='pointer')return;const pe=e.parentElement;if(pe&&getComputedStyle(pe).cursor==='pointer')return;const BS='button,[role=button],a[href],[onclick],.kbtn,input,select,textarea';if(!e.closest(BS)&&!e.querySelector(BS))ptr.add(e)});
 [...base,...ptr].forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();const cx=Math.min(W-1,Math.max(0,r.left+r.width/2)),cy=Math.min(H-1,Math.max(0,r.top+r.height/2));
  const t=document.elementFromPoint(cx,cy);const ok=!!t&&(e===t||e.contains(t)||t.contains(e));
  out.push({w:Math.round(r.width),h:Math.round(r.height),ptr:ptr.has(e),id:e.id||'',cls:(typeof e.className==='string'?e.className:'').slice(0,40),txt:(e.innerText||e.value||'').replace(/\s+/g,' ').trim().slice(0,70),x:Math.round(cx),y:Math.round(cy),ok,cover:ok?'':(t?(t.id||t.className||t.tagName):'none'),dis:!!e.disabled})});
 return out};
module.exports={serve,LIST,chromium};
