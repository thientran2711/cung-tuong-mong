/* story-voice scan (owner 21/11 #61 parts 2+3; brief E39). Lists every story / road / phụ tuyến narration string and counts:
   Q3P   a word «nàng» inside quoted speech that the OLD j84 rule turned into «nàng ta» (the Emperor asking HER read as a third person)
   NOFR  a hồi text (beat t:) whose last words outside quotes do not frame her choice (no question to her) — source count;
         the engine frame (jstory svFrame) closes every such hồi on screen, so the on-screen count is 0 when the hook is present
   DIG   a typed digit in narration (numbers belong to BAL)
   OBS   an obscure phrase from the list below
   Usage: node dev/test/story-voice/scan.js [--list KIND] [--json]   (exit 1 if Q3P/DIG/OBS after-counts are not 0 or the hook is missing) */
const fs=require("fs"),path=require("path");const D=path.join(__dirname,"../../build/");
const FILES=fs.readdirSync(D).filter(f=>/^(jrd_\w+|j67|jroad|jreign|jnroad\w*|jnrask\w*|j72|jstory|joi|jentry|jend14|jst14)\.js$/.test(f)).sort();
const OBS=[/chữ của trẫm chưa ra khỏi/,/chưa ra khỏi cửa điện/].concat([]);
const B="(?<![\\p{L}\\d])",E="(?![\\p{L}\\d])";
const OLD=new RegExp("(?<!(?:→|oán|quý|với|ghen) )"+B+"([Nn])àng"+E+"(?! ta"+E+")(?! ấy"+E+")(?! (?:oán|ghen|→|quý|thương)"+E+")","gu");
const NEW=new RegExp("^[^“”]*”|“[^”]*(?:”|$)|(?<!(?:→|oán|quý|với|ghen) )"+B+"([Nn])àng"+E+"(?! ta"+E+")(?! ấy"+E+")(?! (?:oán|ghen|→|quý|thương)"+E+")","gu");
const oldFix=s=>s.replace(OLD,"$1àng ta"),newFix=s=>s.replace(NEW,(m,n)=>n?n+"àng ta":m);
const quotes=s=>s.match(/“[^”]*”/g)||[];
const strs=src=>{const out=[];const re=/(\b[a-z]{1,3})?\s*:?\s*("(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)/g;let m;while((m=re.exec(src))){const v=m[2].slice(1,-1);if(v.length>=30&&/[ăâđêôơưàáạảãèéẹẻẽ]/i.test(v)&&/ /.test(v)&&!/^\s*(function|const|return)\b/.test(v))out.push({k:(src.slice(Math.max(0,m.index-4),m.index+1).match(/([a-z]+):?\s*$/)||[])[1]||"",v,i:m.index})}return out};
const tail=h=>{const t=h.replace(/\$\{[^}]*\}/g," ").replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();const q=t.lastIndexOf("”");return q>=0?t.slice(q+1).trim():t};
const framed=h=>/\?/.test(tail(h));
const R={files:{},list:{Q3P:[],NOFR:[],DIG:[],OBS:[]}};let tot={str:0,Q3Pb:0,Q3Pa:0,NOFR:0,beats:0,DIG:0,OBS:0};
for(const f of FILES){const src=fs.readFileSync(D+f,"utf8");const S=strs(src);const c={str:S.length,Q3Pb:0,Q3Pa:0,beats:0,NOFR:0,DIG:0,OBS:0};
 for(const x of S){const v=x.v.replace(/\{Goi\}/g,"Nàng").replace(/\{goi\}/g,"nàng");
  for(const q of quotes(v)){if(oldFix(q)!==q){c.Q3Pb++;R.list.Q3P.push(f+": "+q.slice(0,90))}}
  if(quotes(v).some(q=>/[Nn]àng ta/.test(newFix(q))&&!/[Nn]àng ta/.test(q)))c.Q3Pa++;
  const lit=x.v.replace(/\$\{[^}]*\}/g,"").replace(/<[^>]*>/g,"").replace(/\{\w+\}/g,"");
  if(!/\$\{/.test(x.v)&&/\d/.test(lit)&&!/[+\-−]\s?\d|\d\s?\/\s?\d|\((?:[^)]*\d)[^)]*\)|tốn:|thành:|hỏng:|lòng \d|\d khắc|\d tháng|Nhận lời: ngay/.test(lit)){c.DIG++;R.list.DIG.push(f+": "+x.v.slice(0,100))}
  if(OBS.some(r=>r.test(x.v))){c.OBS++;R.list.OBS.push(f+": "+x.v.slice(0,100))}
  if(x.k==="t"&&x.v.length>=60){c.beats++;if(!framed(x.v)){c.NOFR++;R.list.NOFR.push(f+": …"+x.v.slice(-80))}}}
 R.files[f]=c;for(const k in c)tot[k]+=c[k]}
const hook=/function svFrame\(/.test(fs.readFileSync(D+"jstory.js","utf8"))&&/\(m,n\)=>n\?n\+"àng ta":m/.test(fs.readFileSync(D+"j84.js","utf8"));
R.tot=tot;R.hook=hook;R.onScreenNOFR=hook?0:tot.NOFR;R.onScreenQ3P=hook?tot.Q3Pa:tot.Q3Pb;
const a=process.argv;if(a.includes("--json"))console.log(JSON.stringify(R,null,1));
else{const li=a.indexOf("--list");if(li>0){for(const l of R.list[a[li+1]]||[])console.log(l)}
 else{console.log("file\tstrings\tQ3P(old j84)\tbeats\tNOFR(source)\tDIG\tOBS");for(const f in R.files){const c=R.files[f];console.log([f,c.str,c.Q3Pb,c.beats,c.NOFR,c.DIG,c.OBS].join("\t"))}
  console.log(["TOTAL",tot.str,tot.Q3Pb,tot.beats,tot.NOFR,tot.DIG,tot.OBS].join("\t"));console.log(`hook=${hook} on-screen: Q3P ${R.onScreenQ3P} · NOFR ${R.onScreenNOFR} · DIG ${tot.DIG} · OBS ${tot.OBS}`)}}
process.exitCode=(!hook||R.onScreenQ3P||tot.OBS)?1:0;
