/* ================= EXPORT / IMPORT A SAVE AS A TEXT CODE (title screen = settings) ================= */
let XIO={m:"",slot:0,code:"",msg:"",imp:null,to:0,ask:0};
function b64e(u8){let s="";for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s)}
function b64d(t){const s=atob(t);const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
async function zpipe(u8,C){const st=new Blob([u8]).stream().pipeThrough(new C("deflate-raw"));return new Uint8Array(await new Response(st).arrayBuffer())}
async function saveCode(json){const u=new TextEncoder().encode(json);
 if(typeof CompressionStream==="function"){try{return "CTM2:"+b64e(await zpipe(u,CompressionStream))}catch(e){}}return "CTM1:"+b64e(u)}
async function readCode(code){code=String(code||"").replace(/\s+/g,"");const m=/^CTM([12]):([A-Za-z0-9+/=]+)$/.exec(code);if(!m)throw xe("Mã không đúng dạng (phải bắt đầu bằng CTM).");
 let u=b64d(m[2]);if(m[1]==="2"){if(typeof DecompressionStream!=="function")throw xe("Trình duyệt này không giải nén được mã.");u=await zpipe(u,DecompressionStream)}
 const d=JSON.parse(new TextDecoder().decode(u));if(!d||typeof d!=="object"||!d.S||!d.R)throw xe("Mã không chứa ván chơi.");
 if(!(d.v>=2&&d.v<=6))throw xe(`Phiên bản ván (${d.v}) không hợp với bản game này.`);return d}
function xe(m){const e=new Error(m);e.mine=1;return e}
function filledSlots(){return [1,2,3].filter(n=>loadSlot(n))}
function xioHTML(){const F=filledSlots();let h=`<div class="xiorow"><button class="btn" id="x-exp" aria-pressed="${XIO.m==="exp"}" ${F.length?"":"disabled"}>Xuất ván<small>${F.length?"chép ván thành mã chữ":"chưa có ván nào"}</small></button><button class="btn" id="x-imp" aria-pressed="${XIO.m==="imp"}">Nhập ván<small>dán mã để nạp ván</small></button></div>`;
 if(XIO.m==="exp"){h+=`<div class="xiobox"><div class="srow">${F.map(n=>`<button class="btn" data-xs="${n}" aria-pressed="${n===XIO.slot}">Ô ${n}<small>${loadSlot(n).S.name}</small></button>`).join("")}</div>
  <textarea id="x-code" readonly rows="4" aria-label="Mã ván">${XIO.code}</textarea><div class="srow"><button class="main" id="x-copy" ${XIO.code?"":"disabled"}>Chép</button><span class="past" id="x-msg">${XIO.msg}</span></div></div>`}
 if(XIO.m==="imp"){const d=XIO.imp;h+=`<div class="xiobox"><textarea id="x-in" rows="4" placeholder="Dán mã ván (CTM...) vào đây" aria-label="Dán mã ván"></textarea><div class="srow"><button class="btn" id="x-chk">Đọc mã</button><span class="past" id="x-msg">${XIO.msg}</span></div>
  ${d?`<p class="past">Ván: <b>${d.S.name}</b> · ${RANKS[d.S.rank]?RANKS[d.S.rank].n:""} · năm ${d.S.year}, tháng ${d.S.month}. Ghi vào ô nào?</p><div class="srow">${[1,2,3].map(n=>{const o=loadSlot(n);return `<button class="btn" data-xt="${n}" aria-pressed="${n===XIO.to}">Ô ${n}<small>${o?"đè: "+o.S.name:"trống"}</small></button>`}).join("")}</div>
  ${XIO.to?`<div class="srow"><button class="main" id="x-write">${XIO.ask?"Chắc chắn ghi":"Ghi vào Ô "+XIO.to}</button>${XIO.ask?`<span class="r">Ô ${XIO.to} đang có ván ${loadSlot(XIO.to).S.name}, sẽ mất.</span>`:""}<button class="btn" id="x-cancel">Không ghi</button></div>`:""}`:""}</div>`}
 return h}
async function xioExport(n){XIO.slot=n;XIO.msg="";XIO.code="";try{const raw=slotGet(SK(n));XIO.code=raw?await saveCode(raw):"";XIO.msg=XIO.code?`${XIO.code.length} ký tự`:"Ô trống"}catch(e){XIO.msg="Không đọc được ô này."}wireXio()}
function wireXio(){const T=$("title");if(!T||T.hidden)return;let w=T.querySelector(".xiowrap");if(!w){w=document.createElement("div");w.className="xiowrap";const s=$("slots");s.parentNode.insertBefore(w,s.nextSibling)}
 const keep=XIO.m==="imp"&&$("x-in")?$("x-in").value:"";w.innerHTML=xioHTML();if(keep&&$("x-in"))$("x-in").value=keep;
 w.onclick=async e=>{const b=e.target.closest("button");if(!b||b.disabled)return;
  if(b.id==="x-exp"){XIO.m=XIO.m==="exp"?"":"exp";XIO.msg="";if(XIO.m==="exp"){const F=filledSlots();await xioExport(F.includes(SLOT)?SLOT:F[0]);return}}
  else if(b.id==="x-imp"){XIO.m=XIO.m==="imp"?"":"imp";XIO.msg="";XIO.imp=null;XIO.to=0;XIO.ask=0}
  else if(b.dataset.xs){await xioExport(+b.dataset.xs);return}
  else if(b.id==="x-copy"){const ta=$("x-code");let ok=false;try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(XIO.code);ok=true}}catch(x){}
   if(!ok){try{ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);ok=document.execCommand&&document.execCommand("copy")}catch(x){}}
   const m=$("x-msg");if(m)m.textContent=ok?"Đã chép mã.":"Hãy tự chọn và chép mã trong ô.";if(!ok){ta.focus();ta.select()}return}
  else if(b.id==="x-chk"){XIO.to=0;XIO.ask=0;try{XIO.imp=await readCode($("x-in").value);XIO.msg="Mã hợp lệ."}catch(x){XIO.imp=null;XIO.msg=`<span class="r">${x.mine?x.message:"Mã hỏng hoặc thiếu."}</span>`}}
  else if(b.dataset.xt){XIO.to=+b.dataset.xt;XIO.ask=0}
  else if(b.id==="x-cancel"){XIO.to=0;XIO.ask=0}
  else if(b.id==="x-write"&&XIO.imp&&XIO.to){if(loadSlot(XIO.to)&&!XIO.ask){XIO.ask=1}else{try{slotPut(SK(XIO.to),JSON.stringify(XIO.imp));XIO.msg=`Đã ghi vào Ô ${XIO.to}. Bấm “Tiếp tục kiếp này” để chơi.`;XIO.m="imp";XIO.imp=null;XIO.to=0;XIO.ask=0;showTitle();return}catch(x){XIO.msg='<span class="r">'+CTM_WAIT.saveBlocked+'</span>'}}}
  wireXio()}}
(function(){const o=window.showTitle;if(typeof o==="function")window.showTitle=function(){const r=o.apply(this,arguments);try{wireXio()}catch(e){}return r}})();
try{if(!$("title").hidden){wireXio();if(!$("title").querySelector(".optwrap")&&typeof wireOpt==="function")wireOpt()}}catch(e){}
