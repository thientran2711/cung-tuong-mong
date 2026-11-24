#!/bin/bash
# usage: mkvid.sh clip dev
C=$1; D=$2; O=/home/user/wt/intro-design/out/$C-$D
rm -rf $O; mkdir -p $O
cd /home/user/wt/intro-design
node render.js $C $D $O 12 >$O.log 2>&1 || exit 1
ffmpeg -y -loglevel error -framerate 12 -i $O/f%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 23 -movflags +faststart $O.mp4
ffmpeg -y -loglevel error -i $O.mp4 -filter:v "setpts=0.5*PTS" -r 24 -c:v libx264 -pix_fmt yuv420p -crf 24 -movflags +faststart $O-x2.mp4
rm -rf $O
echo done $C $D >> /home/user/wt/intro-design/out/done.txt
