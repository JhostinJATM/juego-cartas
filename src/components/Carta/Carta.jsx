import React, { useEffect, useRef } from 'react';
import './Carta.css';

const Carta = ({ valor, palo, index, estaBarajando, voltear, small = false }) => {
  const cartaRef = useRef(null);
  const valoresPoker = {
    1: 'A', 11: 'J', 12: 'Q', 13: 'K'
  };

  useEffect(() => {
    const carta = cartaRef.current;
    if (!carta || small) return;

    carta.style.setProperty('--posY-final', `${index}px`);
    carta.style.zIndex = index + 1;

    if (!estaBarajando) {
      carta.style.transform = `translateX(0) translateY(${index}px)`;
      carta.className = 'carta';
      if (voltear) carta.classList.add('volteada');
    }
  }, [index, estaBarajando, voltear, small]);

  return (
    <div 
      ref={cartaRef}
      className={`carta ${voltear ? 'volteada' : ''} ${small ? 'small' : ''}`}
    >
      <div className="cara-delantera">
        <img 
          src={`/assets/modelo2/${valor}${palo}.png`} 
          alt={`${valoresPoker[valor] || valor} de ${palo}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="cara-trasera">
        <img 
          src="/assets/modelo2/reverso.png" 
          alt="Reverso de la carta"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Carta;