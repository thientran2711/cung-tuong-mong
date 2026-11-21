/* coop-guest-names (law 6b + OD:L165): the j61 name-mask check for a co-op seat, run inside the page (page.evaluate(K61_COOP_PROBE)).
   Shared people = the friend (her coop entry, else her room blob) + her own people (maid, servants, children, home family, pools: nmPers of
   the room's P of the other seat). Reports
     coll   : a shared person's full name that the mask rewrites through SOMEONE ELSE's record (an unmet local / world record printing
              «<his title> ???» over her name); masked by her own unmet copy is the knowledge rule, not a collision;
     keyDup : one j61 key held by two different people of this seat (KREG / S.known shared: knowing one = knowing the other);
     scrub  : the friend's full name (with her rank) after the mask: unchanged when she is met, «Hảo hữu của ta» when not, never another's title. */
module.exports=function K61_COOP_PROBE(){try{
 if(typeof k61Table!=='function'||typeof S==='undefined'||!S||!S.known||!window.COOPW||!COOPW.on)return{skip:1};
 K61RX=null;k61Table();const M=(typeof K61MAP==='object'&&K61MAP)||{};
 const all=k61All();all.push(S);const by=new Map();for(const e of all){const k=kOf61(e);if(!k)continue;if(!by.has(k))by.set(k,new Set());by.get(k).add(e)}
 const keyDup=[...by].filter(([k,L])=>L.size>1).map(([k,L])=>[k,[...L].map(e=>(e&&e.name)||'?')]);
 const P=COOPW.base&&COOPW.base.P&&COOPW.base.P[COOPW.seat==='a'?'b':'a'];const f=typeof k61CoopEnt==='function'?k61CoopEnt():null;
 const sh=[];if(f)sh.push({e:f,who:'friend'});if(P&&P.S&&!P.dead&&!P.S.dead&&typeof nmPers==='function')for(const x of nmPers(P.S)){if(x.fp==='name'&&f)continue;sh.push({e:x.o,who:'P.'+x.fp})}
 const fk=f?kOf61(f):'';const coll=[];
 /* her full name through the mask: unchanged, or masked by HER OWN record (her copy on this seat, unmet) — never by someone else's */
 for(const {e,who} of sh){const t=String(e.name||'');if(t.length<4)continue;const out=k61Scrub(t,true,'',t);if(out===t)continue;const k=M[t];const o=k?k61Ent(k):null;
  const copy=o&&f&&o.name===t&&(o===f.maid||(f.staff||[]).includes(o)||(f.kids||[]).includes(o))/* her person's copy on the friend entry */;
  if(o&&(o===e||copy||(o.coop&&(who==='friend'||who==='P.name'))))continue;coll.push({who,name:t,out,k,to:o&&o.name,kind:o&&k61Kind(o),title:o&&k61MaskT(o)})}
 let scrub=null;const fn=f?f.name:(P&&P.name)||null;if(fn){const t='Quý nhân '+fn;const s=k61Scrub(t,true,'',t);const named=f?k61Named(f):null;
  scrub={name:fn,named,out:s,ok:named===false?s.includes(K61FR)&&!/\?\?\?/.test(s):s===t||(!f&&!/\?\?\?/.test(s))}}
 return{seat:COOPW.seat,n:sh.length,coll,keyDup,scrub}}catch(e){return{err:String(e&&e.stack||e)}}};
