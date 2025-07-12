import { useState, useContext, useEffect } from "react";
import Tablero from "../components/Tablero/Tablero";
import { DealerModal } from "../components/Dealer/DealerModal";
import { ResultadoModal } from "../components/Dealer/ResultadoModal";
import { ConfigContext } from "../context/ConfigContext";

export default function Juego() {
  const { config, actualizarResultadoJuego, reiniciarJuego } = useContext(ConfigContext);
  const [mostrarDealerModal, setMostrarDealerModal] = useState(false);
  const [mostrarResultadoModal, setMostrarResultadoModal] = useState(false);
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    if (!inicializado) {
      reiniciarJuego();
      setMostrarDealerModal(true);
      setInicializado(true);
      
      const audioAmbiente = new Audio('/assets/sound/musica_ambiente.mp3');
      audioAmbiente.loop = true;
      audioAmbiente.volume = 0.1;
      audioAmbiente.play().catch(e => console.log("Error de audio:", e));

      return () => audioAmbiente.pause();
    }
  }, [reiniciarJuego, inicializado]);

  const manejarComenzar = () => {
    setMostrarDealerModal(false);
  };

  const verificarResultado = (cartas) => {
    const todasVolteadas = cartas.every(c => c.volteado);
    actualizarResultadoJuego(todasVolteadas ? 'ganado' : 'perdido');
    setMostrarResultadoModal(true);
  };

  return (
    <div className="min-h-screen relative">
      <Tablero onJuegoTerminado={verificarResultado} />
      
      {mostrarDealerModal && (
        <DealerModal onComenzar={manejarComenzar} />
      )}
      
      {mostrarResultadoModal && (
        <ResultadoModal onCerrar={() => setMostrarResultadoModal(false)} />
      )}
    </div>
  );
}