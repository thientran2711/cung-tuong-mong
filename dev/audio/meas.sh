#!/bin/bash
# usage: meas.sh files... -> name dur I(LUFS) truePeak(dBFS) leadSilence(s) bytes
for f in "$@"; do
 d=$(ffprobe -v 0 -show_entries format=duration -of csv=p=0 "$f")
 r=$(ffmpeg -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | awk '/Summary/{s=1} s&&/ I:/{i=$2} s&&/Peak:/{p=$2} END{print i, p}')
 ls_=$(ffmpeg -nostats -i "$f" -af silencedetect=n=-45dB:d=0.02 -f null - 2>&1 | awk '/silence_start: -?0(\.00[0-4][0-9]*)?$/{a=1} /silence_start/&&!a{exit} a&&/silence_end/{print $5; exit}')
 echo "$(basename "$f") dur=$d I=${r% *} peak=${r#* } lead=${ls_:-0} bytes=$(stat -c %s "$f")"
done
