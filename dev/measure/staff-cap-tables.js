// staff-cap-table: the candidate household tables (MEASURE ONLY; BAL untouched). Row = consort rank 0..7
// (Đáp ứng, Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu) = [maids incl. the personal maid, eunuchs].
// capTh = Thái hậu [maids incl. ma ma, eunuchs]. Cold palace = row 0 in the game (j10 capOf), counted as 1 maid.
module.exports={
 A:{cap:[[1,0],[2,0],[2,1],[2,1],[3,1],[3,2],[4,2],[4,2]],capTh:[4,2],note:"live today (BAL.promo.cap)"},
 B2:{cap:[[1,0],[1,0],[2,0],[2,1],[2,1],[3,1],[3,1],[4,1]],capTh:[4,1],note:"her ladder OD L1632/L1636/02:12Z (TH 3 cung nữ + 1 ma ma + 1 thái giám)"},
 D1:{cap:[[1,0],[1,0],[2,0],[2,0],[2,1],[3,1],[3,1],[4,1]],capTh:[4,0],note:"B2, Tần no eunuch, TH 3 + 1 ma ma"},
 D2:{cap:[[1,0],[1,0],[2,0],[2,0],[2,1],[3,0],[3,1],[4,1]],capTh:[4,0],note:"D1, Quý phi no eunuch"},
 D3:{cap:[[1,0],[1,0],[2,0],[2,0],[2,1],[3,1],[3,1],[4,1]],capTh:[3,0],note:"D1, TH 2 + 1 ma ma"},
 LR:{cap:[[1,0],[1,0],[1,0],[2,1],[2,1],[3,1],[3,1],[4,1]],capTh:[4,1],note:"B2 with every low rank (ĐƯ/TT/QN) 1 each"},
 V1:{cap:[[1,0],[1,0],[2,0],[2,0],[2,1],[2,1],[3,1],[3,1]],capTh:[4,1],note:"owner OD 18/11 ~01:45Z: one more every 2 ranks, TH 4+1"},
 V2:{cap:[[1,0],[1,0],[2,0],[2,0],[2,1],[2,1],[3,1],[4,1]],capTh:[4,0],note:"owner OD 18/11 ~01:45Z variant: HH 4+1, TH 3 + 1 ma ma"},
 E:{cap:[[1,0],[1,0],[1,0],[2,0],[2,1],[3,1],[3,1],[4,1]],capTh:[3,1],note:"own: low ranks 1, Tần 2+0, eunuchs from Phi, TH 2 + 1 ma ma + 1 thái giám"}
};
