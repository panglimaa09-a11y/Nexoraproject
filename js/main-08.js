/* NEXORA pricing/estimator polish — presentation only; existing calculations and controls remain untouched. */
(function(){
  const priceSelectors=[
    '.pricing-card','.package-card','.price-card','.pricing .card',
    '[class*="pricing-card"]','[class*="package-card"]'
  ];
  const seen=new Set();
  priceSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(card=>seen.add(card)));
  [...seen].forEach((card,i)=>{
    card.classList.add('nx-price-card');
    if(i===1 || card.matches('.featured,.popular,.recommended')) card.classList.add('featured');
    if(!card.querySelector('.nx-price-glow')){
      const g=document.createElement('span');g.className='nx-price-glow';card.appendChild(g);
    }
  });

  const est=[...document.querySelectorAll(
    '.estimator,#estimator,.estimate,.estimator-card,[class*="estimator"],[id*="estimator"]'
  )];
  est.forEach(el=>{
    el.classList.add('nx-estimator-shell');
    const head=el.querySelector('h2,h3,.section-title');
    if(head && !el.querySelector('.nx-estimator-kicker')){
      const k=document.createElement('div');
      k.className='nx-estimator-kicker';
      k.textContent='PROJECT ESTIMATOR';
      head.parentNode.insertBefore(k,head);
    }
  });
})();
