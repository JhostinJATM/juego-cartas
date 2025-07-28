import Carta from '../Carta/Carta';

const GamePanel = ({ cartas }) => {
  const cartasVolteadasPorValor = {};
  cartas.forEach(carta => {
    if (carta.volteado && carta.posicion) {
      cartasVolteadasPorValor[carta.valor] = (cartasVolteadasPorValor[carta.valor] || 0) + 1;
    }
  });

  const getProgressColor = (count) => {
    if (count === 4) return 'bg-gradient-to-r from-green-400 to-emerald-600';
    if (count >= 2) return 'bg-gradient-to-r from-yellow-400 to-amber-600';
    return 'bg-gradient-to-r from-red-500 to-red-700';
  };

  return (
    <div className="h-full p-2">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl shadow-red-900/30 h-full flex flex-col border border-red-900/50">
        <h2 className="text-lg font-bold mb-2 text-center text-red-400 drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]">
          PROGRESO
        </h2>
        
        <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(valor => {
            const count = cartasVolteadasPorValor[valor] || 0;
            const isComplete = count === 4;
            
            return (
              <div 
                key={valor} 
                className={`flex items-start p-1.5 rounded-md transition-all duration-150 ${
                  isComplete 
                    ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/30 border border-emerald-500/30' 
                    : 'bg-gray-800/50 border border-gray-700/50 hover:border-red-500/30'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-auto mr-2"> 
                  <Carta 
                    valor={valor} 
                    palo="C" 
                    small 
                    voltear={true}
                    className="w-full h-auto drop-shadow-sm" 
                  />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center h-full space-y-1"> {/* Added justify-center */}
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-mono ${
                      isComplete ? 'text-emerald-300' : 'text-gray-400'
                    }`}>
                      {valor}
                    </span>
                    <span className={`text-xs font-bold ${
                      isComplete ? 'text-emerald-300' : count > 0 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {count}/4
                    </span>
                  </div>
                  
                  <div className="ml-9 flex justify-center items-center h-4"> {/* Nuevo contenedor centrado */}
                    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(count)} transition-all duration-200 ease-out`}
                        style={{ width: `${count * 25}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 justify-end">
                    {['C', 'D', 'E', 'T'].map((palo, idx) => (
                      <div 
                        key={palo}
                        className={`w-1.5 h-1.5 rounded-full border ${
                          count > idx 
                            ? isComplete 
                              ? 'bg-emerald-400 border-emerald-600' 
                              : count > 1 
                                ? 'bg-yellow-400 border-yellow-600' 
                                : 'bg-red-400 border-red-600'
                            : 'bg-gray-700 border-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default GamePanel;