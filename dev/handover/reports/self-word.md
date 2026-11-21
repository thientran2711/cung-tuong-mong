# self-word (E39) — her own words to a peer / the throne / a servant from the one address core (E39r follow-up #1 of story-voice)
PRIORITY #1 CHECK ('muội|thiếp|self word|kAddr|tx'): reports/story-voice-review.md follow-up 1 | main: jvoice kAddr (REUSED, no new rule), j67 TOK67 filler (REUSED) | review/* story-voice-land only | claims: this job.
Branch review/self-word = newest main + review/story-voice-land 54af15fa (needs its text). Head 2030714f (site build committed).

## What
- j67 TOK67 (the one road filler) gets 5 tokens, all from jvoice kAddr: {tx}/{Tx} = what SHE calls herself to the peer consort of the beat (rival {v}, else her old mistress {mis}): muội / tần thiếp / tỷ / bổn cung / ta by rank + mood; {tg}/{Tg} = what she calls that peer (muội muội / tỷ tỷ / «Hứa phi nương nương» …); {tsv} = her self word to a servant / eunuch (bổn cung from Tần up, ta below). No person → «ta» / «tỷ tỷ».
- Whole group (scan dev/test/self-word/scan.js: option labels + her quoted lines in every road file): the speaker of each line is the beat's w — to the throne (emp / th / hh) «thiếp» → «thần thiếp» (VANPHONG §2); to a peer → {tx}/{tg}; to a eunuch → {tsv}; reviewed by hand (lines starting «Thưa / Xin ngài / Xin Hoàng thượng» in a rival's beat are to the throne → «thần thiếp»). Kin lines kept (to a brother / cousin / fellow maid, the noun «tỷ muội»: 5, listed in the scan).
- Grand-ending pull / lean keys (jgedata*) renamed with their options (raw names; ge-guard 8/8). Same miss fixed on story-voice: 836eb2d6 (now in story-voice-land).

## Scan
| | before | after |
|---|---|---|
| hand-typed self / peer words in her lines (option labels + her quotes) | 132 (123 «thiếp/tỷ/muội» + 9 «muội» from the story-voice pass) | 0 (29 token lines, 5 kin lines kept) |
| runtime (fill67, same line, peer above / equal / below / she Hoàng hậu) | — | «tần thiếp … cung Hứa phi nương nương» / «bổn cung … tỷ tỷ» / «bổn cung … muội muội» / «bổn cung … Hứa tần» |

## SẴN SÀNG KIỂM self-word 2030714f
Tests: self-word/scan.js PASS · ge-guard 8/8 · story-voice/screen.js PASS · j67frame PASS (2714 hồi, no token left) · voice-core PASS · quickcheck PASS (built, old save, perf) · role-parity ALL PASS ×2 · coop-e2e 92/92 (each seat: tokens read that seat's S through kAddr).
Note: follow-up #2 («em» in jrd_td narration): the two cited lines are no longer in the file; remaining «em» are kin nouns (em trai / em gái) — left.
