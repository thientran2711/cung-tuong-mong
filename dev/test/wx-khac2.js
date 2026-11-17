/* weather-khac-2 (owner 17/11 ~17:40Z (3)): EVERY weather kind per khắc with a level nhẹ / vừa / nặng + world effects.
   usage: node dev/test/wx-khac2.js <url> [WxH@dpr]
   §1 kind mix per season (12 months × 60 days × 16 khắc): every state in its season's list, the season's kinds all appear (wind / fog / frost …)
   §2 level mix per kind: every khắc has kl 1..3, every wet khắc lv = kl, every dry khắc lv 0; calm kinds always nhẹ
   §3 day flow: heat peaks at noon (trưa > sáng, tối); fog thickest in the morning (sáng > chiều); frost hardest at dawn (sáng > chiều);
      wind gusts (wind keeps its level from khắc to khắc less often than rain)
   §4 monotone: spending through the day S.wx = the day's state + kind + level of her khắc, never back; a level-only change fires the hook (lvOnly)
   §5 old save (S.wx without kd/kl, wxDay with lv 0 on dry khắc): currentWeather gives kd + kl 1, no line
   §6 co-op guest: no roll; fog / storm / frost effects read the host's S.wx
   §7 fog: oSee (the witness roll) drops by BAL.wx.fx.fog.see[kl], held to BAL.odds.lo; preview j63 kaCaughtTxt changes with it
   §8 storm: accessOf(vuon) closed, no sneak/ask, map reason; NPCs at the garden sent home (placeWhere); the turn line names it
   §9 frost: mgTier ease of đàn / thêu lower by BAL.wx.fx.frost.ease[kl], cờ unchanged; intro row says "tay cóng"; kit weather popup rows
   + no page errors. */
const {chromium}=require('playwright');const [,,URL,SIZE]=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;const [wh,dpr]=(SIZE||"755x1000@2").split("@");const [W,H]=wh.split("x").map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof currentWeather==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}render();
  const o={};const K=BAL.time.khac,N=wxkN(),D0=BAL.wx.day;o.N=N;
  /* §1 + §2 + §3 */
  const off=[],kinds={},lvk={},flow={},keep={};const y0=S.year;
  for(let m=1;m<=12;m++)for(let d=0;d<60;d++){S.month=m;S.year=y0+d;S.tuan=d%3;rollWx();const D=S.wxDay,sea=SEASON[m-1];const ok=new Set(wxStates(sea).map(w=>w[0]));
   if(!D||D.s.length!==N){off.push([m,d,"no day"]);continue}
   let prev=null;
   for(let i=0;i<N;i++){const w=currentWeather(i),bu=Math.floor(i/K);if(!ok.has(w.b))off.push([m,sea,w.b,"off"]);
    if(!(w.kl>=1&&w.kl<=3))off.push([m,w.b,"kl"]);if([1,3,4].includes(w.f)?w.lv!==w.kl:w.lv!==0)off.push([m,w.b,"lv"]);
    if(w.kd==="calm"&&w.kl!==1)off.push([m,w.b,"calm kl"]);if(w.kd!==(D0.kd[w.b]||"calm"))off.push([m,w.b,"kd"]);
    const z=kinds[sea]=kinds[sea]||{};z[w.kd]=(z[w.kd]||0)+1;
    const L=lvk[w.kd]=lvk[w.kd]||[0,0,0,0];L[w.kl]++;
    const F=flow[w.kd]=flow[w.kd]||[[0,0],[0,0],[0,0],[0,0]];F[bu][0]+=w.kl;F[bu][1]++;
    if(prev&&prev.b===w.b&&Math.floor((i-1)/K)===bu&&!(D.u||[]).includes(i)){const q=keep[w.kd]=keep[w.kd]||[0,0];q[1]++;if(prev.kl===w.kl)q[0]++}
    prev=w}}
  o.offN=off.length;o.off=off.slice(0,8);o.kinds=kinds;o.lvk=lvk;
  o.flow={};for(const k in flow)o.flow[k]=flow[k].map(x=>x[1]?+(x[0]/x[1]).toFixed(2):null);
  o.keep={};for(const k in keep)o.keep[k]=+(keep[k][0]/Math.max(1,keep[k][1])).toFixed(2);
  /* §4 monotone + level-only hook */
  {S.month=10;S.tuan=1;S.buoi=0;used=0;S.j76carry=0;S.dead=false;rollWx();const D=S.wxDay;let mono=true,lastAt=-1,follow=true;let lvh=0;wxkHook((a,b2,x)=>{if(x.lvOnly)lvh++});
   for(let i=0;i<N-1;i++){spend(1);if((S.buoi||0)<B4L&&j76left()%K===0&&used>=K){try{nextBuoi()}catch(e){}}render();
    const k=wxkNow();if(D.at<lastAt)mono=false;lastAt=D.at;const w=currentWeather(k);if(S.wx.b!==w.b||S.wx.kl!==w.kl||S.wx.kd!==w.kd)follow=false;if(S.wxDay!==D)follow=false}
   /* a forced level-only step */
   const k=wxkNow();if(k<N-1){D.s[k+1]=D.s[k];D.lv[k+1]=D.lv[k]===3?1:3;const h0=lvh;spend(1);render();o.lvOnly=lvh>h0}else o.lvOnly=true;
   o.mono=mono;o.follow=follow}
  /* §5 old save */
  {S.month=8;S.tuan=0;S.buoi=1;used=1;delete S.wxDay;S.wx={n:"gió heo may",k:"wind",f:0};const nl=S.logs.length;const b2=ser();deser(b2);render();
   const w=currentWeather();o.old={built:!!S.wxDay,kd:w&&w.kd,kl:w&&w.kl,lines:S.logs.length-nl};
   const D=S.wxDay;D.lv=D.lv.map(()=>0);const w2=currentWeather(0);o.old.zero=w2.kl===1&&w2.lv===0}
  /* §6 guest */
  {const c0=window.COOPW;window.COOPW={on:true,seat:"b"};delete S.wxDay;S.month=10;S.wx={n:"sương mù",b:"sương mù",k:"mist",f:0,kd:"fog",kl:3};rollWx();
   S.wx={n:"sương mù",b:"sương mù",k:"mist",f:0,kd:"fog",kl:3};const v=rivals.find(x=>x.alive)||rivals[0];
   o.guest=[!S.wxDay,currentWeather().kd==="fog",wxkFx("fog")===3];window.COOPW=c0}
  /* §7 fog */
  {S.month=10;const v=rivals.find(x=>x.alive)||rivals[0];const sv={mat:v.mat,tc:v.tamco};v.mat=3;v.tamco=40;
   S.wx={n:"lá phong rơi",b:"lá phong rơi",k:"leaf",f:0,kd:"leaf",kl:1};const s0=oSee(v),t0=typeof kaCaughtTxt==="function"?kaCaughtTxt(v,"x"):"";
   const sl=[];for(const l of [1,2,3]){S.wx={n:"sương mù",b:"sương mù",k:"mist",f:0,kd:"fog",kl:l};sl.push(oSee(v))}
   const t3=typeof kaCaughtTxt==="function"?kaCaughtTxt(v,"x"):"";
   v.mat=0;v.tamco=0;const floor=oSee(v);
   S.wx={n:"nắng dịu",b:"sương sớm",k:"mist",f:0,kd:"fog",kl:3};v.mat=3;v.tamco=40;const noon=oSee(v);
   v.mat=sv.mat;v.tamco=sv.tc;o.fog={s0,sl,want:[1,2,3].map(l=>Math.max(BAL.odds.lo,s0-BAL.wx.fx.fog.see[l])),floor,noon,prev:t0!==t3||!t0}}
  /* §8 storm */
  {S.month=6;S.tuan=2;S.buoi=1;used=0;S.place="home";S.out=0;S.confined=0;S.wx={n:"nắng gắt",b:"nắng gắt",k:"sun",f:2,kd:"heat",kl:2};
   const a0=accessOf(S,"vuon");const s=Array(N).fill("nắng gắt");for(let i=K+1;i<N;i++)s[i]="giông tố";S.wxDay={d:wkKey(),s,u:[],lv:Array(N).fill(2),at:K,sk:K};
   const v=rivals.find(x=>x.alive&&!x.out);S.where=S.where||{};S.where[v.id]="vuon";S.where.emp="vuon";const nl=S.logs.length;spend(1);render();
   const a1=accessOf(S,"vuon"),st=accState("vuon");const swept=S.where[v.id]!=="vuon"&&S.where.emp!=="vuon";
   placeWhere();const none=!Object.values(S.where).includes("vuon");
   o.storm={open0:!!a0.ok,wx:S.wx.b,open1:!!a1.ok,why:st.why,sneak:!!st.kind,swept,none,line:S.logs.slice(0,S.logs.length-nl).map(x=>String(x).replace(/<[^>]+>/g,"")).filter(x=>/giông/i.test(x)).join(" / "),lines:S.logs.slice(0,S.logs.length-nl).filter(x=>/giông/i.test(String(x))).length}}
  /* §9 frost */
  {S.month=12;S.wx={n:"tuyết nhẹ",b:"tuyết nhẹ",k:"snow",f:1,kd:"snow",kl:1};const e0={dan:mgTier("dan",{occ:"hoc",lv:3}).ease,theu:mgTier("theu",{occ:"hoc",lv:3}).ease,co:mgTier("co",{occ:"hoc",lv:3}).ease};
   const e2={};S.wx={n:"sương giá",b:"sương giá",k:"frost",f:0,kd:"frost",kl:2};for(const k of ["dan","theu","co"])e2[k]=mgTier(k,{occ:"hoc",lv:3}).ease;
   const t=mgTier("dan",{occ:"hoc",lv:3});const txt=mgDiffTxt(t,"dan");const pop=kitWxEffects().map(x=>x[1]).join(" | ");
   S.wx={n:"sương mù",b:"sương mù",k:"mist",f:0,kd:"fog",kl:2};const popF=kitWxEffects().map(x=>x[1]).join(" | ");
   S.wx={n:"giông tố",b:"giông tố",k:"storm",f:3,kd:"storm",kl:3};const popS=kitWxEffects().map(x=>x[1]).join(" | ");
   o.frost={e0,e2,d:BAL.wx.fx.frost.ease[2],txt,pop,popF,popS}}
  /* §10 the level shows (reviewer r1 B): jfx row per level, nặng rain = storm streaks without the bolt, stronger wash */
  {S.month=5;S.place="vuon";const ids=[],wash=[];for(const l of [1,2,3]){S.wx={n:"mưa rào",b:"mưa rào",k:"rain",f:1,lv:l,kd:"rain",kl:l};const c=kfWxCfg()||{};ids.push([c.id,!!c.bolt,c.cap]);lightTick();const L=document.querySelector('#stage .light');const m=(L&&L.style.background.match(/rgba\(90, ?100, ?120, ?([\d.]+)\)/))||[];wash.push(+m[1]||0)}
   const wi=[];for(const l of [1,2,3]){S.wx={n:"gió lớn",b:"gió lớn",k:"wind",f:0,lv:0,kd:"wind",kl:l};wi.push((kfWxCfg()||{}).id)}
   const sn=[];for(const l of [1,3]){S.wx={n:"tuyết nhẹ",b:"tuyết nhẹ",k:"snow",f:1,lv:l,kd:"snow",kl:l};sn.push((kfWxCfg()||{}).id)}
   S.wx={n:"giông tố",b:"giông tố",k:"storm",f:3,lv:3,kd:"storm",kl:3};const st=kfWxCfg()||{};o.look={ids,wash,wi,sn,storm:[st.id,!!st.bolt]}}
  return o});
 const ok1=r.offN===0&&["Xuân","Hạ","Thu","Đông"].every(s=>Object.keys(r.kinds[s]||{}).length>=5)&&r.kinds["Đông"].frost>0&&r.kinds["Thu"].fog>0&&r.kinds["Hạ"].wind>0&&r.kinds["Hạ"].storm>0,
  ok2=["rain","snow","storm","wind","fog","frost","heat"].every(k=>r.lvk[k]&&r.lvk[k][1]+r.lvk[k][2]+r.lvk[k][3]>0&&(r.lvk[k][2]+r.lvk[k][3])>0)&&r.lvk.calm[2]===0&&r.lvk.calm[3]===0,
  F=r.flow,ok3=F.heat[1]>F.heat[0]&&F.heat[1]>F.heat[3]&&F.fog[0]>F.fog[2]&&F.frost[0]>F.frost[2]&&r.keep.wind<r.keep.rain,
  ok4=r.mono&&r.follow&&r.lvOnly,ok5=r.old.built&&r.old.kd==="wind"&&r.old.kl>=1&&r.old.lines===0&&r.old.zero,ok6=r.guest.every(Boolean),
  f=r.fog,ok7=f.sl.every((x,i)=>x===f.want[i])&&f.sl[2]<f.s0&&f.floor>=5&&f.noon===f.s0&&f.prev,
  s=r.storm,ok8=s.open0&&s.wx==="giông tố"&&!s.open1&&/giông/.test(s.why)&&!s.sneak&&s.swept&&s.none&&/Ngự hoa viên đóng cửa/.test(s.line)&&s.lines===1,
  lk=r.look,ok10=lk.ids.map(x=>x[0]).join()==="drizzle,rain2,rainh"&&!lk.ids[2][1]&&lk.ids[0][2]<lk.ids[1][2]&&lk.ids[1][2]<lk.ids[2][2]&&lk.wash[2]>lk.wash[0]&&lk.wi.join()==="wind1,wind,wind3"&&lk.sn.join()==="snow,snowh"&&lk.storm[0]==="storm"&&lk.storm[1],
    z=r.frost,ok9=Math.abs(z.e0.dan-z.d-z.e2.dan)<.051&&Math.abs(z.e0.theu-z.d-z.e2.theu)<.051&&z.e0.co===z.e2.co&&/tay cóng/.test(z.txt)&&/tay cóng/.test(z.pop)&&/Sương mù/.test(r.frost.popF)&&/Ngự hoa viên đóng cửa/.test(z.popS);
 console.log(JSON.stringify(r,null,1));
 console.log("§1 kinds",ok1?"OK":"FAIL","§2 levels",ok2?"OK":"FAIL","§3 flow",ok3?"OK":"FAIL","§4 monotone",ok4?"OK":"FAIL","§5 old save",ok5?"OK":"FAIL","§6 guest",ok6?"OK":"FAIL","§7 fog",ok7?"OK":"FAIL","§8 storm",ok8?"OK":"FAIL","§9 frost",ok9?"OK":"FAIL","§10 looks",ok10?"OK":"FAIL");
 const KD=["rain","storm","snow","wind","fog","frost","heat","petal","leaf","cloud","calm"];
 console.log("| season | "+KD.join(" | ")+" |");for(const [s2,zz] of Object.entries(r.kinds)){const t=Object.values(zz).reduce((a,x)=>a+x,0);console.log(`| ${s2} | `+KD.map(k=>Math.round(100*(zz[k]||0)/t)).join(" | ")+" |")}
 console.log("| kind | nhẹ | vừa | nặng | avg sáng/trưa/chiều/tối | keeps level |");for(const k of KD)if(r.lvk[k])console.log(`| ${k} | ${r.lvk[k][1]} | ${r.lvk[k][2]} | ${r.lvk[k][3]} | ${r.flow[k].join(" / ")} | ${r.keep[k]!=null?r.keep[k]:"-"} |`);
 bad=[ok1,ok2,ok3,ok4,ok5,ok6,ok7,ok8,ok9,ok10].filter(x=>!x).length;console.log('pageerrors',errs.length,errs.slice(0,3));if(errs.length)bad++;
 await b.close();console.log(bad?`FAIL ${bad}`:"ALL OK");process.exit(bad?1:0)})();
