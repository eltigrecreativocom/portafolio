# Setup: Sistema de Galería de Proyectos con Lightbox

Tu portfolio ahora tiene un sistema profesional de galerías de proyectos con lightbox minimalista pero robusto.

## ⚡ Características Principales

✅ **Lightbox minimalista y rápido**
- Sin dependencias externas, solo JavaScript vanilla
- Soporta imágenes (JPG, PNG, WebP) y videos (MP4, WebM)
- Navegación con teclado: Flechas ← → y ESC para cerrar
- Responsive en todos los tamaños de pantalla

✅ **Estructura de carpetas por proyecto**
- `assets/projects/01-invitarte/` para Invitarte
- `assets/projects/02-editorial-cronos/` para Editorial Cronos
- `assets/projects/03-elyon-natural/` para Elyon Natural
- `assets/projects/04-zyma/` para ZYMA

✅ **JSON dinámico** (data/projects.json)
- Cada proyecto tiene array `media` con imágenes y videos
- Galería se genera automáticamente
- Flexible: puedes cambiar sin tocar código

## 🚀 Cómo Usar (Paso a Paso)

### 1. Preparar tus imágenes

Guarda screenshots en las carpetas de proyecto:

```
assets/projects/
├── 01-invitarte/
│   ├── hero.jpg                    ← Screenshot principal
│   ├── rsvp.jpg                    ← Feature 2
│   ├── album.jpg                   ← Feature 3
│   ├── demo.mp4                    ← Video (opcional)
│   └── demo-thumb.jpg              ← Thumbnail para video
├── 02-editorial-cronos/
│   ├── dashboard.jpg
│   ├── materials.jpg
│   └── permissions.mp4
```

### 2. Actualizar data/projects.json

Edita `data/projects.json` y llena el array `media` de cada proyecto:

```json
{
  "id": "01",
  "title": "Invitarte",
  "media": {
    "images": [
      {
        "src": "./assets/projects/01-invitarte/hero.jpg",
        "alt": "Descripción de la imagen"
      },
      {
        "src": "./assets/projects/01-invitarte/rsvp.jpg",
        "alt": "Otra descripción"
      }
    ],
    "videos": [
      {
        "src": "./assets/projects/01-invitarte/demo.mp4",
        "thumbnail": "./assets/projects/01-invitarte/demo-thumb.jpg",
        "alt": "Descripción del video"
      }
    ]
  }
}
```

### 3. ¡Listo! 

El portfolio mostrará automáticamente:
- Miniaturas de galería debajo de cada proyecto
- Al hacer clic, se abre el lightbox
- Navega con flechas o teclado
- Cierra con ESC o el botón ✕

## 📋 Ejemplo Completo

Ver [projects.example.json](./projects.example.json) para ver la estructura completa con datos ficticios.

## 🎨 Personalización del Lightbox

El lightbox es completamente personalizable. Estilos en `css/main.css`:

```css
.lightbox-overlay { /* Fondo oscuro */ }
.lightbox-container { /* Contenedor */ }
.lightbox-content { /* Área de imagen/video */ }
.lightbox-nav { /* Botones de navegación */ }
.lightbox-caption { /* Descripción */ }
.lightbox-counter { /* Contador (1/5) */ }
```

## ⌨️ Controles de Teclado

| Tecla | Acción |
|-------|--------|
| ← Arrow Left | Imagen anterior |
| → Arrow Right | Imagen siguiente |
| ESC | Cerrar lightbox |
| Click en overlay | Cerrar lightbox |

## 🎬 Formatos Soportados

**Imágenes:** JPG, PNG, WebP (recomendado)
**Videos:** MP4, WebM

## 💡 Tips de Rendimiento

- Redimensiona imágenes a 1200x800px máximo
- Usa WebP para mejor compresión
- Comprime videos a 2-5 Mbps de bitrate
- Los thumbnails pueden ser imágenes más pequeñas

## 🔧 API JavaScript

Puedes interactuar con el lightbox desde código:

```javascript
// Abrir galería
window.Lightbox.open(items, index);

// Navegar
window.Lightbox.next();
window.Lightbox.prev();

// Cerrar
window.Lightbox.close();

// Agregar item
window.Lightbox.addItem({ type: 'image', src: '...', alt: '...' });

// Abrir en índice específico
window.Lightbox.openAt(3);
```

## 📝 Estructura de un Item

```javascript
{
  type: 'image',           // 'image' o 'video'
  src: './path/to/file',   // Ruta del archivo
  alt: 'Descripción',      // Texto alternativo
  thumbnail: './thumb'     // Solo para videos
}
```

## ✅ Checklist

- [ ] Copié mis screenshots a `assets/projects/XX-*/`
- [ ] Actualicé `data/projects.json` con las imágenes y videos
- [ ] Probé la galería en navegador
- [ ] Los videos tienen thumbnails
- [ ] Las imágenes están optimizadas (< 500KB)

## 🆘 Solución de Problemas

**Las imágenes no aparecen:**
- Verifica la ruta en `src` sea correcta
- Usa `.jpg`, `.png`, o `.webp` (minúsculas)
- Abre DevTools y revisa la consola

**El lightbox no abre:**
- Asegúrate que `js/lightbox.js` esté en index.html
- Recarga la página (Ctrl+F5)
- Verifica que tengas al menos una imagen en la galería

**El video no se reproduce:**
- Usa formato MP4 (compatible más amplio)
- Verifica que el archivo exista en la carpeta
- Prueba en navegadores diferentes

---

¡Listo! Tu portfolio ahora tiene un sistema profesional de galerías. 🎉
