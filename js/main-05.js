/* NEXORA section reveal + gentle 3D card response */
(function(){
  const targets=document.querySelectorAll('.project,.card,.package-card,.step,.faq,.estimate,.form');
  targets.forEach((el,i)=>{el.classList.add('reveal3d');el.style.transitionDelay=(Math.min(i%6,5)*45)+'ms';});
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target);}});
    },{threshold:.12,rootMargin:'0px 0px -35px'});
    targets.forEach(el=>io.observe(el));
  }else targets.forEach(el=>el.classList.add('in-view'));

  document.querySelectorAll('.project').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(window.matchMedia('(max-width:700px)').matches)return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translateY(-5px) rotateX(${-y*4}deg) rotateY(${x*5}deg)`;
    },{passive:true});
    card.addEventListener('pointerleave',()=>{card.style.transform=''});
  });
})();
