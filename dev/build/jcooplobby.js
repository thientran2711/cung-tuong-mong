/* jcooplobby: co-op lobby (worker B, review/coop). Title home gets "Chơi cùng bạn" next to the single-player menu
   (single-player buttons and flow unchanged). Screens are kit scene panels (KIT.md 8 + 14: kitModal({scene:true}),
   .kbtn / .kbtn.alt, kitRows, kitInput) on the title backdrop, like j74's sub-screens:
     co     "Chơi cùng bạn": Mời bạn (create a room) · Nhập mã (join) · ‹ Lui
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
.kcol-act .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.74rem;opacity:.9}
#coopfz{z-index:9500}
/* same spacing as the kit panel's #mb / #mr (j79), which this overlay cannot use by id */
#coopfz .dlg #mbz{padding:8px 12px 2px}
#coopfz .dlg #mrz{padding:4px 14px 12px;margin:0;display:flex;justify-content:flex-end;gap:8px}
`;
document.head.appendChild(st);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let LM=null,PG="",ERR="",CODE="";
function link(code){const u=new URL(location.href);u.search="";u.hash="";u.searchParams.set("room",code);return u.toString()}
function drop(){if(!LM)return;const i=Q.indexOf(LM);if(i>=0)Q.splice(i,1);LM=null;const M=$("modal");if(M&&Q.length)showModal();else if(M){M.hidden=true;M.classList.remove("kptitle","kpscene")}}
function peerWord(){const s=COOP.state,x=COOP.other(),p=s.seats&&x&&s.seats[x];return !p?["chưa vào phòng","n"]:p.online?["đã vào phòng","g"]:["đang vắng","r"]}
function stored(){try{return localStorage.getItem("ctm-coop-room")||""}catch(e){return ""}}
function body(pg){const s=COOP.state;
 if(pg==="co"){const r=stored();return `<div class="kcol-act">${r?`<button class="kbtn k1" data-coop="resume">Trở lại phòng ${esc(r)}<small>cuộc chơi chung lần trước</small></button>`:""}<button class="kbtn k1" data-coop="make">Mời bạn<small>lập phòng, gửi mã cho bạn</small></button><button class="kbtn alt k1" data-coop="join">Nhập mã<small>bạn đã gửi mã hay đường dẫn</small></button></div>`}
 if(pg==="wait"){const c=s.room||CODE;const pw=peerWord();
  return `<div class="kcol-code">${kitRows([["Mã phòng",esc(c),"t"],["Bạn",pw[0],pw[1]]])}</div>`+
   kitInput({id:"coop-link",label:"Đường dẫn mời",value:link(c),readonly:true})+
   `<div class="kcol-act"><button class="kbtn" data-coop="copy">Chép đường dẫn</button><button class="kbtn alt" data-coop="share">Gửi cho bạn</button></div>`+
   `<div class="kpnote">${s.status==="open"?"Đang đợi bạn vào phòng. Bạn vào là cuộc chơi bắt đầu.":"Đang nối với phòng."}</div>`}
 if(pg==="join")return kitInput({id:"coop-code",label:"Mã phòng",value:CODE,placeholder:"bốn chữ bạn gửi"})+
   `<div class="kcol-act"><button class="kbtn k1" data-coop="go">Vào phòng</button></div>`+(s.status==="connecting"?`<div class="kpnote">Đang vào phòng ${esc(CODE)}.</div>`:"");
 if(pg==="err")return `<div class="kpnote">${esc(ERR)}</div><div class="kcol-act"><button class="kbtn k1" data-coop="co">Thử lại</button></div>`;
 return ""}
const HEAD={co:["Chơi cùng bạn","Hai người chung một hậu cung. Cả hai phải cùng ở trong cuộc."],wait:["Mời bạn","Gửi mã hay đường dẫn cho bạn."],join:["Nhập mã","Gõ mã phòng bạn gửi."],err:["Chưa vào được phòng",""]};
function open(pg){PG=pg;if(T.hidden)return;
 const keep=document.activeElement&&document.activeElement.id==="coop-code"?document.activeElement.value:null;if(keep!=null)CODE=keep;
 drop();const M=$("modal");
 /* j74's home panel sits in Q while the title is up: take it out so ours is the one shown */
 for(let i=Q.length-1;i>=0;i--)if(Q[i]&&/kptitle/.test(Q[i].cls||""))Q.splice(i,1);
 LM=kitModal({scene:true,kind:"notice",title:HEAD[pg][0],sub:HEAD[pg][1],html:body(pg),cls:"kptitle kcoop"});
 const s=M.querySelector(".dlg > .kph .kpseal");if(s)s.remove();
 const mr=$("mr");if(mr)mr.innerHTML=`<button class="kbtn alt" data-coop="back">‹ Lui</button>`;
 const c=$("coop-code");if(c){c.setAttribute("autocapitalize","characters");c.setAttribute("autocomplete","off");c.maxLength=8}}
function back(){const pg=PG;PG="";drop();if(pg==="wait"||pg==="join"||pg==="err")COOP.leave();
 if(pg&&pg!=="co"){open("co");return}
 try{showTitle()}catch(e){}}
function toast(msg){try{const n=document.querySelector("#modal.kcoop .kpnote");if(n)n.textContent=msg}catch(e){}}
async function make(){ERR="";try{open("wait");const r=await COOP.create();CODE=r.room;open("wait")}catch(e){ERR=errText(e);open("err")}}
async function join(code){code=String(code||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"");if(!code){toast("Hãy gõ mã phòng.");return}
 CODE=code;try{open("join");await COOP.join(code);open("wait")}catch(e){ERR=errText(e);open("err")}}
async function resume(){ERR="";CODE=stored();try{open("join");await COOP.resume();open("wait")}catch(e){ERR=errText(e);open("err")}}
function errText(e){const c=e&&(e.code||e.message)||"";
 if(/full/i.test(c))return "Phòng này đã đủ hai người.";if(/not.?found|no.?room|404/i.test(c))return "Không thấy phòng mang mã này. Xem lại mã bạn gửi.";
 return "Chưa nối được với phòng. Xem lại đường mạng rồi thử lại."}
$("modal").addEventListener("click",e=>{const b=e.target.closest("button[data-coop]");if(!b)return;e.stopPropagation();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 const a=b.dataset.coop;
 if(a==="co")return open("co");if(a==="resume")return resume();if(a==="make")return make();if(a==="join")return open("join");if(a==="back")return back();
 if(a==="go"){const c=$("coop-code");return join(c?c.value:CODE)}
 if(a==="copy"){const u=link(COOP.state.room||CODE);const done=()=>{b.textContent="Đã chép"};try{navigator.clipboard.writeText(u).then(done,()=>{const i=$("coop-link");if(i){i.select();document.execCommand("copy");done()}})}catch(x){}return}
 if(a==="share"){const u=link(COOP.state.room||CODE);if(navigator.share)navigator.share({title:"Cung Tường Mộng",text:"Vào hậu cung cùng ta. Mã phòng "+(COOP.state.room||CODE),url:u}).catch(()=>{});else{try{navigator.clipboard.writeText(u)}catch(x){}b.textContent="Đã chép"}return}},true);
$("modal").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target&&e.target.id==="coop-code"){e.preventDefault();join(e.target.value)}});
/* title home: add the co-op button under the single-player menu */
function addBtn(){const m=document.querySelector("#modal.kpthome .kpmenu");if(!m||m.querySelector(".kco"))return;
 /* owner 14/11: the title offers "Chơi một mình" / "Chơi cùng bạn". The single-player button keeps its action (Tiếp tục = last sổ,
    Bắt đầu = Chọn sổ), only its words say which way of playing it is; "Kiếp mới" stays beside it. */
 const k=m.querySelector(".kbtn.k1");if(k&&!k.dataset.solo){k.dataset.solo="1";const sm=k.querySelector("small");const was=k.firstChild&&k.firstChild.nodeType===3?k.firstChild.textContent.trim():"";
  const info=sm?sm.textContent:"";k.innerHTML=`Chơi một mình<small>${was==="Tiếp tục"?"Tiếp tục: "+esc(info):esc(info)}</small>`}
 const b=document.createElement("button");b.className="kbtn alt kco";b.dataset.coop="co";b.innerHTML="Chơi cùng bạn<small>Mời bạn · Nhập mã</small>";const k1=m.querySelector(".kbtn.k1");if(k1)k1.after(b);else m.appendChild(b)}
new MutationObserver(addBtn).observe($("modal"),{childList:true,subtree:true});
/* live updates while a lobby screen is up */
COOP.on("status",s=>{if(!LM||Q[0]!==LM||T.hidden)return;if(PG==="wait"){const a=document.activeElement;open("wait");if(a&&a.dataset&&a.dataset.coop){const n=document.querySelector(`#modal [data-coop="${a.dataset.coop}"]`);if(n)n.focus({preventScroll:true})}}});
COOP.on("error",e=>{if(LM&&(PG==="wait"||PG==="join")){ERR=errText(e);open("err")}});
/* both players in → leave the lobby, hand over to the shared-world module */
COOP.on("both",()=>{if(!LM)return;drop();PG="";try{T.hidden=true}catch(e){}const s=COOP.state;COOP.emit("start",{room:s.room,you:s.you,host:s.you==="a",week:s.week,state:s.C})});
/* freeze overlay: kit panel markup (.modal.kpscene > .dlg.kpanel with kpHeader), above everything, no way around it but waiting or leaving */
let FZ=null;
const FZT={me:["Đợi bạn trở lại","Đường mạng của ngươi vừa đứt. Đang nối lại."],peer:["Đợi bạn trở lại","Bạn đã rời cuộc. Hậu cung dừng lại cho đến khi bạn trở lại."],
 week:["Đợi bạn xong tuần","Ngươi đã qua đêm. Khi bạn cũng xong tuần, tuần mới bắt đầu cho cả hai."]};
function fz(on,why){if(!on){if(FZ){FZ.remove();FZ=null}return}
 const [ttl,sub]=FZT[why]||FZT.peer;const pw=peerWord();
 if(!FZ){FZ=document.createElement("div");FZ.id="coopfz";FZ.className="modal kpscene";FZ.setAttribute("role","alertdialog");document.body.appendChild(FZ)}
 FZ.innerHTML=`<div class="dlg kpanel kpsc" data-kind="notice">${kpHeader("notice",ttl,sub)}<div class="body" id="mbz">${kitRows([["Mã phòng",esc(COOP.state.room||""),"t"],["Bạn",why==="week"?"chưa xong tuần":pw[0],why==="week"?"n":pw[1]],["Ngươi",COOP.state.status==="open"?"đang ở trong cuộc":"đang nối lại",COOP.state.status==="open"?"g":"r"]])}</div><div class="row" id="mrz"><button class="kbtn alt" data-cfz="leave">Về màn đầu</button></div></div>`;
 const s=FZ.querySelector(".kpseal");if(s)s.remove()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-cfz]");if(!b)return;e.stopPropagation();fz(false);COOP.leave(true);try{showTitle()}catch(x){}},true);
function check(){const s=COOP.state;if(!s.playing){fz(false);return}
 const x=COOP.other(),e=s.ended||{};
 if(s.status!=="open")fz(true,"me");else if(!s.peerOnline)fz(true,"peer");else if(e[s.you]&&!e[x])fz(true,"week");else fz(false)}
COOP.on("status",check);
COOP.on("start",()=>{COOP.state.playing=true;COOP.live();check()});
COOP.on("week",()=>setTimeout(check,0));
/* a ?room=XXXX link: open "Nhập mã" with the code and join at once */
setTimeout(()=>{try{const q=new URLSearchParams(location.search).get("room");if(q){try{const u=new URL(location.href);u.searchParams.delete("room");history.replaceState(null,"",u.toString())}catch(x){}}
 if(q&&!T.hidden){CODE=q.toUpperCase();join(CODE)}}catch(e){console.error(e)}},60);
window.COOP_LOBBY={open,fz,check};
}catch(e){console.error(e)}})();
