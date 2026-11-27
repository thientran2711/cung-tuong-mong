/* tinbao-words: THE bad-pattern set of a news line (owner OD 25/11 ~23:36Z). One line = one clear cổ trang sentence (VANPHONG).
   check(text) → list of pattern ids hit. Used by scan.js (static + kitSayLine cases) and bot.js (live lines). */
const P=[
 ['eq',      /\s=\s/,                                   '«=» in a sentence'],
 ['dotOk',   /\s·\s(?:thành|hỏng)\b/,                   '« · thành / · hỏng» glue'],
 ['dotMid',  /[\p{Ll}\d)»]\s·\s[\p{Ll}(]/u,              '« · » joining two parts of one sentence'],
 ['paren2',  /\)\s*\(/,                                  'stacked parentheses «) («'],
 ['rawNet',  /có nết \p{Lu}/u,                          'raw trait label «có nết Nhiều chuyện»'],
 ['chain3',  /:[^.!?:]*:[^.!?:]*:/,                      '«a: b: c:» chain (3 colons in one sentence)'],
 ['chain2',  /: [^.!?:]{1,22}: /,                       '«X: nhãn: …» label chain'],
 ['labelAbout', /(?:Sổ ghi thêm|Ghi thêm|Tin|Chuyện) về [^:.]{2,40}: /u, '«<nhãn> về X:» label-colon head'],
 ['bareNoun', /(?:^|[.!?] )Ở [^.,:;]{2,40} (?:ngày hội|có chuyện|nghe lỏm chuyện|tiếng khóc ở [^.]+)\./u, 'verbless fragment «Ở <nơi> <danh từ>.»'],
 ['eqStay',  /Ở lại = /,                                 '«Ở lại = như lẻn vào»'],
 ['dupHead', /(\b[\p{Lu}][\p{Ll}]+(?: [\p{Lu}][\p{Ll}]+)+ [\p{Ll}][^.:]{4,40}?)[.:]?\s+\1/u, 'the same head said twice'],
 ['tonFree', /TỐN\s*không[\s\S]*ĐƯỢC\s*không/i,          'free choice card «TỐN không / ĐƯỢC không»'],
];
/* the same full titled name (title + 2-3 word name) printed 2+ times in one line */
const TITLES='Cung nữ thân tín(?: (?:thô sử|tam đẳng|nhị đẳng|nhất đẳng))?|Cung nữ (?:thô sử|tam đẳng|nhị đẳng|nhất đẳng)|Chưởng sự cô cô|Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Thái giám|Tiểu thái giám';
const RX_T=new RegExp(`(?:${TITLES}) (\\p{Lu}[\\p{Ll}]+(?: \\p{Lu}[\\p{Ll}]+){1,2})`,'gu');
function check(t){t=String(t||'');const out=P.filter(([,rx])=>rx.test(t)).map(([id])=>id);
 const c={};let m;RX_T.lastIndex=0;while((m=RX_T.exec(t)))c[m[0]]=(c[m[0]]||0)+1;if(Object.values(c).some(n=>n>=2))out.push('titleTwice');
 const n={};for(const w of t.match(/\b\p{Lu}[\p{Ll}]+ \p{Lu}[\p{Ll}]+(?: \p{Lu}[\p{Ll}]+)?/gu)||[])n[w]=(n[w]||0)+1;if(Object.entries(n).some(([w,k])=>k>=3&&!/^(Hoàng|Thái|Tháng|Quý|Ngự)/.test(w)))out.push('name3x');
 return out}
module.exports={P,check};
