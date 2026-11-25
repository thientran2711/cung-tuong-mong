/* TEMPER-OUTBURST never-blocks-Hoàng-hậu arms (temper-design (e) G4) — runb.js INP2 module. Arm = window.__tArm (set by temper-hh.js via XJS):
   hot / even / timid = her nết forced to Kiêu ngạo / none / Khiêm nhường each life (the other two slots neutral); off = hot with NO outburst at all
   (jemoact __eaOff + jfeel act odds 0). Adds to each life record: tp = {arm, temper, choice (her choice frames; bot: auto-picked), out (her outbursts by reaction)}. */
(function(){const A=window.__tArm||"hot";const NET={hot:"Kiêu ngạo",timid:"Khiêm nhường",even:null,off:"Kiêu ngạo"};
 if(A==="off"){window.__eaOff=1;try{BAL.feel.act.o=0}catch(e){}}
 const setNet=()=>{try{if(!S||S.dead||S.__tArm===A)return;S.__tArm=A;const n=NET[A];const q=["Điềm tĩnh","Thanh liêm","Ham học"];if(n)q[{tt:0,ld:1,ch:2}[BAL.net.T[n].g]]=n;S.net=q}catch(e){}};
 const e0=endTurn;endTurn=function(){setNet();return e0.apply(this,arguments)};
 const R0=window.__res;const p0=R0.push;R0.push=function(x){try{const N=window.EA_N||{};x.tp={arm:A,temper:(()=>{try{return eaTemper(S).k}catch(e){return""}})(),choice:N.choice||0,out:Object.assign({},N.out||{})};N.choice=0;N.out={}}catch(e){}return p0.apply(this,arguments)};})();
