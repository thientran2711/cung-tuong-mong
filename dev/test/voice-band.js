/* palace-voice rank-band test (owner 16/11 ~21:05Z, OD "OWNER on the palace-voice samples"):
   (1) every pooled line fits the LISTENER's rank band: an untagged line must not use band-only words (newcomer words never reach a
       Quý phi; "chủ vị / mẫu nghi" words never reach a Thường tại); a tagged line is said only to its band (runtime, 12 tuần per pool);
   (2) Hoàng thượng: only "nàng" / "ái phi", short lines (<= BAL-free fixed audit cap of 10 words per emperor reaction line);
   (3) two forms: a Sổ ghi line carrying the literary part (kLitLog) gives the result card its SHORT form (kaSentence / kShort) and the log
       the LONG one. Prints 10 sample lines per band (for the owner).
   usage: node dev/test/voice-band.js */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript; charset=utf-8':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const url=`http://127.0.0.1:${srv.address().port}/index.html`;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const fail=[],samples={lo:[],mid:[],hi:[],hq:[]},counts={};
  const ONLY={lo:/(?<!từ ngày )mới vào cung|phận còn nhỏ|phẩm(?: vị)? còn (?:thấp|nhỏ)|phẩm vị chưa cao|Tú nữ mới|cùng phẩm khẽ kéo/i,
   mid:/chủ một cung|chủ vị|cung riêng/i,hi:/đứng đầu các phi|chỉ đứng (?:sau|dưới)|phẩm vị chỉ dưới|ngồi gần Trung cung/i,hq:/mẫu nghi|ngồi Trung cung|Trung cung (?:có|đoan|khoan|mà|hôm)|ngày đại hôn|mũ phượng|phượng quan/i};
  const NOT_HQ=/chủ lục cung|cạnh Hoàng hậu cũng|(^|[^h])tần thiếp|tỷ tỷ/i;/* never to the Empress herself */
  const TAG=/^\[([a-z,]+)\]/;
  /* static: untagged lines must not carry band-only words */
  const pools=[];for(const [k,P] of Object.entries(TOIL_SAY))for(const [sub,L] of Object.entries(P))pools.push([`toil:${k}:${sub}`,L,k]);
  for(const [k,P] of Object.entries(TOIL_TRAIT))for(const [tr,L] of Object.entries(P))pools.push([`trait:${k}:${tr}`,L,k]);
  for(const [k,P] of Object.entries(kLines()))pools.push([k,Array.isArray(P)?P:[].concat(...Object.values(P)),k]);
  for(const [name,L,k] of pools)for(const x of L){const m=TAG.exec(x);const bands=m?m[1].split(","):["lo","mid","hi","hq"];
   for(const [bd,rx] of Object.entries(ONLY))if(rx.test(x)&&!(bands.length===1&&bands[0]===bd))fail.push(`${name}: band-only words (${bd}) in a line said to [${bands}]: ${x}`);
   if(/^emp-/.test(k)){const w=x.replace(TAG,"").replace(/[“”.,?!…]/g,"").trim().split(/\s+/).length;if(w>10)fail.push(`${name}: Hoàng thượng line too long (${w} words): ${x}`)}}
  /* runtime: every reaction pool × band × 12 tuần */
  const RK={lo:1,mid:3,hi:5,hq:7};const LOOK=[{mk:"moc",dress:"doan"},{mk:"vung",dress:"doan"},{mk:"tuyet",dress:"diem"},{mk:"vua",dress:"giandi"},{mk:"vua",dress:"photruong"},{mk:"dep",dress:"doan"}];
  const v=rivals.find(x=>!x.queen&&x.alive),q=rivals.find(x=>x.queen);
  for(const [bd,r] of Object.entries(RK)){S.rank=r;S.sung=bd==="hi"||bd==="hq"?60:10;S.th=bd==="lo"?-40:20;counts[bd]=0;
   for(const k of Object.keys(TOIL_SAY)){if(bd==="hq"&&/^hh-/.test(k))continue;const host=/^th/.test(k)?"th":/^emp/.test(k)?"emp":/^hh/.test(k)?q:v;if(!host)continue;
    for(const L of LOOK)for(let i=0;i<12;i++){S.tuan=(S.tuan+1)%3;if(!S.tuan)S.turn++;const said=toilSay(k,Object.assign({host},L));counts[bd]++;
     for(const [ob,rx] of Object.entries(ONLY))if(ob!==bd&&rx.test(said)&&!(ob==="lo"&&/từ ngày mới vào cung/.test(said)))fail.push(`runtime ${bd}: ${k} said a ${ob}-only line: ${said}`);
     if(bd==="hq"&&NOT_HQ.test(said))fail.push(`runtime hq: ${k} said a line not fit for the Empress: ${said}`);
     if(/\[[a-z,]+\]/.test(said))fail.push(`runtime ${bd}: tag leaked: ${said}`);
     if(/^emp/.test(k)&&/\b(ngươi)\b/.test(said))fail.push(`runtime ${bd}: Hoàng thượng said "ngươi": ${said}`)}}
   for(const kind of ["th","emp","hh"]){if(bd==="hq"&&kind==="hh")continue;for(let i=0;i<10;i++){S.tuan=(S.tuan+1)%3;if(!S.tuan)S.turn++;const o=kOutcome(kind,i%2===0);
     for(const [ob,rx] of Object.entries(ONLY))if(ob!==bd&&rx.test(o))fail.push(`runtime ${bd}: kOutcome ${kind} ${ob}-only: ${o}`)}}
   /* 10 samples per band: reactions of Thái hậu / Hoàng thượng / Hoàng hậu / a consort, then a talk result */
   const SM=[["th-praise","th",{mk:"vua",dress:"doan"}],["th-scold","th",{mk:"tuyet",dress:"diem"}],["emp-like","emp",{mk:"dep",dress:"doan"}],["emp-dislike","emp",{mk:"moc",dress:"doan"}],
    ["hh-praise",q,{mk:"vua",dress:"giandi"}],["hh-scold",q,{mk:"vua",dress:"photruong"}],["rival-jealous",v,{mk:"vua",dress:"photruong"}],["rival-praise",v,{mk:"vua",dress:"giandi"}],["crowd-jealous",v,{mk:"vua",dress:"photruong"}],["th-praise","th",{mk:"vua",dress:"giandi"}]];
   S.vmem={};for(const [k,host,L] of SM){if(bd==="hq"&&/^hh-/.test(k)){S.tuan=(S.tuan+1)%3;if(!S.tuan)S.turn++;samples[bd].push(`Hoàng thượng (talk result): ${kOutcome("emp",true)}`);continue}
    S.tuan=(S.tuan+1)%3;if(!S.tuan)S.turn++;samples[bd].push(`${TOIL_EV[k]}: ${toilSay(k,Object.assign({host},L))}`)}}
  /* Hoàng thượng address only nàng / ái phi */
  S.rank=2;S.sung=BAL.voice.aiPhi-5;const a1=kSay("emp",S,"{Goi}");S.sung=BAL.voice.aiPhi+5;const a2=kSay("emp",S,"{Goi}");if(a1!=="Nàng"||a2!=="Ái phi")fail.push(`emp address ${a1} / ${a2}`);
  /* two forms */
  const before=rsnap();log("Thỉnh an: thành. Thái hậu → ta: thiện cảm +2.");kLitLog(before.seq,"Thái hậu khẽ gật đầu, tràng hạt lần chậm lại");
  const longL=plain(S.logs[0]),shortL=plain(kShort(S.logs[0])),card=kaSentence(before);if(/khẽ gật đầu/.test(card))fail.push("two forms: result card sentence has the literary part: "+card);
  if(!/khẽ gật đầu/.test(longL))fail.push("two forms: the Sổ ghi line lost the literary part: "+longL);
  if(/khẽ gật đầu/.test(shortL))fail.push("two forms: the result card shows the literary part: "+shortL);
  if(!/thiện cảm \+2/.test(longL))fail.push("two forms: numbers lost");
  return{fail,samples,counts,two:{long:longL,short:shortL,emp:[a1,a2]}}});
 for(const [bd,L] of Object.entries(R.samples)){console.log(`--- ${bd} (${R.counts[bd]} lines checked)`);L.forEach((x,i)=>console.log(`${i+1}. ${x}`))}
 console.log('--- two forms:\nLONG (Sổ ghi): '+R.two.long+'\nSHORT (result card): '+R.two.short+'\nHoàng thượng: '+R.two.emp.join(' / '));
 console.log(R.fail.length?'FAIL ('+R.fail.length+')\n'+R.fail.slice(0,40).join('\n'):'PASS',errs.length?'pageerrors: '+errs.slice(0,3).join(' | '):'no page errors');
 await b.close();srv.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
