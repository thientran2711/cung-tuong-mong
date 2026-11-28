# Dien tuyen picks, lives s21h/i/j (all Ban hoa b1) vs s21k (passed, posted Phan cung). Build b=62f03c577a1c (main 7d7c6886; s21h on 8a30664e).
Test ids/lean from SELX_TESTS (dev/build/jselxd.js); matched by option text (prefix match, verify before relying).
Shots (end.png, m-new-1-*.png) are NOT in git (img allowlist hook): they stay in /home/user/out/shots-flight2-s21j on the runner container; ask to upload to CDN img/_review/ if needed.

| life | seed | day-2 morning | Thai hau doidap (test, lean -> picked stance/value) | Hoang thuong | board | hanhxu test (lean -> picked stance/value) | result |
|---|---|---|---|---|---|---|---|
| s21h | 2026112576 | n/a | dd-021 (Can) -> khiem/Can (match) | Dang Cam (dan 14) 1/10 raw 5.60 | dan | hx-012 (Le) -> nhan/Khiem (no match) | Ban hoa b1 |
| s21i | 2026112579 | n/a | dd-015 (Nhan) -> manh/Kiem (no) | Dang Cam (dan 10) 1/10 raw 4.60 | dan | hx-029 (Nhan) -> giuyen/Le (no) | Ban hoa b1 |
| s21j | 2026112580 | "Ngoi truoc guong diem trang" (makeup board, ended "Diem trang: Doan trang Co co / Kieu diem Kho luong") | dd-015 (Nhan) -> that/Tin (no) | Dang Vu (mua 24) 10/10 raw 10.00 | mua | hx-008 (Kiem) -> giuyen/Kiem (MATCH; "dung yen, khong dong tay vi so lam lua" is the option text; test shown for fire = hx-021-like text) | Ban hoa b1 |
| s21k | 2026112581 (bot=sens) | see its moments | dd-025 (Tin) -> khiem/Tin (match) | Cui dau cho xet (no talent offered) | none | hx-034 (Tin) -> giuyen/Si (no value match, stance giuyen) | PASSED: Tin sac phong -> Phan cung -> Nhap cung, buoi 1 reached |

Facts: (1) s21j board 10/10 and a matching hanhxu pick still died -> not board, not hanhxu-lean alone. (2) s21k talent = none ("Cui dau cho xet") and passed with doidap lean MATCH; h/i/j all offered a talent (Dang Cam/Cam/Vu) and all died. Hypothesis to check: offering a talent (Dang Ky/Cam/Vu/Theu thua) triggers the Ban hoa path, or doidap lean-mismatch (h matched doidap but not hanhxu, j matched hanhxu not doidap => needs BOTH?). s2l passed with "Ngoi truoc guong" day-2 morning on 7d7c6886 (per foreman), s21j did the same and died -> morning pick is not the cause.
