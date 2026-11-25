const ODDS=['Mong manh','Hiểm','Khó lường','Tùy duyên','Có cơ','Vững','Rất vững'];
const EXIT=/xuất gia|dâng biểu xin|trốn khỏi cung|về quê phụng dưỡng|xin ban hôn|ban hôn cho|nghĩ cách trốn|xin xuất cung|xuất cung|tự phế|xin phế|cầu phế|bỏ cuộc|tự vẫn|tự sát|tự tử|thoát khỏi cung|trốn khỏi cung|bỏ trốn|đổi thân phận|kiếp mới|làm lại|chơi lại|xin chết|cắt tóc|đi tu|quy y/i;
const CONT=/^(Tiếp theo|Tiếp|Vào cung|Vào điện|Xong|Đóng|Hiểu rồi|Đã rõ|Được rồi|Ừ|OK|Tiếp tục|Nhận thân phận|Nhận|Bắt đầu|Thu nhận|Ta biết rồi|Vâng|Lui|Về)\b/i;
const fsx=require('fs');
let api0={addBug:()=>{}};
function esc(snap,c,mem,n){ {const ek=JSON.stringify(snap.S)+snap.modal.slice(0,60);if(mem.escKey!==ek){mem.escKey=ek;mem.escRun=0}mem.escRun=(mem.escRun||0)+1;if(mem.escRun>=14){mem.escRun=0;mem.same=0;api0.addBug('SOFTLOCK-RELOAD','no tap-reachable button for 45 escalations; true reload used to escape: '+snap.modal.slice(0,80),JSON.stringify(snap.S));return {type:'boot'}}}mem.esc=(mem.esc||0)+1;const k=mem.esc;mem.dscr=0;mem.pt=0;
 if(k%25===1){fsx.appendFileSync(__dirname+'/stuck.log',new Date().toISOString()+' STUCK k='+k+' S='+JSON.stringify(snap.S)+' modal='+snap.modal.slice(0,150)+' btns='+c.filter(x=>x.tag==='BUTTON').map(x=>x.txt.slice(0,25)).slice(0,8).join('/')+'\n');return {type:'pause',why:'STUCK escalation '+k}}
 const bt=c.filter(x=>x.tag==='BUTTON'&&!EXIT.test(x.txt)&&x.cls!=='menu'&&!/k3dim|krailb|pct|kcard/.test(x.cls)&&!/kobang/.test(x.cls));
 const step=k%6;
 if(step===0)return {type:'scroll',x:378,y:500,dy:450};
 if(step===1&&bt.length)return {type:'tap',x:bt[0].x,y:bt[0].y,why:'ESC first button '+bt[0].txt.slice(0,30)};
 if(step===2&&bt.length)return {type:'tap',x:bt[bt.length-1].x,y:bt[bt.length-1].y,why:'ESC last button '+bt[bt.length-1].txt.slice(0,30)};
 if(step===3)return {type:'tap',x:378,y:420,why:'ESC tap empty centre'};
 if(step===4){const sg=c.find(x=>/\bmain\b/.test(x.cls));if(sg)return {type:'tap',x:sg.x,y:sg.y,why:'ESC main'}}
 return {type:'wait',ms:1500}}
module.exports.decide=async(snap,mem,api)=>{api0=api;
 const fs=require('fs');if(fs.existsSync(__dirname+'/next.json')){const a=JSON.parse(fs.readFileSync(__dirname+'/next.json','utf8'));fs.unlinkSync(__dirname+'/next.json');return a}
 const c=snap.c.filter(x=>(x.hit||/kxcatch/.test(x.cover||''))&&!x.off&&!x.dis);
 const tap=(x,why)=>{if(/kopt/.test(x.cls)&&x.w>60)return {type:'tap',x:Math.round(x.x+x.w*0.1),y:Math.round(x.y+x.h*0.3),why:why+' (opt offset) | '+x.txt.slice(0,50)};return {type:'tap',x:x.x,y:x.y,why:why+' | '+x.txt.slice(0,50)}};
 let lg=false;try{lg=await api.p.evaluate(()=>{const L=[...document.querySelectorAll('div,section,aside')].filter(e=>/^Thang cơ duyên/.test((e.innerText||'').trim())&&getComputedStyle(e).visibility!=='hidden');if(!L.length)return null;let best=null,ba=1e9;L.forEach(e=>{const r=e.getBoundingClientRect();const a=r.width*r.height;if(a>0&&a<ba){ba=a;best=r}});if(!best)return null;return [best.x+best.width/2,best.y+14]})}catch(e){}
 if(lg){mem.lg=(mem.lg||0)+1;return {type:'tap',x:Math.round(mem.lg%3===0?30:lg[0]),y:Math.round(mem.lg%3===0?700:lg[1]),why:'close odds legend popover'}}else mem.lg=0;
 mem.n++;
 if(snap.S&&snap.S.over){if(!mem.fin){mem.fin=1;let ex={};try{ex=await api.p.evaluate(()=>({fate:S.fate,rank:S.rank,maxRank:S.maxRank,year:S.year,age:S.age,name:S.name,origin:S.origin&&S.origin.n}))}catch(e){}fsx.writeFileSync(__dirname+'/final.json',JSON.stringify({t:new Date().toISOString(),sangN:mem.sangN,taps:mem.taps,reloads:mem.reloads,ex,start:mem.t0},null,1));api.log('FINAL LIFE OVER',JSON.stringify(ex));await api.shot('final')}return {type:'wait',ms:5000}}
 if(!mem.t0)mem.t0=new Date().toISOString();
 if(snap.S&&snap.S.year!=null){if(mem.yr==null)mem.yr=snap.S.year;if(snap.S.year!==mem.yr&&!snap.modal&&!c.some(x=>/kgr|kit-x/.test(x.cls))){mem.yr=snap.S.year;mem.reloads=(mem.reloads||0)+1;api.log('YEAR',snap.S.year,'age',snap.S.age,'TRUE RELOAD #'+mem.reloads);return {type:'boot'}}}
 const sig=c.map(x=>x.txt.slice(0,20)).join('|')+snap.modal.slice(0,80);
 if(sig===mem.last)mem.same++;else{mem.same=0;mem.last=sig}
 if(mem.same>12&&!snap.c.some(x=>/Chơi một mình/.test(x.txt)&&!x.hit)){const n=mem.same;mem.same=8;return esc(snap,c,mem,n)}
 if(mem.mg==null)mem.mg=0;let g;mem.dscr=mem.dscr||0;
 if(g=c.find(x=>/kgr-go/.test(x.cls))){mem.mg++;const q=c.find(x=>/kquick/.test(x.cls));if(mem.mg%10!==0||!q)return tap(g,'minigame ready (play)');return tap(q,'minigame skip (Bỏ qua)')}
 if(g=c.find(x=>x.tag==='CANVAS'&&x.hit)){if(!mem.cv)mem.cv=Date.now();if(Date.now()-mem.cv>120000){const xb=c.find(x=>x.cls==='kit-x');if(xb){mem.cv=0;return tap(xb,'minigame timeout close')}}
  mem.same=0;let ph='';try{ph=await api.p.evaluate(()=>typeof KG82!=='undefined'?KG82.phase:'')}catch(e){}let toil=false;try{toil=await api.p.evaluate(()=>typeof TOIL!=='undefined'&&!!TOIL.geo&&typeof TOIL.geo.phase==='function'&&(()=>{try{TOIL.geo.phase();return !!document.getElementById('toilgo')||(!!TOIL.geo.ready()&&TOIL.geo.phase()<3)}catch(e){return false}})())}catch(e){}
 if(toil&&ph!=='play'){mem.phw=0;return {type:'toilplay'}}
 if(ph!=='play'){if(ph!==mem.ph){mem.ph=ph;api.log('minigame phase',ph)}mem.phw=(mem.phw||0)+1;if(mem.phw>4){const bb=c.filter(x=>x.tag==='BUTTON'&&x.w>200&&x.y>650&&!EXIT.test(x.txt)).sort((a,z)=>z.y-a.y)[0];if(bb&&mem.phw<14){return tap(bb,'minigame non-play phase: wide button')}const xb=c.find(x=>/kit-x/.test(x.cls));if(xb&&mem.phw>=14){mem.phw=0;api.addBug('MINIGAME-STUCK','board never reached phase play; closed with X',snap.modalCls);return tap(xb,'minigame close x (stuck)')}}return {type:'wait',ms:400}}mem.phw=0;return {type:'mgplay'}}
 mem.cv=0;
 // title
 let b;
 if(b=c.find(x=>/Chơi một mình/.test(x.txt)&&x.tag==='BUTTON'))return tap(b,'title solo');
 if(b=c.find(x=>x.tag==='BUTTON'&&/Tiếp tục kiếp này|Tiếp tục/.test(x.txt)&&/kbtn/.test(x.cls)))return tap(b,'title continue life');
 if(b=c.find(x=>/^Bắt đầu kiếp mới/.test(x.txt)))return tap(b,'new life');
 if(b=c.find(x=>/krgo/.test(x.cls)))return tap(b,'roulette go');
 if(b=c.filter(x=>/\bkrt\b/.test(x.cls)&&/down/.test(x.cls)).sort((a,z)=>(/thầy đồ/.test(z.txt)?1:0)-(/thầy đồ/.test(a.txt)?1:0))[0])return tap(b,'roulette card');
 if(b=c.find(x=>/\bkmend\b/.test(x.cls)))return tap(b,'mend');
 if(b=c.find(x=>x.tag==='BUTTON'&&x.cls.includes('opt')&&/^Nhận thân phận/.test(x.txt)))return tap(b,'accept origin');
 if(b=c.find(x=>(/mclose|kbtn/.test(x.cls)||x.tag==='BUTTON')&&CONT.test(x.txt)&&!EXIT.test(x.txt)))return tap(b,'continue');
 if(snap.c.some(x=>/Chơi một mình/.test(x.txt)&&!x.hit)&&mem.same<40){return {type:'wait',ms:3000}}
 const opts=c.filter(x=>x.tag==='BUTTON'&&/\bopt\b/.test(x.cls)&&!EXIT.test(x.txt));
 if(opts.length){const sc=o=>{let v=0;ODDS.forEach((w,i)=>{if(o.txt.includes(w+' ')||o.txt.includes(w))v=Math.max(v,i+1)});v*=2;const m=o.txt.match(/ĐƯỢC(.*)/);return v+Math.random()*.5};opts.sort((a,z)=>sc(z)-sc(a));{const o=opts[0];mem.of=mem.of||{};const k=o.txt.slice(0,40);mem.of[k]=(mem.of[k]||0)+1;if(mem.of[k]===3){api.addBug('UX-OPTION-CENTRE','tap at the centre of option "'+k+'" hits the odds chip (opens Thang cơ duyên legend) instead of choosing',snap.modalCls)}if(mem.of[k]>=3&&mem.of[k]<8&&o.w>60){return {type:'tap',x:Math.round(o.x+o.w*0.1),y:Math.round(o.y+o.h*0.3),why:'option (offset from odds chip) | '+o.txt.slice(0,40)}}if(mem.of[k]>=8)mem.of[k]=0;return tap(o,'option')}}
  if(b=c.find(x=>x.tag==='BUTTON'&&/kbtn|kmtake|mclose/.test(x.cls)&&!/\balt\b/.test(x.cls)&&!EXIT.test(x.txt)))return tap(b,'primary');
 if(b=c.find(x=>x.cls==='kit-x'||/\bkit-x\b/.test(x.cls)))return tap(b,'close x');
 if(snap.c.some(x=>/kxcatch/.test(x.cover||''))){return {type:'tap',x:378,y:420,why:'dismiss result toast (tap catcher)'}}

 {const part=snap.c.find(x=>x.hp&&!x.hit&&x.tag==='BUTTON'&&/\bopt\b/.test(x.cls)&&!x.dis&&!EXIT.test(x.txt));if(part&&(mem.pt||0)<4&&!c.some(x=>/\bopt\b/.test(x.cls))){mem.pt=(mem.pt||0)+1;return {type:'tap',x:part.hp[0],y:part.hp[1],why:'PARTIAL-VISIBLE option sliver tap | '+part.txt.slice(0,40)}}if(!part)mem.pt=0}
 // off-screen option inside a dialog: scroll it into view
 const offOpt=snap.c.find(x=>(x.off||x.hit===false)&&x.tag==='BUTTON'&&/\bopt\b/.test(x.cls)&&!x.dis&&!EXIT.test(x.txt)&&!/kxcatch/.test(x.cover||''));
 if(offOpt&&snap.modalCls&&(mem.dscr||0)>=4){mem.dscr=0;mem.nsl=(mem.nsl||0)+1;if(mem.nsl<=3)api.addBug('SOFTLOCK-RELOAD','dialog buttons unreachable by tap/scroll ('+snap.modal.slice(0,60)+'); true reload used (#'+mem.nsl+')',JSON.stringify(snap.S));else api.log('SOFTLOCK-RELOAD #'+mem.nsl);return {type:'boot'}}
 if(offOpt&&snap.modalCls&&(mem.dscr||0)<4&&!c.some(x=>/\bkcard\b/.test(x.cls)&&/Chọn|Để/.test('')) ){mem.dscr=(mem.dscr||0)+1;mem.same=0;return {type:'scroll',x:378,y:500,dy:650}}
 else if(!offOpt)mem.dscr=0;
 // held news: Sang buổi dimmed with a red '!' badge → tap the badge
 {const sd=snap.c.find(x=>x.tag==='BUTTON'&&/\bmain\b/.test(x.cls)&&/^Sang /.test(x.txt));const bg=c.find(x=>/kntb/.test(x.cls));const key2=JSON.stringify(snap.S);if(sd&&sd.dis&&bg&&mem.bgKey!==key2){mem.bgKey=key2;return tap(bg,'held news badge')}}
 // ---- MAIN SCREEN (no overlay): act cards in the Hành sự tab, then Sang buổi
 const sang=c.find(x=>x.tag==='BUTTON'&&/\bmain\b/.test(x.cls)&&/^Sang /.test(x.txt));
 if(sang){
  const key=JSON.stringify(snap.S)+snap.head;
  if(mem.bkey!==key){mem.bkey=key;mem.scr=0;mem.fail={};mem.bact=mem.bact||0}
  const bk2=JSON.stringify([snap.S&&snap.S.year,snap.S&&snap.S.month,snap.S&&snap.S.tuan,snap.S&&snap.S.buoi]);if(mem.bk2!==bk2){mem.bk2=bk2;mem.bact=0}
  const cards=c.filter(x=>/\bkcard\b/.test(x.cls)&&!EXIT.test(x.txt));
  if(!cards.length){const ht=c.find(x=>x.tag==='BUTTON'&&/^Hành sự$/.test(x.txt));if(ht&&mem.hsKey!==key){mem.hsKey=key;return tap(ht,'open Hành sự tab')}}
  const suc=+(((snap.head||'').match(/Sức\s*(\d+)/)||[])[1]||80);
  const score=x=>{const t=x.txt;let v=0;
   if(/Điểm trang/.test(t))v+=6;if(/Thỉnh an/.test(t))v+=4;if(/Học tập|Đọc sách|Luyện|Đàn|Cầm|Kỳ|Họa|Thi|Tài nghệ|binh thư|Múa/.test(t))v+=3;
   if(/Nghỉ ngơi|Dưỡng/.test(t))v+=suc<50?7:suc<75?2:-1;if(/Y dược|thái y/i.test(t))v+=suc<45?4:-1;
   if(/Giao thiệp|Trò chuyện|Nghe ngóng/.test(t))v+=2;if(/Mưu kế/.test(t))v-=3;if(/Lối riêng/.test(t))v-=4;if(/Buôn bán|Phát bạc/.test(t))v+=0;
   ODDS.forEach((w,i)=>{if(t.includes(w))v+=i*.3});v-=(mem.fail[t.slice(0,40)]||0)*5;return v+Math.random()*2};
  const ok=cards.filter(x=>!x.dis&&!(/Điểm trang/.test(x.txt)&&(snap.S.tuan%3)));
  if(ok.length&&mem.bact<(suc<60?2:1)){mem.bact++;ok.sort((a,z)=>score(z)-score(a));mem.fail[ok[0].txt.slice(0,40)]=(mem.fail[ok[0].txt.slice(0,40)]||0)+1;return tap(ok[0],'act card')}
  if((mem.scr||0)<6&&snap.c.some(x=>/\bkcard\b/.test(x.cls)&&x.off&&!x.dis)){mem.scr=(mem.scr||0)+1;return {type:'scroll',x:378,y:600,dy:420}}
  mem.sangN=(mem.sangN||0)+1;if(mem.sangN%20===1){api.shot('m_'+mem.sangN);fsx.writeFileSync(__dirname+'/status.json',JSON.stringify({t:new Date().toISOString(),sangN:mem.sangN,S:snap.S,taps:mem.taps,reloads:mem.reloads}))}return tap(sang,'Sang buổi/ngày mới');
 }
 if(mem.same<10)return {type:'wait',ms:1500};
 return esc(snap,c,mem,mem.same);
};
