#!/bin/bash
# close/advance story dialogs: adv.sh dev N
D=/home/user/wt/ng-scratch; dev=$1; for i in $(seq 1 ${2:-5}); do
 o=$($D/c.sh $dev "dump"); dl=$(echo "$o" | grep '  DLG' ); echo "$dl"
 [ "$dl" = '  DLG []' ] && break
 $D/c.sh $dev "tap ^(Tạ ơn|Tiếp theo|Đã hiểu|Để sau|Lui|Tiếp|Đóng|Đa tạ|Nhận)" "wait 1500" | grep -E "tapped|NO MATCH" | cut -c1-80
done
