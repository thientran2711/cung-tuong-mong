/* ONE SOURCE of the odds ladder words (owner 23/11 ~21:40Z, review/kit-odds-row: 7 EQUAL bands; cuts BAL.odds.cut = 18/31/44/57/70/83 in jbal: 5–17 · 18–30 · 31–43 · 44–56 · 57–69 · 70–82 · 83–95).
   RULE: no ladder word reads as a promise («thành», no numbers). Every module reads KIT_ODDS / KIT_ODDS_ALT (regex source, longest first) / kitOddsCanon / kitOddsNorm / kitOddsIdx: nobody types the words.
   KIT_ODDS_OLD = every word of older builds (and of the words tried on 23/11), parse only (old saves / logs), NEVER shown, mapped to the band that holds the CENTRE of its old band
   (Liều 5–30 → 1st · Khó 31–45 → 3rd · Năm ăn năm thua 46–55 → 4th · Khá chắc 56–65 → 5th · Chắc 66–80 → 6th · Rất chắc 81–90 / Nắm chắc 91–95 → 7th). */
const KIT_ODDS=["Mong manh","Hiểm","Khó lường","Tùy duyên","Có cơ","Vững","Rất vững"];
const KIT_ODDS_OLD={"Liều":"Mong manh","Thập tử nhất sinh":"Mong manh","Khó":"Khó lường","Hơi khó":"Khó lường","Bấp bênh":"Khó lường","Năm ăn năm thua":"Tùy duyên","Ngang ngửa":"Tùy duyên","Năm phần":"Tùy duyên","Khá chắc":"Có cơ","Chắc":"Vững","Rất chắc":"Rất vững","Nắm chắc":"Rất vững","Ắt thành":"Rất vững","Chín phần chắc":"Rất vững","Mười phần chắc":"Rất vững"};
const KIT_ODDS_ALT=KIT_ODDS.concat(Object.keys(KIT_ODDS_OLD)).sort((a,b)=>b.length-a.length).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
function kitOddsCanon(w){return KIT_ODDS_OLD[w]||w}
const KIT_ODDS_LEAD=new RegExp("^("+KIT_ODDS_ALT+")(?=$|\\s|·)");
function kitOddsNorm(s){return String(s).replace(KIT_ODDS_LEAD,m=>kitOddsCanon(m))}/* a leading old ladder word → the current one (parse only) */
function kitOddsIdx(w){return KIT_ODDS.indexOf(kitOddsCanon(String(w).trim()))}
/* kRx(src, flags) — a RegExp that may use LOOKBEHIND (?<= (?<! and still runs on older iPad/iPhone Safari (< 16.4), which cannot even PARSE
   a lookbehind (owner iPad 15/11 "Bị gì đây mới vào game": one lookbehind literal anywhere in the one game <script> = the whole game dead,
   the raw skeleton stays). RULE: never write a lookbehind as a /literal/ — write kRx("…","flags") (dev/test/webkit-syntax.js FAILs a literal).
   Where the browser supports lookbehind kRx returns the native RegExp (identical behaviour). Elsewhere:
   - lookbehinds only at the START of the pattern → an object with exec / test / [Symbol.replace|split|match] that runs the rest of the pattern
     and keeps a match only when the text before it passes each lookbehind (tested as (?:X)$ on the text before the match);
   - lookbehinds at the start of a top-level | alternative → the same, per alternative (an empty marker group tells which one matched, KK66);
   - lookbehinds elsewhere → the same pattern with them removed (close enough for those rare word checks). Gates: quickcheck.d/30-webkit-syntax + 31-webkit-boot. */
const KRX_LB=(()=>{try{return new RegExp("(?<=a)b").test("ab")}catch(e){return false}})();
function kRxStrip(p){let out="",st=[],cls=false;const inLB=()=>st.includes(true);
 for(let i=0;i<p.length;i++){const c=p[i];
  if(c==="\\"){if(!inLB())out+=c+(p[i+1]||"");i++;continue}
  if(cls){if(c==="]")cls=false;if(!inLB())out+=c;continue}
  if(c==="["){cls=true;if(!inLB())out+=c;continue}
  if(c==="("){st.push(/^\(\?<[=!]/.test(p.slice(i)));if(!inLB())out+=c;continue}
  if(c===")"){const lb=st.pop();if(!lb&&!inLB())out+=c;continue}
  if(!inLB())out+=c}
 return out}
function kRx(src,flags){return KRX_LB?new RegExp(src,flags||""):kRxEmu(src,flags)}
function kRxAlts(p){const out=[];let d=0,cls=false,at=0;/* split a pattern at its top-level | */
 for(let i=0;i<p.length;i++){const c=p[i];if(c==="\\"){i++;continue}if(cls){if(c==="]")cls=false;continue}
  if(c==="[")cls=true;else if(c==="(")d++;else if(c===")")d--;else if(c==="|"&&d===0){out.push(p.slice(at,i));at=i+1}}
 out.push(p.slice(at));return out}
function kRxEmu(src,flags){flags=flags||"";
 /* each top-level alternative: its LEADING lookbehinds are checked on the text before the match (tested as (?:X)$); an empty marker group ()
    put where they stood tells which alternative matched; marker groups are taken out of every match handed back. Lookbehinds anywhere else
    (or a pattern with a numbered back-reference, whose numbers the markers would shift) → removed (close enough for those rare word checks). */
 const fl=flags.replace(/[gy]/g,"");let alts=kRxAlts(src).map(a=>{const lbs=[];let rest=a,m;
  while((m=/^\(\?<([=!])/.exec(rest))){let d=0,i=0,cls=false;for(;i<rest.length;i++){const c=rest[i];if(c==="\\"){i++;continue}if(cls){if(c==="]")cls=false;continue}if(c==="[")cls=true;else if(c==="(")d++;else if(c===")"&&--d===0)break}
   lbs.push({neg:m[1]==="!",re:new RegExp("(?:"+rest.slice(4,i)+")$",fl)});rest=rest.slice(i+1)}
  return{lbs,rest}});
 if(/\\[1-9]/.test(src)||alts.some(x=>/\(\?<[=!]/.test(x.rest)))alts=[{lbs:[],rest:kRxStrip(src)}];
 if(!alts.some(x=>x.lbs.length))return new RegExp(alts.map(x=>x.rest).join("|"),flags);
 const caps=t=>{let n=0,cls=false;for(let i=0;i<t.length;i++){const c=t[i];if(c==="\\"){i++;continue}if(cls){if(c==="]")cls=false;continue}if(c==="[")cls=true;else if(c==="("&&(t[i+1]!=="?"||(t[i+2]==="<"&&t[i+3]!=="="&&t[i+3]!=="!")))n++}return n};
 let srcC="",ng=0;const mk=[];alts.forEach((x,k)=>{if(k)srcC+="|";if(x.lbs.length){ng++;mk.push({g:ng,lbs:x.lbs});srcC+="()"}srcC+=x.rest;ng+=caps(x.rest)});
 const MK=new Set(mk.map(x=>x.g));
 const G=flags.includes("g"),core=new RegExp(srcC,fl+"g");
 const ok=(s,x)=>{const pre=s.slice(0,x.index);return mk.every(q=>x[q.g]===undefined||q.lbs.every(l=>l.re.test(pre)!==l.neg))};
 const clean=x=>{const a=[x[0]];for(let i=1;i<x.length;i++)if(!MK.has(i))a.push(x[i]);a.index=x.index;a.input=x.input;a.groups=x.groups;return a};
 const R={source:src,flags,global:G,lastIndex:0,
  exec(s){s=String(s);core.lastIndex=G?R.lastIndex:0;let x;while((x=core.exec(s))){if(ok(s,x)){if(G)R.lastIndex=core.lastIndex;return clean(x)}core.lastIndex=x.index+1}if(G)R.lastIndex=0;return null},
  test(s){return !!R.exec(s)},
  all(s){const L=[];core.lastIndex=0;let x;while((x=core.exec(s))){if(ok(s,x)){L.push(clean(x));if(!x[0].length)core.lastIndex++}else core.lastIndex=x.index+1}return L},
  [Symbol.replace](s,rep){s=String(s);const L=G?R.all(s):[R.exec(s)].filter(Boolean);if(!G)R.lastIndex=0;let out="",at=0;
   for(const x of L){const g=x.slice(1);let r;
    if(typeof rep==="function")r=String(rep(x[0],...g,x.index,s));
    else r=String(rep).replace(/\$(\$|&|`|'|\d{1,2})/g,(t,k)=>k==="$"?"$":k==="&"?x[0]:k==="`"?s.slice(0,x.index):k==="'"?s.slice(x.index+x[0].length):(+k>0&&+k<=g.length?(g[+k-1]==null?"":g[+k-1]):t));
    out+=s.slice(at,x.index)+r;at=x.index+x[0].length}
   return out+s.slice(at)},
  [Symbol.split](s,lim){s=String(s);const out=[];let at=0;for(const x of R.all(s)){if(!x[0].length&&(x.index===0||x.index>=s.length))continue;if(x.index<at)continue;out.push(s.slice(at,x.index),...x.slice(1));at=x.index+x[0].length}out.push(s.slice(at));return lim==null?out:out.slice(0,lim)},
  [Symbol.match](s){s=String(s);if(!G)return R.exec(s);const L=R.all(s).map(x=>x[0]);return L.length?L:null}};
 return R}

/* ===================== ONE UI KIT (every screen builds from these pieces only) =====================
   portrait frame ...... pcPort(f,col,status) / pframe(f) / pframeArt(src)   rank ground by f.rk (rk-c0..c7, th, emp, sv0-4, eu0-3, off, kid, cold)
   face + name chip .... mdH(face,"xs|sm|big")  (small round avatar, also rank ground)
   person card ......... pcard({f,name,rank,lines,chips,note,groups})  + pager(key,items,mk) face strip
   labelled bar ........ ghenBar(n) / fbar(v,lo,hi,good)  (always beside label + number)
   odds chip ........... oddsChip(word)  ladder word, '' = no roll (ODDS CAP: no 'sure' word)
   effect line ......... eff(token) / effList(tokens,default) / kitParse('word · tốn: … · thành: … · hỏng: …')
   act card ............ cardH(a,i)  title, khắc, text, odds chip, Tốn once, then THÀNH / BẠI blocks, disabled reason
   button .............. pbtn(attrs,name,line,whyDisabled)  name + price + gain/loss, reason when disabled
   result card ......... resultShow(title,before,ok)  THÀNH / BẠI seal + coloured deltas + why
   dialog .............. showModal()  speaker portrait frame or place art, options through dilLine()
   Defined in j15 (cards, pager, bars), j17 (lines), j19 (kit core), j21 (relations). */
