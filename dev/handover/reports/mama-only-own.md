# mama-only-own — person only for a real announcer (owner 25/11 ~06:55Z, law 11)

PRIORITY #1 CHECK: OD 3 | ledger 0 | claims 2 | main 15 (jpdlg.js kitPersonDlg, jtut.js x6, jgoal.js kitCoach) | review/* 0 | archive 0.

## Fix (kit part, not per screen)
- `kitPersonDlg({noPerson:true,pic})` in `dev/build/jpdlg.js` (KIT §50.2): same frame (--kpw x --kph), same header / text / buttons; no figure column, no name chip, no «X dặn»; event / subject picture banner on top, text below.
- `kitTip` and `kitCoach` default to noPerson; `person:true` only for a real announcer. Tip picture = the topic's own picture (`ia(title)`), else Hành sự.
- Real announcers kept: tour steps + «Lời dặn tân thủ» ask (Tống ma ma teaches lễ, text in her own voice {M}/{m}). Judgement call, tell sếp if she wants those without ma ma too.
- KIT.md §50.2 rule line + kit sample §50.2 gets a no-person button.

## Scan (`python3 dev/test/mama-scan.py`) — before: every site showed Tống ma ma
| site | topic | speaker before | real announcer? | after |
|---|---|---|---|---|
| jtut TIPS["tab-act"] | Hành sự | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-go"] | Dư đồ | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-rv"] | Phi tần | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-rel"] | Giao tình | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-fac"] | Phe phái | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-court"] | Chí tôn | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-men"] | Nam nhân | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-staff"] | Cung nhân | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-kid"] | Hoàng tự | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-inv"] | Tư trang | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-art"] | Tài nghệ | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-story"] | Mệnh truyện | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tab-log"] | Sổ ghi | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["que"] | Quẻ đầu tuần | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["minigame"] | Trò nhỏ | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["muuke"] | Mưu kế | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["thitam"] | Thị tẩm | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["thai"] | Có thai | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tuyentu"] | Tuyển tú | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["tranhghe"] | Tranh ghế | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["lanhcung"] | Lãnh cung | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["luanhoi"] | Luân hồi | Tống ma ma | no (mechanics tip) | no person |
| jtut TIPS["coop"] | Chơi cùng bạn | Tống ma ma | no (mechanics tip) | no person |
| jtut show() tour steps | Lời dặn tân thủ (tour) | Tống ma ma | YES (she teaches lễ, text in her voice) | person (person:true) |
| jtut askOnce | Lời dặn tân thủ (hỏi nghe lại) | Tống ma ma | YES | person (person:true) |
| jgoal kitCoach | Mệnh truyện · việc kế (ring the lit card) | Tống ma ma | no (system hint) | no person |
| jkitpage §50.2 sample | kit sample | ma ma | sample | person sample + no-person sample |


## Tests (real touch taps via CDP + elementFromPoint hit-check; `node dev/test/mama-only-own.js <url> <out>`)
Fold 755x1000 + iPad 1180x820: all 22 tips open with no figure / name / «ma ma»; «Đã hiểu» tap closes each; the person frame (announcer) keeps the figure and closes by tap; no page errors. Result: 52 checks, 0 failed.
Not covered: ✕ (the tip frame has no ✕ button in the kit; only «Đã hiểu»). The «Đã hiểu» button is the owner's 04:15Z fault; taps work here.
Shot (CDN img/_review/mama-only-own/pair.jpg): top row before (Fold | iPad), bottom row after.
