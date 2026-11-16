/* jcoop: co-op network client (worker B, review/coop). Protocol: dev/coop/PROTOCOL.md (lead owns it).
   No UI here (lobby + freeze = jcooplobby.js); no game rules (shared world = jcoopworld.js, worker C).
   Single-player never touches this: nothing connects until COOP.create()/COOP.join() is called.

   API (window.COOP):
     COOP.url                       worker base (https://…workers.dev), default window.COOP_URL
     COOP.pid / COOP.name           my player id (localStorage "ctm-coop-pid") / display name sent on connect
     COOP.state                     {status, room, you:"a"|"b", seats, week, ended, C, peerOnline, bothIn, playing}
                                    status: "off" | "connecting" | "open" | "retry" (reconnecting with backoff) | "closed" | "moved" (seat taken by another device)
     mine / msv: the room's copy of MY week (server seat copy, review/coop-rejoin-xdev) and its version, from the "room" reply
     COOP.create()   → Promise {room}   new room (POST /api/room) + connect; resolves on the first "room" reply
     COOP.join(code) → Promise {room}   check (GET /api/room/<code>) + connect; rejects {code:"noroom"|"full"|"net"}
     COOP.resume()   → Promise|null     reconnect to the last room of this browser (localStorage "ctm-coop-room")
     COOP.leave(keep)                   close (no reconnect); forgets the room unless keep (then "Trở lại phòng" offers it)
     COOP.send(obj) or COOP.send(t, fields)   one protocol message; gzip binary frame above 8 KB, sent in order. false if not open.
     COOP.on(t, fn) / COOP.off(t, fn)   server messages by their t: room presence state week said error pong;
                                        local events: "status" (COOP.state changed), "both" (both seats online, first time
                                        per connection), "start" (lobby hands over to the game), "peer" (friend online flag
                                        changed: fn(online)), "lost" (my socket dropped, will retry), "stop" (left a running co-op game:
                                        jcoopworld must turn itself off so single-player saves/plays normally again)
     COOP.emit(t, data)                 fire a local event (used by the lobby and the world module)
     COOP.other()                       the other seat letter ("a"/"b")
   Flat live fields (kept current on every change; read-only): COOP.code, COOP.seat "a"|"b"|null, COOP.week,
     COOP.online {a,b}, COOP.ended {a,b}, COOP.frozen (in a room and not both seats online: no acts; the lobby's overlay shows it once the game runs),
     COOP.waiting false | "room" (the other seat is still empty) | "week" (I ended the week, the friend has not). */
(function(){try{
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const DEF_URL="https://ctm-coop.victoria-tntt.workers.dev";
const PING=10000,SILENT=25000,BACK=[1000,2000,4000,8000,10000];
const H={};
const st={status:"off",room:"",you:"",seats:null,week:0,ended:{a:false,b:false},C:null,mine:null,msv:0,peerOnline:false,bothIn:false,playing:false};
let ws=null,want=false,tries=0,tmr=0,pinger=0,lastRx=0,pend=null,both=false;
function pid(){let p=LS.get("ctm-coop-pid");if(!p){p=(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now().toString(36)).replace(/-/g,"").slice(0,24);LS.set("ctm-coop-pid",p)}return p}
function emit(t,d){(H[t]||[]).slice().forEach(f=>{try{f(d)}catch(e){console.error("COOP",t,e)}})}
function on(t,f){(H[t]=H[t]||[]).push(f);return f}
function off(t,f){const L=H[t];if(!L)return;const i=L.indexOf(f);if(i>=0)L.splice(i,1)}
function other(){return st.you==="a"?"b":st.you==="b"?"a":""}
function set(o){Object.assign(st,o);const s=st.seats,x=other();const po=!!(s&&x&&s[x]&&s[x].online);
 const was=st.peerOnline;st.peerOnline=po;st.bothIn=!!(st.status==="open"&&po);
 live();emit("status",st);if(was!==po)emit("peer",po);
 if(st.bothIn&&!both){both=true;emit("both",st)}}
/* flat live view for the world module and dev/test/coop-e2e.js: COOP.code seat week online ended frozen waiting */
function live(){const C=window.COOP;if(!C)return;const s=st.seats||{},x=other(),e=st.ended||{};
 C.code=st.room||"";C.seat=st.you||null;C.week=st.week||0;C.online={a:!!(s.a&&s.a.online),b:!!(s.b&&s.b.online)};C.ended={a:!!e.a,b:!!e.b};
 C.frozen=!!(st.you&&st.status!=="off"&&!st.bothIn);  /* PROTOCOL 6: the world runs only while both seats are online */
 C.waiting=!st.you||st.status==="off"?false:!(s[x])?"room":(e[st.you]&&!e[x])?"week":false}
function base(){return String(COOP.url||DEF_URL).replace(/\/+$/,"")}
/* Sổ mây (jcloud): a room joined on another device keeps that device's pid here, so this device takes the same seat */
function pidFor(code){try{const m=JSON.parse(LS.get("ctm-coop-pids")||"{}");const v=m&&m[code];if(typeof v==="string"&&/^[A-Za-z0-9]{8,32}$/.test(v))return v}catch(e){}return pid()}
function wsURL(code){return base().replace(/^http/,"ws")+`/api/room/${code}/ws?pid=${encodeURIComponent(pidFor(code))}&name=${encodeURIComponent(COOP.name||"")}`}
async function gz(s){const cs=new CompressionStream("gzip");const w=cs.writable.getWriter();w.write(new TextEncoder().encode(s));w.close();return new Uint8Array(await new Response(cs.readable).arrayBuffer())}
async function gunz(buf){const ds=new DecompressionStream("gzip");const w=ds.writable.getWriter();w.write(new Uint8Array(buf));w.close();return await new Response(ds.readable).text()}
async function rx(ev){lastRx=Date.now();let m;
 try{const txt=typeof ev.data==="string"?ev.data:await gunz(ev.data instanceof Blob?await ev.data.arrayBuffer():ev.data);m=JSON.parse(txt)}catch(e){console.error("COOP bad frame",e);return}
 if(!m||!m.t)return;
 if(m.t==="room"){tries=0;LS.set("ctm-coop-room",m.code||st.room);set({status:"open",room:m.code||st.room,you:m.you,seats:m.seats,week:m.week||0,ended:m.ended||st.ended,C:m.state===undefined?st.C:m.state,mine:m.mine||null,msv:m.msv||0,caps:Array.isArray(m.caps)?m.caps:[]});
  if(pend){pend.res({room:st.room,you:st.you});pend=null}}
 else if(m.t==="presence")set({seats:m.seats,ended:m.ended||st.ended,week:m.week!=null?m.week:st.week});
 else if(m.t==="state")set({C:m.state,week:m.week!=null?m.week:st.week});
 else if(m.t==="week")set({C:m.state,week:m.week,ended:{a:false,b:false}});
 else if(m.t==="error"){if(m.code==="full"||m.code==="noroom"||m.code==="nopid"){want=false;LS.del("ctm-coop-room");if(pend){pend.rej({code:m.code,message:m.msg});pend=null}}}
 emit(m.t,m)}
function connect(code){clearTimeout(tmr);if(ws){try{ws.onclose=null;ws.close()}catch(e){}ws=null}
 want=true;both=false;set({status:tries?"retry":"connecting",room:code});
 let s;try{s=new WebSocket(wsURL(code))}catch(e){return drop()}
 s.binaryType="arraybuffer";ws=s;
 s.onopen=()=>{lastRx=Date.now()};
 s.onmessage=rx;
 /* 4001 "replaced": the same seat (same pid, Sổ mây) was opened on another device / tab. Do not take it back (the two would steal the
    seat from each other and the stale one would write an old week copy): stop here; "Về màn đầu" › Trở lại phòng takes it back. */
 s.onclose=e=>{if(ws===s){ws=null;if(e&&e.code===4001){want=false;clearInterval(pinger);pinger=0;both=false;set({status:"moved"});emit("moved",{});return}drop()}};
 s.onerror=()=>{}}
function drop(){clearInterval(pinger);pinger=0;both=false;
 if(!want){set({status:"closed"});return}
 const d=BACK[Math.min(tries,BACK.length-1)];tries++;set({status:"retry"});emit("lost",{inMs:d});
 if(pend&&tries>=4){pend.rej({code:"net"});pend=null;want=false;set({status:"closed"});return}
 clearTimeout(tmr);tmr=setTimeout(()=>{if(want)connect(st.room)},d)}
function startPing(){clearInterval(pinger);pinger=setInterval(()=>{if(!ws||ws.readyState!==1)return;
 if(Date.now()-lastRx>SILENT){try{ws.close()}catch(e){}return}try{ws.send('{"t":"ping"}')}catch(e){}},PING)}
on("room",startPing);
function wait(code){return new Promise((res,rej)=>{if(pend)pend.rej({code:"replaced"});pend={res,rej};tries=0;connect(code)})}
async function create(){const r=await fetch(base()+"/api/room",{method:"POST"}).catch(()=>null);
 if(!r||!r.ok)throw {code:"net"};const j=await r.json();return wait(j.code)}
async function join(code){code=String(code||"").trim().toUpperCase();
 if(!/^[A-Z0-9]{4}$/.test(code))throw {code:"noroom"};
 const r=await fetch(base()+"/api/room/"+code).catch(()=>null);if(!r)throw {code:"net"};
 if(r.status===404)throw {code:"noroom"};if(!r.ok)throw {code:"net"};
 const j=await r.json().catch(()=>({}));const me=pid();
 /* full = both seats taken; the server still lets a known pid back in, so only refuse early when we are sure */
 if(j.seats&&j.seats.a&&j.seats.b&&LS.get("ctm-coop-room")!==code&&pidFor(code)===pid())throw {code:"full"};
 return wait(code)}
function resume(){const c=LS.get("ctm-coop-room");if(!c)return null;return wait(c)}
function leave(keep){want=false;clearTimeout(tmr);clearInterval(pinger);if(!keep)LS.del("ctm-coop-room");
 if(pend){pend.rej({code:"left"});pend=null}
 if(ws){try{ws.onclose=null;ws.close(1000,"leave")}catch(e){}ws=null}
 const was=st.playing;both=false;set({status:"off",room:"",you:"",seats:null,week:0,ended:{a:false,b:false},C:null,mine:null,msv:0,playing:false});
 /* the co-op game is over on this device (Về màn đầu / ‹ Lui): the world module must hand save() etc. back to single-player */
 if(was)emit("stop",{})}
/* review/lag-play-2: frames above GZ (8 KB) go gzip (the Worker gunzips any binary frame), and every send goes through ONE ordered queue,
   so a small message never overtakes a bigger one still being compressed (end → unend, seat → bend keep their order). */
/* review/lag-play-2-r1: COOP.send(obj,true) = URGENT (page hide / close): no gzip (compression is async and a page being hidden or closed may
   never get to the send); when nothing is queued it goes out at once, in this call, like before (frames up to 200 KB went plain). */
const GZ=8000,BIG=200000;let sendQ=Promise.resolve(),sendN=0;
async function send(t,f){const o=typeof t==="string"?Object.assign({t},f||{}):t;if(!ws||ws.readyState!==1)return false;
 const s=JSON.stringify(o),w=ws,now=typeof t!=="string"&&f===true;
 if(now&&!sendN&&s.length<=BIG){try{w.send(s);return true}catch(e){return false}}
 sendN++;const job=sendQ.then(async()=>{if(w!==ws||w.readyState!==1)return false;
  try{if(s.length>(now?BIG:GZ)&&typeof CompressionStream!=="undefined"){const z=await gz(s);if(w!==ws||w.readyState!==1)return false;w.send(z)}else w.send(s);return true}catch(e){return false}});
 sendQ=job.catch(()=>false).then(r=>{sendN--;return r});return job}
/* coming back to the tab (phone woke up): reconnect at once instead of waiting out the backoff */
/* owner 16/11 ("không thấy sang buổi"): a phone that slept keeps a socket that LOOKS open (readyState 1) but is dead — a `bend` sent on it
   is lost and the server drops the seat after 45 s ("Hảo hữu đã rời cuộc"). On return: reconnect at once when the socket is closed, she was
   away > 3 s or nothing came in for a while; otherwise ping and reconnect when no answer comes within 3 s. The room snapshot then resends
   what was lost (jcoopworld syncRoom: rebend / re-end) and catches her buổi up with the room. */
let hidAt=0;
function wake(){if(!want)return;const away=hidAt?Date.now()-hidAt:0;hidAt=0;
 if(!ws||ws.readyState>1||away>3000||Date.now()-lastRx>PING+5000){tries=0;connect(st.room);return}
 if(ws.readyState!==1)return;const r0=lastRx;try{ws.send('{"t":"ping"}')}catch(e){}
 setTimeout(()=>{if(want&&lastRx===r0&&ws&&ws.readyState===1){tries=0;connect(st.room)}},3000)}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){hidAt=Date.now();return}wake()});
addEventListener("pageshow",e=>{if(e.persisted)hidAt=hidAt||1;wake()});
addEventListener("focus",()=>{if(want&&(!ws||ws.readyState>1)){tries=0;connect(st.room)}});
addEventListener("online",()=>{if(want&&(!ws||ws.readyState>1)){tries=0;connect(st.room)}});
window.COOP={url:window.COOP_URL||DEF_URL,name:"",get pid(){return pid()},pidFor,state:st,create,join,resume,leave,send,on,off,emit,other,
 code:"",seat:null,week:0,online:{a:false,b:false},ended:{a:false,b:false},frozen:false,waiting:false,live};
}catch(e){console.error(e)}})();
