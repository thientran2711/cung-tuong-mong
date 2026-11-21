/* ================= joptsg: law 4 on OPTION lines (K-OPT-SG; rv-kit-opt-kem.md follow-up, MAIN 92) =================
   Her own Sủng change in an option's LITERAL x text («thành: Sủng +4», «hỏng: Sủng ${balSg(..)}») is drawn the way apply() really
   changes it: through sg() (Hoàng thượng nóng nảy ×1.3, lạnh lùng ×0.7 on gains) — the same rewrite jaudit item 15 does for act cards.
   Only the x text is rewritten (fmt(w)/fmt(fx) already goes through sg; never twice). A Sủng written after a word (a name, «nàng»)
   is someone else's and stays as written; only a Sủng that starts a clause (start, after «·», «,», «:», «;», «(») is hers.
   Every such option applies through apply()/ap(S,…) → sg (scan in reports/kit-keeper-2.md). Test: dev/test/kit-opt-sg.js. */
(function(){try{
 const RE=/(^|[·,:;(]\s*)(Sủng(?: ngươi| ta)?) ([+\-−])(\d+)/gu;
 function optSgTxt(x){if(typeof x!=="string"||typeof sg!=="function"||!/Sủng/.test(x))return x;
  return x.replace(RE,(m,p,l,g,n)=>{const v=sg((g==="+"?1:-1)*+n);return `${p}${l} ${v>0?"+":"-"}${Math.abs(v)}`})}
 window.optSgTxt=optSgTxt;
 const wrap=f=>function(o){if(!o||typeof o.x!=="string"||!/Sủng/.test(o.x))return f.apply(this,arguments);
  const x0=o.x,x1=optSgTxt(x0);if(x1===x0)return f.apply(this,arguments);
  let own=Object.prototype.hasOwnProperty.call(o,"x");try{o.x=x1;return f.apply(this,arguments)}finally{if(own)o.x=x0;else delete o.x}};
 if(typeof optLine==="function")optLine=wrap(optLine);
 if(typeof dilLine==="function")dilLine=wrap(dilLine);
}catch(e){console.warn("joptsg",e)}})();
