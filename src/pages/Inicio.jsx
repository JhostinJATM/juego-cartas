import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    // Crear y configurar el audio
    const audioInicio = new Audio('/public/assets/sound/inicio.mp3');
    audioInicio.loop = true;
    // audioInicio.volume = 0.3; // Volumen al 30% para que no sea muy fuerte

    // Intentar reproducir el audio
    const playAudio = () => {
      audioInicio.play().catch(e => {
        console.log("Reproducción automática bloqueada:", e);
        // Mostrar instrucción al usuario si falla
      });
    };

    // Los navegadores pueden requerir interacción del usuario
    const handleFirstInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleFirstInteraction);
    };

    // Agregar listener para el primer clic
    document.addEventListener('click', handleFirstInteraction);

    // Limpieza al desmontar el componente
    return () => {
      audioInicio.pause();
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">El Horáculo</h1>
      
      <div className="flex flex-col gap-4 w-64">
        <button 
          onClick={() => navigate('/juego')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Jugar
        </button>
        
        <button 
          onClick={() => navigate('/configuracion')}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Configuraciones
        </button>
        
        <button 
          onClick={() => navigate('/licencias')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Licencias
        </button>
      </div>
    </div>
  );
}