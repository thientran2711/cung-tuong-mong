# PROGRESS review/art-complete

Task: owner ART COMPLETENESS rule (15/11 19:50Z). Audit every character set for 4 age bands x every reachable rank.

- Done: dev/figwork/artcomplete/audit.py (CDN index + manifests + code anchors) -> dev/art/ART_COMPLETENESS.md.
- Result: 1088 figures missing (A ages 272, B ranks 544, C legacy/long-game 272). Over the ~300 limit -> list sent to the
  coordinator, WAITING FOR GO. No art drawn, no code changed.
- Next (after go): draw with gpt-2-6 (folderReference ba4aecfe-efce-47e2-b53f-30d292091886), reference = same identity's
  nearest existing age/tier; cutcheck.py; por crop per review/por-scale rule; cdn_sync.py; add manifest records; picker
  changes listed in ART_COMPLETENESS.md (spouse ageing, eunuch rank, kid adult bands, mama rank).
- Rerun: `python3 -I dev/figwork/artcomplete/audit.py --md /tmp/table.md` then paste the table into dev/art/ART_COMPLETENESS.md (delete .cache/ to refetch; --md writes ONLY the table, the
  doc text around it is hand-written).
