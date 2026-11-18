// load j67 object literals only: eval ARC67/GB67 assignments with stubs
const fs=require('fs');const src=fs.readFileSync(process.argv[2],'utf8');
const ARC67={},GB67={};const stub=new Proxy(function(){},{get:()=>stub,apply:()=>stub});
const lines=src.split('\n');let buf='',on=false,out=[];
for(const l of lines){if(/^(ARC67|GB67)[.\[]/.test(l)){if(on)out.push(buf);buf=l;on=true}else if(on){if(/^(function|const|let|var|\(function|window\.|\/\*)/.test(l)){out.push(buf);on=false;buf=''}else buf+='\n'+l}}
if(on)out.push(buf);
const names='S,R,od,qOn,rivals,nsrv67,menInit,RV,relAdd,oanAdd,e67dad,mySons,myDaus,liveRivals,has,roll,cl,pick,apply,tdHead,tdPowAdd,srvM,isSrv,clanOf,artW,bestArt,rv67,son67,dau67,man67,dad67'.split(',');
let ok=0,bad=0;
for(const c of out){try{new Function('ARC67','GB67',...names,c)(ARC67,GB67,...names.map(()=>stub));ok++}catch(e){bad++;console.error('ERR',c.slice(0,60),e.message)}}
const R={arcs:{},gb:{}};
for(const [id,a] of Object.entries(ARC67)){R.arcs[id]={o:a.o,t:a.t,g:a.g,p:a.p,B:Object.fromEntries(Object.entries(a.B||{}).map(([k,b])=>[k,{h:b.h,t:b.t}])),E:Object.fromEntries(Object.entries(a.E||{}).map(([k,e])=>[k,{tag:e.tag,k:e.k,t:e.t}]))}}
for(const [id,b] of Object.entries(GB67)){R.gb[id]={h:b.h,t:b.t,keys:Object.keys(b)}}
fs.writeFileSync(process.argv[3],JSON.stringify(R,null,1));console.log('ok',ok,'bad',bad,Object.keys(R.arcs).length,'arcs',Object.keys(R.gb).length,'gb');
