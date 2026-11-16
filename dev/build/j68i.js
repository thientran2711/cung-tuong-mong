/* ================= j68i: grounded promotions and a clean week summary (owner 11/14) =================
   Every promotion states the real conditions that triggered it, with numbers (same for her and every NPC):
   the ordinary decree (Sủng/Danh/gap/Hoàng hậu/Thái hậu rows), the Emperor's pick between several qualified (fillSeats), the Tranh ghế win, a son's birth.
   Week summary: each sentence goes under exactly one heading (first match wins), reasons stay with their decree; no item is cut. Data only; the renderer is unchanged. */
function rsn6(rows){return rows.map(r=>String(r[1]).replace(/\s*\(.*\)\s*/,"").replace(/^Cách lần sắc phong trước /,"cách lần trước ").replace(/, vì Hoàng thượng hiếu thảo/,"").replace(/^Hoàng hậu không phản đối.*/,"Hoàng hậu không phản đối hoặc có người đỡ")).join(" · ")}
(function(){const p0=promoteP;promoteP=function(p){let rows=[];try{rows=promoReqP(p)}catch(e){}const n=window.__fill6||0;const r=p0.apply(this,arguments);
 try{if(r&&/tấn phong|lập .*Hoàng hậu/.test(r)){const why=window.__seatPick?"thắng cuộc Tranh ghế":n>=2?`Hoàng thượng chọn giữa ${n} người đủ điều kiện`:"";
  const add=` Lý do: ${[rsn6(rows.filter(x=>x[0])),why].filter(Boolean).join(" · ")}.`;return r.replace(/\s*$/,"")+add+" "}}catch(e){}return r}})();
(function(){if(typeof fillSeats!=="function")return;const f0=fillSeats;fillSeats=function(){window.__fill6=0;try{for(const r of [6,5,4,3]){if(!seatFree(r))continue;const C=consorts().filter(p=>rkOf(p)===r-1&&!p.out&&!p.confined&&promoReqP(p).every(x=>x[0]));if(C.length>=2){window.__fill6=C.length;break}}}catch(e){}
 try{return f0.apply(this,arguments)}finally{window.__fill6=0}}})();
(function(){if(typeof birthP!=="function")return;const b0=birthP;birthP=function(p){const r=b0.apply(this,arguments);try{if(typeof r==="string")return r.replace(/((?:Được|[^.]* được) tấn phong [^.]+)\. /,"$1. Lý do: sinh hạ hoàng tử đầu lòng (thăng một bậc, không qua khảo hạch). ")}catch(e){}return r}})();
(function(){if(typeof wkSummary!=="function")return;wkSummary=function(){const s=S.wkSnap||wkSnap();const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(s.seq||0)));
 const L0=S.logs.slice(0,n).map(plain).filter(x=>x&&!/^Xin xăm|^Gieo lại|^Đến /.test(x));const SEN=[];
 for(const x of L0)for(const t of x.split(kRx("(?<=[.!?])\\s+",""))){const u=t.trim();if(!u)continue;if(/^Lý do:/.test(u)&&SEN.length){SEN[SEN.length-1].why=u;continue}if(!SEN.some(o=>o.t===u))SEN.push({t:u})}
 const H=[["Thăng giáng",/tấn phong|sắc phong|được phong|lập .* Hoàng hậu|bị giáng|bị phế|lãnh cung|cấm túc/i,4],["Sinh tử",/sinh hạ|sinh đôi|băng hà|qua đời|chết|sảy thai|khó sinh/i,3],
  ["Kẻ nhắm vào ngươi",/ngươi.*(bị|trúng)|định .*(ngươi|của ngươi)|tố giác ngươi|vu .*ngươi|nhắm vào ngươi/i,3],["Ban thưởng, đồ vật",/ban thưởng|ban cho|nhận được|được tặng|mua /i,2]];
 const groups=H.map(h=>[h[0],[]]);const other=[];
 for(const o of SEN){const i=H.findIndex(h=>h[1].test(o.t));const tgt=i>=0?groups[i][1]:other;const cap=i>=0?H[i][2]:3;if(tgt.length>=cap*2)continue;tgt.push(o.t);if(o.why){const parts=o.why.replace(/^Lý do:\s*/,"").replace(/\.$/,"").split(" · ");let cur="";const out=[];for(const q of parts){if(cur&&(cur+" · "+q).length>92){out.push(cur);cur=q}else cur=cur?cur+" · "+q:q}if(cur)out.push(cur);out.forEach((q,j)=>tgt.push((j?"Lý do (tiếp): ":"Lý do: ")+q+"."))}}
 if(other.length)groups.push(["Chuyện khác",other.slice(0,4)]);
 const D=[["Sủng",S.sung-s.sung],["Danh",S.danh-s.danh],["Sức",S.suc-s.suc],["Bạc",S.bac-s.bac]];
 return{D,groups,rank:S.rank!==s.rank?(S.rank>s.rank?"Được thăng ":"Bị giáng xuống ")+(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):"",kids:S.kids.length-s.kids}}})();
