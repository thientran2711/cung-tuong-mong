/* balance-2 r2 (D11): act-card ledger + art/stat path for the sens bot (INPX=inb2r2.js). Read-only hooks.
   x.r2.c["<card name>"] = [tries, wins, Σ shown odds, Σ Danh change, Σ Sủng change]  (her deck cards via runOpt; win = the first roll inside runOpt)
   x.r2.m[month] = [Sắc, Tài, Danh, best art bậc, vu, cam, thi, ky, y, hoa] at months 6/12/24/36/60. */
(function(){const Z=()=>({c:{},m:{}});window.__r2=Z();
 const R0=window.__res;if(R0&&!R0.__r2){const p0=R0.push;R0.push=function(x){try{x.r2=window.__r2}catch(e){}window.__r2=Z();return p0.apply(this,arguments)};R0.__r2=1}
 let cap=null;const r0=roll;roll=function(o){const v=r0.apply(this,arguments);if(cap&&cap.w==null)cap.w=v?1:0;return v};
 const o0=runOpt;runOpt=function(a){let b=null;try{if(a&&a.n&&S&&!S.srv)b={d:S.danh,s:S.sung}}catch(e){}cap={w:null};let r;try{r=o0.apply(this,arguments)}finally{const c=cap;cap=null;
  try{if(b&&r!==null){const k=String(a.n).replace(/\d+/g,"#").slice(0,40);const x=window.__r2.c[k]=window.__r2.c[k]||[0,0,0,0,0];x[0]++;x[1]+=c.w==null?1:c.w;x[2]+=a.o==null?100:Math.min(100,+a.o||0);x[3]+=S.danh-b.d;x[4]+=S.sung-b.s}}catch(e){}}return r};
 const DM=[6,12,24,36,60];const nb=nextBuoi;nextBuoi=function(){try{if(S&&!S.dead&&!S.srv&&DM.includes(S.turn)&&!window.__r2.m[S.turn]){const A=S.arts||{};window.__r2.m[S.turn]=[S.sac,S.tai,S.danh,Math.max(...Object.values(A).map(v=>+v||0)),A.vu|0,A.cam|0,A.thi|0,A.ky|0,A.y|0,A.hoa|0]}}catch(e){}return nb.apply(this,arguments)};
})();
