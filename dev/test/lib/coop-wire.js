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
  s.send=d=>{if(typeof d==='string'){try{tx(JSON.parse(d))}catch(e){}}else{const c=d instanceof Uint8Array?d.slice():d;tq=tq.then(async()=>{try{tx(JSON.parse(await text(c)))}catch(e){}})}return sd(d)};
  s.addEventListener('message',e=>{const d=e.data;if(typeof d==='string'&&rq.done!==false){try{__rxT.push(JSON.parse(d).t)}catch(x){}return}
   const r=rq.then(async()=>{try{__rxT.push(JSON.parse(await text(d)).t)}catch(x){}});r.done=false;rq=r;r.then(()=>{if(rq===r)rq=Promise.resolve()})});return s};
 window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})}

module.exports={guestNet,typeSpy};
