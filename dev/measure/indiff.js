/* D31 jdiff: tag every life result with its difficulty (S.diff). Load after inpage6.js (INP2=...,indiff.js).
   rundiff.sh's XJS sets window.__diffO and moves the life the bot is already on (runb.js rolls it before XJS runs). */
(function(){const R=window.__res;if(R&&!R.__dt){const p0=R.push;R.push=function(x){try{if(x&&typeof diffOf==="function")x.diff=diffOf()}catch(e){}return p0.apply(this,arguments)};R.__dt=1}})();
