/* Animated Kazakhstan map: real outline from the app, 35 cities, neon wave. */
(function(){
  var root=document.getElementById('kzm');if(!root)return;
  var XY={"astana": [478.4, 161.8], "almaty": [598.4, 367.2], "shymkent": [454.8, 403.9], "aktobe": [232.2, 177.3], "karaganda": [509.4, 197], "kostanay": [347.3, 107.4], "atyrau": [124.7, 247.2], "uralsk": [138, 135.5], "aktau": [92.7, 336.8], "kyzylorda": [373.8, 335.8], "pavlodar": [568.2, 122.8], "semey": [631, 165], "petropavl": [436.4, 63.1], "oskemen": [673.9, 169.6], "taraz": [489.8, 386.6], "kokshetau": [441.5, 106.1], "rudny": [338.8, 113.5], "turkestan": [427.3, 378], "taldykorgan": [620.4, 315.4], "temirtau": [506.4, 190.2], "zhezkazgan": [415.5, 255.7], "satpayev": [412.2, 253], "balkhash": [550.6, 273.9], "ekibastuz": [542.6, 141.5], "konaev": [599.7, 349.8], "kentau": [432.4, 371.9], "zhanaozen": [123.8, 351.5], "kulsary": [162.9, 258.7], "aksay": [164.8, 142.3], "lisakovsk": [327.8, 124.6], "arkalyk": [401, 189], "shchuchinsk": [454.9, 114.8], "ridder": [686.8, 156], "altay": [703.4, 169.4], "ayagoz": [645.6, 230.2]};
  var N={ /* id: [ru, kz, en] */
    astana:['Астана','Астана','Astana'],almaty:['Алматы','Алматы','Almaty'],shymkent:['Шымкент','Шымкент','Shymkent'],
    aktobe:['Актобе','Ақтөбе','Aktobe'],karaganda:['Караганда','Қарағанды','Karaganda'],kostanay:['Костанай','Қостанай','Kostanay'],
    atyrau:['Атырау','Атырау','Atyrau'],uralsk:['Уральск','Орал','Oral'],aktau:['Актау','Ақтау','Aktau'],
    kyzylorda:['Кызылорда','Қызылорда','Kyzylorda'],pavlodar:['Павлодар','Павлодар','Pavlodar'],semey:['Семей','Семей','Semey'],
    petropavl:['Петропавловск','Петропавл','Petropavl'],oskemen:['Усть-Каменогорск','Өскемен','Oskemen'],taraz:['Тараз','Тараз','Taraz'],
    kokshetau:['Кокшетау','Көкшетау','Kokshetau'],rudny:['Рудный','Рудный','Rudny'],turkestan:['Туркестан','Түркістан','Turkistan'],
    taldykorgan:['Талдыкорган','Талдықорған','Taldykorgan'],temirtau:['Темиртау','Теміртау','Temirtau'],
    zhezkazgan:['Жезказган','Жезқазған','Zhezkazgan'],satpayev:['Сатпаев','Сәтбаев','Satbayev'],balkhash:['Балхаш','Балқаш','Balkhash'],
    ekibastuz:['Экибастуз','Екібастұз','Ekibastuz'],konaev:['Конаев','Қонаев','Konaev'],kentau:['Кентау','Кентау','Kentau'],
    zhanaozen:['Жанаозен','Жаңаөзен','Zhanaozen'],kulsary:['Кульсары','Құлсары','Kulsary'],aksay:['Аксай','Ақсай','Aksay'],
    lisakovsk:['Лисаковск','Лисаков','Lisakovsk'],arkalyk:['Аркалык','Арқалық','Arkalyk'],shchuchinsk:['Щучинск','Щучье','Shchuchinsk'],
    ridder:['Риддер','Риддер','Ridder'],altay:['Алтай','Алтай','Altay'],ayagoz:['Аягоз','Аягөз','Ayagoz']};
  var LABEL={astana:[8,-6],almaty:[8,12],shymkent:[-8,14,1],aktobe:[8,4],karaganda:[8,10],kostanay:[-8,-6,1],atyrau:[8,4],uralsk:[8,-4],
    aktau:[8,4],kyzylorda:[8,4],pavlodar:[8,4],semey:[8,10],petropavl:[8,-2],oskemen:[8,-8],taraz:[8,10],zhezkazgan:[-8,12,1],
    balkhash:[8,4],taldykorgan:[8,4],kokshetau:[-8,2,1],turkestan:[-8,-2,1],ekibastuz:[8,-6],arkalyk:[8,4],ayagoz:[8,4],zhanaozen:[8,12]};
  var NS='http://www.w3.org/2000/svg',svg=root.querySelector('svg'),g=svg.querySelector('.kzm-cities'),tip=root.querySelector('.kzm-tip');
  var ids=Object.keys(XY),dots={},labels={},rings={};
  function li(){var l=(document.documentElement.lang||'ru').slice(0,2);return l==='kk'?1:(l==='en'?2:0)}
  ids.forEach(function(id){
    var p=XY[id],big=(id==='astana'||id==='almaty'||id==='shymkent');
    var ring=document.createElementNS(NS,'circle');ring.setAttribute('cx',p[0]);ring.setAttribute('cy',p[1]);ring.setAttribute('r',3);ring.setAttribute('class','kzm-ring');
    var dot=document.createElementNS(NS,'circle');dot.setAttribute('cx',p[0]);dot.setAttribute('cy',p[1]);dot.setAttribute('r',big?4.2:2.8);
    dot.setAttribute('class','kzm-dot'+(big?' big':''));dot.dataset.id=id;
    var hit=document.createElementNS(NS,'circle');hit.setAttribute('cx',p[0]);hit.setAttribute('cy',p[1]);hit.setAttribute('r',11);hit.setAttribute('class','kzm-hit');hit.dataset.id=id;
    g.appendChild(ring);g.appendChild(dot);
    if(LABEL[id]){var t=document.createElementNS(NS,'text'),o=LABEL[id];t.setAttribute('x',p[0]+o[0]);t.setAttribute('y',p[1]+o[1]);
      t.setAttribute('class','kzm-label'+(big?' big':''));if(o[2])t.setAttribute('text-anchor','end');g.appendChild(t);labels[id]=t}
    g.appendChild(hit);dots[id]=dot;rings[id]=ring;
  });
  function names(){var k=li();ids.forEach(function(id){if(labels[id])labels[id].textContent=N[id][k]});renderChips();
    document.querySelectorAll('.cc-tile').forEach(function(t){var n=N[t.dataset.id];if(n)t.querySelector('figcaption').textContent=n[k]})}
  /* hover / tap */
  function show(id,on){var d=dots[id];if(!d)return;d.classList.toggle('on',on);
    if(on&&tip){var p=XY[id],b=svg.getBoundingClientRect(),vb=svg.viewBox.baseVal,s=Math.min(b.width/vb.width,b.height/vb.height),
      ox=(b.width-vb.width*s)/2,oy=(b.height-vb.height*s)/2;tip.textContent=N[id][li()];
      tip.style.left=(ox+(p[0]-vb.x)*s)+'px';tip.style.top=(oy+(p[1]-vb.y)*s)+'px';tip.classList.add('on')}
    else if(tip)tip.classList.remove('on');
    var c=document.querySelector('.kzm-chip[data-id="'+id+'"]');if(c)c.classList.toggle('on',on)}
  g.addEventListener('pointerover',function(e){var id=e.target.dataset&&e.target.dataset.id;if(id)show(id,true)});
  g.addEventListener('pointerout',function(e){var id=e.target.dataset&&e.target.dataset.id;if(id)show(id,false)});
  /* chips */
  var cloud=document.querySelector('.cities-tags-cloud');
  function renderChips(){if(!cloud)return;var k=li();cloud.innerHTML='';
    ids.slice().sort(function(a,b){return N[a][k].localeCompare(N[b][k])}).forEach(function(id){
      var s=document.createElement('button');s.type='button';s.className='city-tag kzm-chip';s.dataset.id=id;s.textContent=N[id][k];
      s.addEventListener('mouseenter',function(){show(id,true)});s.addEventListener('mouseleave',function(){show(id,false)});
      s.addEventListener('click',function(){show(id,true);clearTimeout(s._t);s._t=setTimeout(function(){show(id,false)},1600)});
      cloud.appendChild(s)})}
  names();
  new MutationObserver(names).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  /* neon wave on canvas, in map coordinates */
  var c=root.querySelector('canvas'),x=c.getContext('2d'),W=0,H=0,s=1,ox=0,oy=0,vb=svg.viewBox.baseVal,
      reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,visible=false,t0=performance.now(),last={};
  function size(){var b=root.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);W=b.width;H=b.height;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    s=Math.min(W/vb.width,H/vb.height);ox=(W-vb.width*s)/2-vb.x*s;oy=(H-vb.height*s)/2-vb.y*s}
  function wy(mx,ph){return 255+Math.sin(mx/760*Math.PI*2.6+ph)*62*(.55+.45*Math.sin(mx/800*Math.PI))+Math.sin(mx/90+ph*1.7)*8}
  function stroke(col,w,blur,ph,dy,a){x.save();x.globalAlpha=a;x.strokeStyle=col;x.lineWidth=w;x.shadowColor=col;x.shadowBlur=blur;x.beginPath();
    for(var mx=vb.x;mx<=vb.x+vb.width;mx+=4){var px=ox+mx*s,py=oy+(wy(mx,ph)+dy)*s;mx===vb.x?x.moveTo(px,py):x.lineTo(px,py)}x.stroke();x.restore()}
  function frame(now){
    if(visible){var t=(now-t0)/1000,ph=t*.6;x.clearRect(0,0,W,H);
      stroke('#8b5cf6',1.2,10,ph*.7+2,14,.45);
      stroke('#2DD4BF',1.4,12,ph*.85+1,6,.6);
      stroke('#E5322D',4,26,ph,0,.75);stroke('#E5322D',2.2,8,ph,0,1);stroke('#fff',1,0,ph,0,.65);
      /* a scanning glow travels west → east; cities light up when it passes */
      var cyc=(t%7)/7,mx=vb.x+cyc*vb.width,my=wy(mx,ph),px=ox+mx*s,py=oy+my*s;
      var gr=x.createRadialGradient(px,py,0,px,py,40*s);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.15,'rgba(229,50,45,.6)');gr.addColorStop(1,'rgba(229,50,45,0)');
      x.fillStyle=gr;x.beginPath();x.arc(px,py,40*s,0,6.283);x.fill();
      ids.forEach(function(id){var dx=Math.abs(XY[id][0]-mx);if(dx<6&&(!last[id]||now-last[id]>3000)){last[id]=now;var r=rings[id];
        r.classList.remove('ping');void r.getBoundingClientRect();r.classList.add('ping')}});
    }
    if(!reduce)requestAnimationFrame(frame)}
  size();addEventListener('resize',size);
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)size()}).observe(root);else visible=true;
  requestAnimationFrame(frame);
  if(reduce){visible=true;frame(performance.now())}
})();
