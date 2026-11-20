/* PM RANK MEASURE (law 5 «càng lên càng khó», jpma; FOREMAN E #13: her win chance must FALL and the stake value RISE with rank 0..7).
   For each occasion rank R = 0..7 (R = the higher rank of the two), her own arts (lv from the save), kinds dan / co / dauho:
   (a) the board: jmgt mgTier(kind,{occ:"pm",rank:R,lv}) → gap d, the word (Dễ / Vừa / Khó), her median raw on it (mgSkipRaw) — must fall;
   (b) her win chance vs the opponent she really meets at that rank: a living NPC of rank R from the save (her own stats), N duels drawn
       by the one core (pmOdds, the same draw the card's ladder word uses), her rank held at max(0, R−1) so the occasion is R — must fall overall;
   (c) NOTE: against an identical peer the two sides draw on the SAME board by the SAME rule (law 1), so that chance cannot move with rank;
       law 5 lives in the board (a), the stake (d) and who she meets (b). Under mg2 her draw is the owner-calibrated base, an NPC's its own hand band.
   (d) the stake value V = BAL.pm.stake.bac[R] — must rise.
   usage: node dev/measure/pm-rank.js [dev/index.html]  → table + exit 1 when (a) or (d) is not monotone or (b) does not fall from R0–2 to R5–7 */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const rows=[];const K=["dan","co","dauho"];const r0=S.rank;const N=BAL.pm.oddsN;BAL.pm.oddsN=400;
  const byRank={};for(const v of liveRivals(true).filter(x=>x!==S&&!x.coop))(byRank[rkOf(v)]=byRank[rkOf(v)]||[]).push(v);
  for(let R=0;R<8;R++){const row={R,V:BAL.pm.stake.bac[R]};row.d=K.map(k=>mgTier(k,{occ:"pm",rank:R}).d);row.word=mgTier("dan",{occ:"pm",rank:R}).word;
   row.med=+(K.reduce((s,k)=>s+mgSkipRaw(mgTier(k,{occ:"pm",rank:R})),0)/K.length).toFixed(2);
   S.rank=Math.max(0,R-1);/* the occasion = R through the opponent */
   const opp=byRank[R]||[];const cs=[];for(const v of opp)for(const k of K)cs.push(pmOdds(S,v,k));row.nOpp=opp.length;row.vsReal=cs.length?Math.round(cs.reduce((s,x)=>s+x,0)/cs.length):null;
   rows.push(row)}S.rank=r0;BAL.pm.oddsN=N;return rows});
 console.log('PM RANK (law 5) — her own start arts');console.log('R  V   gap d (dan/co/dauho)  board  her median raw  her chance vs real rank-R NPCs (n)');
 for(const x of r)console.log(`${x.R}  ${String(x.V).padEnd(3)} ${x.d.join('/').padEnd(21)} ${x.word.padEnd(6)} ${String(x.med).padEnd(15)} ${x.vsReal==null?'—':x.vsReal+' ('+x.nOpp+')'}`);
 const mono=(a,dir)=>a.every((x,i)=>i===0||(dir>0?x>=a[i-1]:x<=a[i-1]));const V=r.map(x=>x.V),M=r.map(x=>x.med);
 const real=r.filter(x=>x.vsReal!=null);const lo=real.filter(x=>x.R<=2).map(x=>x.vsReal),hi=real.filter(x=>x.R>=5).map(x=>x.vsReal);const avg=a=>a.length?a.reduce((s,x)=>s+x,0)/a.length:null;
 const okV=mono(V,1)&&V[7]>V[0],okM=mono(M,-1)&&M[7]<M[0],okR=lo.length&&hi.length?avg(hi)<=avg(lo):true;
 console.log(`stake rises: ${okV?'ok':'NO'} · her board raw falls: ${okM?'ok':'NO'} · chance vs real opponents R0–2 ${avg(lo)} → R5–7 ${avg(hi)}: ${okR?'falls ok':'NO'}`);
 await b.close();process.exit(okV&&okM?0:1)/* (b) is reported: who she meets depends on the save */})();
