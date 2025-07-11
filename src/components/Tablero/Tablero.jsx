import React, { useState } from 'react';
import Carta from '../Carta/Carta';

const posicionesCartas = {
  "0-0": 7, "0-2": 8, "0-4": 9, "0-6": 10,
  "2-0": 6, "2-6": 11, "3-3": 13,
  "4-0": 5, "4-6": 12, "6-0": 4,
  "6-2": 3, "6-4": 2, "6-6": 1,
};

const Tablero = () => {
  const [cartas, setCartas] = useState(
    Array(52).fill(0).map((_, i) => ({
      id: i,
      valor: (i % 13) + 1,
      palo: ['C', 'T', 'D', 'E'][Math.floor(i / 13)],
      volteado: false,
      posicion: null,
      ordenEnPosicion: 0
    }))
  );
  const [estaBarajando, setEstaBarajando] = useState(false);
  const [estaRepartiendo, setEstaRepartiendo] = useState(false);

  const barajar = async () => {
    if (estaRepartiendo) return;
    setEstaBarajando(true);
    setCartas(prev => prev.map(c => ({ ...c, volteado: false, posicion: null })));

    const cartasDom = document.querySelectorAll('.carta');
    const mitad = Math.ceil(cartasDom.length / 2);

    // Animación de barajado
    cartasDom.forEach((carta, i) => {
      carta.style.setProperty('--posY-inicial', `${i}px`);
      if (i < mitad) {
        carta.style.setProperty('--posX-final', '-90px');
        carta.style.setProperty('--rot-final', '-10deg');
        carta.classList.add('separar-mitad-izquierda');
      } else {
        carta.style.setProperty('--posX-final', '90px');
        carta.style.setProperty('--rot-final', '10deg');
        carta.classList.add('separar-mitad-derecha');
      }
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    for (let i = 0; i < mitad; i++) {
      if (cartasDom[i]) {
        cartasDom[i].style.setProperty('--posY-final', `${i * 2}px`);
        cartasDom[i].classList.replace('separar-mitad-izquierda', 'animacion-intercalar');
        cartasDom[i].style.zIndex = 20 + (i * 2);
      }
      await new Promise(resolve => setTimeout(resolve, 200));

      if (cartasDom[mitad + i]) {
        cartasDom[mitad + i].style.setProperty('--posY-final', `${i * 2 + 1}px`);
        cartasDom[mitad + i].classList.replace('separar-mitad-derecha', 'animacion-intercalar');
        cartasDom[mitad + i].style.zIndex = 20 + (i * 2 + 1);
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mezclar cartas
    setCartas(prev => {
      const nuevo = [...prev];
      for (let i = nuevo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
      }
      return nuevo;
    });

    setEstaBarajando(false);
  };

  const repartir = async () => {
    if (estaBarajando || estaRepartiendo) return;
    setEstaRepartiendo(true);

    const posiciones = Object.keys(posicionesCartas);
    let cartasPorRepartir = [...cartas.filter(c => !c.posicion)];

    for (let ronda = 0; ronda < 4; ronda++) {
      for (const pos of posiciones) {
        if (cartasPorRepartir.length === 0) break;

        const carta = cartasPorRepartir.shift();
        const [fila, col] = pos.split('-').map(Number);

        setCartas(prev => prev.map(c =>
          c.id === carta.id ? {
            ...c,
            posicion: pos,
            ordenEnPosicion: ronda
          } : c
        ));

        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }

    setEstaRepartiendo(false);
  };

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < 7; row++) {
      const cols = [];
      for (let col = 0; col < 7; col++) {
        const key = `${row}-${col}`;
        const valor = posicionesCartas[key];
        const cartasEnPosicion = cartas.filter(c => c.posicion === key);

        cols.push(
          <div
            key={key}
            className={`w-24 h-32 flex items-center justify-center relative rounded-lg ${valor ? 'bg-white/50 backdrop-blur-sm border-2 border-gray-200' : 'opacity-0'
              }`}
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
                  className="absolute"
                  style={{
                    transform: `translateX(${carta.ordenEnPosicion * 5}px) translateY(${carta.ordenEnPosicion * 5}px)`,
                    zIndex: i
                  }}
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

  return (
    <div
      className="flex flex-row min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/tablero/tablero.png)',
      }}
    >
      {/* Parte izquierda - Grid */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {renderGrid()}
        </div>
      </div>

      {/* Parte derecha - Baraja y botones */}
      <div className="w-1/3 p-8 flex flex-col justify-center">
        <div className="space-y-8">
          {/* Contenedor de la baraja */}
          <div className="relative h-48 w-full flex justify-center items-center">
            {cartas
              .filter(c => !c.posicion)
              .map((carta, index) => (
                <Carta
                  key={carta.id}
                  valor={carta.valor}
                  palo={carta.palo}
                  index={index}
                  estaBarajando={estaBarajando}
                  voltear={carta.volteado}
                />
              ))}
          </div>

          {/* Contenedor de botones */}
          <div className="flex flex-col gap-4">
            <button
              onClick={barajar}
              disabled={estaBarajando || estaRepartiendo}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {estaBarajando ? 'Barajando...' : 'Barajar Cartas'}
            </button>

            <button
              onClick={repartir}
              disabled={estaBarajando || estaRepartiendo}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {estaRepartiendo ? 'Repartiendo...' : 'Repartir Cartas'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tablero;