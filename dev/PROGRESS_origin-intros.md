# PROGRESS — review/origin-intros (Foreman C worker, 16/11)

Report (full, with ART LIST + KIT REQUEST + tests): dev/handover/reports/review-origin-intros.md.

| step | state |
|---|---|
| LUẬT ƯU TIÊN SỐ 1 scan (main + review/*): entry-exam-r1 (exam, intro card, entry scene) found and reused; jkc tiểu thư tuyển tú reused | done |
| base: origin/main 5682ce6f + merge review/kc-roads-cn-nc-fix-r1 3dba018d | done |
| joi.js: 3–4 narrated scene panels × 10 origin keys (both roads), §59 placeholder until art | done |
| "Vì sao" reason on every entry result (direct, cung nữ home, hòa thân home, tiểu thư Điện tuyển + returned tablet) | done |
| selection named per road: Lễ ra mắt (nc, bd), Xét phong danh phận (cn); exam frame label = road head (jentry) | done |
| ONE CORE: jkc kcScore weights → BAL.entry.w.kc; BAL.entry.why.ref | done |
| entry animation: seam oiGate → kitEntryGate (KIT REQUEST K-OI-1) | waiting on kit keeper |
| art: 51 panels + 7 gate pictures (ART LIST) | waiting on Foreman C art workers |
| tests: flow.js (10 origins direct at 755x1000 + 1180x820; 9 home roads), oldsave.js, coop-e2e | see report |

Resume: worktree /home/user/wt/oi; build `bash dev/site/build_site.sh`; tests in dev/test/origin-intros/.
