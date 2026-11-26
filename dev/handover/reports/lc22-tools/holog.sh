# usage: holog.sh <file-rel> <line> [<file2-rel> <line2>]  — append lines on fresh handover tip, push (retry)
cd /home/user/wt/ho; for i in 1 2 3 4; do flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin claude/cung-tuong-mong-handover-hj0h8w; git reset -q --hard origin/claude/cung-tuong-mong-handover-hj0h8w
echo "$2" >> "$1"; [ -n "$3" ] && echo "$4" >> "$3"; git commit -qam "LC23 log" && git push -q origin HEAD:claude/cung-tuong-mong-handover-hj0h8w && echo OK && exit 0; sleep 3; done; exit 1
