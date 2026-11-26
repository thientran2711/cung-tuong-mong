# PROGRESS — review/place-rules (worker PLACE-RULES, MAIN 147)

PRIORITY #1 CHECK: OD 'cấm túc' 1 / 'nơi bị cấm' 0 | main: jstagehere.js stayRoll (stay = Lẻn vào), jsl.js kitLifePlace (lãnh cung pin), j41 accessOf/chooseM pass, j77 tn rule | review/* 0 | claims: OB-NGOAICUNG (event gating at home, untouched), TINBAO-WORDS (wording of the Tin báo lines, told my branch).

Owner bug OD 25/11 ~23:33Z: at Đức Thọ cung past the morning she got «cấm túc 2 tháng» but the stage stayed on Đức Thọ cung; no warning before; the Hoàng hậu she was talking with «cũng tới».

## Root causes
1. stayRoll (jstagehere) punished, then `goTo("home")` — j2 goTo returns at once while `Q.length` (the buổi turn had cards queued) → she stayed at the closed place under cấm túc.
2. The closing notice fired only at the LAST khắc of the buổi (left<=1); a multi-khắc act / the Hoàng hậu talk jumped past it; the only line she saw was the after-the-fact «đã đóng cửa, ngươi vẫn ở lại» (Tin báo, OD 23:36Z shot). That line also overwrote S.closeSeen during the turn.
3. AG-MEET (jgreet gmWatch → gmCard «Có người đến … giá đáo») fires for a person at the same place+khắc even when that person is already on her stage.

## Fix (one mechanism per family)
| family | before | after |
|---|---|---|
| cấm túc while away (any path: 19 punish(S) sites, coop S.confined) | S.place kept; stage/Dư đồ show the old place | jplrule plSweep before every render/renderStage: cấm túc ⇒ her room at once + stage line «Thị vệ đưa ngươi rời X về tẩm cung» |
| stay caught (stayRoll) | goTo("home") refused with a card open | plHome (the ONE forced walk, not blocked by cards) + render; «Bị bắt» card over her room |
| lãnh cung | already pinned (jsl kitLifePlace) | unchanged (plHome defers to coldVisit) |
| door refusal (Cần Chính «Ngươi phải lui ra», Dưỡng Hòa «Thái giám chặn cửa») | she stood inside the hall | sent to her room with the same line |
| summons answered («Thái hậu triệu / Hoàng hậu … triệu» → «Đến…») | pass only, she stayed home | walks there after the cards close (actPendRun; entourage card asked as for any walk) |
| arrival by a person already beside her | «Có người đến … giá đáo» card | gmCard / AP_MK skipped (no effects ran); agScene and every other «Có người đến/tìm đến» card (one showModal gate plArrFix) re-titled «Người bên cạnh», arrival line dropped |
| time-limited place | warned only at last khắc | ENTRY notice «<Nơi>: chỉ được lưu đến hết <buổi> (<lý do>). Quá giờ mà còn ở lại = như lẻn vào: <cơ may>.» + the last-khắc «sắp đóng cửa sau khắc này» (both kitNotice: chip + «!» box + Tin báo) |
| punishment without warning | possible | stayRoll needs S.plWarn (the warning of that buổi+place); unwarned = «Hết giờ tiếp» card, escorted home, no Danh / cấm túc |

Rule check (owner: «why Đức Thọ became forbidden at chiều, right for her rank?»): j77 accessOf tn = open at buổi sáng (thỉnh an) for every rank; other buổi only with a pass for that buổi (summons, accepted bái kiến, Thỉnh an act, walk spill) or a festival there; same rule as Càn Ninh. The rule itself is unchanged (law 16); she was inside on a one-buổi pass, which ended at the turn. Now she is told on entry.

## Tests
- dev/test/place-rules.js (A warned overstay caught → home+cấm túc · B unwarned → escorted, no loss · C punish while away → home · D one presence (gmCard/AP null, gate retitles) · E summons walk · F door refusal → home · old save): ipadAir [] · fold [].
- dev/test/stage-stay.js updated (entry notice comes first; hidden motion queue must not hold the turn): PASS (it failed on main: the turn never advanced in the test).
- stage-here.js: 1 fault tn-closing chipcount — SAME on main 5e013076 (pre-existing, festival opens tn in that save). act-place-audit: bad 0.
- Scan: python3 dev/test/place-rules-scan.py (table below).

## Videos (CDN)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rules/place-rules-fold-r1.mp4
- https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rules/place-rules-ipad-r1.mp4
Recorder: DEV=fold|ipadAir node dev/test/place-rules-video.js <out.mp4> (TEST caption bottom-left is the recorder's, not the game's). Note: on Fold the stage draws 2 of the people there (the +N counter holds the Hoàng hậu); on iPad her focus view opens.

## Scan (every forced-move path, arrival card, time-limited place)
| kind | where | code | covered by |
|---|---|---|---|
| cấm túc (S) | j2.js:162 | .mood===3&&roll(BAL.ag.cx2.favor.angry))punish("làm phiền lúc thánh thượng nổi giận",1)} | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j2.js:180 | rái.`}relAdd(S,v,-BAL.ag.cx2.chest.rel);punish("lục lọi cung phi tần",1);return "Bị cung | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j22.js:60 | 0;S.fake=0;S.hidden=false;S.pregWk=null;punish("giả sảy thai, khi quân",1)}})}})(); | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j4.js:31 | fail:()=>{st.caught++;punish("buôn lậu trong cung",2);if(st.caught>=3) | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j4.js:40 | nhMonth_4,sung:BAL.eff.j4.sungMonth_7});punish("tư tình với thị vệ",2);stEnd(-1,"Lộ chuy | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j41.js:53 | được: Danh -${BAL.sneak.danh}.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,1); | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j7.js:21 | ng ${v.name}${rvY(p,": nàng ")}.`)}else punish("chôn hình nhân trù ẻo",2)}}, | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j7.js:26 | oan.")}}else{apply({danh:-6});v.rel-=20;punish("gửi quà có độc",2)}}}, | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j7.js:100 | hemes++;if(!roll(p.o)){apply({danh:-5});punish("giết người diệt khẩu",2)}}}, | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j72.js:166 | if(o.pun){try{punish(S,q72Txt(o.pun,X),1)}catch(e){}} | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j77.js:52 | ị vệ bắt được: Danh ${P.danh}.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,P.sev); | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j92.js:349 | anhGuilty,sung:BAL.eff.j92.sungGuilty});punish(S,"lấy trộm đồ",1);Q.push({t:"Mang tội ăn | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j92.js:385 | apply({sung:BAL.eff.j92.sungWdNtMonth});punish(S,"làm mất đồ ngự tứ mà giấu, tội bất kín | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | j95.js:444 | il[1]);affAdd(v,S,-BAL.tw.g.accFail[2]);punish(S,"vu cáo phi tần không đủ chứng cứ",to== | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jrcp.js:184 | &acc!==S)evA(acc,S,BAL.eff.jrcp.evLose);punish(S,`dâng đồ làm ${who} phát bệnh`,sev)}; | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jreign.js:218 | if(o.pun){try{punish(S,"can dự chuyện triều chính",o.pun)}catc | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jreign.js:260 | nh:-Bg.loseDanh,sung:-Bg.loseSung});try{punish(S,"là người của phe Tể tướng",1)}catch(e) | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jroute.js:379 | .route.demandFail);oanAdd(v,S,N.accOan);punish(S,"vu cáo phi tần",N.accPun);log(`<span c | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jstagehere.js:86 | gặp: Danh -${BAL.sneak.danh}.</span>`);punish(S,`ở lại ${n} sau giờ đóng cửa`,1); | plSweep (render/renderStage): cấm túc ⇒ her room at once |
| cấm túc (S) | jcoopworld.js:818 | .max(0,(S.cev[fpid]//0)+g.em);if(g.conf)S.confined=Math.max(0,(S.confined//0)+g.conf); | plSweep |
| lãnh cung | j10.js:135 | ut of it while in lãnh cung (S.out from cold(), not the | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j14.js:2 | function cold(why){if(S.dead)return;if(S.out)return;S. | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j22.js:22 | children) */if(npcWhy("empMercy",{p:S}))cold(`Tư thông với ${m.name} bị lộ`);else dea | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j22.js:65 | ame} bị xử trảm.`)}S.pregMismatch=false;cold("Thú tội tư thông")},fail:()=>{const m=m | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j3.js:158 | 0&&S.danh<=BAL.danhG.forget&&S.rank<=1){cold("Bị bỏ quên, đưa vào lãnh cung");return | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j30.js:25 | chết.","Ban chết: tư thông bại lộ")//"";cold("Ngươi tư thông bị phát giác");return "C | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j68q.js:3 | s in her real lãnh cung (S.out from j14 cold(), not the srvW / kcW S.out=1 trick) and | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j8.js:97 | nhantu")&&npcWhy("empMercy",{p}))return cold(`${why}. Hoàng thượng nhân từ tha tội ch | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | j8.js:101 | ramedBy=key(ACTX.a);if(S.rank>=5//R(2)){cold(`Ngươi ${why}`);return}S.rank=seatDown(S | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | jcoopworld.js:827 | if(g.cold){try{cold(m.seen==="named"?`Bị ${m.who} hại, đày v | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | jcoopworld.js:866 | (S.coopCold){S.coopCold=0;if(!S.out)try{cold("Bị đày vào lãnh cung")}catch(e){console | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | jroute.js:176 | e("Bị ban chết vì trốn khỏi cung");else cold("Trốn khỏi cung không thành")} | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | jroute.js:362 | if(confess)cold(innocent?"Nhận tội tư thông (oan)":"Nhận | jsl kitLifePlace + j14 coldVisit (existing) |
| lãnh cung | jroute.js:362 | on không phải cốt nhục hoàng gia");else cold(why//"Con không phải cốt nhục hoàng gia" | jsl kitLifePlace + j14 coldVisit (existing) |
| stay caught | jstagehere.js:78 | function stayRoll(k,bk0){try{if(!S//S.dead//S.out//S.conf | plHome + render (was goTo('home'), refused while a card was open) |
| door refusal | j2.js:142 | ợng cau mày: “Trẫm đang bận việc nước.” Ngươi phải lui ra."};log("Đến Cần Chính điện, bị đuổi về. | jplrule goTo wrap → plHome |
| door refusal | j2.js:144 | g<BAL.m95.dtdSung)msg=kSay({srv:"m"},S,"Thái giám chặn cửa: “Không có khẩu dụ, {goi} xin hồi cung. | jplrule goTo wrap → plHome |
| door refusal | jplrule.js:8 | anding inside (j2 goTo: Cần Chính điện «Ngươi phải lui ra», Càn Thanh «Thái giám chặn cửa») | jplrule goTo wrap → plHome |
| door refusal | jplrule.js:8 | nh điện «Ngươi phải lui ra», Càn Thanh «Thái giám chặn cửa») | jplrule goTo wrap → plHome |
| door refusal | jplrule.js:35 | if(/Ngươi phải lui ra\./Thái giám chặn cửa/.test(m)){PR.stat. | jplrule goTo wrap → plHome |
| door refusal | jplrule.js:35 | if(/Ngươi phải lui ra\./Thái giám chặn cửa/.test(m)){PR.stat.door++;plHome(m.repla | jplrule goTo wrap → plHome |
| door refusal | jplrule.js:35 | st(m)){PR.stat.door++;plHome(m.replace("Ngươi phải lui ra.","Ngươi phải lui về cung."));if(typeof | jplrule goTo wrap → plHome |
| door refusal | jplst.js:5 | (3) the place-entry line (S.visit.msg: "Thái giám chặn cửa", "Hoàng thượng không ra vườn hôm nay"… | jplrule goTo wrap → plHome |
| summons | j24.js:30 | thCall:()=>({ev:1,t:"Thái hậu triệu",who:pTH(),h:"<p>Thái hậu muốn có người | jplrule chooseM → walk there (actPendRun) |
| summons | j41.js:81 | oseM=function(i){try{const m=Q[0];if(m&&/triệu/i.test(m.t//"")&&m.opts&&m.opts[i]&&/^Đến/.tes | jplrule chooseM → walk there (actPendRun) |
| summons | jkc3.js:189 | thtrieu:{t:"Thái hậu triệu",b:()=>{const B=BAL.kc3.entry,T=BAL.kc3. | jplrule chooseM → walk there (actPendRun) |
| summons | jplrule.js:38 | on(i){let k=null;try{const m=Q[0];if(m&&/triệu/i.test(m.t//"")&&m.opts&&m.opts[i]&&/^Đến/.tes | jplrule chooseM → walk there (actPendRun) |
| arrival card | j24.js:23 | if(kind==="gossip")return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} sang chơi, kể | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:24 | if(kind==="ally")return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} sang thăm, ng | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:25 | BAL.eff.j24.bacApproaches;return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} túng bạc, ngư | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:26 | ,BAL.eff.j24.approachOne);return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} quý ngươi, ma | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:27 | apTaunt:o=>{const v=o.who;return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} ${o.why}, đến | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:28 | apSorry:o=>{const v=o.who;return{ev:1,t:"Có người đến",who:pv(v),h:`<p>${v.name} hối chuyện cũ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:34 | o=>{const s=o.who,v=o.tgt;return{ev:1,t:"Có người đến",who:pServ(s),h:`<p>${s.name}, cung nữ b | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j24.js:37 | /[]).includes(v)){visitSeen(v);if(m.t==="Có người đến"&&typeof m.h==="string"&&m.h.startsWith( | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j25.js:93 | &&facOf(l);if(l&&f&&l!==S)return{ev:1,t:"Có người đến",who:pv(l),h:`<p>${l.name}, người đứng đ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j36.js:13 | Owner 11/15 ("Có người đến": a consort sends back my gift, 'không d | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j68.js:70 | nst FAM6={day:"Chuyện trong cung",visit:"Có người đến",emp:"Hoàng thượng",sea:"Thời tiết",fest | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j68.js:86 | f(typeof d.t==="string"&&!d.t.includes("giá đáo")&&!d.t.includes("xin cầu kiến"))d.t=vi | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | j87.js:389 | NO picture rather than the same "Có người đến" room on every line (act-pics2 a467 / ow | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jagday.js:425 | khắc k starts ONE shared act: the popup "Có người tìm đến" offers | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jagent.js:256 | const r=agLand(p,true);Q.push({t:"Có người tìm đến",who:pv(v),h:`<p>${v.name} ${p.act} ngươ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jagent.js:259 | ,v)=>{const W=agPlaceTxt(p.pl);return{t:"Có người tìm đến",who:pv(v),h:`<p>${v.name} tìm đến ngươi | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jdfv.js:73 | try{const w=m&&m.t==="Có người đến"&&m.who&&m.who.w;if(w&&w[0]==="r"&&typeo | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | "]],"e68:eunRequest":[["e68-eunrequest","Có người đến"]],"e68:strayCat":[["e68-straycat","Chuy | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | tiết"]],"e68:docCheck":[["e68-doccheck","Có người đến"]],"e68:doubtVisit":[["e68-doubtvisit"," | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | "]],"e68:doubtVisit":[["e68-doubtvisit","Có người đến"]],"e68:hhSummons":[["e68-hhsummons","Có | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | ến"]],"e68:hhSummons":[["e68-hhsummons","Có người đến"]],"e68:newGirlAdvice":[["e68-newgirladv | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | 68:newGirlAdvice":[["e68-newgirladvice","Có người đến"]],"e68:poisonedFish":[["e68-poisonedfis | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | cần tra"]],"e68:thMama":[["e68-thmama","Có người đến"]],"j71f:thanhtho":[["j71f-thanhtho-1"," | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | t3"]],"e68:allyOffer":[["e68-allyoffer","Có người đến"]],"thd1":[["thd1","thd1"]],"e68:fortune | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | "]],"e68:proudVisit":[["e68-proudvisit","Có người đến"]],"e68:servHero":[["e68-servhero","Kẻ h | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | ],"e68:borrowDress":[["e68-borrowdress","Có người đến"]],"e68:embroidery":[["e68-embroidery"," | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | tiết"]],"e68:musician":[["e68-musician","Có người đến"]],"e68:painter":[["e68-painter","Có ngư | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | ời đến"]],"e68:painter":[["e68-painter","Có người đến"]],"e68:rumorEmpLove":[["e68-rumoremplov | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevban.js:9 | ft"]],"e68:kindVisit":[["e68-kindvisit","Có người đến"]],"e68:rumorTH":[["e68-rumorth","Tin đồ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jevfit.js:65 | /* "Có người đến" (j24 approaches): what she came FOR */ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jgreet.js:12 | comes to her at that khắc (kit Q card "Có người đến", the same queue approaches() j24 uses) | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jgreet.js:66 | home?`Ngoài điện có tiếng xướng: “${T} giá đáo!”`:`Phía trước có tiếng cung nhân xướng | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jgreet.js:66 | a trước có tiếng cung nhân xướng: “${T} giá đáo!”`; | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jgreet.js:152 | itle (rv-visitor-fix 5) */return{ev:1,t:"Có người đến",who,h:`${G?"":`<p>${visitArrive(v)}</p> | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jgreet.js:160 | try{if(m&&m.t==="Có người đến"&&m.who&&m.who.w&&m.who.w[0]==="r"&&m.__ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jk4.js:803 | ry event where a person appears (visits "Có người đến", invitations, confrontations, the Emper | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jplrule.js:12 | «Có người đến … giá đáo»), the weekly door approach (j24 AP_MK) | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jplrule.js:47 | if(m&&m.t==="Có người tìm đến"){PR.stat.dupSeek++;m.t="Người bên cạnh" | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jplrule.js:50 | the door / road arrival line (giá đáo · xin cầu kiến · xin ra mắt) dropped */ | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jplrule.js:53 | .h==="string")m.h=m.h.replace(/<p>[^<]*(giá đáo/xin cầu kiến/xin ra mắt)[^<]*<\/p>/g,"" | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| arrival card | jtsb.js:220 | /* ================= CÂN BẰNG LỰA CHỌN "Có người đến" (điều phối 05:12Z, sếp hỏi "có thật sự | plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her |
| time-limited place | j2.js:145 | if(k==="tn"){if(S.thDead)msg="Đức Thọ cung vắng lặng | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j27.js:23 | function residents(k){const L=[];if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive& | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j41.js:18 | if(k==="dtd"//k==="thu"){if(r>=4)return{ok:false,why:"cần xin yế | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j41.js:19 | if(k==="kn"){if(!qOn()//r>=7)return{ok:true};if(b===0 | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j41.js:20 | if(k==="tn"){if(S.thDead)return{ok:true};if(r<2)retur | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j41.js:22 | if(ACC_DAY[k]){if(b<B4L)return{ok:true};return{ok:false | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j41.js:26 | function accAskO(k,a){a=a//S;if(k==="dtd"//k==="thu"){let o=45+(rkOf(a)-4)*8+mm()+(a.sung//0) | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j77.js:147 | if(k==="dtd"//k==="thu")return{ok:false,why:k==="dtd"?"tẩm điện | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j77.js:148 | if(k==="kn"){if(!qOn()//b===0//ctx.r>=7)return{ok:tru | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j77.js:149 | if(k==="tn"){if(S.thDead//b===0)return{ok:true};retur | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | j77.js:150 | if(ACC_DAY[k]){if(b<B4L)return{ok:true};return{ok:false | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | jmapz.js:20 | if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive& | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | jmapz.js:21 | else if(k==="tn"){if(!S.thDead)for(const s of (S.thO&&S.th | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | jmen.js:16 | {if(!k)return"";if(k==="ngt")return"nt";if(k==="dtd"//k==="thu")return"nd";if(k==="tyv"//k==="ksp")retur | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | jplace.js:12 | "sáng thỉnh an, lúc khác phải được mời";if(k==="dtd"//k==="thu")return"chỉ vào khi được triệu";return""} | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |
| time-limited place | jplace.js:26 | if(k==="tn"){if(S.thDead)return null;return relPerson | jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown |

104 rows

## r2 (MAIN 147/148 adds: k17 Dư đồ + TINBAO wording)
- Wording (TINBAO-WORDS, OD 25/11 ~23:36Z: no «=», odds once at the end, «ta»): entry «<Nơi> chỉ được lưu đến hết <buổi> (<why>); quá giờ mà còn nán lại thì chẳng khác gì lẻn vào, may rủi: <odds>.» · next «… sắp đóng cửa sau khắc này (…); nán lại quá giờ thì chẳng khác gì lẻn vào, may rủi: …» · now «… đã đóng cửa (…) mà ta vẫn nán lại, chẳng khác gì lẻn vào; may rủi: …» (chip «… đã đóng cửa, ta vẫn nán lại»). TINBAO-WORDS drops its jstagehere hunk.
- Dư đồ (plMap/plBanTick in jplrule.js, label layer only; OB-PHU owns full screen + label grouping):
| before (k17) | after |
|---|---|
| under cấm túc the map marked her at the old place | she is in her room (plSweep) |
| her own home spot greyed + locked like the rest | home spot never locked (accState: her home = here), its line starts «Nhà ta» (painted icon K-ICO-HOME requested) |
| «đang cấm túc (2 tháng)» on ~15 labels | removed from labels; said ONCE: kitNotice sticky «Đang cấm túc, còn N tháng: chỉ ở trong cung mình» (top chip + «!» box) + .fest chip in the map row (hidden on leather view → K-MAP-BANNER requested). Same for lãnh cung, and any reason on ≥60 % of labels (hết khắc / tối) is said once in the row |
| no obvious way home | «Về phòng · N khắc» kit button in the map's top row when away (disabled with reason when the khắc do not allow) |
- Pulsing alert (owner 18/11 ~19:45Z point 5): replaced by her ONE NOTICE ruling 18/11 ~22:10Z (top-bar «!» box + chip, jnotice); it was not broken by SANGBUOI r4 — it fired only at the LAST khắc (left<=1) and her talk skipped that khắc. Now it also fires on entry.
- Test G in dev/test/place-rules.js (map). iPad [] Fold []; stage-stay PASS.
- Shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rules/map-camtuc-ipad-r2.jpg · map-camtuc-fold-r2.jpg · map-vephong-ipad-r2.jpg · map-vephong-fold-r2.jpg (map art blank in the cấm túc shots = CDN load timing in the test, not this change).
