import React, { useState, useRef } from 'react';
import Typical from 'react-typical';
import confetti from 'canvas-confetti';

function launchConfetti() {
  // 🎊 CANVAS-CONFETTI
  const confettiCanvas = document.createElement('canvas');
  document.body.appendChild(confettiCanvas);
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100%';
  confettiCanvas.style.height = '100%';
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ['#ff6699', '#66ccff', '#ffcc00', '#cc99ff'];

  (function frame() {
    if (Date.now() < end) {
      myConfetti({
        particleCount: 10,
        angle: Math.random() * 360,
        spread: 90,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors
      });
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => document.body.removeChild(confettiCanvas), 5000);
    }
  })();

  // 💖 EMOJIS FLOTANTES
  const emojiCanvas = document.createElement('canvas');
  document.body.appendChild(emojiCanvas);
  emojiCanvas.style.position = 'fixed';
  emojiCanvas.style.pointerEvents = 'none';
  emojiCanvas.style.top = '0';
  emojiCanvas.style.left = '0';
  emojiCanvas.style.width = '100%';
  emojiCanvas.style.height = '100%';
  emojiCanvas.width = window.innerWidth;
  emojiCanvas.height = window.innerHeight;

  const ctx = emojiCanvas.getContext('2d');
  const emojis = ['❤️', '🌸'];
  const particles = Array.from({ length: 30 }, () => ({
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    x: Math.random() * emojiCanvas.width,
    y: Math.random() * -emojiCanvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 1,
    angle: Math.random() * Math.PI * 2,
    spin: Math.random() * 0.1 - 0.05,
    opacity: 1
  }));

  function drawEmojiFrame() {
    ctx.clearRect(0, 0, emojiCanvas.width, emojiCanvas.height);
    let allInvisible = true;

    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const relativeY = p.y / emojiCanvas.height;
      p.opacity = Math.max(0, 1 - relativeY);
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
      ctx.globalAlpha = 1;

      p.y += p.speed;
      p.x += Math.sin(p.angle) * 1.2;
      p.angle += p.spin;

      if (p.opacity > 0) {
        allInvisible = false;
      }
    });

    if (!allInvisible) {
      requestAnimationFrame(drawEmojiFrame);
    } else {
      document.body.removeChild(emojiCanvas);
    }
  }

  drawEmojiFrame();
}

function App() {
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    launchConfetti();
    setShowCake(true);
    setTimeout(() => setShowMessage(true), 1000);

    // 🎵 Reproducir música
    if (!audioRef.current) {
      audioRef.current = new Audio('Intrumental_Piano_Ludovico_Einaudi.mp3');
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch((err) => {
      console.error("Error al reproducir audio:", err);
    });
  };

  return (
    <div>
      {/* Encabezado */}
      <header className="header">
        <h1>¡Feliz Cumpleaños, Marisol 🌸!</h1>
        <p>Alguien especial merece algo especial 🥳</p>
      </header>

      {/* Mensaje con efecto de tipeo */}
      <section style={{ textAlign: 'center', padding: '20px', marginTop: '50px' }}>
        <h2>Un mensaje desde el corazón</h2>
        <Typical
          steps={[
            'Espero que este día esté lleno de alegría... 🎉',
            1500,
            'Amor y momentos inolvidables... 💖',
            1500,
            'Eres una persona maravillosa ✨',
            1500,
            '¡Y mereces lo mejor hoy y siempre! 🎂',
            2000
          ]}
          loop={1}
          wrapper="p"
        />
      </section>

      {/* Zona central */}
      <div style={{ textAlign: 'center', marginTop: '40px', minHeight: '200px' }}>
        {!showCake ? (
          <button className="button" onClick={handleClick}>
            Toca para la magia 💖
          </button>
        ) : (
          <>
            <img src="cake.webp" alt="Pastel de cumpleaños" className="cake animated-cake" />
            {showMessage && (
              <div className="card-message">
                <p>
                Son pocas las personas que considero importantes para mi vida, y tú eres una de ellas 💫. <br />
                Gracias por ser tú… 💖 Eres una chava muy inteligente 📚 y que se esfuerza mucho con su carrera 💪. <br />
                Aunque haya momentos difíciles, tú no te rindes ✨, y eso lo aprecio muchísimo de ti. <br />
                Contigo todo es más divertido 😄💕. <br />
                Se que este pastel simbólico 🎂 pero te quiero desear un feliz cumpleaños 🥳🎉, que te la pases súper bien 🙌💝
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
