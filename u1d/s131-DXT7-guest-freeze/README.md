# s131 room DXT7 guest (Fold) freeze #3, u4 b0cf6e61f03b, harness #22 (taplog + domcounters)
Third wedge, 3 of 3 at buổi 73 on the Fold GUEST seat, each right after closing «Chương 1 khép lại» (Lui):
last taps 03:43:29Z .dlg «Chương 1 khép lại» «Lui» (before it: «Bổng lộc tháng tám» «Nhịn…», «Tin trong cung buổi này» Lui x2, #kmrew «Nhận»). evaluate hangs from 03:44:14Z; renderer 40-100 % CPU, anon 4.0 GB at 03:50Z.
domcounters (nodes/listeners): guest 60s 4208/798, 360s 25184/1171, 661s 145489/14832, 961s 34254/572 (GC drop), 1261s 75802, 1561s 87776, 1861s 96545, 2161s 126361, 2461s 158000/6267, 2762s 339968/17840, 3061s 359986/18762 → DOM nodes grow to ~360k before the wedge (retained Blink nodes, listeners to 18k).
