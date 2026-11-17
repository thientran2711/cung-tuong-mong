# FEELINGS-18 model (owner-approved 17/11 19:10Z + 19:25Z; s36 chat Lượt 4/12/17/18)
Numbers are ours (BAL), the owner does not set them. Player words per VANPHONG (no %).

## Set: 18 feelings × 3 levels (nhẹ / vừa / nặng)
Level = summed strength of that kind's active causes (khắc timers, Sims model). Heavy-level name in brackets.
| key | name | Sims | level-heavy name | effects (scale up per level) |
|---|---|---|---|---|
| vui | Vui | Happy | Hân hoan | easier to win people over (relations / thiện cảm gains). Heavy + bar high → act: thưởng người hầu |
| tutin | Tự tin | Confident | — | court work, contests, debate/đối đáp: better odds |
| hanghai | Hăng hái | Energized | — | training, heavy work: better results |
| tinhtu | Tình tứ | Flirty | — | thị tẩm / meeting the Emperor smoother. Heavy + bar high → act: chủ động mời Hoàng thượng |
| chuyentam | Chuyên tâm | Focused | — | study, embroidery, minigames: steadier |
| hungkhoi | Hứng khởi | Inspired | — | cầm kỳ thi họa: better works |
| tinhnghich | Tinh nghịch | Playful | — | play with children, pets, close friends: better |
| binh | Bình thản | Fine | — | none (neutral) |
| buon | Buồn | Sad | Đau khổ | fun acts weaker, more likely to refuse meetings. Heavy + bar ≤ threshold → act KHÓC |
| gian | Giận | Angry | Phẫn nộ | đối đáp may be impolite. Heavy + bar low → act ĐẬP ĐỒ / mắng người hầu (servant lòng down) |
| lo | Lo âu | Tense | Bấn loạn | craft acts fail more, sleep restores less Sức. Heavy → act MẤT NGỦ |
| so | Sợ | Scared | Khiếp đảm | harder to accuse, avoids powerful people. Heavy → act TRỐN TRONG PHÒNG (skips buổi) |
| hothen | Hổ thẹn | Embarrassed | Nhục nhã | avoids crowds, small Danh loss when appearing. Heavy → act CÁO BỆNH KHÔNG DỰ |
| chan | Chán chường | Bored | — | study weaker, urge to go out. Heavy → act BỎ DỞ VIỆC |
| khochiu | Khó chịu | Uncomfortable | — | Sức restores less, drifts into Giận; cleared by changing clothes / eating / rest (wet, hungry, tired, ill, weather) |
| choang | Choáng váng | Dazed | — | craft + đối đáp weaker; fades by itself in a few khắc (slap, fall, drugs) |
| hon | Hờn dỗi | (ours) | — | cold to the person who caused it, thiện cảm to them drifts down. Heavy → act BỎ VỀ / KHÔNG TIẾP |
| chanh | Chạnh lòng | (ours; short jealousy feeling; the long score stays "Ghen") | — | needles rivals, pushes the Ghen score up; lasting → may seed an INTENT |
Removed as feelings: muu (Toan tính) → INTENT system; dau (Đau khổ) → buon heavy; khóc → act. Old saves: muu→binh, dau→buon heavy. Emperor + Thái hậu use the full set (drop the 4-kind legacy map in jemo.js emoFromLegacy).

## Mood bar
Signed sum of all active causes (good +, bad −). Decay = each cause's own khắc timer.

## ACTS (outbursts) — on jemoact
Fire when the feeling is at HEAVY level AND the bar passes its threshold (bad: bar ≤ BAL e.g. −50; good: bar ≥ BAL e.g. +50). Each act has its own short duration in khắc (BAL; khóc ~1 khắc, đập đồ 1, run sợ 1–2, cáo bệnh = the rest of that buổi) and a COOLDOWN before the same act may fire again (no crying all day). Example (owner): sad 9 khắc, cries 1 khắc, the other 8 khắc the face shows sad.

## INTENT (ý đồ) — hidden system
Born from Chạnh lòng / Giận / Hờn dỗi at high level + low bar + traits. Lasts until acted on, exposed, or faded (several khắc to days). NEVER shown on the face seal or tap card (owner 20:15Z); discoverable only by scouting/evidence.

## ONE SEAL = "VẺ MẶT" (what you see on their face now)
Priority: active ACT > dominant FEELING (intent never shown, owner 20:15Z). When the top one ends, the seal falls to the next. Tap card: "Đang: <act>" / "Cảm xúc: <name> (<bậc>)" lines (only those present), then the cause list (order rule OD 18:25Z (a)); cause text only if known, else "Nguyên do chưa rõ".
API for the kit: faceKeyFor(pid) → {kind:'act'|'feel', key, level} + card lines.
## Art (Foreman C): seal keys per set (women / young men / mature men): the new feelings, act faces emo-khoc, emo-phanno, emo-runso, emo-matngu; fallback to nearest existing seal while missing.
