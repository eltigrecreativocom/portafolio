class Lightbox {
  constructor() {
    this.gallery = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.init();
  }

  init() {
    const html = `
      <div class="lightbox-overlay" id="lightbox-overlay">
        <div class="lightbox-container">
          <button class="lightbox-close" aria-label="Cerrar galería">✕</button>
          <button class="lightbox-nav lightbox-prev" aria-label="Imagen anterior">‹</button>
          <div class="lightbox-content" id="lightbox-content"></div>
          <button class="lightbox-nav lightbox-next" aria-label="Imagen siguiente">›</button>
          <div class="lightbox-caption" id="lightbox-caption"></div>
          <div class="lightbox-counter" id="lightbox-counter"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    this.overlay = document.getElementById('lightbox-overlay');
    this.content = document.getElementById('lightbox-content');
    this.caption = document.getElementById('lightbox-caption');
    this.counter = document.getElementById('lightbox-counter');

    this.attachEvents();
  }

  attachEvents() {
    this.overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    this.overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener('keydown', e => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  open(items, index = 0) {
    this.gallery = items;
    this.currentIndex = index;
    this.isOpen = true;
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.render();
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  render() {
    const item = this.gallery[this.currentIndex];
    if (!item) return;

    this.content.innerHTML = '';
    
    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      this.content.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || 'Imagen';
      this.content.appendChild(img);
    }

    this.caption.textContent = item.alt || '';
    this.counter.textContent = `${this.currentIndex + 1} / ${this.gallery.length}`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
    this.render();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
    this.render();
  }

  addItem(item) {
    this.gallery.push(item);
  }

  openAt(index) {
    if (index >= 0 && index < this.gallery.length) {
      this.open(this.gallery, index);
    }
  }
}

window.Lightbox = new Lightbox();
