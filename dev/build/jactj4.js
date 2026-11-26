/* ================= ACT-MERGE J4 — tab doors: one feature = one button, the ways sit INSIDE the option dialog =================
   (owner 26/11 ~07:25Z / ~07:32Z: merge only TRUE duplicates; ĐỂ RIÊNG items stay).
   Every old way keeps its cost, odds, outcome and its disabled reason; only the list of buttons gets shorter.
   The dialog is the shared option dialog (Q + showModal, kitOff for a way that cannot be used now) — no new kit part. */

/* one door dialog: ways = [{n,x,why,go}] */
function j4Door(title,h,ways){if(!S||S.dead||Q.length)return;
 const O=ways.map(w=>{const o={n:w.n,fx:w.fx||{},x:w.x||"",go:w.go};if(w.why)kitOff(o,w.why);return o});
 O.push({n:"Thôi",fx:{}});Q.push({act:1,t:title,who:pMe(),h:`<p>${h}</p>`,opts:O});showModal();render()}
/* capture the raw (attrs, name, small, why) of every pbtn a builder makes, so a door can list the same ways without re-deriving a number */
function j4Capture(fn){const cap=[],p0=pbtn;pbtn=function(at,n,sm,why){cap.push({at,n,sm,why});return p0.apply(this,arguments)};let r;try{r=fn()}finally{pbtn=p0}return{r,cap}}
const J4DOOR={};/* key -> ways, filled while a tab is drawn */

/* ---- 1. Tài nghệ + Tứ đức: «Học» (Tự học · Học với thầy · Học với Thái hậu / Học với ma ma) ---- */
(function(){if(typeof ktArtSkills!=="function")return;const s0=ktArtSkills;
 const MODE=/^data-(learn|vlearn)="(\w+)" data-mode="(self|teacher|th|master)"$/;
 ktArtSkills=function(){const{r:L,cap}=j4Capture(()=>s0.apply(this,arguments));
  try{for(const s of L){if(s.kind!=="art"&&s.kind!=="vir")continue;const ways=[],keep=[];
   s.acts.forEach(h=>{const m=/^<button (data-(?:learn|vlearn)="\w+" data-mode="(?:self|teacher|th|master)")[ >]/.exec(h);const c=m&&cap.find(x=>x.at===m[1]);(c?ways:keep).push(c||h)});
   if(!ways.length)continue;const vir=s.kind==="vir",k=s.k;
   const dk=(vir?"v:":"a:")+k;
   J4DOOR[dk]=ways.map(c=>{const m=MODE.exec(c.at);let why=c.why||"";
    /* j76: the Thái hậu lesson must finish inside buổi sáng */
    if(m[3]==="th"&&!why&&used+2>BAL.time.khac&&used<BAL.time.khac&&!S.j76carry)why=(S.buoi||0)!==0?"chỉ buổi sáng":`không kịp xong trong ${BUOI[0].toLowerCase()}`;
    return{n:c.n,x:c.sm,why,go:()=>vir?lessonVir(k,m[3]):lessonMode(k,m[3])}});
   const allOff=J4DOOR[dk].every(w=>w.why);
   s.acts=[pbtn(`data-learndoor="${dk}"`,"Học",`chọn cách học: ${ways.map(c=>c.n.replace(/^Học với /,"học với ").replace(/^Tự học/,"tự học")).join(", ")}`,allOff?J4DOOR[dk][0].why:""),...keep]}
  }catch(e){console.error("j4 hoc",e)}return L}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-learndoor]");if(!b||b.disabled)return;e.stopPropagation();
 const dk=b.dataset.learndoor,W=J4DOOR[dk];if(!W)return;const vir=dk[0]==="v",k=dk.slice(2),nm=vir?((VIR.find(x=>x.k===k)||{}).n||""):((ARTS.find(x=>x.k===k)||{}).n||"");
 j4Door(`Học ${nm}`,`Chọn cách học ${nm}.`,W)},true);

/* ---- generic: merge the buttons of one family inside a tab builder into ONE door button ----
   rule = {id, re (matches the button's attrs; group 1 = the group key, e.g. the servant's sid), name, title, intro, hint}
   While the builder runs, pbtn is watched: the first matching button of a group becomes a placeholder for the door, the rest vanish; their raw
   (attrs, name, small, why) become the ways. A way's `go` taps a real button with the OLD attributes, so the old click handler (cost, odds,
   outcome, result card) runs untouched — nothing the old button did is lost. */
function j4Tap(at,n){const b=document.createElement("button");b.textContent=n||"";b.setAttribute("style","display:none");const m=at.match(/([\w-]+)="([^"]*)"/g)||[];m.forEach(a=>{const i=a.indexOf("=");b.setAttribute(a.slice(0,i),a.slice(i+2,-1))});document.body.appendChild(b);try{b.click()}finally{b.remove()}}
function j4Merge(fname,rules){const f0=window[fname]||(typeof eval(fname)==="function"?eval(fname):null);if(typeof f0!=="function")return;
 const nf=function(){const G={},p0=pbtn,args=arguments;
  /* every matching button is wrapped in markers; only the ones still in the finished HTML (a later wrapper may drop a button) become ways */
  pbtn=function(at,n,sm,why){const html=p0.apply(this,arguments);for(const R of rules){const m=R.re.exec(at);if(!m)continue;const key=R.id+":"+(R.arg?R.arg(args):(m.slice(1).find(Boolean)||""));const g=G[key]||(G[key]={R,ways:[]});g.ways.push({at,n,sm,why});const i=g.ways.length-1;return `<!--J4S:${key}:${i}-->${html}<!--J4E:${key}:${i}-->`}return html};
  let h;try{h=f0.apply(this,arguments)}finally{pbtn=p0}
  if(typeof h!=="string")return h;
  const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");let out=h;
  for(const key in G){const g=G[key],R=g.R,W=[];
   g.ways.forEach((w,i)=>{if(out.includes(`<!--J4S:${key}:${i}-->`))W.push(Object.assign({i},w))});
   /* a door with one way left is no door: the old button stays as it was */
   if(W.length>1){J4DOOR[key]=W.map(w=>({n:w.n,x:w.sm,why:w.why,go:()=>j4Tap(w.at,w.n)}));
    const door=pbtn(`data-j4door="${key}"`,R.name,`${R.hint||"chọn một cách"}: ${W.map(w=>w.n.replace(/^(.)/,c=>c.toLowerCase())).join(", ")}`,W.every(w=>w.why)?W[0].why:"");
    let first=true;for(const w of W)out=out.replace(new RegExp(`<!--J4S:${esc(key)}:${w.i}-->[\\s\\S]*?<!--J4E:${esc(key)}:${w.i}-->`),()=>first?(first=false,door):"")}
   out=out.replace(new RegExp(`<!--J4[SE]:${esc(key)}:\\d+-->`,"g"),"")}
  return out};
 try{window[fname]=nf}catch(e){}try{eval(fname+"=nf")}catch(e){}}
const J4RULES={};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-j4door]");if(!b||b.disabled)return;e.stopPropagation();
 const key=b.dataset.j4door,W=J4DOOR[key];if(!W)return;const R=J4RULES[key.split(":")[0]];
 j4Door(R.title,R.intro,W)},true);

/* ---- 2. Cung nhân: «Thêm người» (cung nữ · thái giám) and «Thưởng phạt» (thưởng · phạt · tha lỗi · đề bạt · đổi người) ---- */
J4RULES.hire={title:"Thêm người",intro:"Chọn người Nội vụ phủ đưa sang cung."};
J4RULES.sj={title:"Thưởng phạt",intro:"Chọn cách xử kẻ hầu này."};
j4Merge("staffTabHTML",[
 {id:"hire",re:/^data-hire="(?:maid|eunuch)"$/,name:"Thêm người",hint:"nội vụ phủ đưa thêm"},
 {id:"sj",re:/^(?:data-sj="(?:thuong|phat|tha)"|data-sv="doi") data-sid="(\d+)"$|^data-dbsv="(\d+)"$/,name:"Thưởng phạt",hint:"chọn cách xử"}]);

/* ---- 3. Hoàng tự: «Dạy con» (dạy chữ · dạy lễ nghi · tự dạy tài nghệ · mời thầy riêng · xin Đại học sĩ · thầy võ) and «Chăm con» (chăm sóc · gửi thư, quà thăm con).
   Dẫn đi thỉnh an · Canh giữ các con · Về tẩm cung thăm con · Bàn hôn sự · Nhờ con nói giúp stay: each is another deed with other people and other results. ---- */
J4RULES.kteach={title:"Dạy con",intro:"Chọn cách dạy con."};
J4RULES.kcare={title:"Chăm con",intro:"Chọn cách chăm con."};
j4Merge("kidCard",[
 {id:"kteach",arg:a=>(a[0]&&a[0].name)||"",re:/^data-kt53="(?:tv|td|none|fav|vo)"|^data-h54="day"|^data-kid="teach"/,name:"Dạy con",hint:"chọn cách dạy"},
 {id:"kcare",arg:a=>(a[0]&&a[0].name)||"",re:/^data-kid="care"|^data-h54="thu"/,name:"Chăm con",hint:"chọn cách chăm"}]);

/* ---- 4. Tư trang: the Nội vụ phủ shop button joins «Mua đồ» (j83 illDoor lists it as the first way) ---- */
(function(){if(typeof invHTML!=="function")return;const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);return typeof h==="string"?h.replace(/<button data-inv="shop"[^>]*>[\s\S]*?<\/button>/,""):h}})();
/* the new door names borrow the picture of the meaning group they fold (owner 15/11: one picture per meaning group); ACTS.json wins when it gains the same title */
try{Object.assign(KIT_ACT_ALIAS,{"Học":"luyen-cam-ky","Dạy con":"day-con-hoc","Chăm con":"chua-benh-con","Thêm người":"chon-nguoi"})}catch(e){}
