(function(){const menu=document.getElementById('menu-toggle'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));const frames={bot:document.getElementById('bot-iframe'),game:document.getElementById('game-iframe')};addEventListener('message',e=>{const d=e.data;if(!d||!d.type)return;if(d.type==='mk-frame-height'){const f=frames[d.frame],h=Number(d.height);if(!f||e.source!==f.contentWindow||!Number.isFinite(h)||h<100||h>(d.frame==='game'?2600:11000))return;const previous=parseInt(f.style.height)||0;if(Math.abs(previous-h)>2)f.style.height=(h+3)+'px'}if(d.type==='mk-bot-choice'&&e.source===frames.bot.contentWindow){document.getElementById('useful').scrollIntoView({behavior:'smooth',block:'start'})}})})();;(()=>{
  const items=[...document.querySelectorAll('section.section > .container, footer.footer > .container')];
  if(!items.length)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(el=>el.classList.add('mk-reveal-visible'));return;}
  let lastY=window.scrollY, direction='down';
  const setDirection=()=>{
    const y=window.scrollY;
    if(Math.abs(y-lastY)>2) direction=y>lastY?'down':'up';
    lastY=y;
  };
  addEventListener('scroll',setDirection,{passive:true});
  items.forEach(el=>{
    const r=el.getBoundingClientRect();
    el.classList.add(r.top<innerHeight*.5?'mk-reveal-from-top':'mk-reveal-from-bottom');
    if(r.top<innerHeight*.92 && r.bottom>innerHeight*.08) el.classList.add('mk-reveal-visible');
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const el=entry.target;
      if(entry.isIntersecting){
        el.classList.remove('mk-reveal-from-top','mk-reveal-from-bottom');
        el.classList.add(direction==='up'?'mk-reveal-from-top':'mk-reveal-from-bottom');
        requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('mk-reveal-visible')));
      }else{
        const r=entry.boundingClientRect;
        el.classList.remove('mk-reveal-visible','mk-reveal-from-top','mk-reveal-from-bottom');
        // Leaving through the top while moving down; through the bottom while moving up.
        el.classList.add(r.bottom<=innerHeight*.12?'mk-reveal-from-top':'mk-reveal-from-bottom');
      }
    });
  },{root:null,rootMargin:'-7% 0px -7% 0px',threshold:0.06});
  items.forEach(el=>io.observe(el));
})();