#!/bin/bash
# dl.sh : reads "name url" lines from stdin, downloads <name>.mp4 into /home/user/wt/pt in parallel
cd /home/user/wt/pt
while read n u; do [ -n "$u" ] && curl -s -o $n.mp4 "$u" & done; wait; ls -la *.mp4 | awk '{print $5,$9}' | tail -30
