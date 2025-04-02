import React, { useState } from 'react';
import Typical from 'react-typical';
import confetti from 'canvas-confetti';

function launchConfetti() {
  const heart = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA3MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYuNDAxMiAwQzcuMzI1NzkgMCAwIDcuNDc0NDEgMCAxNi42NjU4QzAgMjYuNzYxNCAxMC4zNDIzIDM1LjM4MjcgMzQuNzUgNTkuNEM1OS42NTcgMzYuNDg2MSA3MCAyNi42NzY2IDcwIDE2LjY2NThDNzAgNy40NzQ0MSA2Mi42NzQyIDAgNTMuNTk4OCAwQzQ2LjM1MjQgMCAzOS43NzU4IDQuNDMyMjkgMzUuODQzNSA5LjYzMTVDMzEuOTM4MiA0LjQzMjI5IDI1LjM2MjQgMCAxNi40MDEyIDBaIiBmaWxsPSIjZmY2Njk5Ii8+PC9zdmc+';
  const flower = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZjk5OWZmIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4NiAyNDBjMC0zMS44LTE2LjMtNjAuMy00MC0xMC4zLTIuNi02LjktNC40LTEzLjctNC40LTIxLjMgMC0zNiAxNS4yLTcwIDQxLjUtOTQgNC4yLTQuMiA5LjItOC41IDE0LjQtMTIgMC0yMC44LTQuNS0zOS45LTEyLjYtNTcuNC00MC42LTMwLjMtODguMy0yOS44LTEyOC43LjQtNC4yLTguOS05LjMtMTQuNC0xMi42LTE5LjMtMTEuMy00NS4xLTExLjMtNjQuNSAwdjJjLTUuNiAzLjMtMTAuMiA4LjQtMTQuNCAxMi42LTQwLjQgLTQuMi04OC4xLTMuOS0xMjguNyAwLTgwIDI3LjgtMTM2LjggMTE4LjItMTM2LjggMjA2IDAgNy42LS4xIDE1LjQgLjYgMjMuMSAyOC44LTIuMiA1Ni43LTIuMiA4NS41IDBjLTIyLjEtMzAuNS0zNS42LTY3LjYtMzUuNi0xMDYuNCAwLTEwMi44IDg0LjUtMTg2LjggMTg4LjgtMTg2LjggMTA0LjQgMCAxODguOSA4NC4xIDE4OC45IDE4Ni44IDAgMzgxLjgtMzguOSA2NjAuOC03Mi42IDY2MC44LTUwLjggMC04NS43LTY1LjUtODUuNy0xMjguOHoiLz48L3N2Zz4=';

  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.position = 'fixed';
  canvas.style.pointerEvents = 'none';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  const duration = 3 * 1000;
  const end = Date.now() + duration;

  const colors = ['#ff6699', '#66ccff', '#ffcc00', '#cc99ff'];

  (function frame() {
    myConfetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 }, 
      colors,
    });
    
    myConfetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 }, 
      colors,
    });
    

    // Corazones
    myConfetti({
      particleCount: 4,
      angle: 90,
      spread: 90,
      origin: { y: 0.75 }, 
      shapes: ['image'],
      image: {
        src: heart,
        width: 25,
        height: 25
      }
    });
    

    // Flores
    myConfetti({
      particleCount: 4,
      angle: 90,
      spread: 90,
      origin: { y: 0.75 },
      shapes: ['image'],
      image: {
        src: flower,
        width: 25,
        height: 25
      }
    });
    

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      // Limpia el canvas después
      setTimeout(() => document.body.removeChild(canvas), 5000);
    }
  })();
}


function App() {
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const handleClick = () => {
    launchConfetti();
    setShowCake(true);
    setTimeout(() => setShowMessage(true), 1000); // Mensaje aparece después de 1s
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

      {/* Audio de fondo */}
      <audio src="instrumental-piano.mp3" autoPlay loop hidden></audio>

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
                  Gracias por ser tú. 🎀 Este pastel es simbólico, pero el cariño que siento es real.  
                  <br />¡Feliz cumple, Marisol! 💝
                </p>
              </div>
            )}
          </>
        )}

        {showMessage && (
          <div className="surprise-container">
            <button className="surprise-button" onClick={() => setShowGift(true)}>
              🎁 Abre tu regalo
            </button>
          </div>
        )}
        {showGift && (
          <div className="gift-reveal">
            <p>✨ Aquí va algo muy especial para ti...</p>
            <iframe
            width="300"
            height="170"
            src="https://www.youtube.com/watch?v=7maJOI3QMu0&ab_channel=YirumaVEVO"
            title="Regalo musical"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
