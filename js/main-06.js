/* NEXORA image fallback: modal always uses the real image from its portfolio card. */
(function(){
  document.addEventListener('click',function(e){
    const btn=e.target.closest('.view');
    if(!btn) return;
    const card=btn.closest('.project');
    const source=card && card.querySelector('.project-shot img');
    const modalImg=document.getElementById('modalImg');
    if(source && modalImg){
      const realSrc=source.currentSrc || source.getAttribute('src');
      if(realSrc) {
        requestAnimationFrame(()=>{
          modalImg.removeAttribute('src');
          modalImg.src=realSrc;
          modalImg.onerror=function(){
            this.style.display='none';
          };
          modalImg.onload=function(){this.style.display='block'};
        });
      }
    }
  },true);
})();
