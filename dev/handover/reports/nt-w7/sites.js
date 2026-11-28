// list every relAdd call: file:line, x, y, n, sign (BAL-evaluated when possible), context
const fs=require('fs'),D='/home/user/wt/ng/dev/build/';
global.window=global;const vm=require('vm');
global.BAL=JSON.parse(fs.readFileSync('/home/user/wt/ng/dev/test/relshow-bal.json','utf8'));
const out=[];
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='jall.js')){const L=fs.readFileSync(D+f,'utf8').split('\n');
 L.forEach((s,i)=>{let re=/relAdd\(/g,m;while((m=re.exec(s))){if(s.slice(Math.max(0,m.index-9),m.index).includes('function'))continue;
  let j=m.index+7,d=1,args=[],cur='';for(;j<s.length&&d>0;j++){const c=s[j];if('([{'.includes(c))d++;if(')]}'.includes(c))d--;if(d===0)break;if(c===','&&d===1){args.push(cur);cur=''}else cur+=c}args.push(cur);
  let n=args.slice(2).join(',').trim(),sg='?';try{const v=eval(n.replace(/FXF\./,'BAL.fx.'));if(typeof v==='number')sg=v<0?'-':v>0?'+':'0'}catch(e){if(/^-/.test(n))sg='-'}
  out.push([f+':'+(i+1),(args[0]||'').trim(),(args[1]||'').trim(),n,sg,s.slice(Math.max(0,m.index-160),m.index).replace(/\s+/g,' ')].join(' | '))}})}
console.log(out.join('\n'));
