import { useNavigate } from 'react-router-dom';

export default function Configuracion() {
  const navigate = useNavigate();

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
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Título con estilo de videojuego */}
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-100 text-stroke-purple font-game tracking-wider">
          CONFIGURACIÓN
        </h1>

        {/* Tarjetas de opciones estilo futurista */}
        <div className="space-y-5">
          {/* Opción Cartas */}
          <div
            onClick={() => navigate('/configuracion/cartas')}
            className="p-5 bg-gray-800/90 border-2 border-purple-500 rounded-lg cursor-pointer 
                      hover:border-purple-400 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)]
                      transition-all duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-900/80 p-3 rounded-lg group-hover:bg-purple-700 transition-colors shadow-md">
                <span className="text-xl text-purple-300 group-hover:text-purple-200 transition-colors">🂠</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-100 group-hover:text-purple-300 transition-colors">
                  Diseño de Cartas
                </h2>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors text-sm">
                  Personaliza el aspecto de las cartas del juego
                </p>
              </div>
              <div className="ml-auto text-xl text-gray-500 group-hover:text-purple-400 transition-colors">
                →
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 w-0 group-hover:w-full"></div>
          </div>

          {/* Opción Tablero */}
          <div
            onClick={() => navigate('/configuracion/tablero')}
            className="p-5 bg-gray-800/90 border-2 border-purple-500 rounded-lg cursor-pointer 
                      hover:border-purple-400 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)]
                      transition-all duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-900/80 p-3 rounded-lg group-hover:bg-purple-700 transition-colors shadow-md">
                <span className="text-xl text-purple-300 group-hover:text-purple-200 transition-colors">🃁</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-100 group-hover:text-purple-300 transition-colors">
                  Diseño de Tablero
                </h2>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors text-sm">
                  Cambia el fondo y estilo del tablero de juego
                </p>
              </div>
              <div className="ml-auto text-xl text-gray-500 group-hover:text-purple-400 transition-colors">
                →
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 w-0 group-hover:w-full"></div>
          </div>

          {/* Opción Dealer (deshabilitada) */}
          <div
            onClick={() => navigate('/configuracion/dealer')}
            className="p-5 bg-gray-800/90 border-2 border-purple-500 rounded-lg cursor-pointer 
            hover:border-purple-400 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)]
            transition-all duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-900/80 p-3 rounded-lg group-hover:bg-purple-700 transition-colors shadow-md">
                <span className="text-xl text-purple-300 group-hover:text-purple-200 transition-colors">🃏</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-100 group-hover:text-purple-300 transition-colors">
                  Diseño de Dealer
                </h2>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors text-sm">
                  Personaliza al dealer Joker
                </p>
              </div>
              <div className="ml-auto text-xl text-gray-500 group-hover:text-purple-400 transition-colors">
                →
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 w-0 group-hover:w-full"></div>
          </div>
        </div>

        {/* Botón Volver estilo videojuego */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-5 py-2.5 bg-gray-800 border-2 border-purple-500 rounded-md 
                    text-base font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_10px_rgba(167,139,250,0.5)]
                    active:scale-100 flex items-center gap-2 mx-auto group relative overflow-hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          VOLVER AL INICIO
          <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full"></span>
        </button>
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