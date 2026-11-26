#!/bin/bash
SP=/tmp/claude-0/-home-user-cung-tuong-mong/ae980bc1-2c5a-5bdf-9e1c-50b5e2cba8e9/scratchpad
until grep -q DONE $SP/g-sp/SUMMARY 2>/dev/null; do sleep 15; done
cd /home/user/wt/sp
PAR=3 node dev/measure/statpace.js /home/user/wt/live/index.html 3 12 0 > $SP/rob-live.jsonl 2> $SP/rob-live.err
PAR=3 node dev/measure/statpace.js /home/user/wt/sp/index.html 3 12 0 > $SP/rob-sp.jsonl 2> $SP/rob-sp.err
echo ROBOTS-DONE
