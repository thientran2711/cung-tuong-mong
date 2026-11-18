#!/usr/bin/env python3
"""img-allowlist.py: reject image/video files in git outside dev/site/img-allowlist.txt (owner OD:L203; 16/11 18:50Z).
Test shots, review shots, owner screenshots, figure sheets, CDN staging copies: NEVER in git (keep them in scratch, or on the CDN
review folder wiped after the verdict). Approved art lives on Cloudflare only (dev/art/CDN.md).

  python3 dev/test/img-allowlist.py            check every tracked file of the current checkout (git ls-files)
  python3 dev/test/img-allowlist.py --ref REF  check the tree of a commit/branch (git ls-tree -r), e.g. a sha before go-live
  python3 dev/test/img-allowlist.py --staged   check only files added/copied/modified/renamed in the index (pre-commit)
  python3 dev/test/img-allowlist.py --list     print the offending files (default prints the first 20)
Exit 0 = clean, 1 = offenders (printed), 2 = not a git checkout / usage error. A build run outside git (no .git) is skipped with exit 0."""
import fnmatch, os, subprocess, sys

EXT = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico", ".avif", ".bmp", ".tif", ".tiff", ".heic", ".heif",
       ".mp4", ".webm", ".mov", ".m4v", ".apng")
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ALLOW = os.path.join(R, "dev", "site", "img-allowlist.txt")


def patterns(text=None):
    out = []
    for ln in (text if text is not None else open(ALLOW, encoding="utf-8").read()).splitlines():
        ln = ln.split("#", 1)[0].strip()
        if ln:
            out.append(ln)
    return out


def git(*a, cwd=R):
    return subprocess.run(["git", *a], cwd=cwd, capture_output=True, text=True)


def files(mode, ref):
    if mode == "staged":
        r = git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z")
    elif ref:
        r = git("ls-tree", "-r", "--name-only", "-z", ref)
    else:
        r = git("ls-files", "-z")
    if r.returncode:
        sys.stderr.write(r.stderr or "git failed\n")
        sys.exit(2)
    return [p for p in r.stdout.split("\0") if p]


def main():
    args = sys.argv[1:]
    mode = "staged" if "--staged" in args else "tree"
    ref = args[args.index("--ref") + 1] if "--ref" in args else None
    full = "--list" in args
    if not os.path.isdir(os.path.join(R, ".git")) and not os.path.isfile(os.path.join(R, ".git")):
        print("img-allowlist: not a git checkout, skipped")
        return 0
    pats = patterns()
    bad = [p for p in files(mode, ref) if p.lower().endswith(EXT) and not any(fnmatch.fnmatchcase(p, g) for g in pats)]
    if not bad:
        print("img-allowlist: OK (no image outside the allow-list)")
        return 0
    print(f"img-allowlist: FAIL, {len(bad)} image file(s) in git outside dev/site/img-allowlist.txt:")
    for p in (bad if full else bad[:20]):
        print("  " + p)
    if not full and len(bad) > 20:
        print(f"  ... +{len(bad) - 20} more (--list shows all)")
    print("Pictures live on Cloudflare (python3 dev/site/cdn_sync.py), shots go to scratch (never git). Remove with: git rm --cached <file>")
    return 1


if __name__ == "__main__":
    sys.exit(main())
