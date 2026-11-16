#!/usr/bin/env python3
"""cdn_sync.py: keep the game's pictures (img/) and sounds (audio/) on Cloudflare R2 instead of git (dev/art/CDN.md).

  Bucket ctm-img (account 7fc1b88a522c6a91b40051536fa02cae), served read-only by the Worker https://ctm-img.victoria-tntt.workers.dev
  (cdn/worker). Object key = the repo path, e.g. img/fig-consort-c01-t1-a18.webp -> https://ctm-img.victoria-tntt.workers.dev/img/fig-...

  python3 dev/site/cdn_sync.py                 push new/changed files of img/ and audio/ on disk (compared by MD5 = R2 etag)
  python3 dev/site/cdn_sync.py img/fig-x.webp img/FIGURES.json    push only these files / folders
  python3 dev/site/cdn_sync.py --dry-run       show what would be uploaded, upload nothing
  python3 dev/site/cdn_sync.py --check         compare only; exit 1 when something differs or is missing on the CDN
  python3 dev/site/cdn_sync.py --git origin/review/men     push img/ + audio/ as they are in that git tree (before merging a branch
                                               that still carries pictures; no checkout needed)
  python3 dev/site/cdn_sync.py --git REF --missing-only    only keys the CDN does not have yet (never overwrite)
  python3 dev/site/cdn_sync.py --pull [globs]  download from the CDN into img/ audio/ (default: the *.json manifests only;
                                               --pull 'img/fig-maid-*' or --pull all) — files that differ locally are replaced
  python3 dev/site/cdn_sync.py --index         only rebuild img/_index.json (the list of every object with hash and size)
  --wipe-review TOPIC                          DELETE every object under img/_review/TOPIC/ (review shots live there while a verdict is
                                               pending, never in git; wipe them with the verdict) and rebuild the index; --dry-run lists only
  --prune                                      also DELETE objects under the synced folders that are not in the source (careful)
  --force                                      push a *.json manifest even if someone else changed it on the CDN since your last pull

  Manifests (img/*.json) are shared by every worker: pull right before editing, push right after. A push of a manifest whose CDN copy
  changed since this machine last pulled/pushed it is refused (merge first, or --force).
  After every push img/_index.json is rebuilt from the full bucket listing: [[key, md5[:16], size], ...] (used for offline precache).
  Auth: api.cloudflare.com. In Claude sessions the proxy adds the key (nothing to set). Elsewhere set CLOUDFLARE_API_TOKEN
  (R2 edit). CLOUDFLARE_ACCOUNT_ID optional."""
import argparse, concurrent.futures as cf, fnmatch, hashlib, json, os, subprocess, sys, threading, time, urllib.error, urllib.parse, urllib.request

ACCOUNT = os.environ.get("CLOUDFLARE_ACCOUNT_ID") or "7fc1b88a522c6a91b40051536fa02cae"
BUCKET = os.environ.get("CTM_BUCKET") or "ctm-img"
PUBLIC = os.environ.get("CTM_IMG_BASE") or "https://ctm-img.victoria-tntt.workers.dev/"
API = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/r2/buckets/{BUCKET}"
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
STATE = os.path.join(R, "dev", "site", ".cdn-state.json")  # untracked: md5 of manifests last pulled/pushed from this checkout
TOPS = ("img",)  # audio/ (4.6 MB, rarely changes) stays in git
INDEX = "img/_index.json"
TYPES = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "gif": "image/gif", "svg": "image/svg+xml",
         "avif": "image/avif", "json": "application/json", "txt": "text/plain; charset=utf-8", "mp3": "audio/mpeg", "ogg": "audio/ogg",
         "m4a": "audio/mp4", "woff2": "font/woff2", "mp4": "video/mp4", "webm": "video/webm"}
SKIP = (".DS_Store", "Thumbs.db")


# Cloudflare's API allows ~1200 requests / 5 min for the whole account key (shared with every other session and the co-op deploys):
# keep to RATE requests per second and back off on 429.
RATE = float(os.environ.get("CTM_CDN_RATE") or 3.2)
_lock = threading.Lock()
_next = [0.0]


def _pace():
    with _lock:
        now = time.time()
        t = max(now, _next[0])
        _next[0] = t + 1.0 / RATE
    if t > now:
        time.sleep(t - now)


def req(method, url, data=None, ctype=None, tries=10):
    h = {"User-Agent": "ctm-cdn-sync"}
    tok = os.environ.get("CLOUDFLARE_API_TOKEN")
    if tok and url.startswith("https://api.cloudflare.com/"):
        h["Authorization"] = "Bearer " + tok
    if ctype:
        h["Content-Type"] = ctype
    for i in range(tries):
        if url.startswith("https://api.cloudflare.com/"):
            _pace()
        wait = min(60, 1.5 * 2 ** i)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, data=data, method=method, headers=h), timeout=120) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            body = e.read()
            if e.code == 404 and method in ("GET", "DELETE"):
                return 404, body
            if e.code < 500 and e.code != 429 or i == tries - 1:
                raise SystemExit(f"{method} {url} -> HTTP {e.code}: {body[:300]!r}")
            if e.code == 429:
                try:
                    wait = max(wait, float(e.headers.get("Retry-After") or 0))
                except ValueError:
                    pass
                wait = max(wait, 20)
                with _lock:
                    _next[0] = max(_next[0], time.time() + wait)
        except Exception as e:  # network cut, timeout: retry
            if i == tries - 1:
                raise SystemExit(f"{method} {url} failed: {e}")
        time.sleep(wait)


def remote_list():
    """{key: (md5, size)} for every object in the bucket."""
    out, cursor = {}, None
    while True:
        q = {"per_page": "1000"}
        if cursor:
            q["cursor"] = cursor
        _, b = req("GET", API + "/objects?" + urllib.parse.urlencode(q))
        j = json.loads(b)
        for o in j.get("result") or []:
            out[o["key"]] = (o["etag"].strip('"'), int(o["size"]))
        ri = j.get("result_info") or {}
        cursor = ri.get("cursor")
        if not (ri.get("is_truncated") and cursor):
            return out


def keyurl(key):
    return urllib.parse.quote(key, safe="/-_.~")


def put(key, data):
    ext = key.rsplit(".", 1)[-1].lower()
    _, b = req("PUT", API + "/objects/" + keyurl(key), data=data, ctype=TYPES.get(ext, "application/octet-stream"))
    j = json.loads(b)
    if not j.get("success"):
        raise SystemExit(f"upload {key}: {b[:300]!r}")
    return j["result"]["etag"].strip('"')


def md5(b):
    return hashlib.md5(b).hexdigest()


def want(key, sel):
    if os.path.basename(key) in SKIP or key == INDEX:
        return False
    return not sel or any(key == s or key.startswith(s.rstrip("/") + "/") or fnmatch.fnmatch(key, s) for s in sel)


def disk_sources(sel):
    """{key: loader} from img/ and audio/ on disk."""
    src = {}
    for top in TOPS:
        for root, ds, fs in os.walk(os.path.join(R, top)):
            ds.sort()
            for f in sorted(fs):
                key = os.path.relpath(os.path.join(root, f), R).replace(os.sep, "/")
                if want(key, sel):
                    src[key] = (lambda p=os.path.join(root, f): open(p, "rb").read())
    return src


def git_sources(ref, sel):
    ls = subprocess.run(["git", "-C", R, "ls-tree", "-r", "-z", ref, "--", *TOPS], check=True, capture_output=True).stdout
    blobs = {}
    for ent in ls.split(b"\0"):
        if not ent:
            continue
        meta, path = ent.split(b"\t", 1)
        mode, typ, sha = meta.split()
        key = path.decode()
        if typ == b"blob" and mode != b"120000" and want(key, sel):
            blobs[key] = sha.decode()
    return {k: (lambda s=s: subprocess.run(["git", "-C", R, "cat-file", "blob", s], check=True, capture_output=True).stdout)
            for k, s in blobs.items()}


def load_state():
    try:
        return json.load(open(STATE))
    except Exception:
        return {}


def save_state(st):
    try:
        json.dump(st, open(STATE, "w"), indent=0, sort_keys=True)
    except Exception:
        pass


def write_index(remote=None):
    remote = remote if remote is not None else remote_list()
    files = sorted([k, v[0][:16], v[1]] for k, v in remote.items() if k != INDEX)
    body = {"note": "every object on the CDN (dev/site/cdn_sync.py): [key, md5[:16], bytes]; key = path under " + PUBLIC,
            "base": PUBLIC, "v": hashlib.sha256(json.dumps(files).encode()).hexdigest()[:12], "n": len(files),
            "bytes": sum(f[2] for f in files), "files": files}
    put(INDEX, json.dumps(body, separators=(",", ":"), ensure_ascii=False).encode())
    print(f"index {INDEX}: {body['n']} files, {body['bytes'] / 1e6:.1f} MB, v={body['v']}")
    return body


def pull(globs):
    remote = remote_list()
    sel = [] if globs == ["all"] else (globs or ["img/*.json", "audio/*.json"])
    keys = [k for k in remote if k != INDEX and (not sel or any(fnmatch.fnmatch(k, g) or k.startswith(g.rstrip("/") + "/") for g in sel))]
    st = load_state()
    todo = []
    for k in sorted(keys):
        p = os.path.join(R, k)
        if os.path.exists(p) and md5(open(p, "rb").read()) == remote[k][0]:
            if k.endswith(".json"):
                st[k] = remote[k][0]
            continue
        todo.append(k)

    def get(k):
        for i in range(6):
            try:
                with urllib.request.urlopen(urllib.request.Request(PUBLIC + keyurl(k), headers={"Cache-Control": "no-cache", "User-Agent": "ctm-cdn-sync"}), timeout=120) as r:
                    b = r.read()
                if md5(b) == remote[k][0]:
                    break
            except Exception:
                pass
            time.sleep(1.5 * 2 ** i)
        else:
            raise SystemExit("download failed: " + k)
        os.makedirs(os.path.dirname(os.path.join(R, k)), exist_ok=True)
        open(os.path.join(R, k), "wb").write(b)
        return k, len(b)

    n = by = 0
    with cf.ThreadPoolExecutor(12) as ex:
        for k, sz in ex.map(get, todo):
            n += 1; by += sz
            if k.endswith(".json"):
                st[k] = remote[k][0]
            if n % 200 == 0:
                print(f"  pulled {n}/{len(todo)}", flush=True)
    save_state(st)
    print(f"pull: {len(keys)} on CDN match, {n} downloaded ({by / 1e6:.1f} MB) into {R}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", help="files/folders/globs under img/ or audio/ (default: all)")
    ap.add_argument("--git", metavar="REF")
    ap.add_argument("--missing-only", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--prune", action="store_true")
    ap.add_argument("--wipe-review", metavar="TOPIC")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--pull", action="store_true")
    ap.add_argument("--index", action="store_true")
    ap.add_argument("-j", type=int, default=6, help="parallel uploads (default 6; the API pace CTM_CDN_RATE=3.2/s is the real limit)")
    a = ap.parse_args()
    sel = []
    for p in a.paths:
        if os.path.isabs(p) or os.path.exists(p):
            p = os.path.relpath(os.path.abspath(p), R)
        p = p.replace(os.sep, "/")
        sel.append(p[2:] if p.startswith("./") else p)
    if a.wipe_review:
        topic = a.wipe_review.strip("/")
        if not topic or ".." in topic or "/" in topic:
            raise SystemExit("--wipe-review takes one topic name (a folder directly under img/_review/)")
        pre = f"img/_review/{topic}/"
        gone = sorted(k for k in remote_list() if k.startswith(pre))
        print(f"wipe-review: {len(gone)} object(s) under {pre}" + (" (dry run, nothing deleted)" if a.dry_run else ""))
        if a.dry_run or not gone:
            return
        for k in gone:
            req("DELETE", API + "/objects/" + keyurl(k))
        write_index()
        return
    if a.pull:
        return pull(sel)
    if a.index:
        return write_index()
    src = git_sources(a.git, sel) if a.git else disk_sources(sel)
    if not src:
        print("nothing to sync (no files under img/ audio/ matched)")
        return
    t0 = time.time()
    remote = remote_list()
    st = load_state()
    todo, same, held, sizes = [], 0, [], {}

    def hash_one(k):
        b = src[k]()
        return k, md5(b), len(b)

    with cf.ThreadPoolExecutor(8) as ex:
        hashed = list(ex.map(hash_one, sorted(src)))
    for k, h, sz in hashed:
        sizes[k] = sz
        r = remote.get(k)
        if r and r[0] == h:
            same += 1
            if k.endswith(".json"):
                st[k] = h
            continue
        if r and a.missing_only:
            continue
        if r and k.endswith(".json") and not a.force and st.get(k) and st[k] != r[0]:
            held.append(k)
            continue
        todo.append((k, h))
    gone = []
    if a.prune and not a.missing_only:
        tops = {k.split("/", 1)[0] for k in src}
        gone = sorted(k for k in remote if k != INDEX and k.split("/", 1)[0] in tops and k not in src and want(k, sel))
    tot = sum(sizes[k] for k, _ in todo)
    print(f"source {'git ' + a.git if a.git else 'disk'}: {len(src)} files, {sum(sizes.values()) / 1e6:.1f} MB · CDN has {len(remote)} objects"
          f" · same {same} · to upload {len(todo)} ({tot / 1e6:.1f} MB){' · to delete ' + str(len(gone)) if gone else ''}")
    for k in held:
        print(f"  HELD {k}: changed on the CDN since your last pull/push — run --pull {k}, merge, push again (or --force)")
    if a.check or a.dry_run:
        for k, _ in todo[:40]:
            print("  " + ("new " if k not in remote else "changed ") + k)
        if len(todo) > 40:
            print(f"  … {len(todo) - 40} more")
        for k in gone[:20]:
            print("  delete " + k)
        if a.check and (todo or held):
            sys.exit(1)
        return
    done, by = 0, 0

    def up(item):
        k, h = item
        e = put(k, src[k]())
        if e != h:
            raise SystemExit(f"{k}: CDN etag {e} != local md5 {h}")
        return k, h

    with cf.ThreadPoolExecutor(max(1, a.j)) as ex:
        for k, h in ex.map(up, todo):
            done += 1; by += sizes[k]; remote[k] = (h, sizes[k])
            if k.endswith(".json"):
                st[k] = h
            if done % 250 == 0 or done == len(todo):
                el = time.time() - t0
                print(f"  {done}/{len(todo)} · {by / 1e6:.1f} MB · {el:.0f} s", flush=True)
    for k in gone:
        req("DELETE", API + "/objects/" + keyurl(k))
        remote.pop(k, None)
    save_state(st)
    if todo or gone or INDEX not in remote:
        remote = remote_list()  # authoritative listing (also catches other workers' uploads) for the check + index
        up_set = set(todo)
        bad = [k for k, h, sz in hashed if (k, h) in up_set and remote.get(k) != (h, sz)]
        if bad:
            raise SystemExit(f"after upload {len(bad)} files do not match on the CDN, e.g. {bad[:5]}")
        write_index(remote)
    print(f"done: uploaded {done} ({by / 1e6:.1f} MB), deleted {len(gone)}, unchanged {same}, held {len(held)} in {time.time() - t0:.0f} s")
    if held:
        sys.exit(2)


if __name__ == "__main__":
    main()
