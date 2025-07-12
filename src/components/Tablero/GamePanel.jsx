import Carta from '../Carta/Carta';

const GamePanel = ({ cartas }) => {
  // Contar cartas volteadas por valor
  const cartasVolteadasPorValor = {};
  cartas.forEach(carta => {
    if (carta.volteado && carta.posicion) {
      cartasVolteadasPorValor[carta.valor] = (cartasVolteadasPorValor[carta.valor] || 0) + 1;
    }
  });

  return (
    <div className="h-full p-4">
      <div className="bg-white/80 rounded-xl p-4 shadow-lg h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">Progreso de Cartas</h2>
        
        {/* Contenedor con scroll - Solo Tailwind */}
        <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(valor => (
            <div key={valor} className="flex items-center p-2 bg-white rounded-md shadow-sm">
              <div className="flex-shrink-0 w-10">
                <Carta 
                  valor={valor} 
                  palo="C" 
                  small 
                  voltear={true}
                  className="w-full h-auto" 
                />
              </div>
              <div className="flex-1 ml-2 min-w-0">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(cartasVolteadasPorValor[valor] || 0) * 25}%` }}
                  ></div>
                </div>
              </div>
              <span className="ml-2 text-xs font-medium text-center w-6">
                {cartasVolteadasPorValor[valor] || 0}/4
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePanel;