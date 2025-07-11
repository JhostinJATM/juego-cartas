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
      ordenEnPosicion: 0,
      animando: false
    }))
  );
  const [estaBarajando, setEstaBarajando] = useState(false);
  const [estaRepartiendo, setEstaRepartiendo] = useState(false);
  const [estaJugando, setEstaJugando] = useState(false);

  const barajar = async () => {
    if (estaRepartiendo || estaJugando) return;
    setEstaBarajando(true);
    setCartas(prev => prev.map(c => ({ ...c, volteado: false, posicion: null })));

    // Seleccionar todas las cartas DOM
    const cartasDom = document.querySelectorAll('.carta:not(.small)');
    const mitad = Math.ceil(cartasDom.length / 2);
    
    // Animación de separación en dos mitades
    cartasDom.forEach((carta, i) => {
      if (i < mitad) {
        carta.style.transform = 'translateX(-90px) rotateZ(-10deg)';
      } else {
        carta.style.transform = 'translateX(90px) rotateZ(10deg)';
      }
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // Animación de intercalado
    for (let i = 0; i < mitad; i++) {
      if (cartasDom[i]) {
        cartasDom[i].style.transform = 'translateX(0) rotateZ(0)';
        cartasDom[i].style.zIndex = 20 + (i * 2);
      }
      if (cartasDom[mitad + i]) {
        cartasDom[mitad + i].style.transform = 'translateX(0) rotateZ(0)';
        cartasDom[mitad + i].style.zIndex = 20 + (i * 2 + 1);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Mezclar cartas lógicamente
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
    if (estaBarajando || estaRepartiendo || estaJugando) return;
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
            ordenEnPosicion: ronda,
            volteado: false
          } : c
        ));
        
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }
    
    setEstaRepartiendo(false);
  };

  const animarVolteo = async (cartaId) => {
    setCartas(prev => prev.map(c => 
      c.id === cartaId ? { ...c, animando: true } : c
    ));
    await new Promise(resolve => setTimeout(resolve, 300));
    setCartas(prev => prev.map(c => 
      c.id === cartaId ? { ...c, animando: false, volteado: true } : c
    ));
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const juegoAutomatico = async () => {
    if (estaBarajando || estaRepartiendo || estaJugando) return;
    setEstaJugando(true);

    let posicionActual = "3-3";
    let continuar = true;

    while (continuar) {
      // Obtener cartas en la posición actual (ordenadas por orden descendente)
      const cartasEnPosicion = [...cartas.filter(c => c.posicion === posicionActual)]
        .sort((a, b) => b.ordenEnPosicion - a.ordenEnPosicion);

      if (cartasEnPosicion.length === 0) {
        continuar = false;
        break;
      }

      const cartaSuperior = cartasEnPosicion[0];
      
      // 1. Animación de volteo
      await animarVolteo(cartaSuperior.id);
      
      // 2. Mostrar carta volteada
      await new Promise(resolve => setTimeout(resolve, 800));

      const valorCarta = cartaSuperior.valor;
      const nuevaPosicion = Object.entries(posicionesCartas).find(
        ([_, v]) => v === valorCarta
      )?.[0];

      if (!nuevaPosicion) {
        continuar = false;
        break;
      }

      // 3. Mover la carta a la nueva posición (ya volteada)
      setCartas(prev => {
        const cartasEnNuevaPos = prev.filter(c => c.posicion === nuevaPosicion);
        const nuevoOrden = cartasEnNuevaPos.length > 0 
          ? Math.max(...cartasEnNuevaPos.map(c => c.ordenEnPosicion)) + 1 
          : 0;

        return prev.map(c => 
          c.id === cartaSuperior.id
            ? { 
                ...c, 
                posicion: nuevaPosicion, 
                ordenEnPosicion: nuevoOrden,
                volteado: true // Mantenerla volteada
              } 
            : c
        );
      });

      await new Promise(resolve => setTimeout(resolve, 800));
      posicionActual = nuevaPosicion;
    }

    setEstaJugando(false);
  };

  const renderGrid = () => {
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
              valor ? 'bg-white/50 backdrop-blur-sm border-2 border-gray-200' : 'opacity-0'
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
                  className={`absolute ${carta.animando ? 'animacion-voltear' : ''}`}
                  style={{
                    transform: `translate(${i * 5}px, ${i * 5}px)`,
                    zIndex: i,
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
    <div className="flex flex-row min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/tablero/tablero.png)' }}>
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
              disabled={estaBarajando || estaRepartiendo || estaJugando}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {estaBarajando ? 'Barajando...' : 'Barajar Cartas'}
            </button>
            
            <button
              onClick={repartir}
              disabled={estaBarajando || estaRepartiendo || estaJugando}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {estaRepartiendo ? 'Repartiendo...' : 'Repartir Cartas'}
            </button>
            
            <button
              onClick={juegoAutomatico}
              disabled={estaBarajando || estaRepartiendo || estaJugando}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {estaJugando ? 'Jugando...' : 'Juego Automático'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tablero;