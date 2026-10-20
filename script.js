// Graceful fallback for missing images
document.querySelectorAll('.img-wrap img').forEach(img=>{
  const wrap=img.parentElement;
  const mark=()=>{wrap.classList.add('missing');wrap.dataset.label=img.alt||'Photo coming soon';};
  if(img.complete&&img.getAttribute('src')&&img.naturalWidth===0)mark();
  img.addEventListener('error',mark);
});
// Mobile menu
const btn=document.querySelector('.menu-btn'),links=document.querySelector('.links');
btn.addEventListener('click',()=>{const o=links.classList.toggle('open');btn.setAttribute('aria-expanded',o);});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
// Filter
const items=[...document.querySelectorAll('.item')];
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');const f=b.dataset.filter;
  items.forEach(i=>i.classList.toggle('hide',f!=='all'&&i.dataset.cat!==f));
}));
// Lightbox
const lb=document.querySelector('.lightbox'),lbImg=lb.querySelector('img'),lbWrap=lb.querySelector('.img-wrap'),lbCap=lb.querySelector('figcaption');
let idx=0;const visible=()=>items.filter(i=>!i.classList.contains('hide'));
function show(i){const v=visible();idx=(i+v.length)%v.length;const it=v[idx],src=it.querySelector('img');
  lbWrap.classList.remove('missing');lbImg.src=src.src;lbImg.alt=src.alt;lbCap.textContent=it.querySelector('figcaption').textContent;
  if(it.querySelector('.img-wrap').classList.contains('missing')){lbWrap.classList.add('missing');lbWrap.dataset.label=src.alt;}
  lb.hidden=false;document.body.style.overflow='hidden';}
function close(){lb.hidden=true;document.body.style.overflow='';}
items.forEach(it=>it.addEventListener('click',()=>show(visible().indexOf(it))));
lb.querySelector('.lb-close').onclick=close;
lb.querySelector('.lb-prev').onclick=e=>{e.stopPropagation();show(idx-1)};
lb.querySelector('.lb-next').onclick=e=>{e.stopPropagation();show(idx+1)};
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1);});
document.getElementById('year').textContent=new Date().getFullYear();
// Category labels on captions
const catNames={en:{netela:'Netela',gabi:'Gabi & Shawls',home:'Home',collection:'Collection'},
 am:{netela:'ነጠላ',gabi:'ጋቢ እና ሻርፕ',home:'ብርድ ልብስ',collection:'ስብስብ'}};
// Gentle fade-in on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Language toggle (EN / አማ)
const AM={
 name:'አለምነሽ አባተ ዘመናዊ ሽመና',navGallery:'ሥራዎች',navWeaver:'ሸማኔዋ',navContact:'ያግኙን',
 heroEyebrow:'በኢትዮጵያ በእጅ የተሸመነ',tagline:'የባህል ክሮች — ነጠላ፣ ጋቢ እና ጥበብ በእጅ የተሸመኑ፣ ረድፍ በረድፍ።',btn:'ስብስቡን ይመልከቱ',
 galEyebrow:'በእጅ የተሸመኑ ሥራዎች',galTitle:'ስብስባችን',galLead:'እያንዳንዱ ሥራ በባህላዊ የሽመና መሣሪያ ይሸመናል። በትልቁ ለማየት ማንኛውንም ምስል ይጫኑ።',
 fAll:'ሁሉም',fNetela:'ነጠላ እና ጥበብ',fGabi:'ጋቢ እና ሻርፕ',fHome:'ብርድ ልብስ እና የቤት',fCollection:'ስብስብ',
 c1:'ሙሉው ስብስብ',c2:'አረንጓዴና ወርቃማ ጥበብ ያለው ነጠላ',c3:'የአፈር ቀለም ቁልል',c4:'ባለ ብዙ ቀለም ሻርፖች',c5:'ቀይ ባለ አልማዝ ጥበብ',c6:'ባለ ጥለት ብርድ ልብሶች',
 c7:'አረንጓዴ ባለ አልማዝ ጥበብ',c8:'ፈዛዛ ቀለም ሻርፖች',c9:'ጥቁር ባለ ቀስት ጥበብ',c10:'ክሬም ጋቢ',c11:'ቀይ ጥበብና የብር ክር',c12:'ባለ ቀስት ጥበብ',c13:'በመሸጫ ቦታዋ',
 aboutEyebrow:'ከሽመናው ጀርባ ያሉ እጆች',aboutTitle:'ስለ ሸማኔዋ',
 about1:'ዓለምነሽ የባህል ጥበብ ፍቅሯን ወደ ስኬታማና ዘመናዊ የፋሽን ቢዝነስ የቀየረች ንቁ ስራ ፈጣሪ ናት። ቀኗን የምታሳልፈው አዳዲስ ቀለማትን በማስተባበር፣ አሪፍ ዲዛይኖችን በመሞከር እና ጥንታዊውን የሽመና ጥበብ ለዘመኑ ትውልድ ቄንጠኛ በማድረግ ነው።',
 about2:'ለእሷ ሽመና ስራ ብቻ ሳይሆን የዕለት ተዕለት ደስታ፣ ማንነት እና ራስን በልዩ ሁኔታ መግለጫ መንገድ ነው።',
 about3:'የልብዎን ሀሳብ የሚያካፍሉበት ልዩ ትዕዛዝ አለዎት? ዓለምነሽን በቀጥታ ያግኟት፤ የህልምዎን ዲዛይን እውን ታደርግልዎታለች!',
 contactEyebrow:'ትዕዛዝ እና ጥያቄዎች',contactTitle:'ይጎብኙን ወይም ያግኙን',contactLead:'ለትዕዛዝ፣ ለልዩ ሥራዎችና ለጥያቄዎች — በፈለጉት መንገድ ያግኙን።',
 phone:'ስልክ',whatsapp:'ዋትስአፕ',location:'አድራሻ',place:'ቧንቧ ውሃ፣ ደሴ',footer:'በደሴ በእጅ የተሸመነ'};
const i18nEls=[...document.querySelectorAll('[data-i18n]')];
i18nEls.forEach(el=>el.dataset.en=el.innerHTML);
const langBtn=document.querySelector('.lang-btn');
function setLang(l){
  document.documentElement.lang=l==='am'?'am':'en';
  i18nEls.forEach(el=>{el.innerHTML=l==='am'&&AM[el.dataset.i18n]?AM[el.dataset.i18n]:el.dataset.en;});
  items.forEach(i=>i.querySelector('figcaption').dataset.catLabel=catNames[l][i.dataset.cat]||'');
  langBtn.textContent=l==='am'?'EN':'አማ';
  langBtn.setAttribute('aria-label',l==='am'?'Switch to English':'ወደ አማርኛ ቀይር');
  try{localStorage.setItem('lang',l);}catch(e){}
}
let saved='en';try{saved=localStorage.getItem('lang')||'en';}catch(e){}
setLang(saved);
langBtn.addEventListener('click',()=>setLang(document.documentElement.lang==='am'?'en':'am'));
// Masonry that keeps left-to-right order: each item spans rows by its height
const grid=document.querySelector('.grid');
function layoutMasonry(){
  const gap=window.innerWidth<=860?24:40,row=4;
  items.forEach(i=>{if(i.classList.contains('hide'))return;i.style.gridRowEnd='auto';
    i.style.gridRowEnd='span '+Math.ceil((i.getBoundingClientRect().height+gap)/row);});
}
layoutMasonry();
window.addEventListener('load',layoutMasonry);window.addEventListener('resize',layoutMasonry);
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',layoutMasonry));
langBtn.addEventListener('click',layoutMasonry);
if(document.fonts)document.fonts.ready.then(layoutMasonry);
