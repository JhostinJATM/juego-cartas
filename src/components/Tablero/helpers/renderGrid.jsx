import Carta from '../../Carta/Carta';

export const renderGrid = ({
  cartas,
  posicionesCartas,
  modoManual,
  manejarDragStart,
  manejarDragOver,
  manejarDrop
}) => {
  const rows = [];
  for (let row = 0; row < 7; row++) {
    const cols = [];
    for (let col = 0; col < 7; col++) {
      const key = `${row}-${col}`;
      const valor = posicionesCartas[key];
      const cartasEnPosicion = cartas.filter(c => c.posicion === key)
        .sort((a, b) => a.ordenEnPosicion - b.ordenEnPosicion);

      cols.push(
        <div
          key={key}
          className={`w-24 h-32 flex items-center justify-center relative rounded-lg ${
            // valor ? 'bg-white/50 backdrop-blur-sm border-2 border-gray-200' : 'opacity-0'
            valor ? 'bg-white/30 backdrop-blur-sm border-0' : 'opacity-0'
          }`}
          onDragOver={(e) => manejarDragOver(e)}
          onDrop={(e) => manejarDrop(e, key)}
        >
          {valor && (
            <span className="absolute top-1 left-1 text-xs font-bold text-gray-700">
              {valor}
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            {cartasEnPosicion.map((carta, i) => (
              <div
                key={carta.id}
                className={`absolute ${carta.animando ? 'animacion-voltear' : ''}`}
                style={{
                  transform: `translate(${i * 5}px, ${i * 5}px)`,
                  zIndex: i,
                }}
                draggable={modoManual && carta.volteado}
                onDragStart={() => manejarDragStart(carta)}
              >
                <Carta
                  valor={carta.valor}
                  palo={carta.palo}
                  voltear={carta.volteado}
                  small
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    rows.push(
      <div key={row} className="flex justify-center">
        {cols}
      </div>
    );
  }
  return rows;
};