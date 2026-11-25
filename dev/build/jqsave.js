/* ================= jqsave: pending cards survive save / load (wraps serQ, deserQ, save, render only) =================
   The game saved only cards with a pid (rebuilt by mkP) and plain notices; a choice card without a pid was dropped by serQ, so a reload
   while it was open lost it (and whatever it would have done).
   1) A choice card made only of data (its options carry fx / text, no function) is saved whole and comes back as it was.
   2) A choice card whose options run code (opt.go closures: visits, festivals, catches…) cannot be written down. While such a card is
      waiting, the autosave is held, so the slot keeps the last moment with no such card open; the save is made as soon as the card is
      answered. A reload therefore lands either before the card or after it, never on a half-told card.
   Old saves load as before (entries without $full use the old path). Off switch for measuring: window.__jqoff=1.
   ===================================================================================================================== */
const JQ={held:0,stat:{full:0,held:0,flushed:0}};
function jqData(m){/* the card as plain data, or null when an option (or the card) carries code */try{if(!m||m.pid||!m.opts)return null;
  for(const o of m.opts)for(const k in o)if(typeof o[k]==="function")return null;for(const k in m)if(k!=="who"&&typeof m[k]==="function")return null;
  const c=JSON.parse(JSON.stringify(m,(k,v)=>k==="who"||k==="__b95"||k==="__c95"||k==="__aud95"?undefined:v));c.w=m.who&&m.who.w;c.$full=1;return c}catch(e){return null}}
function jqSaveable(m){return !m||!!m.pid||!m.opts||!!jqData(m)}
(function(){
 /* every card in queue order, each from its own save form (button-crawl-fix-2: the old loop paired cards with the filtered base list by index,
    so a menu card, a look-up panel or a generator card (rk) in the queue shifted every later notice onto the wrong entry) */
 const sq0=serQ;serQ=function(opt){if(window.__jqoff)return sq0.apply(this,arguments);const out=[];
  for(const m of Q){if(!m)continue;if(m.pid||!m.opts){const e=serM(m,opt);if(e)out.push(e);continue}const c=jqData(m);if(c){out.push(c);JQ.stat.full++;continue}const e=serM(m,opt);if(e)out.push(e)}return out};
 /* one deserQ pass over the whole list (its old-save clean-up drops repeats across the whole list); the $full cards keep their place */
 const dq0=deserQ;deserQ=function(L){if(window.__jqoff||!(L||[]).some(e=>e&&e.$full))return dq0.apply(this,arguments);const at=[],rest=[];
  (L||[]).forEach((e,i)=>{if(e&&e.$full){try{const c=Object.assign({},e);delete c.$full;delete c.w;c.who=WHO(e.w);at.push([i,c])}catch(x){}}else rest.push([i,e])});
  /* the rest is rebuilt in one call; each rebuilt card is matched back to its entry's index (dq0 may drop entries: lapsed, empty, repeats) */
  const out=[];const built=[];for(const [i,e] of rest){const r=dq0([e]);built.push([i,r])}
  const sig=new Set();const all=at.concat(built.flatMap(([i,r])=>r.map(c=>[i,c]))).sort((a,b)=>a[0]-b[0]);
  for(const [i,c] of all){if(c&&!c.opts&&!c.kit&&!c.pid){const k=JSON.stringify([c.t,c.h,c.cls,c.btn]);if(sig.has(k))continue;sig.add(k)}out.push(c)}return out};
 const sv0=save;save=function(){if(window.__jqoff||!S||quiet||S.dead)return sv0.apply(this,arguments);
  if(Q.some(m=>!jqSaveable(m))){JQ.held=1;JQ.stat.held++;return}JQ.held=0;return sv0.apply(this,arguments)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(JQ.held&&S&&!S.dead&&!quiet&&!Q.some(m=>!jqSaveable(m))){JQ.held=0;JQ.stat.flushed++;save()}}catch(e){}return r};
})();
