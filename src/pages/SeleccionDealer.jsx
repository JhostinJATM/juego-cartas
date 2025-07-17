import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigContext } from '../context/ConfigContext';

export default function SeleccionDealer() {
  const { config, setConfig } = useContext(ConfigContext);
  const navigate = useNavigate();
  const [dealerOptions, setDealerOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDealer, setSelectedDealer] = useState(config.dealer);

  useEffect(() => {
    const cargarDealers = async () => {
      try {
        const dealersDisponibles = [];
        const cantidadDealers = 3; // Ajusta según cuantos tengas
        
        for (let i = 1; i <= cantidadDealers; i++) {
          const dealerId = `joker${i}`;
          
          try {
            const response = await fetch(`/assets/dealer/${dealerId}/info.json`);
            if (!response.ok) continue;
            
            const info = await response.json();
            
            dealersDisponibles.push({
              nombre: info.nombre,
              id: dealerId,
              imagen: `/assets/dealer/${dealerId}/preview.png`,
              animacion: info.animacion || false
            });
          } catch (error) {
            console.error(`Error cargando dealer ${dealerId}:`, error);
          }
        }
        
        setDealerOptions(dealersDisponibles);
      } catch (error) {
        console.error("Error cargando dealers:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDealers();
  }, []);

  const seleccionarDealer = (dealerId) => {
    setSelectedDealer(dealerId);
    setConfig(prev => ({ ...prev, dealer: dealerId }));
    
    const dealerElement = document.getElementById(`dealer-${dealerId}`);
    dealerElement.classList.add('ring-purple-400', 'shadow-purple-glow');
    setTimeout(() => {
      dealerElement.classList.remove('ring-purple-400', 'shadow-purple-glow');
    }, 1000);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mb-4"></div>
        <p className="text-purple-300 font-mono tracking-widest">CARGANDO DEALERS...</p>
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

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mt-5 mb-4 text-gray-100 text-stroke-purple font-game tracking-wider">
            SELECCIÓN DE DEALER
          </h1>
          <p className="text-lg text-gray-400">
            {selectedDealer ? (
              <span> 
                Dealer actual: <span className="text-purple-300 font-bold">
                  {dealerOptions.find(d => d.id === selectedDealer)?.nombre || "Joker"}
                </span>
              </span>
            ) : "Selecciona un dealer"}
          </p>
        </div>
        
        {/* Grid de dealers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealerOptions.map((dealer) => (
            <div 
              id={`dealer-${dealer.id}`}
              key={dealer.id}
              onClick={() => seleccionarDealer(dealer.id)}
              className={`relative rounded-lg p-5 cursor-pointer transition-all duration-200 bg-gray-800/90 border-2 ${
                selectedDealer === dealer.id 
                  ? 'border-purple-400 shadow-purple-glow' 
                  : 'border-gray-700 hover:border-purple-400'
              } group`}
            >
              {/* Nombre del dealer */}
              <h2 className={`text-xl font-bold mb-4 text-center ${
                selectedDealer === dealer.id 
                  ? 'text-purple-400' 
                  : 'text-gray-200'
              } font-game`}>
                {dealer.nombre}
              </h2>
              
              {/* Imagen del dealer */}
              <div className="relative h-64 mb-6 flex justify-center">
                <img 
                  src={dealer.imagen} 
                  alt={dealer.nombre}
                  className={`w-full h-full object-contain transition-transform ${
                    dealer.animacion ? 'group-hover:animate-pulse' : 'group-hover:scale-105'
                  }`}
                />
              </div>
              
              {/* Botón de selección */}
              <div className="text-center">
                <button 
                  className={`px-5 py-2 rounded-md font-bold text-sm tracking-wide transition-all ${
                    selectedDealer === dealer.id 
                      ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(167,139,250,0.7)]' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {selectedDealer === dealer.id ? 'SELECCIONADO' : 'SELECCIONAR'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón Volver */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/configuracion')}
            className="px-6 py-2.5 bg-gray-800 border-2 border-purple-500 rounded-md 
                      text-base font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400
                      transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                      active:scale-100 flex items-center gap-2 mx-auto group relative overflow-hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            VOLVER A CONFIGURACIÓN
          </button>
        </div>
      </div>

      {/* Efectos decorativos (igual que en los otros componentes) */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-400" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-400" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-purple-400" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400" />

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