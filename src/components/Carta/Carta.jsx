import React, { useEffect, useRef } from 'react';
import './Carta.css';

const Carta = ({ valor, palo, index, estaBarajando, voltear }) => {
  const cartaRef = useRef(null);
  const valoresPoker = {
    1: 'A', 11: 'J', 12: 'Q', 13: 'K'
  };

  useEffect(() => {
    const carta = cartaRef.current;
    if (!carta) return;

    carta.style.setProperty('--posY-final', `${index}px`);
    carta.style.zIndex = index + 1;

    if (!estaBarajando) {
      carta.style.transform = `translateX(0) translateY(${index}px)`;
      carta.className = 'carta';
      if (voltear) carta.classList.add('volteada');
    }
  }, [index, estaBarajando, voltear]);

  return (
    <div 
      ref={cartaRef}
      className={`carta ${voltear ? 'volteada' : ''}`}
    >
      <div className="cara-delantera">
        <img 
          src={`/assets/modelo2/${valor}${palo}.png`} 
          alt={`${valoresPoker[valor] || valor} de ${palo}`}
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>
      <div className="cara-trasera">
        <img 
          src="/assets/modelo2/reverso.png" 
          alt="Reverso de la carta"
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>
    </div>
  );
};

export default Carta;