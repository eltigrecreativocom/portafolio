const fallbackProjects = [
  { id: '01', title: 'Invitarte', category: 'Aplicación web', url: 'https://www.invitarte.lat/', tags: ['Nuxt', 'JavaScript', 'CSS', 'VPS'], description: 'Plataforma para creación y administración de invitaciones digitales, contenido, invitados, RSVP y álbumes.', status: 'Completado / Producción' },
  { id: '02', title: 'Editorial Cronos', category: 'Plugin personalizado de WordPress', url: 'https://editorial-cronos.com/', tags: ['WordPress', 'PHP', 'JavaScript', 'Plugin personalizado'], description: 'Plugin personalizado desarrollado para controlar el acceso de profesores a material educativo, gestionar permisos y restringir la descarga del contenido.', status: 'Control y protección de contenido' },
  { id: '03', title: 'Elyon Natural Product System', category: 'Aplicación web interna', url: 'http://elyonnatural.com/', tags: ['WordPress', 'WooCommerce', 'JavaScript', 'HTML', 'CSS', 'Web APIs'], description: 'Tienda virtual de suplementos muy completa, desarrollada con WordPress y WooCommerce, junto con una herramienta interna para centralizar productos y datos.', status: 'Tienda virtual / Herramienta interna' },
  { id: '04', title: 'ZYMA', category: 'SaaS / Aplicación web', url: 'http://zymal.lat/', tags: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'GPS'], description: 'Plataforma en desarrollo para gestión comercial y seguimiento de equipos de ventas en campo.', status: 'EN DESARROLLO' }
];

async function renderProjects() {
  const list = document.querySelector('#project-list');
  const filters = document.querySelector('#project-filters');

  if (window.location.protocol === 'file:') {
    return mountProjects(fallbackProjects, list, filters);
  }

  try {
    const response = await fetch('./data/projects.json');
    if (!response.ok) throw new Error('Project data unavailable');
    return mountProjects(await response.json(), list, filters);
  } catch {
    return mountProjects(fallbackProjects, list, filters);
  }
}

function mountProjects(projects, list, filters) {
  const categories = ['ALL', ...new Set(projects.map(project => project.category))];

  filters.innerHTML = categories
    .map(category => `<button type="button" class="filter-button${category === 'ALL' ? ' is-active' : ''}" data-filter="${category}">${category === 'ALL' ? 'TODOS' : category}</button>`)
    .join('');

  const drawProjects = filter => {
    const selectedProjects = filter === 'ALL'
      ? projects
      : projects.filter(project => project.category === filter);

    list.innerHTML = selectedProjects.map(project => `
      <article class="project-row">
        <div class="project-number">PROYECTO ${project.id}</div>
        <div>
          <h3>${project.title}${renderProjectLink(project)}</h3>
          <p class="project-category">${project.category}</p>
        </div>
        <div>
          <p>${project.description}</p>
          <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        </div>
        <span class="project-status">${project.status}</span>
      </article>
    `).join('');
  };

  filters.addEventListener('click', event => {
    if (!event.target.matches('.filter-button')) return;
    filters.querySelectorAll('.filter-button').forEach(button => button.classList.remove('is-active'));
    event.target.classList.add('is-active');
    drawProjects(event.target.dataset.filter);
  });

  drawProjects('ALL');
}

function renderProjectLink(project) {
  if (!project.url) return '';
  return ` <a class="inline-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Visitar ${project.title}">↗</a>`;
}

window.Portfolio = window.Portfolio || {};
window.Portfolio.renderProjects = renderProjects;
