import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigContext } from '../context/ConfigContext';

export default function SeleccionCartas() {
  const { config, setConfig } = useContext(ConfigContext);
  const navigate = useNavigate();
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(config.cartas);

  useEffect(() => {
    const cargarModelos = async () => {
      try {
        const modelosDisponibles = [];
        const cantidadModelos = 3;
        
        for (let i = 1; i <= cantidadModelos; i++) {
          const modeloId = `modelo${i}`;
          
          try {
            const response = await fetch(`/assets/${modeloId}/info.json`);
            if (!response.ok) continue;
            
            const info = await response.json();
            
            modelosDisponibles.push({
              nombre: info.nombre,
              licencia: info.licencia,
              creador: info.creador,
              id: modeloId,
              previews: {
                C: `/assets/${modeloId}/1C.png`,
                D: `/assets/${modeloId}/1D.png`,
                E: `/assets/${modeloId}/1E.png`,
                T: `/assets/${modeloId}/1T.png`
              },
              reverso: `/assets/${modeloId}/reverso.png`
            });
          } catch (error) {
            console.error(`Error cargando modelo ${modeloId}:`, error);
          }
        }
        
        setModelos(modelosDisponibles);
      } catch (error) {
        console.error("Error cargando modelos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarModelos();
  }, []);

  const seleccionarModelo = (modeloId) => {
    setSelectedCard(modeloId);
    setConfig(prev => ({ ...prev, cartas: modeloId }));
    
    const cardElement = document.getElementById(`modelo-${modeloId}`);
    cardElement.classList.add('ring-purple-400', 'shadow-purple-glow');
    setTimeout(() => {
      cardElement.classList.remove('ring-purple-400', 'shadow-purple-glow');
    }, 1000);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mb-4"></div>
        <p className="text-purple-300 font-mono tracking-widest">CARGANDO MAZOS...</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden p-6">
      {/* Fondo con efecto de circuitos */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9InJnYmEoMTY3LDEzOSwyNTAsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
      </div>

      {/* Efecto de luz morada */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      {/* Efecto de grid futurista */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(167, 139, 250, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 139, 250, 0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Título con estilo de videojuego */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mt-5 mb-4 text-gray-100 text-stroke-purple font-game tracking-wider">
            SELECCIÓN DE CARTAS
          </h1>
          <p className="text-lg text-gray-400">
            {selectedCard ? (
              <span> 
                Diseño actual: <span className="text-purple-300 font-bold">{modelos.find(m => m.id === selectedCard)?.nombre}</span>
              </span>
            ) : "Selecciona un diseño"}
          </p>
        </div>
        
        {/* Grid de modelos estilo futurista */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {modelos.map((modelo) => (
            <div 
              id={`modelo-${modelo.id}`}
              key={modelo.id}
              onClick={() => seleccionarModelo(modelo.id)}
              className={`relative rounded-lg p-5 cursor-pointer transition-all duration-200 bg-gray-800/90 border-2 ${
                selectedCard === modelo.id 
                  ? 'border-purple-400 shadow-purple-glow' 
                  : 'border-gray-700 hover:border-purple-400'
              } group`}
            >
              {/* Nombre del modelo */}
              <h2 className={`text-xl font-bold mb-4 text-center ${
                selectedCard === modelo.id 
                  ? 'text-purple-400' 
                  : 'text-gray-200'
              } font-game`}>
                {modelo.nombre}
              </h2>
              
              {/* Efecto abanico de cartas */}
              <div className="relative h-40 mb-6 flex justify-center">
                {['C', 'D', 'E', 'T'].map((palo, i) => (
                  <div 
                    key={palo}
                    className="absolute"
                    style={{
                      transform: `rotate(${i * 6 - 9}deg) translateY(${i * -5}px)`,
                      left: `${i * 20 + 30}px`,
                      zIndex: i,
                      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
                    }}
                  >
                    <img 
                      src={modelo.previews[palo]} 
                      alt={`Carta 1${palo}`} 
                      className="w-20 h-32 object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              
              {/* Reverso con efecto */}
              <div className="flex justify-center mb-4">
                <div className="relative transition-transform group-hover:scale-110">
                  <img 
                    src={modelo.reverso} 
                    alt="Reverso" 
                    className="w-16 h-24 object-contain drop-shadow-lg"
                  />
                  {selectedCard === modelo.id && (
                    <div className="absolute -top-2 -right-2">
                      <div className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-purple-600 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botón de selección */}
              <div className="text-center mt-4">
                <button 
                  className={`px-5 py-2 rounded-md font-bold text-sm tracking-wide transition-all ${
                    selectedCard === modelo.id 
                      ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(167,139,250,0.7)]' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {selectedCard === modelo.id ? 'SELECCIONADO' : 'SELECCIONAR'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón Volver estilo videojuego */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/configuracion')}
            className="px-6 py-2.5 bg-gray-800 border-2 border-purple-400 rounded-md 
                      text-base font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-300
                      transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                      active:scale-100 flex items-center gap-2 mx-auto group relative overflow-hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            VOLVER A CONFIGURACIÓN
            <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-500 w-0 group-hover:w-full"></span>
          </button>
        </div>
      </div>

      {/* Efecto de esquinas decorativas */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-400" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-400" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-purple-400" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400" />

      {/* Efectos de luces LED */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.8)] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Estilos globales */}
      <style jsx global>{`
        @font-face {
          font-family: 'Game';
          src: url('/fonts/gamefont.woff2') format('woff2');
        }
        .font-game {
          font-family: 'Game', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .text-stroke-purple {
          text-shadow: 
            -1px -1px 0 #a78bfa,
            1px -1px 0 #a78bfa,
            -1px 1px 0 #a78bfa,
            1px 1px 0 #a78bfa;
        }
        .shadow-purple-glow {
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
        }
      `}</style>
    </div>
  );
}