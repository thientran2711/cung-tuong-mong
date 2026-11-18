# kit-fit-r3-r1 review — VERDICT: PASS fad14672 (branch review/kit-fit-r3-r1 = review/kit-fit-r3 2d6a50e3 + latest origin/main, site rebuilt)
Reviewer session_01UV1SzmFpim4M3rHm45ksp9 · START_CTX ≈ 4 % · fast-forwardable (origin/main is an ancestor, checked after fetch).

## Results (all after the merge, CSS px)
1. Luân hồi cards (every picker uses nlCard → kitRoulette, one code path, solo + co-op): looked at shots 1180x820, 755x1000, 412x1058, 390x844 (1366x1024 measured: card 233, side 69/68, gap 16).
   Cards span the background with margins, title + moon wheel visible above, Tiếp/Bỏ qua below, equal gaps, no overflow, no horizontal scroll. Phone portrait shows the normal rotate prompt over the cards (existing behaviour).
2. Face picker: 0 tabs, set by identity: phi tần 84 (32 consort + 52 maid), cung nữ 52, all 5 sizes x {solo, cung nữ}. Looked at 1180x820 shots (84 and 52).
3. 'Thân phận kiếp này': name + age line inside the scroll region at 5 sizes (kit-fit3 idn rows) and looked at iPad + Fold shots; Fold figure column fine.
4. Tests: kit-fit3 0 violations · kit-fit 0 · kit-fit2 0 · coop-e2e 59/59 (both seats, reborn path, solo + old save) · quickcheck PASS 153 s (old save ok).
CDN folder img/_review/kit-fit-r3 wiped.

## Open point (worker's question): cung nữ default face
Confirmed: pidRoll/pidKeys only draw consort:cNN, so a cung nữ life starts on a consort pid and her current face is not highlighted in the 52 list.
RECOMMEND yes, make the default a maid face (pidRoll draws from the maid ids when origin is cnv/isSrv), as a follow-up task, NOT a blocker: it touches the pid format + figure lookup + saves (old saves keep their pid), needs its own test. Owner's rule "máy tự chọn" is met for the picker.

## Notes (non-blocking)
- Pager caption still reads "trang 2/6 · 84 dung mạo" (a count). Owner's "no counts" referred to the tabs; if she objects, drop the number from that caption.
