# rv-kit-rankunit — FAIL (one fault family, small fix)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~04:33Z #61 rank+name one unit), CLAIMS, reports, KIT.md §48.3 + kitRankText/kitRpRx/kitRpOne in j79; reuses the kit rank unit (.kname/.kti), no custom chip.

Branch: review/kit-rankunit-rv = keeper b3a96a1d + LIVE 60dd62c3 (KIT.md both sections kept, index/sw rebuilt), sha 673a9028d3ffff54fdf3f5dadd553cae36b9407d. kit-rankunit.js PASS on the keeper's cases; no-nesting (apply twice) and "known people win" confirmed.

FAIL — the generic «title Capitalised Name (2–4 words)» rule also wraps PLACE / PALACE / COUNTRY names as if they were a person's name, painting them in the rank colour:
- Scan of every string in dev/build/j*.js with the same pattern gives ~25 distinct non-person hits, e.g. «Ma ma Đức Thọ» (13 uses), «Ma ma Càn Ninh», «Thái giám Càn Thanh / Càn Ninh / Dưỡng Tâm (điện)», «Tổng quản Càn Thanh», «nữ quan Khôn Ninh», «nữ quan Đại Hy», «Thị vệ Đại Hy», «công tử Đại Hy», «cung nữ/thái giám Đức Thọ», «Công chúa Cao Ly / Ba Tư / Bắc Địch», «Cung nữ Tân Giả (khố)».
- Real render (kitRankText on the built game): «Ma ma Đức Thọ truyền lời» → <b class="kname"><span class="kti">Ma ma</span> Đức Thọ</b>; «Công chúa Cao Ly sang cống» → unit; «Cung nữ Tân Giả khố» → unit splitting a place name. The unit says "this is a person", which is false (Đức Thọ/Càn Thanh/Khôn Ninh = palaces, Cao Ly/Ba Tư/Bắc Địch/Đại Hy = lands).
Suggested fix (whole family, law 11): in the unknown-person branch (m[5]/m[6]) (a) require a 3–4 word name (story NPC names in the code are family+2: «Trịnh Thừa Chí», «Tống Thừa Chí», «Tào Đức Hải»); 2-word persons are in the people list and already win; and (b) add a short place stoplist (Đức Thọ, Càn Ninh, Càn Thanh, Khôn Ninh, Dưỡng Tâm, Tân Giả, Đại Hy, Cao Ly, Ba Tư, Bắc Địch, …) or skip when the name is followed by cung|điện|khố|viện|quốc. Add a test row with 6 of the strings above that must stay plain, and re-scan: table before/after.
Not run after the FAIL: coop-e2e, full quickcheck (stopped; the earlier quickcheck on the change is the keeper's PASS). Will run both on the fix.

## Round 2 — PASS

Keeper fix 03804680 (3–4 Capitalised words for unknown NPCs, skip when followed by cung|điện|khố|viện|quốc|phủ|các|lâu|môn|hiên|quán|sảnh, KIT_RP_PLACES stoplist; known people unchanged) + LIVE 6e07f837 merged (index/sw rebuilt) = review/kit-rankunit-rv2 sha d3f5ea2815f3fde5603969bc106c6bfca9b77e80.
- kit-rankunit.js PASS incl. the 6 must-stay-plain rows.
- My own scan: all 45 distinct title+Capitalised strings in j*.js run through the built game's kitRankText: 14 wrapped, all persons (Trịnh Thừa Chí, Tào Đức Hải, Liễu Họa Mi, Lâm Uyển Nhi, …); every palace/land string (Đức Thọ, Càn Ninh/Thanh, Khôn Ninh, Dưỡng Tâm, Tân Giả, Đại Hy, Cao Ly, Ba Tư, Bắc Địch) stays plain. Two-word person names (Tần Ngọc Hành …) stay on the known-people path.
- Looked at a Fold dialog: «Tể tướng Trịnh Thừa Chí», «nhà Tể tướng», «Hoàng hậu Liễu Họa Mi» are one coloured unit; Ma ma Đức Thọ / Công chúa Cao Ly / Thái giám Càn Thanh plain.
- coop-e2e 92/92. QUICKCHECK PASS 219 s (render 303/248, tab 500/452, buổi 1633/1278, core gates PASS, old save ok).
