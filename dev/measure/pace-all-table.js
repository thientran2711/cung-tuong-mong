// review/pace-all: the STATIC half of the ONE PACE TABLE — every progress bar's step (from BAL) and what ONE ordinary act gives (from BAL), so
// the share of a step one act moves can be read for bars the robot never plays (servant road, pets, khuê các). The robot half: pace-all.js.
// usage: node dev/measure/pace-all-table.js <page.html>   → markdown rows (bar · step · act · act gain · share · acts per step · flag)
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(process.argv[2]));await p.waitForTimeout(2500);
 const rows=await p.evaluate(()=>{const R=[];const add=(bar,step,act,g)=>R.push([bar,step,act,g]);
  const need=l=>typeof crsNeedP==='function'?crsNeedP(l):Math.ceil((BAL.art.tier[l+1]-BAL.art.tier[l])/BAL.art.gain[l]);
  const nm=BAL.art.nm;
  /* courses: self-study played (lesG self of 1..3, mean 2), quick (BAL.skip: od % for raw → 2, else 1), teacher (max(pts, self+tchMin), mean 3) */
  const q=BAL.skip.od/100;const quick=q*Math.max(1,lesG('self',2))+(1-q)*Math.max(1,lesG('self',0));
  for(let l=0;l<5;l++){const n=need(l);add(`Tài nghệ / Tứ đức · ${nm[l]}→${nm[l+1]}`,n,'tự học (chơi, trung bình)',lesG('self',2));
   add(`Tài nghệ / Tứ đức · ${nm[l]}→${nm[l+1]}`,n,'học với thầy (trung bình)',lesG('teacher',2));add(`Tài nghệ / Tứ đức · ${nm[l]}→${nm[l+1]}`,n,'Học nhanh (trung bình)',Math.round(quick*10)/10)}
  /* servant Công lao */
  const mpN=r=>srvMpNeed(r);const SR=['thô sử','cung nữ','nhất đẳng','đại cung nữ','chưởng sự','nữ quan'];
  for(let r=0;r<5;r++){add(`Công lao (cung nữ) · bậc ${r}→${r+1}`,mpN(r),'việc thường (dâng trà / hầu lễ)',SRVA.tea.mp);add(`Công lao (cung nữ) · bậc ${r}→${r+1}`,mpN(r),'việc nặng (quét sân / lĩnh đồ)',SRVA.sweep.mp)}
  /* Hoàng thượng để ý (cung nữ): srvNotice gain 6 + Sắc/12 at Sắc 50, until BAL.ntRise.at */
  try{add('Hoàng thượng để ý (cung nữ)',BAL.ntRise.at,'được ngài để mắt (Sắc 50)',amTeaG({sac:50},6+Math.round(50/12)))}catch(e){}
  /* Chủ tin: 0 → BAL.srvx.tinUp, tea w.tin */
  add('Chủ tin (cung nữ) · tới mức xét thăng',BAL.srvx.tinUp,'dâng trà thành',SRVA.tea.w.tin);add('Chủ tin (cung nữ) · tới mức xét thăng',BAL.srvx.tinUp,'quét sân',SRVA.sweep.w.tin);
  /* pet tình cảm: stage needs BAL.pet.affNeed, a care act affGain [lo, hi] (mean) */
  const A=BAL.pet.affNeed,G=BAL.pet.affGain;for(let s=0;s<A.length-1;s++)add(`Thú nuôi · tình cảm ${BAL.pet.stages[s]}→${BAL.pet.stages[s+1]}`,A[s+1]-A[s],'chăm (cho ăn / tắm / chơi, trung bình)',(G[0]+G[1])/2);
  /* Lễ nghi khuê các: a counter of whole lessons (one lesson = one level) */
  try{add('Lễ nghi (khuê các) · một mức',1,'một buổi học lễ nghi (Sức −15/−25)',1)}catch(e){}
  /* oán bands toward her: the mending acts (a FALL, so «gain» = oán taken off) */
  const L=BAL.oanLv;const bw=[L[0],L[1]-L[0],L[2]-L[1],L[3]-L[2],100-L[3]];const bn=['Không oán','Chút oán','Oán','Oán sâu','Oán hận'];
  for(let i=1;i<5;i++){add(`Oán ${bn[i]} (rộng ${bw[i]}) — giảm`,bw[i],'Biếu quà làm lành',BAL.tsGift.oan);add(`Oán ${bn[i]} (rộng ${bw[i]}) — giảm`,bw[i],`Tạ lỗi (chỉ khi oán < ${BAL.net.th.nguoi} theo nết)`,-BAL.eff.j9.run_8);
   add(`Oán ${bn[i]} (rộng ${bw[i]}) — giảm`,bw[i],`Nhún nhường (cùng ngưỡng)`,BAL.ag.cx.humble.oanDown);
   if(BAL.oanCool&&BAL.oanCool.on)add(`Oán ${bn[i]} (rộng ${bw[i]}) — giảm`,bw[i],'một tuần yên (nết ×1)',Math.round(bw[i]/BAL.oanCool.season*10)/10);else add(`Oán ${bn[i]} (rộng ${bw[i]}) — giảm`,bw[i],'một tuần yên (cũ: BAL.oanFade a month ÷ 3)',Math.round(BAL.oanFade/3*10)/10)}
  return R});
 console.log('| bar · step | step size | ordinary act | gain | share of step | acts per step | flag |\n|---|---|---|---|---|---|---|');
 for(const [bar,st,act,g] of rows){const sh=g/st;const fl=st===1?'counter (1 lesson = 1 mức)':sh<1/15?'SLOW':sh>1/3?'FAST':'ok';console.log(`| ${bar} | ${st} | ${act} | ${g} | 1/${(st/g).toFixed(1)} | ${(st/g).toFixed(1)} | ${fl} |`)}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
