import sys
src=open(sys.argv[1]).read()
head,rest=src.split(' const R={};',1)
blocks=rest.split('\n /* ')
last=blocks[-1];blocks[-1]=last[:last.index(' const pass=')]
body=''.join('\n /* '+b.replace('let r=','r=') for b in blocks[1:])
out=head+' const R={};'+blocks[0]+'\n const N=+(process.env.N||5);let F=[];for(let it=0;it<N;it++){let r;'+body+'\n const f=Object.entries(R).filter(([k,v])=>!v.pass);f.forEach(([k,v])=>{F.push(k.slice(0,2));console.log(k.slice(0,2),JSON.stringify(v.info).slice(0,1500))});for(const k in R)delete R[k];}\n console.log("FAILS",F.join(","),"/",N,JSON.stringify(errs));await b.close();process.exit(0)})();\n'
open(sys.argv[2],'w').write(out)
