# STYLE07 package, NO-TEXT edit (Foreman D depth 8, 25/11)
Source: owner zip Face90_Magnific_STYLE07_11-25-2026.zip. Owner (verbatim): "Coi thử trong prompt nó có cái sót cái nào mà nó ghi còn chữ trên cái hình thì bỏ."
Edits in every job/template prompt (445 Jobs/*.txt + 30 templates + JSON copies + Open_Prompts.html):
1. The block "CAPTION:\nBelow the portrait print only:\n<Family> | Age <nn>\nDo not print the prompt ID, source filename, job ID, old caption or any other text." → "NO TEXT:\nThe image contains no text at all: no caption, name, family, age, prompt ID, filename, label, signature or watermark."
2. Leftover bug "Draw and paint S56 afresh" → "Draw and paint her afresh" (was in all 445).
Approved_S56_Test/Exact_Executed_Prompt.txt left unchanged (historical record). Prompt hashes in Job_Manifest are now stale (text changed).
Style image (not in git): Painting_Style_Master_35239.png = owner's 2nd portrait = roster n02 (CDN img/share/face90/n02.png) = Magnific lJhyz3Fgv9; 1024x1536, 91 KB.
6-family test (before this edit, captions printed): s17 A16 nVgDazOYQD · s13 A26 Sya4WwvUb8 · c04 A39 xS8w2g0jfW · m02 A51 YMSpCZxWeC · s10 A63 WDUeEGHcXe · s07 A26 4Rq2ePM9Aa (gpt-2-6 2k 2:3 → 2048x3072).

## Re-test with style master n01 (owner 25/11: "thử lại một người thôi. Dùng cái mẫu N01 thử.") → gOvPMkrSXO
s13 Cold 26; refs [IfZhvvqtvE, YMSDsAaWeC (n01)]; prompt = no-text s13 file + IMAGE 2 line "the preferred style portrait" + added line before "Keep the result entirely illustrated 2D": "Hair is deep jet black with a subtle blue-black sheen, as in IMAGE 1, never brown. Use crisp, clearly readable dark ink linework on the eyes, lashes, brows, hair outline and face contour, keeping IMAGE 2's strong contrast." gpt-2-6 2k 2:3.
Hair darkest L p10 26.0 → 19.6, hair b* 9.1 → 4.0 (less brown), sharpness 318 → 526; no caption; no stray mole (n02 run had added one to a Cold face). Cause of the brown/soft STYLE07 set = n02 master is a 91 KB heavily compressed file + prompt soft-edge wording + "dark" (not black) hair.

## Owner library Face_Prompt_Library_STYLE_SKIN_MASTER_11-24-2026.html (= STYLE07-CORR02, 475 prompts, already NO-TEXT, "S56" fixed; embedded style png = n02 sha 8fe02d49…)
s13 A26 CORR02 verbatim + n02 → N25G14A6D9 (run before owner said "dùng N01"): hair L 24.4 b* 9.0, sharp 277.
s13 A26 CORR02 (IMAGE 2 name → "the preferred style portrait") + n01 → rgoUmdTxtc: hair L 22.4 b* 6.0, sharp 260; no text. Softer/lighter than gOvPMkrSXO (n01 + black-hair/ink line: L 19.6, sharp 526) → the black-hair/ink sentence is what makes lines crisp.
