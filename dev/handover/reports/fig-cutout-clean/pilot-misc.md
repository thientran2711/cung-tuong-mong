# PILOT misc (eunuch / kid / mama / man) — art worker, 16/11 ~23:50Z
START_CTX ~1% of 1M (get_session reads 0; own estimate). Roll over at ~26%, never above 60%.
Recipe = FAMILY_BRIEF verbatim: gpt-2-6, 1024x2048, 2k, refs [old CDN figure, face-consort-01/05/12/18], STYLE_ANCHOR prefix + redraw line + HANDS line + HUADIAN line (women/kids) or "no huadian" (men/eunuch) + transparent/margins line. Kids: prefix changed "clearly adult" -> "a child about 14 / 9 years old", "lovely girl / handsome little boy". Men: "NO pink, NO purple".
Credits: 12 x 65 = 780 (no retries needed). NO CDN upload. Masters are scratch (re-generate on GO).
Then finish_fig.py (900/por) + fit_fig --H 1800 (hd for all, only eunuch-u01 had a CDN hd) + qa_fig.

| file | prop / gesture | QA |
|---|---|---|
| eunuch-u01-a18 (blue, crane) | horsehair fly-whisk over forearm, other hand relaxed | PASS |
| eunuch-u05-r2-a18 (crimson) | lacquer tray, covered teacup + pastries, both hands | WARN huadian auto 0.114 (eunuch has none: reads hat band; looked: no mark) |
| eunuch-u09-r3-a18 (brown serpent) | unrolled scroll in one hand | PASS |
| kid-f01-a14 (pink girl) | round peony silk fan + hand lifting sleeve | WARN huadian auto 0.34 (unreliable); by eye tiny flower |
| kid-f05-a14 (green girl) | pipa lute, both hands | WARN auto 0.218; by eye tiny flower |
| kid-p03-a9 (crimson boy, child proportions) | red paper lantern on a stick | WARN halo 1820/10k (WARN band 1500-3000), look clean; huadian none |
| mama-k01-a18 (peach) | folded silk handkerchief + hand lifting sleeve | WARN auto 0.42; by eye tiny flower |
| mama-k05-a18 (lilac) | flower branch + hand resting on forearm, fingers shown | WARN auto 0.16; by eye tiny flower |
| man-huynh-1-a18 (navy bamboo) | folded paper fan + scroll | WARN halo 2090 (look clean) |
| man-quytu-3-a18 (dark green, sword) | one hand behind back, folded fan at chest | PASS |
| man-suthan-1-a18 (crimson fur, steppe envoy) | belt jade hand + rolled letter scroll | WARN halo 1760 (look clean) |
| man-thaiy-1-a18 (celadon physician) | medicine box + herb sprig/scroll | PASS |

LOOKED at: 12 masters on grey (all faces beautiful/handsome, skin porcelain like the praised four, frontal/calm, hands readable, five fingers, shoes/boots visible, no men in pink/purple, kids read as children and are lovely) and at native 700px face+bust crops of every file: huadians are tiny five-petal flowers (no teardrop/droplet), men/eunuch none. Nothing regenerated.
Notes/risks: (1) suthan keeps the old red fur coat (crimson is allowed for men). (2) kid-p03 boy's face is slightly older-looking than 9 but still a child; flag for the owner. (3) Eunuch u01 hat has big translucent grey wings (as in the old file). (4) qa_fig huadian auto is useless for men/kids (reads hats/hairpins) — eyes only.
Sheets: pilot-misc/<key>-{light,dark}.jpg = old (x2 upscaled, for size comparison) | new hd 1800 fitted | face+bust native 700px crop of the master.
