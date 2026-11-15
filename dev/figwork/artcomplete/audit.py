#!/usr/bin/env python3
"""audit.py: ART COMPLETENESS audit (owner rule 15/11 19:50Z).

Every character drawn needs the 4 adult age bands a18/a26/a36/a51; a person who can rise in rank needs every rank
they can hold x 4 bands, for both the full figure (fig-*) and the portrait (por-*).

Sources
  - CDN listing  https://ctm-img.victoria-tntt.workers.dev/img/_index.json   (what files exist)
  - manifests    img/FIGURES*.json on the CDN                                (what the game's pickers can see)
  - game code    index.html (figRoles / figPick / f88Best / f88SrvRk / SRK / KCIX / CTIX / KIDBANDS / TM96V)
                 -> the rank list each set can reach; anchors are asserted below so a code change breaks the audit loudly.

  python3 -I dev/figwork/artcomplete/audit.py [--md dev/art/ART_COMPLETENESS.md] [--json out.json]
A combo counts as HAVE only when fig + por are both on the CDN and the manifest lists it (a file the manifest does not
list is never shown). Each missing combo = 1 figure to draw (+ its portrait crop)."""
import json, os, re, sys, urllib.request, argparse, collections

BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
AGES = ["a18", "a26", "a36", "a51"]
MANI = ["FIGURES", "FIGURES-servants", "FIGURES-others", "FIGURES-ty", "FIGURES-kc", "FIGURES-congtu", "FIGURES-kids"]


def get(name, cache):
    p = os.path.join(cache, name)
    if not os.path.exists(p):
        with urllib.request.urlopen(BASE + name, timeout=60) as r, open(p, "wb") as f:
            f.write(r.read())
    return json.load(open(p))


def code_facts(src):
    """read the reachable-rank facts from the game code; assert the anchors the audit relies on"""
    F = {}
    def need(pat, what):
        m = re.search(pat, src)
        if not m:
            sys.exit(f"audit: code anchor missing ({what}): {pat}")
        return m
    m = need(r'const SRK=\{maid:\[([^\]]*)\],eunuch:\[([^\]]*)\]\}', "SRK servant ranks")
    F["maid_ranks"] = len(m.group(1).split(","))           # 5: m0..m4
    F["eunuch_ranks"] = len(m.group(2).split(","))         # 4: Tiểu thái giám .. Tổng quản
    need(r'return r>=7\?4:r>=4\?3:2;return r>=5\?3:r>=3\?2:1', "srkMax (eunuch reaches rank 3)")
    need(r'if\(\(s\.mp\|\|0\)>=\(srk\(s\)\+1\)\*5&&srk\(s\)<srkMax\(o,s\)\)\{s\.rk\+\+', "servRanks promotes staff")
    need(r'function f88SrvRk\(\)', "her maid dress rank m0..m4")
    need(r'if\(who===S\.maid\|\|who\.role==="maid"\)return \(who\.age\|\|18\)>=36\|\|who\.old\?\["mama","maid"\]', "older maids take a mama face")
    need(r'if\(who\.role==="eunuch"\|\|who\.role==="eun"\)return\["eunuch"\]', "staff eunuchs use the eunuch pool")
    need(r'const mr=\(!W&&who===S\)\?f88SrvRk\(\):\(!W&&who&&who!==S&&who\.role==="maid"', "rank dress only for maids (not eunuchs/mamas)")
    need(r'L\.filter\(f=>String\(f\.tier\)==="kc"\)', "quý nữ = khuê các tier kc")
    need(r'img/FIGURES-congtu\.json",L=>\{const ix=\{\};L\.forEach', "công tử = every identity of FIGURES-congtu")
    need(r'if\(S\.month===1\)h54Pool\(\)\.forEach\(s=>s\.age\+\+\)', "công tử age yearly")
    need(r'k\.pW=\{chinh:\{name:q\.name,house:q\.house,off:q\.off,tier:q\.tier,age:q\.age', "chính phi age frozen at wedding")
    F["kidbands"] = [int(x) for x in need(r'const KIDBANDS=\[([\d,]+)\]', "kid bands").group(1).split(",")]
    tm = re.search(r"const TM96V=\{(.*?)\}\};", src, re.S)
    if not tm:
        sys.exit("audit: code anchor missing (TM96V lovers)")
    tm = tm.group(1)
    F["tm96_up"] = sorted(set(re.findall(r'"((?:official|man|physician):[a-z0-9-]+)"', tm)))
    need(r'm\.role=V\.up', "tm96 lover is promoted (role = V.up)")
    need(r'Old saves \(no S\.pid\) are left as they are,\s*look-\* faces included', "old saves keep look-* faces")
    need(r'if\(S\.pid\)return \(typeof isSrv==="function"&&isSrv\(\)\)\?1:S\.out\?-1:Math\.min\(7,S\.rank\|\|0\)\+1', "consort tier = rank+1")
    return F


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md")
    ap.add_argument("--json")
    ap.add_argument("--cache", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache"))
    a = ap.parse_args()
    os.makedirs(a.cache, exist_ok=True)
    idx = get("_index.json", a.cache)
    cdn = {e[0] for e in idx["files"]}
    src = open(os.path.join(ROOT, "index.html"), encoding="utf8").read()
    F = code_facts(src)
    # manifest records: (role, identity, tier) -> {age: (fig, por)}
    M = collections.defaultdict(dict)
    for n in MANI:
        j = get(n + ".json", a.cache)
        L = j if isinstance(j, list) else (j.get("figures") or j.get("files") or j.get("items") or [])
        for f in L:
            t = f.get("tier")
            t = "" if t is None else str(t)
            M[(f["role"], f.get("identity"), t)][str(f.get("ageBand"))] = (f.get("file") or f.get("src"), f.get("por"))

    def have(role, ident, tier, age):
        r = M.get((role, ident, tier), {}).get(age)
        return bool(r and r[0] in cdn and r[1] in cdn)

    rows = []  # set, people, ranks label, ages, expected, have, missing, note, reach

    def audit(name, role, ids, tiers, ages, note="", reach="reachable now", tierlabel=None):
        exp = hv = 0
        miss = []
        for i in ids:
            for t in tiers:
                for g in ages:
                    exp += 1
                    if have(role, i, t, g):
                        hv += 1
                    else:
                        miss.append(f"{i}/{t or 'base'}/{g}")
        rows.append(dict(set=name, people=len(ids), ranks=tierlabel or (",".join(t or "base" for t in tiers)),
                         ages="/".join(ages), expected=exp, have=hv, missing=len(miss), list=miss, note=note, reach=reach))

    C = [f"c{i:02d}" for i in range(1, 33)]
    Mi = [f"m{i:02d}" for i in range(1, 53)]
    ct = [str(t) for t in range(1, 9)]
    ty = [f"ty{t}" for t in range(1, 9)]
    mm = ["m0", "m1", "m2", "m3", "m4"][:F["maid_ranks"]]
    audit("Consorts c01-c32: rank dress t1-t8 + lãnh cung", "consort", C, ct + ["cold"], AGES, "her identity + NPC consorts (rank+1 = tier, Hoàng hậu t8)")
    audit("Consorts c01-c32: maid road dress m0-m4", "consort", C, mm, AGES, "her identity while she is a palace maid / mama (f88SrvRk)")
    audit("Consorts c01-c32: casual dress ty1-ty8", "consort", C, ty, AGES)
    audit("Maids m01-m52: maid ranks m0-m4", "maid", Mi, ["m0", ""] + mm[2:], AGES, "base file = rank 1 (Cung nữ)", tierlabel="m0,base(=m1),m2,m3,m4")
    audit("Maids m01-m52: raised to consort t1-t8 + lãnh cung", "maid", Mi, ["t%d" % t for t in range(1, 9)] + ["cold"], AGES)
    audit("Maids m01-m52: casual dress ty1-ty8", "maid", Mi, ty, AGES)
    audit("Quý nữ khuê các - consort faces c01-c32", "consort", C, ["kc"], AGES, "prince's bride pool; chính phi age is frozen at the wedding today", "a18/a26 now; a36/a51 once spouses age")
    audit("Quý nữ khuê các - maid faces m01-m52", "maid", Mi, ["kc"], AGES, "same pool (KCIX = every kc record)", "a18/a26 now; a36/a51 once spouses age")
    audit("Công tử congtu-1..10 (suitors / phò mã)", "man", [f"congtu-{i}" for i in range(1, 11)], [""], AGES, "phò mã age frozen at the wedding today", "a18/a26 now; a36/a51 once spouses age")
    audit("Quý tử quytu-1..9 (suitors)", "man", [f"quytu-{i}" for i in range(1, 10)], [""], AGES)
    audit("Hoàng tử Bắc Địch bacdich-1", "man", ["bacdich-1"], [""], AGES)
    men = ["thive-1", "thive-2", "thive-3", "thive-4", "thaiy-1", "vuonggia-1", "vuonggia-2", "nhacsu-1", "suthan-1", "suthan-2", "hoasu-1"]
    audit("Men pool (thị vệ, thái y, vương gia, nhạc sư, sứ thần, họa sư)", "man", men, [""], AGES)
    audit("Officials o1-o6", "official", [f"o{i}" for i in range(1, 7)], [""], AGES)
    audit("Physicians p1-p3", "physician", [f"p{i}" for i in range(1, 4)], [""], AGES)
    audit("Thái hậu h1-h3", "thaihau", [f"h{i}" for i in range(1, 4)], [""], AGES)
    audit("Emperor e1", "emperor", ["e1"], [""], AGES)
    audit("Mamas k01-k08", "mama", [f"k{i:02d}" for i in range(1, 9)], [""], AGES)
    audit("Eunuchs u01-u30", "eunuch", [f"u{i:02d}" for i in range(1, 31)], [""], AGES)
    # ---- rank x age combos the code can reach but no art has (B group) ----
    eu = [f"u{i:02d}" for i in range(1, 31)]
    n_eu = F["eunuch_ranks"]
    audit("Eunuchs u01-u30: rank dress (Tiểu thái giám / Thủ lĩnh / Tổng quản)", "eunuch", eu, ["r0", "r2", "r3"][:n_eu - 1], AGES,
          "staff eunuchs are promoted r0..r3 (servRanks/srkMax); art has one dress (= r1 Thái giám); picker ignores rank", "reachable now",
          tierlabel="r0,r2,r3 (base = r1)")
    audit("Mamas k01-k08: maid rank dress", "mama", [f"k{i:02d}" for i in range(1, 9)], ["m0", "m1", "m2", "m3"], AGES,
          "a maid who first gets a face at 36+ takes a mama face (figRoles) and keeps maid ranks 0..4; mama art = one dress (taken as m4 Nữ quan)",
          "reachable now", tierlabel="m0,m1,m2,m3 (base = m4)")
    up = [k for k in F["tm96_up"]]
    for role in ("official", "man", "physician"):
        ids = [k.split(":", 1)[1] for k in up if k.startswith(role + ":")]
        if ids:
            audit(f"Old-love men promoted (tm96 'up' rank): {role}", role, ids, ["up"], AGES,
                  "one tm96 ending sets m.role=V.up (e.g. Hàn lâm -> Ngự sử đại phu); no 'up' dress drawn", "1 ending of 1 story line",
                  tierlabel="up (base = pre)")
    looks = [f"look{i}" for i in range(1, 5)]
    audit("Player looks look1-4 (OLD saves without S.pid)", "player", looks, [str(t) for t in range(2, 9)] + ["cold"], AGES,
          "new games use a consort identity (complete); old saves keep look-* faces and only have t1", "old saves only",
          tierlabel="t2-t8,cold (t1 have)")
    kb = [f"a{b}" for b in (26, 36, 51)]
    for role, p in (("prince", "p"), ("princess", "f")):
        audit(f"Kids {role} {p}01-{p}24: adult bands", role, [f"{p}{i:02d}" for i in range(1, 25)], [""], kb,
              f"child bands {F['kidbands']} drawn; 17+ shows the 20 art for life", "grown children in long games", tierlabel="-")
    if a.json:
        json.dump(dict(facts=F, rows=rows), open(a.json, "w"), ensure_ascii=False, indent=1)
    tot = sum(r["missing"] for r in rows)
    out = []
    out.append("| Set | People | Ranks (dress tiers) | Age bands | Combos expected | Have | Missing | Reach in code | Note |")
    out.append("|---|---:|---|---|---:|---:|---:|---|---|")
    for r in rows:
        out.append(f"| {r['set']} | {r['people']} | {r['ranks']} | {r['ages']} | {r['expected']} | {r['have']} | **{r['missing']}** | {r['reach']} | {r['note']} |")
    out.append(f"| **Total** | | | | {sum(r['expected'] for r in rows)} | {sum(r['have'] for r in rows)} | **{tot}** | | |")
    table = "\n".join(out)
    print(table)
    print("\nmissing combos (= figures to draw, each + 1 portrait crop):", tot)
    if a.md:
        open(a.md, "w").write(table + "\n")
    return rows


if __name__ == "__main__":
    main()
