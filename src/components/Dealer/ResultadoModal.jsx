import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const ResultadoModal = ({ onCerrar }) => {
  const { config, reiniciarJuego } = useContext(ConfigContext);
  const [animationStep, setAnimationStep] = useState('entering'); // 'entering' | 'content-visible' | 'closing'
  const dealerImage = `/assets/dealer/${config.dealer}/preview.png`;

  useEffect(() => {
    setAnimationStep('entering');
    const timer = setTimeout(() => {
      setAnimationStep('content-visible');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleVolverAJugar = () => {
    setAnimationStep('closing');
    const configActual = { ...config };
    setTimeout(() => {
      reiniciarJuego();
      localStorage.setItem('gameConfig', JSON.stringify({
        ...configActual,
        juegoTerminado: false,
        resultadoJuego: null,
        preguntaUsuario: ''
      }));
      window.location.reload();
    }, 800);
  };

  const handleIrAlInicio = () => {
    setAnimationStep('closing');
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  };

  const handleCerrar = () => {
    setAnimationStep('closing');
    setTimeout(() => {
      onCerrar();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ 
          clipPath: 
            animationStep === 'entering' ? 'circle(150% at 50% 50%)' :
            animationStep === 'closing' ? 'circle(0% at 50% 50%)' :
            'circle(150% at 50% 50%)'
        }}
        transition={{ 
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />

      {/* Contenido principal */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dealer */}
        <motion.div
          initial={{ scale: 1.5, opacity: 0, x: 0 }}
          animate={{ 
            scale: animationStep === 'entering' ? 1.5 : 1,
            opacity: 1,
            x: animationStep === 'content-visible' ? -250 : 0
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="absolute z-10"
        >
          <img 
            src={dealerImage} 
            alt="Dealer"
            className="w-40 h-60 md:w-48 md:h-72 object-contain drop-shadow-[0_0_20px_rgba(167,139,250,0.7)]"
          />
        </motion.div>

        {/* Contenido del modal */}
        <AnimatePresence>
          {animationStep === 'content-visible' && (
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1,
                x: 0
              }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 ml-48"
            >
              <div className="bg-gray-800 border-2 border-purple-500/30 p-6 rounded-lg max-w-md w-full mx-4 shadow-[0_0_25px_rgba(167,139,250,0.5)]">
                <h2 className="text-3xl font-bold mb-4 text-purple-400 font-game tracking-wider">
                  {config.resultadoJuego === 'ganado' ? '¡HAS GANADO!' : '¡HAS PERDIDO!'}
                </h2>
                
                <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <p className="text-gray-300 mb-2">Tu pregunta fue:</p>
                  <p className="text-gray-100 font-medium italic">"{config.preguntaUsuario}"</p>
                </div>

                <div className="mb-6">
                  <p className={`text-xl font-game ${config.resultadoJuego === 'ganado' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {config.resultadoJuego === 'ganado' 
                      ? '¡ESTÁS CON SUERTE!' 
                      : 'LAMENTABLEMENTE NO...'}
                  </p>
                  {config.resultadoJuego === 'ganado' && (
                    <p className="text-gray-300 mt-2">El oráculo ha respondido a tu pregunta</p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleVolverAJugar}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md 
                              hover:bg-purple-700 hover:border-purple-400 border-2 border-transparent
                              transition-all duration-200 font-game tracking-wider group"
                  >
                    <span className="group-hover:scale-110 transition-transform inline-block mr-2">◆</span>
                    VOLVER A JUGAR
                    <span className="group-hover:scale-110 transition-transform inline-block ml-2">◆</span>
                  </button>

                  <button
                    onClick={handleIrAlInicio}
                    className="w-full bg-gray-700 text-gray-100 py-2 px-4 rounded-md 
                              hover:bg-gray-600 hover:border-gray-500 border-2 border-transparent
                              transition-all duration-200 font-game tracking-wider"
                  >
                    IR AL INICIO
                  </button>

                  <button
                    onClick={handleCerrar}
                    className="w-full bg-transparent text-purple-400 py-2 px-4 rounded-md 
                              hover:text-purple-300 hover:border-purple-400 border-2 border-gray-700
                              transition-all duration-200 font-game tracking-wider"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};