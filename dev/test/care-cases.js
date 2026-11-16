/* dialogs that stack a bar header / rows above act cards (the kdper family with the default banner). Each setup runs in the page. */
module.exports=[
 {id:'petcare',setup:`S.petTip=1;S.rank=3;S.bac=900;S.pets=[];petAdd(S,'meo','x','buy');petAdd(S,'vet','x','buy');S.petOn=0;S.pets[1].stg=2;Q.length=0;document.getElementById('modal').hidden=true;petcOpen(0)`},
 {id:'petshop',setup:`S.petTip=1;S.rank=3;S.bac=900;S.pets=[];S.petOn=-1;tab='inv';render();document.querySelector('#panel [data-keqk="pets"][data-keqi="0"]').click()`},
 {id:'errandshop',setup:`S.rank=3;S.bac=900;S.shop=Object.keys(IT).filter(k=>IT[k].pr).slice(0,6);Q.length=0;document.getElementById('modal').hidden=true;kitShopNvp()`},
 {id:'petcare-stage3',setup:`S.petTip=1;S.rank=3;S.bac=900;S.pets=[];petAdd(S,'hac','x','buy');S.petOn=0;S.pets[0].stg=3;Q.length=0;document.getElementById('modal').hidden=true;petcOpen(0)`},

 {id:'wkr-learn',setup:`S.rank=3;S.bac=900;Q.length=0;document.getElementById('modal').hidden=true;const a=ARTS.find(x=>wkKindsOf(x.k).some(y=>WKR[y]));S.arts[a.k]=S.arts[a.k]||1;wkAsk(a.k,'prac',()=>{})`},
];
