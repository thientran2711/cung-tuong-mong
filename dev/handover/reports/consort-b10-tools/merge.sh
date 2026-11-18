#!/bin/bash
cd /home/user/wt/w59c-work; c=$1; mkdir -p $c/v; cp $c/old/*.png $c/v/; for f in $c/new/*.png; do cp $f $c/v/$(basename $f); done
