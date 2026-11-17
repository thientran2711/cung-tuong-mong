/* weather-khac (owner 17/11 (g)): weather per KHẮC by season, one shared clock. usage: node dev/test/wx-khac.js <url> [WxH@dpr]
   §1 season never off: 12 months × 60 days, every khắc state is in the season's list (j12 wxStates); no snow outside Đông, no heat in Đông.
   §2b an act spilling into the next buổi (j76 day-time gate) sees that khắc's weather.
   §2 timeline monotone per khắc: S.wx follows S.wxDay.s[khắc] as her clock moves (spend / buổi), the day never changes under her,
      a refund (spend −1) never takes the weather back, save/load keeps it.
   §3 sudden downpour while she is in Ngự hoa viên: at the next khắc S.wx = mưa rào, wet(), jfx weather layer = drizzle, j11 backdrop key
      changes, one log line "Trời bỗng đổ mưa rào.", the hook fires.
   §4 old save without wxDay: built lazily from S.wx, no line, the khắc so far = that weather.
   §5 co-op guest (worldOn false): never rolls, currentWeather = the host's S.wx; §5b (r1) a guest behind the host sees HER khắc of the host's day.
   §6 (r1) S.storms counts storm days (a 2nd storm the same day adds none).
   + summary numbers (changes per day, downpours, summer arc nắng → âm u → mưa) and no page errors. */
const {chromium}=require('playwright');const [,,URL,SIZE]=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;const [wh,dpr]=(SIZE||"755x1000@2").split("@");const [W,H]=wh.split("x").map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof currentWeather==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}render();
  const o={};const K=BAL.time.khac,N=wxkN();o.N=N;
  /* §1 */
  const off=[],stat={days:0,chg:0,burst:0,arcDays:0,arcHit:0},sea4={};const y0=S.year;
  for(let m=1;m<=12;m++)for(let d=0;d<60;d++){S.month=m;S.year=y0+d;S.tuan=d%3;rollWx();const D=S.wxDay,sea=SEASON[m-1];const ok=new Set(wxStates(sea).map(w=>w[0]));
   if(!D||D.s.length!==N){off.push([m,d,"no day"]);continue}
   for(const n of D.s){if(!ok.has(n))off.push([m,sea,n]);if(sea!=="Đông"&&/tuyết|sương giá/.test(n))off.push([m,sea,n,"snow"]);if(sea==="Đông"&&/nắng|ve kêu|đom đóm/.test(n))off.push([m,sea,n,"heat"])}
   const z=sea4[sea]=sea4[sea]||{k:0,wet:0,lv:[0,0,0,0],kd:{}};for(let i=0;i<N;i++){z.k++;const w=currentWeather(i);{const q=z.kd[w.kd]=z.kd[w.kd]||[0,0,0,0];q[0]++;q[w.kl]++}if([1,3,4].includes(w.f)){z.wet++;z.lv[w.lv]++;if(!(w.lv>=1&&w.lv<=3))off.push([m,sea,w.b,'no lv'])}else if(w.lv)off.push([m,sea,w.b,'dry lv'])}
   stat.days++;for(let i=1;i<N;i++)if(D.s[i]!==D.s[i-1])stat.chg++;stat.burst+=(D.u||[]).length;
   if(sea==="Hạ"&&D.s[0]==="nắng gắt"){stat.arcDays++;const a=D.s.indexOf("trời âm u");if(a>0&&D.s.slice(a).some(n=>n==="mưa rào"||n==="giông tố"))stat.arcHit++}}
  o.sea4=sea4;o.off=off.slice(0,10);o.offN=off.length;o.stat=stat;
  /* §2 */
  S.month=5;S.year=y0;S.tuan=1;S.buoi=0;used=0;S.dead=false;rollWx();wxSync();const D=S.wxDay,copy=D.s.slice();const seq=[];let mono=true;
  for(let b=0;b<=B4L;b++){S.buoi=b;used=0;wxSync();for(let u=0;u<K;u++){const k=wxkNow();if(S.wx.b!==copy[k])mono=false;seq.push(S.wx.b);if(u<K-1){spend(1)}}}
  o.mono=mono&&JSON.stringify(S.wxDay.s)===JSON.stringify(copy);o.seq=seq.join(" > ");
  S.buoi=1;used=0;S.wxDay.at=N-1;wxSync();o.noBack=S.wx.b===copy[N-1];   /* a khắc refund or earlier buổi never takes the weather back */
  o.api=[currentWeather(0).b===copy[0],currentWeather(N-1).b===copy[N-1],currentWeather().kh===N-1];
  const blob=ser();deser(blob);o.save=JSON.stringify(S.wxDay.s)===JSON.stringify(copy)&&S.wx.b===copy[N-1];
  /* §2b an act that spills into the next buổi (j76 ONE DAY-TIME GATE) sees the spilled khắc's weather */
  {S.month=5;S.tuan=0;S.buoi=1;used=3;S.j76carry=0;S.j76ck="";S.dead=false;const s=[];for(let i=0;i<N;i++)s.push(i<2*K?"nắng gắt":"trời âm u");
   S.wxDay={d:wkKey(),s,u:[],lv:Array(N).fill(0),at:K+3,sk:K+3};S.wx={n:"nắng gắt",b:"nắng gắt",k:"sun",f:2};window.__j76win=0;
   spend(2);o.spill={carry:S.j76carry,used,k:wxkNow(),want:2*K+1,wx:S.wx.b,left:j76left()};S.j76carry=0;S.j76ck=""}
  /* §3 garden downpour */
  S.month=5;S.tuan=2;S.buoi=1;used=0;S.place="vuon";const s=Array(N).fill("nắng gắt");const k0=K;for(let i=k0+1;i<N;i++)s[i]="mưa rào";
  S.wxDay={d:wkKey(),s,u:[k0+1],at:k0};S.wx={n:"nắng gắt",b:"nắng gắt",k:"sun",f:2};render();
  const fx0=(kfWxCfg()||{}).id||null,px0=pxKind(),wet0=wet(),log0=S.logs.length;let hook=null;wxkHook((a,b2,x)=>{hook=[a.b,b2.b,x.burst]});
  spend(1);render();lightTick();const fx1=(kfWxCfg()||{}).id||null;const L=document.querySelector('#stage .light');
  o.garden={wx:S.wx.b,wet:[wet0,wet()],fx:[fx0,fx1],px:[px0,pxKind()],line:(S.logs[0]||"").replace(/<[^>]+>/g,""),lines:S.logs.length-log0,hook,wash:L?L.style.background:"",chip:((document.querySelector('#hud2 .kmwx')||{}).textContent||"")};
  /* §4 old save */
  S.month=12;S.tuan=0;S.buoi=2;used=1;delete S.wxDay;S.wx={n:"tuyết nhẹ",k:"snow",f:1};const nl=S.logs.length;const b2=ser();deser(b2);render();
  const D4=S.wxDay;o.old={built:!!D4,head:D4?D4.s.slice(0,wxkNow()+1).every(n=>n==="tuyết nhẹ"):false,lines:S.logs.length-nl,wx:S.wx.b};
  /* §5 guest */
  const c0=window.COOPW;window.COOPW={on:true,seat:"b"};delete S.wxDay;S.wx={n:"mưa phùn",b:"mưa phùn",k:"rain",f:1};S.month=3;rollWx();const g1=!S.wxDay;S.wx={n:"mưa phùn",b:"mưa phùn",k:"rain",f:1};
  o.guest=[g1,currentWeather().b==="mưa phùn",!S.wxDay];
  /* §5b (r1) guest BEHIND the host: the host's day says khắc 12 reached; she is at khắc 1 -> she sees khắc 1, then her own next khắc */
  {const s=[];for(let i=0;i<N;i++)s.push(i<8?"nắng gắt":"mưa rào");S.month=5;S.tuan=1;S.buoi=0;used=1;S.j76carry=0;delete S.wxkG;
   S.wxDay={d:wkKey(),s,u:[],lv:s.map(x=>x==="mưa rào"?2:0),at:12,sk:12};S.wx={n:"nắng gắt",b:"nắng gắt",k:"sun",f:2};wxSync();
   const a=[currentWeather().kh===wxkNow(),currentWeather().b==="nắng gắt",S.wx.b==="nắng gắt",S.wxDay.at===12];S.buoi=2;used=0;wxSync();
   o.guest.push(...a,S.wx.b==="mưa rào",currentWeather().kh===2*K,S.wxDay.at===12)}
  window.COOPW=c0;
  /* §6 (r1) S.storms counts storm DAYS: a storm that comes back later the same day adds none */
  {S.month=5;S.tuan=2;S.buoi=0;used=0;S.j76carry=0;const s=Array(N).fill("nắng gắt");s[2]="giông tố";s[3]="mưa rào";s[6]="giông tố";S.wxDay={d:wkKey(),s,u:[],lv:Array(N).fill(0),at:0,sk:0};
   S.wx={n:"nắng gắt",b:"nắng gắt",k:"sun",f:2};S.storms=0;for(let u=0;u<K-1;u++)spend(1);S.buoi=1;used=0;wxSync();for(let u=0;u<K-1;u++)spend(1);o.storms=S.storms}
  return o});
 const ok1=r.offN===0&&r.stat.days===720,ok2=r.mono&&r.noBack&&r.api.every(Boolean)&&r.save&&r.spill.carry===1&&r.spill.k===r.spill.want&&r.spill.wx==="trời âm u",
  g=r.garden,ok3=g.wx==="mưa rào"&&!g.wet[0]&&g.wet[1]&&g.fx[1]==="rainh"&&g.fx[0]!==g.fx[1]&&g.px[1]==="rain"&&/Trời bỗng đổ mưa rào/.test(g.line)&&g.lines===1&&g.hook&&g.hook[2]===true&&/rgba\(90, ?100, ?120/.test(g.wash)&&/mưa rào/.test(g.chip),
  ok4=r.old.built&&r.old.head&&r.old.lines===0&&r.old.wx==="tuyết nhẹ",ok5=r.guest.every(Boolean)&&r.guest.length===10,ok6=r.storms===1;
 console.log(JSON.stringify(r,null,1));
 console.log("§1 season",ok1?"OK":"FAIL","§2 monotone",ok2?"OK":"FAIL","§3 garden",ok3?"OK":"FAIL","§4 old save",ok4?"OK":"FAIL","§5 guest",ok5?"OK":"FAIL","§6 storm days",ok6?"OK":"FAIL");
 for(const [s,z] of Object.entries(r.sea4))console.log(`${s}: wet khắc ${Math.round(100*z.wet/z.k)}/100 · nhẹ ${z.lv[1]} vừa ${z.lv[2]} nặng ${z.lv[3]}`);
 /* weather-khac-2 (reviewer r1 D): every kind's share of the season's khắc + its level mix */
 for(const [s,z] of Object.entries(r.sea4))console.log(`${s} kinds: `+Object.entries(z.kd).sort((a,b)=>b[1][0]-a[1][0]).map(([k,q])=>`${k} ${Math.round(100*q[0]/z.k)}/100 (nhẹ ${q[1]} vừa ${q[2]} nặng ${q[3]})`).join(" · "));
 console.log(`days ${r.stat.days} · changes/day ${(r.stat.chg/r.stat.days).toFixed(2)} · downpours/day ${(r.stat.burst/r.stat.days).toFixed(2)} · summer nắng→âm u→mưa ${r.stat.arcHit}/${r.stat.arcDays}`);
 bad=[ok1,ok2,ok3,ok4,ok5,ok6].filter(x=>!x).length;console.log('pageerrors',errs.length,errs.slice(0,3));if(errs.length)bad++;
 await b.close();console.log(bad?`FAIL ${bad}`:"ALL OK");process.exit(bad?1:0)})();
