/* ===== Pro 3: precise prayer times + match-your-mosque adjustment ===== */
(function(){
const K=["fajr","sunrise","dhuhr","asr","maghrib","isha"];
function raw(y,m,d,loc){
  const M=METH[S.method]||METH.karachi,lat=loc.lat,lng=loc.lng,jd=julianDay(y,m,d)-lng/360;
  const mid=tt=>fixm(12-sunPos(jd+tt).eqt,24);
  const ang=(a,tt,ccw)=>{const dc=sunPos(jd+tt).decl;const v=darccos((-dsin(a)-dsin(dc)*dsin(lat))/(dcos(dc)*dcos(lat)))/15;return mid(tt)+(ccw?-v:v)};
  const asrT=(f,tt)=>{const dc=sunPos(jd+tt).decl;return ang(-darccot(f+dtan(Math.abs(lat-dc))),tt,false)};
  let t={fajr:5/24,sunrise:6/24,dhuhr:.5,asr:13/24,maghrib:18/24,isha:18/24},h;
  for(let n=0;n<4;n++){
    h={fajr:ang(M.f,t.fajr,true),sunrise:ang(.833,t.sunrise,true),dhuhr:mid(t.dhuhr),asr:asrT(S.asr==1?1:2,t.asr),maghrib:ang(.833,t.maghrib,false)};
    h.isha=M.i>=30?h.maghrib+M.i/60:ang(M.i,t.isha,false);
    for(const k in h)t[k]=h[k]/24;
  }
  const out={};
  for(const k in h)out[k]=Math.round((Date.UTC(y,m-1,d)+(h[k]-lng/15)*3600000)/60000)*60000;
  return out;
}
window.calcTimes=function(y,m,d,loc){
  const o=raw(y,m,d,loc),a=S.adj||{};
  for(const k in o)if(a[k])o[k]+=a[k]*60000;
  return o;
};
const u=()=>lang==="ur";
const hm=(ms,tz)=>{const p=tzParts(new Date(ms),tz);return{h:+p.hour,m:+p.minute}};
const pad=n=>String(n).padStart(2,"0");
const info=()=>{const loc=getLoc(),tz=loc.tz,d=localYMD(new Date(),tz);return{loc,tz,base:raw(d.y,d.m,d.d,loc)}};
const apply=()=>{save();if(typeof syncNative==="function")syncNative();adjPage()};
window.adjPage=function(){
  curTab="more";renderNav();
  S.adj=S.adj||{};
  const {loc,tz,base}=info();
  const rows=K.map(k=>{
    const a=S.adj[k]||0,f=hm(base[k]+a*60000,tz);
    return `<div class="setrow" style="flex-wrap:wrap;gap:8px"><b style="min-width:70px">${nt(k)}</b>
     <input type="time" value="${pad(f.h)}:${pad(f.m)}" onchange="adjSet('${k}',this.value)" style="font-size:18px;padding:6px;border-radius:10px;border:1px solid var(--ghost);background:var(--card);color:var(--tx)">
     <span class="stp"><button onclick="adjStep('${k}',-1)">−</button><span style="min-width:44px;display:inline-block;text-align:center">${a>0?"+":""}${a}</span><button onclick="adjStep('${k}',1)">+</button></span></div>`}).join("");
  document.getElementById("main").innerHTML=`<div class="card ${u()?"rtl":""}"><h3 class="center">⚙️ ${u()?"اوقات اپنی مسجد کے مطابق کریں":"Match times to your mosque"}</h3>
   <div class="exp">${loc[lang]||""} · ${METH[S.method||"karachi"][lang]}</div>${rows}
   <button class="btn ghost" onclick="adjReset()">${u()?"سب ری سیٹ کریں":"Reset all"}</button>
   <div class="note">${u()?"طریقہ: جس نماز کا وقت آپ کی مسجد میں مختلف ہو، اس کے خانے میں مسجد کا وقت لکھ دیں۔ ایپ فرق خود نکال کر ہر دن کے وقت اور اذان کے الارم میں لگا دے گی۔ (حساب کا طریقہ اور عصر کا وقت ترتیبات میں بدل سکتے ہیں۔)":"How: type your mosque's time in the box of any prayer that differs. The app works out the difference and applies it to every day and to the azan alarms. (You can also change the calculation method and Asr timing in Settings.)"}</div></div>`;
};
window.adjSet=(k,v)=>{
  if(!v)return;const [hh,mm]=v.split(":").map(Number),{tz,base}=info(),b=hm(base[k],tz);
  let d=hh*60+mm-(b.h*60+b.m);if(d>720)d-=1440;if(d<-720)d+=1440;
  S.adj=S.adj||{};S.adj[k]=Math.max(-90,Math.min(90,d));apply();
};
window.adjStep=(k,d)=>{S.adj=S.adj||{};S.adj[k]=Math.max(-90,Math.min(90,(S.adj[k]||0)+d));apply()};
window.adjReset=()=>{S.adj={};apply()};

const mp=window.morePage;
window.morePage=function(){
  mp();
  const t=document.querySelector(".tiles");
  if(t){const b=document.createElement("button");b.className="tile";b.innerHTML="⚙️<br>"+(u()?"اوقات ایڈجسٹ":"Adjust times");b.onclick=adjPage;t.appendChild(b)}
};
if(typeof syncNative==="function")syncNative();
})();
