# owner-age-ticks (W83, 18/11)
PRIORITY #1 CHECK: reused owner-age-page artifacts (4 links) + trung-y-review db pattern; no existing "sai" tick (OD none, main none, review/* none, claims none).
- Owner order 18/11 20:17Z: a tick box under every picture on the 4 age pages (18/26/36/51) to mark "drawn in the wrong style".
- Each picture (rank card + each figure in the 3-per-view lightbox) has "✗ Sai phong cách". Saved in the artifact db, collection `sai`, doc id = picture file name, doc {sai,file,person,age,label,ts}; unticking deletes the doc. So Foreman C: ArtifactData list collection `sai` on each of the 4 URLs.
- File names: rank = fig-<consort|maid>-<id>-t<n>-<age>-v<0|1|2|quoctang>; state sheet = fig-<role>-<id>-<kc|ngheo|tm1..4|tcold|cold|plain|t1..t8>-<age>; trung-y = fig-<role>-<id>-ty<n>-<age>.
- Sticky "Đã đánh dấu: N" + "Chép danh sách" (copies ticked names; backup). Falls back to localStorage if db unavailable.
- patch.py <saved page> <out> applies the change to a saved page; page-aXX.html = published sources (images/strips are artifact files, not in git).
- Checked in a local viewer emulation (db stand-in): tick -> reload -> still ticked, lightbox ticks present. Not checked on the real claude.ai viewer.
