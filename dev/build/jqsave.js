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
 const sq0=serQ;serQ=function(){if(window.__jqoff)return sq0.apply(this,arguments);const out=[];const base=sq0.apply(this,arguments);let bi=0;
  /* keep the old entries for what the old serQ kept, add the data-only choice cards in their place in the queue */
  for(const m of Q){if(m.pid||!m.opts){out.push(base[bi++]);continue}const c=jqData(m);if(c){out.push(c);JQ.stat.full++}}return out.filter(Boolean)};
 const dq0=deserQ;deserQ=function(L){if(window.__jqoff||!(L||[]).some(e=>e&&e.$full))return dq0.apply(this,arguments);const out=[];
  for(const e of L||[]){if(e&&e.$full){try{const c=Object.assign({},e);delete c.$full;delete c.w;c.who=WHO(e.w);out.push(c)}catch(x){}}else out.push(...dq0([e]))}return out};
 const sv0=save;save=function(){if(window.__jqoff||!S||quiet||S.dead)return sv0.apply(this,arguments);
  if(Q.some(m=>!jqSaveable(m))){JQ.held=1;JQ.stat.held++;return}JQ.held=0;return sv0.apply(this,arguments)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(JQ.held&&S&&!S.dead&&!quiet&&!Q.some(m=>!jqSaveable(m))){JQ.held=0;JQ.stat.flushed++;save()}}catch(e){}return r};
})();
