#!/usr/bin/env python3
"""manifest-guard-selftest.py (cdn-kc-guard 19/11): every manifest push path goes through the floor guard. No real CDN write: the Cloudflare
calls of cdn_sync are replaced by fakes; manifests are read from the live CDN (read-only).  usage: python3 -I dev/test/manifest-guard-selftest.py"""
import json, os, sys, subprocess, tempfile, copy
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")); sys.path.insert(0, os.path.join(R, "dev", "site"))
import cdn_sync as C, manifest_guard as G
ok = fail = 0
def t(name, cond):
    global ok, fail; ok += bool(cond); fail += not cond; print(("PASS " if cond else "FAIL ") + name)
writes = []
def fake_req(method, url, data=None, ctype=None, tries=10):
    writes.append((method, url)); return 200, b'{"success":true,"result":{"etag":"x"}}'
real_req = C.req
live = G.fetch("FIGURES-kc.json"); fl = G.load_floor()
shrunk = live[:-10]
# 1. family: every FIGURES*.json + ACTS/EVENTS is guarded, other manifests are not
t("is_guarded covers FIGURES-hd.json / a new FIGURES-zz.json / ACTS / EVENTS", all(G.is_guarded(n) for n in ("FIGURES-hd.json", "FIGURES-zz.json", "ACTS.json", "EVENTS.json", "FIGURES-kc.json")) and not G.is_guarded("INFO.json"))
# 2. direct put() of a shrunk guarded manifest (the path LV1's mv_old.py/restore.py used) is refused before any network write
C.req = fake_req
try:
    C.put("img/FIGURES-kc.json", json.dumps(shrunk).encode()); t("direct put() of a shrunk FIGURES-kc refused", False)
except SystemExit as e:
    t("direct put() of a shrunk FIGURES-kc refused", "REFUSED put" in str(e) and not writes)
# 3. direct put() of the unchanged live manifest passes (guard does not block normal work)
writes.clear(); C.put("img/FIGURES-kc.json", json.dumps(live).encode()); t("direct put() of the unchanged manifest allowed", len(writes) == 1)
# 4. non-manifest put is untouched
writes.clear(); C.put("img/fig-x.webp", b"x"); t("put() of a picture is not guarded", len(writes) == 1)
# 5. DELETE of a guarded manifest is refused (real req, refused before the network)
C.req = real_req
try:
    C.req("DELETE", C.API + "/objects/img/FIGURES-kc.json"); t("DELETE of a guarded manifest refused", False)
except SystemExit as e:
    t("DELETE of a guarded manifest refused", "REFUSED DELETE" in str(e))
# 6. effective_floor: a CDN record applies only while the repo entry is the one it replaced
old = fl["FIGURES-kc.json"]; new = G.lowered(old, G.entry("FIGURES-kc.json", shrunk))
rec = {"FIGURES-kc.json": {"from": old, "repo": old, "to": new, "reason": "test", "at": "x"}}
t("effective_floor applies a sanctioned lowering while the repo floor is stale", G.effective_floor(fl, rec)["FIGURES-kc.json"] == new)
fl2 = copy.deepcopy(fl); fl2["FIGURES-kc.json"] = {"n": 999, "by": {}}
t("effective_floor ignores the record once the repo floor changed", G.effective_floor(fl2, rec)["FIGURES-kc.json"]["n"] == 999)
t("lowered() never raises a key, keeps old keys", all(new["by"][k] <= v for k, v in old["by"].items()) and set(new["by"]) == set(old["by"]))
# 7. CLI: --allow-shrink without --reason is refused
r = subprocess.run([sys.executable, "-I", os.path.join(R, "dev/site/cdn_sync.py"), "--allow-shrink", "--dry-run", "img/FIGURES-kc.json"], capture_output=True, text=True, cwd=R)
t("--allow-shrink without --reason refused", r.returncode != 0 and "--reason" in (r.stdout + r.stderr))
# 8. --prune never selects a top-level manifest (source code check of the filter)
src = open(os.path.join(R, "dev/site/cdn_sync.py")).read()
t("--prune excludes top-level *.json", 'not (k.count("/") == 1 and k.endswith(".json"))' in src)
# 9. record_sanctioned writes the CDN record + lowers the floor file (fake put, temp floor file)
tmp = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False); json.dump(fl, tmp); tmp.close()
realF, G.FLOOR = G.FLOOR, tmp.name; C.req = fake_req; writes.clear(); G_s = G.sanctioned; G.sanctioned = lambda: {}
C.record_sanctioned({"FIGURES-kc.json": (old, new)}, "selftest")
f3 = json.load(open(tmp.name)); G.FLOOR = realF; G.sanctioned = G_s; C.req = real_req; os.unlink(tmp.name)
t("record_sanctioned: CDN record written + floor file lowered", any("_floor-sanctioned.json" in u for _, u in writes) and f3["FIGURES-kc.json"] == new)
# 10. live check passes on the real CDN
r = subprocess.run([sys.executable, "-I", os.path.join(R, "dev/site/manifest_guard.py"), "--live-check"], capture_output=True, text=True, cwd=R)
t("--live-check PASS on the live CDN", r.returncode == 0)
print(f"\nmanifest-guard-selftest: {ok} pass, {fail} fail"); sys.exit(1 if fail else 0)
