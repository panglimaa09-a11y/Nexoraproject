/* Portfolio polish: add subtle metadata to existing project cards without changing their links. */
(function(){
  const cards=document.querySelectorAll('.project');
  cards.forEach((card,i)=>{
    if(card.dataset.nxPolished) return;
    card.dataset.nxPolished='1';
    const shot=card.querySelector('.project-shot');
    if(shot){
      const badge=document.createElement('span');
      badge.className='nx-project-badge';
      badge.textContent='Concept Showcase';
      shot.appendChild(badge);
      const glow=document.createElement('span');
      glow.className='nx-project-glow';
      shot.appendChild(glow);
    }
    const body=card.querySelector('.project-body')||card;
    if(!body.querySelector('.nx-project-footer')){
      const footer=document.createElement('div');
      footer.className='nx-project-footer';
      footer.innerHTML='<div class="nx-project-meta"><span>UI/UX</span><span>Responsive</span><span>Conversion</span></div><div class="nx-project-cta">View case study</div>';
      body.appendChild(footer);
    }
  });
})();
