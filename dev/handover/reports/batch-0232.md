# batch-0232 — go-live batch (builder report)

Builder session_01UV1SzkcNCwgZaSP59sonVH (opus). Coordinators: main s28 (session_01UV1SzkNSYyuEkCJ3Bv1Evj), then s29 (session_01UV1SzjZSZnpbhRqnkyzg7p). START_CTX ≈ 6 % (own estimate; get_session reads 0). Now about 22 %, below START + 25 %.

**FINAL SHA: `bad6d59f9`** on `review/batch-0232` (base = live main 7abaf07ac). Main pushes; the builder did not touch main.

## In (merge order)
| branch | PASS head | merge notes |
|---|---|---|
| review/road-b2-fix-r2 (carries road-onecore + B1 + FX ALIGN alias scan fix) | fba2b5de | clean (FIRST) |
| review/road-b3-fix2-r1 | b837b0d1 | assemble list union (jrd_nc/td/ch then jrd_thd/cnv/jend14); jbalroad both sides kept (36 dup keys = fx+rare pairs, as on each branch); road-option-scan kept B2 (brief); ROAD_MAP both; road-saves takes argv origins or env ROADS |
| review/emotion-acts-3-r1 | 2118d118 | assemble union (jemoact before jseat/jcoopone, those stay LAST) |
| review/diff-remeasure-r1 (r1, not -live: -live conflicts in 6 files) | ebe9ab2d | jbal: main's line kept + BAL.hhTh 55→60 (the only value change); inpage6: both modal hooks |
| review/tut-followups-r1 | 92cce50b | j67: tut-followups story67Wrap kept, `wrap67` kept as an alias (jroad.js calls it at load end, jorigins calls story67Wrap). jroute auto-merged (anDuc + ckL lines both present) |
| review/it-key-guard | 02561fca | LAST of the first list; jweather kept diff-remeasure's gear-wear code. **Family fix on code merged in this batch** (it-key-scan found 8 new unguarded reads: jweather ×5, jrd_cn ×2, jroad ×1): `IT[k].p` → `itm(k).p`, same value for real keys; scan 0 |
| CLAUDE.md GATE ZERO line (main s28, docs only) | — | under the H1 |
| review/fig-feet-crop-2-r1 (main s28 add) | d431dc3d | clean in game code |
| review/scenes-3-r1 (main s29 add, LAST) | 92b6c60f | assemble union (jdemo, jlevel) |

Not in: night-final solo (no PASS sha reached the builder). fig-rank-match-r2-r1 2558a2f1 = NEXT batch (s29).

## Checks on bad6d59f (final)
| check | result |
|---|---|
| quickcheck --runs 5 | **PASS** 225 s · open 1314 ms · old save ok · render 236/238 · tab 290/330 · buổi median 920/815 (mean 829/834) · core gates PASS |
| one-core-guard | PASS 0 fails (inside core gates) |
| coop-e2e vs LIVE Worker | 60/60 |
| it-key-guard.js | PASS (0 thrown, 0 page errors) · it-key-scan 0 |
| oldsave-r1.js (old solo save from live, 755/1180/1366) | 16/16 |
| fig-feet-fam.js 755x1000 + 1180x820 | OK 62 cases, 0 px cut |
| tag-rank-scan.js | OK 49 tags |
| scenes3.js (Fold + iPad) | exit 0, errs [] |
| road-saves (on 0af9fede; later commits do not touch roads) | main save (dtq) PASS; mid-road PASS for all 10 origins tt, dtq, muoi, cn, nc, bd, td, ch, thd, cnv; page errors 0. The «phase-1 frame (td)» case FAILS by design: td now has a full road and so has every origin, so the test has no not-full origin left. Test follow-up (B): drop or retarget that case |

Perf note: the buổi median is noisy on this box (live alone ranged 815–1070 ms median across 5 runs today). Runs on the batch: 1307/967 (one run had a 40 s task), 967/852, 802/827, 920/815. Bisect: road merge 953/1070, + emotion 854/941. Means are level with live; no item is slower.

## LOOK (CDN `img/_review/batch-0232/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-0232`)
- fold-755x1000-home.jpg / ipad-1180x820-home.jpg — her room, 2 figures in the fixed slots, ratio ≈ .79, feet shown, no overlap.
- fold-755x1000-road.jpg / ipad-1180x820-road.jpg — new road choice (thd, Chương 5 «Lời thơ vượt tường cung»), kit option cards, maid figure whole.
- fold-755x1000-ksp.jpg / ipad-1180x820-ksp.jpg — VIỆC Kính sự phòng timed dialog: tag «Thái giám / name», feet shown, «Còn 30 giây» under the question.
Findings (not batch-blocking, for owners):
1. iPad home: the player «Lâm Hải Đường» shares the given name «Hải Đường» with her maid; the header shows «Lâm» then «Cung nữ thân tín Hải Đường», and the stage tag reads «Lâm Cung nữ thân tín…» (cut). Looks like name linking replacing the shared given name inside her own name, plus name generation allowing the clash. Not reproduced quickly; needs the name/link owner.
2. Option chips read «có rủi ro» / «an toàn» / «liều»; «an toàn» and «có rủi ro» are not on the VANPHONG odds ladder (seen before as a kit nit).

## CHANGE line (dev/site/CHANGE.txt, first line)
Thêm các nẻo đời mới cho nhiều xuất thân, nay có cả Con gái thầy đồ nghèo và Cung nữ tuyển vào cung, cùng các kết cục mới: mỗi chương là một lựa chọn có được có mất; tâm trạng nay có lúc bộc phát, vui, giận, buồn đều thành việc làm, cả nàng lẫn người trong cung; độ khó Vừa: ngưỡng lên Hoàng hậu nâng nhẹ cho đúng mức vừa; xuất thân Bá đạo nay cũng có ba chương nhập môn với việc phải tự tay làm; sửa lỗi văng game khi trong rương có món đồ đã mất; hình người trong mọi khung không còn mất chân, trên đầu ghi phẩm/chức rồi tên, không ghi tên nơi làm việc; bị giáng phẩm có cảnh Nội vụ phủ đến thu đồ; học thành tài ghi rõ lối mới mở; biếu quà làm lành được bằng món tự tay làm.
(The foreman's road-b3 line said «Thế gia và Con nhà võ»; the game's names for thd/cnv are «Con gái thầy đồ nghèo» / «Cung nữ tuyển vào cung», used here.)

## Next (builder handover, 04:10Z)
- coop-thin-a: READY 64c39ca28 on review/coop-thin-a-live (live bad6d59f + b95a56e3 alone). Gates: Worker npm test thin ALL OK (not deployed), coop-e2e LIVE 60/60, coop-thin-a.js 19/19, quickcheck vs bad6d59f PASS. Shots img/_review/coop-thin-a/ (wipe after verdict). Main deploys the Worker after the client push.
- Finding: cnv maid life, mistress tag (rank + name) pushed below the stage and cut when the green state chip shows (Fold + iPad); origin of the fault not confirmed.
- Context ~27 % → this builder stops here. Next small batch (save-dlg-fix-r1 711d018 + fig-rank-match-r2-r1 2558a2f1) needs a fresh builder opened by main.

## shots.js used (not committed elsewhere; run: node shots.js <file:// url of index.html> <outdir> <origin key>)
```js
const {chromium}=require('playwright');const [,,URL,OUT,K]=process.argv;
(async()=>{const b=await chromium.launch();
for(const [nm,W,H] of [['fold-755x1000',755,1000],['ipad-1180x820',1180,820]]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
const clr=async()=>{for(let i=0;i<12;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();const gb=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/^Chạm để mở$/.test((e.textContent||'').trim())&&e.offsetParent!==null);if(gb){gb.click();return 1}const bs=[...document.querySelectorAll('button')].filter(b=>/^Tiếp theo$/.test(b.textContent.trim())&&b.offsetParent!==null&&!b.closest('#modal'));if(bs.length){bs[0].click();return 1}const x=[...document.querySelectorAll('button')].filter(b=>/^[✕×]$/.test(b.textContent.trim())&&b.offsetParent!==null&&!b.closest('#modal'));if(x.length){x[0].click();return 1}return 0});if(!n)break;await p.waitForTimeout(2500)}};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const info=await p.evaluate(async([k])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
  window.__bot={pre:1};SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
  await new Promise(r=>{let n=0;const t=()=>{if((S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
  const isRd=A=>A&&ARC67[A.a]&&ARC67[A.a].o==="rd";let m=0;
  for(;m<60;m++){const A=S.st&&S.st.M;if(isRd(A)&&A.nb&&!A.cur&&(ARC67[A.a].rn||0)>=5)break;
   const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){Q.length=0;used=0;nextBuoi()}
   const B=S.st&&S.st.M;if(B&&!B.done&&!B.cur&&B.nb){B.due=0;fireBeat67(B)}if(B&&B.cur){const bd=beatDef67(B,B.cur);const O=opts67(B,bd);res67(thKey67(B),B.cur,0,O[0]&&O[0].o!=null?oOf67(B,O[0],bd):100)}
   if(S.st&&S.st.ms&&typeof msDone67==='function'){S.st.ms.t0=-99}}
  Q.length=0;closeModal&&closeModal();render();const A=S.st.M;return{m,a:A&&A.a,rn:A&&ARC67[A.a]&&ARC67[A.a].rn,rank:S.rank}},[K]);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove()});await p.waitForTimeout(4000);await clr();await p.waitForTimeout(5000);await clr();await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove()});await p.screenshot({path:`${OUT}/${nm}-home.jpg`,type:'jpeg',quality:80});
 const r2=await p.evaluate(()=>{const A=S.st.M;A.due=0;fireBeat67(A);try{if(Q.length&&typeof showModal==='function')showModal()}catch(e){return 'err '+e.message}return{q:Q.length,cur:A.cur,modal:!document.getElementById('modal').hidden,t:(Q[0]&&(Q[0].t||'')+'').slice(0,80)}});
 await p.waitForTimeout(3000);await clr();await p.waitForTimeout(3000);await p.screenshot({path:`${OUT}/${nm}-road.jpg`,type:'jpeg',quality:80});
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const nop=()=>{};const o=[{n:"Tranh sủng",fx:{},x:"Khá chắc · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -3",go:nop},{n:"Chặn ngự giá",fx:{},x:"Năm ăn năm thua · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -5",go:nop},{n:"Thôi",fx:{},go:nop}];
  Q.push({t:"Kính sự phòng",h:`<p>Tối nay thẻ bài của Quý phi được lật. Ngươi có ra tay giành đêm nay không?</p><p class="nfcd">${kitCoopClock({left:30000,len:30000})}</p>`,opts:o,who:pEunCourt("ksp"),pid:"nfch"});showModal()});
 await p.waitForTimeout(2000);await clr();await p.evaluate(()=>{if(document.getElementById('modal').hidden)showModal()});await p.waitForTimeout(3000);await p.screenshot({path:`${OUT}/${nm}-ksp.jpg`,type:'jpeg',quality:80});
 console.log(nm,JSON.stringify(info),JSON.stringify(r2),'errors',errs.length,JSON.stringify(errs.slice(0,3)));await ctx.close()}
await b.close()})();
```
