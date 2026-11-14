# PROGRESS — review/loading (nhập cung lần đầu: thỉnh tranh/tiếng về máy)
Base origin/main 574f560 + merge origin/review/page-curl (owner rule: shots on the approved layout).
## Done
- dev/site/assets.py → assets.json [path, sha256/16, bytes, core|fig] (hash cache dev/site/.assets-cache.json, untracked).
  core = UI/kit/scenes/maps/items/sounds 1195 files 83.5 MB; fig = fig/por/ev/st/map-fest 9237 files 549 MB (ordered emperor → … → maid, tier, age).
- dev/site/sw.tpl.js → sw.js (build_site.sh): shell cache ctm-shell-<content hash of index+manifest+assets.json+JSON> (no timestamp:
  unchanged build = no SW update); asset cache ctm-assets keyed path?h=hash, never wiped, activate prunes only keys not in assets.json;
  navigation network-first with 4 s fallback; JSON network-first → shell; Range → 206 from cache (<audio>); cross-origin (co-op worker) and
  requests with x-ctm-load bypass the SW.
- dev/build/jload.js (assemble.py before j84): loading screen (KIT §33), kitProgress, background chip (lifted above tab bar/title panel,
  tap = pause), legacy ctm-<ts> cache migration by content, storage.persist/estimate, quota/offline/net errors + "Vào cung ngay"/"Thỉnh tiếp".
- Tests dev/test/load-e2e.js (cold | ipad | update | chip), dev/test/load-migrate.js. Shots dev/shots/loading/.
## Numbers (local server, CDP 20 Mbit/s 60 ms)
- enter after 53 s (83.5 MB); background 549 MB in 118 s unthrottled; total cache 643 MB, 10432 keys.
- offline reload: title in ~3.4 s, new life plays, 0 broken images. Rebuild with one changed image: exactly 1 file downloaded.
- legacy cache (1195 core files in ctm-<ts>): 0 re-downloaded, migrated in ~10 s.
## Open
- Kit review of §33 (loading screen + chip).
