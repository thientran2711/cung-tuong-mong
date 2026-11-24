#!/bin/sh
# publish.sh "<commit msg>": page + CDN upload + commit/push branch; prints page link
set -e
cd /home/user/cung-tuong-mong
python3 dev/art/kp23-redraw/gen_page.py
python3 dev/site/cdn_sync.py img/_review/kp23-redraw img/_review/kp23-redraw.html 2>&1 | tail -1
git add dev/art/kp23-redraw
git commit -qm "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01D3E3Nb2mBXpN4uFSbJU4tN"
git pull -q --rebase origin review/kp23-redraw && git push -q origin HEAD:review/kp23-redraw
echo "sha $(git rev-parse --short HEAD) link https://ctm-img.victoria-tntt.workers.dev/img/_review/kp23-redraw.html?v=$(cat dev/art/kp23-redraw/page_ver.txt)"
