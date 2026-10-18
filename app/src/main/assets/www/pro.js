/* ===== Pro layer: HD vector icons, polished UI, Tasbih + Duas tabs ===== */
(function(){
const P=(d,x)=>`<path d="${d}"${x||""}/>`;
const G='#e8b931',R='#e8590c',GR='#1e9e5a',RD='#c0392b';
const I={
"🕌":P("M3 21h18M5 21v-8h14v8M12 3c2.2 2 3.200 3.600 3.200 5.200a3.200 3.200 0 0 1-6.400 0C8.800 6.600 9.800 5 12 3zM3 21V8.500M21 21V8.500M10 21v-4a2 2 0 0 1 4 0v4"),
"📖":P("M2 5.500c3.500-1.200 7-.8 10 1.200v13.500c-3-2-6.500-2.400-10-1.200zM22 5.500c-3.500-1.200-7-.8-10 1.200v13.500c3-2 6.500-2.400 10-1.200z"),
"🕋":P("M4 7l8-3 8 3v13H4zM4 11h16M9.500 11v3.500")+P("M12 7v0"),
"🛡":P("M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6zM9 12l2 2 4-4"),
"🤲":P("M3 9c0 6 4 10 9 11 5-1 9-5 9-11l-4 2-5-5-5 5z"),
"✨":P("M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8z"),
"🌍":'<circle cx="12" cy="12" r="9"/>'+P("M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"),
"🎲":'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
"📅":'<rect x="3.500" y="5" width="17" height="15" rx="2.500"/>'+P("M3.500 10h17M8 3v4M16 3v4"),
"✅":'<circle cx="12" cy="12" r="9" style="stroke:'+GR+'"/>'+P("M8 12.500l2.800 2.800L16 9.500",' style="stroke:'+GR+'"'),
"❌":'<circle cx="12" cy="12" r="9" style="stroke:'+RD+'"/>'+P("M9 9l6 6M15 9l-6 6",' style="stroke:'+RD+'"'),
"➜":P("M5 12h14M13 6l6 6-6 6"),"⬅":P("M19 12H5M11 6l-6 6 6 6"),"▶":P("M7 4.500v15l12-7.500z",' style="fill:currentColor"'),
"📊":P("M5 20V11M12 20V4M19 20v-6M3 20h18"),
"📲":P("M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"),
"🔥":P("M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z",' style="fill:'+R+';stroke:'+R+'"'),
"🪙":'<circle cx="12" cy="12" r="9" style="fill:'+G+';stroke:#b8901a"/><circle cx="12" cy="12" r="5.500" style="stroke:#b8901a"/>',
"⭐":P("M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z",' style="fill:'+G+';stroke:#b8901a"'),
"🌟":P("M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z",' style="fill:'+G+';stroke:#b8901a"'),
"🏆":P("M8 4h8v5a4 4 0 0 1-8 0zM8 6H4c0 3 1 5 4 5M16 6h4c0 3-1 5-4 5M12 13v4M8 21h8M10 17h4",' style="stroke:#b8901a"'),
"🏅":'<circle cx="12" cy="14" r="6" style="stroke:#b8901a"/>'+P("M8.500 3l3.500 6 3.500-6"),
"🌱":P("M12 21v-9M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.500-5 6-5 0 3-2.500 5-6 5z",' style="stroke:'+GR+'"'),
"🌙":P("M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"),
"📚":P("M5 4h4v16H5zM9 6h4v14H9zM14.500 5.500l3.800-1 3.200 14.500-3.800 1z"),
"🔊":P("M4 9v6h4l5 4V5L8 9zM16.500 8.500a5 5 0 0 1 0 7M19 6a8.500 8.500 0 0 1 0 12"),
"🔇":P("M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"),
"☀":'<circle cx="12" cy="12" r="4"/>'+P("M12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M4.900 4.900l1.800 1.800M17.300 17.300l1.800 1.800M4.900 19.100l1.800-1.800M17.300 6.700l1.800-1.800"),
"🌞":'<circle cx="12" cy="12" r="4"/>'+P("M12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M4.900 4.900l1.800 1.800M17.300 17.300l1.800 1.800M4.900 19.100l1.800-1.800M17.300 6.700l1.800-1.800"),
"🌤":'<circle cx="9" cy="9" r="3.500"/>'+P("M9 2.500v1.500M2.500 9H4M4.400 4.400l1 1M7 20h10a4 4 0 0 0 .5-8 5.500 5.500 0 0 0-10.200 1.500A3.300 3.300 0 0 0 7 20z"),
"🌅":P("M3 18h18M7 18a5 5 0 0 1 10 0M12 6v4M5.500 9.500l1.500 1.500M18.500 9.500L17 11"),
"🌇":P("M3 18h18M7 18a5 5 0 0 1 10 0M12 10V6M9.500 8.500L12 11l2.500-2.500M5 21h14"),
"⚙":'<circle cx="12" cy="12" r="3"/>'+P("M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"),
"🔔":P("M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"),
"🔕":P("M6 16V11a6 6 0 0 1 9-5.200M18 11v5l2 2H4M10 21h4M3 3l18 18"),
"🧠":P("M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.500c.7.700 1 1.500 1 2.500h6c0-1 .3-1.800 1-2.500A6 6 0 0 0 12 3z"),
"🏠":P("M3 11l9-8 9 8M5 10v10h14V10M10 20v-5h4v5"),
"📂":P("M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),
"📍":P("M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z")+'<circle cx="12" cy="10" r="2.500"/>',
"❤":P("M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z",' style="fill:'+RD+';stroke:'+RD+'"'),
"🖤":P("M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z",' style="fill:currentColor"'),
"🗑":P("M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"),
"📿":'<circle cx="12" cy="12" r="8" stroke-dasharray="0.1 4.200" style="stroke-width:3.400"/>'+P("M12 20v2")
};
const keys=Object.keys(I).sort((a,b)=>b.length-a.length);
const RX=new RegExp("("+keys.join("|")+")\\ufe0f?","g");
const svg=k=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;
function conv(root){
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    const p=n.parentNode&&n.parentNode.nodeName;
    if(/^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE)$/.test(p))return NodeFilter.FILTER_REJECT;
    RX.lastIndex=0;return RX.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  const list=[];while(w.nextNode())list.push(w.currentNode);
  list.forEach(n=>{
    const sp=document.createElement("span");sp.className="icw";
    sp.innerHTML=n.nodeValue.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(RX,(m,k)=>svg(k));
    n.parentNode.replaceChild(sp,n);
  });
}
let busy=false,sched=false;
const mo=new MutationObserver(()=>{if(busy||sched)return;sched=true;requestAnimationFrame(()=>{sched=false;busy=true;mo.disconnect();try{conv(document.body)}catch(e){}busy=false;mo.observe(document.body,{childList:true,subtree:true,characterData:true})})});

/* ---- Pro CSS ---- */
const css=`
html{-webkit-text-size-adjust:100%}
body{padding-top:env(safe-area-inset-top,0);}
.ic{width:1.2em;height:1.2em;vertical-align:-.22em;display:inline-block;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.icw{display:inline}
header{position:relative;padding:22px 16px 20px;background:radial-gradient(circle at 15% 0,rgba(232,185,49,.25),transparent 45%),radial-gradient(circle at 90% 100%,rgba(255,255,255,.12),transparent 40%),linear-gradient(135deg,var(--g),var(--g2));border-radius:0 0 28px 28px;box-shadow:0 6px 20px rgba(8,82,59,.35)}
header h1{font-size:23px;letter-spacing:.3px}
header h1 .ic{width:1.3em;height:1.3em;color:var(--gold)}
.stats{margin:-14px 14px 0;border-radius:16px;position:relative;box-shadow:0 6px 16px rgba(0,0,0,.18);padding:10px 8px}
.stats .ic{width:1.25em;height:1.25em}
.card{border-radius:22px;box-shadow:0 4px 18px rgba(0,0,0,.08);border:1px solid rgba(128,128,128,.12)}
.btn{border-radius:16px;padding:15px;box-shadow:0 3px 0 rgba(0,0,0,.18);transition:transform .08s,box-shadow .08s}
.btn:active:not(:disabled){transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.18)}
.big{font-size:0}.big .ic{width:92px;height:92px;color:var(--g);stroke-width:1.2;filter:drop-shadow(0 4px 8px rgba(11,110,79,.25))}
body.dark .big .ic{color:var(--gold)}
.badge .ic{width:40px;height:40px;stroke-width:1.5}
.nav{padding-bottom:env(safe-area-inset-bottom,0);box-shadow:0 -4px 16px rgba(0,0,0,.08)}
.nav button{font-size:11px;padding:9px 0 8px;position:relative}
.nav button span{font-size:0}.nav button .ic{width:25px;height:25px}
.nav button.on::before{content:"";position:absolute;top:0;left:30%;right:30%;height:3px;border-radius:0 0 4px 4px;background:var(--gold)}
.opt{border-radius:14px;transition:transform .1s}.opt:active:not(:disabled){transform:scale(.98)}
.tsb{width:230px;height:230px;border-radius:50%;margin:16px auto;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,#17a074,var(--g2));color:#fff;box-shadow:0 10px 0 #053a29,0 18px 30px rgba(0,0,0,.3);user-select:none;-webkit-user-select:none;transition:transform .06s,box-shadow .06s}
.tsb:active{transform:translateY(8px);box-shadow:0 2px 0 #053a29,0 6px 12px rgba(0,0,0,.3)}
.tsb b{font-size:64px;font-variant-numeric:tabular-nums;line-height:1}.tsb small{opacity:.85;font-size:14px;margin-top:6px}
.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.chip{padding:8px 16px;border-radius:20px;background:var(--ghost);color:var(--gtxt);font-size:15px}
.chip.on{background:var(--g);color:#fff}
.dz{font-family:"Noto Naskh Arabic","Amiri","Traditional Arabic",serif;font-size:26px;line-height:2.1;text-align:center;direction:rtl;color:var(--g);margin:4px 0 8px}
body.dark .dz{color:var(--gold)}
.dh{font-weight:bold;margin-bottom:2px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---- Tasbih ---- */
const TS={ur:["سبحان اللہ","الحمد للہ","اللہ اکبر","درود شریف"],en:["SubhanAllah","Alhamdulillah","Allahu Akbar","Durood"]};
let TD={n:0,tot:0,t:33,z:0};
try{TD=Object.assign(TD,JSON.parse(localStorage.getItem("iq_tasbih")||"{}"))}catch(e){}
const tsave=()=>{try{localStorage.setItem("iq_tasbih",JSON.stringify(TD))}catch(e){}};
window.tasbihPage=function(){
  curTab="tasbih";clearInterval(timer);renderNav();
  const L=lang,r=L==="ur"?"rtl":"";
  document.getElementById("main").innerHTML=`<div class="card center ${r}">
   <h3>📿 ${L==="ur"?"تسبیح کاؤنٹر":"Tasbih Counter"}</h3>
   <div class="chips">${TS[L].map((x,i)=>`<button class="chip ${TD.z===i?"on":""}" onclick="tsSet('z',${i})">${x}</button>`).join("")}</div>
   <button class="tsb" id="tsb" onclick="tsTap()"><b id="tsn">${TD.n}</b><small>/ ${TD.t}</small></button>
   <div class="chips">${[33,99,100].map(x=>`<button class="chip ${TD.t===x?"on":""}" onclick="tsSet('t',${x})">${x}</button>`).join("")}</div>
   <div class="exp" id="tst">${L==="ur"?"کل شمار":"Total"}: ${TD.tot}</div>
   <button class="btn ghost" onclick="tsReset()">${L==="ur"?"ری سیٹ":"Reset"}</button></div>`;
};
window.tsSet=(k,v)=>{TD[k]=v;if(k==="t"&&TD.n>=v)TD.n=0;tsave();tasbihPage()};
window.tsReset=()=>{TD.n=0;tsave();tasbihPage()};
window.tsTap=()=>{
  TD.n++;TD.tot++;let done=false;
  if(TD.n>=TD.t){done=true;TD.n=0}
  tsave();
  const a=document.getElementById("tsn"),b=document.getElementById("tst");
  if(a)a.textContent=TD.n;if(b)b.textContent=(lang==="ur"?"کل شمار":"Total")+": "+TD.tot;
  try{navigator.vibrate&&navigator.vibrate(done?[60,40,60]:15)}catch(e){}
  if(done)toast(lang==="ur"?"ماشاءاللہ! ہدف مکمل ✨":"MashaAllah! Target complete ✨");
};

/* ---- Duas ---- */
const DU=[
["کھانے سے پہلے","Before eating","بِسْمِ اللّٰهِ","Bismillah","اللہ کے نام سے","In the name of Allah"],
["کھانے کے بعد","After eating","اَلْحَمْدُ لِلّٰهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ","","تمام تعریف اللہ کے لیے جس نے ہمیں کھلایا، پلایا اور مسلمان بنایا","All praise is for Allah who fed us, gave us drink and made us Muslims"],
["سونے سے پہلے","Before sleeping","اَللّٰهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا","","اے اللہ! تیرے نام سے مرتا اور جیتا ہوں","O Allah, in Your name I die and I live"],
["جاگنے کے بعد","On waking up","اَلْحَمْدُ لِلّٰهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ","","تمام تعریف اللہ کے لیے جس نے مارنے کے بعد زندہ کیا، اور اسی کی طرف لوٹنا ہے","Praise be to Allah who gave us life after death, and to Him is the return"],
["گھر سے نکلتے وقت","Leaving home","بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ","","اللہ کے نام سے، میں نے اللہ پر بھروسا کیا، گناہ سے بچنے اور نیکی کی طاقت اللہ ہی سے ہے","In Allah's name; I trust in Allah; there is no power or might except with Allah"],
["مسجد میں داخل ہوتے وقت","Entering the masjid","اَللّٰهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ","","اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے","O Allah, open for me the doors of Your mercy"],
["مسجد سے نکلتے وقت","Leaving the masjid","اَللّٰهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ","","اے اللہ! میں تجھ سے تیرا فضل مانگتا ہوں","O Allah, I ask You for Your bounty"],
["دنیا و آخرت کی بھلائی","Good of both worlds","رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","","اے ہمارے رب! ہمیں دنیا میں بھلائی دے اور آخرت میں بھی، اور آگ کے عذاب سے بچا","Our Lord, give us good in this world and the next, and protect us from the Fire"]
,
["وضو شروع کرتے وقت","Starting wudu","بِسْمِ اللّٰهِ","","اللہ کے نام سے","In the name of Allah"],
["وضو کے بعد","After wudu","أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ","","میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور محمد ﷺ اس کے بندے اور رسول ہیں","I bear witness that there is no god but Allah alone, and that Muhammad is His servant and Messenger"],
["بیت الخلاء میں داخل ہوتے وقت","Entering the toilet","اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ","","اے اللہ! میں ناپاک جنوں سے تیری پناہ مانگتا ہوں","O Allah, I seek refuge in You from evil male and female jinn"],
["علم میں اضافے کی دعا","For more knowledge","رَبِّ زِدْنِي عِلْمًا","","اے میرے رب! میرے علم میں اضافہ فرما","My Lord, increase me in knowledge (Ta-Ha 114)"],
["والدین کے لیے دعا","For parents","رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا","","اے میرے رب! ان دونوں پر رحم فرما جیسا انہوں نے بچپن میں میری پرورش کی","My Lord, have mercy on them as they raised me when I was small (Al-Isra 24)"],
["استغفار کی دعا","Seeking forgiveness","رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ","","اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اگر تو نے ہمیں نہ بخشا اور رحم نہ کیا تو ہم نقصان اٹھانے والوں میں ہوں گے","Our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us we will be among the losers (Al-A'raf 23)"]
];
window.duaPage=function(){
  curTab="dua";clearInterval(timer);renderNav();
  const u=lang==="ur",r=u?"rtl":"";
  document.getElementById("main").innerHTML=`<h3 class="center">🤲 ${u?"مسنون دعائیں":"Daily Duas"}</h3>`+
   DU.map(d=>`<div class="card ${r}"><div class="dh">${u?d[0]:d[1]}</div><div class="dz">${d[2]}</div><div class="exp">${u?d[4]:d[5]}</div></div>`).join("");
};

/* ---- Navigation with 6 tabs ---- */
const LBL={ur:{tasbih:"تسبیح",dua:"دعائیں"},en:{tasbih:"Tasbih",dua:"Duas"}};
window.renderNav=function(){
  const e=document.getElementById("nav");if(!e)return;
  const it=[["quiz","🧠",nt("tQuiz")],["prayer","🕌",nt("tPrayer")],["tasbih","📿",LBL[lang].tasbih],["dua","🤲",LBL[lang].dua],["cal","📅",nt("tCal")],["set","⚙️",nt("tSet")]];
  e.innerHTML=it.map(x=>`<button class="${curTab===x[0]?"on":""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`).join("");
};
const oldGo=window.go;
window.go=function(tab){if(tab==="tasbih"){tasbihPage()}else if(tab==="dua"){duaPage()}else oldGo(tab)};
const oldRerender=window.rerender;
window.rerender=function(){if(curTab==="tasbih")tasbihPage();else if(curTab==="dua")duaPage();else oldRerender()};

renderNav();
document.querySelector("header h1").innerHTML="🕌 اسلامی ایپ · Islamic App";
conv(document.body);
mo.observe(document.body,{childList:true,subtree:true,characterData:true});
})();
