/* node mkperf.js → img/_review/ring4/kperf.html : the smoothness probe for the owner's REAL Fold / iPad (?kperf=1 runs it).
   Same engine (area.js), same pictures (CDN), same kit button CSS (copied from jfocus/jkitsel/j9 at build time) — the game shell is not loaded,
   so it measures the area + picker MOTION itself: rAF frame time p95 per step, verdict «Mượt» when p95 ≤ 20 ms (BAL gate of the report). */
const fs=require('fs');const B=__dirname+'/../../build/';const rd=f=>fs.readFileSync(B+f,'utf8');
const grab=(src,re)=>(src.match(re)||[]).join('\n');
const css=[grab(rd('jfocus.js'),/\.kfoc-(?:b|pic|ph|t|tag)[^{]*\{[^}]*\}/g),grab(rd('jkitsel.js'),/\.kscn-tag[^{]*\{[^}]*\}/g),grab(rd('j59.js'),/\.kscn-tag \.j59[tn][^{]*\{[^}]*\}/g)].join('\n')
 .replace(/\$\{KIT_FOC\.[a-zA-Z]+\}/g,'6');
const CR=JSON.parse(fs.readFileSync(__dirname+'/crowd.json','utf8'));delete CR.roster;
const scen=fs.readFileSync(__dirname+'/scen3.js','utf8').split('window.KSC=')[0];const area=fs.readFileSync(__dirname+'/area.js','utf8');
const html=`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Đo độ mượt</title>
<style>:root{--ink:#3a2418;--gold:#b8892b;--k-card:#fffaf0;--dim:#7a6a58}html,body{margin:0;background:#f6ece4;font:15px/1.35 system-ui,sans-serif;color:#3a2418}
#stage{position:relative;width:100vw;height:min(78vh,100vw*.82);overflow:hidden}#out{padding:10px 14px}table{border-collapse:collapse;font-size:14px}td,th{padding:3px 8px;border-bottom:1px solid #e0cfc0;text-align:left}
.kchip{display:inline-block;border-radius:999px;background:#fffaf0;border:1px solid #c9a35a;padding:2px 9px}.pct{border:1px solid #c9a35a;border-radius:999px;background:#fffaf0;padding:2px 9px;font-size:12px}.pct.on{background:#8a2c2c;color:#fff}
button.go{font-size:16px;padding:8px 16px;margin:6px 0;border-radius:10px;border:1px solid #b8892b;background:#fffaf0}
${css}</style></head><body><main id="stage" class="stage j59"></main><div id="out"><b>Đo độ mượt hoạt cảnh khu vườn</b> (cùng bộ máy hoạt cảnh, cùng tranh; chưa có giao diện game).<br><button class="go" id="go">Bắt đầu đo</button><div id="res"></div></div>
<script>var tab='act';function render(){}function j77Tap(){}var CR=${JSON.stringify(CR)};${scen}</script><script>${rd('jkpick.js')}</script><script>${area}</script>
<script>
const W=ms=>new Promise(r=>setTimeout(r,ms));async function meas(fn,ms){const ft=[];let l=performance.now(),on=1;const f=t=>{if(!on)return;ft.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f);await fn();await W(ms);on=0;ft.shift();ft.sort((a,b)=>a-b);const p=q=>ft[Math.min(ft.length-1,Math.floor(ft.length*q))]||0;return {p50:p(.5),p95:p(.95),jank:ft.filter(x=>x>33.4).length,n:ft.length}}
async function run(){document.getElementById('go').disabled=true;const R=[];const add=(n,r)=>{R.push([n,r]);show(R)};
 add('đứng yên',await meas(async()=>{},1200));
 for(const pk of ['hang','fan','rib']){window.__karAuto=1;const i=KAR.init({groups:JSON.parse(JSON.stringify(CR.groups)),areas:BAL.area.vuon,fh:document.getElementById('stage').clientHeight*.72,bg:'https://ctm-img.victoria-tntt.workers.dev/img/ngu-hoa-vien-xuan-trua.webp'});await W(400);
  let ai=0,b=0;KAR.areas.forEach((a,k)=>{if(a.g.length>b){b=a.g.length;ai=k}});
  add(pk+' · vào khu',await meas(()=>KAR.enter(ai),900));const g=KAR.areas[ai].g[0];
  add(pk+' · chọn nhóm',await meas(()=>KAR.pickGroup(g),600));add(pk+' · bước ra',await meas(()=>KAR.stepOut(g.masters[0]),300));
  add(pk+' · mở nút',await meas(()=>KAR.picker(g.masters[0],pk),200));add(pk+' · nhấc nút',await meas(async()=>{const x=document.querySelectorAll('#kar .kar-pk .kfoc-b')[1];x&&KAR.lift(x,pk)},600));
  add(pk+' · nói chuyện',await meas(()=>KAR.talk(g.masters[0],'Muội muội cũng ra vườn ngắm hoa sao?'),600));await KAR.unsel()}
 document.getElementById('go').disabled=false}
function show(R){const nm={hang:'Thẻ gỗ treo',fan:'Quạt nút',rib:'Nan quạt giấy'};document.getElementById('res').innerHTML='<table><tr><th>bước</th><th>khung chậm nhất (95%)</th><th></th></tr>'+R.map(([n,r])=>'<tr><td>'+n.replace(/^(hang|fan|rib)/,m=>nm[m])+'</td><td>'+r.p95.toFixed(1)+' ms</td><td>'+(r.p95<=20?'Mượt':r.p95<=34?'Hơi khựng':'Giật')+'</td></tr>').join('')+'</table><p>'+navigator.userAgent.replace(/[<>]/g,'')+' · '+innerWidth+'x'+innerHeight+' @'+devicePixelRatio+'</p>'}
document.getElementById('go').onclick=run;if(/kperf=1/.test(location.search))setTimeout(run,800);
</script></body></html>`;
fs.mkdirSync(__dirname+'/../../../img/_review/ring4',{recursive:true});fs.writeFileSync(__dirname+'/../../../img/_review/ring4/kperf.html',html);console.log('kperf.html',html.length);
