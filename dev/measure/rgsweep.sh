#!/bin/bash
# usage: bash dev/measure/rgsweep.sh '<BALJ>' <lives> <outfile> : runs rgpure for each side in turn (one browser at a time)
for s in ${SIDES:-ngoai emp th quyen}; do BALJ="$1" NODE_PATH=$(npm root -g) timeout ${TMO:-400} node dev/measure/rgpure.js dev/index.html $s $2 42 >> $3 2>&1; done
