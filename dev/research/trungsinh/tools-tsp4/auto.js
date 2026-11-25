const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:9333');const p=b.contexts()[0].pages()[0];
const LOG=process.env.LOG||'/tmp/ts/life.log';const maxSteps=+(process.argv[2]||30);
const acts=(process.env.ACTS||'Nhận việc,Đọc sách,Tài nghệ,Đối đáp,Lễ nghi').split(',');
const log=s=>fs.appendFileSync(LOG,s+'\n');
let ai=0;let prevJ=fs.existsSync('/tmp/ts/prevJ')?fs.readFileSync('/tmp/ts/prevJ','utf8'):'';
for(let i=0;i<maxSteps;i++){
 const st=await p.evaluate(()=>{const m=document.querySelector('.modal-backdrop');const vis=e=>e.offsetParent!==null;
  const date=(document.body.innerText.match(/(Xuân|Hạ|Thu|Đông)\s*·\s*Năm\s*\d+/)||[''])[0];
  const mon=(document.body.innerText.match(/Tháng \d+/)||[''])[0];
  const head=document.querySelector('.identity')?.innerText.replace(/\n/g,' ');
  if(m){return {modal:true,text:m.querySelector('.modal-content')?.innerText||m.innerText,btns:[...m.querySelectorAll('button')].filter(vis).map(x=>x.innerText.trim().replace(/\n/g,' / ')).filter(Boolean),date,mon,head}}
  const left=(document.body.innerText.match(/Việc trong tháng\s*\n\s*(\d+)\/(\d+)/)||[])[1];
  return {modal:false,left:+left,date,mon,head}});
 if(st.modal){
  log(`[${st.date} ${st.mon}] MODAL: ${st.text.replace(/\n+/g,' | ')} <<${st.btns.join(' || ')}>>`);
  const real=st.btns.filter(x=>!/^(✕|×|Đóng)$/.test(x));
  if(/luân hồi|Kết cục|Hồi kết|qua đời|Tạ thế|Kết thúc/i.test(st.text+real.join(' '))&&!/Điểm luân hồi \+/.test(st.text)){console.log('ENDING?\n'+st.text+'\nBTNS: '+real.join(' || '));process.exit(0)}
  if(real.length===1){await p.locator('.modal-backdrop').getByRole('button',{name:real[0]}).first().click();await p.waitForTimeout(1600);continue}
  if(process.env.AUTO){const skip=real.find(x=>/Không tham gia|Xin vắng mặt/.test(x));let pickb=skip;
   if(!pickb&&real.length>1&&!real.some(x=>/dự thi|Tham gia|Chọn y phục|Bước vào|Rút|Mở|Xem|❖|Sang vòng|Tổng kết/.test(x))){pickb=real[Math.floor(Math.random()*real.length)]}
   if(pickb){log('   AUTOCHOSE: '+pickb.replace(/\n/g,' / '));const bs=p.locator('.modal-backdrop button').filter({hasText:/\S/});const n=await bs.count();for(let k=0;k<n;k++){const tx=(await bs.nth(k).innerText()).replace(/\n/g,' / ').trim();if(tx===pickb){await bs.nth(k).click();break}}await p.waitForTimeout(1800);continue}}
  console.log('DECISION\n'+st.date+' '+st.mon+'\n'+st.text+'\nBTNS: '+st.btns.join(' || '));process.exit(0)}
 if(st.left>0){
  let a=acts[ai++%acts.length];const hp=await p.evaluate(()=>+((document.body.innerText.match(/Sức khỏe\n(\d+)/)||[])[1]||100));if(hp<55&&ai%2==0)a='Y quan';
  const loc=p.locator('button.activity',{hasText:a}).first();
  try{await loc.click({timeout:3000});}catch(e){log('act fail '+a)}
  await p.waitForTimeout(1500);
  const d=await p.evaluate(()=>{const j=[...document.querySelectorAll('.journal-scroll ~ *, [class*=journal]')];return ''});
  continue}
 const jt=await p.evaluate(()=>{const t=document.body.innerText;const a=t.indexOf('Nhật ký tháng');const b=t.indexOf('Cuộc đời\nHoàng');const s=t.slice(0,t.indexOf('Thủ công')).split('Nhật ký').pop().replace(/\n/g,' ');return s+' || '+t.slice(a+30,b).replace(/\n+/g,' ')});let [sp,jr]=jt.split(' || ');let add=jr.startsWith(prevJ)?jr.slice(prevJ.length):jr;prevJ=jr;fs.writeFileSync('/tmp/ts/prevJ',jr);log('   STATE: '+sp.trim()+'\n   NEW: '+add.trim());await p.locator('button.month-button').click();log(`-- end month ${st.date} ${st.mon} | ${st.head}`);await p.waitForTimeout(1800);
}
console.log('done steps');process.exit(0)})();
