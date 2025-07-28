import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Inicio from './pages/Inicio';
import Juego from './pages/Juego';
import Configuracion from './pages/Configuracion';
import Licencias from './pages/Licencias';
import SeleccionCartas from './pages/SeleccionCartas';
import SeleccionTablero from './pages/SeleccionTablero';

function App() {

  useEffect(() => {




    return () => {
      // Limpieza al desmontar
    };
  }, []);

  return (
    <Router>
      {/* Componente de audio oculto (opcional, para compatibilidad) */}
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/configuracion/cartas" element={<SeleccionCartas />} />
        <Route path="/configuracion/tablero" element={<SeleccionTablero />} />
        <Route path="/licencias" element={<Licencias />} />
      </Routes>
    </Router>
  );
}

export default App;