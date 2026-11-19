/* coop-thin hostnull (LUẬT SỬA CẢ NHÓM, step 0 + after table): a HOST-page preload (Playwright addInitScript) that records, for every
   tap run of the guest on the host (TH.tapRun inside her context: part F intents, part D picks, part E steps), what her run tried to show:
     gates  = callers of screenOff() that got "off" (an emitter stopped BEFORE it reached a captured kit call: sounds / scenes / flips)
     noop   = TH.NOOP names called in her context: captured (in TH.UICAP → played on her phone) or dropped
     dom    = host DOM written during her run (MutationObserver.takeRecords; the closest element id) = the host screen painted with HER state
     flips  = krvFlip (face reveal) calls in her context
     ui     = how many effects the run captured (before any cap)  · paint = the host repainted after her run (TH.paintN)
   Used by coop-thin-f1/f2/f3/f4.js and coop-thin-hostnull.js with UISCAN=<file.json> (the suite writes window.__uiscan there at its end).
   Report: node dev/test/coop-thin-uiscan.js <file.json>… (merges the files, prints the markdown table). */
if(typeof window==="undefined"){/* node: the report */
 const fs=require('fs');const A={};for(const f of process.argv.slice(2)){let o=null;try{o=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){console.error('skip',f,e.message);continue}
  for(const [n,r] of Object.entries((o&&o.by)||{})){const a=A[n]=A[n]||{runs:0,ui:0,uiMax:0,gates:{},cap:{},drop:{},dom:{},flips:0,paint:0,lost:0,domRuns:0,miss:0};a.runs+=r.runs;a.domRuns+=r.domRuns|0;a.miss+=r.miss|0;a.uiMax=Math.max(a.uiMax,r.uiMax);a.flips+=r.flips;a.paint+=r.paint;a.lost+=r.lost||0;
   for(const k of ['gates','cap','drop','dom'])for(const [x,c] of Object.entries(r[k]||{}))a[k][x]=(a[k][x]|0)+c}}
 const L=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).map(([k,c])=>k+(c>1?' ×'+c:'')).join(', ')||'—';
 console.log('| run | runs | captured → played | dropped (not captured) | screen gates "off" | host DOM written in her ctx | flips | ui max | runs that wrote host DOM | host repaint | DOM run with no repaint | lost (cap) |');console.log('|---|---|---|---|---|---|---|---|---|---|---|---|');
 for(const n of Object.keys(A).sort()){const a=A[n];console.log(`| ${n} | ${a.runs} | ${L(a.cap)} | ${L(a.drop)} | ${L(a.gates)} | ${L(a.dom)} | ${a.flips} | ${a.uiMax} | ${a.domRuns} | ${a.paint} | ${a.miss} | ${a.lost} |`)}
}else(function(){const W=window;W.__uiscan={by:{},n:0};let cur=null;
 const rec=n=>{const b=W.__uiscan.by;return b[n]=b[n]||{runs:0,uiMax:0,gates:{},cap:{},drop:{},dom:{},flips:0,paint:0,lost:0,domRuns:0,miss:0}};
 const inc=(o,k)=>{o[k]=(o[k]|0)+1};
 /* the emitter behind the gate: "gate<emitter<its caller" (the gate helpers kfOn / kmOn / ievOn / krOn / kpmOn / want / bot are named, then skipped) */
 const GATE=/^(kfOn|kmOn|ievOn|krOn|kpmOn|want|bot|botOff|kfAmbWant)$/;
 const caller=()=>{const s=String(new Error().stack||'').split('\n').slice(3,12);const out=[];for(const l of s){const m=/at (?:Object\.|window\.)?([\w$.<>]+) /.exec(l);if(!m||/^(screenOff|Array|Function|eval|new|Promise|HTMLDocument|Window)/.test(m[1]))continue;out.push(m[1]);if(!GATE.test(m[1])&&out.length>=2)break;if(out.length>=3)break}return out.join('<')||'?'};
 const elOf=nd=>{let e=nd&&nd.nodeType===1?nd:nd&&nd.parentElement;while(e&&!e.id)e=e.parentElement;return e?'#'+e.id:'(body)'};
 let mo=null;
 const go=()=>{const CW=W.COOPW,TH=CW&&CW.thin;if(!TH||!TH.tapRun||typeof W.screenOff!=='function'||!document.body)return false;
  const so=W.screenOff;W.screenOff=function(){const r=so.apply(this,arguments);if(r&&cur&&CW.ctx)inc(cur.gates,caller());return r};
  for(const n of TH.NOOP||[]){const f=W[n];if(typeof f!=='function')continue;W[n]=function(){if(cur&&CW.ctx){const c=TH.UICAP&&TH.UICAP.has(n);inc(c?cur.cap:cur.drop,c||/^(render|showModal|save|resultShow)$/.test(n)?n:n+'<'+caller())};return f.apply(this,arguments)}}
  if(typeof W.krvFlip==='function'){const kf=W.krvFlip;W.krvFlip=function(){if(cur&&CW.ctx)cur.flips++;return kf.apply(this,arguments)}}
  mo=new MutationObserver(()=>{});
  const tr=TH.tapRun;TH.tapRun=function(fn){const outer=cur;const me={gates:{},cap:{},drop:{},dom:{},flips:0,do:TH.curDo||'?',p0:TH.paintN|0};cur=me;
   if(!outer){mo.takeRecords();mo.observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true})}
   let T;try{T=tr.apply(this,arguments)}finally{if(!outer){for(const m of mo.takeRecords())inc(me.dom,elOf(m.target));mo.disconnect()}cur=outer}
   const ui=(T&&T.ui?T.ui.length:0);const all=T&&T.uiAll!=null?T.uiAll:ui;
   /* the name: the F run logs ["run",name] right after; a pick = its card; else the do op */
   Promise.resolve().then(()=>{let n=me.do;try{if(me.do==='f'){const L=TH.F.log;for(let i=L.length-1;i>=0;i--)if(L[i][0]==='run'){n='F '+L[i][1];break}}else if(me.do==='pick')n='D pick';else n=me.do==='?'?'E step':'E/'+me.do}catch(e){}
    setTimeout(()=>{const r=rec(n);r.runs++;r.uiMax=Math.max(r.uiMax,all);r.lost+=Math.max(0,all-ui);r.flips+=me.flips;const pd=(TH.paintN|0)>me.p0,dw=Object.keys(me.dom).length>0;r.paint+=pd?1:0;r.domRuns+=dw?1:0;r.miss+=dw&&!pd?1:0;for(const k of ['gates','cap','drop','dom'])for(const [x,c] of Object.entries(me[k]))r[k][x]=(r[k][x]|0)+c;W.__uiscan.n++},0)});
   return T};return true};
 const t=setInterval(()=>{try{if(go())clearInterval(t)}catch(e){console.error('uiscan',e);clearInterval(t)}},50)})();
