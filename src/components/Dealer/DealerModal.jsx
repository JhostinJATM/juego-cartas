import { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const DealerModal = ({ onComenzar }) => {
  const { config, actualizarPregunta } = useContext(ConfigContext);
  const [pregunta, setPregunta] = useState(config.preguntaUsuario || '');

  useEffect(() => {
    if (config.preguntaUsuario) {
      onComenzar();
    }
  }, [config.preguntaUsuario, onComenzar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pregunta.trim()) {
      actualizarPregunta(pregunta);
      onComenzar();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 border-2 p-6 rounded-lg max-w-md w-full mx-4 shadow-[0_0_20px_rgba(167,139,250,0.3)]">
        <h2 className="text-2xl font-bold mb-6 text-purple-400 font-game tracking-wider text-center">
          ¿QUÉ QUIERES ADIVINAR?
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="w-full bg-gray-700 border-2 border-gray-600 text-gray-100 p-3 rounded-md 
                        focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500
                        placeholder-gray-400 transition-all duration-200"
              placeholder="Escribe tu pregunta aquí..."
              required
              minLength={3}
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-500 w-0 focus-within:w-full"></div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md 
                      hover:bg-purple-700 hover:border-purple-400 border-2 border-transparent
                      transition-all duration-200 font-game tracking-wider text-lg
                      flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">◆</span>
            COMENZAR
            <span className="group-hover:scale-110 transition-transform">◆</span>
          </button>
        </form>
      </div>
    </div>
  );
};