/* jcooplobby: co-op lobby (worker B, review/coop). Title home gets "Chơi cùng bạn" next to the single-player menu
   (single-player buttons and flow unchanged). Screens are kit scene panels (KIT.md 8 + 14: kitModal({scene:true}),
   .kbtn / .kbtn.alt, kitRows, kitInput) on the title backdrop, like j74's sub-screens:
     co     "Chơi cùng bạn": Mời bạn (create a room) · Nhập ám hiệu (join) · ‹ Lui
     wait   room code + link (Chép đường dẫn / Gửi cho bạn) + "Đang đợi bạn vào phòng"
     join   code box + Vào phòng (a ?room=XXXX link opens this screen with the code filled and joins at once)
     err    what went wrong + Thử lại / ‹ Lui
   When both players are in the room the lobby hides the title and emits COOP "start" (local event) for the
   shared-world module (jcoopworld, worker C).  Freeze: while a co-op game runs and the other player is offline (or
   our own link is down) a kit panel "Đợi bạn trở lại" covers the game; it lifts by itself when both are back. */
(function(){try{
if(typeof COOP!=="object")return;
const T=$("title");if(!T)return;
const st=document.createElement("style");
st.textContent=`
.kpmenu .kbtn.kco{grid-column:1/-1}
.kcol-code .kr:first-child .krv .ef{font-family:var(--display);font-size:1.5rem;letter-spacing:.18em;color:var(--gold)}
.kcol-act{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:8px 0 4px}
.kcol-act .kbtn{min-height:46px;white-space:normal}
.kcol-act .kbtn.k1{grid-column:1/-1}
@media (max-width:420px){.kcol-act{grid-template-columns:minmax(0,1fr)}}
.kcol-act .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.74rem;opacity:.9}
#coopfz{z-index:9500}
#next.kcwait{white-space:normal!important;line-height:1.12!important;font-size:.9em;overflow:hidden}
.kcol-act .kbtn.kdone{background:var(--k-ok-bg,#e6f2e6)!important;color:var(--g,#2e6b3a)!important}
/* same spacing as the kit panel's #mb / #mr (j79), which this overlay cannot use by id */
#coopfz .dlg #mbz{padding:8px 12px 2px}
#coopfz .dlg #mrz{padding:4px 14px 12px;margin:0;display:flex;justify-content:flex-end;gap:8px}
`;
document.head.appendChild(st);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let LM=null,PG="",ERR="",CODE="",PEND=false,SENT=false,WT0=0;
function link(code){const u=new URL(location.href);u.search="";u.hash="";u.searchParams.set("room",code);return u.toString()}
function drop(){if(!LM)return;const i=Q.indexOf(LM);if(i>=0)Q.splice(i,1);LM=null;const M=$("modal");if(M&&Q.length)showModal();else if(M){M.hidden=true;M.classList.remove("kptitle","kpscene")}}
function peerWord(){const s=COOP.state,x=COOP.other(),p=s.seats&&x&&s.seats[x];return !p?["chưa vào phòng","n"]:p.online?["đã vào phòng","g"]:["đang vắng","r"]}
/* the invite table: Ám hiệu · Hảo hữu + the 1-2-3 guide (kitCoopSteps, KIT §69.3), one kit table */
function waited(){const t=Math.max(0,Math.floor((Date.now()-WT0)/1000));return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")}
function stepRows(c){const s=COOP.state,pw=peerWord();const joined=pw[1]==="g";
 return kitRowsJoin(kitRows([["Ám hiệu",esc(c),"t"],["Hảo hữu",pw[0],pw[1]]]),typeof kitCoopSteps==="function"?kitCoopSteps({sent:SENT,joined,wait:waited(),you:s.you}):"")}
function stepRefresh(){const b=document.querySelector("#modal.kcoop .kcol-code");if(b)b.innerHTML=stepRows(COOP.state.room||CODE)}
/* live waiting: once a second the elapsed time and the dots move (text only); restarts when the friend is gone again */
setInterval(()=>{try{if(PG!=="wait"||!LM||T.hidden)return;const n=document.querySelector('#modal.kcoop [data-kcw="t"]');if(!n)return;
 n.textContent="… đang đợi hảo hữu vào phòng · "+waited()}catch(e){}},1000);
function stored(){try{return localStorage.getItem("ctm-coop-room")||""}catch(e){return ""}}
function body(pg){const s=COOP.state;
 if(pg==="co"){const R=window.CTM_ROOMS;const full=R&&R.full();return `<div class="kcol-act"><button class="kbtn k1" data-coop="make">Mời hảo hữu<small>lập phòng mới, gửi ám hiệu cho hảo hữu</small></button><button class="kbtn alt k1" data-coop="join">Nhập ám hiệu<small>hảo hữu đã gửi ám hiệu hay đường dẫn</small></button></div>`+
   (R?`<div class="kcol-rooms">${R.html()}</div>`+(full?`<div class="kpnote">Đã đủ ba phòng. Lập hay vào phòng mới thì phòng cũ nhất rời khỏi danh sách; muốn giữ, bỏ trước một phòng khác.</div>`:""):"")}
 if(pg==="wait"){const c=s.room||CODE;const pw=peerWord();
  return `<div class="kcol-code">${stepRows(c)}</div>`+
   kitInput({id:"coop-link",label:"Đường dẫn mời",value:link(c),readonly:true})+(s.you!=="b"&&typeof kitCoopLenRow==="function"?kitCoopLenRow():"")+/* the host picks the buổi length (jcooptimer, KIT §69) */
   `<div class="kcol-act"><button class="kbtn k1" data-coop="share">Gửi đường dẫn cho hảo hữu<small>qua Zalo, Messenger, tin nhắn</small></button><button class="kbtn alt" data-coop="copy">Chép đường dẫn</button><button class="kbtn alt" data-coop="copycode">Chép mã ${esc(c)}</button></div>`+
   `<div class="kpnote">${s.status==="open"?"Giữ màn này mở: hảo hữu vào phòng là cuộc chơi tự bắt đầu, ngươi không phải chạm gì thêm. Hảo hữu chạm vào đường dẫn (hay chọn Cùng hảo hữu, Nhập ám hiệu, gõ ám hiệu) là vào phòng. Muốn thử một mình: mở đường dẫn trên máy khác.":"Đang nối với phòng."}</div>`}
 if(pg==="join")return kitInput({id:"coop-code",label:"Ám hiệu",value:CODE,placeholder:"bốn chữ hảo hữu gửi"})+
   `<div class="kcol-act"><button class="kbtn k1" data-coop="go">Vào phòng</button></div>`+(s.status==="connecting"||s.status==="retry"||PEND?`<div class="kpnote">Đang vào phòng ${esc(CODE)}…</div>`:`<div class="kpnote">Ám hiệu là bốn chữ hay số hảo hữu gửi, ví dụ K7QD. Có đường dẫn thì chỉ cần chạm vào đường dẫn.</div>`);
 if(pg==="err")return `<div class="kpnote">${esc(ERR)}</div><div class="kcol-act"><button class="kbtn k1" data-coop="co">Thử lại</button></div>`;
if(pg==="pick"){const c=s.room||CODE;return `<div class="kcol-code">${kitRows([["Ám hiệu",esc(c),"t"],["Hảo hữu","đang chọn thân phận","n"],["Ngươi","đã vào phòng","g"]])}</div>`+
   `<div class="kpnote">Hảo hữu mở phòng nên chọn thân phận trước, hậu cung dựng theo kiếp của hảo hữu. Hảo hữu chọn xong, màn chọn thân phận của ngươi tự hiện ra. Không cần bấm gì.</div><div class="kcol-act"><button class="kbtn alt" data-coop="back">‹ Về màn đầu</button></div>`}
 return ""}
const HEAD={pick:["Đợi hảo hữu chọn thân phận","Hai người đã ở trong phòng."],co:["Cùng hảo hữu","Hai người chung một hậu cung. Cả hai phải cùng ở trong cuộc."],wait:["Mời hảo hữu","Gửi ám hiệu hay đường dẫn cho hảo hữu."],join:["Nhập ám hiệu","Gõ ám hiệu hảo hữu gửi."],err:["Chưa vào được phòng",""]};
function open(pg){PG=pg;if(T.hidden)return;if(pg==="wait"&&!WT0)WT0=Date.now();if(pg!=="wait"&&pg!=="join")WT0=0;
 const keep=document.activeElement&&document.activeElement.id==="coop-code"?document.activeElement.value:null;if(keep!=null)CODE=keep;
 drop();const M=$("modal");
 /* j74's home panel sits in Q while the title is up: take it out so ours is the one shown */
 for(let i=Q.length-1;i>=0;i--)if(Q[i]&&/kptitle/.test(Q[i].cls||""))Q.splice(i,1);
 LM=kitModal({scene:true,kind:"notice",title:HEAD[pg][0],sub:HEAD[pg][1],html:body(pg),cls:"kptitle kcoop"});
 const s=M.querySelector(".dlg > .kph .kpseal");if(s)s.remove();
 const mr=$("mr");if(mr)mr.innerHTML=pg==="pick"?"":`<button class="kbtn alt" data-coop="back">‹ Lui</button>`;
 const c=$("coop-code");if(c){c.setAttribute("autocapitalize","characters");c.setAttribute("autocomplete","off");c.maxLength=8}}
function back(){const pg=PG;PG="";drop();if(pg==="pick"){COOP.leave(true);try{showTitle()}catch(e){}return}if(pg==="wait"||pg==="join"||pg==="err")COOP.leave();
 if(pg&&pg!=="co"){open("co");return}
 try{showTitle()}catch(e){}}
function toast(msg){try{const n=document.querySelector("#modal.kcoop .kpnote");if(n)n.textContent=msg}catch(e){}}
async function make(){ERR="";try{open("wait");const r=await COOP.create();CODE=r.room;open("wait")}catch(e){ERR=errText(e);open("err")}}
async function join(code){code=String(code||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"");if(!code){toast("Hãy gõ ám hiệu.");return}
 CODE=code;PEND=true;try{open("join");await COOP.join(code);PEND=false;if(PG==="join")open("wait")}catch(e){PEND=false;ERR=errText(e);open("err")}}
async function resume(code){ERR="";CODE=code||stored();try{if(code)localStorage.setItem("ctm-coop-room",code)}catch(e){}try{open("join");await COOP.resume();open("wait")}catch(e){ERR=errText(e);open("err")}}
function errText(e){const c=e&&(e.code||e.message)||"";
 if(/full/i.test(c))return "Phòng này đã đủ hai người.";if(/not.?found|no.?room|404/i.test(c))return "Không thấy phòng mang mã này. Xem lại mã hảo hữu gửi.";
 return "Chưa nối được với phòng. Xem lại đường mạng rồi thử lại."}
$("modal").addEventListener("click",e=>{const b=e.target.closest("button[data-coop]");if(!b)return;e.stopPropagation();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 const a=b.dataset.coop;
 if(a==="co")return open("co");if(a==="resume")return resume(b.dataset.room||"");
 if(a==="forget"){if(b.dataset.ask==="1"){b.dataset.ask="2";b.innerHTML="Chắc chắn?<small>Phòng rời khỏi danh sách</small>";return}try{CTM_ROOMS.forget(b.dataset.room)}catch(x){}if(PG==="co")open("co");else try{showTitle()}catch(x){}return}if(a==="make")return make();if(a==="join")return open("join");if(a==="back")return back();
 if(a==="go"){const c=$("coop-code");return join(c?c.value:CODE)}
 if(a==="copy"||a==="fzcopy"){copy(link(COOP.state.room||CODE),b,"Đã chép đường dẫn");if(a==="copy")sent();return}
 if(a==="copycode"){copy(COOP.state.room||CODE,b,"Đã chép mã");sent();return}
 if(a==="share"){const c=COOP.state.room||CODE,u=link(c);if(navigator.share)navigator.share({title:"Cung Tường Mộng",text:"Vào hậu cung cùng ta. Ám hiệu "+c,url:u}).then(sent,()=>{});else{copy(u,b,"Đã chép đường dẫn, dán gửi cho hảo hữu");sent()}return}},true);
function sent(){if(SENT)return;SENT=true;stepRefresh()}
/* copy with visible feedback; falls back to a hidden textarea where the clipboard API is missing (http, old phones) */
function copy(txt,b,msg){const done=()=>{b.innerHTML=msg;b.classList.add("kdone")};
 const old=()=>{try{const t=document.createElement("textarea");t.value=txt;t.setAttribute("readonly","");t.style.cssText="position:fixed;top:0;left:0;opacity:0";document.body.appendChild(t);t.select();t.setSelectionRange(0,txt.length);const ok=document.execCommand("copy");t.remove();if(ok)done();else b.innerHTML="Giữ ngón tay lên ô đường dẫn để chép"}catch(x){}};
 try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,old);else old()}catch(x){old()}}
$("modal").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target&&e.target.id==="coop-code"){e.preventDefault();join(e.target.value)}});
/* title home: add the co-op button under the single-player menu */
function addBtn(){const m=document.querySelector("#modal.kpthome .kpmenu");if(!m||m.querySelector(".kco"))return;
 /* owner 14/11: the title offers "Chơi một mình" / "Chơi cùng bạn". The single-player button keeps its action (Tiếp tục = last sổ,
    Bắt đầu = Chọn sổ), only its words say which way of playing it is; "Kiếp mới" stays beside it. */
 const k=m.querySelector(".kbtn.k1");if(k&&!k.dataset.solo){k.dataset.solo="1";const sm=k.querySelector("small");const was=k.firstChild&&k.firstChild.nodeType===3?k.firstChild.textContent.trim():"";
  const info=sm?sm.textContent:"";k.innerHTML=`Chơi một mình<small>${was==="Tiếp tục"?"Tiếp tục: "+esc(info):esc(info)}</small>`}
 const b=document.createElement("button");b.className="kbtn alt kco";b.dataset.coop="co";b.innerHTML="Cùng hảo hữu<small>Mời hảo hữu · Nhập ám hiệu</small>";const k1=m.querySelector(".kbtn.k1");if(k1)k1.after(b);else m.appendChild(b)}
new MutationObserver(addBtn).observe($("modal"),{childList:true,subtree:true});
/* live updates while a lobby screen is up */
COOP.on("status",s=>{if(!LM||Q[0]!==LM||T.hidden)return;if(PG==="wait"){const a=document.activeElement;open("wait");if(a&&a.dataset&&a.dataset.coop){const n=document.querySelector(`#modal [data-coop="${a.dataset.coop}"]`);if(n)n.focus({preventScroll:true})}}});
COOP.on("error",e=>{if(LM&&(PG==="wait"||PG==="join")){ERR=errText(e);open("err")}});
/* both players in → leave the lobby, hand over to the shared-world module */
COOP.on("both",()=>{if(!LM)return;window.__cuxBoth=PG;if(PG==="wait"){try{if(typeof sfx==="function")sfx("sfx-join")}catch(e){}try{if(typeof kitLine==="function")kitLine("Hảo hữu đã vào phòng. Cuộc chơi bắt đầu.",3500)}catch(e){}}SENT=false;WT0=0;drop();PG="";try{T.hidden=true}catch(e){}const s=COOP.state;COOP.emit("start",{room:s.room,you:s.you,host:s.you==="a",week:s.week,state:s.C})});
/* freeze overlay: kit panel markup (.modal.kpscene > .dlg.kpanel with kpHeader), above everything, no way around it but waiting or leaving */
let FZ=null;
const FZT={me:["Đợi hảo hữu trở lại","Đường mạng của ngươi vừa đứt. Đang tự nối lại, không mất gì."],peer:["Đợi hảo hữu trở lại","Hảo hữu đang vắng (máy ngủ hay chuyển sang việc khác). Hảo hữu mở lại trò chơi là tự vào lại; hậu cung dừng lại cho đến lúc ấy."],
 moved:["Cuộc chơi đã sang máy khác","Ngươi vừa vào phòng này từ một máy khác; cuộc chơi đi theo máy ấy, ở đây dừng lại. Muốn chơi tiếp ở máy này: Về màn đầu, Cùng hảo hữu, Trở lại phòng."],
 week:["Đợi hảo hữu xong tuần","Ngươi đã sang ngày mới. Khi hảo hữu cũng xong tuần, tuần mới bắt đầu cho cả hai."]};
function fz(on,why){if(!on){if(FZ){FZ.remove();FZ=null}return}
 const [ttl,sub]=FZT[why]||FZT.peer;const pw=peerWord();
 if(!FZ){FZ=document.createElement("div");FZ.id="coopfz";FZ.className="modal kpscene";FZ.setAttribute("role","alertdialog");document.body.appendChild(FZ)}
 FZ.innerHTML=`<div class="dlg kpanel kpsc" data-kind="notice">${kpHeader("notice",ttl,sub)}<div class="body" id="mbz">${kitRows([["Ám hiệu",esc(COOP.state.room||""),"t"],["Hảo hữu",why==="week"?"chưa xong tuần":pw[0],why==="week"?"n":pw[1]],["Ngươi",COOP.state.status==="open"?"đang ở trong cuộc":COOP.state.status==="moved"?"đang ở máy khác":"đang nối lại",COOP.state.status==="open"?"g":"r"]])}</div>${why==="peer"?`<div class="kpnote" style="margin:4px 12px 0">Gửi lại đường dẫn cho hảo hữu: hảo hữu chạm vào là trở lại đúng chỗ cũ, không mất gì.</div>`:""}<div class="row" id="mrz">${why==="peer"?`<button class="kbtn" data-coop="fzcopy">Chép đường dẫn</button>`:""}<button class="kbtn alt" data-cfz="leave">Về màn đầu</button></div></div>`;
 const s=FZ.querySelector(".kpseal");if(s)s.remove()}
document.addEventListener("click",e=>{const c=e.target.closest("#coopfz [data-coop]");if(c){e.stopPropagation();copy(link(COOP.state.room||CODE),c,"Đã chép đường dẫn");return}const b=e.target.closest("[data-cfz]");if(!b)return;e.stopPropagation();fz(false);COOP.leave(true);try{showTitle()}catch(x){}},true);
function check(){const s=COOP.state;if(!s.playing){fz(false);return}
 const x=COOP.other(),e=s.ended||{};
 if(s.status==="moved")fz(true,"moved");else if(s.status!=="open")fz(true,"me");else if(!s.peerOnline)fz(true,"peer");else if(e[s.you]&&!e[x])fz(true,"week");else fz(false)}
COOP.on("status",check);
COOP.on("start",()=>{COOP.state.playing=true;COOP.live();check()});
COOP.on("week",()=>setTimeout(check,0));
/* a ?room=XXXX link: open "Nhập ám hiệu" with the code and join at once */
(function(){let q="";try{q=new URLSearchParams(location.search).get("room")||"";if(q){const u=new URL(location.href);u.searchParams.delete("room");history.replaceState(null,"",u.toString())}}catch(e){console.error(e)}
 if(!q)return;const t0=Date.now();const go=()=>{if(COOP.state.status!=="off")return;if(T.hidden&&Date.now()-t0<20000){setTimeout(go,150);return}if(!T.hidden){CODE=q.toUpperCase();join(CODE)}};setTimeout(go,60)})();
/* guest in, host still choosing her thân phận: keep the title backdrop with a kit panel instead of an empty game frame */
function hostPick(on){if(on){try{T.hidden=false}catch(e){}LM=null;open("pick")}else if(PG==="pick"){PG="";drop();try{T.hidden=true}catch(e){}}}
window.COOP_LOBBY={open,fz,check,hostPick};
}catch(e){console.error(e)}})();
