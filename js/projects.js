const fallbackProjects = [
  { id: '01', title: 'Invitarte', category: 'Aplicación web', url: 'https://invitarte.lat/', tags: ['Nuxt', 'JavaScript', 'CSS', 'VPS'], description: 'Plataforma para creación y administración de invitaciones digitales, contenido, invitados, RSVP y álbumes.', status: 'Completado / Producción', featured: true, media: { images: [{ src: './assets/projects/01-invitarte/hero.svg', alt: 'Página de inicio - Hero de Invitarte' }, { src: './assets/projects/01-invitarte/rsvp.svg', alt: 'Sección de RSVP - Confirmación de asistencia' }, { src: './assets/projects/01-invitarte/album.svg', alt: 'Galería de fotos - Álbum compartido' }], videos: [{ src: './assets/projects/01-invitarte/demo.mp4', thumbnail: './assets/projects/01-invitarte/demo-thumb.svg', alt: 'Demo en funcionamiento' }] } },
  { id: '02', title: 'Editorial Cronos', category: 'Plugin personalizado de WordPress', url: 'https://editorial-cronos.com/', tags: ['WordPress', 'PHP', 'JavaScript', 'Plugin personalizado'], description: 'Plugin personalizado desarrollado para controlar el acceso de profesores a material educativo, gestionar permisos y restringir la descarga del contenido.', status: 'Control y protección de contenido', featured: false, media: { images: [{ src: './assets/projects/02-editorial-cronos/dashboard.svg', alt: 'Dashboard de administración' }, { src: './assets/projects/02-editorial-cronos/materials.svg', alt: 'Gestión de materiales educativos' }], videos: [{ src: './assets/projects/02-editorial-cronos/permissions.mp4', thumbnail: './assets/projects/02-editorial-cronos/permissions-thumb.svg', alt: 'Sistema de permisos' }] } },
  { id: '03', title: 'Elyon Natural Product System', category: 'Aplicación web interna', url: 'http://elyonnatural.com/', tags: ['WordPress', 'WooCommerce', 'JavaScript', 'HTML', 'CSS', 'Web APIs'], description: 'Tienda virtual de suplementos muy completa, desarrollada con WordPress y WooCommerce, junto con una herramienta interna para centralizar productos y datos.', status: 'Tienda virtual / Herramienta interna', featured: false, media: { images: [{ src: './assets/projects/03-elyon-natural/store.svg', alt: 'Tienda online' }, { src: './assets/projects/03-elyon-natural/catalog.svg', alt: 'Herramienta interna de catálogo' }], videos: [{ src: './assets/projects/03-elyon-natural/scanning.mp4', thumbnail: './assets/projects/03-elyon-natural/scanning-thumb.svg', alt: 'Validación de códigos EAN-13' }] } },
  { id: '04', title: 'ZYMA', category: 'SaaS / Aplicación web', url: 'http://zymal.lat/', tags: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'GPS'], description: 'Plataforma en desarrollo para gestión comercial y seguimiento de equipos de ventas en campo.', status: 'EN DESARROLLO', featured: false, media: { images: [{ src: './assets/projects/04-zyma/dashboard.svg', alt: 'Dashboard de ventas' }, { src: './assets/projects/04-zyma/map.svg', alt: 'Mapa GPS de seguimiento' }], videos: [{ src: './assets/projects/04-zyma/tracking.mp4', thumbnail: './assets/projects/04-zyma/tracking-thumb.svg', alt: 'GPS en acción' }] } }
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
    // Initialize gallery storage
    window.portfolioGalleries = window.portfolioGalleries || {};
    
    const selectedProjects = (filter === 'ALL' ? projects : projects.filter(project => project.category === filter))
      .sort((a, b) => Number(b.featured || false) - Number(a.featured || false));

    list.innerHTML = selectedProjects.map((project, idx) => {
      const media = project.media || { images: [], videos: [] };
      const allMedia = [
        ...media.images.map(img => ({ type: 'image', ...img })),
        ...media.videos.map(vid => ({ type: 'video', ...vid }))
      ];
      
      // Store gallery data in JavaScript object
      window.portfolioGalleries[project.id] = allMedia;
      
      const galleryHTML = allMedia.length > 0 
        ? `<div class="project-gallery" data-project-id="${project.id}">
             ${allMedia.map((item, i) => 
               `<button class="project-gallery-thumb gallery-opener" 
                  data-project="${project.id}" 
                  data-index="${i}"
                  aria-label="Ver galería de ${project.title}">
                  <img src="${item.type === 'video' ? (item.thumbnail || item.src) : item.src}" alt="${item.alt}" loading="lazy">
                  <span class="project-gallery-badge">${item.type === 'video' ? 'VÍDEO' : 'IMAGEN'}</span>
                </button>`
             ).join('')}
           </div>`
        : '';

      return `
        <article class="project-row ${project.featured ? 'is-featured' : ''}">
          <div class="project-number">PROYECTO ${project.id}</div>
          <div>
            <div class="project-heading">
              <h3>${project.title}${renderProjectLink(project)}</h3>
              ${project.featured ? '<span class="project-badge">LIVE SITE</span>' : ''}
            </div>
            <p class="project-category">${project.category}</p>
          </div>
          <div>
            <figure class="project-visual" role="img" aria-label="Captura de pantalla de ${project.title}">
              <img src="./assets/images/${project.id}-${project.title.toLowerCase().replace(/\s+/g, '-')}.svg" 
                   alt="${project.title} - ${project.category}" 
                   onerror="this.style.display='none'; this.parentElement.classList.add('no-image')"
                   loading="lazy">
              <span class="project-visual-label" aria-hidden="true">${project.title}</span>
              <span class="project-visual-meta" aria-hidden="true">${project.tags.slice(0, 3).join(' · ')}</span>
            </figure>
            <p>${project.description}</p>
            <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            ${galleryHTML}
          </div>
          <span class="project-status">${project.status}</span>
        </article>
      `;
    }).join('');

    // Attach gallery event listeners
    attachGalleryListeners();
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

function attachGalleryListeners() {
  document.querySelectorAll('.gallery-opener').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const projectId = btn.dataset.project;
      const index = parseInt(btn.dataset.index);
      
      // Get gallery data from global store
      if (!window.portfolioGalleries || !window.portfolioGalleries[projectId]) return;
      
      const gallery = window.portfolioGalleries[projectId];
      if (gallery.length > 0) {
        window.Lightbox.open(gallery, index);
      }
    });
  });
}

window.Portfolio = window.Portfolio || {};
window.Portfolio.renderProjects = renderProjects;
