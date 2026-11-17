/* kRx(src, flags) — a RegExp that may use LOOKBEHIND (?<= (?<! and still runs on older iPad/iPhone Safari (< 16.4), which cannot even PARSE
   a lookbehind (owner iPad 15/11 "Bị gì đây mới vào game": one lookbehind literal anywhere in the one game <script> = the whole game dead,
   the raw skeleton stays). RULE: never write a lookbehind as a /literal/ — write kRx("…","flags") (dev/test/webkit-syntax.js FAILs a literal).
   Where the browser supports lookbehind kRx returns the native RegExp (identical behaviour). Elsewhere:
   - lookbehinds only at the START of the pattern → an object with exec / test / [Symbol.replace|split|match] that runs the rest of the pattern
     and keeps a match only when the text before it passes each lookbehind (tested as (?:X)$ on the text before the match);
   - lookbehinds elsewhere → the same pattern with them removed (close enough for those rare word checks). */
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
function kRxEmu(src,flags){flags=flags||"";
 const lbs=[];let rest=src,m;
 while((m=/^\(\?<([=!])/.exec(rest))){let d=0,i=0,cls=false;for(;i<rest.length;i++){const c=rest[i];if(c==="\\"){i++;continue}if(cls){if(c==="]")cls=false;continue}if(c==="[")cls=true;else if(c==="(")d++;else if(c===")"&&--d===0)break}
  lbs.push({neg:m[1]==="!",re:new RegExp("(?:"+rest.slice(4,i)+")$",flags.replace(/[gy]/g,""))});rest=rest.slice(i+1)}
 if(/\(\?<[=!]/.test(rest))rest=kRxStrip(rest);
 if(!lbs.length)return new RegExp(rest,flags);
 const G=flags.includes("g"),core=new RegExp(rest,flags.replace(/[gy]/g,"")+"g");
 const ok=(s,i)=>{const pre=s.slice(0,i);return lbs.every(l=>l.re.test(pre)!==l.neg)};
 const R={source:src,flags,global:G,lastIndex:0,
  exec(s){s=String(s);core.lastIndex=G?R.lastIndex:0;let x;while((x=core.exec(s))){if(ok(s,x.index)){if(G)R.lastIndex=core.lastIndex;return x}core.lastIndex=x.index+1}if(G)R.lastIndex=0;return null},
  test(s){return !!R.exec(s)},
  all(s){const L=[];core.lastIndex=0;let x;while((x=core.exec(s))){if(ok(s,x.index)){L.push(x);if(!x[0].length)core.lastIndex++}else core.lastIndex=x.index+1}return L},
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
   act card ............ cardH(a,i)  title, khắc, text, odds chip, Tốn / Thành / Hỏng rows, disabled reason
   button .............. pbtn(attrs,name,line,whyDisabled)  name + price + gain/loss, reason when disabled
   result card ......... resultShow(title,before,ok)  THÀNH / HỎNG seal + coloured deltas + why
   dialog .............. showModal()  speaker portrait frame or place art, options through dilLine()
   Defined in j15 (cards, pager, bars), j17 (lines), j19 (kit core), j21 (relations). */
