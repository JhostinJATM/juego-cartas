import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Inicio from './pages/Inicio';
import Juego from './pages/Juego';
import Configuracion from './pages/Configuracion';
import Licencias from './pages/Licencias';
import SeleccionCartas from './pages/SeleccionCartas';
import SeleccionTablero from './pages/SeleccionTablero';
import SeleccionarDealer from './pages/SeleccionDealer';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Inicializar el audio
    audioRef.current = new Audio('/assets/sound/musica_ambiente.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Ajusta el volumen según necesites

    // Manejar la reproducción (con captura de errores por políticas de autoplay)
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay bloqueado:', err);
        // Puedes agregar un botón de "Activar sonido" en tu interfaz
      }
    };

    // Intenta reproducir cuando el usuario interactúa con la página
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      // Limpieza al desmontar
      if (audioRef.current) {
        audioRef.current.pause();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };
  }, []);

  return (
    <Router>
      {/* Componente de audio oculto (opcional, para compatibilidad) */}
      <div style={{ display: 'none' }}>
        <audio 
          ref={audioRef} 
          loop 
          controls={false}
        >
          <source src="/assets/sound/musica_ambiente.mp3" type="audio/mpeg" />
        </audio>
      </div>
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/configuracion/cartas" element={<SeleccionCartas />} />
        <Route path="/configuracion/tablero" element={<SeleccionTablero />} />
        <Route path="/licencias" element={<Licencias />} />
        <Route path="/configuracion/dealer" element={<SeleccionarDealer />} />
      </Routes>
    </Router>
  );
}

export default App;