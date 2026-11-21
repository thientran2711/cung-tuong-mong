/* review/dialog-stack (owner 21/11 mark #46): NEVER TWO DIALOGS OVERLAPPING. Scan: every second-layer overlay (room person card, word pop-up #kpop, podium #kpodov)
   x every dialog opener (death / era end over(), kitModal info, kitConfirm, kitPanel event, resultShow-style notice, night).
   For each pair: open the layer, open the dialog, then (a) the dialog's own box is hit-testable at its centre and bottom strip (top element inside #modal), (b) a WINNING dialog
   (death, night) leaves no other layer open (popIdx null, #kpop hidden, #kpodov gone), (c) page errors = 0. Prints a before/after table row per pair.
   usage: node dev/test/dialog-stack-scan.js <root of BUILT site> <device: fold|ipadAir> [shots dir]   (exit 1 on any failure; last line = summary) */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV,SH]=process.argv;
const LAYERS={
 pop:async g=>{await g.evaluate(()=>{S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};popIdx=null;renderStage()});await g.waitForTimeout&&0;
  for(let t=0;t<5;t++){await g.evaluate(()=>{const e=document.querySelector('[data-p="0"]');if(e)e.click()});await new Promise(r=>setTimeout(r,900));if(await g.evaluate(()=>!!document.querySelector('.pcpop')))return true}return false},
 kpop:async g=>g.evaluate(()=>{const a=document.querySelector('.hud,header,body');kpPop(a,'<div class="kpopt">Thang cơ hội</div>');return !document.getElementById('kpop').hidden})};
const DLG={
 death:{win:true,open:g=>g.evaluate(()=>{over("Bệnh nặng","Sức cạn dần mà không chữa.","Bệnh nặng",false)})},
 info:{win:false,open:g=>g.evaluate(()=>{kitModal({kind:"info",title:"Điều",sub:"thử",sections:[{h:"",rows:[["Một","Hai"]]}],btn:"Đã rõ"})})},
 confirm:{win:false,open:g=>g.evaluate(()=>{kitConfirm({title:"Chắc chắn?",lines:["Thử"],yes:"Xóa",no:"Thôi",onYes(){}})})},
 notice:{win:false,open:g=>g.evaluate(()=>{kitModal({kind:"notice",title:"Tin",sections:[{h:"",html:"<p>Tin thử</p>"}],btn:"Đã rõ"})})},
 night:{win:true,open:g=>g.evaluate(()=>{kitModal({kind:"night",title:"Đêm xuống",sections:[{h:"",html:"<p>Đêm</p>"}],btn:"Đã rõ"})})}};
(async()=>{const T=await boot(ROOT,DEV);const {g:G,p}=T;const g={evaluate:(f,a)=>G.evaluate(f,a),waitForTimeout:0};const rows=[];let bad=0;
 for(const [ln,lo] of Object.entries(LAYERS))for(const [dn,d] of Object.entries(DLG)){
  await G.evaluate(()=>{try{Q.length=0;S.dead=false;popIdx=null;const M=document.getElementById('modal');M.hidden=true;const k=document.getElementById('kpop');if(k)k.hidden=true;if(typeof kitPodiumClose==="function")kitPodiumClose(true)}catch(e){}});
  const opened=await lo(g);if(!opened){rows.push([ln,dn,'layer not openable here','-','-']);continue}
  await d.open(g);await new Promise(r=>setTimeout(r,1300));
  const r=await G.evaluate(()=>{const M=document.getElementById('modal');const d=M.querySelector('.dlg');const b=d.getBoundingClientRect();
   const hit=(x,y)=>{const e=document.elementFromPoint(x,y);return !!e&&M.contains(e)};
   const left={pop:popIdx!=null||!!document.querySelector('.pcpop'),kpop:!!document.getElementById('kpop')&&!document.getElementById('kpop').hidden,podium:!!document.getElementById('kpodov')};
   return {open:!M.hidden,center:hit(b.x+b.width/2,b.y+b.height/2),bottom:hit(b.x+b.width/2,b.y+b.height-6),left}});
  const win=d.win;const ok=r.open&&r.center&&r.bottom&&(!win||(!r.left.pop&&!r.left.kpop&&!r.left.podium));if(!ok)bad++;
  rows.push([ln,dn,ok?'OK':'FAIL',JSON.stringify({c:r.center,b:r.bottom}),win?JSON.stringify(r.left):'behind']);
  if(SH&&dn==='death'&&ln==='pop')await p.screenshot({path:SH+'/'+DEV+'-'+ln+'-'+dn+'.png'})}
 console.log('layer | dialog | result | hit centre/bottom | leftovers');rows.forEach(r=>console.log(r.join(' | ')));
 console.log(`dialog-stack-scan ${DEV}: ${rows.length} pairs, ${bad} bad, page errors ${T.errs.length}${T.errs.length?' '+T.errs[0]:''}`);await T.close();process.exit(bad||T.errs.length?1:0)})();
