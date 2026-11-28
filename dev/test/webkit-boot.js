/* webkit-boot (owner iPad 15/11 "Bị gì đây mới vào game"): boot the built game as an OLDER Safari (< 16.4) would see it, in Chromium.
   No WebKit browser on this machine, so: (1) dev/test/webkit-syntax.js proves no lookbehind /literal/ is left (a parse error there kills the
   whole game script); (2) here the RegExp constructor throws on any lookbehind, as old Safari does, so every pattern built at run time must
   go through kRx (j0) — the game must still boot with 0 page errors, the boot cover (kboot.js) must let go, the title must be up, VP.fix must
   give the same text as with native lookbehind; (3) a page whose game script did not finish (window.__ctmBuilt removed) must show the
   failure card ("Cửa cung chưa mở được" + "Mở lại" + "Quét lối cũ rồi mở lại") instead of the skeleton.
   usage: node dev/test/webkit-boot.js <baseURL> [outdir]   (one browser, closed at the end; exit 1 on a failure) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,OUT='/tmp']=process.argv;
const OLD=()=>{const N=RegExp;const W=function RegExp(p,f){const s=p instanceof N?p.source:String(p);if(/\(\?<[=!]/.test(s))throw new SyntaxError("Invalid regular expression: invalid group specifier name");return new N(p,f)};
 W.prototype=N.prototype;Object.setPrototypeOf(W,N);window.RegExp=W};
const SAMPLE=["Nàng quý ngươi hơn","Bấm vào đây, lượt 3","T3/2 thượng tuần","Ngươi quý nàng 12","thân +5","ngươi nói: “ngươi đi” rồi ngươi về","Trang điểm, được 5 điểm","Ô 3 trống","Nàng oán ta","nàng ta ghen"];
(async()=>{const b=await chromium.launch();let fails=0;const res={};
 async function run(name,{old,broken}){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));if(old)await p.addInitScript(OLD);
  if(broken)await p.route(/\/([^\/?]*\.html)?(\?.*)?$/,async r=>{const resp=await r.fetch();const t=(await resp.text()).replace("window.__ctmBuilt=1;","");await r.fulfill({response:resp,body:t})});
  await p.goto(BASE+"?khost=0&kboot=1",{waitUntil:'commit',timeout:120000});
  const st=await p.waitForFunction(()=>window.__kbootDone||document.querySelector("#kboot.fail")?1:0,null,{timeout:150000,polling:300}).then(()=>1,()=>0);
  await p.waitForTimeout(1200);
  const r=await p.evaluate(S=>({built:!!window.__ctmBuilt,done:!!window.__kbootDone,cover:!!document.getElementById("kboot"),fail:!!document.querySelector("#kboot.fail"),
   failText:(document.querySelector("#kboot.fail")||{}).innerText||"",title:!!document.querySelector(".kptitle,#kload"),lb:typeof KRX_LB!=="undefined"?KRX_LB:null,
   fix:window.VP?S.map(s=>VP.fix(s)):null,bootErr:(()=>{try{return JSON.parse(localStorage.getItem("ctm-boot-err")||"[]").map(x=>x.t)}catch(e){return []}})()}),SAMPLE);
  r.errors=errs;r.ready=st;res[name]=r;if(OUT)await p.screenshot({path:`${OUT}/webkit-boot-${name}.png`});await ctx.close();
  console.log(name,JSON.stringify({built:r.built,done:r.done,cover:r.cover,fail:r.fail,title:r.title,lookbehindNative:r.lb,errors:errs.slice(0,3),bootErr:r.bootErr.slice(-2)}));return r}
 const nat=await run("native",{});const old=await run("old-safari",{old:true});const brk=await run("broken",{broken:true});
 if(!(nat.done&&!nat.cover&&nat.title&&!nat.errors.length)){fails++;console.log("FAIL native boot")}
 if(!(old.done&&!old.cover&&old.title&&!old.errors.length&&old.lb===false)){fails++;console.log("FAIL old-safari boot")}
 const diff=(nat.fix||[]).map((x,i)=>x===(old.fix||[])[i]?null:[SAMPLE[i],x,(old.fix||[])[i]]).filter(Boolean);
 if(!nat.fix||diff.length){fails++;console.log("FAIL VP.fix differs",JSON.stringify(diff))}else console.log("VP.fix same on",SAMPLE.length,"samples");
 if(!(brk.fail&&/Mở lại/.test(brk.failText)&&/Quét lối cũ/.test(brk.failText))){fails++;console.log("FAIL broken page shows no failure card")}
 await b.close();console.log(fails?`FAIL ${fails}`:"PASS");process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
