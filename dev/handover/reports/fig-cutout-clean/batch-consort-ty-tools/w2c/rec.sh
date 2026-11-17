#!/bin/bash
# rec.sh key sheet a18 newid [OK|HARD]
P=/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/batch-consort-ty-tools/progress
printf "%s\t%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" "${5:-OK}" >> $P/older.tsv
[ "${5:-OK}" = OK ] && printf "%s\t%s\n" "$1" "$4" >> $P/ids.tsv
