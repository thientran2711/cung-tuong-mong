/* TEMPER-OUTBURST G4 arm module for the REAL-TAP robot (dev/test/robot-rt.js via temper-hh-rt.js). Pre-life setup only (no taps):
   arm = window.__tArm: hot / even / timid = her nết forced to Kiêu ngạo / none / Khiêm nhường (other two slots neutral, same as intemper.js);
   off = hot with NO outburst at all (jemoact __eaOff + jfeel act odds 0). Records window.__tp = {arm, temper, maxRank, choice, out}
   (choice = her outburst choice frames, answered by the robot's own taps; out = her outbursts by reaction). */
(function(){if(window.__tpOn)return;window.__tpOn=1;const A=window.__tArm||"hot";const NET={hot:"Kiêu ngạo",timid:"Khiêm nhường",even:null,off:"Kiêu ngạo"};
 if(A==="off"){window.__eaOff=1;try{BAL.feel.act.o=0}catch(e){}}
 const T=window.__tp={arm:A,temper:"",maxRank:0,choice:0,out:{}};
 const setNet=()=>{try{if(!S||S.dead)return;if(S.__tArm!==A){S.__tArm=A;const n=NET[A];const q=["Điềm tĩnh","Thanh liêm","Ham học"];if(n)q[{tt:0,ld:1,ch:2}[BAL.net.T[n].g]]=n;S.net=q}
  if(T.y0==null)T.y0=S.year;T.year=S.year;T.maxRank=Math.max(T.maxRank,S.rank||0);try{T.temper=eaTemper(S).k}catch(e){}const N=window.EA_N||{};T.choice=N.choice||0;T.out=Object.assign({},N.out||{})}catch(e){}};
 const e0=endTurn;endTurn=function(){setNet();try{return e0.apply(this,arguments)}finally{setNet()}};})();
