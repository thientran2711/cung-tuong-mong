#!/bin/bash
# m.sh "Act1" "Act2" ... : do the month's actions, then +1 THÁNG; prints new text after the month turn
D=$(dirname "$0")
for a in "$@"; do
  "$D/c.sh" "{\"op\":\"click\",\"t\":\"$a\",\"exact\":true,\"wait\":1300}" | grep -E "^ERR|: " | tail -2
done
"$D/c.sh" '{"op":"click","t":"THÁNG","exact":true,"wait":2500}' | tail -40
