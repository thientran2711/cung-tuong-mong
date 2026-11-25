/* TEMPER-OUTBURST G4 arm module for the REAL-TAP robot (dev/test/robot-rt.js via temper-hh-rt.js). Pre-life setup only (no taps):
   arm = window.__tArm: hot / even / timid = her nết forced to Kiêu ngạo / none / Khiêm nhường (other two slots neutral, same as intemper.js);
   off = hot with NO outburst at all (jemoact __eaOff + jfeel act odds 0). Records window.__tp = {arm, temper, maxRank, choice, out, y0, year, rank,
   danh, sung, coldPalace} (choice = her outburst choice frames answered by the robot's own taps; out = her outbursts by reaction).
   The counters live in the save (S.__tp) so a resumed life (robot-rt resume=1) keeps counting from where it was. */
(function(){if(window.__tpOn)return;window.__tpOn=1;const A=window.__tArm||"hot";const NET={hot:"Kiêu ngạo",timid:"Khiêm nhường",even:null,off:"Kiêu ngạo"};
 if(A==="off"){window.__eaOff=1;try{BAL.feel.act.o=0}catch(e){}}
 const T=window.__tp={arm:A,temper:"",maxRank:0,choice:0,out:{}};let B=null;
 const setNet=()=>{try{if(!S||S.dead&&!B)return;if(!B){const o=S.__tp||{};B={choice:o.choice||0,out:Object.assign({},o.out||{}),maxRank:o.maxRank||0,y0:o.y0}}
  if(S.__tArm!==A){S.__tArm=A;const n=NET[A];const q=["Điềm tĩnh","Thanh liêm","Ham học"];if(n)q[{tt:0,ld:1,ch:2}[BAL.net.T[n].g]]=n;S.net=q}
  if(T.y0==null)T.y0=B.y0!=null?B.y0:S.year;T.year=S.year;T.rank=S.rank;T.danh=S.danh;T.sung=S.sung;T.coldPalace=!!S.out;T.maxRank=Math.max(B.maxRank,T.maxRank,S.rank||0);try{T.temper=eaTemper(S).k}catch(e){}
  const N=window.EA_N||{};T.choice=B.choice+(N.choice||0);const o=Object.assign({},B.out);for(const[k,v]of Object.entries(N.out||{}))o[k]=(o[k]||0)+v;T.out=o;
  S.__tp={choice:T.choice,out:T.out,maxRank:T.maxRank,y0:T.y0}}catch(e){}};
 window.__tpSet=setNet;
 const e0=endTurn;endTurn=function(){setNet();try{return e0.apply(this,arguments)}finally{setNet()}};})();
