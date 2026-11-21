/* jmgx — GAP MG11 · THE MINI-GAMES OUTSIDE KG82_KIND JOIN «THỬ TAY» (owner OD 20/11 ~08:40Z scan, ~08:45Z makeup held; ORDER MAIN ROOT-79 16:25Z:
   "put the mini-games outside KG82_KIND (mưu kế boards, real Cờ j5 gKy, jkc2 envoy chess, pet care, plant care) into Thử tay so they feed hand b like the other kinds").
   ★ 18 LAWS (dev/rules/START_CORE.md). Numbers: BAL.mgTier.lev.<kind> (jbal2.js) only. Scan table + reasons: dev/handover/reports/mg11-thutay.md.
   WHAT: seven SKILL boards that lived outside KG82_KIND become kinds, so jmgcal mgCalKinds() lists them (rules screen kgReady + «Hướng dẫn» + kit ✕, 5 rounds d −2…+2)
   and every real play of them goes through the ONE result path of the kinds (jmgid mgIdRes: graded, her rolling hand b learns it, identity offset):
     nghe / truyen / mac / thoico — the scheme boards (jsgame sgNghe / sgTruyen / sgMac / sgThoiCo; live: sgEng → mgPlayLv, sgPlay finish → mgPlayRes)
     thu_tam / thu_choi          — the pet care skill games (jpetcare petcStrokeEng / petcBallEng; live: petcBath / petcPlay)
     tuoi                        — the plant care game (jshelf shelfWaterGame; live: «Tưới, tỉa lá»)
   NOT kinds (reasons in the report): Cho ăn (knowledge pick, no hand) · j5 gKy (dead, shadowed by kind co = the real Cờ, already in Thử tay) ·
   jkc2 «Đánh cờ với sứ thần» (an odds deck card, no board: it IS Cờ, kind co) · Điểm trang (owner OD L2036: waits for the faces).
   TWO-WAY (law 1): no NPC plays any of these boards (schemes: NPCs run plain odds, owner 11/15; pets / plants: NPC care is data, BAL.pet.npcCare / shelf.npc.care),
   so no NPC hand path changes; the NPC hand curve of these kinds is the default band (BAL.ag.mg2.hand ctr "") until her Thử tay code lands.
   No kg82 talent formula (KG82_F): no art backs these boards → identity class "" and art lv 0 (the board eases only by rank, law 5). */
(function(){try{
/* ---- the ONE live-play path of a board played outside kg82Play (the same steps kg82Play end takes) ---- */
/* the board ease of a real play: the hoc tier of this kind for her (rank + art lv, law 5) — sets KG82.tier so mgIdRes reads the same board gap */
function mgPlayLv(kind){try{return mgSet(kind,{occ:"hoc"}).ease}catch(e){return BAL.mgTier.mid}}
/* an env for an engine played outside kg82Play: kind, ease, no HUD frame, end once with the raw 0..10 */
function mgPlayEnv(kind,onEnd,more){let done=false;return Object.assign({kind,lv:mgPlayLv(kind),hud:()=>{},end:raw=>{if(done)return;done=true;onEnd(cl(+raw||0,0,10))}},more||{})}
/* her raw play → the result: graded (mgGrade) → identity offset + her hand b learns (mgIdRes); the same as kg82Play end */
function mgPlayRes(kind,raw){const g=mgGrade(raw,kind);try{return typeof mgIdRes==="function"?mgIdRes(kind,g):g}catch(e){return g}}
/* review r1 (BIG review MG11): a SCHEME board (nghe / truyen / mac / thoico) feeds her hand b the same way, but the odds step reads the GRADED play,
   not the recentred result: these kinds have no art behind them → identity class "" → owner OD 20/11 ~08:30Z "ordinary arts ±0". With gap 0 the offset
   tgt[""] − b only recentres every hand to tgt[""] = 7.5 ≥ BAL.cut.sgStep.up, so «Tự ra tay» would lift the odds one step on almost every play whatever
   her hand, while «Giao cho người làm» keeps them (law 2 equal value; regression of the acts' odds). b still learns (mgIdRes); the kit row is not shown. */
function mgPlayLearn(kind,raw){const g=mgGrade(raw,kind);try{if(typeof mgIdRes==="function")mgIdRes(kind,g)}catch(e){}KG82.idNote=null;return g}
/* the board time of a scheme round in whole seconds (the card line «tự chơi 3 hồi, mỗi hồi N giây» reads it; pure: mgTier, no KG82 side effect) */
function mgPlaySec(kind,name){try{const v=mgLev({lv:mgTier(kind,{occ:"hoc"}).ease},kind,name);return v==null?null:Math.round(v/1000)}catch(e){return null}}
Object.assign(window,{mgPlayLv,mgPlayEnv,mgPlayRes,mgPlayLearn,mgPlaySec});
if(typeof KG82_KIND==="undefined"||typeof KG82_ENG==="undefined")return;
/* ---- the kinds (n name, t subtitle, how = the same rule text the live screen shows) ---- */
const sgK=g=>{try{return Object.values(SG.K).find(x=>x&&x.g===g)||null}catch(e){return null}};
const SGX=[["nghe","Nghe ngóng","Nghe lời thật",typeof sgNghe==="function"?sgNghe:null],["truyen","Truyền lời","Chọn người truyền tin",typeof sgTruyen==="function"?sgTruyen:null],
 ["mac","Mặc cả","Ngỏ giá vừa đủ",typeof sgMac==="function"?sgMac:null],["thoico","Thời cơ","Ra tay đúng lúc",typeof sgThoiCo==="function"?sgThoiCo:null]];
for(const [k,n,t,f] of SGX){const G=sgK(k);if(!f||!G||KG82_KIND[k])continue;
 KG82_ENG["sg_"+k]=(box,env)=>f(box,Object.assign(env,{kind:k}));KG82_KIND[k]={e:"sg_"+k,n,t,how:G.how,steps:G.steps}}
if(typeof petcStrokeEng==="function"&&!KG82_KIND.thu_tam){KG82_ENG.thuTam=petcStrokeEng;KG82_KIND.thu_tam={e:"thuTam",n:"Chải lông thú",t:"Vuốt đều tay",how:petcHow("thu_tam")}}
if(typeof petcBallEng==="function"&&!KG82_KIND.thu_choi){KG82_ENG.thuChoi=petcBallEng;KG82_KIND.thu_choi={e:"thuChoi",n:"Chơi với thú",t:"Bắt quả cầu sáng",how:petcHow("thu_choi")}}
if(typeof shelfWaterGame==="function"&&!KG82_KIND.tuoi){const W=SHELF_CARE.cay;
 /* the plant board as a kind engine: score 0..1 → raw 0..10; the guided round's hand waits on «Dừng tưới» and says «chạm» while the water is in the band */
 KG82_ENG.tuoi=(box,env)=>{const G=BAL.shelf.plant.game;const stop=shelfWaterGame(box,s=>env.end(10*s),W,env);
  KG82.hint=()=>{const bt=box.querySelector("[data-shw]");if(!bt)return null;const r=bt.getBoundingClientRect(),lv=SHPC.peek?SHPC.peek():0;return{x:r.left+r.width/2,y:r.top+r.height/2,soon:lv>=G.band[0]-1&&lv<=G.band[1]}};
  return()=>{stop();KG82.hint=null}};
 KG82_KIND.tuoi={e:"tuoi",n:"Tưới cây",t:"Tưới vừa đủ",how:W.how}}
}catch(e){console.error(e)}})();
