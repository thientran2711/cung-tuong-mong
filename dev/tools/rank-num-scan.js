/* LAW 4 + LAW 11 scan (review/bal-ranks-law4): every typed RANK / PROMOTION number in dev/build/j*.js.
   Families: (A) rank thresholds (RANKS s/d typed), (B) promotion gap formula, (C) a per-rank weight multiplied in a formula (rank*N),
   (D) a typed rank ternary that yields a number (rank>=k?N:M), (E) a typed per-rank number array indexed by rank, (F) a threshold number typed in
   player text next to Sủng/Danh (cần N). BAL files (jbal*.js) are the rulebook and are not scanned.
   Not counted (listed in OK with why): rank-INDEX gates (rank>=5 = "Quý phi and above" names a rank, not an amount), CSS tier classes / colours.
   usage: node dev/tools/rank-num-scan.js [buildDir]           rows of typed rank numbers left (exit 1 if any)
          node dev/tools/rank-num-scan.js --table <gitRef>     before (gitRef) / after (work tree) table, markdown
   Also run by dev/test/law4-typed.js. */
const fs=require('fs'),path=require('path'),cp=require('child_process');
const RK='(?:S\\.rank|S\\.srv\\.rk|\\b[A-Za-z_]+\\.rank\\b|rkOf\\([^()]*\\)|\\brank\\b)';
const PAT={
 C:new RegExp(`\\(?${RK}\\s*(?:-\\s*\\d+\\s*\\))?\\s*\\*\\s*\\d[\\d.]*|\\b\\d[\\d.]*\\s*\\*\\s*${RK}`,'g'),
 D:new RegExp(`${RK}\\s*[<>]=?\\s*\\d+\\s*\\?\\s*-?[\\d.]+\\s*:\\s*-?[\\d.]+(?![\\d.]*\\s*\\?)`,'g'),
 E:new RegExp(`\\[(?:\\s*-?[\\d.]+\\s*,){7}\\s*-?[\\d.]+\\s*\\]\\s*\\[[^\\]]*${RK}`,'g'),
 F:/(?:Sủng|Danh) [^`"$]{0,12}(?:cần |\/)\d+|cần \d+ (?:Sủng|Danh)|(?:Sủng|Danh) \$\{[^}]*\}\/\d+|(?:Sủng|Danh) \d+`/g};
/* allowed with why (file + match text start) */
const OK=[[/^j25\.js$/,/rank>=1\?1:0/,'CSS tier class rp0..3 (look), not a rule number'],[/^jsl\.js$/,/rank>=1\?1:0/,'CSS tier class (look)'],
 [/^jcui\.js$/,/Danh hiệu 1\/8/,'kit sample data (KBM_SAMPLE ending-book count), not a rank number']];
function scanSrc(file,src){const rows=[];/* comments blanked (newlines kept, so line numbers stay) */src=src.replace(/\/\*[\s\S]*?\*\//g,c=>c.replace(/[^\n]/g,' '));const lines=src.split('\n');
 lines.forEach((L,i)=>{const code=L.replace(/\/\*.*?\*\//g,'').replace(/^\s*\/\/.*$/,'');
  for(const k of 'CDEF'){if(k==='F'&&!/[`"]/.test(code))continue;const re=new RegExp(PAT[k].source,'g');let m;
   while((m=re.exec(code))){const t=m[0];if(OK.some(([f,r])=>f.test(file)&&r.test(t)))continue;rows.push({fam:k,at:`${file}:${i+1}`,t})}}
  if(/const RANKS\s*=/.test(code)&&/\bs:\s*\d/.test(lines.slice(i,i+4).join('')))rows.push({fam:'A',at:`${file}:${i+1}`,t:'RANKS s/d typed'});
  if(/function promoGap\(/.test(code)&&!/BAL\./.test(code))rows.push({fam:'B',at:`${file}:${i+1}`,t:code.trim().slice(0,80)})});
 return rows}
function files(dir){return fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&!/^jbal/.test(f)).sort()}
function rankNumScan(dir){const D=dir||path.join(__dirname,'../build');const R=[];for(const f of files(D))R.push(...scanSrc(f,fs.readFileSync(path.join(D,f),'utf8')));return R}
function gateCount(dir){const D=dir||path.join(__dirname,'../build');let n=0;const re=new RegExp(`${RK}\\s*(?:<|>|<=|>=|===|!==)\\s*\\d+`,'g');
 for(const f of files(D))n+=(fs.readFileSync(path.join(D,f),'utf8').match(re)||[]).length;return n}
module.exports={rankNumScan,gateCount};
if(require.main===module){const a=process.argv.slice(2);
 if(a[0]==='--table'){const ref=a[1]||'origin/main';const root=path.join(__dirname,'../..');
  const show=f=>{try{return cp.execSync(`git show ${ref}:dev/build/${f}`,{cwd:root,maxBuffer:1<<28}).toString()}catch(e){return ''}};
  const D=path.join(__dirname,'../build');const B=[];for(const f of files(D))B.push(...scanSrc(f,show(f)));const A=rankNumScan(D);
  console.log(`| fam | before (${ref}) | after (work tree) |\n|---|---|---|`);
  for(const r of B){const left=A.find(x=>x.at.split(':')[0]===r.at.split(':')[0]&&x.t===r.t);console.log(`| ${r.fam} | ${r.at} \`${r.t.replace(/\|/g,'\\|')}\` | ${left?'STILL TYPED '+left.at:'BAL'} |`)}
  console.log(`\nbefore ${B.length} typed · after ${A.length} typed · rank-index gates (not counted, names of ranks) ${gateCount(D)}`);process.exit(A.length?1:0)}
 const R=rankNumScan(a[0]);for(const r of R)console.log(`${r.fam} ${r.at} ${r.t}`);console.log(`rank-num-scan: ${R.length} typed (rank-index gates not counted: ${gateCount(a[0])})`);process.exit(R.length?1:0)}
