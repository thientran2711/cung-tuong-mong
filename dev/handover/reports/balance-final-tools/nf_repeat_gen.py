import sys
src=open(sys.argv[1]).read()
head,rest=src.split(' const R={};',1)
blocks=rest.split('\n /* ')
blocks[11]=blocks[11][:blocks[11].index(' const pass=')]
case={k:blocks[k+1] for k in range(8)}
case[8]=blocks[9]+'\n /* '+blocks[10]
case[9]=blocks[11]
out=head+' const R={};'+blocks[0]+'\n const SEQ=(process.env.CASES||"1,2,7").split(",").map(Number);let RUN=[];\n for(let it=0;it<SEQ.length;it++){const c=SEQ[it];let r;\n'
for k in range(10):
    out+=f' if(c==={k}){{ /* '+case[k].replace('let r=','r=')+'\n }\n'
out+=' const fail=Object.entries(R).filter(([k,v])=>!v.pass);RUN.push({c,pass:!fail.length,fail:fail.map(([k,v])=>JSON.stringify(v.info).slice(0,1500))});for(const k in R)delete R[k];console.log(JSON.stringify(RUN[RUN.length-1]));}\n'
out+=' console.log("SUMMARY",SEQ.length,RUN.filter(x=>!x.pass).map(x=>x.c).join(","),JSON.stringify(errs));await b.close();process.exit(0)})();\n'
s=out
old='a.me=S.nfX&&S.nfX.me;a.gone='
s=s.replace(old,'a.dq=Q.map(m=>m.pid||m.t);a.mh=$("modal").hidden;a.km=[...document.querySelectorAll(".kmov")].map(e=>e.className+":"+e.textContent.slice(0,80)).join("|");a.cfd=(window.__cfdbg||[]).slice(-8).join(",");a.cfb=cfBusy();'+old,1)
old2='const u2=T.only(L[0]);'
s=s.replace(old2,'Error.stackTraceLimit=40;const qp=Q.push;const stk=[];Q.push=function(...m){m.forEach(x=>{if(x&&x.pid==="empnight")stk.push((new Error()).stack.split("\\n").slice(2,18).join(" | "))});return qp.apply(this,m)};a8dbg={ill:S.emp.ill,vis:S.emp.visit,visW:S.visW,out:S.out,preg:S.preg,ntk:S.ntk,cfb:cfBusy(),kcf:!!document.querySelector(".kmov.kcf")};'+old2,1)
s=s.replace('window.visRoll=function(){ord.push("visit:"+(S.nfX&&S.nfX.st));return vr.apply(this,arguments)};','window.visRoll=function(){ord.push("visit:"+(S.nfX&&S.nfX.st));const r=vr.apply(this,arguments);(window.__v8=window.__v8||[]).push("r:"+r+":ch"+(typeof visCh==="function"?visCh(S):"?")+":nt"+JSON.stringify(ntTaken())+":ton"+(S.tonight&&(S.tonight.id||S.tonight))+":ag"+(window.agDOn&&agDOn())+":vw"+S.visW+":ev"+JSON.stringify(S.emp.visit)+":cy"+(typeof cyTray==="function"&&!!cyTray(S))+":sung"+S.sung+":out"+S.out+":preg"+S.preg+":dead"+S.dead+":mg"+!!S.mg);return r};',1)
s=s.replace('a.ord=ord.slice();','a.ord=ord.slice();a.v8=window.__v8;window.__v8=[];delete Q.push;a.stk=stk;a.dbg=a8dbg;',1)
s=s.replace(' const SEQ=',' let a8dbg=null;const SEQ=',1)
s=s.replace('nextBuoi();u2();','nextBuoi();u2();window.__nw=JSON.stringify({nw:S.nightWhy,ea:S.emp&&[S.emp.eaQ,S.emp.eaQx],pin:typeof ldPin==="function"?String(ldPin()):"-",nfX:S.nfX,cyc:typeof cyAsk==="function"}).slice(0,1500);',1)
s=s.replace('a.v8=window.__v8;','a.v8=window.__v8;a.nw=window.__nw;',1)
open(sys.argv[2],'w').write(s)
