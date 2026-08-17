# Portfolio — Luis Fernando Gutierrez Castillo

Portfolio profesional interactivo para Luis Fernando Gutierrez Castillo, presentado como una experiencia de desarrollo web de la idea a producción.

## Perfil

- Nombre: Luis Fernando Gutierrez Castillo
- Rol: Desarrollador web
- Especialidad: Frontend · CSS/Sass · WordPress
- Correo: `fernandodacuso@gmail.com`
- Teléfono: `+51 939 512 879`

## Características

- Diseño editorial y tecnológico, sin tarjetas genéricas de agencia.
- Navegación lateral independiente para escritorio.
- Menú móvil independiente con overlay de pantalla completa.
- Animación circular de apertura, icono hamburguesa y enlaces escalonados.
- Scroll interno controlado para evitar errores al abrir el sitio con `file://`.
- Fondo interactivo que responde al puntero en dispositivos compatibles.
- Animaciones de entrada respetando `prefers-reduced-motion`.
- Contenido de proyectos, experiencia y tecnologías separado en archivos JSON.
- Datos de respaldo incluidos en JavaScript para funcionar sin servidor local.

## Estructura

```text
index.html
├── css/
│   ├── main.css
│   └── mobile-navigation.css
├── scss/
│   ├── main.scss
│   ├── mobile-navigation.scss
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   └── sections/
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── projects.js
│   ├── experience.js
│   └── components.js
├── data/
│   ├── projects.json
│   ├── experience.json
│   └── skills.json
└── assets/
```

## Arquitectura visual

### Escritorio

El componente `.site-header` contiene la marca, el rol, la navegación lateral y los enlaces sociales. La navegación usa `.desktop-nav` y permanece visible durante el scroll.

### Móvil

El componente `.mobile-navigation` es independiente del sidebar. Incluye:

1. Barra fija con nombre y botón.
2. Panel overlay a pantalla completa.
3. Animación de apertura mediante `clip-path`.
4. Enlaces con aparición escalonada.
5. Bloqueo del scroll mientras el panel está abierto.

La lógica está en `js/navigation.js`; los estilos fuente están en `scss/components/_mobile-navigation.scss`.

## Contenido editable

### Proyectos

Editar `data/projects.json` para cambiar títulos, categorías, URLs, tecnologías, descripciones y estados.

Proyectos actuales:

- Invitarte — `https://www.invitarte.lat/`
- Editorial Cronos — `https://editorial-cronos.com/`
- Elyon Natural — `http://elyonnatural.com/`
- ZYMA — `http://zymal.lat/`

### Experiencia

Editar `data/experience.json` para cambiar empresas, periodos, roles, enlaces, tecnologías y responsabilidades.

La experiencia incluye Elyon Natural, iCorpWeb y Lenguaje Visual.

### Tecnologías

Editar `data/skills.json` para actualizar los grupos de frontend, WordPress, aplicaciones web e infraestructura.

### Enlaces sociales

Los enlaces sociales están en `index.html`, dentro de `.social-links`. Se pueden reemplazar directamente por las URLs personales definitivas.

### Contacto

El correo visible y el enlace `mailto:` están en la sección `#contact` de `index.html`.

## SCSS

El proyecto mantiene dos entradas Sass:

```text
scss/main.scss                 → css/main.css
scss/mobile-navigation.scss    → css/mobile-navigation.css
```

Para compilar con Sass:

```bash
sass scss/main.scss css/main.css --style=compressed
sass scss/mobile-navigation.scss css/mobile-navigation.css --style=compressed
```

Para trabajar observando cambios:

```bash
sass --watch scss/main.scss:css/main.css scss/mobile-navigation.scss:css/mobile-navigation.css
```

No es necesario compilar para publicar la versión ya generada: GitHub Pages utiliza los archivos CSS incluidos en el proyecto.

## Vista local

### Opción recomendada

Desde la raíz del proyecto:

```bash
python -m http.server 8765
```

Después abrir:

```text
http://localhost:8765/
```

### Apertura directa

También se puede abrir `index.html` con `file://`. En ese caso, los módulos usan sus datos de respaldo para que la interfaz siga funcionando. La navegación interna utiliza scroll controlado para no generar errores de seguridad por hashes dentro de frames locales.

## Publicar en GitHub Pages

1. Crear un repositorio público en GitHub.
2. Subir todo el contenido conservando `index.html`, `css`, `scss`, `js`, `data` y `assets` en la raíz.
3. Abrir `Settings → Pages`.
4. En `Build and deployment`, seleccionar `Deploy from a branch`.
5. Seleccionar la rama principal y la carpeta `/ (root)`.
6. Guardar y esperar la URL pública.

No se necesita React, Node.js ni un servidor backend para publicar la versión estática.

## Revisión rápida

Antes de publicar, comprobar:

- El menú lateral aparece en escritorio.
- El botón móvil abre el overlay y cambia a `CERRAR`.
- Los enlaces internos desplazan sin cambiar la URL.
- Los cuatro proyectos muestran sus enlaces directos.
- Las tres experiencias aparecen correctamente.
- El correo abre `fernandodacuso@gmail.com`.
- La vista móvil no genera scroll horizontal.
