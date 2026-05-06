const bar=document.getElementById('scrollProgress');
window.addEventListener('scroll',()=>{bar.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';});
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>60);});
const heroBg=document.getElementById('heroBg');
window.addEventListener('mousemove',e=>{heroBg.style.transform=`translate(${(e.clientX/window.innerWidth-.5)*18}px,${(e.clientY/window.innerHeight-.5)*12}px)`;});
const hamburger=document.getElementById('hamburger'),navLinks=document.getElementById('nav-links');
hamburger.addEventListener('click',()=>{hamburger.classList.toggle('open');navLinks.classList.toggle('open');document.body.style.overflow=navLinks.classList.contains('open')?'hidden':'';});
navLinks.querySelectorAll('a').forEach(link=>{link.addEventListener('click',e=>{const href=link.getAttribute('href');if(href&&href.startsWith('#')){e.preventDefault();hamburger.classList.remove('open');navLinks.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{const t=document.querySelector(href);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});},350);}});});
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),e.target.dataset.delay||0);obs.unobserve(e.target);}});},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
function animCounter(el){const target=parseInt(el.dataset.target),suffix=el.dataset.suffix||'';let c=0;const t=setInterval(()=>{c+=target/90;if(c>=target){c=target;clearInterval(t);}el.textContent=Math.floor(c)+suffix;},16);}
const sObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){document.querySelectorAll('.stat-num').forEach(animCounter);sObs.disconnect();}});},{threshold:0.5});
const hs=document.querySelector('.hero-stats');if(hs)sObs.observe(hs);
document.querySelectorAll('.filtro-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filtro;document.querySelectorAll('.projeto-card').forEach(card=>{const show=f==='todos'||card.dataset.categoria===f;if(show){card.style.display='block';setTimeout(()=>{card.style.opacity='1';card.style.transform='';},10);}else{card.style.opacity='0';card.style.transform='scale(0.95)';setTimeout(()=>card.style.display='none',300);}});});});
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lightbox-img'),lbCap=document.getElementById('lightbox-caption');
document.querySelectorAll('.projeto-img img').forEach(img=>{img.addEventListener('click',()=>{lbImg.src=img.src;lbCap.textContent=img.closest('.projeto-card').querySelector('.projeto-nome').textContent;lb.classList.add('active');document.body.style.overflow='hidden';});});
function closeLb(){lb.classList.remove('active');document.body.style.overflow='';}
document.getElementById('lightbox-close').addEventListener('click',closeLb);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb();});
document.getElementById('contato-form').addEventListener('submit',e=>{e.preventDefault();const nome=e.target.querySelector('#nome').value.trim(),email=e.target.querySelector('#email').value.trim(),msg=e.target.querySelector('#mensagem').value.trim(),fb=e.target.querySelector('.form-feedback');if(!nome||!email||!msg){fb.textContent='Por favor, preencha todos os campos.';fb.className='form-feedback erro';return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){fb.textContent='Informe um e-mail válido.';fb.className='form-feedback erro';return;}fb.textContent='✦ Mensagem enviada! Em breve entro em contato.';fb.className='form-feedback sucesso';e.target.reset();});
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const href=a.getAttribute('href');const t=document.querySelector(href);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});