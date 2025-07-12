import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Fondo con efecto de circuitos/tecnología */}
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

      {/* Logo principal con estilo de videojuego */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-bold mb-12 text-center font-game">
        <span className="text-gray-100 text-stroke-purple">EL</span>
        <span className="text-purple-400 mx-2 animate-pulse">◆</span>
        <span className="text-gray-100 text-stroke-purple">HORÁCULO</span>
      </h1>

      {/* Menú de botones estilo videojuego */}
      <div className="relative z-10 flex flex-col gap-5 w-full max-w-md">
        <button 
          onClick={() => navigate('/juego')}
          className="px-8 py-4 bg-gray-800 border-2 border-purple-500 rounded-lg 
                    text-xl font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400 hover:text-white
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                    active:scale-100 flex items-center justify-center gap-3 shadow-lg group relative overflow-hidden"
        >
          <span className="text-purple-400 group-hover:text-purple-300 transition-colors">▶</span> 
          <span>JUGAR</span>
          <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-500 w-0 group-hover:w-full"></span>
        </button>
        
        <button 
          onClick={() => navigate('/configuracion')}
          className="px-8 py-4 bg-gray-800 border-2 border-purple-500 rounded-lg 
                    text-xl font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400 hover:text-white
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                    active:scale-100 flex items-center justify-center gap-3 shadow-lg group relative overflow-hidden"
        >
          <span className="text-purple-400 group-hover:text-purple-300 transition-colors">⚙</span> 
          <span>CONFIGURACIÓN</span>
          <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-500 w-0 group-hover:w-full"></span>
        </button>
        
        <button 
          onClick={() => navigate('/licencias')}
          className="px-8 py-4 bg-gray-800 border-2 border-purple-500 rounded-lg 
                    text-xl font-bold text-gray-100 hover:bg-gray-700 hover:border-purple-400 hover:text-white
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]
                    active:scale-100 flex items-center justify-center gap-3 shadow-lg group relative overflow-hidden"
        >
          <span className="text-purple-400 group-hover:text-purple-300 transition-colors">ℹ</span> 
          <span>LICENCIAS</span>
          <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-500 w-0 group-hover:w-full"></span>
        </button>
      </div>

      {/* Efecto de esquinas decorativas estilo tecnológico */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-400" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-400" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-400" />

      {/* Texto de copyright */}
      <div className="absolute bottom-4 text-gray-400 text-sm font-mono">
        © {new Date().getFullYear()} El Horáculo v1.0.0
      </div>

      {/* Efectos de luces LED */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.8)] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-2/3 left-1/3 w-0.5 h-0.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.8)] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Estilos personalizados */}
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
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}