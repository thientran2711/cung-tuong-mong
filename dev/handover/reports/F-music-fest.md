# F-MUSIC-M2 report: festival background music

PRIORITY #1 CHECK: festival keys read from origin/main dev/build/j31.js (FEST table: 10 keys + vulan, vantho, lapbat) and j71.js (thanhtho). Reused musicCtx/j11.js table; no second music system. bgm-festival stays as fallback.

Model: Magnific audio_music_generate, google-lyria-3-pro (no ElevenLabs). One take per key, all accepted. Prompt: traditional Chinese palace court music, festival mood, instrumental only, no vocals, loopable.
Live-track loudness measured first: -10.6 to -12.3 LUFS (bgm-festival -11.7). Target -11.7 ±1.
Encode: stereo 44.1 kHz mp3 96 kbps, 1.5 s fade in/out, TP limit about -1 dBFS.

| festival key | file | month/tuan | creation id | sec | KB | LUFS | peak dBFS |
|---|---|---|---|---|---|---|---|
| newyear | bgm-fest-newyear | 1/0 | tCZAnkpmZJ | 88.2 | 1059 | -11.4 | -0.7 |
| nguyentieu | bgm-fest-nguyentieu | 1/1 | CqYcVgeEEy | 88.5 | 1062 | -10.9 | -0.5 |
| thanhminh | bgm-fest-thanhminh | 3/0 | Bh6321hoQR | 89.8 | 1078 | -12.0 | -0.6 |
| doanngo | bgm-fest-doanngo | 5/0 | SyvfucZUb8 | 89.1 | 1069 | -11.3 | -0.7 |
| phoenix | bgm-fest-phoenix | 6/0-2 | xSoIhGrjfW | 86.8 | 1042 | -11.6 | -0.7 |
| thattich | bgm-fest-thattich | 7/0 | jU8tvYILD0 | 88.7 | 1065 | -11.2 | -0.4 |
| vulan | bgm-fest-vulan | 7/1 | jU8tvcQLD0 | 88.2 | 1059 | -11.4 | -0.7 |
| trungthu | bgm-fest-trungthu | 8/1 | iGK1jEy3uK | 87.3 | 1048 | -12.2 | -1.0 |
| vantho | bgm-fest-vantho | 8/2 | 5jpdoTdKxe | 86.0 | 1033 | -11.3 | -0.5 |
| trungcuu | bgm-fest-trungcuu | 9/0 | oviRAyW829 | 86.2 | 1034 | -11.8 | -1.0 |
| thanhtho | bgm-fest-thanhtho | 10/1 | jU8tvhSLD0 | 88.5 | 1062 | -11.3 | -0.5 |
| dongchi | bgm-fest-dongchi | 11/1 | P3FqKuL42C | 90.1 | 1081 | -12.6 | -1.0 |
| lapbat | bgm-fest-lapbat | 12/0 | bxDeBDY5Y2 | 87.9 | 1055 | -11.2 | -1.0 |
| giaothua | bgm-fest-giaothua | 12/2 | mE2GYGEhJQ | 85.9 | 1031 | -12.6 | -0.3 |

Checks done: duration 86-90 s; all ≤1.1 MB; loudness within ±1 LU of the live set (dongchi, giaothua at the quiet edge); no clipping (peaks ≤ -0.3 dBFS); silencedetect: only the 1.5 s fade-out tail; waveform of all 14 looked at (no gaps). giaothua and trungthu open quietly for the first ~25 s (slow build), fine as a loop under text.
NOT done: vocal transcription. No offline speech tool in this container (installing one was blocked). Prompts asked instrumental only; a listening or transcription pass is still open for KK18/M1 (any Magnific/other STT).

## Delivery (needs a decision)
dev/site/cdn_sync.py on main has TOPS=("img",) ("audio/ stays in git") and assets.py loads audio locally, so the CDN route in the brief does not reach audio. Nothing was uploaded to the CDN. Instead: branch origin/review/music-fest = 14 mp3 + audio/MANIFEST.json (34 entries, format of the existing BGM keys). Coordinator can merge it, or move audio to the CDN first. MANIFEST was pulled right before editing.

## Wiring hint for KK18
festToday() (j31.js:7) / festAt7() (j71.js:331) return the key k; music = "bgm-fest-"+k with fallback bgm-festival. Missing file → fallback, never silence.

~100% xong (my part) / ~0% chơi được (not wired yet)
