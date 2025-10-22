// script.js
const goku = document.getElementById('goku');
const toggleBtn = document.getElementById('toggle');
const resetBtn = document.getElementById('reset');

let paused = false;

// Pause/Resume animation toggling:
toggleBtn.addEventListener('click', () => {
  paused = !paused;
  if(paused){
    // pausar: aplicar estilo para detener animación y dar "pose"
    goku.style.animationPlayState = 'paused';
    toggleBtn.textContent = 'Reanudar';
    goku.style.cursor = 'pointer';
  } else {
    goku.style.animationPlayState = 'running';
    toggleBtn.textContent = 'Pausar';
    goku.style.cursor = 'grab';
  }
});

// Reiniciar animación (fuerza reflow para reiniciar keyframes)
resetBtn.addEventListener('click', () => {
  goku.style.animation = 'none';
  // forzar reflow
  void goku.offsetWidth;
  goku.style.animation = null; // vuelve a la definida en CSS
  // si estaba pausado, dejar en running
  if (paused) {
    goku.style.animationPlayState = 'paused';
  } else {
    goku.style.animationPlayState = 'running';
  }
});

// Interacción adicional: arrastrar ligeramente la imagen para que "emule" movimiento"
let isDown = false;
let startX = 0;
let startY = 0;

goku.addEventListener('pointerdown', (e) => {
  isDown = true;
  startX = e.clientX;
  startY = e.clientY;
  goku.setPointerCapture(e.pointerId);
  goku.style.transition = 'transform 0.12s ease';
});

goku.addEventListener('pointermove', (e) => {
  if(!isDown) return;
  const dx = (e.clientX - startX) / 30; // movimiento suave
  const dy = (e.clientY - startY) / 80;
  goku.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 1.5}deg) scale(1.02)`;
});

goku.addEventListener('pointerup', (e) => {
  isDown = false;
  goku.releasePointerCapture(e.pointerId);
  // restaurar a la animación CSS
  goku.style.transition = '';
  goku.style.transform = '';
});
