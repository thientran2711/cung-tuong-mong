/* j62: kid card shows age once (in the header "Hoàng tử · 11 tuổi"); the adult age band (BAND4N) is shown only for adults (owner 11/14) */
(function(){const t0=tuoi;tuoi=function(n){return n>=BAL.ageMin?t0(n):(n>0?`Tuổi <b>${n}</b>`:"")};
 const k0=kidCard;kidCard=function(k){const t1=tuoi;tuoi=()=>"";try{return k0.apply(this,arguments)}finally{tuoi=t1}}})();
