document.addEventListener('DOMContentLoaded',()=>{
  // Reveal on scroll
  const faders=document.querySelectorAll('.fade-in');
  const options={threshold:0.1};
  const observer=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },options);
  faders.forEach(f=>observer.observe(f));

  // Mouse parallax on hero
  const hero=document.querySelector('.hero');
  hero.addEventListener('mousemove',e=>{
    const {offsetWidth:w,offsetHeight:h}=hero;
    const x=e.offsetX/w-0.5,y=e.offsetY/h-0.5;
    hero.style.backgroundPosition=`${50+x*10}% ${50+y*10}%`;
  });
});