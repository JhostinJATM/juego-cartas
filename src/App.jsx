import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Juego from './pages/Juego';
import Configuracion from './pages/Configuracion';
import Licencias from './pages/Licencias';
import SeleccionCartas from './pages/SeleccionCartas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/configuracion/cartas" element={<SeleccionCartas />} />
        <Route path="/licencias" element={<Licencias />} />
      </Routes>
    </Router>
  );
}

export default App;