/* Sasha's Corner — interactions */
(function(){
  'use strict';

  /* Sticky header state */
  var header = document.getElementById('siteHeader');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile nav */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      header.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  /* Menu tabs */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.menu-tab'));
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){
        t.classList.remove('active');
        t.setAttribute('aria-selected','false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      document.querySelectorAll('.menu-panel').forEach(function(p){
        p.classList.toggle('active', p.id === 'panel-' + tab.dataset.tab);
      });
    });
  });

  /* Scroll reveal */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* Gentle hero parallax */
  var heroBg = document.querySelector('.hero-bg');
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var y = window.scrollY;
      if(y < window.innerHeight * 1.2){
        heroBg.style.transform = 'scale(1.06) translateY(' + (y * .18) + 'px)';
      }
      ticking = false;
    });
  }, {passive:true});
})();
