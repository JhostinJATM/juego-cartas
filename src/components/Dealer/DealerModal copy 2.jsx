import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const DealerModal = ({ onComenzar }) => {
  const { config, actualizarPregunta } = useContext(ConfigContext);
  const [pregunta, setPregunta] = useState(config.preguntaUsuario || '');
  const [animationStep, setAnimationStep] = useState('entering'); // 'entering' | 'form-visible' | 'hiding-form' | 'moving-dealer' | 'shrinking-bg' | 'closing'
  const dealerImage = `/assets/dealer/${config.dealer}/preview.png`;

  useEffect(() => {
    if (config.preguntaUsuario) {
      onComenzar();
    }
  }, [config.preguntaUsuario, onComenzar]);

  useEffect(() => {
    setAnimationStep('entering');
    const timer = setTimeout(() => {
      setAnimationStep('form-visible');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    // Paso 1: Ocultar el formulario
    setAnimationStep('hiding-form');
    
    // Paso 2: Mover el dealer al centro
    setTimeout(() => {
      setAnimationStep('moving-dealer');
      
      // Paso 3: Contraer el fondo
      setTimeout(() => {
        setAnimationStep('shrinking-bg');
        actualizarPregunta(pregunta);
        
        // Paso 4: Cerrar completamente
        setTimeout(() => {
          setAnimationStep('closing');
          onComenzar();
        }, 800);
      }, 600);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo animado con contracción */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ 
          clipPath: 
            animationStep === 'entering' ? 'circle(150% at 50% 50%)' :
            animationStep === 'shrinking-bg' ? 'circle(30% at 50% 50%)' :
            animationStep === 'closing' ? 'circle(0% at 50% 50%)' :
            'circle(150% at 50% 50%)'
        }}
        transition={{ 
          duration: 1.2,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />

      {/* Contenido principal */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dealer */}
        <motion.div
          initial={{ scale: 1.5, opacity: 0, x: 0 }}
          animate={{ 
            scale: 
              animationStep === 'entering' ? 1.5 :
              animationStep === 'moving-dealer' || animationStep === 'shrinking-bg' ? 1.2 : 1,
            opacity: 1,
            x: 
              animationStep === 'form-visible' ? -250 :
              animationStep === 'moving-dealer' || animationStep === 'shrinking-bg' || animationStep === 'closing' ? 0 : 0
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

        {/* Modal de pregunta */}
        <AnimatePresence>
          {(animationStep === 'form-visible' || animationStep === 'hiding-form') && (
            <motion.div
              key="modal-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: animationStep === 'form-visible' ? 1 : 0,
                x: animationStep === 'form-visible' ? 0 : 50
              }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 ml-48"
            >
              <div className="bg-gray-800 border-2 border-purple-500/30 p-6 rounded-lg max-w-md w-full mx-4 shadow-[0_0_25px_rgba(167,139,250,0.5)]">
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
                      autoFocus
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};