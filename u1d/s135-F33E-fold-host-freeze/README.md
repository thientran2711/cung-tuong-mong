# s135 room F33E: Fold HOST + Fold GUEST, u4 7959f1b5 b0cf6e61f03b, harness #24+#25 (handles disposed, domcounters, taplog)
Fold HOST wedged at buổi 61 (evaluate >15 s from 06:42:36Z, CDP pause timed out), 4.0-4.2 GB RSS at 06:48Z, main thread 100 % CPU.
LAST TAPS host: #kmrew «Nhận» → .dlg «Bạc» Lui → «Tin trong cung buổi này» Lui → «Bổng lộc tháng bảy» «Vì sao» → «Lễ tấn phong Tăng Liên Y» «Gửi lễ mừng» → «Thỉnh bình an mạch» «Lui» (06:42:05Z).
With #25 the retained DOM is FLAT: host nodes 2.1k@61s, 8.3k@300s, 16k@1021s, 18.5k@1260s, 18.9k@1501s, 17.5k@1741s, 17.7k@1981s (listeners ~1.4-1.6k), JS heap ~103 MB — yet the renderer RSS went 1.3 GB (1861 s) → 3.2 GB (2238 s) → 4.0 GB: a sudden native runaway, NOT a node/heap leak. Guest (Fold) alive at the same time: 13.9k nodes, ~1.2 GB.
