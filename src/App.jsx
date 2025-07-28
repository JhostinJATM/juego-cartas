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
    // Crear la instancia del audio
    audioRef.current = new Audio('/assets/sound/musica_ambiente.mp3');
    audioRef.current.loop = true;          // Loop infinito
    audioRef.current.volume = 0.3;         // Volumen ajustado

    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay bloqueado:', err);
        // Aquí puedes mostrar un botón para activar sonido manualmente
      }
    };

    // Handler que se ejecuta con la primera interacción del usuario
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    // Escuchar la primera interacción para activar el audio
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      // Limpiar cuando el componente se desmonte
      if (audioRef.current) {
        audioRef.current.pause();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };
  }, []);

  return (
    <Router>
      {/* Ya no hay audio oculto en JSX */}
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