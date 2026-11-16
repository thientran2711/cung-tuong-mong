# review/book-fig — book-page figure scale (KIT §34.6)
Owner 16/11: "Nhân vật sao chưa theo tỉ lệ chuẩn" (Tuần lục p.7-8, iPad 1180). Cause: the book sized the picture BOX, silhouettes have no margin, and a wide real figure was shrunk to >=85 %.
Fix: kitBookFig (jkit) = one body rule; jsl person pages + jbook kitBookPic use it; never scaled to fit (cut at the column edge); url(#kfa) on .kbp-fig.
Test: SHOTS=1 node dev/test/book-fig-scale.js <page.html> <outdir>. Before/after table in the coordinator report.
