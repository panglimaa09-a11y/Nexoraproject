(function(){
  const stage=document.querySelector('.nx3d-stage');
  const device=document.querySelector('[data-nx3d-device]');
  if(!stage||!device)return;
  const reset=()=>device.style.transform='rotateX(10deg) rotateY(-18deg) rotateZ(2deg)';
  stage.addEventListener('pointermove',e=>{
    const r=stage.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    device.style.transform=`rotateX(${10-y*12}deg) rotateY(${-18+x*18}deg) rotateZ(${2+x*3}deg)`;
  },{passive:true});
  stage.addEventListener('pointerleave',reset);
})();
