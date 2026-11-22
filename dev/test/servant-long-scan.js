/* rel-men-servants r5 (law 11, OD:L352 «servants use only ONE word Thiện cảm; drop Lòng» + VANPHONG l.55): every player-visible string in the game code
   that prints a servant's attitude as «Lòng / lòng». Two passes:
   A) SOURCE: string / template literals in dev/build/j*.js containing «lòng» as an attitude word (idioms like «hai lòng», «vui lòng», «lấy lòng» skipped) — listed per file;
   B) SCREEN: the same literals run through VP.fix (j84 word fixer): any that still contain «lòng» = what the player really sees.
   usage: node dev/test/servant-long-scan.js <build url> [--list]   → exit 1 when a servant-facing «Lòng / lòng» attitude word survives on screen. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const _IDI=/(lấy lòng|mở lòng|sẵn lòng|động lòng|lòng người|lòng ngay|lòng tham|đem lòng|giữ lòng|mất lòng|hài lòng|thật lòng|vừa lòng|chạnh lòng|tận lòng|lòng thành|lòng thương|nhẹ lòng|yên lòng|lòng dạ|ghi lòng|để lòng|trong lòng|bằng lòng|phụ lòng|toàn lòng|dốc lòng|hết lòng|tấm lòng|lòng tin|lòng tốt|vui lòng|hai lòng|một lòng|phật lòng|mủi lòng|mềm lòng|mếch lòng|đau lòng|ấm lòng|thuộc lòng|vỡ lòng|đầu lòng|lọt lòng|được lòng|an lòng|nguội lòng|lạnh lòng|tủi lòng|nén lòng|nhạt lòng|khó lòng|sinh lòng|mang lòng|hiểu lòng|dò lòng|định lòng|lòng mình|lòng ta|lòng ngươi|lòng chàng|lòng nhẹ|lòng hơi|lòng tiếc|lòng ghen|lòng nhân|lòng thật|lòng quân|lòng dân|lòng mẹ|lòng ngài|lòng như|lòng còn|lòng biết|lòng không vui|lòng xao|lòng chưa gắn|lòng ấm|lòng được|vững lòng|bận lòng|tỏ lòng|cảm lòng|ghi nhớ lòng|vào lòng|lòng bàn)/i;
const ATT=/^[Ll]òng:?$|[Ll]òng (?:cung nữ|trung\b|lung lay|với (?:chủ|ngươi)|thấp|dưới|còn dưới|kẻ hầu|[+\-−]?\d|<b>|\p{Lu}\p{L}* [+\-−]\d)|kẻ hầu (?:thêm|bớt) Lòng|kẻ hầu khác lòng|Lòng là|\(lòng |· lòng |mới lòng/u;
const files=fs.readdirSync(path.join(__dirname,'../build')).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js'&&f!=='j84.js');
const L=[];for(const f of files){const src=fs.readFileSync(path.join(__dirname,'../build',f),'utf8').split('\n');let inC=false;
 src.forEach((ln,i)=>{let code='';for(let k=0;k<ln.length;k++){if(inC){const e=ln.indexOf('*/',k);if(e<0){k=ln.length;}else{inC=false;k=e+1}continue}
   if(ln[k]==='/'&&ln[k+1]==='*'){inC=true;k++;continue}if(ln[k]==='/'&&ln[k+1]==='/'){break}code+=ln[k]}
  const re=/(`(?:[^`\\]|\\.)*`|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/g;let m;while((m=re.exec(code))){const s=m[1].slice(1,-1);if(!/[Ll]òng/.test(s))continue;const t=s.replace(/\$\{([^}]*)\}/g,(_,e)=>/balSg|\.xs\b/.test(e)?'+1':'1');
   if(ATT.test(t))L.push({f,n:i+1,s:t.slice(0,150)});
   /* strings inside a template's \${...} expressions (e.g. \${lab||"Lòng"}) are literals too */
   if(s[0]!==undefined&&m[1][0]==='`'){const ex=s.match(/\$\{[^}]*\}/g)||[];for(const e of ex){const im=e.match(/"([^"\n]*)"|'([^'\n]*)'/g)||[];for(const q of im){const u=q.slice(1,-1);if(/[Ll]òng/.test(u)&&ATT.test(u))L.push({f,n:i+1,s:u})}}}}})}
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.VP&&VP.fix);
 const out=await p.evaluate(L=>L.map(x=>Object.assign({},x,{after:VP.fix(x.s)})),L);
 /* KEPT = «lòng» that is NOT a servant's attitude to her (OD:L352 is about servants): idioms (thử lòng, vừa lòng, hết lòng, một lòng, được/mất lòng, buồn lòng),
    the Thái hậu's / Hoàng hậu's / Emperor's heart, a general's loyalty (lòng trung of Đại tướng quân, road captions), feelings of the player (lòng ngươi, lòng nhẹ). */
 const KEEP=[/Thái hậu · lòng/,/thử lòng/,/vui lòng|vừa lòng|buồn lòng|hết lòng|một lòng|được lòng|mất lòng/,/lòng trung của Đại tướng|buộc lòng trung|giữ trọn lòng trung|Trong mắt người ngoài là lòng trung|Huyết thư hóa lòng trung|^Lòng trung$/,/lòng thương/,/Giữ lòng|giữ lòng \d/,/lòng lắng lại|lòng ngươi đang|lòng chẳng|lòng nhẹ|lòng người gọn|Lòng là của con|lòng y/,/lòng ai gia|lòng phải thành|làm chứng lòng trung/];
 const kept=out.filter(x=>/[Ll]òng/.test(x.after)&&KEEP.some(r=>r.test(x.s)));
 const surv=out.filter(x=>/[Ll]òng/.test(x.after)&&!KEEP.some(r=>r.test(x.s)));
 console.log(`source: ${L.length} literals with an attitude «lòng» in ${new Set(L.map(x=>x.f)).size} files; after the word fixer: ${kept.length} kept (not a servant attitude: idiom / Thái hậu / general / the player's own heart), ${surv.length} servant-facing «lòng» survive`);
 if(process.argv.includes('--list'))out.forEach(x=>console.log(`${/[Ll]òng/.test(x.after)?'SURVIVES':'fixed   '} ${x.f}:${x.n}  ${x.s}`));
 else surv.forEach(x=>console.log(`SURVIVES ${x.f}:${x.n}  ${x.s}`));
 await b.close();process.exit(surv.length?1:0)})();
