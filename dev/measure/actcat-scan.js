// scan: every act name literal (n:"…") in dev/build/j*.js → kit category (KIT_ACT_CATS order as at runtime). Lists the buon-ban ones.
const fs=require('fs');const P='dev/build/';const names=new Set();
for(const f of fs.readdirSync(P))if(/^j.*\.js$/.test(f)&&f!=='all.js'){const s=fs.readFileSync(P+f,'utf8');for(const m of s.matchAll(/\bn:\s*"([^"]{3,80})"/g))names.add(m[1]);for(const m of s.matchAll(/\bn:\s*`([^`$]{3,80})`/g))names.add(m[1])}
let C=[["hai-nguoi",/hạ độc|đẩy|vu |vu oan|trù ẻo|ngáng|hại|bỏ xạ|xạ hương|cài đồ|tráo|phá |chặn ngự giá|tố |bóc chuyện|ly gián|rút thẻ|mua chuộc/i],
 ["muu-ke",/dò la|mưu|tai mắt|tung tin|giấu|hối lộ|đút lót|lẻn|nghe lén|theo dõi|kế /i],["hoc-tap",/học|luyện|đọc|thêu|đàn|thơ|vẽ|họa|múa|cờ|sách|chữ/i],
 ["hau-ha",/hầu|dâng|chăm|phục dịch|quét|lau|lĩnh đồ|theo hầu|việc chủ|canh|nấu|pha trà/i],["nghi-ngoi",/nghỉ|ngủ|tắm|dưỡng|chải chuốt|giả bệnh|tĩnh dưỡng/i],
 ["buon-ban",/bán|mua|buôn|chợ|đổi|bạc/i],["le-nghi",/vấn an|thỉnh an|lễ|cầu|chùa|phật|xin xăm|cúng|bái/i],["giao-thiep",/thăm|tặng|kết|trò chuyện|mời|gặp|tâm sự|làm thân|nói/i],["di-lai",/đi |dạo|sang|ra |vào |đến /i]];
const BT=process.argv[2]?new RegExp(process.argv[2],'i'):/thưởng|ban cho|ban ơn|ân thưởng/i;
C.splice(1,0,["trung-phat",/phạt|trách phạt|quở|đánh đòn|quỳ|tịch thu|giáng|cấm túc|đuổi|đổi người/i],["ban-thuong",BT],["cham-con",/(^|\s)con(\s|$)|hoàng tử|công chúa|bế |dạy dỗ|nuôi/i],["trieu-chinh",/triều|tấu|sớ|quan |nhà ngoại|tham ô|thế lực|phe/i]);
C.unshift(["sung-ai",/chặn ngự giá|tranh sủng|lật thẻ|rút thẻ|giữ thẻ|liếc mắt đưa tình/i]);
const cat=n=>{for(const[c,r]of C)if(r.test(n))return c;return'giao-thiep'};
const out={};for(const n of names){const c=cat(n);(out[c]=out[c]||[]).push(n)}
console.log('names',names.size);for(const n of (out['buon-ban']||[]).sort())console.log('buon-ban ·',n);
for(const n of [...names].filter(n=>/cứu|thiện|phát chẩn|bố thí|làm phúc|phát bạc|cúng dường|quyên/i.test(n)))console.log('charity-like ·',cat(n),'·',n);
