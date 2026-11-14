/* ================= jwd92b: NPCs really use the wardrobe moves (balance pass, two-way rules) =================
   Measured with the bot: before this, NPCs never impeached (ACT.vp was not in any NPC menu) and the giá họa only came from
   the scheme menu at danger band 2+, so "định giá họa" talk was seen but a plant almost never landed.
   - Hặc ăn mặc sai phẩm (vp): an NPC who has a real cause (wdCause: heard a remark / her tai mắt saw it) and a motive
     (hostility 30+ or ghen 50+) may choose it, like any scheme; the same act and odds she uses.
   - Giá họa (giahoa): each month a malicious NPC (malice >= WD.frameMalice) with a strong grudge (hostility >= WD.frameHost)
     against someone may plant on her/him with WD.frameP % (the knob j92 declared but never read). Same wdFrame for every target. */
(function(){if(typeof mindMenu!=="function"||!ACT.vp)return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);
 try{if(Array.isArray(O)&&v&&v!==S&&t&&ACT.vp.ok(v,t)){const h=hostility(v,t),g=v.ghen||0;if(h>=30||g>=50)O.push(["vp",(1+h/40+g/60)*persW(v,"vp")])}}catch(e){}return O}})();
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);let add="";
 try{if(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())){const T=[S].concat(liveRivals(true)).filter(p=>p===S||(p.alive&&!p.out));
  for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined||(v.malice||0)<WD.frameMalice)continue;
   const L=T.filter(t=>t!==v&&hostility(v,t)>=WD.frameHost&&ACT.giahoa.ok(v,t));if(!L.length||!roll(WD.frameP))continue;
   const t=L.sort((a,b)=>hostility(v,b)-hostility(v,a))[0];const x=wdFrame(v,t);if(x){add+=x;try{log(x)}catch(e){}}if(S.dead)break}}}catch(e){console.error(e)}
 return (r||"")+add}})();
