# Review coop-name-mask r1 (reviewer, SMALL) — worker sha 48a942b2, merged onto main 7b5e5e49, fix sha ed8ccb28 on review/coop-name-mask-r1

## Verdict: FAIL 1 (1 BLOCKING) — fixed by me on review/coop-name-mask-r1 ed8ccb28 → PASS on that sha

## Finding 1 (BLOCKING, fixed): two labels for the unmet friend
The worker's claim "the header chip prints Hảo hữu" is true only on the narrow (.kv1) canvas. On the wide canvas (guest 1180x820, host 755x1000 too) the live chip prints **"Hảo hữu của ta"** (jcooptimer kitCoopFriend, also the friend panel title + aria-label) — the owner's newest wording (OD:L1060 "hảo hữu của ta"). Chat/news/rank/stage/pager/pcard printed "Hảo hữu" → the one friend had two labels on screen at once (guest unmet shot: chip "Hảo hữu của ta" vs Thư từ "Hảo hữu"). Fix: K61FR = "Hảo hữu của ta" (j61), chat uses K61FR (jcoopchat), kv1 chip no longer swaps to the short form (max-width 9em). Now ONE label everywhere; met → real name; reborn → unknown again (forgetFriend resets stage); face follows met61. OD:L165 says "Người lạ"; OD:L1060–1061 (newest, 16/11) says "hảo hữu của ta" for an unknown name → followed the newest. Owner may still prefer "Người lạ": one constant K61FR.

## Note: worker's shot labelled "04-open-friend" was taken AFTER the met toggle; guest unmet was never shot. I shot it (04a-open-friend-UNMET, 04a2-chip-UNMET), test now asserts chip label == chat label.

## Consistency scan (code read, unmet / met)
news/log (k61Mask), kitName (rank list, rows), stage tag, pager, pcard, chat signature + header, header chip, friend panel title/aria: all K61FR unmet, real name met (frInfo uses k61Named). Chip status words ("Hảo hữu đã sẵn sàng" etc.) are status sentences with no name, unchanged. Lobby/invite panels print no name. NPC masks unchanged ("Phi ???", "Người lạ").

## Tests (merged build, rebuilt)
- coop-chat (local wrangler dev, .wrangler/node_modules not committed; rail click via script because the card-flip scene blocks it): 55 checks ALL OK after fix (before fix: 51/52, the one miss = known early "shared world" wait, passes on a later run).
- name-mask-scan 12 months PASS 0 hits; name-mask-dom-scan 60 checks 0 raw hits; name-mask-oldsave PASS.
- coop-e2e against production Worker: 59/59 (local wrangler cannot run the lobby flow; known).
- Shots looked at: host 755x1000@2 05-two-lines (unmet: chip + header + signature all "Hảo hữu của ta"; no overflow), guest 1180x820@2 04a unmet + chip frame (chip == chat), 04b met (real names). Not shot: .kv1 phone canvas chip (max-width now 9em; reviewer did not verify the narrow phone clip — worth one look next pass). Shots in scratch, not in git.

PASS ed8ccb280bd395ee22caa02b8d71dd7f69b86c97 (after my fix; worker sha 48a942b2 alone = FAIL 1 (1 BLOCKING))
