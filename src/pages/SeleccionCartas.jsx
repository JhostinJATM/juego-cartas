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
            const response = await fetch(`/assets/${modeloId}/nombre.txt`);
            if (!response.ok) continue;
            
            const nombre = await response.text();
            
            modelosDisponibles.push({
              nombre: nombre.trim(),
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
    
    // Animación de confirmación
    const cardElement = document.getElementById(`modelo-${modeloId}`);
    cardElement.classList.add('animate-pulse');
    setTimeout(() => cardElement.classList.remove('animate-pulse'), 1000);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Elige tu diseño de cartas</h1>
          <p className="text-lg text-indigo-700">
            {selectedCard ? `Diseño actual: ${modelos.find(m => m.id === selectedCard)?.nombre}` : "Selecciona un diseño"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modelos.map((modelo) => (
            <div 
              id={`modelo-${modelo.id}`}
              key={modelo.id}
              onClick={() => seleccionarModelo(modelo.id)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                selectedCard === modelo.id 
                  ? 'ring-4 ring-blue-500 bg-white shadow-xl' 
                  : 'bg-white/90 hover:bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <h2 className={`text-2xl font-bold mb-6 text-center transition-colors ${
                selectedCard === modelo.id ? 'text-blue-600' : 'text-gray-800'
              }`}>
                {modelo.nombre}
              </h2>
              
              {/* Efecto abanico de cartas (sin hover) */}
              <div className="relative h-48 mb-8 flex justify-center">
                {['C', 'D', 'E', 'T'].map((palo, i) => (
                  <div 
                    key={palo}
                    className="absolute"
                    style={{
                      transform: `rotate(${i * 6 - 9}deg) translateY(${i * -5}px)`,
                      left: `${i * 20 + 30}px`
                    }}
                  >
                    <img 
                      src={modelo.previews[palo]} 
                      alt={`Carta 1${palo}`} 
                      className="w-24 h-36 object-contain drop-shadow-lg"
                    />
                  </div>
                ))}
              </div>
              
              {/* Reverso */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src={modelo.reverso} 
                    alt="Reverso" 
                    className="w-20 h-28 object-contain drop-shadow-lg"
                  />
                  {selectedCard === modelo.id && (
                    <div className="absolute -top-2 -right-2">
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCard === modelo.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selectedCard === modelo.id ? 'Seleccionado' : 'Seleccionar'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/configuracion')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a Configuración
          </button>
        </div>
      </div>
    </div>
  );
}