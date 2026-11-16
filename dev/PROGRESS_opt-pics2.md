# PROGRESS review/opt-pics2 (D53) - option-card pictures still on the act placeholder

Base: origin/main + origin/review/placeholder-pics2 (missing_pics tool; generated index/sw/assets taken from main, rebuilt).
Art: Magnific gpt-2-6 only, folderReference ba4aecfe..., style ref = opt-thoi (hands-only house style), every image looked at, none redone.
29 new group pictures `img/act-opt-<group>.webp` (384x506 WebP, 24-48 KB each, ~1.1 MB total), uploaded to the CDN (cdn_sync.py).
Magnific ids per key: dev/art/optpics2/gens.txt. Title -> key mapping seen in a fresh life: dev/art/optpics2/map.json.
Rules: new entries at the top of `KIT_OPT_RULES` in dev/build/jopic.js (same mechanism as review/opt-pics, nothing new in the kit).
Reused existing act pictures (looked at): do-la-h (Hỏi ...), minh-oan-h, lam-nhu-khong-thay-h, o-yen-nghi-h, doc-sach-giai-khuay, deo-mang-che-h, opt-canh-giu (phòng bị).
Skipped: person-name choices (Phi/Quý nhân/Quý phi/Tần/Thường tại/Hoàng hậu X, "???", cung nữ thân tín, thái giám) = portrait fallback.
Before/after (fresh life, dev/tools/missing_pics.js): option cards on placeholder 61 -> 18 (non-person 45 -> 2; the 2 are titles of another life).
Other lives show other titles (run-time templates); rerun the tool and add a regex line to KIT_OPT_RULES (+ paint) as needed.
Smoke 755x1000: page loads, 0 page errors, kitOptPic on all 47 non-person titles resolves (only the 2 NPC-name titles stay on placeholder).
Resume: bash dev/site/build_site.sh; node dev/tools/missing_pics.js <url> out.json dev/art/MISSING_PICS.md.

## Reviewer r1 (2026-11-16)
All 30 act-opt-*.webp looked at (contact sheet): fit meanings, hands-only style, no men in pink/purple, nobody poor; sizes 24.8-51.4 KB.
Title scan (13254 string literals from dev/build/j*.js, old vs new KIT_OPT_RULES): 48 titles changed picture, ALL were on the placeholder before; none stolen from an existing group.
missing_pics on branch base: option cards on placeholder 61 -> 18 (person names + 2 titles of another life). Layout: picture left / info right at 755x1000 and 844x390, no page errors.
Non-blocking: "Thuê thợ thêu ngoài cung" shows opt-canh-giu (padlock door) via the older "thuê thợ" rule (pre-existing); bo-bac is close in meaning to dut-bac-rut-loi-h (accepted, different files/compositions).
Merged onto origin/main 4f5e5f3b3: conflicts in jevban.js (kept main's map + e68:flowerBloom), generated index/sw/assets rebuilt.
