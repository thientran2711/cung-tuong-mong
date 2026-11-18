# MOVE HOUSE — keep the SAME drawing style on a new account (Foreman C ROOT-29, 18/11 ~19:00Z real)
OWNER (verbatim ~18:58Z): "...tài khoản này là chắc đâu đó tầm 5 tiếng đồng hồ nữa, là hoặc là 4 tiếng đồng hồ nữa là phải đổi sang một tài khoản khác, bởi vì tài khoản này sắp hết hạn mức rồi đó, còn có 92% mà. ... khi mà tao thông báo là chuyển qua nhà mới đó thì mày bắt đầu cho các thợ nghỉ hay là đóng gói làm sao đó, bàn giao sau đó, để mà khi qua bên tài khoản mới á, tao muốn vậy nè, qua tài khoản mới các cái thợ vẫn phải dùng cái ROM nó lại hay sao đó để mà vẽ lại cho đẹp, chứ không phải là, bởi vì tao ghét nhất ở cái đó là qua phiên mới nè, qua tài khoản mới nè, giống như là hai con người mới vậy đó, vẽ hai phong cách hoàn toàn khác nhau, tao không có thích như vậy."
## WHEN SHE SAYS "chuyển qua nhà mới"
1. Foreman C tells every painter: finish the gen in flight, upload + cdn_sync, push report with a HANDOVER (next person / next file), make NO new gen, reply "PACKED"; then archive them.
2. Foreman C writes the STATUS HANDOVER + the TAKEOVER file for the new account's Foreman C (copy the verbatim rule lines), pushes, and tells the owner the one paste line.
## THE SAME STYLE ON THE NEW ACCOUNT (never re-invent)
- Prompts: ONLY dev/art/t8-prompt-B/build.py output (t7/t8 frozen, owner 18:20Z; t1–t6 when extended and approved). Golden check first: `python3 build.py c06 v0 --golden | cmp - golden/pB_c06.txt`.
- Magnific ids (eIyOFEidqL etc.) belong to THIS account's library and may not exist on the new one → re-upload these SAME files from the CDN into the new account's Magnific folder and write the new ids into refs.txt (only the id changes, nothing else):
  - m09 style ref = https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-maid-m09-a18.webp (the ONE style ref, owner 18:52Z)
  - each person's identity/colour ref = her a18 t1 v0: https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png
  - royal yellow target (compare only) = https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_ab_B.png (#F2C985)
  - 4 consort portraits in m09 style (pending owner decision) = .../img/_review/new-faces/style-refs-m09/face-consort-{01,05,12,18}-m09.webp
- Model + settings: Magnific gpt-2-6, 2K, transparent PNG (as refs.txt). Same folder name pattern.
- Before mass work on the new account: re-run 2 golden figures (c06 t8 v0, c25 t7 v0), put them next to the approved ones, Foreman C looks; only if they match, continue.
## STATE
See dev/handover/TAKEOVER_FOREMAN_C_ROOT30.md (painters, stops, unlooked READYs) and CLAIMS.
