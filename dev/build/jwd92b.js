/* ================= jwd92b: NPCs really use the wardrobe moves (balance pass, two-way rules) =================
   Measured with the bot: before this, NPCs never impeached (ACT.vp was not in any NPC menu) and the giá họa only came from
   the scheme menu at danger band 2+, so "định giá họa" talk was seen but a plant almost never landed.
   - Hặc ăn mặc sai phẩm (vp): an NPC who has a real cause (wdCause: heard a remark / her tai mắt saw it) and a motive
     (hostility 30+ or ghen 50+) may choose it, like any scheme; the same act and odds she uses.
   - Giá họa (giahoa): each month a malicious NPC (malice >= WD.frameMalice) with a strong grudge (hostility >= WD.frameHost)
     against someone may plant on her/him with WD.frameP % (the knob j92 declared but never read). Same wdFrame for every target. */
(function(){if(typeof mindMenu!=="function"||!ACT.vp)return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);
 try{if(Array.isArray(O)&&v&&v!==S&&t&&ACT.vp.ok(v,t)){const h=hostility(v,t),g=ghenOf(v,t);if(h>=50||g>=70)O.push(["vp",(.4+h/100+g/150)*persW(v,"vp")])}}catch(e){}return O}})();
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);let add="";
 try{if(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())){const T=[S].concat(liveRivals(true)).filter(p=>p===S||(p.alive&&!p.out));
  for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined||(v.malice||0)<WD.frameMalice)continue;
   const L=T.filter(t=>t!==v&&hostility(v,t)>=WD.frameHost&&ACT.giahoa.ok(v,t));if(!L.length||!roll(WD.frameP))continue;
   const t=L.sort((a,b)=>hostility(v,b)-hostility(v,a))[0];const x=wdFrame(v,t);if(x){add+=x;try{log(x)}catch(e){}}if(S.dead)break}}}catch(e){console.error(e)}
 return (r||"")+add}})();
/* pacing (measured: without it an angry palace impeached her ~140 times a life). Same for every accuser and every target:
   an accuser waits WD.vpCdA tuần between impeachments and WD.frCdA between frame-ups; a target is not impeached again within
   WD.vpCdT tuần nor framed again within WD.frCdT. */
Object.assign(WD,{vpCdA:48,vpCdT:72,frCdA:108,frCdT:108});
(function(){const cd=(o,k,n)=>o&&o[k]!=null&&wk()-o[k]<n;
 const V=ACT.vp,v0=V.ok,vf=V.f;V.ok=function(a,t){if(cd(a,"vpA92",WD.vpCdA)||cd(t,"vpT92",WD.vpCdT))return false;return v0.apply(this,arguments)};
 V.f=function(a,t){if(cd(a,"vpA92",WD.vpCdA)||cd(t,"vpT92",WD.vpCdT))return "";return vf.apply(this,arguments)};
 const G=ACT.giahoa,g0=G.ok,gf=G.f;G.ok=function(a,t){if(cd(a,"frA92",WD.frCdA)||cd(t,"frT92",WD.frCdT))return false;return g0.apply(this,arguments)};
 G.f=function(a,t){if(cd(a,"frA92",WD.frCdA)||cd(t,"frT92",WD.frCdT))return "";return gf.apply(this,arguments)};
 const w0=wdFrame;wdFrame=function(a,t){if(a!==S&&(cd(a,"frA92",WD.frCdA)||cd(t,"frT92",WD.frCdT)))return "";try{a.frA92=wk();t.frT92=wk()}catch(e){}return w0.apply(this,arguments)};
 const a0=wdAccuse;wdAccuse=function(a,t){if(a!==S&&(cd(a,"vpA92",WD.vpCdA)||cd(t,"vpT92",WD.vpCdT)))return "";try{a.vpA92=wk();t.vpT92=wk()}catch(e){}return a0.apply(this,arguments)}})();
