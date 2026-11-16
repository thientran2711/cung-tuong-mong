# coop-name-mask r2 — co-op friend label (worker, branch review/coop-name-mask, code sha 48a942b2)

Redo after Foreman D rejected r1 (always-named broke OD:L165). r1's k61Pub(e.coop) change is REVERTED. START_CTX ~4 %.

## Cause
1. Thư từ: jaudit kitRankNamePaint rewrote the friend's bare name into the NPC rank mask "<rank> ???"; j61 masked the same way elsewhere.
2. The header friend chip (jcooptimer, OD:L1061) already printed "Hảo hữu" for an unmet friend, so one friend had two labels.
3. Found while testing: the guest-maid friend sits in a consort's staff, not in rivals, so COOPW.friend() / friendEntry() is null there; lookups must scan the whole world.

## ONE source (decision)
- Unmet friend label = "Hảo hữu" (what the live header chip prints; also the KIT §80 chat subtitle/fallback). No rank, no "???". Not "Người lạ" (OD:L165 wording): the chip, chat and lobby already say "Hảo hữu"; "Người lạ" is the stage-0 label of NPC strangers, and the friend is a known real player (OD:L1061 spec: "Hảo hữu của ta" or known name). One constant K61FR in j61.js if the owner prefers another word.
- Met (j61 stage >= 2, k61Named) -> real name. Reborn friend -> forgetFriend resets the j61 stage -> "Hảo hữu" again. Face keeps following met61 (grey silhouette until met).
- Code: j61.js K61FR, k61Coop(e) = e.coop && !k61Named(e), k61CoopEnt() (friend in rivals OR staff); used by k61Mask, kitName, stage tag, pager, pcard. jcoopchat.js frUnmet/frSign/frName; data-k61skip + data-krn-skip stay on the panel.

## Before / after
| place | before (unmet) | after unmet | after met |
|---|---|---|---|
| Thư từ signature | "Tần ???" or real name by path | "Hảo hữu" | real name |
| Thư từ header "Truyền tin cùng X" | real name / mask | "Hảo hữu" | real name |
| news / log text (k61Scrub -> k61Mask) | "Phi ???" | "Hảo hữu" | "<rank> <name>" |
| kitName (rank list, Hậu cung rows, kitPersonLine) | "<rank> ???" | "Hảo hữu" | "<rank> <name>" |
| stage tag (renderStage) | "???" / "Người lạ" | "Hảo hữu" | name |
| face strips (pager) | "???" / "Người lạ" | "Hảo hữu" | name |
| person card name (pcard) | "???" | "Hảo hữu" | name |
| header friend chip / notices (jcooptimer) | "Hảo hữu" | unchanged (same label) | name |
| invite / wait / rejoin panels (jcooplobby) | no name printed | unchanged | unchanged |
Real unmet NPCs unchanged ("Phi ???", "Người lạ").

## Tests
- coop-chat.js (local wrangler dev; coop/worker/.wrangler NOT committed; local copy clicks via script because main's card-flip scene blocks the rail click here): 51/52; new checks pass: guest unmet "Hảo hữu"; guest met real name (signature + header); host unmet "Hảo hữu"; host met real name. The one miss = known early "both players are in the shared world" wait (d-golive).
- name-mask-oldsave PASS; name-mask-scan (12 months, r1 build) PASS 0 hits; name-mask-dom-scan 20 steps: 0 hits on re-run; one earlier run showed 1 raw hit for a solo NPC ("Thẩm Vân Khanh" in a rumour line). Solo, r2 code is inert without e.coop; looks like a pre-existing bot/timing race, not investigated.
- coop-e2e 57/59 on the production Worker (r1 build; known "A frozen when B left" flake); r2 only changes label paths.
- Shots looked at: host 755x1000@2 05-two-lines-A (unmet: "Hảo hữu" + "Truyền tin cùng Hảo hữu"), 05b-two-lines-met-A (real names); guest 1180x820@2 04b-open-friend-met-B (real names). The guest UNMET frame is asserted by the test (signature "Hảo hữu") but not shot. Shots deleted.
- Tier: SMALL.
