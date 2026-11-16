/* jslots: TWO separate save sets (owner 16/11, review/save-slots).
     Solo  = Sổ một / hai / ba     localStorage "hclh-save-v2-<n>" (j6 save/loadSlot, unchanged format)
     Co-op = Phòng hảo hữu 1..3    localStorage "ctm-coop-rooms" = [{room, seat, at, name, who, age, date, fr}] (newest first, max 3)
             The room's server (Durable Object) is the real save of a co-op life; the list remembers each room's ám hiệu, the
             friend and her character there, so the menu can show it and "Trở lại phòng" rejoins it (same browser pid = same seat).
   CAUSE of the owner's lost sổ: j6 render() ends with save(). After leaving a room (freeze panel "Về màn đầu", ‹ Lui, the
   in-game title button) COOPW.on is false but S is still the co-op life, so the next render() wrote the co-op life into
   the current solo sổ SK(SLOT) (and a co-op death removed that sổ). Also the in-game title button kept the room open, so a
   solo sổ loaded from the title could be rebuilt into the co-op life by the next room message.
   FIX: a life built while in a room is marked S.coopRoom (start / deser wrapped); save() never writes a marked life into a
   solo sổ; loading / starting a solo sổ (and the in-game title button) leaves the room first (room code kept for rejoin). */
(function(){try{
if(typeof COOP!=="object"||!window.COOPW)return;
const CW=window.COOPW;const RK="ctm-coop-rooms",MAX=3;
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const room=()=>COOP.state&&COOP.state.room||"";
function list(){let L=null;try{L=JSON.parse(LS.get(RK)||"null")}catch(e){}L=Array.isArray(L)?L.filter(x=>x&&x.room):[];
 /* old builds kept only the last room ("ctm-coop-room"): keep it as room 1 */
 const old=LS.get("ctm-coop-room");if(old&&!L.some(x=>x.room===old))L.unshift({room:old,at:0});
 return L.slice(0,MAX)}
function put(L){LS.set(RK,JSON.stringify(L.slice(0,MAX)))}
function upd(code,o){if(!code)return;const L=list();const i=L.findIndex(x=>x.room===code);const was=i>=0?L.splice(i,1)[0]:{room:code};
 const n=Object.assign({},was,o,{room:code,at:Date.now()});L.unshift(n);
 const a=JSON.stringify(L.slice(0,MAX)),b=LS.get(RK);if(a!==b)LS.set(RK,a)}
function forget(code){put(list().filter(x=>x.room!==code));if(LS.get("ctm-coop-room")===code)try{localStorage.removeItem("ctm-coop-room")}catch(e){}}
function who(s){try{return typeof CTM_SLOTWHO==="function"?CTM_SLOTWHO(s):(RANKS[s.rank]||{}).n||""}catch(e){return ""}}
function when(s){try{return typeof CTM_SLOTDATE==="function"?CTM_SLOTDATE(s):`Tháng ${s.month}, năm ${s.year}`}catch(e){return ""}}
function friendTxt(){try{const v=CW.friend&&CW.friend();if(v){const kn=S&&S.known&&S.known["r"+v.id];return kn?`${(RANKS[v.rank]||{}).n||""} ${v.name}`.trim():"chưa gặp mặt"}
 const s=COOP.state,x=COOP.other(),p=s.seats&&x&&s.seats[x];return p?"chưa chọn thân phận":"chưa vào phòng"}catch(e){return ""}}
let lastRec="";
function record(){const c=room();if(!c||!CW.on)return;const o={seat:COOP.state.you||"",fr:friendTxt()};
 if(S&&S.coopRoom===c&&!S.dead){o.name=S.name;o.who=who(S);o.age=S.age;o.date=when(S)}else if(S&&S.dead&&S.coopRoom===c){o.name="";o.who="";o.date=""}
 const k=JSON.stringify(o);if(k===lastRec)return;lastRec=k;upd(c,o)}
/* SOLO = life objects built outside a room (a sổ loaded, a solo start): never marked, even while a room is open around them
   (guest waiting for the host's world, Luân hồi card still open, CW.newLife left over from an earlier room) */
const SOLO=new WeakSet();
function mark(){if(CW.on&&S&&typeof S==="object"&&!S.coopRoom&&!SOLO.has(S)&&room())S.coopRoom=room()}
function solo(){try{if(S&&typeof S==="object"){delete S.coopRoom;SOLO.add(S)}}catch(e){}}
/* a life built in a room belongs to the room */
["start","nlRun"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){const s0=S;const r=f.apply(this,arguments);try{if(S!==s0){if(CW.on)mark();else solo()}}catch(e){}return r}});
(function(){const f=deser;deser=function(){const r=f.apply(this,arguments);try{if(CW.on)mark();else solo()}catch(e){}return r}})();
/* save(): a co-op life never goes into a solo sổ; in a room, remember the room's line for the menu */
(function(){const f=save;save=function(){try{if(CW.on&&(CW.base||CW.inLife))mark()}catch(e){}
 if(S&&S.coopRoom){if(CW.on){const r=f.apply(this,arguments);try{record()}catch(e){}return r}return}
 return f.apply(this,arguments)}})();
COOP.on("room",m=>{try{const c=m&&m.code||room();if(c)upd(c,{seat:m.you||COOP.state.you||""})}catch(e){}});
COOP.on("start",()=>{lastRec="";try{record()}catch(e){}});
COOP.on("error",m=>{try{if(m&&(m.code==="noroom")){const c=room()||LS.get("ctm-coop-room");if(c)forget(c)}}catch(e){}});
COOP.on("stop",()=>{lastRec=""});
function leaveRoom(){try{if(CW.on){if(CW.base)mark();record()}}catch(e){}try{if(COOP.state.status!=="off"||CW.on)COOP.leave(true)}catch(e){console.error(e)}}
/* solo sổ picked on the title (Tiếp tục kiếp này / Kiếp mới / the home "Chơi một mình" that clicks it): leave the room first */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#slots button[data-load],#slots button[data-new]");if(!b)return;
 if(b.dataset.ask==="1")return;leaveRoom()},true);
/* the in-game title button while in a room: leave it (kept in the list, "Trở lại phòng" rejoins) */
(function(){const m=$("menu");if(!m)return;const m0=m.onclick;m.onclick=function(){if(CW.on&&!(Q.length&&S&&!S.dead))leaveRoom();return m0&&m0.apply(this,arguments)}})();
/* menu list (kit: .kslot section = h4.kpst + kitRows + .kslot-a .kbtn, the same parts as the solo sổ in j74) */
const NO=["một","hai","ba"];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function html(){const L=list();let h="";
 for(let i=0;i<MAX;i++){const r=L[i];const hd=`<h4 class="kpst">Phòng hảo hữu ${NO[i]}</h4>`;
  if(!r){h+=`<div class="kslot kroom">${hd}${kitRows([["Phòng","Chưa có","n"]])}<div class="kslot-a"><button class="kbtn" data-coop="make">Mời hảo hữu</button></div></div>`;continue}
  const R=[["Ám hiệu",esc(r.room),"t"],["Hảo hữu",esc(r.fr||"chưa rõ"),"n"]];
  if(r.name)R.push(["Kiếp",esc(`${r.who||""} ${r.name}`.trim()),"t"],["Tuổi",esc(r.age!=null?r.age+" tuổi":""),"n"],["Ngày",esc(r.date||""),"n"]);else R.push(["Kiếp",r.at?"chưa chọn thân phận":"vào phòng để xem","n"]);
  h+=`<div class="kslot kroom">${hd}${kitRows(R)}<div class="kslot-a"><button class="kbtn" data-coop="resume" data-room="${esc(r.room)}">Trở lại phòng</button><button class="kbtn alt" data-coop="forget" data-room="${esc(r.room)}" data-ask="1">Bỏ phòng</button></div></div>`}
 return h}
window.CTM_ROOMS={list,html,forget,upd,full:()=>list().length>=MAX};
}catch(e){console.error(e)}})();
