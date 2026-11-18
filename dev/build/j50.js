/* j50: title key art (owner 11/14): game's own poster as the title background instead of the palace map; panel sits low so faces show. */
(function(){try{
var st=document.createElement("style");
st.textContent=".title{align-items:flex-start!important;padding-bottom:max(16px,3vh)!important}.title .tbox{margin:auto auto 0}.title .tbox{background:rgba(255,250,240,.86)!important}@media (orientation:landscape){.title .tbox{margin:auto 4vw auto auto}.title{background-position:0 0,30% 8%!important}}";
document.head.appendChild(st);
var t=document.getElementById("title");
if(t)t.style.setProperty("background","linear-gradient(rgba(40,18,10,0) 55%,rgba(40,18,10,.35)),url(img/title-key.webp) center 15%/cover no-repeat,#f3e6d6","important");
}catch(e){}})();
