#!/bin/bash
# putall.sh <tag> <urls.txt> emo... : PUT <tag>_<emo>.png to the i-th url
tag=$1; u=$2; shift 2; i=1
for e in "$@"; do url=$(sed -n ${i}p $u); curl -s -o /dev/null -w "$e %{http_code}\n" -X PUT -H 'Content-Type: image/png' --data-binary @${tag}_$e.png "$url"; i=$((i+1)); done
