import { useEffect } from "react";
import Tablero from "../components/Tablero/Tablero";

export default function Juego() {
  useEffect(() => {
    // Crear y configurar el audio
    const audioAmbiente = new Audio('/assets/sound/musica_ambiente.mp3');
    audioAmbiente.loop = true;
    audioAmbiente.volume = 0.1; // Volumen al 50% para que no sea muy intrusivo

    // Reproducir el audio y manejar posibles errores
    audioAmbiente.play().catch(e => {
      console.log("Reproducción automática bloqueada:", e);
      // Opcional: Mostrar un botón para permitir la reproducción
    });

    // Limpieza al desmontar el componente
    return () => {
      audioAmbiente.pause();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Tablero />
    </div>
  );
}