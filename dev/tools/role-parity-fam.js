/* ROLE PARITY — FAMILIES (owner OD 24/11 ~08:35Z: whole-game LAW-1 audit, "không phải ... chỉ cho mỗi cái vấn đề sở thích và sở ghét. Bạn phải rà lại toàn bộ").
   The act table of role-parity-scan.js covers BUTTONS (role × act × {player, NPC}). This part covers the RULE FAMILIES that are not one button:
   gifts given and received (likes / dislikes), per-nết thresholds, promotion routes, the selection contest, endings / leaving / lãnh cung,
   knowledge / greeting / notices, ban cung, contests / mini-games, co-op, the wardrobe pawn.
   Each row = one rule a person can DO or SUFFER: her side · the NPC side · the reverse (NPC → her, or her → NPC) — proven on the LIVE build by
   (a) a runtime probe in one seeded page (the game's own functions called for S and for an NPC) and (b) static call-site checks on the built
   source (who the shared function is called for). Verdict: SAME (both sides, one rule) · GAP (one side missing) · OPEN (owned by another lane,
   being built) · EXEMPT (UI only / by design, reason given).
   usage: node dev/tools/role-parity-scan.js [index.html] --fam [--md out.md] [--json out.json]   (families only, ~1 min)
          the full scan appends these rows as well.                                                                                           */
const fs=require('fs'),path=require('path');

/* ---------------- in-page runtime probe (one seeded consort life) ---------------- */
function famPage(){const out={};const E=(k,e)=>{out[k]={err:String(e&&e.message||e)}};
 const v=liveRivals(true).find(x=>!x.queen&&!x.out&&!x.confined&&!x.coop),w=liveRivals(true).find(x=>x!==v&&!x.queen&&!x.out&&!x.confined&&!x.coop);
 const giftK=Object.keys(IT).find(k=>{try{const i=itm(k);return i&&i.pr>0&&!i.h&&["Trang sức","Hương liệu","Vải vóc","Lễ vật"].includes(i.kd)}catch(e){return false}});
 /* GIFTS: who HOLDS likes / dislikes in the save (disInit at life start, read BEFORE disOf, which draws lazily for any object it is handed) */
 try{const srv=(S.staff||[])[0]||(v&&v.maid)||null,man=(S.men||[]).find(m=>m&&m.alive)||null;const H={her:S,emp:S.emp,th:S.thO,consort:v,servant:srv,man};const r={};
  for(const k in H){const p=H[k];if(!p){r[k]="none in world";continue}r[k]={dis:Array.isArray(p.dis)?p.dis.length:0,like:0};try{if(k!=="her"&&k!=="servant"&&k!=="man")r[k].like=(disLikeKeys(k==="emp"?"emp":k==="th"?"th":p)||[]).length}catch(e){}}out.likes=r}catch(e){E("likes",e)}
 /* GIFTS: NPC → her and NPC ↔ NPC run through the ONE giveTo; does the recipient's dislike count when the giver is an NPC? */
 try{const r={};if(v&&giftK){v.inv=v.inv||[];v.inv.push({k:giftK});const n0=S.inv.length;const t=giveTo(v,S,v.inv.length-1);r.npcToHer=!!t||S.inv.length>n0;
   if(w){w.inv=w.inv||[];v.inv.push({k:giftK});const m0=w.inv.length;const t2=giveTo(v,w,v.inv.length-1);r.npcToNpc=!!t2||w.inv.length>m0}}
  out.gift=r}catch(e){E("gift",e)}
 /* KNOWLEDGE: one rule called for her and for an NPC */
 try{const r={};const H=(typeof agHap==="function"?agHap():[])||[];const h=H[0];r.happenings=H.length;
  if(h){try{knFor(S,h);r.knHer=true}catch(e){r.knHer="err "+e.message}try{knFor(v,h);r.knNpc=true}catch(e){r.knNpc="err "+e.message}}
  try{moodCauseKnownBy(S,v.id);moodCauseKnownBy(v,"me");r.moodBoth=true}catch(e){r.moodBoth="err "+e.message}
  try{const a=greetName(S,v,{dry:1}),b=greetName(v,S,{dry:1}),c=w?greetName(v,w,{dry:1}):null;r.greetHerNpc=a!==undefined;r.greetNpcHer=b!==undefined;r.greetNpcNpc=c!==undefined}catch(e){r.greet="err "+e.message}
  out.know=r}catch(e){E("know",e)}
 /* BAN CUNG: the NPC's ceremony — accept (Đức) / humble ask, as her card */
 try{const r={};r.npcAsk=typeof bcNpcAsk==="function";const src=String(typeof bcNpcAsk==="function"?bcNpcAsk:"");r.npcAccept=/ducTake/.test(src);r.npcHumble=/bcHumble|humble/i.test(src);out.bc=r}catch(e){E("bc",e)}
 /* CONTESTS: one score formula and one board for every entrant */
 try{const r={};r.cScore=typeof cScore7==="function";r.npcBoard=typeof mgNpcRaw==="function";if(r.npcBoard){const R0=Math.random;let s=7;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
   try{const k="dan";const v0=v.rank;v.rank=0;let lo=0;for(let i=0;i<40;i++)lo+=mgWith({occ:"hoi"},()=>mgNpcRaw(k,v,{}));v.rank=6;let hi=0;s=7;for(let i=0;i<40;i++)hi+=mgWith({occ:"hoi"},()=>mgNpcRaw(k,v,{}));v.rank=v0;r.npcRank0=lo/40;r.npcRank6=hi/40;r.harderWithRank=hi<lo}finally{Math.random=R0}}
  out.contest=r}catch(e){E("contest",e)}
 /* WARDROBE: pawn / redeem — the NPC side */
 try{out.pawn={npcPawnFn:/wdPawn\(v|wdPawn\(o\.who|wdNpcPawn/.test(String(typeof wdMonth==="function"?wdMonth:""))||typeof wdNpcPawn==="function",npcRedeem:typeof wdNpcRedeem==="function"}}catch(e){E("pawn",e)}
 /* LIKES knowledge: she learns an NPC's likes (S.likK); does an NPC learn hers? */
 try{out.likeKnow={herKnowsTheirs:typeof disLikeKnown==="function",npcKnowsHers:!!(S.likKOf||window.disLikeKnownBy)}}catch(e){E("likeKnow",e)}
 return out}

/* ---------------- static call-site checks on the built source ---------------- */
function famStatic(src){const c=re=>(src.match(re)||[]).length;return{
 disGiverHerOnly:/giveTo=function\(a,r,ix\)\{let k=null;const e=a&&a\.inv&&a\.inv\[ix\];\s*try\{if\(a===S&&/.test(src),
 promoRewardNpc:c(/promoReward\((?!S[,)])[a-z]\w*,/g),promoRewardHer:c(/promoReward\(S[,)]/g),
 promoFavourRoute:c(/PROMO_SRC\s*=\s*\{[^}]*\b(fav|sung|occ|dai|truy)\b/g),
 selectionScore12:c(/tuyen12|selScore|SEL12|selTop4|diemTuyen/g),
 npcLeave:c(/g\.left\b|sum==="NUN"|sum==="FOLLOW"/g),coldCards:c(/coldActsOf\(/g),
 coopTargetSkip:c(/!x\.coop&&M\.some|!x\.coop&&!sameHouse/g),
 knForHer:c(/knFor\(S,/g),knForNpc:c(/knFor\((?!S,)[a-z]\w*,/g),
 bcAskBoth:/function bcAsk\(p,i,from\)/.test(src)&&/bcAsk\(v,/.test(src),
 netT:c(/BAL\.net\.T\b/g)}}

/* ---------------- rows ---------------- */
function famRows(rt,st){const R=[];const add=(fam,item,her,npc,rev,verdict,owner,plan)=>R.push({fam,item,her,npc,rev,verdict,owner,plan});
 const L=rt.likes||{};const lk=k=>L[k]&&typeof L[k]==="object"?`ghét ${L[k].dis} · thích ${L[k].like}`:(L[k]||"?");
 const noLD=["her","servant","man","emp","th","consort"].filter(k=>L[k]&&typeof L[k]==="object"&&(!L[k].dis||!L[k].like));
 add("Quà tặng","Tặng quà","she gives to anyone (giveTo, kit «Tặng»)",`NPC gives (AG cx:gift → giveTo): to her ${rt.gift&&rt.gift.npcToHer?"yes":"NO"}, to an NPC ${rt.gift&&rt.gift.npcToNpc?"yes":"NO"}`,"same giveTo both ways",rt.gift&&rt.gift.npcToHer&&rt.gift.npcToNpc?"SAME":"GAP","D","—");
 add("Quà tặng","Có sở thích / sở ghét",`her: ${lk("her")}`,`consort ${lk("consort")} · Emperor ${lk("emp")} · Thái hậu ${lk("th")} · servant ${lk("servant")} · man ${lk("man")}`,"—",noLD.length?"GAP":"SAME","D",noLD.length?`missing likes or dislikes (save field / like keys): ${noLD.join(", ")} (OD ~06:35Z/~07:20Z; D order 07:21Z)`:"—");
 add("Quà tặng","Quà trúng sở ghét → mất thiện cảm","only when SHE gives (jdis giveTo wrap a===S)","NPC giver: no rule; she as recipient: no dislikes",`reverse (NPC → her): ${st.disGiverHerOnly?"NONE":"?"}`,st.disGiverHerOnly?"GAP":"SAME","D","one rule for every giver/recipient: liked ↑ · neutral small/none · disliked ↓ (BAL.dis), D order 07:21Z");
 add("Quà tặng","Biết sở thích người khác","she learns NPC likes/dislikes (talk, spy, gift)",rt.likeKnow&&rt.likeKnow.npcKnowsHers?"NPC learns hers":"NPC learns nobody's (no store)","—",rt.likeKnow&&rt.likeKnow.npcKnowsHers?"SAME":"GAP","D","with her likes (D): NPCs learn and use likes by the same roads");
 add("Ngưỡng theo nết","Thân / oán → hành động theo nết",`flat thresholds (BAL.ag.know.friend …), BAL.net.T refs ${st.netT}`,"same flat numbers for every NPC","—","OPEN","D","per-nết thresholds design (D order 06:02Z, examples only 06:40Z)");
 add("Thăng phẩm","Sinh hoàng tử / ân thi (PROMO_SRC)",`her (promoReward(S…) ×${st.promoRewardHer})`,`NPC (promoReward(v…) ×${st.promoRewardNpc})`,"—",st.promoRewardNpc>0?"SAME":"GAP","D","—");
 add("Thăng phẩm","Đại lễ / sủng ái (ngưỡng theo nết vua) / truy phong","not on LIVE","not on LIVE","—","OPEN","D","promo-redesign (D order 08:33Z; waits for sếp) — one route table for her and every NPC");
 add("Tuyển tú","12 tú nữ thi, top 4 giữ",`LIVE score code ×${st.selectionScore12}`,"other 11 girls scored by the same 3 tests","—","OPEN","MAIN (SELSCENE-4)","review/selection-scene (OD ~06:15Z/~06:20Z: same formula, score only from the 3 tests)");
 add("Kết cục / rời cung","Tự rời cung = kết cục","her own choice → ending (E64 leave-palace)",`NPC leaves by her own road (jgenpc left) ×${st.npcLeave}`,"—","OPEN","E","E64b review/leave-palace: severity ladder for forced removal applies to NPCs too (OD ~07:55Z)");
 add("Kết cục / rời cung","Lãnh cung: thẻ trong lãnh cung","her coldActsOf cards",`NPC chooses among HER cards (jagacts3 coldMonth) ×${st.coldCards}`,"Hoàng hậu xử tội both ways","SAME","E","—");
 const K=rt.know||{};
 add("Tin tức / biết","Ai biết chuyện (knFor)",`knFor(S,…) ×${st.knForHer}`,`knFor(NPC,…) ×${st.knForNpc}; runtime her ${K.knHer} / NPC ${K.knNpc}`,"one rule","SAME","B","—");
 add("Tin tức / biết","Biết nguyên do tâm trạng (moodCauseKnownBy)","her","NPC",String(K.moodBoth),K.moodBoth===true?"SAME":"GAP","B","—");
 add("Tin tức / biết","Chào hỏi, xưng tên (greetName)","her → NPC "+K.greetHerNpc,"NPC → her "+K.greetNpcHer+" · NPC ↔ NPC "+K.greetNpcNpc,"one function","SAME","B","—");
 add("Tin tức / biết","Tin báo («!» / Tin trong cung)","her: kitNotice box (UI)","NPC: the same knFor → news (newsAdd)","—","EXEMPT","B","UI only: the notice box is her screen; who learns what is knFor (row above)");
 const B=rt.bc||{};
 add("Ban cung","Tâu xin cung khác","her bcAsk","NPC bcNpcAsk → bcAsk (same odds/gains/losses)","a refused ask makes the top rival's relation drop either way",st.bcAskBoth?"SAME":"GAP","B","—");
 add("Ban cung","Nhận chỉ (Đức +)","her «Nhận <cung>» Đức +ducTake",B.npcAccept?"NPC accepts → Đức +ducTake":"NPC who does not ask: nothing","—",B.npcAccept?"SAME":"GAP","B","bcNpcAsk: no ask → accept, Đức +BAL.banCung.ok.ducTake (one gain)");
 add("Ban cung","Xin cung thấp / ngang (khiêm nhường)","her humble ask (Đức +ducHumble)",B.npcHumble?"NPC humble ask by nết":"NPC only asks UP","—",B.npcHumble?"SAME":"GAP","B","bcNpcAsk: a humble nết (BAL.net.n.bcHumble) may ask the humble palace on the same card");
 const C=rt.contest||{};
 add("Hội thi / mini-game","Điểm hội thi (cScore7)","her (mini-game or formula)","every entrant, same formula + same luck","—",C.cScore?"SAME":"GAP","B","—");
 add("Hội thi / mini-game","Càng lên càng khó (bàn chơi theo phẩm)","her board mgTier(rank)",`NPC play mgNpcRaw on the board of HER seat: rank0 ${C.npcRank0} → rank6 ${C.npcRank6}`,"—",C.harderWithRank?"SAME":"GAP","B","—");
 const P=rt.pawn||{};
 add("Tư trang","Cầm cố / chuộc đồ","her «Cầm cố» + «Chuộc» (j92 wdPawn / wdRedeem)",P.npcPawnFn?"NPC pawns and redeems":"NPC short of silver only SELLS (j92 wdMonth → wdSell); never pawns / redeems","—",P.npcPawnFn&&P.npcRedeem?"SAME":"GAP","B","NPC poor → pawn or sell by nết (same wdPawn); redeem when silver allows; expiry for everyone");
 add("Co-op","Bạn chơi = một người trong cung","her acts on the friend = on a consort card","NPC acts on the friend (rival entry {coop:true})","—","SAME","B","—");
 add("Co-op","Vay / lấy trộm khẩu phần",`NPC borrows / steals from her (host)`,`never from the friend (jagacts4 p4Lender/p4StealT skip x.coop ×${st.coopTargetSkip})`,"friend → NPC: her own cards","GAP","B","parked: the friend's chest lives on her own seat; a cross-seat item move needs the item-ledger protocol (item-ledger.md parked row) → follow-up job");
 return R}

function famMd(R){const L=["| family | rule | her side | NPC side | reverse | verdict | owner | fix plan |","|---|---|---|---|---|---|---|---|"];
 for(const r of R)L.push(`| ${r.fam} | ${r.item} | ${r.her} | ${r.npc} | ${r.rev} | ${r.verdict} | ${r.owner} | ${r.plan} |`);return L.join("\n")}

async function famScan(html){const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const src=fs.readFileSync(html.replace(/^file:\/\//,''),'utf8');const st=famStatic(src);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const pageErr=[];p.on('pageerror',e=>pageErr.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{let sd=20261118;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
  for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}});
 const rt=await p.evaluate(famPage);await b.close();const rows=famRows(rt,st);return{rows,rt,st,pageErr,gaps:rows.filter(r=>r.verdict==="GAP")}}
module.exports={famScan,famRows,famMd,famPage,famStatic};
