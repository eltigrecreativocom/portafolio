# Estructura de Proyectos y Galería

## Cómo agregar imágenes y videos a tus proyectos

Este portfolio soporta galerías dinámicas de imágenes y videos para cada proyecto.

### Estructura de Carpetas

```
assets/
  ├── projects/
  │   ├── 01-invitarte/
  │   │   ├── hero.jpg
  │   │   ├── feature-1.jpg
  │   │   ├── demo.mp4
  │   │   ├── demo-thumb.jpg
  │   │   └── ...
  │   ├── 02-editorial-cronos/
  │   ├── 03-elyon-natural/
  │   └── 04-zyma/
```

### Configurar en data/projects.json

Actualiza el array `media` en cada proyecto:

```json
{
  "id": "01",
  "title": "Invitarte",
  "media": {
    "images": [
      {
        "src": "./assets/projects/01-invitarte/hero.jpg",
        "alt": "Página de inicio de Invitarte"
      },
      {
        "src": "./assets/projects/01-invitarte/feature-1.jpg",
        "alt": "Sección de RSVP"
      }
    ],
    "videos": [
      {
        "src": "./assets/projects/01-invitarte/demo.mp4",
        "thumbnail": "./assets/projects/01-invitarte/demo-thumb.jpg",
        "alt": "Demo en funcionamiento"
      }
    ]
  }
}
```

### Tipos de archivo soportados

**Imágenes:** JPG, PNG, WebP (se recomienda WebP para velocidad)
**Videos:** MP4, WebM

### Óptimización de Imágenes

Para mejor rendimiento:
- Redimensiona imágenes a máximo 1200x800px
- Usa formato WebP para imágenes
- Comprime videos a bitrate 2-5 Mbps

### Ejemplo Completo

```json
[
  {
    "id": "01",
    "title": "Invitarte",
    "category": "Aplicación web",
    "url": "https://invitarte.lat/",
    "description": "Plataforma para invitaciones digitales...",
    "tags": ["Nuxt", "JavaScript", "CSS", "VPS"],
    "status": "Completado / Producción",
    "featured": true,
    "media": {
      "images": [
        {
          "src": "./assets/projects/01-invitarte/hero.jpg",
          "alt": "Hero de Invitarte"
        }
      ],
      "videos": [
        {
          "src": "./assets/projects/01-invitarte/demo.mp4",
          "thumbnail": "./assets/projects/01-invitarte/demo-thumb.jpg",
          "alt": "Demo del sistema"
        }
      ]
    }
  }
]
```

### Cómo Funciona el Lightbox

1. El usuario hace clic en una imagen/video en la galería
2. Se abre un lightbox oscuro y profesional
3. Navega con flechas ← → o teclado
4. Cierra con ESC o el botón ✕

### API del Lightbox

Puedes usar el lightbox directamente en tu código:

```javascript
// Abrir galería en cierto índice
window.Lightbox.open(items, index);

// Ir al siguiente
window.Lightbox.next();

// Ir al anterior
window.Lightbox.prev();

// Cerrar
window.Lightbox.close();

// Agregar item
window.Lightbox.addItem({ type: 'image', src: '...', alt: '...' });
```
