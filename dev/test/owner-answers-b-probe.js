/* owner-answers-b probes (QB1 QB2 Q15 Q25 Q12): usage: node dev/test/owner-answers-b-probe.js <url> <outdir> */
const {chromium}=require('playwright');const {SIZES,boot,start}=require('./owner-answers-b.js');
(async()=>{const [,,URL,OUT]=process.argv;const b=await chromium.launch();const res={};
 for(const [W,H,d] of SIZES){const {ctx,p,errs}=await boot(b,W,H,d);await start(p,URL);const R={};
  R.khoi=await p.evaluate(()=>({kind:typeof CU_KHOI!=="undefined"?CU_KHOI.doden:null,trikhoi:document.documentElement.innerHTML.includes("Trí khôi")}));
  R.pres=await p.evaluate(()=>({sung:KPG["sung-ai"],nightMusic:(KPG["sung-ai"]||{}).mus}));
  /* Q15: honors on profile + story tab */
  R.q15=await p.evaluate(()=>{S.honors=[{d:"T3/1",t:"Đăng khôi · Thắp đèn đêm rằm",p:1},{d:"T2/1",t:"Nhì · Cầm",p:2}];const h=selfCardHTML();const sp=typeof panel67==="function"?panel67():"";return{self:h.includes("Danh hiệu thi tài")&&h.includes("Đăng khôi"),story:sp.includes("Danh hiệu thi tài")&&sp.includes("Đăng khôi"),award:typeof awCard==="function"&&awCard().includes("Đăng khôi")}});
  R.q25=await p.evaluate(()=>{const v=rivals[0],o={};o.thDis=disOf("th");o.thRow=disRow("th");o.likeRow=disLikeRow(v);o.disRow=disRow(v);
    const lk=disLikeLearn(v,null,"test");o.learnt=!!lk;o.likeRow2=disLikeRow(v);return o});
  R.q12=await p.evaluate(()=>{const T=[["Thái phi","x","Thành Thái phi"],["Hoàng thái hậu","x","Lên ngôi Thái hậu"],["Hồng nhan bạc mệnh","bệnh nặng","bệnh nặng"],["Hồng nhan bạc mệnh","bị đầu độc","bị đầu độc"],["Hồng nhan bạc mệnh","Hoàng thượng băng hà, ngươi tuẫn táng","tuẫn táng"],["Xuất cung","x","Xuất cung theo lệ"],["Xuất gia","x","Xuất gia"],["Phế làm thứ dân","x","Phế"],["Được ban hôn","x","Được ban hôn"],["Một đời an nhiên","x","an nhiên"],["Cao chạy xa bay","x","Cao chạy xa bay"],["Tư thông bị phát giác","x","Ban chết: tư thông bại lộ"]];return T.map(([h,t,f])=>[h,endArt(h,t,f,!/bạc mệnh|Tư thông/.test(h))])});
  /* ending card shot */
  await p.evaluate(()=>{window.__d=1;over("Xuất cung","Ngươi rời cung theo lệ.","Xuất cung theo lệ",true)});await p.waitForTimeout(12000);await p.evaluate(()=>{const M=document.getElementById("modal");document.querySelectorAll("body *").forEach(e=>{if(e===M||M.contains(e)||e.contains(M))return;if(getComputedStyle(e).position==="fixed"&&e.textContent.includes("Luân hồi")&&e.id!=="game")e.remove()})});await p.waitForTimeout(400);
  R.endPic=await p.evaluate(()=>{const m=document.querySelector("#modal");return{img:!!m.querySelector(".kpev img")&&m.querySelector(".kpev img").naturalWidth>0,src:(m.querySelector(".kpev img")||{}).src||"",ov:document.documentElement.scrollWidth>innerWidth+1}});
  await p.screenshot({path:`${OUT}/end-${W}x${H}.jpg`,type:'jpeg',quality:60});R.errs=errs;res[W+'x'+H]=R;await ctx.close()}
 console.log(JSON.stringify(res));await b.close()})();
