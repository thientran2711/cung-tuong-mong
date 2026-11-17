#!/bin/bash
# self-test of dev/test/img-allowlist.py in a throw-away repo: a new image is rejected (tree + staged), an allow-listed one is not.
set -e
S=$(cd "$(dirname "$0")" && pwd); T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
mkdir -p "$T/dev/test" "$T/dev/site" "$T/icons"; cp "$S/img-allowlist.py" "$T/dev/test/"; cp "$S/../site/img-allowlist.txt" "$T/dev/site/"
cd "$T"; git init -q .; git config user.email t@t; git config user.name t
printf 'x' > icons/icon-192.png; echo hi > a.txt; git add -A; git commit -qm base
python3 dev/test/img-allowlist.py >/dev/null || { echo "FAIL: allow-listed icon rejected"; exit 1; }
mkdir -p dev/shots/x; printf 'x' > dev/shots/x/a.png; git add dev/shots/x/a.png
python3 dev/test/img-allowlist.py --staged >/dev/null && { echo "FAIL: staged shot accepted"; exit 1; }
git commit -qm shot; python3 dev/test/img-allowlist.py >/dev/null && { echo "FAIL: tracked shot accepted"; exit 1; }
python3 dev/test/img-allowlist.py --ref HEAD~1 >/dev/null || { echo "FAIL: clean ref rejected"; exit 1; }
echo "img-allowlist selftest: PASS"
