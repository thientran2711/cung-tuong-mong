/* poison trace for runb.js (env INP2=inx.js,inpz.js, after inx.js): every poison aimed at her (Sức before/after, landed?, called from rivalsTurn?),
   her Sức at each endTurn entry (histogram by 10s), and how often a tuần starts with her Sức at 0 (the regen +4 then saves her). Stored in x.ix.pz. */
(function(){const Z=()=>({ev:[],sh:{},z0:0});const nx=()=>{const i=window.__ix;if(!i.pz)i.pz=Z();return i.pz};
 const P=ACT.poison,f0=P.f;P.f=function(a,t){if(t!==S)return f0.apply(this,arguments);const s0=S.suc;const st=String(new Error().stack).split("\n").slice(2,9).map(x=>x.trim().split(" ")[1]).join(">");
  const r=f0.apply(this,arguments);try{nx().ev.push({s0,s1:S.suc,dead:!!S.dead,hit:/Ngươi trúng độc/.test(String(r)),anti:/thuốc giải/.test(String(r)),st:st.slice(0,120)})}catch(e){}return r};
 const e0=endTurn;endTurn=function(){try{if(S&&!S.dead&&!S.srv&&!Q.length&&!S.mg){const z=nx();const b=Math.floor((S.suc||0)/10)*10;z.sh[b]=(z.sh[b]||0)+1;if(S.suc<=0)z.z0++}}catch(e){}return e0.apply(this,arguments)};
})();
