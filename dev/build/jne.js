/* ================= jne: NIGHT-END + NEW-DAY PICTURES (KIT §62, owner 15/11 19:35Z, review/night-end) =================
   (1) kitNightEnd(o) — after HER bedding night (j8 nightFx → pillow talk → j75 result) ONE closing card replaces the night's result toast:
       a picture of the night's MOOD (never the bedding itself, no faces): mặn nồng (warm) · êm đềm (normal) · lạnh nhạt (cold),
       his mood before → after (liked / did not like), the real Được / Mất rows of the night (kaResultRows: Sủng, Ân tình before → after …),
       the Kèm row (jealousy), and the reward he gave (the bestow tray is held during the night and shown here; on close the items fly to
       the Tư trang tab with kitFlyItem). Sound + light by tier (BAL.nightEnd.fx). Tier rule = BAL.nightEnd (below), from real state only.
   (2) kitNewDay(o) — when a tuần begins and she had NO bedding night in the tuần that just ended, the week panel (#dawn, j18) first plays a
       short picture: the lonely night (không được triệu: he went elsewhere / flipped no card / took her tablet but she did not serve; or
       "theo lệ" — mùng một / rằm at the Empress's palace), then the dawn of the SEASON (xuân / hạ / thu / đông) — on a festival day the
       festival's own picture (img/ev-fest-<k>-b.webp, the 14 festival paintings) — with the day's weather drifting over it (kitWxEffects
       weather → petals / rain / snow / leaves / fireflies). Tap = skip to the week panel. Reduced motion: still pictures, no particles.
   Both are kit motion pieces (j93 kmStage / the week panel) — no private frames; rows = kitRows (§51), items = kitItem + kitGradeChip.
   Save state: only S.neMorn (the morning-after follow-up, §4 below; absent in old saves → nothing). */
Object.assign(BAL,{nightEnd:{
 /* tier points = s (the night's own score from j8 night1: prep q + talk fit + his mood [+1,0,−1,−2] + luck 0..2, −2 if an over-rank
    piece was confiscated) + her toilette today (jtoil makeup: tuyệt/đẹp +1, vụng/diêm dúa −1) + talk (−2 when the pillow talk lost her
    Sủng or Ân tình) + illness (−2 when she is ill). warm ≥ warm, normal ≥ normal, else cold. */
 warm:6,normal:3,toil:{tuyet:1,dep:1,vua:0,moc:0,vung:-1,diem:-1},talkBad:-2,ill:-2,
 /* his mood after the night (S.emp.mood 0 vui … 3 giận dữ): warm → one step better; cold → one step worse (never to giận dữ) */
 mood:{warm:-1,normal:0,cold:1},moodCap:2,
 /* lonely beat + dawn picture timings (ms); night card list shows after `list` */
 lonelyMs:Math.round(2200*BAL.pace),dawnMs:Math.round(2400*BAL.pace),list:Math.round(900*BAL.pace),  /* x the ONE kit pace (BAL.pace, KIT §83) */
 /* longest wait for a picture before the card / beat shows anyway (its painted 32x24 thumbnail shows blurred meanwhile) */
 wait:700}});
(function(){
const NE=BAL.nightEnd;const DIR="img/kit/";
const TIER={warm:{t:"Đêm mặn nồng",pic:"ne-night-warm",liked:"ngài hài lòng"},normal:{t:"Đêm êm đềm",pic:"ne-night-normal",liked:"ngài bình thản"},
 cold:{t:"Đêm lạnh nhạt",pic:"ne-night-cold",liked:"ngài không vui"},lonely:{t:"Đêm không được triệu",pic:"ne-night-lonely-thu"},custom:{t:"Đêm theo lệ",pic:"ne-night-lonely-thu"}};
const SEAK={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"};
const SEAN={xuan:"mùa xuân",ha:"mùa hạ",thu:"mùa thu",dong:"mùa đông"};
/* the season of the game day (lonely night + dawn pictures are painted per season) */
const seaNow=()=>{try{return SEAK[SEASON[S.month-1]]||"xuan"}catch(e){return"xuan"}};
/* sounds: kitSfx (review/sfx jsfx mixer) when present, else j11 sfx(file) */
function snd(n,at,g){const go=()=>{try{if(window.__bot)return;if(typeof kitSfx==="function"&&window.SFXN&&SFXN[n])kitSfx(n,g?{g}:{});else if(typeof sfx==="function")sfx(n,g?{g}:undefined)}catch(e){}};if(at)setTimeout(go,at);else go()}
const SND={warm:[["sfx-zither",0],["vo-f-laugh-soft-1",700]],normal:[["sfx-wx-crickets",0],["sfx-night",900]],cold:[["sfx-candle-out",200],["vo-f-sigh-1",900]],
 lonely:[["sfx-night-watch",0],["sfx-wind",600]],music:[["sfx-night-watch",0],["sfx-zither",500,.45]],custom:[["sfx-night-watch",0],["sfx-wind",600]],
 xuan:[["sfx-wx-birds",300]],ha:[["sfx-wx-birds",300]],thu:[["sfx-wx-birds",300]],dong:[["sfx-wind",300]],fest:[["sfx-wx-birds",300]]};
function play(k){(SND[k]||[]).forEach(([n,at,g])=>snd(n,at,g))}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const red=()=>{try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
/* r2 (review FAIL list): EVERYTHING drawn here is PAINTED (KIT §68, review/fxkit): lights = kitFxLight painted clips (candle, moonlight,
   lantern-red, glow-gold) placed INSIDE the picture at the painted light source; particles = frames of the painted §68 sprite atlases
   (img/fx/<kind>.webp: petal-peach, petal-plum, leaf, snow, orb, streak) moved by CSS inside the picture (clipped: never over the text).
   A cold night gets no celebration at all (no petals / embers / favour burst; j11's nightFx feedback is held during her night).
   Pictures: 1536x1152 landscape (gpt-2-6), focal point per picture (FOC) → portrait screens crop around it (object-position);
   a 32x24 painted thumbnail (LQ, inline) shows blurred at once, the picture fades in over it when loaded (never an empty frame). */
const LQ={"ne-dawn-dong":"UklGRuQAAABXRUJQVlA4INgAAACwBACdASogABgAPu1wsFIppiSiqAgBMB2JYgC07bWANMmMAeSZHhXKdW8fNu3QAPyIh3yKxyFq6kb8gfrHMDBRy7rH+AxfZjeWnE/Zj91JF9lAwFm5UPY21+aSBhIWfNN0n6GMoDtGsRnyZUpYVYzllgQYz73Abi53ZpOil9QD7ob5qJjzM8c+0wzvJQTk0yGGIofbMia6gxjtP9jf9ZR4O4fLTdRdgLM+Sl9vrSqmuNRJkMTKMWOsA2yt+EioKGE5EhoXX3VChbfJGjHaMwsdl0ze6N4AAAA=","ne-dawn-ha":"UklGRiABAABXRUJQVlA4IBQBAACwBQCdASogABgAPu1osFAppaSiqAqpMB2JagCdMoR01SQxP4SdF3qtuVGNEKuJ6JL4n3/IfGAA/YLnXrD1fxFvEApmDhXzqxD5KPe4a+0+qGG4kp/tv0XzsfdyR+uXwyqKuRd+irdAymb8D+8sEA3QORzkIieDF2sfXix0/zRL0Txx1uc9u0ZQPOVaJIiSPIhboogx+FWdC4GLzDhWDw/yZ6CMYPLahMmPkc9l+mUTtXz9r3h1XAnxzeo2J1wxm0GoU8ScgL5xNJAHEcM2EIlPWm+kH+hqRdelobGzpPouSrqSLbomh7QF5FGxSMpsUXAYv8rGXxjVA73/1zqTPan63Bap8iJUVdha8AF6pheUv90OgAA=","ne-dawn-thu":"UklGRvgAAABXRUJQVlA4IOwAAADwBQCdASogABgAPu1mqk2ppaQiMAgBMB2JaACxHt+GtZ7QilB0o6pG1ZlzfI5Q97bSKau8UTgwAAD+qSMKc4PbZTSIh/hjE4ER7MnhqEJQs9JV4SG4qfRfchG97hILBCdtw+V2xhv8XSdKLEafEzsPT/DX8lr77L3LwWKxRgxSTubIiMTHntyYHTXKXvvx58vwnM2aJJlJwezNHMR57lBqGXdgSgLMg9u8c+ce4Ou2iG1KDz+MmWBSgORIf95OvFDxTo81Q0XvZvmnCdvHqkxZQ90TuY220IlSTiD/It6wZisKBUIAXjXRwAAAAA==","ne-dawn-xuan":"UklGRuwAAABXRUJQVlA4IOAAAADQBQCdASogABgAPu1urlIppiQiqAgBMB2JYgCsMxiGog9/ZtH6pyX7sNHx5uWPBqatXF7Fe1EAAP47Caey9NkzsD4JebL/vke3ggq+dazheWQjmHsTo0ahTwuS0aP9vW6NgkdCwFBsNsfIbR+5hBR8opCqI2jP+5F+Psn7KVGmaYn0dSFk/tcqlhqBRrSjAjkvBevmAiHka80Ia9Xdi9OvzJI2MJ1B4xsfpB2A4n8g4ntSchkSPUsoAZsGTiT4+bl0p8u5wLVUAYnETX+Byliy08CvZQLBTKPGvPHugmmAAA==","ne-night-cold":"UklGRnoAAABXRUJQVlA4IG4AAADwBACdASogABgAPu1urVGppqQiqAqpMB2JZwDH5DTwAU+fRg0nE0mn8z9zyNnXaYAA/vQtUodPmk3bHBayJnXh68TIlv7QThOMBKCYJbcP5YX3AjUCpNDGiOYq8zGKddYxF91CwoCBaPzEgdwAAA==","ne-night-lonely-dong":"UklGRggBAABXRUJQVlA4IPwAAAAQBgCdASogABgAPu1kqU2ppaQiMAgBMB2JZACo+a7SBYihfHD6n5HJ5nCSCok9tE30C3dN+7h4WZAA/sDw0IOVgdmsDfZPPQ+iiAjyoUZH93w3nTMpKRAiv37xgeKEcrpHjwnG8+ursjseoaPZR73DSTbJIQ/baqxBdx/IbnZQFR0SeC8uDV2CKm22UJPqX3W47v9MkXSRCTl3asmjjRpExqpdd/kJ/jhvYdPfpJ0LSwGGO9q7zJ6BhjE3bmJQOYtw3DTnigorYIIPjA2Jp1/vIqa6TuNEQeXKwz89drWFLoH3wFYhz7fvIzByg143nvXmLKcU1wOK0Z6+gAA=","ne-night-lonely-ha":"UklGRhgBAABXRUJQVlA4IAwBAAAQBgCdASogABgAPu1iqE2ppaOiMAgBMB2JZgC2zagSAwnMWEek22Om4yXiQgMIWk7k8JzBDV88+XAA/tFT+ONHSobKrI1qWL9QW8k+EHwXQjKE5wKKflLjY1D4ocK0BRDvbmlwRyDHhaM+vZHUEBh27SW2KytfUsbWwa4pWy3S+pE7Dt+JrSjCe/+0j9MreuZqqW/twZ9hS0LaEc/C2gXfY4jfFVjf58sFudec/PsZRV20kWOb//ydWYuuhw7agA1YMPGnpg2vj8C2dsSNmAvXIVn9y6FqaZZDfgwz8YG6monYOLpsHq5lUDJd0ohsfBS+9YbIkGiD277j2TKp9b5y9BNQoWRwoXfCAAAA","ne-night-lonely-thu":"UklGRiABAABXRUJQVlA4IBQBAAAwBwCdASogABgAPu1ip02ppaOiMAgBMB2JagCdMoM0kn/LsFmDaOFc+/vZXPEk8dUtvDVGqR+yvIYuTZ7D//Bi6JwA/tIsJSogK1V8RYWq0PTY4BZvb78KwC1YR+5Ygvqk2kvrsHurtGQF73ynbUu1a+lwea6CyCxyQbjSf0yFjLFfXDl/8lVChOt2stVafIAtdwZicmi+CAIT4QZ4YAo5cFkuAtvozEIq17f1LvWYxY4z44OgklhXEGiJ0DWAXt363OUeCFGiWfjgepiute2b38L1ezUPQHrxW02MRvfzUBl7TMS722X1koxYvxKmfPk/AAltGXRXxZmdpaTpy4TBy5N7UKq/wK/sZNGhUIVc9gEFQAA=","ne-night-lonely-xuan":"UklGRg4BAABXRUJQVlA4IAIBAAAwBgCdASogABgAPu1kqU2ppaQiMAgBMB2JZgCdM2iA3tfB3vdoauSf9/TUWzXwojs07wuy4O2b45YAAP7CDEB3hLkaF5y2ZSqKYeb3ALPAsXTO7o2QSUv/GlWR+wxbhXhF2MkqEV9fTF3MTtB1SopRIhi22evrFJthYXigvO2VRnVISw8MYqkq3sX3poOTvZCHRJHqsHPucvnzw5zLALim7HQDfQq39Eobov4u8r7JcyKn7L8eIedxKEMMkJMIG3HmUm3TstoegdHdLSYIF9Y7vg3p9WnDaxymzJwhxEI0zp5qe+0bRHhrY9w+vn+aJTpOWh9q/13jC6m3fBimRkBAAAA=","ne-night-normal":"UklGRgYBAABXRUJQVlA4IPoAAADwBQCdASogABgAPu1orE8ppiQiMBgIATAdiWQAnTM0QP9gV4HvbFW2aEz6Sh9gmgqWHsu2hc6pUAD9ijs5amrvRop9ouctF2IFmlc/3kne+PW1xiqAuWBDALNEnZUW5ZWLV/g+eOEzz+Du3CdUMTF+hFNqaAXvYel/jqfGalC/bk4cpod2wPNoig2VsThJ1WPfFQ33Wb4Vbn5uLGWlOwtVhMppTuiyumAxkIZ+LVmIfqWbTEj3gCY7hCnZ6Ulk/2czwkuZpRMonQYXiOdD7fw6W6wFYV6JMz3vHnzX95Cb8ZxjYudS0mhvcXJyYunTsNsklKG01wqU6tAA","ne-night-warm":"UklGRiABAABXRUJQVlA4IBQBAAAwBgCdASogABgAPu1grFAppSQisBgIATAdiWgAnTKAuHE5pWBOkBINy6ZjKoCiwxcfkIolhbFqzCtAAP7P+AGi/IAynLEQGF237pUb+AMZLz7ZMl4WculrSbdA5sLaViSj7K28DcG7Ct6MROQf6Hy6Hx/IIidp1T7pZrbvogmin2GrXWt0iochYoXEJ5YSzeOSAtZxLkIny+zx3d5WPD4hvGsemWp9BvuHmzXcuOlyqiCszMYAVOUwEVq4QkF+490KikqaOBnuW/g/BOjXH5fmlElvDoN+FABH4Jos8uLmeUXTQWLWyt9cNz72l2PAnic7fSLS58tQDln+vbrV3s1YWvSstezNEmg4RPfjLgjLnO8AAAA=","ne-night-ram-warm":"UklGRi4BAABXRUJQVlA4ICIBAACwBgCdASogABgAPu1gp02ppSMiMAgBMB2JbACdMoMkiBAxs8dyZ5RnktMFXjvXhaQ58A9Lo+Oycidq0IyY4AD+0DEaf+wKnpuyy6vi2NIarrFDYy5rFLpE04ymyeFXSY300wSDEt+iiB7DEioNzO4Mss/CvMF2UMFUTR+RUjDVZLSVcu1+pcHjdQEaY3cPFwaDeqFyOuXNCmSgE8cT5DCXCbh+QHFCq3rMyna+X+lLAH71IUHVJy/6NNZM3nWZt5ErCZS/HhFvm9NpWb6ab6YwwJ5QyWy6DSilpevM4os6E9JeMAJO/aFzMmWaqSU6qpiMzk5bjqsz3MFfHyK88hORtR/Ul4/Psrb7QEYkHG5FUVSEU1i6MSWVUTenodvyjAAAAA==","ne-night-ram-normal":"UklGRh4BAABXRUJQVlA4IBIBAACQBgCdASogABgAPu1iqU2ppaQiMAgBMB2JagCdMuOCvttX6oLzfaeeX7YFl5t20r6V8HhYEISe5w2cQdx0AP4WK0IodqTM/d4n6DtiBL1EffCml5C8ApUyWHJAgxEeidhgYcM4VQa5VC6820Jr74blD1uvgfyQZ/7DXv1xQqg8Kw8eXm9fGkfDV9ZC6Wd1Da/b4cgoG/yHKij648AIjW91RjxmBXBOGSd3ByLugku3z0/Gto5Tsl3swq/aR3GZG2YhjZh2vhE19ye392nUJhhB/5zgfMPzhrqjoVBh+j4IZlnL+I3kirrWNb1n+WhrY0LQrxxLHjWWwXdTRJfU6U6EKvWLpa7MQHmqCwvpY38GapwA","ne-night-fest-warm":"UklGRiIBAABXRUJQVlA4IBYBAAAQBwCdASogABgAPu1qqk8ppiOiMBgIATAdiWwAnTM0Qp7Vyd2WBxXd+vhZK0HF+SjiGviZCPaWvgrn74FN7ooSiAD+v4FRalgHLQiU/zJfqyQcbM0EhqY754wkKQAAF4S14S654FMHaIHnMUOrh9ePMoT8pRLP7VtE54DW8lMVbdCSeOOC4RkmMgqzC/6fa/GKZFTs0h1eGBrkH/cQUTD0Nv4XFgs4vX/z482cqYreKtB3nWqWu3miNei1ORQ+Yq/ymNre5c4XMHYULqzZ2ybupVy4QUwGimjINljnSNW8m1B3Nt2xVeuMVvOP4C+wjVq00QZ0PcclnuPCwMkI6ed+WtNF0xO1DJ2pK5yKMkmC10N5GImAAA==","ne-night-fest-normal":"UklGRhYBAABXRUJQVlA4IAoBAAAwBgCdASogABgAPu1sqk8ppiOiMBgIATAdiWgAsR7fTlLJGy2t8grYZafvRxVovx+gWB/DZ5+X6WcAAP2JkPZ2s4665nI1KwQLfPiGpKe9Upp0rt3ZKMeNgg9Qwwv77sJc/4OWTZOGx7W8WBm1fIdVkhZ54qK/Nt9UQkXqN0xkduxPThY6LiarlhynBYjhp31xWjBdtGimG3941n9CFUSb+Fg/57dnwlKCpPN0XQIFHzzTP4tKR1pYhl+JmWrPmu680cZoJwSFLu3HAA7jDc2Qk/nIGv5Hye5Vz7ABO6BmW1K7wk3ofkwW5HRzrlxaihhK5Z5iuqQPJwISrjBAK1TOVMTcnnpiZ0AAAA=="};
/* focal point (x%, y%) per picture: portrait crops keep the subject */
const FOC={"ne-night-warm":[40,45],"ne-night-normal":[47,55],"ne-night-cold":[45,55],"ne-night-ram-warm":[42,45],"ne-night-ram-normal":[50,50],
 "ne-night-fest-warm":[40,50],"ne-night-fest-normal":[47,55],"ne-night-lonely-xuan":[48,55],"ne-night-lonely-ha":[45,55],"ne-night-lonely-thu":[45,55],
 "ne-night-lonely-dong":[45,55],"ne-dawn-xuan":[55,40],"ne-dawn-ha":[50,40],"ne-dawn-thu":[45,40],"ne-dawn-dong":[50,40]};
/* painted lights per picture: [kitFxLight name, cx, cy (fraction of the picture, at the painted light source), size (fraction of width), how] */
const LIGHT={"ne-night-warm":[["candle",.38,.36,.24,"flick"]],"ne-night-normal":[["candle",.465,.52,.2,"flick"]],
 "ne-night-cold":[["candle",.33,.58,.18,"gutter"],["moonlight",.67,.2,.42,"in"]],
 "ne-night-ram-warm":[["candle",.45,.42,.22,"flick"],["moonlight",.25,.16,.3,"in"]],"ne-night-ram-normal":[["candle",.46,.52,.2,"flick"],["moonlight",.59,.18,.3,"in"]],
 "ne-night-fest-warm":[["candle",.37,.44,.22,"flick"]],"ne-night-fest-normal":[["candle",.46,.52,.2,"flick"]],
 "ne-night-lonely-xuan":[["lantern-red",.2,.3,.2,"dim"]],"ne-night-lonely-ha":[["lantern-red",.22,.23,.2,"dim"]],
 "ne-night-lonely-thu":[["lantern-red",.21,.18,.2,"dim"]],"ne-night-lonely-dong":[["lantern-red",.21,.23,.2,"dim"]],
 "ne-dawn-xuan":[["glow-gold",.55,.33,.45,"in"]],"ne-dawn-ha":[["glow-gold",.5,.27,.45,"in"]],"ne-dawn-thu":[["glow-gold",.44,.09,.45,"in"]],"ne-dawn-dong":[["glow-gold",.5,.33,.45,"in"]]};
/* painted particles (KFK_SP atlas name, count, motion) per beat; weather overrides the season's own drift on the dawn */
const DRIFT={warm:["petal-peach",10,"fall"],normal:["orb",6,"fly"],"lonely-xuan":["petal-peach",8,"fall"],"lonely-ha":["orb",7,"fly"],
 "lonely-thu":["leaf",7,"wind"],"lonely-dong":["snow",16,"fall"]};
const still=()=>{try{return red()||(typeof kfStill==="function"&&kfStill())}catch(e){return red()}};
const ATL={"petal-peach":9,"petal-plum":9,leaf:9,snow:5,orb:3,streak:3};
function spr(kind,n,mv){if(still()||!ATL[kind])return"";const F=ATL[kind];let h="";
 for(let i=0;i<n;i++){const f=i%F;h+=`<i class="kne-sp kne-${mv}${kind==="orb"||kind==="streak"?" kne-add":""}" style="background-image:url('img/fx/${kind}.webp');background-size:${F*100}% 100%;background-position:${F>1?f*100/(F-1):0}% 0;--x:${(i*37+11)%96}%;--y:${(i*23+13)%70}%;--d:${((i*.53)%2.6).toFixed(2)}s;--s:${(.6+((i*29)%45)/100).toFixed(2)};--r:${(i*67)%360}deg;--w:${((i%5)-2)*22}px"></i>`}
 return h}
function driftHTML(k){const d=DRIFT[k];return d?spr(d[0],d[1],d[2]):""}
function wxHTML(w){if(!w)return"";const n=w.n||"";
 if(/hoa đào/.test(n))return spr("petal-peach",10,"fall");if(/mai nở/.test(n))return spr("petal-plum",10,"fall");
 if(/lá phong|heo may/.test(n))return spr("leaf",8,"fall");if(/tuyết|sương giá/.test(n))return spr("snow",18,"fall");
 if(/mưa|giông/.test(n))return spr("streak",18,"rain");if(/đom đóm/.test(n))return spr("orb",8,"fly");return""}
/* lights: one positioned box per light inside the picture, the painted clip plays inside it (screen blend) */
function lights(pic,name){const H=[];if(!pic||typeof kitFxLight!=="function")return H;
 (LIGHT[name]||[]).forEach(([L,cx,cy,sz,how])=>{try{const b=document.createElement("span");b.className="kne-lb";b.style.cssText=`left:${(cx-sz/2)*100}%;top:calc(${cy*100}% - ${sz*50}cqw);width:${sz*100}%;aspect-ratio:1`;pic.appendChild(b);
  const h=kitFxLight(L,b,{inside:true,fade:600,opacity:how==="in"?.7:.75});if(!h)return;H.push(h);
  if(!still()){if(how==="gutter")setTimeout(()=>h.stop(2200),900);else if(how==="dim")setTimeout(()=>{b.style.transition="opacity 2.6s ease";b.style.opacity=".35"},700);
   else if(how==="in"){b.style.opacity="0";b.style.transition="opacity 2s ease .4s";requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.opacity="1"}))}}}catch(e){}});return H}
const nameOf=src=>(String(src).match(/(ne-[a-z-]+)\.webp/)||[])[1]||"";
function picHTML(src,k,extra){const nm=nameOf(src);const f=FOC[nm]||[50,50];const lq=LQ[nm]||(/ev-fest-/.test(src)?LQ["ne-dawn-"+(SEAK[SEASON[(S&&S.month||1)-1]]||"xuan")]:"");
 return `<div class="kne-pic" style="--fx:${f[0]}%;--fy:${f[1]}%">${lq?`<img class="kne-lq" src="data:image/webp;base64,${lq}" alt="" draggable="false">`:""}<img class="kne-img" src="${src}" alt="" draggable="false" onload="this.classList.add('ld')">${k==="cold"?"":driftHTML(k)}${extra||""}</div>`}
const PRE={};/* preload: resolves when loaded or after `ms` (the blurred thumbnail covers a slow picture; the full one fades in on load) */
function preload(src,ms){if(!src)return Promise.resolve();const w=ms||NE.wait;if(!PRE[src]){const im=new Image();PRE[src]=new Promise(r=>{im.onload=im.onerror=()=>r()});im.src=src}
 return Promise.race([PRE[src],new Promise(r=>setTimeout(r,w))])}

/* ---------- (1) the night card ---------- */
function moodRow(m0,m1,tier){const W=MOODS;const a=W[m0]?W[m0][0]:"",b=W[m1]?W[m1][0]:"";
 return [`${a}${m1!==m0?` → ${b}`:""} · ${TIER[tier].liked}`,m1<m0?"g":m1>m0?"r":"n"]}
/* kitNightEnd({tier, m0, m1, before, items:[inv entries], line}) — before = the night's rsnap (j75 __nsnap) */
function kitNightEnd(o){o=o||{};const T0=TIER[o.tier]||TIER.normal;const T=Object.assign({},T0,o.pic?{pic:o.pic}:{});let G=[],B=[],K=[];try{[G,B,K]=kaResultRows(o.before)}catch(e){}
 const [mv,mc]=moodRow(o.m0,o.m1,o.tier);
 const rows=[["Hoàng thượng",mv,mc]];if(G.length)rows.push(["Được",G,"g"]);if(B.length)rows.push(["Mất",B,"r"]);
 let tb=kitRows(rows);try{const kem=kitKemRow(K);if(kem)tb=tb.replace(/<\/span>$/,kem+"</span>")}catch(e){}
 const items=(o.items||[]).map(e=>{let I={};try{I=kitItemInfo(e)}catch(x){}return `<div class="kmrow kne-it">${typeof kitItem==="function"?kitItem({src:I.src,name:"",grade:I.grade||0,size:"sm",tip:I.name}).replace('<span class="kitn"></span>',""):""}${typeof kitGradeChip==="function"?kitGradeChip(I.grade||0,{size:"sm"}):""}<b>${esc(I.name||"")}</b><small>Hoàng thượng ban</small></div>`}).join("");
 const html=`<div class="kne kne-${o.tier}">${picHTML(DIR+T.pic+".webp",o.tier)}<div class="kne-side"><div class="kne-cap"><b>${T.t}</b>${o.line?`<small>${esc(o.line)}</small>`:""}</div>
  <div class="kmlist">${tb}${items}</div><button class="kbtn kmtake kne-take" data-km-close>${items?"Nhận":"Tiếp tục"}</button></div></div>`;
 const keys=(o.items||[]).map(e=>e.k);
 let LH=[];kmPush(done=>preload(DIR+T.pic+".webp",NE.wait).then(()=>{const st=kmStage("kne-ov",html,{manual:true,dur:60000,onEnd:()=>{LH.forEach(h=>{try{h.stop(200)}catch(e){}});keys.forEach((k,i)=>setTimeout(()=>{try{kitFlyItem(k)}catch(e){}},i*180));done()}});
  const root=st.ov.querySelector(".kne");st.ov.id="kneov";play(o.tier);LH=lights(st.ov.querySelector(".kne-pic"),T.pic);
  const fin=()=>{root.classList.add("km-done");st.finish()};st.later(red()?0:NE.list,fin);
  st.ov.addEventListener("click",e=>{if(e.target.closest("[data-km-close]"))return;if(!root.classList.contains("km-done"))fin()})}))}

/* the night's state, read at its real moments */
let N=null;
const ns0=nightScene;nightScene=function(){const r=ns0.apply(this,arguments);try{if(S&&S.tonight==="me"&&window.__nsnap)N={m0:S.emp.mood,inv:S.inv.length,t:Date.now()}}catch(e){}return r};
/* her night is under way (bath → carry → pillow talk → card): the options' own result toasts (and their THÀNH/HỎNG stars / smoke puffs)
   are not shown — the night card shows the whole night at once (review r1: puffs covered the text) */
const nightOn=()=>{try{return !!(N&&N.t&&S&&S.tonight==="me"&&Date.now()-N.t<15*60e3)}catch(e){return false}};
{const fb0=window.feedback;if(typeof fb0==="function"){window.feedback=function(k){if(window.__kneHold&&(k==="night"||k==="favour"||k==="coin"))return;return fb0.apply(this,arguments)};feedback=window.feedback}}
const nf0=nightFx;nightFx=function(s){if(!N)N={m0:S.emp.mood,inv:S.inv.length,t:Date.now()};N.s=s;const a0=S.sung,b0=S.an||0;window.__kneHold=1;const r=nf0.apply(this,arguments);N.sung=S.sung;N.an=S.an||0;N.g=S.sung-a0;return r};
function tierOf(){const P=N||{};let pts=P.s||0;const why=[`đêm ${pts}`];
 try{const t=typeof toilToday==="function"?toilToday(S):null;const v=t?NE.toil[t.makeup]||0:0;if(v){pts+=v;why.push(`điểm trang ${v>0?"+":""}${v}`)}}catch(e){}
 if(P.sung!=null&&((S.sung<P.sung)||((S.an||0)<P.an))){pts+=NE.talkBad;why.push(`lời gối đầu ${NE.talkBad}`)}
 try{if(typeof illOf==="function"&&illOf(S)){pts+=NE.ill;why.push(`đang bệnh ${NE.ill}`)}}catch(e){}
 return{tier:pts>=NE.warm?"warm":pts>=NE.normal?"normal":"cold",pts,why}}
/* L669: a full-moon (rằm = trung tuần) or festival night shows its painted variant (warm / normal); a cold night keeps its cold room */
function variantOf(tier){let f=null;try{f=typeof festToday==="function"?festToday():null}catch(e){}
 if(tier==="cold")return{pic:"ne-night-cold",line:f?`Ngoài kia đèn hoa ${f.name} rực rỡ, trong này ngọn nến lụi dần.`:S.tuan===1?"Trăng rằm tròn vằng vặc, mà lòng người lạnh như sương.":""};
 if(f)return{pic:`ne-night-fest-${tier}`,line:tier==="warm"?`Đèn hoa ${f.name} sáng khắp ngự uyển, nến đỏ cháy suốt canh khuya.`:`Đèn hoa ${f.name} lung linh ngoài song, ngọn nến lặng lẽ cháy tới sáng.`};
 if(S.tuan===1)return{pic:`ne-night-ram-${tier}`,line:tier==="warm"?"Trăng rằm tròn vằng vặc, nến đỏ cháy suốt canh khuya.":"Trăng rằm soi bóng mặt hồ, ngọn nến lặng lẽ cháy tới sáng."};
 return{pic:"ne-night-"+tier,line:""}}
/* hold the bestow tray during her night: the card shows the reward */
const HELD=[];{const kr=window.kitReward;if(typeof kr==="function"){window.kitReward=function(spec){if(window.__kneHold){HELD.push(spec);return}return kr.apply(this,arguments)};kitReward=window.kitReward}}
function release(){window.__kneHold=0;const L=HELD.splice(0);L.forEach(x=>{try{kitReward(x)}catch(e){}})}
/* the option's own result toast during her night is dropped: the night card shows the whole night (before = the night's start) */
const rs0=resultShow;resultShow=function(title,before){if(title!=="Đêm thị tẩm"&&(window.__kneHold||window.__kneMute||nightOn())&&!window.__bot)return;if(title==="Đêm thị tẩm"&&N&&S&&!S.dead){try{
  /* game rule first (bots / no-UI too, so balance runs see the same mood step), then the card */
  const T=tierOf();const m0=N.m0!=null?N.m0:S.emp.mood;const dm=NE.mood[T.tier]||0;let m1=S.emp.mood;if(dm<0)m1=Math.max(0,m1+dm);else if(dm>0&&m1<NE.moodCap)m1=Math.min(NE.moodCap,m1+dm);S.emp.mood=m1;
  if(T.tier!=="normal")S.neMorn={d:wk(),tier:T.tier};
  if(window.__bot||typeof kmPush!=="function"){N=null;HELD.length=0;window.__kneHold=0;return rs0.apply(this,arguments)}
  const items=S.inv.slice(N.inv).filter(e=>e&&e.from==="emp");HELD.length=0;window.__kneHold=0;
  window.kneLast={tier:T.tier,pts:T.pts,why:T.why,m0,m1,items:items.map(e=>e.k)};
  const V=variantOf(T.tier);
  const line=V.line||(T.tier==="warm"?"Nến đỏ cháy suốt canh khuya, tiếng đàn còn vương bên gối.":T.tier==="cold"?"Ngọn nến lụi dần, trăng lạnh soi qua song cửa.":"Côn trùng rỉ rả ngoài hiên, ngọn nến lặng lẽ cháy tới sáng.");
  window.kneLast.pic=V.pic;
  /* the night's own caption may come from the road that led to it (jvisit: the Emperor stayed in HER palace) — one hook, same card */
  let line2=line;try{if(typeof window.kneLineHook==="function"){const x=window.kneLineHook(T.tier);if(x)line2=String(x)}}catch(e){}
  N=null;window.__kneMute=1;setTimeout(()=>{window.__kneMute=0},600);kitNightEnd({tier:T.tier,m0,m1,before,items,line:line2,pic:V.pic});return}catch(e){console.error(e)}}
 return rs0.apply(this,arguments)};
const cm0=chooseM;chooseM=function(){const r=cm0.apply(this,arguments);if(window.__kneHold)release();return r};

/* ---------- (2) the lonely night + the new day, inside the week panel ---------- */
let PREV=null;
const et0=endTurn;endTurn=function(){let p=null;try{if(S&&!S.dead){const w=wk();const nw=S.nightWhy&&S.nightWhy.wk===w?S.nightWhy:null;const tk=S.ntk&&S.ntk.w===w?S.ntk:null;
  p={w,bedded:(S.nightLog||[]).includes(w),nw,tk,srv:typeof isSrv==="function"&&isSrv(),out:!!S.out}}}catch(e){}
 PREV=p;return et0.apply(this,arguments)};
/* the stranger rule (j61 / j63 kaNamed): a consort she has not met is never named */
function whoOf(id,nm){const v=(typeof rivals!=="undefined"?rivals:[]).find(x=>x.id===id);if(!v)return nm||"";let ok=true;try{ok=typeof kaNamed!=="function"||kaNamed(v)}catch(e){}
 return ok?`${RANKS[v.rank]?RANKS[v.rank].n+" ":""}${v.name}`:""}
function lonelyOf(p){if(!p||p.bedded||p.srv)return null;const nw=p.nw||{},tk=p.tk;
 if(p.out)return{k:"lonely",line:"Lãnh cung đêm dài, chỉ có tiếng mõ canh và gió lùa."};
 if(nw.cause==="custom")return{k:"custom",line:`Hôm ấy là ${nw.day||"ngày lệ"}: theo lệ, Hoàng thượng nghỉ ở cung Hoàng hậu.`};
 if(tk&&tk.who!=="me"){const w=whoOf(tk.who,tk.nm);return{k:"lonely",snd:"music",line:w?`Tiếng đàn sáo vọng sang từ cung ${w}: đêm qua Hoàng thượng nghỉ ở đó.`:"Tiếng đàn sáo vọng sang từ cung một vị phi tần ngươi chưa quen: đêm qua Hoàng thượng nghỉ ở đó."}}
 if(nw.pick==="me")return{k:"lonely",line:"Thẻ bài của ngươi được lật, nhưng đêm qua ngươi không hầu giá."};
 if(nw.cause==="stolen")return{k:"lonely",line:"Hoàng thượng bị mời sang cung khác giữa đường."};
 if(nw.pick){const w=whoOf(nw.pick);return{k:"lonely",snd:"music",line:w?`Tiếng đàn sáo vọng sang từ cung ${w}: đêm qua Hoàng thượng lật thẻ bài của nàng.`:"Tiếng đàn sáo vọng sang từ cung một vị phi tần ngươi chưa quen: đêm qua Hoàng thượng lật thẻ bài của nàng."}}
 return{k:"lonely",line:"Đêm qua Hoàng thượng không lật thẻ bài nào."}}
function dawnOf(){const f=typeof festToday==="function"?festToday():null;const sea=SEAK[SEASON[S.month-1]]||"xuan";
 if(f)return{k:"fest",src:`img/ev-fest-${f.k}-b.webp`,t:`Sáng ${f.name}`,sub:`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`};
 return{k:sea,src:`${DIR}ne-dawn-${sea}.webp`,t:`Bình minh ${SEAN[sea]}`,sub:`Tháng ${S.month}${S.wx?" · "+S.wx.n:""}`}}
/* kitNewDay(o) — o = {night:{k,line}|null, day:{k,src,t,sub}, wx, host(#dawn), then()} : plays the beats in host, then() when done/tapped */
function kitNewDay(o){const host=o.host;const beats=[];const sea=o.sea||seaNow();
 if(o.night)beats.push({k:o.night.k,snd:o.night.snd,dk:"lonely-"+sea,src:`${DIR}ne-night-lonely-${sea}.webp`,t:TIER[o.night.k].t,sub:o.night.line,ms:NE.lonelyMs});
 beats.push({k:o.day.k,src:o.day.src,t:o.day.t,sub:o.day.sub,ms:NE.dawnMs,wx:o.wx});
 host.className="dawn kne-day"+(red()?" rm":"");host.hidden=false;
 host.innerHTML=`<div class="kne kne-beat">${beats.map((b,i)=>`<div class="kne-b kne-${b.k}${i?"":" on"}" data-i="${i}">${picHTML(b.src,b.dk||b.k,b.wx?wxHTML(b.wx):"")}<div class="kne-cap"><b>${esc(b.t)}</b><small>${esc(b.sub)}</small></div></div>`).join("")}<div class="kmhint">Chạm để bỏ qua</div></div>`;
 void host.offsetWidth;host.classList.add("on");let i=0,end=false;const T=[];
 let LH=[];const stopL=()=>{LH.forEach(h=>{try{h.stop(300)}catch(e){}});LH=[]};
 const show=j=>{host.querySelectorAll(".kne-b").forEach(e=>e.classList.toggle("on",+e.dataset.i===j));play(beats[j].snd||beats[j].k);stopL();
  const el=host.querySelector(`.kne-b[data-i="${j}"] .kne-pic`);LH=lights(el,nameOf(beats[j].src))};
 const finish=()=>{if(end)return;end=true;T.forEach(clearTimeout);stopL();host.onclick=null;host.classList.remove("kne-day","km-endon");host.querySelectorAll(":scope > .kmend").forEach(b=>b.remove());try{o.then&&o.then()}catch(e){console.error(e)}};
 /* KIT §81: the beats never close by themselves or by a tap: a tap = skip to the last beat, then ONE kit button (kitSceneEnd) closes the scene */
 const showEnd=()=>{if(end)return;T.forEach(clearTimeout);T.length=0;try{kitSceneEnd(host,"Tiếp theo",finish)}catch(e){console.error(e);finish()}};
 const next=()=>{i++;if(i>=beats.length){i=beats.length-1;return showEnd()}show(i);T.push(setTimeout(next,beats[i].ms))};
 host.onclick=e=>{e.stopPropagation();if(host.querySelector(":scope > .kmend"))return;T.forEach(clearTimeout);T.length=0;if(i<beats.length-1){i=beats.length-1;show(i)}showEnd()};
 Promise.all(beats.map(b=>preload(b.src,NE.wait))).then(()=>{if(end)return;show(0);T.push(setTimeout(next,beats[0].ms))});return{finish}}
const dw0=dawn;dawn=function(){const p=PREV;PREV=null;const args=arguments,self=this;
 try{if(S&&!S.dead&&p&&!p.bedded&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)){let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
  const night=lonelyOf(p),day=dawnOf();window.kneLastDay={night:night&&night.k,day:day.k};
  kitNewDay({host:w,night,day,wx:S.wx,then:()=>{w.classList.remove("on");dw0.apply(self,args)}});return}}catch(e){console.error(e)}
 return dw0.apply(this,arguments)};
setTimeout(function warm(){try{if(typeof S==="undefined"||!S){setTimeout(warm,6000);return}const sea=SEAK[SEASON[S.month-1]]||"xuan";[DIR+"ne-night-lonely-"+sea+".webp",DIR+"ne-dawn-"+sea+".webp",DIR+"ne-night-normal.webp"].forEach(s=>preload(s))}catch(e){}},9000);
window.kitNightEnd=kitNightEnd;window.kitNewDay=kitNewDay;window.kneTierOf=tierOf;

/* ---------- kit sample page (§62) ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§62",title:"kitNightEnd · kitNewDay (night-end + new-day pictures)",html:()=>`<div class="kne-sample">${["warm","normal","cold"].map(k=>`<figure><img src="${DIR}${TIER[k].pic}.webp" alt=""><figcaption>${TIER[k].t}</figcaption></figure>`).join("")}${["xuan","ha","thu","dong"].map(k=>`<figure><img src="${DIR}ne-night-lonely-${k}.webp" alt=""><figcaption>Đêm không được triệu · ${SEAN[k]}</figcaption></figure>`).join("")}${["warm","normal"].map(k=>`<figure><img src="img/${NT_PIC[k]}.webp" alt=""><figcaption>Gối đầu · ${TIER[k].t}</figcaption></figure>`).join("")}<figure><img src="img/ev-night2.webp" alt=""><figcaption>Gối đầu · Đêm lạnh nhạt</figcaption></figure>${["xuan","ha","thu","dong"].map(k=>`<figure><img src="${DIR}ne-dawn-${k}.webp" alt=""><figcaption>Bình minh ${SEAN[k]}</figcaption></figure>`).join("")}<figure><img src="img/ev-fest-newyear-b.webp" alt=""><figcaption>Sáng Tết Nguyên đán</figcaption></figure></div><button class="kbtn" type="button" onclick="event.stopPropagation();if(typeof S!=='undefined'&&S)kitNightEnd({tier:'warm',m0:1,m1:0,before:rsnap(),items:[],line:'Mẫu'})">Xem thẻ đêm</button>`})}catch(e){}

/* ---------- (4) the morning after (owner 15/11 21:10Z, L666–667) ----------
   S.neMorn = {d: the night's day (wk), tier} is set by the night card for a mặn nồng (warm) or lạnh nhạt (cold) night. When the day has
   moved on (endTurn: the next tuần = the next day of play), ONE morning beat:
   warm → Kính sự phòng's chief eunuch records the night in the book, the maids gossip: Danh +BAL.nightEnd.after.warmDanh.
   cold → the other consorts already know: one of them mocks her (a consort she knows is named, else "một vị phi tần ngươi chưa quen",
   stranger rule), Danh BAL.nightEnd.after.coldDanh; she answers with the reaction buttons of the toilette reactions (jtoil):
   Nhẫn nhịn (Đức +1, Danh −1: seen as weak) · Cười trừ (nothing) · Đáp lại (Sức −2; BAL.toil.replyWin % Danh +BAL.toil.replyDanh, else she is resented more).
   Bots / no UI: the Danh change only (sims = game). Old saves: no field → nothing. */
BAL.nightEnd.after={warmDanh:2,coldDanh:-1,bearDuc:1};
function mockerOf(){try{const L=(typeof liveRivals==="function"?liveRivals(false):[]).filter(v=>v&&!v.dead);if(!L.length)return null;
  const k=L.filter(v=>{try{return typeof kaNamed!=="function"||kaNamed(v)}catch(e){return false}});const P=(k.length?k:L).slice().sort((a,b)=>(a.rel||0)-(b.rel||0));return{v:P[0],known:!!k.length}}catch(e){return null}}
function morningAfter(){const M=S&&S.neMorn;if(!M||S.dead)return;if(M.d===wk())return;S.neMorn=null;const A=BAL.nightEnd.after;
 const ui=!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&typeof Q!=="undefined";
 if(M.tier==="warm"){apply({danh:A.warmDanh});if(!ui)return;
  let who;try{who=typeof pEunCourt==="function"?pEunCourt("ksp"):undefined}catch(e){}
  Q.push({t:"Kính sự phòng ghi sổ",who,art:"img/act-tong-quan-ksp-dem-chuyen.webp",hideOut:true,h:`<p>Sáng sớm, tổng quản Kính sự phòng đến cung ngươi, mở sổ ghi: “Đêm qua ${RANKS[S.rank]?RANKS[S.rank].n+" ":""}${S.name} hầu giá, Hoàng thượng rất vừa ý.”</p><p>Chưa đến giờ thỉnh an, cung nữ các cung đã xì xào bàn tán.</p><p class="past">Danh +${A.warmDanh}.</p>`,
   opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]});return}
 if(M.tier==="cold"){apply({danh:A.coldDanh});if(!ui)return;const m=mockerOf();const v=m&&m.v;const named=v&&m.known;
  const nm=named?whoOf(v.id,v.name):"một vị phi tần ngươi chưa quen";let who;try{who=named&&typeof pv==="function"?pv(v):undefined}catch(e){}
  Q.push({t:"Lời ra tiếng vào",who,art:"img/ev-toil-rival-tease.webp",hideOut:true,h:`<p>${nm.charAt(0).toUpperCase()+nm.slice(1)} che miệng cười khi gặp ngươi lúc thỉnh an: “Nghe nói đêm qua muội muội hầu giá, mà Hoàng thượng chẳng mấy vui lòng?”</p><p>Mấy phi tần khác liếc nhau, khẽ cười.</p><p class="past">Danh ${A.coldDanh}.</p>`,
   opts:[{n:"Nhẫn nhịn",fx:{duc:A.bearDuc,danh:-1},hideOut:true,hint:"giữ tiếng hiền đức, nhưng người ta cho là ngươi yếu thế",risk:"an toàn",go:()=>{log("Ta nhẫn nhịn, không đáp một lời.")}},
    {n:"Cười trừ",fx:{},hideOut:true,hint:"cho qua, không đổi gì",risk:"an toàn",go:()=>{log("Ta cười trừ cho qua.")}},
    {n:"Đáp lại",fx:{suc:-2},hideOut:true,hint:"đáp khéo thì thêm danh tiếng, thành bại khó đoán, hỏng thì nàng ta càng ghét",risk:"có rủi ro",
     go:()=>{if(roll(BAL.toil?BAL.toil.replyWin:50)){apply({danh:BAL.toil?BAL.toil.replyDanh:2});log("Ta đáp lại khéo léo, người nghe gật gù.")}else{if(v){try{relAdd(S,v,-3)}catch(e){}v.ghen=cl((v.ghen||0)+2,0,100)}log("Ta đáp lại, không khí càng gượng.")}}}]})}}
{const et1=endTurn;endTurn=function(){const r=et1.apply(this,arguments);try{morningAfter()}catch(e){console.error(e)}return r}}
window.kneMorningAfter=morningAfter;

/* ---------- (3) the in-night pillow-talk dialog picture follows the night's tone (owner s8: "Ảnh này là gì mà nhìn như bị ghẻ lạnh vậy") ----------
   Every in-night beat and its picture (KIT §62.3):
     ksp   "Tối nay Hoàng thượng lật thẻ bài…"  → ev-ksp (summons; neutral, before the night)
     prep  bath / toilette                      → ev-prep (neutral)
     night1 carried in the phoenix quilt        → ev-night1 (being redrawn by review/pic-dupes; not touched here)
     night2 pillow talk, text by the night score s (j8): s ≥ 6 "Ngài khẽ cười, kéo ngươi lại gần…" → ev-night2-warm (close);
            s ≥ 3 "Ngài nắm tay ngươi rất lâu…" → ev-night2-tender (hand in hand); else "Ngài có vẻ xa cách" → ev-night2 (apart).
            Both warm/tender pictures were drawn by review/pic-dupes (night_gens.txt ksDhGD716B / jUXCWBYLD0).
     night-end card (this file)                 → ne-night-<warm|normal|cold> by the card tier.
   Same thresholds as the j8 text (6 / 3), so picture and words always agree. */
const NT_TONE=s=>s>=6?"warm":s>=3?"normal":"cold";
/* pictures drawn by review/pic-dupes (reuse first): warm = he draws her close (ev-night2-warm), normal = hand in hand (ev-night2-tender) */
const NT_PIC={warm:"ev-night2-warm",normal:"ev-night2-tender"};
if(typeof kitEvBanner==="function"){const eb0=kitEvBanner;kitEvBanner=function(m){try{if(m&&m.pid==="night2"&&m.pp&&typeof m.pp.s==="number"){const tn=NT_TONE(m.pp.s);
  if(NT_PIC[tn])return{src:`img/${NT_PIC[tn]}.webp`,lab:"",key:NT_PIC[tn].slice(3),own:true}}}catch(e){}return eb0.apply(this,arguments)};window.kitEvBanner=kitEvBanner}
window.kneNightTone=NT_TONE;

/* ---------- CSS ---------- */
const st=document.createElement("style");st.id="kne-css";st.textContent=`
.kne{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:600px}
.kne-pic{position:relative;width:100%;aspect-ratio:4/3;max-height:min(62dvh,450px);border-radius:var(--k-rad,8px);overflow:hidden;border:1px solid var(--gold);box-shadow:0 0 0 3px #f6ead6,0 12px 30px #000a;background:#f6ead6;container-type:size}
.kne-lq,.kne-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--fx,50%) var(--fy,50%)}
.kne-lq{filter:blur(10px);transform:scale(1.08)}
.kne-img{opacity:0;transition:opacity .5s ease}.kne-img.ld{opacity:1;animation:kneZoom calc(6s*var(--pace)) ease-out both}
.kne-cap{display:flex;flex-direction:column;align-items:center;text-align:center;gap:2px;animation:kmFade calc(.45s*var(--pace)) ease calc(.25s*var(--pace)) both}
.kne-cap b{font-family:var(--display);font-size:1.3rem;color:#f6e3b4;letter-spacing:.05em}
.kne-cap small{color:#e9d6b0;font-size:.86rem;max-width:34rem;line-height:1.35}
.kne-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:460px;min-height:0}
.kne .kmlist .kpkb{width:100%}
.kne-take{flex:0 0 auto}
.kne-it{display:flex;align-items:center;gap:6px}.kne-it small{color:var(--muted,#8a7560)}
/* painted lights (kitFxLight inside a box at the painted light source) + painted sprite frames (§68 atlases), all clipped to the picture */
.kne-lb{position:absolute;pointer-events:none;mix-blend-mode:screen}.kne-lb>.kfxk-in{inset:0;width:100%;height:100%;mix-blend-mode:normal}
.kne-sp{position:absolute;z-index:2;top:-8%;left:var(--x);width:calc(24px*var(--s));aspect-ratio:1;background-repeat:no-repeat;opacity:0;pointer-events:none}
.kne-add{mix-blend-mode:screen}
.kne-fall{animation:kneFall 3.8s linear var(--d) infinite}
.kne-wind{top:calc(var(--x)*.6);left:-8%;width:calc(26px*var(--s));animation:kneWind 3s ease-in var(--d) infinite}
.kne-fly{top:var(--y);width:calc(16px*var(--s));animation:kneFly 2.4s ease-in-out var(--d) infinite alternate}
.kne-rain{top:-12%;width:calc(10px*var(--s));aspect-ratio:1/6;background-size:300% 100%;opacity:.5;transform:rotate(12deg);animation:kneRain .9s linear var(--d) infinite}
@keyframes kneZoom{from{transform:scale(1.08)}to{transform:scale(1)}}
@keyframes kneFall{0%{opacity:0;transform:translate(0,0) rotate(0)}10%{opacity:.95}100%{opacity:0;transform:translate(var(--w),110cqh) rotate(var(--r))}}
@keyframes kneWind{0%{opacity:0;transform:translate(0,0) rotate(0)}15%{opacity:.9}100%{opacity:0;transform:translate(115cqw,40px) rotate(var(--r))}}
@keyframes kneFly{from{opacity:.15;transform:translate(0,0)}to{opacity:.95;transform:translate(14px,-18px)}}
@keyframes kneRain{from{transform:translate(0,0) rotate(12deg)}to{transform:translate(-24px,125cqh) rotate(12deg)}}
.kne-ov .kne:not(.km-done) :is(.kmlist,.kne-take){display:none}
/* week panel beats */
.dawn.kne-day{padding:12px;cursor:pointer;z-index:9200}
.dawn.kne-day.km-endon{box-sizing:border-box;padding-bottom:calc(68px + env(safe-area-inset-bottom,0px))}
.dawn.kne-day.km-endon .kne-beat .kne-pic{max-height:calc(100dvh - 200px)}
.kne-beat{position:relative;width:100%;max-width:820px;display:grid;place-items:center}
.kne-b{grid-area:1/1;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;opacity:0;transition:opacity calc(0.6s*var(--pace,1)) ease;pointer-events:none}
.kne-b.on{opacity:1}
.kne-beat .kne-pic{max-height:calc(100dvh - 130px)}
.kne-beat .kmhint{position:static;margin-top:8px}
.dawn.rm .kne-b{transition:none}
/* landscape up to 900 px high (phone 844x390, 1000x755, iPad 1180x820): picture left, words right; the button never leaves the screen */
/* kv3:.kv2 */
 :where(.kv2) .kne-ov .kmst{max-width:96vw}:where(.kv2) .kne-ov .kne{flex-direction:row;align-items:center;max-width:96vw;width:96vw;gap:14px}
 :where(.kv2) .kne-ov .kne-pic{width:min(54vw,calc((100dvh - 40px)*1.333));height:auto;max-height:none;flex:0 0 auto}
 :where(.kv2) .kne-ov .kne-side{justify-content:center;max-width:420px;flex:1 1 300px;max-height:calc(100dvh - 24px)}
 :where(.kv2) .kne-ov .kne-side .kmlist{flex:0 1 auto;min-height:0;max-height:none;overflow:auto}
 :where(.kv2) .kne-beat .kne-b{flex-direction:row}:where(.kv2) .kne-beat .kne-pic{width:min(66vw,calc((100dvh - 60px)*1.333));height:auto;max-height:none}:where(.kv2) .kne-beat .kne-cap{max-width:28vw}

/* portrait: the full-scene beats fill a tall frame cropped around the focal point; the card keeps 4:3 above its list */
/* kv3:.kv1 */:where(.kv1) .kne-ov .kne-pic{max-height:min(46dvh,450px)}
 :where(.kv1) .kne-ov .kne-side{max-height:calc(100dvh - min(46dvh,450px) - 40px)}:where(.kv1) .kne-ov .kne-side .kmlist{flex:0 1 auto;min-height:0;max-height:none;overflow:auto}
 :where(.kv1) .kne-beat .kne-pic{aspect-ratio:3/4;width:min(100%,calc((100dvh - 170px)*.75));max-height:none}
.kne-sample{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px}.kne-sample figure{margin:0}.kne-sample img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;border:1px solid var(--gold)}
.kne-sample figcaption{font-size:.75rem;text-align:center}
@media (prefers-reduced-motion:reduce){.kne *{animation:none!important;transition:none!important}.kne-sp{display:none}}
.km-red .kne *{animation:none!important}.km-red .kne-sp{display:none}`;document.head.appendChild(st);
})();
