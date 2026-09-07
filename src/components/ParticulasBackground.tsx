import React, { useEffect, useRef } from 'react';

// Função de interpolação contínua no degradê: Azul -> Verde -> Marrom -> Azul
function getDegradeColor(t: number, alpha: number = 0.85): string {
  const norm = ((t % 1) + 1) % 1;

  let r = 0;
  let g = 0;
  let b = 0;

  if (norm < 0.333) {
    // Azul vibrante (#1D4ED8 / #2563EB) -> Verde (#16A34A / #15803D)
    const p = norm / 0.333;
    r = Math.round(29 * (1 - p) + 22 * p);
    g = Math.round(78 * (1 - p) + 163 * p);
    b = Math.round(216 * (1 - p) + 74 * p);
  } else if (norm < 0.666) {
    // Verde (#15803D) -> Marrom Terra Nobre (#854D0E / #78350F)
    const p = (norm - 0.333) / 0.333;
    r = Math.round(22 * (1 - p) + 138 * p);
    g = Math.round(163 * (1 - p) + 68 * p);
    b = Math.round(74 * (1 - p) + 20 * p);
  } else {
    // Marrom Terra (#78350F) -> Azul (#1D4ED8)
    const p = (norm - 0.666) / 0.334;
    r = Math.round(138 * (1 - p) + 29 * p);
    g = Math.round(68 * (1 - p) + 78 * p);
    b = Math.round(20 * (1 - p) + 216 * p);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const ParticulasBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Controle suave de opacidade (fade in ao entrar / fade out ao sair)
    let currentOpacity = 0;

    const numberOfParticles = 70;

    // Posição do cursor
    const mouse = {
      x: 0,
      y: 0,
      active: false
    };

    // Centro orbital unificado
    const orbitCenter = {
      x: 0,
      y: 0
    };

    const getDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : 560;
      return { w, h };
    };

    const setupCanvasSize = () => {
      const { w, h } = getDimensions();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Classe de partícula retangular com órbita ampla
    class RetangularParticle {
      x: number;
      y: number;
      width: number;
      height: number;
      angle: number;
      angularOffset: number;
      radiusBand: number;
      colorT: number;
      radialOffset: number;

      constructor(index: number, total: number) {
        this.x = 0;
        this.y = 0;

        // Formato retangular esbelto
        this.width = Math.random() * 1.5 + 3.2; // 3.2px a 4.7px
        this.height = Math.random() * 4 + 8.5;  // 8.5px a 12.5px

        this.angle = 0;

        // Distribuição angular equitativa pela circunferência
        this.angularOffset = (index / total) * Math.PI * 2;

        // Raio do círculo amplo e espaçado (195px a 275px)
        const bandIndex = index % 4;
        this.radiusBand = 195 + bandIndex * 26;
        this.radialOffset = ((index * 19) % 35) - 17;

        // Posição no degradê azul -> verde -> marrom
        this.colorT = index / total;
      }

      update(cx: number, cy: number, t: number) {
        // Movimento de ondas harmônicas contínuas ao redor da circunferência
        const wave =
          Math.sin(t * 2.2 + this.angularOffset * 3) * 20 +
          Math.cos(t * 1.4 + this.angularOffset * 2) * 12;

        const ringR = this.radiusBand + this.radialOffset + wave;
        const currentAngle = this.angularOffset + t * 0.65;

        // Posição calculada com base no centro unificado da órbita
        this.x = cx + Math.cos(currentAngle) * ringR;
        this.y = cy + Math.sin(currentAngle) * ringR;

        // Tangente suave à curva circular
        this.angle = currentAngle + Math.PI / 2;
      }

      draw(t: number) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Degradê luminoso: Azul -> Verde -> Marrom
        const topColor = getDegradeColor(this.colorT + t * 0.04, 0.9);
        const midColor = getDegradeColor(this.colorT + 0.16 + t * 0.04, 0.95);
        const botColor = getDegradeColor(this.colorT + 0.32 + t * 0.04, 0.85);

        const grad = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2);
        grad.addColorStop(0, topColor);
        grad.addColorStop(0.5, midColor);
        grad.addColorStop(1, botColor);

        ctx.fillStyle = grad;

        const halfW = this.width / 2;
        const halfH = this.height / 2;
        const radius = 1.2;

        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(-halfW, -halfH, this.width, this.height, radius);
        } else {
          ctx.rect(-halfW, -halfH, this.width, this.height);
        }
        ctx.fill();

        ctx.restore();
      }
    }

    let particles: RetangularParticle[] = [];

    const init = () => {
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new RetangularParticle(i, numberOfParticles));
      }
    };

    // Conexões onduladas suaves entre vizinhos no anel
    const drawWaveConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const nextIdx = (i + 1) % particles.length;
        const p2 = particles[nextIdx];

        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (d < 65) {
          const alpha = (1 - d / 65) * 0.22;
          const lineColor = getDegradeColor(p1.colorT, alpha);

          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      const { w, h } = getDimensions();
      time += 0.018;

      ctx.clearRect(0, 0, w, h);

      // Transição suave de opacidade: aparece apenas com cursor na área
      const targetOpacity = mouse.active ? 1.0 : 0.0;
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      if (currentOpacity > 0.005) {
        // Deslocamento do centro unificado seguindo o cursor com fluidez
        orbitCenter.x += (mouse.x - orbitCenter.x) * 0.18;
        orbitCenter.y += (mouse.y - orbitCenter.y) * 0.18;

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        for (let i = 0; i < particles.length; i++) {
          particles[i].update(orbitCenter.x, orbitCenter.y, time);
        }

        drawWaveConnections();

        for (let i = 0; i < particles.length; i++) {
          particles[i].draw(time);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    setupCanvasSize();
    init();
    animate();

    let wasActive = false;

    // Rastreamento contínuo de movimento horizontal e vertical
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Validação de limites com margem vertical segura (50px de tolerância)
      // e cobertura total da largura horizontal da seção
      const isInside =
        clientY >= rect.top - 50 &&
        clientY <= rect.bottom + 50 &&
        clientX >= rect.left - 20 &&
        clientX <= rect.right + 20;

      if (isInside) {
        const posX = clientX - rect.left;
        const posY = clientY - rect.top;

        mouse.x = posX;
        mouse.y = posY;

        // Se acabou de entrar, sincroniza o centro orbital imediatamente
        if (!wasActive) {
          orbitCenter.x = posX;
          orbitCenter.y = posY;
        }

        mouse.active = true;
        wasActive = true;
      } else {
        mouse.active = false;
        wasActive = false;
      }
    };

    // Chamado apenas quando o ponteiro realmente sai da janela do navegador
    const handleWindowLeave = (e: MouseEvent) => {
      // Verifica se o ponteiro saiu da janela (relatedTarget === null)
      if (!e.relatedTarget && !(e as unknown as { toElement?: unknown }).toElement) {
        mouse.active = false;
        wasActive = false;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      wasActive = false;
    };

    const handleResize = () => {
      setupCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowLeave);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      document.removeEventListener('mouseleave', handleWindowLeave);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};
