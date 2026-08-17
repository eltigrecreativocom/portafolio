const fallbackSkills = {
  frontend: ['HTML', 'CSS', 'Sass / SCSS', 'JavaScript', 'Diseño responsive', 'Arquitectura de componentes'],
  wordpress: ['WordPress', 'WooCommerce', 'Plugins personalizados', 'PHP', 'Temas', 'Plantillas'],
  applications: ['React', 'Nuxt', 'Node.js', 'APIs', 'PostgreSQL'],
  infrastructure: ['Linux', 'VPS', 'Git', 'Docker', 'Nginx', 'SSL'],
  complementarias: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign']
};

const skillLabels = {
  frontend: 'Frontend',
  wordpress: 'WordPress',
  applications: 'Aplicaciones web',
  infrastructure: 'Infraestructura',
  complementarias: 'Complementarias'
};

async function renderSkills() {
  const target = document.querySelector('#stack-list');

  if (window.location.protocol === 'file:') {
    return drawSkills(fallbackSkills, target);
  }

  try {
    const response = await fetch('./data/skills.json');
    if (!response.ok) throw new Error('Skills unavailable');
    return drawSkills(await response.json(), target);
  } catch {
    return drawSkills(fallbackSkills, target);
  }
}

function drawSkills(groups, target) {
  target.innerHTML = Object.entries(groups).map(([name, skills]) => `
    <article>
      <p class="section-label">${skillLabels[name] || name}</p>
      <div>${skills.map(skill => `<span>${skill}</span>`).join('')}</div>
    </article>
  `).join('');
}

window.Portfolio = window.Portfolio || {};
window.Portfolio.renderSkills = renderSkills;
