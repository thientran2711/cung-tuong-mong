/* econ-items counters for runb.js (env INP2=ineit.js): her monthly goods (pieces, value = IT.pr), skims (count, lines worse/missing), servants pocketing
   (count, noticed), ice issued/melted, robes lost, weeks in trung y, re-issue roads used, bạc at the end. Works on main too (missing hooks = 0).
   Attached to each life record as x.ei. */
(function(){const Z=()=>({stip:0,pcs:0,val:0,skim:0,skimLines:0,pil:0,pilSeen:0,ice:0,melt:0,lost:0,tyW:0,road:{},bac0:null,stipBac:0});window.__ei=Z();
 const R0=window.__res;R0.push=function(x){try{const e=window.__ei;e.bacEnd=S&&S.bac;x.ei=e}catch(er){}window.__ei=Z();return Array.prototype.push.call(this,x)};
 if(typeof econStipend==="function"){const s0=econStipend;econStipend=function(p){const me=p===S,b0=me?S.bac:0,n0=me?(S.inv||[]).length:0;const r=s0.apply(this,arguments);
  try{if(me){const E=window.__ei;E.stip++;E.stipBac+=S.bac-b0;const L=S.inv.slice(n0).filter(e=>e&&e.from==="noivu");E.pcs+=L.length;E.val+=L.reduce((a,e)=>a+((IT[e.k]&&IT[e.k].pr)||0),0);E.ice+=L.filter(e=>e.k==="bangda"||e.k==="bangvun").length}}catch(er){}return r}}
 if(typeof stipSkim==="function"){const k0=stipSkim;stipSkim=function(p){const r=k0.apply(this,arguments);try{if(p===S&&r){window.__ei.skim++;window.__ei.skimLines+=(r.items===true?1:(r.items|0))}}catch(er){}return r}}
 if(typeof eitPilfer==="function"){const f0=eitPilfer;eitPilfer=function(p){const r=f0.apply(this,arguments);try{if(p===S&&r){window.__ei.pil++}}catch(er){}return r}}
 if(typeof eitPilEvent==="function"){const v0=eitPilEvent;eitPilEvent=function(){window.__ei.pilSeen++;return v0.apply(this,arguments)}}
 if(typeof tyLost==="function"){const l0=tyLost;tyLost=function(p){try{if(p===S)window.__ei.lost++}catch(er){}return l0.apply(this,arguments)}}
 if(typeof eitIssue==="function"){const i0=eitIssue;eitIssue=function(src){const r=i0.apply(this,arguments);try{if(r)window.__ei.road[src]=(window.__ei.road[src]||0)+1}catch(er){}return r}}
 const e0=endTurn;endTurn=function(){try{if(S&&!S.dead&&typeof tyOn==="function"&&tyOn(S))window.__ei.tyW++;const ice=(S.inv||[]).filter(e=>e&&(e.k==="bangda"||e.k==="bangvun")).length;window.__ei._ice=ice}catch(er){}
  const r=e0.apply(this,arguments);try{const ice=(S.inv||[]).filter(e=>e&&(e.k==="bangda"||e.k==="bangvun")).length;if(window.__ei._ice>ice)window.__ei.melt+=window.__ei._ice-ice}catch(er){}return r};
})();
