/* rare-reach play style «bold» (load after inpage6.js + rare97.js: INP2=rare97.js,rarereach.js,inbold.js; run mode sens; never overrides the glowing rare option): a sensible player who, in a Mệnh truyện beat, takes an option whose card shows
   «Lợi thế +» when one is open (the thread card says Lợi thế adds to the climax) — visible information only; otherwise the sensible pick. */
(function(){const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts&&m.opts.length>1){const L=m.opts.map((o,j)=>[o,j]).filter(([o])=>o&&!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0)&&/Lợi thế \+/.test(JSON.stringify(o)));
  if(L.length&&!(m.opts[i]&&m.opts[i].r97)&&!L.some(([,j])=>j===i))i=L[Math.floor(Math.random()*L.length)][1]}}catch(e){}return c0.call(this,i)}})();
