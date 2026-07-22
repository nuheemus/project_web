// ============================================================
// script.js — UI/UX Designer Portfolio
// ============================================================

(function() {
    'use strict';
  
    // ---------- DOM refs ----------
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const topBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
  
    // ---------- mobile menu toggle ----------
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
      });
  
      // close mobile menu when a link is clicked
      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
        });
      });
  
      // close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenu.classList.contains('hidden')) {
          const nav = document.querySelector('nav');
          if (nav && !nav.contains(e.target)) {
            mobileMenu.classList.add('hidden');
          }
        }
      });
    }
  
    // ---------- active nav link on scroll ----------
    function updateActiveNav() {
      let current = '';
      const scrollY = window.scrollY;
  
      sections.forEach(function(section) {
        const top = section.offsetTop - 120;
        if (scrollY >= top) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }
  
    window.addEventListener('scroll', updateActiveNav);
  
    // ---------- back to top button ----------
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        topBtn.classList.remove('hidden');
      } else {
        topBtn.classList.add('hidden');
      }
    });
  
    if (topBtn) {
      topBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // ---------- smooth scroll for all anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  
    // ---------- (optional) skill bar reveal on scroll ----------
    // If you want skill bars to animate only when they come into view,
    // uncomment the block below.
  
    
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillAnimated = false;
  
    function animateSkillBars() {
      if (skillAnimated) return;
      const trigger = document.querySelector('#skills');
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        skillBars.forEach(function(bar) {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(function() {
            bar.style.width = width;
          }, 200);
        });
        skillAnimated = true;
      }
    }
  
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    
  
    // ---------- init ----------
    updateActiveNav();
  
  })();