# post.sh tier cXX... : fapick (cutcheck>=4) + porcrop for the 4 figs of each lineup
cd "$(dirname "$0")"; I=/home/user/cung-tuong-mong/.claude/worktrees/agent-a4b0765092fc7d9e0/img; t=$1; shift
for c in "$@"; do for a in 18 26 36 51; do f=$I/fig-consort-$c-t$t-a$a.webp
  s=$(python3 -I cutcheck.py $f | awk '{print $1}'); if awk "BEGIN{exit !($s>=4)}"; then python3 -I fapick.py $f; fi
  python3 -I porcrop.py $f >/dev/null; done; done
for c in "$@"; do for a in 18 26 36 51; do echo -n "$c-t$t-a$a "; python3 -I cutcheck.py $I/fig-consort-$c-t$t-a$a.webp; done; done | awk '$2>=4'
