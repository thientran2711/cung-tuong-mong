/* ================= jcoopchat: CO-OP CHAT "Thư từ" (owner 16/11, review/coop-chat) — KIT §76 =================
   Co-op only (COOPW.on); single-player never builds anything. Transport = the room's own Worker channel (PROTOCOL §10):
   client → {t:"chat", text, nm, g:{y,m,t,b}}, server → {t:"chat", m:{i,s,n,x,w,g,ts}} to BOTH seats (the sender's echo is how she sees her
   own line, so both screens show one order), and `room` carries chat:[last 50] so a reconnect / rejoin reloads the history.
   UI (all kit parts, §76): kitChatBtn (painted icon img/kit/ico-chat.webp + unread badge) on the LEFT of HER room scene (#stage, S.place "home");
   tap → kitChatPanel (kit panel markup, header "Thư từ", kit ✕ / tap outside / Esc closes it back to the icon, covers the screen while open).
   A message that arrives while the frame is closed: unread badge + icon shakes and glows (§68 kitFxBurst glowburst + kitFxLight glow-gold),
   soft sound kitSfx("notice") (OPT.snd / mute / hidden tab are the sound kit's own rules); Gọn mode / reduced motion / bots: a gentle still glow
   only. Away from her room (no icon on screen) the same message shows a kitLine "Có thư từ hảo hữu". Plain text only: every string is escaped,
   the Worker keeps 300 chars, 50 lines, strips control characters. Unread = friend lines newer than "ctm-chat-seen-<room>" (localStorage, try/catch).
   Test hooks: window.COOPCHAT {msgs,unread,open,sounds,shakes,openPanel,closePanel,send,reset}. */
(function(){try{
if(typeof COOP!=="object"||!window.COOPW)return;
const CW=window.COOPW;
const LEN=300;
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const live=()=>CW.on&&typeof S!=="undefined"&&!!S;
const SK=()=>"ctm-chat-seen-"+(COOP.state.room||"");
/* ---------- KIT §76 parts ---------- */
function css(){if(document.getElementById("kchat-css"))return;const st=document.createElement("style");st.id="kchat-css";st.textContent=`
.kchatb{position:absolute;left:8px;top:40%;z-index:6;width:56px;height:56px;padding:0;margin:0;border:1px solid var(--gold,#c9a46a);border-radius:16px;background:#fffaf0d9;box-shadow:0 2px 8px #0004;cursor:pointer;display:grid;place-items:center;overflow:visible}
.kchatb[hidden]{display:none}
.kchatb.kchat-flow{position:relative;left:auto;top:auto}
.kitpg-row #kchat-list{max-height:260px}
.kchatb img{width:44px;height:44px;pointer-events:none}
.kchatb .kchat-n{position:absolute;right:-7px;top:-7px;min-width:20px;height:20px;padding:0 5px;box-sizing:border-box;border-radius:10px;background:#b3261e;color:#fff;font:700 .72rem/20px var(--body,system-ui);text-align:center;border:1.5px solid #fffaf0}
.kchatb.kchat-un{box-shadow:0 0 0 2px #e8c36a,0 0 14px 3px #e8c36acc}
.kchatb.kchat-shake{animation:kchat-sh .7s ease-in-out 2}
.kchatb.kchat-glow:not(.kchat-still){animation:kchat-gl 1.8s ease-in-out infinite}
@keyframes kchat-sh{0%,100%{transform:rotate(0)}15%{transform:rotate(-12deg)}35%{transform:rotate(10deg)}55%{transform:rotate(-8deg)}75%{transform:rotate(5deg)}}
@keyframes kchat-gl{0%,100%{box-shadow:0 0 0 2px #e8c36a,0 0 8px 1px #e8c36a99}50%{box-shadow:0 0 0 2px #f6d98a,0 0 18px 6px #f6d98add}}
#kchatp{z-index:9400}
#kchatp .dlg.kpsc{display:flex;flex-direction:column;height:min(580px,calc(100dvh - 16px))}
#kchatp .kchat-list{flex:1 1 auto;min-height:0;overflow-y:auto;padding:8px 12px;display:flex;flex-direction:column;gap:8px;overscroll-behavior:contain}
#kchatp .kchat-row{padding:4px 12px 10px;flex:none;display:flex;gap:8px;align-items:flex-end}
#kchatp .kchat-row .kinp{flex:1 1 auto;min-width:0;display:block;border:0;padding:0;min-height:0}
#kchatp .kchat-row .kinp .kctl-l{display:none}
#kchatp .kchat-row .kinput{width:100%;box-sizing:border-box;min-height:44px;font-size:1rem}
#kchatp .kchat-row .kbtn{flex:none;margin:0;min-height:44px}
.kcm{max-width:84%;padding:6px 10px 7px;border:1px solid var(--k-hair,#e6d3ac);border-radius:12px;background:#fffaf0;color:var(--ink,#3a2418);font-family:var(--body);overflow-wrap:anywhere;white-space:pre-wrap}
.kcm.me{align-self:flex-end;background:#f3e3bf;border-color:var(--gold,#c9a46a);border-bottom-right-radius:3px}
.kcm.fr{align-self:flex-start;border-bottom-left-radius:3px}
.kcm .kcm-h{display:flex;gap:8px;align-items:baseline;font-size:.72rem;color:var(--dim,#8a7355);white-space:normal}
.kcm .kcm-h b{font-size:.8rem;color:var(--ink,#3a2418)}
.kcm .kcm-x{display:block;font-size:.95rem;line-height:1.35;margin-top:2px}
.kchat-empty{margin:auto;text-align:center;border:0!important;background:none!important;box-shadow:none!important}.kchat-empty::before{display:none!important}`;document.head.appendChild(st)}
const BU=b=>{try{const n=(typeof BUOI!=="undefined"&&BUOI[b])||"";return n}catch(e){return""}};
/* game-style time: "hạ tuần, tháng 3 · Buổi chiều" */
function kitChatWhen(g){g=g||{};try{const t=typeof TUAN!=="undefined"&&TUAN[g.t]||"";return `${t?t+", ":""}tháng ${g.m||1}${BU(g.b)?" · "+BU(g.b):""}`}catch(e){return""}}
function kitChatBubble(m,mine){css();return `<div class="kcm ${mine?"me":"fr"}" data-i="${+m.i||0}"><div class="kcm-h"><b>${esc(m.n||(mine?"Ta":"Hảo hữu"))}</b><span>${esc(kitChatWhen(m.g))}</span></div><span class="kcm-x">${esc(m.x)}</span></div>`}
function kitChatList(msgs,seat){return (msgs&&msgs.length)?msgs.map(m=>kitChatBubble(m,m.s===seat)).join(""):`<p class="kpnote kchat-empty">Chưa có thư nào. Viết đôi dòng gửi hảo hữu.</p>`}
function kitChatBtn(o){css();o=o||{};const n=o.unread|0;return `<button type="button" id="kchat" class="kchatb${n?" kchat-un":""}${o.flow?" kchat-flow":""}" aria-label="${n?`Thư từ, ${n} thư chưa đọc`:"Thư từ"}" title="Thư từ"><img src="img/kit/ico-chat.webp" width="44" height="44" alt="" draggable="false" onerror="this.remove()">${n?`<b class="kchat-n">${n>9?"9+":n}</b>`:""}</button>`}
function kitChatPanel(o){css();o=o||{};const nm=o.name?esc(String(o.name).slice(0,24)):"hảo hữu";
 const inp=typeof kitInput==="function"?kitInput({id:"kchat-in",label:"Thư",placeholder:"Viết thư gửi hảo hữu…"}):`<input class="kinput" id="kchat-in" placeholder="Viết thư gửi hảo hữu…">`;
 return `<div class="dlg kpanel kpsc" data-kind="notice">${typeof kpHeader==="function"?kpHeader("notice","Thư từ","Truyền tin cùng "+nm):""}<div class="kchat-list" id="kchat-list" data-k61skip="1">${kitChatList(o.msgs,o.seat)}</div><div class="kchat-row">${inp}<button type="button" class="kbtn" id="kchat-go">Gửi</button></div></div>`}
window.kitChatBtn=kitChatBtn;window.kitChatPanel=kitChatPanel;window.kitChatList=kitChatList;window.kitChatBubble=kitChatBubble;window.kitChatWhen=kitChatWhen;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§76",title:"kitChatBtn · kitChatPanel · Thư từ (nhắn tin cho hảo hữu)",
 html:()=>{const g={y:1,m:3,t:2,b:1};const ms=[{i:1,s:"b",n:"Lan Nhi",x:"Chào muội, hôm nay muội ra vườn ngự hoa chăng?",g},{i:2,s:"a",n:"Mai Hương",x:"Có chứ. Hẹn gặp ở đình nghỉ mát nhé!",g},{i:3,s:"b",n:"Lan Nhi",x:"<b>Được</b> thôi.",g:{y:1,m:3,t:2,b:2}}];
  return `<div class="kitpg-row" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">${kitChatBtn({unread:0,flow:1})}${kitChatBtn({unread:3,flow:1})}</div><div class="kitpg-row" style="position:relative">${kitChatPanel({msgs:ms,seat:"a",name:"Lan Nhi"})}</div>`}})}catch(e){}
/* ---------- state ---------- */
const ST={msgs:[],seen:0,open:false,sounds:0,shakes:0,max:0};
function seat(){return COOP.state.you||COOP.seat||""}
function unread(){const s=seat();return ST.msgs.filter(m=>m.s!==s&&m.i>ST.seen).length}
function markSeen(){const mx=ST.msgs.length?ST.msgs[ST.msgs.length-1].i:0;if(mx>ST.seen){ST.seen=mx;LS.set(SK(),String(mx))}}
function frName(){const s=seat();for(let i=ST.msgs.length-1;i>=0;i--)if(ST.msgs[i].s!==s&&ST.msgs[i].n)return ST.msgs[i].n;
 try{const o=COOP.other(),so=(COOP.state.seats||{})[o];if(so&&so.name)return so.name}catch(e){}return""}
/* ---------- icon on the room stage ---------- */
let BTN=null,lastBtn="";
function inRoom(){if(!live()||S.dead)return false;const T=$("title");if(T&&!T.hidden)return false;if(document.getElementById("coopfz"))return false;
 return (S.place||"home")==="home"&&!(typeof tab!=="undefined"&&tab==="go")}
function still(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return true}}
/* owner 16/11: the left of the stage is ONE kit icon column, kitStageRail (KIT §77, review/goal-strip-fix). When it exists the chat icon is mounted
   there (rail badge / glow = unread); until it merges the own left-side button below is the fallback. */
let railKey="";
function rail(n){try{const R=typeof kitStageRail!=="undefined"&&kitStageRail;if(!R||typeof R.add!=="function")return false;
 const k=n+"|"+(ST.open?1:0);if(k!==railKey){railKey=k;R.add({id:"chat",icon:"img/kit/ico-chat.webp",title:"Thư từ",onTap:openPanel,badge:n,glow:n>0&&!ST.open})}return true}catch(e){return false}}
function paint(){try{const st=$("stage");if(!st||!inRoom()){if(BTN&&!BTN.hidden)BTN.hidden=true;try{if(railKey&&typeof kitStageRail!=="undefined"&&kitStageRail.remove){kitStageRail.remove("chat");railKey=""}}catch(e){}return}
 const n=unread();if(rail(n)){if(BTN&&!BTN.hidden)BTN.hidden=true;return}const h=kitChatBtn({unread:n});
 if(!BTN||BTN.parentNode!==st){if(BTN)BTN.remove();const w=document.createElement("div");w.innerHTML=h;BTN=w.firstElementChild;BTN.addEventListener("click",e=>{e.stopPropagation();openPanel()});st.appendChild(BTN);lastBtn=h}
 else if(h!==lastBtn){const keep=BTN.className.match(/kchat-(shake|glow|still)/g)||[];const w=document.createElement("div");w.innerHTML=h;const nb=w.firstElementChild;BTN.className=nb.className;BTN.innerHTML=nb.innerHTML;BTN.setAttribute("aria-label",nb.getAttribute("aria-label"));keep.forEach(c=>BTN.classList.add(c));lastBtn=h}
 BTN.classList.toggle("kchat-still",still());BTN.classList.toggle("kchat-glow",n>0&&!ST.open);
 if(BTN.hidden)BTN.hidden=false}catch(e){console.error("kchat paint",e)}}
/* ---------- the frame ---------- */
let P=null;
function listEl(){return P&&P.querySelector("#kchat-list")}
function fillList(){const l=listEl();if(!l)return;const near=l.scrollHeight-l.scrollTop-l.clientHeight<80;l.innerHTML=kitChatList(ST.msgs,seat());if(near||!l.dataset.sc){l.scrollTop=l.scrollHeight;l.dataset.sc="1"}}
function openPanel(){if(!live())return false;css();if(P)return true;ST.open=true;markSeen();
 P=document.createElement("div");P.id="kchatp";P.className="modal kpscene";P.setAttribute("data-k61skip","1");P.setAttribute("role","dialog");P.setAttribute("aria-label","Thư từ");document.body.appendChild(P);
 P.innerHTML=kitChatPanel({msgs:ST.msgs,seat:seat(),name:frName()});
 const seal=P.querySelector(".kpseal");if(seal)seal.remove();
 const dlg=P.querySelector(".dlg");try{if(typeof kitXAdd==="function")kitXAdd(dlg,closePanel)}catch(e){}
 P.addEventListener("click",e=>{if(e.target===P)closePanel()});
 const inp=P.querySelector("#kchat-in");inp.setAttribute("maxlength",String(LEN));inp.setAttribute("autocomplete","off");inp.setAttribute("enterkeyhint","send");
 inp.addEventListener("keydown",e=>{e.stopPropagation();if(e.key==="Enter"&&!e.isComposing){e.preventDefault();send(inp.value,inp)}else if(e.key==="Escape"){e.preventDefault();closePanel()}});
 P.addEventListener("keydown",e=>{if(e.key==="Escape"){e.stopPropagation();closePanel()}},true);
 P.querySelector("#kchat-go").addEventListener("click",()=>send(inp.value,inp));
 const l=listEl();if(l)l.scrollTop=l.scrollHeight;
 paint();try{if(window.matchMedia&&matchMedia("(pointer:fine)").matches)inp.focus({preventScroll:true})}catch(e){}return true}
function closePanel(){if(!P)return;P.remove();P=null;ST.open=false;paint()}
function send(text,inp){text=String(text||"").replace(/\s+/g," ").trim().slice(0,LEN);if(!text)return false;
 const g={y:S.year,m:S.month,t:S.tuan,b:S.buoi||0};
 const ok=COOP.send({t:"chat",text,nm:String(S.name||"").slice(0,24),g});
 if(!ok){try{kitLine("Chưa gửi được thư, đang nối lại")}catch(e){}return false}
 ST.lastText=text;if(inp){inp.value="";}return true}
/* ---------- arrival ---------- */
function notify(m){const vis=inRoom()&&(!!railKey||!!(BTN&&!BTN.hidden));ST.sounds++;
 try{if(typeof kitSfx==="function")kitSfx("notice");else if(typeof sfx==="function")sfx("sfx-notice")}catch(e){}
 if(!vis){try{if(typeof kitLine==="function")kitLine("Có thư từ hảo hữu")}catch(e){}return}
 paint();
 if(railKey){try{if(typeof kitStageRail.pulse==="function"&&!still())kitStageRail.pulse("chat")}catch(e){}return}
 if(!BTN)return;
 if(still()||window.__bot)return;                    /* Gọn / reduced motion: the still glow only (kchat-glow) */
 ST.shakes++;BTN.classList.remove("kchat-shake");void BTN.offsetWidth;BTN.classList.add("kchat-shake");setTimeout(()=>{if(BTN)BTN.classList.remove("kchat-shake")},1500);
 try{if(typeof kitFxBurst==="function")kitFxBurst("glowburst",BTN,6);if(typeof kitFxLight==="function")kitFxLight("glow-gold",BTN,{inside:true,dur:2000,scale:1.5,opacity:.7})}catch(e){}}
function add(m){if(!m||!m.i||ST.msgs.some(x=>x.i===m.i))return false;ST.msgs.push(m);ST.msgs.sort((a,b)=>a.i-b.i);while(ST.msgs.length>50)ST.msgs.shift();return true}
COOP.on("chat",d=>{if(!live()||!d||!d.m)return;const fresh=add(d.m);if(!fresh)return;const mine=d.m.s===seat();
 if(ST.open){markSeen();fillList();if(!mine){try{if(typeof kitSfx==="function")kitSfx("tap")}catch(e){}}return}
 if(!mine)notify(d.m);paint()});
COOP.on("room",m=>{ST.seen=+LS.get(SK())||0;const prev=ST.msgs.length?ST.msgs[ST.msgs.length-1].i:ST.max;
 ST.msgs=[];(m.chat||[]).forEach(add);const mx=ST.msgs.length?ST.msgs[ST.msgs.length-1].i:0;
 const s=m.you||seat();
 if(ST.open){markSeen();fillList()}
 else if(prev&&ST.msgs.some(x=>x.i>prev&&x.s!==s))notify(ST.msgs[ST.msgs.length-1]);
 ST.max=Math.max(ST.max,mx);paint()});
COOP.on("error",m=>{if(m&&(m.code==="slow"||m.code==="toolarge")&&P){const inp=P.querySelector("#kchat-in");if(inp&&!inp.value&&ST.lastText)inp.value=ST.lastText;try{kitLine(m.code==="slow"?"Gửi chậm lại chút":"Thư quá dài")}catch(e){}}});
COOP.on("stop",()=>{closePanel();ST.msgs=[];ST.seen=0;ST.max=0;if(BTN){BTN.remove();BTN=null}});
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{paint()}catch(e){}return r}})();
setInterval(()=>{if(CW.on)paint();else if(BTN&&!BTN.hidden)BTN.hidden=true},500);
window.COOPCHAT={ST,get msgs(){return ST.msgs},get unread(){return unread()},get open(){return ST.open},get sounds(){return ST.sounds},get shakes(){return ST.shakes},openPanel,closePanel,send:t=>send(t,null),paint};
}catch(e){console.error(e)}})();
