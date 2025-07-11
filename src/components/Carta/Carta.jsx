import React, { useEffect, useRef } from 'react';
import './Carta.css';

const Carta = ({ valor, palo, index, totalCartas, faseAnimacion }) => {
  const cartaRef = useRef(null);
  const valoresPoker = {
    1: 'A', 11: 'J', 12: 'Q', 13: 'K'
  };

  useEffect(() => {
    const carta = cartaRef.current;
    if (!carta) return;

    if (faseAnimacion === 'separar') {
      const esMitadIzquierda = index < totalCartas / 2;
      carta.style.setProperty('--posX-final', esMitadIzquierda ? '-80px' : '80px');
      carta.style.setProperty('--rotacion-final', esMitadIzquierda ? '-15deg' : '15deg');
      carta.style.setProperty('--posY-inicial', `${index * 0.5}px`);
      carta.classList.add('separar-mitad');
    } else if (faseAnimacion === 'barajar') {
      const esMitadIzquierda = index < totalCartas / 2;
      carta.style.setProperty('--posX-inicial', esMitadIzquierda ? '-80px' : '80px');
      carta.style.setProperty('--rotacion-inicial', esMitadIzquierda ? '-15deg' : '15deg');
      carta.style.setProperty('--posY-final', `${index * 0.5}px`);
      carta.classList.add('caer-carta');
    } else {
      // Estado inicial
      carta.style.transform = `translateX(-50%) translateY(${index * 0.5}px)`;
    }
  }, [faseAnimacion, index, totalCartas]);

  return (
    <div 
      ref={cartaRef}
      className="carta"
      style={{
        zIndex: index,
        '--delay-multiplicador': index % 2 === 0 ? 0 : 0.5,
      }}
    >
      <img 
        src={`/assets/modelo2/${valor}${palo}.png`} 
        alt={`${valoresPoker[valor] || valor} de ${palo}`}
        className="w-full h-full object-cover rounded-[8px]"
      />
    </div>
  );
};

export default Carta;