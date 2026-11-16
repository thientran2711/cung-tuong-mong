#!/bin/bash
# hb.sh src_dir name x0 y0 x1 y1 [target]
python3 hand.py $1/$2.webp hfix/$2.webp $3 $4 $5 $6 ${7:-0.085}
