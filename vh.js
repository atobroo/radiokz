(function(){
  var menu=document.getElementById('vhMenu'),burger=document.getElementById('vhBurger'),open=false;
  if(menu&&burger){
    function setMenu(n){open=n;menu.classList.toggle('is-open',n);burger.classList.toggle('is-active',n);
      document.body.classList.toggle('vh-menu-open',n);burger.setAttribute('aria-expanded',n?'true':'false');}
    burger.addEventListener('click',function(){setMenu(!open)});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)setMenu(false)});
    addEventListener('resize',function(){if(open&&innerWidth>980)setMenu(false)});
  }
  /* old sticky header appears only after the hero */
  var hero=document.getElementById('hero'),head=document.querySelector('.header-nav');
  /* curtain: as the site slides up, the hero sinks back and dims; the old header appears after it */
  var shade=document.querySelector('.vh-shade'),inner=document.querySelector('.vh-inner'),media=document.querySelector('.vh-media'),
      still=matchMedia('(prefers-reduced-motion:reduce)').matches,ticking=false;
  function onScroll(){ticking=false;var h=innerHeight,y=scrollY,k=Math.min(1,Math.max(0,y/h));
    if(head)head.classList.toggle('vh-show',y>h*.92);
    if(shade)shade.style.opacity=(k*.75).toFixed(3);
    if(!still){if(inner)inner.style.transform='translateY('+(-k*60).toFixed(1)+'px) scale('+(1-k*.06).toFixed(4)+')';
      }
    if(inner)inner.style.opacity=(1-k*1.2).toFixed(3);}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
  addEventListener('resize',onScroll);onScroll();
  /* dust in the sunlight */
  var c=document.getElementById('vhDust');if(!c)return;
  var x=c.getContext('2d'),P=[],W=0,H=0,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,visible=true;
  function size(){var r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0)}
  function seed(){P=[];var n=Math.round(Math.min(90,W/18));for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:H*(.25+Math.random()*.6),r:.6+Math.random()*1.8,
    vx:.06+Math.random()*.22,vy:-.03-Math.random()*.08,a:.15+Math.random()*.5,p:Math.random()*6.28})}
  function frame(t){
    if(visible){x.clearRect(0,0,W,H);
      for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy+Math.sin(t/1700+p.p)*.05;
        if(p.x>W+5||p.y<H*.15){p.x=-5;p.y=H*(.3+Math.random()*.6)}
        x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fillStyle='rgba(255,226,170,'+(p.a*(.55+.45*Math.sin(t/900+p.p)))+')';x.fill()}}
    if(!reduce)requestAnimationFrame(frame)}
  size();seed();requestAnimationFrame(frame);
  addEventListener('resize',function(){size();seed()});
  if(hero&&'IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting},{}).observe(hero);
})();
/* neon wave (like the City skin), slow and translucent, behind the headline */
(function(){
  var c=document.getElementById('vhWave'),hero=document.getElementById('hero'),h1=document.querySelector('.vh-headline');
  if(!c||!hero)return;
  var x=c.getContext('2d'),W=0,H=0,Y=0,A=0,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,visible=true,t0=performance.now();
  function size(){var d=Math.min(devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
    var pl=document.querySelector('.vh-plate'),cr=hero.getBoundingClientRect();if(pl){var pr=pl.getBoundingClientRect();Y=pr.top-cr.top+pr.height*.37}else Y=H*.4;
    A=Math.max(14,Math.min(34,H*.035))}
  function yAt(px,ph,amp,k){return Y+Math.sin(px/W*Math.PI*k+ph)*amp*(.55+.45*Math.sin(px/W*Math.PI))}
  function line(col,w,blur,amp,ph,k,alpha){x.save();x.globalAlpha=alpha;x.strokeStyle=col;x.lineWidth=w;x.shadowColor=col;x.shadowBlur=blur;x.beginPath();
    for(var i=0;i<=W;i+=4){var y=yAt(i,ph,amp,k);i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke();x.restore()}
  function frame(now){
    if(visible){var t=(now-t0)/1000,ph=t*.35;x.clearRect(0,0,W,H);
      line('#2DD4BF',1.5,14,A*1.15,ph*.8+1.3,3,.5);
      line('#E5322D',4,30,A,ph,3.4,.9);
      line('#E5322D',2.5,10,A,ph,3.4,1);
      line('#ffffff',1,0,A,ph,3.4,.6);
      /* station dots + one travelling glow */
      for(var k=1;k<8;k++){var px=W*k/8,py=yAt(px,ph,A,3.4);x.beginPath();x.arc(px,py,2.6,0,6.283);x.fillStyle='rgba(255,255,255,.85)';x.fill()}
      var tx=((t*.06)%1)*W,ty=yAt(tx,ph,A,3.4),pulse=(t%2)/2;
      x.beginPath();x.arc(tx,ty,5,0,6.283);x.fillStyle='#fff';x.shadowColor='#E5322D';x.shadowBlur=18;x.fill();x.shadowBlur=0;
      x.beginPath();x.arc(tx,ty,6+pulse*26,0,6.283);x.strokeStyle='rgba(229,50,45,'+(.6*(1-pulse))+')';x.lineWidth=1.5;x.stroke();}
    if(!reduce)requestAnimationFrame(frame)}
  size();requestAnimationFrame(frame);
  addEventListener('resize',size);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(size);setTimeout(size,2200);
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting}).observe(hero);
})();
