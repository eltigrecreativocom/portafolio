const fallbackExperience = [
  { company: 'Elyon Natural', role: 'Desarrollador web / E-commerce', period: '2025 — Actualidad', url: 'http://elyonnatural.com/', description: 'Tienda virtual de suplementos desarrollada con WordPress y WooCommerce, junto con herramientas internas, catálogo de productos, automatización de procesos y funcionalidades personalizadas.', technologies: ['HTML', 'CSS', 'Sass', 'JavaScript', 'WordPress', 'WooCommerce', 'VPS'], highlights: ['Desarrollo y mantenimiento de sitios web', 'E-commerce', 'Herramientas internas', 'Centralización de información de productos', 'Validación de códigos EAN-13', 'Integración de información comercial'] },
  { company: 'iCorpWeb', role: 'Desarrollador web', period: 'Hasta agosto 2025', url: 'https://icorpweb.com/', description: 'Desarrollo de sitios web, landing pages y soluciones digitales a medida, trabajando principalmente con WordPress, maquetación frontend y personalización de interfaces.', technologies: ['HTML', 'CSS', 'Sass', 'JavaScript', 'WordPress', 'PHP'], highlights: [] },
  { company: 'Lenguaje Visual', role: 'Formación inicial en desarrollo web / WordPress', period: 'Primera experiencia laboral', description: 'Primera experiencia laboral en la que aprendí a desarrollar páginas web con WordPress y construí mis bases para trabajar con sitios web y contenidos digitales.', technologies: ['WordPress'], highlights: [] }
];

async function renderExperience() {
  const target = document.querySelector('#experience-list');

  if (window.location.protocol === 'file:') {
    return drawExperience(fallbackExperience, target);
  }

  try {
    const response = await fetch('./data/experience.json');
    if (!response.ok) throw new Error('Experience unavailable');
    return drawExperience(await response.json(), target);
  } catch {
    return drawExperience(fallbackExperience, target);
  }
}

function drawExperience(items, target) {
  target.innerHTML = items.map(item => `
    <article class="experience-item">
      <div class="experience-meta">
        <span>${item.period}</span>
        <b>${item.company}</b>
      </div>
      <div>
        <h3>${item.role}${renderExperienceLink(item)}</h3>
        <p>${item.description}</p>
        <div class="project-tags">${item.technologies.map(technology => `<span>${technology}</span>`).join('')}</div>
        ${renderHighlights(item.highlights)}
      </div>
    </article>
  `).join('');
}

function renderExperienceLink(item) {
  if (!item.url) return '';
  return ` <a class="inline-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Visitar ${item.company}">↗</a>`;
}

function renderHighlights(highlights) {
  if (!highlights.length) return '';
  return `<ul>${highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>`;
}

window.Portfolio = window.Portfolio || {};
window.Portfolio.renderExperience = renderExperience;
