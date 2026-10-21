document.getElementById('year').textContent = new Date().getFullYear();

const filters = document.querySelector('.project-filters');
const projects = [...document.querySelectorAll('[data-category]')];
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
    else project.querySelector('video')?.pause();
  });
  document.getElementById('filter-status').textContent = `${count} projects shown`;
});

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .project, .experience-row, .skill-grid, .contact').forEach(element => {
      element.classList.add('reveal-ready');
      reveal.observe(element);
    });
  }
  const links = [...document.querySelectorAll('nav a')];
  const sections = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main > section').forEach(section => sections.observe(section));
}
