/* ===== Pro 2: Quran reader, Qibla compass, Hadith, More hub ===== */
(function(){
const BS="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
/* Quran text (Hafs). n = mushaf surah number. Only surahs verified by hand. */
const SU=[
{n:1,ur:"الفاتحہ",en:"Al-Fatiha",a:[BS,"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","الرَّحْمَٰنِ الرَّحِيمِ","مَالِكِ يَوْمِ الدِّينِ","إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"],nb:1},
{n:97,ur:"القدر",en:"Al-Qadr",a:["إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ","وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ","لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ","تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ","سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ"]},
{n:103,ur:"العصر",en:"Al-Asr",a:["وَالْعَصْرِ","إِنَّ الْإِنسَانَ لَفِي خُسْرٍ","إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ"]},
{n:105,ur:"الفیل",en:"Al-Fil",a:["أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ","أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ","وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ","تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ","فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ"]},
{n:106,ur:"قریش",en:"Quraysh",a:["لِإِيلَافِ قُرَيْشٍ","إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ","فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ","الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ"]},
{n:107,ur:"الماعون",en:"Al-Ma'un",a:["أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ","فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ","وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ","فَوَيْلٌ لِّلْمُصَلِّينَ","الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ","الَّذِينَ هُمْ يُرَاءُونَ","وَيَمْنَعُونَ الْمَاعُونَ"]},
{n:108,ur:"الکوثر",en:"Al-Kawthar",a:["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ","فَصَلِّ لِرَبِّكَ وَانْحَرْ","إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"]},
{n:109,ur:"الکافرون",en:"Al-Kafirun",a:["قُلْ يَا أَيُّهَا الْكَافِرُونَ","لَا أَعْبُدُ مَا تَعْبُدُونَ","وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ","وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","لَكُمْ دِينُكُمْ وَلِيَ دِينِ"]},
{n:110,ur:"النصر",en:"An-Nasr",a:["إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ","وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا","فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا"]},
{n:111,ur:"المسد",en:"Al-Masad",a:["تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ","مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ","سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ","وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ","فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ"]},
{n:112,ur:"الاخلاص",en:"Al-Ikhlas",a:["قُلْ هُوَ اللَّهُ أَحَدٌ","اللَّهُ الصَّمَدُ","لَمْ يَلِدْ وَلَمْ يُولَدْ","وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"]},
{n:113,ur:"الفلق",en:"Al-Falaq",a:["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","مِن شَرِّ مَا خَلَقَ","وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ","وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ","وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"]},
{n:114,ur:"الناس",en:"An-Nas",a:["قُلْ أَعُوذُ بِرَبِّ النَّاسِ","مَلِكِ النَّاسِ","إِلَٰهِ النَّاسِ","مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ","الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ","مِنَ الْجِنَّةِ وَالنَّاسِ"]},
{n:0,ur:"آیت الکرسی (البقرہ 255)",en:"Ayat al-Kursi (Al-Baqarah 255)",nb:1,a:["اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"]}
];
let fs=+(localStorage.getItem("iq_fs")||32);
const u=()=>lang==="ur",rt=()=>u()?"rtl":"",M=id=>document.getElementById("main");
const num=n=>String(n).replace(/\d/g,d=>"٠١٢٣٤٥٦٧٨٩"[d]);
const mark=n=>`<span class="am">${num(n)}</span>`;
const sv=p=>`<svg class="ic" viewBox="0 0 24 24">${p}</svg>`;
const css=`.dz.q{font-size:var(--fs,32px);line-height:2.4;text-align:justify;text-align-last:center}.am{display:inline-flex;align-items:center;justify-content:center;width:1.5em;height:1.5em;margin:0 .25em;border:1.5px solid var(--gold);border-radius:50%;font-size:.5em;font-family:system-ui;color:var(--tx);vertical-align:middle}
.srow2{display:flex;align-items:center;gap:12px;width:100%;padding:13px;margin:7px 0;border-radius:14px;background:var(--opt);color:var(--tx);font-size:17px}.srow2 i{font-style:normal;min-width:34px;height:34px;border-radius:10px;background:var(--g);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px}.srow2 em{font-style:normal;margin-inline-start:auto;font-size:12px;color:var(--mut)}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px}.tile{padding:22px 8px;border-radius:20px;background:var(--card);color:var(--tx);font-size:16px;box-shadow:0 4px 14px rgba(0,0,0,.09);border:1px solid rgba(128,128,128,.12)}.tile .ic{display:block;margin:0 auto 8px;width:38px;height:38px;color:var(--g)}body.dark .tile .ic{color:var(--gold)}
.cmp{width:min(80vw,300px);margin:10px auto;display:block}.hd{border-inline-start:4px solid var(--gold);padding-inline-start:12px;line-height:1.9}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

window.quranPage=function(){
  curTab="quran";detach();renderNav();
  M().innerHTML=`<div class="card ${rt()}"><h3 class="center">📖 ${u()?"قرآن پاک":"Holy Quran"}</h3>`+
  SU.map((s,i)=>`<button class="srow2" onclick="surahOpen(${i})"><i>${s.n||"٢:٢٥٥"}</i><span>${s[lang]}</span><em>${s.a.length-(s.nb&&s.n===1?0:0)} ${u()?"آیات":"ayat"}</em></button>`).join("")+
  `<div class="note">${u()?"نوٹ: یہاں ابھی چنیدہ سورتیں شامل ہیں جو احتیاط سے لکھی گئی ہیں۔ اطمینان کے لیے اپنے مصحف سے ایک بار ملا لیں۔":"Note: a selection of surahs, written with care. Please verify against your printed mushaf."}</div></div>`;
};
window.surahOpen=function(i){
  const s=SU[i];curTab="quran";
  const body=s.a.map((t,k)=>(s.n===1&&k===0)||(s.n===0)?t+(s.n===1?mark(1):""):t+mark(k+(s.n===1?1:1))).join(" ");
  const head=(s.nb||s.n===0)?"":`<div class="dz" style="font-size:28px">${BS}</div>`;
  M().innerHTML=`<div class="card ${rt()}"><div class="top"><button class="chip" onclick="quranPage()">${u()?"⬅ واپس":"⬅ Back"}</button>
   <div class="stp"><button onclick="fsz(-3,${i})">A−</button><button onclick="fsz(3,${i})">A+</button></div></div>
   <h3 class="center">${s[lang]}</h3>${head}<div class="dz q" style="--fs:${fs}px">${body}</div></div>`;
  try{localStorage.setItem("iq_lastq",i)}catch(e){}
};
window.fsz=(d,i)=>{fs=Math.max(22,Math.min(52,fs+d));try{localStorage.setItem("iq_fs",fs)}catch(e){}surahOpen(i)};

/* ---- Qibla compass ---- */
let hh=null,heading=null;
function detach(){if(hh){window.removeEventListener("deviceorientationabsolute",hh,true);window.removeEventListener("deviceorientation",hh,true);hh=null}}
window.qiblaPage=function(){
  curTab="qibla";detach();renderNav();
  const l=getLoc(),q=qiblaInfo(l),name=l[lang]||"";
  M().innerHTML=`<div class="card center ${rt()}"><h3>🕋 ${u()?"قبلہ رخ":"Qibla Direction"}</h3>
  <div class="exp">${name}</div>
  <svg class="cmp" viewBox="-110 -110 220 220" id="cmp"><g id="dial"><circle r="100" fill="none" stroke="var(--g)" stroke-width="3"/><circle r="88" fill="none" stroke="var(--ghost)" stroke-width="10"/>
   <text y="-70" text-anchor="middle" fill="var(--bad)" font-size="18" font-weight="bold">N</text><text y="82" text-anchor="middle" fill="var(--mut)" font-size="14">S</text><text x="76" y="5" text-anchor="middle" fill="var(--mut)" font-size="14">E</text><text x="-76" y="5" text-anchor="middle" fill="var(--mut)" font-size="14">W</text>
   <g transform="rotate(${q.b})"><path d="M0,-84 L11,-50 L0,-58 L-11,-50Z" fill="var(--gold)" stroke="#b8901a" stroke-width="1.5"/><rect x="-9" y="-48" width="18" height="18" rx="2" fill="#111" stroke="var(--gold)" stroke-width="2"/></g></g>
   <path d="M0,-100 L7,-90 L-7,-90Z" fill="var(--g)"/><circle r="4" fill="var(--g)"/></svg>
  <div class="ncd" style="font-size:30px">${q.b.toFixed(1)}° ${q.dir}</div>
  <div class="exp" id="qst">${u()?"کعبہ تک فاصلہ":"Distance to Kaaba"}: ${Math.round(q.km).toLocaleString()} km</div>
  <div class="note">${u()?"فون کو سیدھا رکھیں۔ جب سنہری تیر اوپر والے سبز نشان کے سامنے آ جائے تو وہی قبلہ ہے۔ دھاتی چیزوں یا مقناطیس سے دور رکھیں۔ اگر کمپاس نہ چلے تو اوپر والا زاویہ (شمال سے) استعمال کریں۔":"Hold the phone flat. When the gold arrow lines up with the green mark at the top, that is the Qibla. Keep away from metal or magnets. If the compass does not move, use the bearing above (from North)."}</div></div>`;
  hh=e=>{let h=null;
    if(e.webkitCompassHeading!=null)h=e.webkitCompassHeading;
    else if(e.alpha!=null&&(e.absolute||e.type==="deviceorientationabsolute"))h=(360-e.alpha)%360;
    if(h==null)return;heading=h;const d=document.getElementById("dial");if(d)d.setAttribute("transform","rotate("+(-h)+")")};
  window.addEventListener("deviceorientationabsolute",hh,true);window.addEventListener("deviceorientation",hh,true);
};

/* ---- Hadith (meanings, with sources) ---- */
const HD=[
["اعمال کا دارومدار نیتوں پر ہے۔","Actions are judged by intentions.","صحیح بخاری 1 / Sahih al-Bukhari 1"],
["تم میں بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔","The best of you are those who learn the Quran and teach it.","صحیح بخاری 5027 / Sahih al-Bukhari 5027"],
["تم میں سے کوئی مومن نہیں ہو سکتا جب تک اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔","None of you truly believes until he loves for his brother what he loves for himself.","صحیح بخاری 13، صحیح مسلم 45 / Bukhari 13, Muslim 45"],
["جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے۔","Whoever believes in Allah and the Last Day, let him speak good or remain silent.","صحیح بخاری 6018، صحیح مسلم 47 / Bukhari 6018, Muslim 47"],
["پاکیزگی نصف ایمان ہے۔","Cleanliness is half of faith.","صحیح مسلم 223 / Sahih Muslim 223"],
["دین خیر خواہی کا نام ہے۔","The religion is sincere advice (naseehah).","صحیح مسلم 55 / Sahih Muslim 55"],
["اپنے بھائی کے سامنے مسکرانا صدقہ ہے۔","Smiling in the face of your brother is charity.","جامع ترمذی 1956 / Jami at-Tirmidhi 1956"],
["آسانی کرو، سختی نہ کرو۔","Make things easy and do not make them difficult.","صحیح بخاری 69 / Sahih al-Bukhari 69"]
];
window.hadithPage=function(){
  curTab="hadith";detach();renderNav();
  M().innerHTML=`<h3 class="center">📚 ${u()?"احادیثِ مبارکہ":"Hadith"}</h3>`+HD.map(h=>`<div class="card ${rt()}"><div class="hd">${u()?h[0]:h[1]}</div><div class="exp">${h[2]}</div></div>`).join("")+`<div class="note center">${u()?"یہاں احادیث کا مفہوم دیا گیا ہے۔":"Meanings of the hadith are given above."}</div>`;
};

/* ---- More hub + nav ---- */
const IC={
 more:sv('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
 tasbih:'📿',dua:'🤲',hadith:'📚',qibla:'🕋',cal:'📅'};
window.morePage=function(){
  curTab="more";detach();renderNav();
  const t=[["tasbih","📿",u()?"تسبیح":"Tasbih"],["dua","🤲",u()?"دعائیں":"Duas"],["hadith","📚",u()?"احادیث":"Hadith"],["qibla","🕋",u()?"قبلہ رخ":"Qibla"],["cal","📅",u()?"اسلامی کیلنڈر":"Calendar"]];
  M().innerHTML=`<div class="tiles">`+t.map(x=>`<button class="tile" onclick="go('${x[0]}')">${x[1]}<br>${x[2]}</button>`).join("")+`</div>`;
};
const grp={tasbih:"more",dua:"more",hadith:"more",qibla:"more",cal:"more",more:"more"};
window.renderNav=function(){
  const e=document.getElementById("nav");if(!e)return;
  const it=[["quiz","🧠",nt("tQuiz")],["prayer","🕌",nt("tPrayer")],["quran","📖",u()?"قرآن":"Quran"],["more",IC.more,u()?"مزید":"More"],["set","⚙️",nt("tSet")]];
  const cur=grp[curTab]||curTab;
  e.innerHTML=it.map(x=>`<button class="${cur===x[0]?"on":""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`).join("");
};
const g0=window.go;
window.go=function(t){detach();
  if(t==="quran")quranPage();else if(t==="more")morePage();else if(t==="qibla")qiblaPage();else if(t==="hadith")hadithPage();
  else{g0(t);if(t==="cal")curTab="cal"}
};
renderNav();
})();
