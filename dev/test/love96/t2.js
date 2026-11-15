// Thanh mai trúc mã (j96) forced-state runs: GAME=<url of a charset-wrapped dev/index.html served from repo root> node t2.js [scenario]
const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
const SC={
 ally:{o:"tt",A:{},B:{},C:{c6:["Chôn chặt",true]}},
 dead:{o:"dtq",A:{},B:{},C:{c6:["Chôn chặt",false]}},
 wed:{o:"muoi",A:{a6:["Gửi trả",true]},B:{b5:["ban hôn",true]},C:{c6:["ban hôn",true]}},
 bimat:{o:"thd",A:{a1:["Giữ tín vật"],a6:["Giữ lời hẹn",true]},B:{b1h:["Ép"]},C:{c3a:["nắm tay",true],c3b:["vẫn như",true],c6:["đêm cuối",true]}},
 lo:{o:"ch",A:{a1:["Giữ tín vật"],a6:["Lẻn ra",false]},B:{b6:["Chối",false]},C:{c6:["đêm cuối",false]}},
 tron:{o:"td",setup:1,A:{a1:["Giữ tín vật"],a2:["Dừng lại",true],a3:["Giữ lại",true],a4:["Hồi âm",true],a5:["Tin nàng",true],a6:["Lẻn ra",true]},
   B:{b1h:["Ép"],b2a:["Để chàng",true],b3a:["Tạm ngừng"],b3b:["Đút bạc"],b4:["Nhờ",true],b5:["Thản nhiên",true],b6:["Thẳng thắn",true]},
   C:{c1t:["Giữ khoảng cách"],c2:["ngăn cản",true],c3a:["nắm tay",true],c4a:["kẽ hở",true],c4b:["lo lót",true],c5:["giả chết",true],c6:["Giả chết",true]}},
 tron_nc:{o:"nc",setup:1,A:{a1:["Giữ tín vật"],a2:["Dừng lại",true],a3:["Giữ lại",true],a4:["Hồi âm",true],a5:["Tin nàng",true],a6:["Lẻn ra",true]},
   B:{b1h:["Ép"],b2a:["Để chàng",true],b3a:["Tạm ngừng"],b4:["Nhờ",true],b5:["Thản nhiên",true],b6:["Thẳng thắn",true]},
   C:{c1t:["Giữ khoảng cách"],c2:["ngăn cản",true],c3a:["nắm tay",true],c4a:["kẽ hở",true],c4b:["lo lót",true],c5:["giả chết",true],c6:["Giả chết",true]}},
 ton:{o:"td",A:{},B:{b2a:["Để chàng",false],b6:["nhận hết tội",true]},C:{}},
 lang:{o:"nc",A:{},B:{},C:"lapse"}};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
 const res={};const only=process.argv[2];
 for(const [name,sc] of Object.entries(SC)){if(only&&only!==name)continue;console.error('SC',name);
  await p.goto((process.env.GAME||'http://localhost:8796/t_new.html'));await p.waitForTimeout(700);
  await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(600);await p.evaluate(k=>{localStorage.setItem("ctm-tm96","1");window.__forceOrigin=k},sc.o);
  await p.waitForSelector('#slots button[data-new="1"]');await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.screenshot({path:D+'/dbg.png'}).catch(()=>{});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.st&&S.st.ch,null,{timeout:20000});await p.waitForTimeout(300);
  await p.evaluate(fs=>eval(fs),fs.readFileSync(D+'/drive.js','utf8'));
  res[name]=await p.evaluate(sc=>{const R={};const setup=sc.setup?()=>{if(S.maid){S.maid.loyal=85;S.maid.tin=85}S.tamco=60;S.mat=6}:null;
   window.__dbg96=null;R.A=__d96.run("tm96a",sc.A,setup);if(R.A.dead)return R;R.B=__d96.run("tm96b",sc.B,setup);if(R.B.dead)return R;
   if(sc.C==="lapse"){__tm96.jump("tm96c");__d96.clear();const A=S.st.M;S.turn=A.dl;a67Month();__d96.clear();const P=S.st.ch.past.filter(x=>x.a==="tm96c").slice(-1)[0];R.C={end:P&&P.tag,man:man96()&&man96().tinh}}
   else R.C=__d96.run("tm96c",sc.C,setup);R.dbg=window.__dbg96;if(R.C.dead){R.r97=window.RARE97?{total:RARE97.total&&RARE97.total(),ls:localStorage.getItem('ctm-rare97')}:null;return R}
   R.next=S.st.M?S.st.M.a:(S.st.ms?S.st.ms.id:null);R.r97=window.RARE97?{total:RARE97.total&&RARE97.total(),book:JSON.stringify(RARE97.book&&RARE97.book())}:null;R.inv=(S.inv||[]).filter(x=>x.from==="story").map(x=>x.k).join(",");
   const lg=(S.logs||[]).slice(-3);return R},sc);
 }
 console.log(JSON.stringify({res,errs},null,1));await b.close()})();
