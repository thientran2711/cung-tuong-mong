/* review/empty-states: before/after shots of every EMPTY state (forced), Fold 755x1000 + iPad 1180x820, HOST mode, into <outdir> (outside git).
   usage: node dev/test/empty-shots.js <outdir> <tag:before|after> [device,...] [stateKey,...]
   Each state = a setup that forces the panel empty, then a screenshot of the whole page. Prints one line per state: key | kit card (.kskill/.kempty) y/n | picture y/n | lines. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT,TAG,DEVS,ONLY]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const devices=(DEVS&&DEVS!=='-'?DEVS:'fold,ipadAir').split(',');const sleep=t=>new Promise(r=>setTimeout(r,t));
const NOKIDS='for(const v of rivals)v.kids=[];S.kids=[];';
const STATES={
 fac:{t:'Giao tình › Phe phái hậu cung',s:`S.facs=[];tab='fac';window.__tdV='hc';render()`},
 men:{t:'Hậu cung › Nam nhân',s:`for(const m of (S.men||[])){m.seen=0;m.af=0;m.tinh=0;m.letters=0;m.trysts=0}S.menMet={};tab='men';render()`},
 kid:{t:'Hoàng tự › Con của ta',s:`${NOKIDS}tab='kid';render()`},
 kvo:{t:'Hoàng tự › Kế vị',s:`${NOKIDS}tab='kvo';render()`},
 kin:{t:'Hoàng tự › Hoàng tự trong cung',s:`${NOKIDS}tab='kin';render()`},
 hon:{t:'Hoàng tự › Hôn sự',s:`${NOKIDS}tab='hon';render()`},
 qt:{t:'Hoàng tự › Quý tộc kén rể',s:`${NOKIDS}tab='qt';render()`},
 invbag:{t:'Tư trang › Túi đồ (nhóm trống)',s:`tab='inv';try{KINV_SUB='tui'}catch(e){}render();const b=[...document.querySelectorAll('#panel button')].find(x=>/Thuốc men/.test(x.textContent));b&&b.click()`},
 invpet:{t:'Tư trang › Thú cưng',s:`S.pets=[];tab='inv';KINV_SUB='thu';render()`},
 invviec:{t:'Tư trang › Việc',s:`tab='inv';KINV_SUB='viec';render()`},
 art:{t:'Tài nghệ › Tác phẩm',s:`tab='art';KTSUB.art='tp';render()`},
 story_past:{t:'Mệnh truyện › Đã qua',s:`tab='story';KTSUB.story='past';render()`},
 goal:{t:'Mệnh truyện › Tâm nguyện',s:`tab='story';KTSUB.story='goal';render()`},
 q72:{t:'Mệnh truyện › Việc nhờ',s:`tab='q72';render()`},
 log:{t:'Sổ ghi (không có dòng)',s:`S.logs=[];tab='log';render()`},
 tdnews:{t:'Phe phái › Triều đình (chưa có tin)',s:`tab='fac';window.__tdV='td';try{S.td&&(S.td.news=[])}catch(e){}render()`},
 staff:{t:'Hậu cung › Cung nhân (không có kẻ hầu)',s:`tab='staff';render()`},
 ao:{t:'Giao tình › Ân oán',s:`tab='rel';render()`}
};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const keys=(ONLY&&ONLY!=='-'?ONLY.split(','):Object.keys(STATES));
 for(const dev of devices){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await sleep(2500);
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<60;i++){try{start()}catch(e){}if(S.ps&&S.reign&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   const st=document.createElement('style');st.textContent='#kroul,#kroulw,#kboot,#kbootw,#kload,#klife,.kmov{display:none!important}';document.head.appendChild(st)});
  await sleep(800);
  for(const k of keys){const st=STATES[k];let err='';
   try{await g.evaluate(new Function(st.s));}catch(e){err=String(e.message).slice(0,80)}
   await sleep(900);
   const r=await g.evaluate(()=>{const P=document.getElementById('panel');const sk=P.querySelectorAll('.kskill,.kempty');return{cards:sk.length,pic:!!P.querySelector('.kskill img,.kempty img'),li:P.querySelectorAll('.kempty li,.kskill li').length,len:(P.innerText||'').length,tab:window.tab}});
   await p.screenshot({path:`${OUT}/${TAG}-${k}-${dev}.jpg`,type:'jpeg',quality:72});
   console.log(`${dev} | ${k} | ${st.t} | cards ${r.cards} | pic ${r.pic?'y':'n'} | li ${r.li} | len ${r.len}${err?' | ERR '+err:''}`)}
  if(errs.length)console.log(dev,'page errors',errs);await ctx.close()}
 await b.close();srv.close()})();
