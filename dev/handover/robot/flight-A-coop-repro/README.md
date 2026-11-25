# Flight A co-op stuck repro (arm A 4232709a + stuckcap 5127e083 harness overlay)
Run: SWAP=0 SEED=1 pair 1, room 9B2G, week 35 buoi 3 (night flip after week 35), host = Fold 755x1000, guest = iPad.
NOTE: harness has guest REJOIN reload only; no host / per-life true reload in co-op (F #3 ruling: do not build).

## Bug 1 block
1. **stuck** — co-op room stuck: no room week step in 240 s
   - pairs 1/1 (coop-p01-S1) · hits 1 (1 since this process started, harness 4232709a+dirty)
   - first: host {"buoi":3,"week":35,"bend":false,"pendBuoi":null,"pend":false,"sent":34,"Q":1,"Qt":["Thời tiết"],"mh":false,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":35,"bend":false,"pendBuoi":null,"pend":false,"sent":34,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - repro save: saves/coop-20261125-0223-p1-1-yr97b6.json
   - screenshots: shots/coop-p01-S1-r1-host-stuck.png, shots/coop-p01-S1-r1-guest-stuck.png (not in git)


## STUCKCAP rows (open layers + every visible button; COVERED = another element on top)
| coop-p01-S1 | 9B2G (r1) | 35 | host | fold | — | open / open | div#modal.modal z42 «Thời tiết» pic fig-consort-c07-t4-a18.webp,ph-l-light-lm.webp,por-consort-c14-ty1-a18.webp: img.kemo.kemo-gian.kemo-m-shake ok · img.kemo.kemo-binh.kemo-m-nod **COVERED** by div.knr · Đổ nước tắt hết, mặc rét Rất vững TỐN Sứ (disabled) ok · Chuyển chậu ra sân, chia người canh Rất  (disabled) ok · Báo Nội vụ phủ cử người coi lửa Rất vững (disabled) ok · Ở lại coi lò, tự tay chắn lửa Rất vững T (disabled) **COVERED** by div#modal.modal ; div#ov.ov z32 «TÀI NGHỆ Nghiệm thân: Giọt máu trong bát nước ✕ GIỌT MÁU hòa làm một Công chúa T»: ✕ **COVERED** by div#modal.modal in div#modal.modal | shots/coop-p01-S1-r1-w35-host-stuck.png |
| coop-p01-S1 | 9B2G (r1) | 35 | guest | ipad | — | hidden / hidden | no open layer | shots/coop-p01-S1-r1-w35-guest-stuck.png |
| coop-p01-S1 | 9B2G | 1 | 2.98 | 25 | 33632 | 4791 | 61.3 | 717.4 | 10.6 | 266.4 | 2431 | 770.7 · 242.2 | 664.1 · 290.6 |
| coop-p01-S1 | 9B2G | 1 | 13.78 | 90 | 44841 | 13513 | 176.4 | 1198.3 | 8.3 | 252.2 | 2465 | 1281.2 · 247 | 1121 · 257.4 |
| coop-p01-S1 | 9B2G | 2 (end) | 7.29 | 23 | 56337 | 5046 | 220.4 | 735.6 | 5.6 | 120.4 | 2906 | 822.2 · 113.2 | 649 · 127.6 |
| coop-p01-S1 | 9B2G | X | 35 | 147 | 24.1 | 44841 | 0 | 0 | 0 | 8914 |

## Reading
Host: #modal z42 «Thời tiết» (night card, 4 options) is on top of an open #ov z32 «TÀI NGHỆ Nghiệm thân: Giọt máu trong bát nước» (its ✕ COVERED by #modal). All 4 weather options report (disabled); «Sẵn sàng» nextDis:true; host Q=1 'Thời tiết', guest Q0 mh:true waiting. Why the options are disabled is not visible in the harness dump (look at the card option enable rule while S.mg/#ov overlay is open). Files: yr97b6 = repro save (host seat, localStorage hclh-save-v2-1), host/guest json = scr + tr trace, jpg = screenshots at 50%.
