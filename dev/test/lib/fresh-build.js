/* fresh-build (OWNER-UI-C, 27/11): dev/index.html is UNTRACKED (gitignored) and only exists as the last `python3 dev/build/assemble.py` made it. A scan that reads it after a checkout / merge without a rebuild
   silently tests an OLD game (RV-172 saw LIVE's «Đã mất» strip label and state-less portraits on 976a26a3 for exactly this reason). Every scan that reads dev/index.html calls this first:
   it exits 1 when a dev/build source or the assembler is newer than dev/index.html. */
const fs=require('fs'),path=require('path');
module.exports=function(root){root=root||process.cwd();const idx=path.join(root,'dev/index.html');
 if(!fs.existsSync(idx)){console.error('dev/index.html missing: run python3 dev/build/assemble.py');process.exit(1)}
 const t=fs.statSync(idx).mtimeMs;let newest=0,who='';
 for(const f of fs.readdirSync(path.join(root,'dev/build'))){if(!/\.(js|html|py)$/.test(f))continue;const m=fs.statSync(path.join(root,'dev/build',f)).mtimeMs;if(m>newest){newest=m;who=f}}
 if(newest>t+1000){console.error(`dev/index.html is STALE (older than dev/build/${who}): run python3 dev/build/assemble.py, then repeat`);process.exit(1)}};
