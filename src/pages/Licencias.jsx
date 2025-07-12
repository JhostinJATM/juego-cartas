import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Licencias() {
  const navigate = useNavigate();
  const [mazos, setMazos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarMazos = async () => {
      try {
        const mazosDisponibles = [];
        const cantidadMazos = 3;
        
        for (let i = 1; i <= cantidadMazos; i++) {
          const modeloId = `modelo${i}`;
          
          try {
            const response = await fetch(`/assets/${modeloId}/info.json`);
            if (!response.ok) continue;
            
            const info = await response.json();
            
            mazosDisponibles.push({
              id: modeloId,
              nombre: info.nombre,
              licencia: info.licencia,
              creador: info.creador
            });
          } catch (error) {
            console.error(`Error cargando mazo ${modeloId}:`, error);
          }
        }
        
        setMazos(mazosDisponibles);
      } catch (error) {
        console.error("Error cargando mazos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarMazos();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mb-4"></div>
        <p className="text-purple-300 font-mono tracking-widest">CARGANDO LICENCIAS...</p>
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
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Título con estilo de videojuego */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100 text-stroke-purple font-game tracking-wider">
            LICENCIAS Y CRÉDITOS
          </h1>
          <p className="text-lg text-gray-400">
            Información sobre los mazos de cartas utilizados
          </p>
        </div>
        
        {/* Lista de mazos */}
        <div className="space-y-6">
          {mazos.map((mazo) => (
            <div 
              key={mazo.id}
              className="p-6 bg-gray-800/90 border-2 border-purple-500 rounded-lg backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-2 font-game">
                {mazo.nombre}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Licencia</h3>
                  <p className="text-gray-200">{mazo.licencia}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Creador</h3>
                  <a 
                    href={mazo.creador} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors break-all"
                  >
                    {mazo.creador}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón Volver estilo videojuego */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-gray-800 border-2 border-purple-500 rounded-md 
                      text-base font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400
                      transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                      active:scale-100 flex items-center gap-2 mx-auto group relative overflow-hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            VOLVER AL INICIO
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
      `}</style>
    </div>
  );
}