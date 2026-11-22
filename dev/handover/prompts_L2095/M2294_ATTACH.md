# M2294 rooms batch (ROOMPF1, owner L2291 "tranh phòng … làm tiếp đi", L2293 "giữ phong cách cũ"; A53 ChatGPT, 0 cr). Old in-game room recipe, words verbatim.
Paste the whole .txt into ChatGPT, attach the 4 pictures IN THIS ORDER (image 1, 2, 3, 4), wide picture (about 2688×1386, landscape).
After the picture comes back: grade 'rất nhẹ' at 0 cr (rule L28: `python3 dev/art/place-rank/room_vivid.py IN OUT ratnhe`).
All files in refs/rooms/ (same images as the Magnific ids the old recipe used).

| code | room | prompt file | 1 | 2 | 3 (layout guide) | 4 (colour strip) |
|---|---|---|---|---|---|---|
| M2294-11 | Thừa Minh · Tần phòng ngủ (3 tường, cửa sổ PHẢI) | M2294-11_thua-minh-cung-tan-ngu_ha_sang.txt | refs/rooms/anh1_tam_cung.jpg | refs/rooms/anh2_cung_nu_m09.jpg | refs/rooms/anh3_M3_3tuong_cuaso_PHAI.jpg | refs/rooms/anh4_mau_tan_t4.png |
| M2294-12 | Thừa Minh · Tần phòng khách (2 tường, cửa sổ TRÁI) | M2294-12_thua-minh-cung-tan_ha_sang.txt | refs/rooms/anh1_tam_cung.jpg | refs/rooms/anh2_cung_nu_m09.jpg | refs/rooms/anh3_M2X_2tuong_cuaso_TRAI.jpg | refs/rooms/anh4_mau_tan_t4.png |
| M2294-13 | Khải Tường · Phi phòng ngủ (3 tường, cửa sổ TRÁI) | M2294-13_khai-tuong-cung-phi-ngu_ha_sang.txt | refs/rooms/anh1_tam_cung.jpg | refs/rooms/anh2_cung_nu_m09.jpg | refs/rooms/anh3_M3X_3tuong_cuaso_TRAI.jpg | refs/rooms/anh4_mau_phi_t5.png |
| M2294-14 | Khải Tường · Phi phòng khách (2 tường, cửa sổ PHẢI) | M2294-14_khai-tuong-cung-phi_ha_sang.txt | refs/rooms/anh1_tam_cung.jpg | refs/rooms/anh2_cung_nu_m09.jpg | refs/rooms/anh3_M2_2tuong_cuaso_PHAI.jpg | refs/rooms/anh4_mau_phi_t5.png |
| M2294-15 | Chung Tú · Phi phòng ngủ (3 tường, cửa sổ PHẢI) | M2294-15_chung-tu-cung-phi-ngu_ha_sang.txt | refs/rooms/anh1_tam_cung.jpg | refs/rooms/anh2_cung_nu_m09.jpg | refs/rooms/anh3_M3_3tuong_cuaso_PHAI.jpg | refs/rooms/anh4_mau_phi_t5.png |

Ref sources: 1 = gOmYI7iSXO (= CDN img/tam-cung-dem-ha-sang.webp) · 2 = EbYJzsMuuO (maid m09 a18) · M3 = cpS5YIl0eP · M3X = 1ldYySkr4r (CDN img/_review/place-rank/v10ref/mirror-hh-ngu-B3.jpg) · M2 = 4RFIyNR9Aa · M2X = 8aiwqQTIrU (CDN img/_review/place-rank/v10ref/mirror-phi-ngu-v9.jpg) · strip Tần = 1lduM4wr4r (CDN img/_review/place-rank/pr20/tone-swatch-tan-t4-v2.png) · strip Phi = NEW local (room_tone_swatch.py '#A88BCB:4' '#F3EBDD:1' '#A8CDB8:1', 0 cr).
