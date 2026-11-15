review/hoangtu-tuchat tests (owner 11/15: tư chất vs hiền tài, kin card, child stranger rule)
1. old save from main BEFORE this branch: build main to dev/_old.html (CTM_IMG_BASE= python3 dev/build/assemble.py; cp dev/index.html dev/_old.html),
   OLDSAVE=/tmp/old-save.json node dev/test/hoangtu-tuchat/oldsave.js
2. this branch: CTM_IMG_BASE= python3 dev/build/assemble.py; OLDSAVE=/tmp/old-save.json node dev/test/hoangtu-tuchat/test.js 755x1000 <outdir>
   (also 1000x755 1180x820 1366x1024 844x390). Images come from the CDN through curl (cached in $CTM_CACHE). Prints JSON with "checks".
