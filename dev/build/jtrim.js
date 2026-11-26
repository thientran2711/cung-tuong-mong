/* ================= jtrim: PACE-SPEED safe trim (owner OD 26/11 ~19:10Z (A) «tốc độ game khá chậm»; MAIN 162 ruling 26/11 ~20:12Z:
   «fold zero-choice "Đã rõ" cards into log/news ONLY where the same text already sits in the log; whole family; keep anything with a real
   choice or a stat change shown as a card»). Numbers / switch: BAL.trim (jbalsp.js).
   A card is skipped (never painted, nothing lost) only when ALL hold:
     - it has no choice and no callback: no opts, no onClose / nl / entI / faces, no function on it (a go / then / done hook = something happens);
     - its kind is one of BAL.trim.kind (plain notices and news; never a harm / plot / scene / reward card with its own kind);
     - no stat chip in it (a «+N» / «-N» / «tốn:» / «được:» change shown on the card stays a card);
     - every sentence of its text (the date line when() aside) is already in her log (the newest BAL.trim.look lines), so she can still read
       every word in Nhật ký / the news board.
   One rule for every card of that family (law 11): dev/test/pace-trim.js scans the cards the robot meets and checks each skipped one. */
function trimTxt(h){return String(h||"").replace(/<span class="ld">[^<]*<\/span>/g," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim()}
function trimWhy(m){const B=typeof BAL==="object"&&BAL.trim;if(!B||!B.on||!m||typeof m!=="object"||!S||S.dead)return"off";
 if(m.opts||m.onClose||m.nl||m.entI||m.faces||m.btn)return"choice";
 for(const k in m)if(typeof m[k]==="function")return"hook";
 if(B.kind.indexOf(m.kind||"")<0)return"kind";
 let body=trimTxt(m.h);try{const w=trimTxt(when());if(w)body=body.split(w).join(" ")}catch(e){}
 body=body.replace(/^[\s·,]+/,"").trim();if(!body)return"empty";
 if(/[+\-−]\s?\d|tốn:|được:/i.test(body))return"stat";
 const L=(S.logs||[]).slice(0,B.look).map(trimTxt).join(" ");
 const parts=body.split(/(?<=[.!?…»])\s+/).map(x=>x.replace(/^[\s·]+|[\s·]+$/g,"")).filter(x=>x.length>=B.min);
 if(!parts.length)return"short";
 return parts.every(x=>L.indexOf(x)>=0)?"":"new"}
window.__trimN=0;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){try{while(Q.length&&trimWhy(Q[0])===""){const m=Q.shift();window.__trimN++;(window.__trimL=window.__trimL||[]).push(String(m.t||"").slice(0,40));if(window.__trimL.length>40)window.__trimL.shift()}}catch(e){}return s0.apply(this,arguments)};window.showModal=showModal})();
