import React, { useState } from 'react';
import './Tablero.css';
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
        cartasDom[i].style.setProperty('--posY-final', `${i*2}px`);
        cartasDom[i].classList.replace('separar-mitad-izquierda', 'animacion-intercalar');
        cartasDom[i].style.zIndex = 20 + (i * 2);
      }
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (cartasDom[mitad + i]) {
        cartasDom[mitad + i].style.setProperty('--posY-final', `${i*2 + 1}px`);
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
        
        // Actualizar estado de la carta
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
            className="w-24 h-32 border-2 border-gray-300 flex items-center justify-center bg-green-100 relative"
          >
            {valor ?? ""}
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
      rows.push(cols);
    }
    return rows.map((cols, i) => (
      <div key={i} className="flex">
        {cols}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="inline-block">{renderGrid()}</div>
      
      <div className="flex items-center gap-8">
        <div className="mazo" style={{ height: '180px', width: '300px' }}>
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
        
        <div className="flex flex-col gap-4">
          <button
            onClick={barajar}
            disabled={estaBarajando || estaRepartiendo}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {estaBarajando ? 'Barajando...' : 'Barajar'}
          </button>
          
          <button
            onClick={repartir}
            disabled={estaBarajando || estaRepartiendo}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {estaRepartiendo ? 'Repartiendo...' : 'Repartir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tablero;