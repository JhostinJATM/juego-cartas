import React, { useState } from 'react';
import './Tablero.css';
import Carta from '../Carta/Carta';

const posicionesCartas = {
  "0-0": 7,
  "0-2": 8,
  "0-4": 9,
  "0-6": 10,
  "2-0": 6,
  "2-6": 11,
  "3-3": 13,
  "4-0": 5,
  "4-6": 12,
  "6-0": 4,
  "6-2": 3,
  "6-4": 2,
  "6-6": 1,
};

const Tablero = () => {
  const [cartas, setCartas] = useState(
    Array(52).fill(0).map((_, i) => ({
      id: i,
      valor: (i % 13) + 1,
      palo: ['C', 'T', 'D', 'E'][Math.floor(i / 13)],
      volteado: false
    }))
  );
  const [estaBarajando, setEstaBarajando] = useState(false);

  const barajar = async () => {
    setEstaBarajando(true);
    setCartas(prev => prev.map(carta => ({ ...carta, volteado: false })));

    const cartasDom = document.querySelectorAll('.carta');
    const mitad = Math.ceil(cartasDom.length / 2);
    
    // 1. Separar en dos mitades
    cartasDom.forEach((carta, i) => {
      carta.style.setProperty('--posY-inicial', `${i}px`);
      if (i < mitad) {
        carta.style.setProperty('--posX-final', '-120px');
        carta.style.setProperty('--rot-final', '-12deg');
        carta.classList.add('separar-mitad-izquierda');
      } else {
        carta.style.setProperty('--posX-final', '120px');
        carta.style.setProperty('--rot-final', '12deg');
        carta.classList.add('separar-mitad-derecha');
      }
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // 2. Intercalar cartas
    for (let i = 0; i < mitad; i++) {
      // Carta de la izquierda
      if (cartasDom[i]) {
        cartasDom[i].style.setProperty('--posY-final', `${i*2}px`);
        cartasDom[i].classList.remove('separar-mitad-izquierda');
        cartasDom[i].classList.add('animacion-intercalar');
        cartasDom[i].style.zIndex = 20 + (i * 2);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));

      // Carta de la derecha
      if (cartasDom[mitad + i]) {
        cartasDom[mitad + i].style.setProperty('--posY-final', `${i*2 + 1}px`);
        cartasDom[mitad + i].classList.remove('separar-mitad-derecha');
        cartasDom[mitad + i].classList.add('animacion-intercalar');
        cartasDom[mitad + i].style.zIndex = 20 + (i * 2 + 1);
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Mezclar el array
    setCartas(prev => {
      const nuevo = [...prev];
      for (let i = nuevo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
      }
      return nuevo;
    });

    // 4. Resetear estilos
    cartasDom.forEach((carta, i) => {
      carta.classList.remove('animacion-intercalar');
      carta.style.transform = `translateX(0) translateY(${i}px)`;
      carta.style.zIndex = i + 1;
    });

    setEstaBarajando(false);
  };

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < 7; row++) {
      const cols = [];
      for (let col = 0; col < 7; col++) {
        const key = `${row}-${col}`;
        const valor = posicionesCartas[key];
        cols.push(
          <div
            key={key}
            className="w-16 h-16 border border-gray-400 flex items-center justify-center bg-green-100"
          >
            {valor ?? ""}
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
      
      <div className="mazo" style={{ height: '220px', width: '400px', marginBottom: '50px' }}>
        {cartas.map((carta, index) => (
          <Carta
            key={carta.id}
            valor={carta.valor}
            palo={carta.palo}
            index={index}
            totalCartas={cartas.length}
            estaBarajando={estaBarajando}
            voltear={carta.volteado}
          />
        ))}
      </div>
      
      <button
        onClick={barajar}
        disabled={estaBarajando}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {estaBarajando ? 'Barajando...' : 'Barajar Cartas'}
      </button>
    </div>
  );
};

export default Tablero;