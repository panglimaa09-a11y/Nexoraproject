const QUOTATION_TERMS = {
  payment: "DP 30% wajib dibayarkan sebelum pengerjaan dimulai. Sisa pembayaran dibayarkan sesuai kesepakatan quotation.",
  cancellation: "DP yang telah dibayarkan tidak dapat dikembalikan apabila client membatalkan project setelah pembayaran dilakukan.",
  revision: "Jumlah revisi mengikuti paket dan scope yang tercantum pada quotation.",
  validity: "Quotation berlaku selama 7 hari sejak tanggal diterbitkan.",
  estimate: "Estimasi harga dan timeline dapat disesuaikan setelah scope final disepakati."
};


const WA="6282336939662";
const modal=document.getElementById("modal"), toast=document.getElementById("toast");
function showToast(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.nxToast);window.nxToast=setTimeout(()=>toast.classList.remove("show"),2600)}
function scrollContact(){document.getElementById("contact").scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>document.getElementById("leadMessage").focus(),650)}
function typeForProject(cat,title){const t=(title+" "+cat).toLowerCase();if(t.includes("e-commerce")||t.includes("commerce")||t.includes("store")||t.includes("shop"))return"E-Commerce";if(t.includes("dashboard")||t.includes("saas")||t.includes("ai")||t.includes("app")||t.includes("cloud"))return"Custom Web App";if(t.includes("corporate")||t.includes("legal")||t.includes("dental")||t.includes("hotel")||t.includes("real estate")||t.includes("education")||t.includes("travel"))return"Company Website";return"Landing Page"}
function projectPrompt(title,type,desc){return`Saya tertarik membuat website seperti portfolio "${title}" dari NEXORA.\n\nJenis website: ${type}\n\nKonsep: ${desc}\n\nFitur/arah yang saya inginkan:\n- UI/UX modern dan responsive\n- Struktur halaman sesuai kebutuhan bisnis\n- CTA yang jelas\n- Mobile, tablet dan desktop\n- SEO dasar\n- Integrasi sesuai scope\n\nReferensi portfolio: ${title} — NEXORA\n\nBisnis saya:\n[Nama bisnis]\n\nTarget customer:\n[Target customer]\n\nFitur tambahan:\n[Tambahkan kebutuhan khusus]\n\nReferensi lain / deadline:\n[Isi bila ada]\n\nMohon bantu NEXORA menentukan scope, estimasi waktu dan quotation berdasarkan brief ini.`}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");const f=b.dataset.filter;document.querySelectorAll(".project").forEach(p=>p.classList.toggle("hidden",f!=="all"&&p.dataset.cat!==f))}));
document.querySelectorAll(".view").forEach(b=>b.addEventListener("click",()=>{const d=JSON.parse(b.dataset.case);document.getElementById("modalImg").src=d.img;document.getElementById("modalH").textContent=d.title;document.getElementById("modalP").textContent=d.desc+" "+d.detail;document.getElementById("modalCat").textContent=d.type+" · "+d.level;document.getElementById("mType").textContent=typeForProject(d.type,d.title);modal.classList.add("open");document.getElementById("modalCta").onclick=()=>{modal.classList.remove("open");document.getElementById("leadType").value=typeForProject(d.type,d.title);document.getElementById("leadMessage").value=projectPrompt(d.title,typeForProject(d.type,d.title),d.desc);scrollContact()}}));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});document.getElementById("close").onclick=()=>modal.classList.remove("open");document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
document.getElementById("hamb").onclick=()=>document.getElementById("nav").classList.toggle("mobile");document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("mobile"));
function selectPackage(card){const title=card.querySelector("h3").textContent.trim(),goal=card.querySelector(".package-goal")?.textContent.trim()||"";const type=title==="Company Website"?"Company Website":title==="E-Commerce"?"E-Commerce":title==="Custom Web App"||title==="Growth Platform"||title==="Enterprise Solution"?"Custom Web App":"Landing Page";document.getElementById("leadType").value=type;document.getElementById("leadMessage").value=`Saya tertarik dengan paket ${title} NEXORA.\n\nTujuan website:\n${goal}\n\nKebutuhan utama:\n[Isi kebutuhan]\n\nTarget customer:\n[Isi target]\n\nReferensi:\n[Isi link/referensi]\n\nDeadline:\n[Isi deadline]\n\nMohon bantu review scope, estimasi dan quotation final.`;scrollContact()}
document.querySelectorAll(".package-choose").forEach(b=>b.addEventListener("click",()=>selectPackage(b.closest(".package-card"))));
document.querySelectorAll(".copy-prompt").forEach(b=>b.addEventListener("click",async e=>{e.preventDefault();e.stopPropagation();const text=b.dataset.prompt||"";let ok=false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);ok=true}}catch(_){}if(!ok){try{const ta=document.createElement("textarea");ta.value=text;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.left="-9999px";ta.style.top="0";document.body.appendChild(ta);ta.focus();ta.select();ok=document.execCommand("copy");ta.remove()}catch(_){} }if(ok){const old=b.textContent;b.textContent="✓ Copied";b.disabled=true;showToast("Prompt berhasil disalin.");setTimeout(()=>{b.textContent=old;b.disabled=false},1800)}else{showToast("Copy otomatis diblokir browser. Pilih paket untuk mengisi brief otomatis.")}}));
let selectedType={n:"Landing Page",p:1500000,d:3};
function calc(){let total=selectedType.p,days=selectedType.d;document.querySelectorAll(".check input:checked").forEach(i=>{total+=+i.dataset.p;days+=1});const dp=Math.round(total*.30);document.getElementById("etype").textContent=selectedType.n;document.getElementById("etotal").textContent="Rp"+total.toLocaleString("id-ID");document.getElementById("edp").textContent="💳 Estimasi DP 30%: Rp"+dp.toLocaleString("id-ID");document.getElementById("edays").textContent=`⏱ Estimasi pengerjaan: ${days}–${days+7} hari kerja*`}
document.querySelectorAll(".choice").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedType={n:b.dataset.n,p:+b.dataset.p,d:+b.dataset.d};calc()}));document.querySelectorAll(".check input").forEach(i=>i.addEventListener("change",calc));calc();
document.getElementById("sendEstimate").onclick=()=>{const totalText=document.getElementById("etotal").textContent;const dpText=document.getElementById("edp").textContent;document.getElementById("leadType").value=selectedType.n;document.getElementById("leadMessage").value=`Saya menggunakan Smart Estimator NEXORA.\n\nJenis website: ${selectedType.n}\nEstimasi awal: ${totalText}\n${dpText}\n${document.getElementById("edays").textContent}\n\nAdd-on yang dipilih:\n${[...document.querySelectorAll(".check input:checked")].map(i=>i.parentElement.querySelector("span").textContent).join("\n")||"- Tidak ada"}\n\nCatatan: estimasi ini adalah kisaran awal. Final scope, timeline, quotation, dan pembayaran ditentukan setelah brief disepakati.`;scrollContact()};
document.getElementById("leadForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("leadName").value.trim(),email=document.getElementById("leadEmail").value.trim(),type=document.getElementById("leadType").value,budget=document.getElementById("leadBudget").value,msg=document.getElementById("leadMessage").value.trim();if(!document.getElementById("dpAgreement").checked){showToast("Silakan setujui ketentuan DP terlebih dahulu.");return}const text=`Halo NEXORA, saya ingin membuat website.\n\nDATA CLIENT\nNama: ${name}\nEmail: ${email}\nJenis Website: ${type}\nBudget: ${budget}\n\nKEBUTUHAN / BRIEF\n${msg}\n\nKETENTUAN PROJECT\nDP: 30% dari total quotation.\nStatus: Client menyetujui ketentuan DP.\nDP sebesar 30% wajib dibayarkan sebelum pengerjaan dimulai. DP yang telah dibayarkan tidak dapat dikembalikan apabila client membatalkan project setelah pembayaran dilakukan.\n\nMohon review brief dan kirimkan scope, timeline serta quotation resmi.`;document.getElementById("formMsg").style.display="block";document.getElementById("formMsg").textContent="Brief siap dikirim. Membuka WhatsApp...";window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank")});


// NEXORA V1.3.3 — Draft Quotation Generator
function nxrMoney(n){return "Rp"+Number(n||0).toLocaleString("id-ID")}
function nxrQuoteNo(){const d=new Date();const key="nexora_quote_seq_"+d.toISOString().slice(0,10);let n=Number(localStorage.getItem(key)||0)+1;localStorage.setItem(key,String(n));return "NXR-Q-"+d.toISOString().slice(0,10).replaceAll("-","")+"-"+String(n).padStart(3,"0")}
function nxrGetScope(){const msg=document.getElementById("leadMessage").value.trim();const adds=[...document.querySelectorAll(".check input:checked")].map(i=>i.parentElement.querySelector("span").textContent.trim());const lines=[];if(msg) lines.push(msg);if(adds.length) lines.push("Add-on: "+adds.join(", "));return lines.join("\n\n")||"Scope akan ditentukan setelah discovery dan finalisasi brief."}
function nxrOpenQuotation(){
 const name=document.getElementById("leadName").value.trim(),email=document.getElementById("leadEmail").value.trim(),type=document.getElementById("leadType").value;
 if(!name||!email||!type||!document.getElementById("leadMessage").value.trim()){showToast("Lengkapi Nama, Email, Jenis Website, dan Kebutuhan terlebih dahulu.");scrollContact();return}
 if(!document.getElementById("dpAgreement").checked){showToast("Silakan setujui ketentuan DP terlebih dahulu.");return}
 const total=Number((document.getElementById("etotal").textContent||"0").replace(/[^0-9]/g,""))||selectedType.p;const dp=Math.round(total*.30);const remaining=total-dp;
 const days=document.getElementById("edays").textContent.replace("⏱ ","");
 document.getElementById("qNumber").textContent=nxrQuoteNo();document.getElementById("qDate").textContent=new Date().toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});
 document.getElementById("qClient").textContent=name;document.getElementById("qEmail").textContent=email;document.getElementById("qType").textContent=type;document.getElementById("qTimeline").textContent=days;
 document.getElementById("qScope").textContent=nxrGetScope();document.getElementById("qTotal").textContent=nxrMoney(total);document.getElementById("qDp").textContent=nxrMoney(dp);document.getElementById("qRemaining").textContent=nxrMoney(remaining);
 document.getElementById("quotation").hidden=false;document.getElementById("quotation").scrollIntoView({behavior:"smooth",block:"start"});
}
const gq=document.getElementById("generateQuotation");if(gq)gq.addEventListener("click",nxrOpenQuotation);
const qe=document.getElementById("qEdit");if(qe)qe.addEventListener("click",()=>scrollContact());
const qp=document.getElementById("qPrint");if(qp)qp.addEventListener("click",()=>window.print());
const qw=document.getElementById("qWhatsApp");if(qw)qw.addEventListener("click",()=>{const n=document.getElementById("qNumber").textContent,t=document.getElementById("qType").textContent,total=document.getElementById("qTotal").textContent,dp=document.getElementById("qDp").textContent,client=document.getElementById("qClient").textContent;const text=`Halo NEXORA, saya ${client}.\n\nSaya sudah melihat Draft Quotation ${n}.\nJenis website: ${t}\nNilai project: ${total}\nDP 30%: ${dp}\n\nMohon lanjutkan review brief dan konfirmasi quotation final.`;window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank")});

</script>

<script>
/* NEXORA Micro Interaction v1
   Subtle icon response while the user scrolls/touches the page. */
(function () {
  const selector = [
    'i[class*="icon"]',
    'svg',
    '.icon',
    '.service-icon',
    '.portfolio-icon',
    '.feature-icon',
    '.cta-icon',
    '.package-icon',
    '.estimator-icon',
    '.quote-icon',
    '[data-icon]'
  ].join(',');

  let ticking = false;
  let lastShake = 0;

  function shakeVisibleIcons() {
    const now = performance.now();
    if (now - lastShake < 180) return;
    lastShake = now;

    const icons = document.querySelectorAll(selector);
    let count = 0;

    icons.forEach((icon) => {
      if (count >= 12) return;
      const rect = icon.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;

      icon.classList.remove('nexora-scroll-shake');
      void icon.offsetWidth;
      icon.classList.add('nexora-scroll-shake');

      window.setTimeout(() => {
        icon.classList.remove('nexora-scroll-shake');
      }, 300);

      count++;
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      shakeVisibleIcons();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile touch feedback: a small shake after a real swipe/drag.
  let touchStartY = null;
  document.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (touchStartY === null) return;
    const endY = e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientY : touchStartY;
    if (Math.abs(endY - touchStartY) > 12) shakeVisibleIcons();
    touchStartY = null;
  }, { passive: true });
})();
</script>


<script>
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
</script>

<section class="nx3d-review-section" style="padding:40px 20px 90px;background:#050711;color:#fff;overflow:hidden">
  <div style="max-width:1180px;margin:auto">
    <div style="text-align:center;margin-bottom:18px">
      <div style="letter-spacing:.22em;font-size:11px;color:#9b83ff;font-weight:800">NEXORA 3D PROJECT SHOWCASE</div>
      <h2 style="font-size:clamp(30px,5vw,58px);line-height:1.02;margin:12px 0">A project you can <span style="color:#9b83ff">feel.</span></h2>
      <p style="color:#8993ab;max-width:620px;margin:auto">True layered depth, extrusion, floating objects and soft motion — dibuat untuk terasa premium tanpa melelahkan mata.</p>
    </div>
    <div class="nx3d-stage">
      <div class="nx3d-floor"></div>
      <div class="nx3d-glow"></div>
      <div class="nx3d-device" data-nx3d-device>
        <div class="nx3d-depth"></div><div class="nx3d-depth2"></div>
        <div class="nx3d-frame">
          <div class="nx3d-screen">
            <div class="nx3d-screen-content">
              <div class="nx3d-panel main">
                <div style="font-size:10px;color:#8b5cf6;font-weight:800;letter-spacing:.16em">NEXORA DIGITAL</div>
                <div class="nx3d-title">Next-gen<br>Financial Platform</div>
                <div class="nx3d-sub">Premium digital experience designed for trust, clarity and conversion.</div>
                <div class="nx3d-chart"></div>
              </div>
              <div class="nx3d-panel nx3d-stats">
                <div class="nx3d-stat"><b>$24,890</b><span>Total Balance&nbsp;&nbsp; +12.5%</span></div>
                <div class="nx3d-stat"><b>$12,540</b><span>Income</span></div>
                <div class="nx3d-stat"><b>$6,120</b><span>Profit</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nx3d-float nx3d-f1">⌘</div>
      <div class="nx3d-float nx3d-f2">✦</div>
      <div class="nx3d-float nx3d-f3">↗</div>
    </div>
    <div style="text-align:center;color:#65708a;letter-spacing:.28em;font-size:10px;margin-top:-25px">DRAG / MOVE • SCROLL TO EXPLORE</div>
  </div>
</section>

<script>
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
</script>
<div class="nx-wm" aria-hidden="true">Website ini dibuat oleh</div>

<script>
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
</script>
<script>
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
</script>
<script>
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
</script>

<script>
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
