/* review/gift-pick family scan (LUẬT SỬA CẢ NHÓM): every dialog builder whose OPTION LIST is built from her items (S.inv / a bag list)
   = a "choose an item to give / offer / plant / use" picker. Each must set `ik` on its options (→ KIT 28.13i picture grid, jgpick).
   usage: node dev/test/gift-pick-scan.js [ref]   (default: the working tree; ref = a git ref, e.g. origin/main, for the "before" column)
   Prints a markdown table: builder · file · options from · ik set · grid. Exit 1 when an item picker lacks ik. */
const fs=require('fs'),cp=require('child_process'),path=require('path');const ref=process.argv[2];const dir=path.join(__dirname,'../build');
const files=ref?cp.execSync(`git ls-tree --name-only ${ref} dev/build/`).toString().split('\n').filter(f=>/\/j[\w]*\.js$/.test(f)).map(f=>[path.basename(f),cp.execSync(`git show ${ref}:${f}`,{maxBuffer:1<<26}).toString()])
 :fs.readdirSync(dir).filter(f=>/^j\w*\.js$/.test(f)).map(f=>[f,fs.readFileSync(path.join(dir,f),'utf8')]);
const rows=[];let bad=0;
for(const [f,src] of files){const re=/(PEND\.(\w+)\s*=|Q\.push\(\{)/g;let m;
 while((m=re.exec(src))){const body=src.slice(m.index,m.index+1600);const end=body.search(/\n(?:PEND\.|function |\(function|const |document\.)/);const b=end>0?body.slice(0,end):body;
  /* the option list maps an item list: o:<list>.map(...) where the list comes from S.inv / items / a bag */
  const om=/\b(?:o|opts)\s*:\s*([\w.]+?)(?:\.slice\([^)]*\))?\.map\(\(?\[?(\w+)/.exec(b);if(!om)continue;
  const list=om[1];const fromInv=!new RegExp('const '+list+'=Object\\.entries').test(b)&&/S\.inv/.test(b)&&(/items|inv|giftBag|L\b/.test(list))&&/iname\(|giftName\(|IT\[\w+\.k\]\.n/.test(b);if(!fromInv)continue;
  const name=m[2]||('Q.push@'+src.slice(0,m.index).split('\n').length);const ik=/\bik\s*:/.test(b);if(!ik)bad++;
  rows.push(`| ${name} | ${f} | ${list} | ${ik?'yes':'NO'} | ${ik?'picture grid (28.13i)':'text list'} |`)}}
console.log('| picker | file | options from | ik | shows as |\n|---|---|---|---|---|\n'+rows.join('\n'));process.exit(bad&&!ref?1:0);
