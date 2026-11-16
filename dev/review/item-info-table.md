# KIT §70 item-cell scan (review/item-info) — LUẬT SỬA CẢ NHÓM

Every kitItem / kitInvGrid / kitEquipSlots call in dev/build/j*.js, by what a TAP does. Before = origin/main, after = this branch.

| # | file:line (after) | before | after |
|---|---|---|---|
| 1 | j93.js:141 | (new) | INFO (§70 card) |
| 2 | jecon.js:114 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 3 | jgift.js:66 | GIFT PICKER (review/gift-pick) | GIFT PICKER (review/gift-pick) |
| 4 | jgift.js:116 | GIFT PICKER (review/gift-pick) | GIFT PICKER (review/gift-pick) |
| 5 | jgift.js:169 | GIFT PICKER (review/gift-pick) | GIFT PICKER (review/gift-pick) |
| 6 | jinv.js:6 | DEF (doc comment) | DEF (doc comment) |
| 7 | jinv.js:15 | GRID CELL (onPick of the caller) | GRID CELL (onPick of the caller) |
| 8 | jinv.js:19 | EMPTY (blank bag square) | EMPTY (blank bag square) |
| 9 | jinv.js:114 | (new) | SUBJ (picture of an open panel / reveal / FX) |
| 10 | jinv.js:127 | (new) | SUBJ (picture of an open panel / reveal / FX) |
| 11 | jinv.js:183 | DEF (doc comment) | DEF (doc comment) |
| 12 | jinv.js:189 | (new) | GRID CELL (onPick of the caller) |
| 13 | jinv.js:296 | INFO (slot panel) | INFO (slot panel) |
| 14 | jinv.js:300 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 15 | jinv.js:303 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 16 | jinv.js:308 | (new) | INFO (§70 card) |
| 17 | jinv.js:310 | (new) | SUBJ (picture of an open panel / reveal / FX) |
| 18 | jinv.js:315 | INFO (slot panel) | INFO (item panel) |
| 19 | jinv.js:374 | INFO (shop card) | INFO (shop card) |
| 20 | jinv.js:387 | INFO (shop card) | INFO (shop card) |
| 21 | jitd.js:73 | (new) | SAMPLE (kit page) |
| 22 | jitd.js:130 | (new) | SAMPLE (kit page) |
| 23 | jitev.js:93 | NOTAP (event item tag) | INFO (§70 card) |
| 24 | jk2b.js:732 | DEF (doc comment) | DEF (doc comment) |
| 25 | jk2b.js:748 | INFO (other person card / Tư trang) | INFO (other person card / Tư trang) |
| 26 | jk2b.js:749 | INFO (other person card / Tư trang) | INFO (other person card / Tư trang) |
| 27 | jkrev.js:34 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 28 | jkrev.js:55 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 29 | jkrev.js:67 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 30 | jkrev.js:110 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 31 | jmark.js:94 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 32 | jpet.js:174 | PET (own panel, not an item) | PET (own panel, not an item) |
| 33 | jpet.js:213 | PET (own panel, not an item) | PET (own panel, not an item) |
| 34 | jpet.js:225 | INFO (slot panel) | INFO (slot panel) |
| 35 | jpet.js:273 | PET (own panel, not an item) | PET (own panel, not an item) |
| 36 | jpetcare.js:49 | PET (own panel, not an item) | PET (own panel, not an item) |
| 37 | jtoil.js:193 | (new) | INFO (select + §70 strip) |
| 38 | jtoil.js:193 | (new) | INFO (select + §70 strip) |
| 39 | jts.js:295 | BLIND (tap = place) | INFO (select + §70 strip) |
| 40 | jts.js:295 | BLIND (tap = place) | INFO (select + §70 strip) |
| 41 | jts.js:296 | (new) | INFO (select + §70 strip) |
| 42 | jtsb.js:132 | NOTAP (demand tile) | INFO (§70 card) |
| 43 | jveil.js:133 | SUBJ (veil dialog picture / worn veil beside its acts) | SUBJ (veil dialog picture / worn veil beside its acts) |
| 44 | jveil.js:156 | SUBJ (veil dialog picture / worn veil beside its acts) | SUBJ (veil dialog picture / worn veil beside its acts) |
| 45 | jveil.js:156 | SUBJ (veil dialog picture / worn veil beside its acts) | SUBJ (veil dialog picture / worn veil beside its acts) |
| 46 | jveil.js:161 | INFO (select + own facts) | INFO (select + own facts) |
| 47 | jveil.js:167 | (new) | SUBJ (veil dialog picture / worn veil beside its acts) |
| 48 | jveil.js:198 | SUBJ (veil dialog picture / worn veil beside its acts) | SUBJ (veil dialog picture / worn veil beside its acts) |
| 49 | jwdinv.js:96 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 50 | jwdinv.js:103 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 51 | jwdinv.js:120 | INFO (slot panel) | INFO (slot panel) |
| 52 | jwdinv.js:123 | (new) | INFO (§70 card) |
| 53 | jwdinv.js:126 | (new) | INFO (§70 card) |
| 54 | jwdinv.js:132 | SUBJ (picture of an open panel / reveal / FX) | SUBJ (picture of an open panel / reveal / FX) |
| 55 | jwkr.js:84 | INFO (shop card) | INFO (shop card) |

Totals before: {"NOTAP":3,"SUBJ":19,"GIFT":3,"DEF":3,"GRID":2,"EMPTY":1,"INFO":12,"UNKNOWN":1,"PET":4,"BLIND":5}

Totals after: {"INFO":21,"SUBJ":19,"GIFT":3,"DEF":3,"GRID":2,"EMPTY":1,"SAMPLE":2,"PET":4}

Open after (BLIND / NOTAP / UNKNOWN): none
