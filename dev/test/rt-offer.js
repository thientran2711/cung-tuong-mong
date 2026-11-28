'use strict';
/* rt-offer.js — which robot «offers» are REAL promotion roads (HARNESS FIXER #9, PROMO-ROOT finding 26/11 00:03Z).
   The old OFFER LOG matched /thăng|tiến cử|phong|khảo|sắc phong|tuyển/ on every option label: «Phong hàn» (illness), «lá phong rơi»,
   the «Sắc phong» TAB chip, the «Mệnh truyện … Sắc phong» tab strip, «Lịch tháng» reminders → s9b 593 «offers» = 0 real.
   A real offer is a road to HER promotion that the game puts in front of her:
     exam   — an exam entry card («Khảo hạch tấn phong», «Khảo hạch Nội vụ phủ», «Dự khảo hạch …») or a round of the exam frame (#kg82 art «Khảo hạch»)
     decree — an option inside a decree dialog («Thánh chỉ», «Sắc phong», «Tấn phong», «Lễ tấn phong», «Thăng bậc»)
     review — an option inside «Xét phẩm cuối tháng» (the month-end promotion review)
     select — an option inside «Tuyển tú» / «Đại tuyển tú nữ»
   Never an offer: tab chips, utility dialogs (Lịch tháng, Sổ ghi, Tư trang, Tin báo …), the life-start identity card, other people's roads
   («Khoa thi Đình» = the scholars' exam, «Kính sự phòng báo tin · Tiến cử cung nữ …» = her maid), words that only contain «phong».
   ONE copy of this rule: robot-rt.js (live log) and dev/measure/robot-audit.js (re-count of old files) both require this file. */
const UTIL_RE = /^(lịch tháng|sổ ghi|tư trang|tin báo|tin trong cung|mệnh truyện|thân phận kiếp này|luân hồi|kính sự phòng báo tin|khoa thi đình|hướng dẫn|lời dặn)/i;
const TAB_RE = /^(sắc phong|mệnh truyện.*sắc phong)$/i; /* the «Sắc phong» tab chip / the whole tab strip read as one label */
const EXAM_RE = /khảo hạch (tấn phong|nội vụ phủ)|^dự khảo hạch/i;
const SCREEN_KIND = [[/^(thánh chỉ|sắc phong|tấn phong|lễ tấn phong|thăng bậc)/i, 'decree'], [/^xét phẩm cuối tháng/i, 'review'], [/^(tuyển tú|đại tuyển tú nữ)$/i, 'select']];
/* split a stored screen «<layer> «<title>»» (robot-rt OFFER LOG format) */
function splitScreen(screen) { const m = String(screen || '').match(/^(\S+)\s*«([^»]*)»?/); return m ? { layer: m[1], title: m[2] } : { layer: String(screen || ''), title: '' } }
/* o = { layer, title, label, mgExam? } (live) or a stored offer { screen, label } → 'exam' | 'decree' | 'review' | 'select' | null */
function offerKind(o) {
  if (!o) return null; const sp = o.layer == null ? splitScreen(o.screen) : { layer: o.layer, title: o.title || '' };
  const layer = String(sp.layer || ''), title = String(sp.title || '').trim(), label = String(o.label != null ? o.label : o.t || '').replace(/\s+/g, ' ').trim();
  if (!label || TAB_RE.test(label)) return null;
  if (UTIL_RE.test(title)) return null;
  if (/^#kg\d/.test(layer)) return o.mgExam ? 'exam' : null; /* a mini-game frame: only the exam frame counts (its rounds «Bắt đầu thi» / «Bỏ qua») */
  if (layer !== 'page' && layer !== '.mapsc') for (const [re, k] of SCREEN_KIND) if (re.test(title)) return /^(✕|×|đóng|lui)$/i.test(label) ? null : k;
  if (EXAM_RE.test(label)) return 'exam';
  return null;
}
/* re-count a stored offer list (any harness version): real offers only, with their kinds */
function recount(offers) { const L = Array.isArray(offers) ? offers : []; const by = {}; let real = 0, picked = 0; for (const o of L) { const k = o.kind !== undefined && o.rule === 2 ? o.kind : offerKind(o); if (!k) continue; real++; by[k] = (by[k] || 0) + 1; if (o.picked) picked++ } return { raw: L.length, real, picked, by } }
module.exports = { offerKind, recount, splitScreen, RULE: 2 };
