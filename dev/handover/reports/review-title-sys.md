SẴN SÀNG KIỂM 06dd80aec79ca3251e0c4c43db6811b6bfbdbf2a
# review/title-sys — TITLE SYSTEM phase 1 incl. the owner's BONUS model (Foreman C worker, successor 2)
START_CTX ~3 % of 1M (worker successor 2); finished well under the +25 % limit.
Branch review/title-sys, merged with origin/main 2232ea32 (title-tag / rank-bright are NOT on main yet; they come in through this branch, base 8b21c97d). Conflicts resolved: assemble.py (union of module lists), jk4.js kitStageFig (main's D50 silhouette fallback + the §82 plate), KIT.md (both sections kept), built files rebuilt. Details: dev/PROGRESS_title-sys.md.

## What changed in this round (owner OD 16/11 13:55Z + 14:10Z s17; FOREMAN_C 14:15Z / 14:35Z / 14:45Z)
- ONE title worn; it gives ONE bonus; the PLAYER picks which, from that title's list (2–3 types). Picker = kit info panel + kit option cards ("Đeo «X»" → choose; "Đổi phần thưởng «X»" for the worn one). Choice kept per title (p.dh[key].pick). NPC consorts wear their best title and pick by need (no heir → conception, low Sủng → Sủng gain, low Danh → Danh, low maid loyalty → cung nữ).
- Old flat Sắc/Danh/Sủng/Đức model replaced by the BAL catalogue BAL.dh.B (jbal2.js, all modest constants, values per step 1/2/3). Old saves: the stored p.dhOn delta is still given back exactly.
- Each type hooked at the ONE place that computes that gain (no second formula):

| type | player text (no %) | step 1/2/3 | hook |
|---|---|---|---|
| sac danh sung duc tai tamco | "Sắc +1" | +1/+1/+2 | wearBonus (Sắc) / dhApplyFx reversible delta |
| gSung | Sủng được thêm một phần hai mươi… | 1/20, 1/14, 1/10 | sg (her), ap (NPC) |
| gDanh | Danh được thêm … | 1/20, 1/14, 1/10 | apply (her), ap (NPC) |
| gBac | Bạc thu vào thêm … | 1/12, 1/8, 1/6 | apply / ap |
| gTren | Thái hậu, Hoàng hậu quý ta thêm … | 1/12, 1/8, 1/6 | apply th/hh |
| gHau | Phi tần quý ta thêm … | 1/12, 1/8, 1/6 | affAdd (consort → wearer) |
| gTrung | Lòng cung nữ thêm … | 1/10, 1/7, 1/5 | apply / ap "maid" |
| phuc (LUCK, "Phúc khí") | Phúc khí +2: việc may rủi dễ thành hơn | +2/+3/+4 odds | lotB (every rolled act, hers + NPCs'; NOT conception; Quẻ tag unchanged) |
| thai | Có thai: dễ hơn (một chút) | 0/+1/+2 | conceiveCh final chance; only 2 hard titles, steps 2–3 |
| nghe | Tự học tài nghệ: đôi khi / khá thường / thường tiến thêm một phần | 15/25/35 in 100 | addArt / addArtP |
| thi | Hội thi: thêm 2 phần tài nghệ | +2/+3/+5 | SC7[kind].f (shown odds = real score) |
| suc | Ngủ dậy Sức +1 | +1/+2/+3 | j76sleep |
| don | Tin đồn về ta khó lan hơn (một chút / hẳn) | −5/−8/−12 odds | oRumor inside ACT.rumor against the wearer |

Gains add +1/d with the fraction rolled (expected value exact; small gains not lost to rounding). LUCK definition (for the canon — I may only touch my report on the docs branch, so Foreman C please write it into the balance canon): "Phúc khí = a title bonus of +2..+4 on the success odds of every rolled act of the wearer (the same modifier as the monthly Quẻ, lotB); it never touches conception or contest luck." It is written in the BAL.dh comment (jbal2.js).

## Title → allowed bonus types (counts per step)
| title key | counts for steps 1/2/3 | bonus types (player picks one) |
|---|---|---|
| w_doden | 1/5/10 | tamco, phuc, thi |
| w_tho | 1/5/10 | tai, danh, thi |
| w_doi | 1/5/10 | tai, gDanh, thi |
| w_dan | 1/5/10 | sac, nghe, thi |
| w_mua | 1/5/10 | sac, danh, thi |
| w_hat | 1/5/10 | sac, gTren, thi |
| w_theu | 1/5/10 | danh, gBac, thi |
| w_kim | 1/5/10 | sac, phuc, thi |
| w_hoa | 1/5/10 | sac, gHau, thi |
| w_ve | 1/5/10 | tai, danh, thi |
| w_co | 1/5/10 | tamco, phuc, thi |
| w_banh | 1/5/10 | sung, gTren, thi |
| w_ban | 1/5/10 | suc, danh, thi |
| w_dauho | 1/5/10 | phuc, gHau, thi |
| w_huong | 1/5/10 | sac, sung, thi |
| meta | 3/6/10 | gSung, gDanh, phuc |
| podium | 1/5/10 | danh, thi |
| nights | 1/10/30 | sung, gSung, thai |
| kids | 1/3/5 | danh, gTren, thai |
| a_thinh | 5/20/50 | duc, gTren |
| a_doc | 5/20/50 | tai, nghe |
| a_nhan | 5/20/50 | sac, suc |
| l_cam | 1/5/10 | suc, nghe |
| l_ky | 1/5/10 | tamco, nghe, don |
| l_thi | 1/5/10 | tai, nghe |
| l_hoa | 1/5/10 | danh, nghe |
| l_vu | 1/5/10 | sac, nghe |
| l_y | 1/5/10 | suc, nghe |
| l_theu | 1/5/10 | gBac, nghe |
| l_nau | 1/5/10 | gTrung, nghe |
| m_mon | 1/5/10 | sung, gTrung |
| m_kinh | 1/5/10 | duc, don |
| m_theu | 1/5/10 | gBac, sac |
| m_tranh | 1/5/10 | tai, danh |
| m_khuc | 1/5/10 | sac, gHau |
Split by type (how many titles offer it): {"tamco":3,"phuc":5,"thi":16,"tai":6,"danh":9,"gDanh":2,"sac":10,"nghe":10,"gTren":4,"gBac":3,"gHau":3,"sung":4,"suc":4,"gSung":2,"thai":2,"duc":2,"don":2,"gTrung":2}. High-value ones are rare/hard: thai only on Trăng soi rèm ngọc (10 / 30 nights) and Phúc ấm đầy nhà (3 / 5 children); gSung only there and on Tài hoa vô song (first in 3 / 6 / 10 kinds).

## HISTORY notes (OD 14:10Z history rule)
- Real courts (Qing): an emperor-granted honorific (封號) is ONE character chosen for its meaning — e.g. 禧 "auspicious", 明 "bright", 慶 "glad", 慈安 "motherly and calming" — and it joins the rank ("Concubine Qing" → "Consort Qing"), kept through promotions or changed by decree; it is a mark of favour, not a stat (sources: en.wikipedia Consort Xi, Consort Qing (Xianfeng), Empress Dowager Ci'an). → matches phase 2 (hiệu joins the rank via kitHieuJoin; owner 13:20Z (2)).
- Palace dramas (Chân Hoàn truyện, Diên Hi công lược): the hiệu is granted with a decree + sắc phong book and seal, and can be stripped as punishment (e.g. a consort demoted and her hiệu taken) and restored after penance → phase 2 plan (confiscation / atonement) unchanged.
- Similar games: Chinese palace / MMO games (宮廷/熹妃傳-style mobile games, wuxia MMOs) use 稱號 "titles" earned from achievements; usually ONE active title shown over the head, giving a small attribute bonus while active, with rarer titles giving bigger or special bonuses; many achievement titles are purely cosmetic in Western games (WoW, Steam). Our design follows this: one active, small bonus, rarer = stronger, player chooses. (Game-system notes from general knowledge; the web search found no reliable page on in-game bonuses.)

## Tests
node dev/test/title-sys.js <url> <out> WxH@2 — 755x1000@2: 0 page errors, 0 fails · 1180x820@2: 0 page errors, 0 fails. Covers: every bonus type on/off at its hook (gSung 130→143, gDanh, gBac 120→130, gTren, gHau, gTrung, phuc +2 and NOT on conception, thai +1, nghe, thi +2, suc +1, don lowers rumour odds, flat Tài given back exactly), NPC gSung through ap, picker (3 choices + back), one bonus only after switching titles, plus all phase-1 checks (catalogue, steps, notice, wear/unwear exact, NPC, cFin7, old save, JSON round trip, stage 3-line tag, pop-up plate, Nhiệm vụ tabs, info card, no overflow). Shots looked at (dev/test/title-sys-shots/: dh-pick, dh-panel, dh-card, dh-stage, dh-popup at both sizes): picker and panel read cleanly, no overflow.
Only kit parts used (kitPanel, kit option cards, kitTitlePlate, kitTabRowHTML); no new look.

## Notes / requests (unchanged from round 1)
- KIT note: kitTitleOpen prints KIT_TIER_NAME[tier] (tier 1 "Nhất", 7 and 8 both "Thất") — off by one? jdh follows the kit card.
- KIT REQUEST (optional): a picture for the Danh hiệu panel / picker / info card (today the generic tea-set fallback).
- After review/owner-answers-b lands: rename kcuHonorRows heading "Danh hiệu thi tài" → "Thứ hạng thi tài" (places are not titles).
- Kit option rows split an option's note on ", " and " · " — the picker note uses " hay " to stay one line.
Phase 2 (emperor hiệu by thresholds, sắc phong book + seal, confiscation + atonement, theft → investigation with Foreman D's item-location rule) = plan only (PROGRESS).

- Kit test dev/test/title-tag.js: 'no dialog' / 'dp plate' fail in this env — its pop-up is Q.push'ed BEHIND the queued new-life opening cards (title-sys.js uses Q.unshift and its pop-up plate check passes: "Trăng soi rèm ngọc / Phi / <name>"). Kit keeper: switch that test to Q.unshift.
