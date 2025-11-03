// main.js

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      home: "Home",
      about: "About Us",
      services: "Services",
      contact: "Contact",
      hero_title: "Your Cybersecurity Experts",
      hero_tagline: "Protecting your digital world with top-tier solutions.",
      learn_more: "Learn More",
      services_header: "Our Services",
      audit: "Security Audits",
      audit_desc: "Comprehensive analysis of your infrastructure.",
      training: "Staff Training",
      training_desc: "We empower your team to recognize and prevent threats.",
      contact_us: "Contact Us",
      send: "Send"
    },
    nl: {
      home: "Startpagina",
      about: "Over Ons",
      services: "Diensten",
      contact: "Contact",
      hero_title: "Uw Cybersecurity Experts",
      hero_tagline: "Bescherm uw digitale wereld met eersteklas oplossingen.",
      learn_more: "Meer Informatie",
      services_header: "Onze Diensten",
      audit: "Beveiligingsaudits",
      audit_desc: "Grondige analyse van uw infrastructuur.",
      training: "Personeelstraining",
      training_desc: "Wij leren uw team bedreigingen te herkennen en te voorkomen.",
      contact_us: "Neem Contact Op",
      send: "Versturen"
    }
  };

  const i18nElements = document.querySelectorAll('[data-i18n]');

  function setLanguage(lang) {
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    document.documentElement.lang = lang;
  }

  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
  document.getElementById('lang-nl').addEventListener('click', () => setLanguage('nl'));

  // Scroll animation (simple fade-in)
  const fadeEls = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});
