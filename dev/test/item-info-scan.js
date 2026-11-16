/* LUẬT SỬA CẢ NHÓM scan for KIT §70 (review/item-info): every item cell (kitItem / kitInvGrid / kitEquipSlots call) in dev/build/j*.js,
   classified by what a TAP on it does. usage: node dev/test/item-info-scan.js <buildDirBefore> <buildDirAfter> <out.md> [--fail]
   Classes: INFO = tap shows the item's info (kit detail / item panel / card) · BLIND = tap acts without showing info (wear, place, take off) ·
   NOTAP = the tile has no tap (static picture) · SUBJ = the picture IS the subject of an open info panel / reveal / FX (no tap needed).
   A tile is NOTAP-but-should when it is a list cell of real items the player reads (reward list, event tag, other people's slots…). */
const fs=require('fs'),path=require('path');const [,,BEF,AFT,OUT,FAIL]=process.argv;
/* hand-checked behaviour per site key (file:function-ish context) — the scan finds every call; a call missing here is reported UNKNOWN */
const SUBJ=/itemPic:|kitRevealHTML|klsfall|kievfx|krev|replace\('class="kitem '|\.kitn"><\/span>',''\)\s*\+\s*`<b class="krevn|kitItem\(\{\}\)\.slice/;
function scan(dir){const L=[];for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)).sort()){const src=fs.readFileSync(path.join(dir,f),'utf8').split('\n');
  src.forEach((ln,i)=>{const re=/kitItem\(|kitInvGrid\(\{|kitEquipSlots\(\{/g;let m;while((m=re.exec(ln))){const at=m.index;const ctx=(ln+'\n'+(src[i+1]||'')).slice(Math.max(0,at-260),at+700);
   if(/^function kit(Item|InvGrid|EquipSlots)\(/.test(ln.slice(at-9))||/function kitItem\(o\)/.test(ln.slice(Math.max(0,at-9),at+12)))continue;
   L.push({f,line:i+1,ctx,cls:classify(f,ctx,ln+' '+(src[i+1]||''))})}})}return L}
function classify(f,c,ln){
 const head=ln.trimStart();if(/^(\/\*|\*|[A-Za-z ]*kitItem\(\{src)/.test(head)&&!/[;{]\s*$/.test(head)&&/^(\/\*|\*)/.test(head))return 'DEF (doc comment)';
 if(/^\s+\S.*→ HTML|kitInvGrid\(\{key, tabs|kitEquipSlots\(\{key, title/.test(ln))return 'DEF (doc comment)';
 if(/const slots=L\.map\(\(x,i\)=>kitItem\(\{src:x\.src,name:x\.name/.test(ln))return 'GRID CELL (onPick of the caller)';
 if(/function kitInvEmpty/.test(ln))return 'EMPTY (blank bag square)';
 if(/kitWearSlots|data-kwear/.test(ln))return 'INFO (other person card / Tư trang)';
 if(/KIT_SAMPLES/.test(ln)||f==='jitd.js')return 'SAMPLE (kit page)';
 if(f==='jkrev.js'||f==='jpetcare.js')return f==='jkrev.js'?'SUBJ (picture of an open panel / reveal / FX)':'PET (own panel, not an item)';
 if(/kt\(x\)|data:tap/.test(c))return 'INFO (§70 card)';
 if(f==='jtoil.js'&&/toilInv|kitEquipSlots\(\{key:"toil"|kitInvGrid\(\{key:"toil"/.test(c))return 'INFO (select + §70 strip)';
 if(f==='jveil.js'&&!/data-vlpick/.test(c))return 'SUBJ (veil dialog picture / worn veil beside its acts)';
 if(f==='jgift.js')return 'GIFT PICKER (review/gift-pick)';
 if(/empty:true,ghost:x\.ghost,size:"lg"/.test(c))return 'SUBJ (picture of an open panel / reveal / FX)';
 if(/kitInvGrid\(\{/.test(c.slice(0,280))&&/kitInvGrid\(\{key:"toil"/.test(c))return /toilDetHTML|toildet/.test(ln)?'INFO (select + §70 strip)':'BLIND (tap = wear)';
 if(/kitInvGrid\(\{key:"tutrang"/.test(c)||/onPick:kinvOpen/.test(c))return 'INFO (item panel)';
 if(/kitEquipSlots\(\{key:"toil"/.test(c))return /toilDetHTML|toildet/.test(ln)?'INFO (select + §70 strip)':'BLIND (tap = take off)';
 if(/kitEquipSlots\(\{key:"(tutrang|pets)"/.test(c))return 'INFO (slot panel)';
 if(/kitEquipSlots\(\{/.test(c.slice(0,280)))return 'INFO (slot panel)';
 if(/data-kid=|kitItemTap\(/.test(c))return 'INFO (§70 card)';
 if(/data-kinvkey="\$\{key\}" data-kinvi/.test(c))return 'GRID CELL (onPick of the caller)';
 if(/data-keqk=/.test(c))return 'GRID CELL (onPick of the caller)';
 if(/data-kinvact="(wear|use)"|data-wd="wear"/.test(c))return 'BLIND (tap = wear / sew)';
 if(/data-vlpick/.test(c))return /kitItemDetail/.test(ln)?'INFO (select + §70 strip)':'INFO (select + own facts)';
 if(/data-tsi=/.test(c))return /detHTML|kitItemDetail/.test(ln)||/sel:selI/.test(c)?'INFO (select + §70 strip)':'BLIND (tap = place)';
 if(/data-kshdet|kshpic/.test(c))return 'INFO (shop card)';
 if(/data-kwear=/.test(c))return 'INFO (other person card / Tư trang)';
 if(/data-pet|petPSrc|petSrc/.test(c))return 'PET (own panel, not an item)';
 if(/wkrPic/.test(c))return 'RECIPE (craft choice, not an item)';
 if(SUBJ.test(c))return 'SUBJ (picture of an open panel / reveal / FX)';
 if(/kmsh|kmrow/.test(c))return 'NOTAP (reward list)';
 if(/class="kiev"/.test(c))return 'NOTAP (event item tag)';
 if(/tsbtile/.test(c))return 'NOTAP (demand tile)';
 if(/ts-slot/.test(c))return 'SUBJ (Hội phối đồ placed slot)';
 if(/kwdnow|kwbig/.test(c))return 'SUBJ (worn veil beside its acts)';
 if(/kwdsel/.test(c))return 'SUBJ (picked veil detail)';
 if(/kitShop|kshg|kshdi/.test(c))return 'INFO (shop card)';
 if(/kgiftpic|giftArt|kgift/.test(c))return 'GIFT PICKER (review/gift-pick)';
 if(/kmTier|x\.img/.test(c))return 'NOTAP (reward list)';
 return 'UNKNOWN'}
const A=scan(BEF),B=scan(AFT);const key=x=>x.f+':'+x.ctx.replace(/\s+/g,' ').slice(200,330);
let md=`# KIT §70 item-cell scan (review/item-info) — LUẬT SỬA CẢ NHÓM\n\nEvery kitItem / kitInvGrid / kitEquipSlots call in dev/build/j*.js, by what a TAP does. Before = origin/main, after = this branch.\n\n| # | file:line (after) | before | after |\n|---|---|---|---|\n`;
const bad=[];B.forEach((b,i)=>{const a=A.find(x=>x.f===b.f&&Math.abs(x.line-b.line)<40&&x.ctx.slice(250,300)===b.ctx.slice(250,300))||A.find(x=>x.f===b.f&&x.line===b.line);
 const before=a?a.cls:'(new)';md+=`| ${i+1} | ${b.f}:${b.line} | ${before} | ${b.cls} |\n`;if(/^(BLIND|NOTAP|UNKNOWN)/.test(b.cls))bad.push(`${b.f}:${b.line} ${b.cls}`)});
const cnt=L=>L.reduce((o,x)=>{const k=x.cls.split(' ')[0];o[k]=(o[k]||0)+1;return o},{});
md+=`\nTotals before: ${JSON.stringify(cnt(A))}\n\nTotals after: ${JSON.stringify(cnt(B))}\n\nOpen after (BLIND / NOTAP / UNKNOWN): ${bad.length?bad.join(' · '):'none'}\n`;
fs.writeFileSync(OUT,md);console.log(md.split('\n').slice(-6).join('\n'));if(FAIL&&bad.length)process.exit(1);
