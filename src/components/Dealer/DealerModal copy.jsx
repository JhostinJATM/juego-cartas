import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState, useEffect } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const DealerModal = ({ onComenzar }) => {
  const { config, actualizarPregunta } = useContext(ConfigContext);
  const [localPregunta, setLocalPregunta] = useState(''); // Estado local independiente
  const [phase, setPhase] = useState('entering'); // 'entering' | 'interacting' | 'exiting'

  const dealerImage = `/assets/dealer/${config.dealer}/preview.png`;

  // Resetear al montar
  useEffect(() => {
    setLocalPregunta('');
    setPhase('entering');
    
    const timer = setTimeout(() => {
      setPhase('interacting');
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localPregunta.trim()) {
      setPhase('exiting');
      actualizarPregunta(localPregunta); // Guardar en contexto
      
      setTimeout(() => {
        onComenzar();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ 
          clipPath: phase === 'exiting' ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)' 
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Contenido principal - se oculta durante exit */}
      {phase !== 'exiting' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Dealer - única instancia */}
          <motion.div
            initial={{ scale: 1.5, x: 0 }}
            animate={{ 
              scale: 1,
              x: phase === 'interacting' ? -250 : 0
            }}
            transition={{ 
              duration: 0.8,
              ease: 'easeInOut',
              delay: phase === 'entering' ? 1.2 : 0
            }}
            className="absolute z-10"
          >
            <img 
              src={dealerImage} 
              alt="Dealer"
              className="w-40 h-60 md:w-48 md:h-72 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Modal - solo en interacting */}
          {phase === 'interacting' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 ml-48"
            >
              <div className="bg-gray-800 border-2 border-purple-500 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-purple-400 text-center">
                  ¿QUÉ QUIERES ADIVINAR?
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={localPregunta}
                    onChange={(e) => setLocalPregunta(e.target.value)}
                    className="w-full bg-gray-700 border-2 border-gray-600 text-gray-100 p-3 rounded-md mb-6"
                    placeholder="Escribe tu pregunta aquí..."
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-md"
                  >
                    COMENZAR
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Animación de salida - dealer vuelve al centro */}
      <AnimatePresence>
        {phase === 'exiting' && (
          <motion.div
            initial={{ x: -250, scale: 1 }}
            animate={{ x: 0, scale: 1.2 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <img 
              src={dealerImage} 
              alt="Dealer"
              className="w-40 h-60 md:w-48 md:h-72 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


