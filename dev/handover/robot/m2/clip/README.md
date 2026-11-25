# M2 clip evidence (flight M2, thd_tho, SEED 102, Fold 755x1000)
- tinbao-options-unreachable-clip.png / layout-phutuyen-options-clipped.png: real shots from the robot life on 0756a05b (Y2 T4 Tin báo 24 items; Y1 T8 Phụ tuyến · Tân quân lập uy).
- DOM (build 0756a05b, real life): .k3right overflow:clip scrollHeight 1864 / clientHeight 714, buttons «Xem tin/Để sau» at y≈1923–2137, dialog bottom y=885; nothing scrolls (40 wheel + touch gestures), backdrop tap does nothing.
- Retest on LIVE 9f72524b (same life save loaded, 24 notices pushed into NT.list, kitNoticeOpen()): clip-live9f72524b-dump.json + clip-live9f72524b-{fold,ipad}.png.
  Fold 755x1000: .k3right scrollHeight 1977 / clientHeight 714 (clip), options y=2036/2146 hit=false → STILL BLOCKED.
  iPad 1180x820: .k3right 1288 / 492 (clip), options y=1368 hit=false → STILL BLOCKED.
