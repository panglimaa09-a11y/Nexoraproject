/* Gentle pointer/touch parallax for the 3D showcase */
(function(){
  const visual=document.querySelector('.premium-visual');
  const showcase=document.querySelector('.premium-showcase');
  if(!visual || !showcase) return;
  let raf=0;
  function move(x,y){
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      const r=visual.getBoundingClientRect();
      const px=(x-r.left)/r.width-.5;
      const py=(y-r.top)/r.height-.5;
      const ry=-7 + px*5;
      const rx=5 - py*4;
      showcase.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(1deg)`;
    });
  }
  visual.addEventListener('pointermove',e=>move(e.clientX,e.clientY),{passive:true});
  visual.addEventListener('pointerleave',()=>{showcase.style.transform='rotateX(5deg) rotateY(-7deg) rotateZ(1deg)'});
  let sy=null;
  visual.addEventListener('touchstart',e=>{if(e.touches[0]) sy=e.touches[0].clientY},{passive:true});
  visual.addEventListener('touchmove',e=>{
    if(!e.touches[0]) return;
    const r=visual.getBoundingClientRect();
    const delta=(e.touches[0].clientY-sy)/Math.max(r.height,1);
    showcase.style.transform=`rotateX(${5-delta*8}deg) rotateY(${-7+delta*4}deg) rotateZ(1deg)`;
  },{passive:true});
})();
