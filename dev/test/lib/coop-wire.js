/* coop-wire.js — ONE source for the co-op tests' socket fakes (robot-coop-fix-1 r2, BIG review A, law 11).
   The Worker (and the client, above GZ 8000) send big frames as GZIP BINARY. A test that looks only at string frames is blind to them:
   a "deaf" phone still hears the host's big snap/delta, a type spy never counts them. Both fakes here read binary frames too.
   Use with ctx.addInitScript(<fn>) (each fn is self-contained: it runs in the page). */

/* guestNet: a dead socket on her phone (coop-thin-e-net family).
   window.__mute=1   → her `do` frames are dropped (window.__drop gets their heads)
   window.__deafThin=1 → every host view ("t":"delta" / "snap") that ARRIVES while deaf never reaches the game (window.__lostV counts them),
                         string or gzip binary. Frames are handled in arrival order: once one binary frame is held for its async gunzip,
                         every later frame waits behind it, then the kept ones are re-delivered to the game in the same order.
   window.__wss = her sockets (the test closes them → COOP reconnects). */
function guestNet(){const W0=window.WebSocket,s0=W0.prototype.send;window.__wss=[];window.__drop=[];window.__lostV=0;
 W0.prototype.send=function(d){if(window.__mute&&typeof d==='string'&&d.indexOf('"t":"do"')>=0){window.__drop.push(d.slice(0,120));return}return s0.apply(this,arguments)};
 const thin=t=>/"t":"(delta|snap)"/.test(t);
 const text=async d=>{if(typeof d==='string')return d;const b=d instanceof Blob?await d.arrayBuffer():d;const ds=new DecompressionStream('gzip');const w=ds.writable.getWriter();w.write(new Uint8Array(b));w.close();return await new Response(ds.readable).text()};
 const again=new WeakSet();
 window.WebSocket=function(u,p){const s=p===undefined?new W0(u):new W0(u,p);window.__wss.push(s);const q=[];let busy=false;
  const pump=async()=>{if(busy)return;busy=true;while(q.length){const f=q[0];let drop=false;if(f.deaf){try{drop=thin(await text(f.data))}catch(e){}}q.shift();
    if(drop){window.__lostV++;continue}const e2=new MessageEvent('message',{data:f.data,origin:f.origin});again.add(e2);s.dispatchEvent(e2)}busy=false};
  s.addEventListener('message',ev=>{if(again.has(ev))return;const deaf=!!window.__deafThin;
   if(!q.length&&(!deaf||typeof ev.data==='string')){if(deaf&&thin(ev.data)){window.__lostV++;ev.stopImmediatePropagation()}return}
   ev.stopImmediatePropagation();q.push({data:ev.data,origin:ev.origin,deaf});pump()});return s};
 window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})}

/* typeSpy: window.__tx = types she sent, window.__rxT = types she received, window.__old = her act/actr [t,k,mode];
   gzip binary frames are gunzipped first (per socket, in order: each list keeps the wire order). */
function typeSpy(){const W0=window.WebSocket;window.__tx=[];window.__rxT=[];
 const text=async d=>{if(typeof d==='string')return d;const b=d instanceof Blob?await d.arrayBuffer():d;const ds=new DecompressionStream('gzip');const w=ds.writable.getWriter();w.write(new Uint8Array(b));w.close();return await new Response(ds.readable).text()};
 const tx=j=>{__tx.push(j.t);if(j.t==='act'||j.t==='actr')(window.__old=window.__old||[]).push([j.t,j.k||'',j.mode||''])};
 window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);const sd=s.send.bind(s);let tq=Promise.resolve(),rq=Promise.resolve();
  /* review N1 (robot-coop-fix-1 r2): a string send made while a gzip send is still being decoded waits behind it, so __tx keeps the wire order
     too (before: tx ["act","do","seat"] for the wire act,seat,do) */
  let tp=0;s.send=d=>{if(typeof d==='string'&&!tp){try{tx(JSON.parse(d))}catch(e){}}else{const c=typeof d==='string'?d:d instanceof Uint8Array?d.slice():d;tp++;tq=tq.then(async()=>{try{tx(JSON.parse(await text(c)))}catch(e){}tp--})}return sd(d)};
  s.addEventListener('message',e=>{const d=e.data;if(typeof d==='string'&&rq.done!==false){try{__rxT.push(JSON.parse(d).t)}catch(x){}return}
   const r=rq.then(async()=>{try{__rxT.push(JSON.parse(await text(d)).t)}catch(x){}});r.done=false;rq=r;r.then(()=>{if(rq===r)rq=Promise.resolve()})});return s};
 window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})}

/* hostNet: a dead HOST socket (coop-thin-e-net; review N2 of robot-coop-fix-1 r2: its own filter read string frames only, so a relayed `do`
   or a `thin` above 8000 chars — gzip binary — slipped past it). Same in-order queue as guestNet.
   window.__mute=1     → this page's `do` sends are dropped (window.__drop gets their heads), string or gzip binary
   window.__deaf=1     → every relayed `do` that ARRIVES while deaf never reaches the game (window.__lost gets their heads)
   window.__holdThin=1 → every `thin` that arrives is held in window.__thq as [socket, data] (the test re-dispatches them later)
   window.__wss = the page's sockets. */
function hostNet(){const W0=window.WebSocket,s0=W0.prototype.send;window.__wss=[];window.__drop=[];window.__lost=[];window.__thq=[];
 const text=async d=>{if(typeof d==='string')return d;const b=d instanceof Blob?await d.arrayBuffer():d;const ds=new DecompressionStream('gzip');const w=ds.writable.getWriter();w.write(new Uint8Array(b));w.close();return await new Response(ds.readable).text()};
 const isDo=t=>t.indexOf('"t":"do"')>=0,isThin=t=>t.indexOf('"t":"thin"')>=0;
 let sq=Promise.resolve(),sp=0;
 W0.prototype.send=function(d){const me=this;if(!window.__mute&&!sp)return s0.call(me,d);
  if(typeof d==='string'&&!sp){if(isDo(d)){window.__drop.push(d.slice(0,120));return}return s0.call(me,d)}
  const c=typeof d==='string'?d:d instanceof Uint8Array?d.slice():d,mute=!!window.__mute;sp++;
  sq=sq.then(async()=>{let drop=false;if(mute){try{const t=await text(c);if(isDo(t)){drop=true;window.__drop.push(t.slice(0,120))}}catch(e){}}try{if(!drop)s0.call(me,c)}catch(e){}sp--})};
 const again=new WeakSet();
 window.WebSocket=function(u,p){const s=p===undefined?new W0(u):new W0(u,p);window.__wss.push(s);const q=[];let busy=false;
  const cls=(t,f)=>f.hold&&isThin(t)?'hold':f.deaf&&isDo(t)?'drop':'';
  const pump=async()=>{if(busy)return;busy=true;while(q.length){const f=q[0];let k='',t='';if(f.deaf||f.hold){try{t=await text(f.data);k=cls(t,f)}catch(e){}}q.shift();
    if(k==='drop'){window.__lost.push(t.slice(0,120));continue}if(k==='hold'){window.__thq.push([s,f.data]);continue}
    const e2=new MessageEvent('message',{data:f.data,origin:f.origin});again.add(e2);s.dispatchEvent(e2)}busy=false};
  s.addEventListener('message',ev=>{if(again.has(ev))return;const f={data:ev.data,origin:ev.origin,deaf:!!window.__deaf,hold:!!window.__holdThin};
   if(!q.length&&typeof ev.data==='string'){const k=cls(ev.data,f);if(k==='drop'){window.__lost.push(ev.data.slice(0,120));ev.stopImmediatePropagation()}else if(k==='hold'){window.__thq.push([s,ev.data]);ev.stopImmediatePropagation()}return}
   if(!q.length&&!f.deaf&&!f.hold)return;
   ev.stopImmediatePropagation();q.push(f);pump()});return s};
 window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})}

module.exports={guestNet,typeSpy,hostNet};
