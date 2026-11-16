/* roster.js on a REAL "Chép sổ" code: play with the bot for some weeks, snapshot the record at the end of every buổi (own copy,
   khắc by khắc), then export the slot exactly as the title menu does (xioExport), and ask dev/tools/roster.js for
   (a) the current moment, (b) 6 past buổi × every khắc. Each row must equal the snapshot taken in the page at that time.
   usage: node ia_rostertool.js <url> <repo> <outdir> [origin] [weeks] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {spawnSync}=require('child_process');
const [,,URL,REPO,OUT,ORI='cn',WEEKS='9']=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();await p.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 await p.goto(URL);await p.waitForTimeout(1500);
 await p.evaluate(o=>{localStorage.clear();window.__forceOrigin=o;SLOT=1;document.getElementById('title').hidden=true;start();if(NLP)nlAccept(true);Q.length=0;try{closeModal()}catch(e){}},ORI);
 for(const f of [process.env.BOT||'inpage6.js','inbal.js'])await p.evaluate(fs.readFileSync(path.join(REPO,'dev/measure',f),'utf8'));
 const snaps=await p.evaluate(W=>{const snap={};const take=()=>{const R=S.roster;if(!R)return;const k=R.key;snap[k]=snap[k]||{};for(let kh=0;kh<4;kh++){snap[k][kh]=snap[k][kh]||{};for(const id in R.P){const e=R.P[id][kh];snap[k][kh][id]=[e[0],e[1],e[2],e[3]]}}};
  const o=nextBuoi;nextBuoi=function(){take();return o.apply(this,arguments)};const w0=wk();let n=0;while(wk()<w0+W&&n++<20000){window.__bot.step('sens',1);if(S.dead)break}
  /* stop on a clean moment */let m=0;while(Q.length&&m++<30){try{if(Q[0].opts&&Q[0].opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}
  take();return{snap,now:{key:S.roster.key,kh:j95kh(),P:JSON.parse(JSON.stringify(S.roster.P)),who:S.roster.who},wk:wk(),dead:!!S.dead}},+WEEKS);
 /* the real export */
 await p.evaluate(()=>{NLP=null;localStorage.setItem(SK(SLOT),JSON.stringify(ser()));localStorage.setItem("hclh-slot",String(SLOT))});const code=await p.evaluate(async()=>{await xioExport(1);return XIO.code});fs.writeFileSync(path.join(OUT,'save.code'),code);
 const run=(...a)=>spawnSync('node',[path.join(REPO,'dev/tools/roster.js'),path.join(OUT,'save.code'),...a.map(String),'--json'],{encoding:'utf8'});
 const ACT=Function('return '+fs.readFileSync(path.join(REPO,'dev/build/j95.js'),'utf8').match(/const ACT95=(\{[\s\S]*?\});/)[1])();
 const rep={code:code.slice(0,6)+'… '+code.length+' ký tự',now:null,past:[],bad:[]};
 const cmp=(tag,rows,P,who)=>{let n=0;const ids=new Set(rows.map(r=>r.id));for(const id in P){if(!ids.has(id)){rep.bad.push(`${tag}: roster.js thiếu ${id}`);continue}}
  for(const r of rows){const e=P[r.id];if(!e){rep.bad.push(`${tag}: roster.js thừa ${r.id}`);continue}n++;
   if(r.place!==e[0])rep.bad.push(`${tag}: ${r.id} nơi ${r.place} ≠ ${e[0]}`);if(r.act!==(ACT[e[1]]||e[1]))rep.bad.push(`${tag}: ${r.id} việc ${r.act} ≠ ${ACT[e[1]]||e[1]}`);if((r.why||'')!==(e[3]||''))rep.bad.push(`${tag}: ${r.id} lý do "${r.why}" ≠ "${e[3]}"`);
   const tn=e[2]?((who&&who[e[2]])||[e[2]])[0]:'';if(who&&(r.tgt||'')!==tn)rep.bad.push(`${tag}: ${r.id} đối tượng "${r.tgt}" ≠ "${tn}"`)}return n};
 /* (a) now */{const o=run();if(o.status!==0&&!o.stdout){rep.bad.push('roster.js lỗi: '+o.stderr.slice(0,300))}else{const j=JSON.parse(o.stdout);rep.now={at:j.at,total:j.total,err:j.err,rowsOK:cmp('hiện tại',j.rows,Object.fromEntries(Object.entries(snaps.now.P).map(([id,e])=>[id,e[snaps.now.kh]])),snaps.now.who),pageWk:snaps.wk,dead:snaps.dead,nowKey:snaps.now.key};if(j.at.kh!==snaps.now.kh)rep.bad.push(`khắc mặc định ${j.at.kh} ≠ ${snaps.now.kh}`)}
  const txt=spawnSync('node',[path.join(REPO,'dev/tools/roster.js'),path.join(OUT,'save.code')],{encoding:'utf8'});fs.writeFileSync(path.join(OUT,'roster_now.txt'),txt.stdout+txt.stderr);rep.nowExit=txt.status}
 /* (b) past buổi from the log */
 const keys=Object.keys(snaps.snap).filter(k=>k!==snaps.now.key).sort((a,b)=>{const [w1,b1]=a.split('-').map(Number),[w2,b2]=b.split('-').map(Number);return w2-w1||b2-b1}).slice(0,8);
 for(const k of keys){const [w,bb]=k.split('-').map(Number);for(let kh=0;kh<4;kh++){const o=run(w,bb,kh);if(o.status===2){rep.past.push({k,kh,res:'không có trong nhật ký: '+o.stdout.slice(0,100)});continue}
   let j;try{j=JSON.parse(o.stdout)}catch(e){rep.bad.push(`${k}/${kh}: roster.js lỗi ${o.stderr.slice(0,200)}`);continue}const n=cmp(`${k}/${kh}`,j.rows,snaps.snap[k][kh],null);rep.past.push({k,kh,rows:j.total,match:n,err:j.err})}}
 fs.writeFileSync(path.join(OUT,'rostertool.json'),JSON.stringify(rep,null,1));console.log(JSON.stringify({code:rep.code,now:rep.now,nowExit:rep.nowExit,past:rep.past.length,bad:rep.bad.length,badEx:rep.bad.slice(0,25)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
