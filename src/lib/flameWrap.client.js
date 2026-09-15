import { createFlameWrap } from '../components/canvasui/FlameWrapVanilla.ts';

const BLUE = [0, 0.8, 1]; // matches --nebula-cyan (#00CCFF)

function initFlameWrap(target) {
  if (target.dataset.flameWrapInit) return;
  target.dataset.flameWrapInit = 'true';

  const content = target.querySelector('.ctech-flame-content');
  const output = target.querySelector('.ctech-flame-output');
  const source = target.querySelector('.ctech-flame-source');
  if (!content || !output || !source) return;

  createFlameWrap({ source, content, output }, {
    color: BLUE,
    intensity: 0.55,
    height: 170,
    spread: 14,
    radius: 12,
    speed: 0.22,
    turbulence: 0.65,
    sparks: 1.2,
  });
}

document.querySelectorAll('[data-flame-wrap]').forEach(initFlameWrap);
