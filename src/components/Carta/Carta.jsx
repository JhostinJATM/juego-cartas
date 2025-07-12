import React, { useEffect, useRef, useState, useContext } from 'react';
import './Carta.css';
import { ConfigContext } from '../../context/ConfigContext';

const Carta = ({ valor, palo, index, estaBarajando, voltear: propVoltear, small = false }) => {
  const cartaRef = useRef(null);
  const [volteada, setVolteada] = useState(propVoltear);
  const { config } = useContext(ConfigContext);
  
  const valoresPoker = {
    1: 'A', 11: 'J', 12: 'Q', 13: 'K'
  };

  useEffect(() => {
    setVolteada(propVoltear);
  }, [propVoltear]);

  useEffect(() => {
    const carta = cartaRef.current;
    if (!carta || small) return;

    carta.style.setProperty('--posY-final', `${index}px`);
    carta.style.zIndex = index + 1;

    if (!estaBarajando) {
      carta.style.transform = `translateX(0) translateY(${index}px)`;
      carta.className = 'carta';
    }
  }, [index, estaBarajando, small]);

  return (
    <div 
      ref={cartaRef}
      className={`carta ${volteada ? 'volteada' : ''} ${small ? 'small' : ''}`}
    >
      <div className="cara-delantera">
        <img 
          src={`/assets/${config.cartas}/${valor}${palo}.png`} 
          alt={`${valoresPoker[valor] || valor} de ${palo}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="cara-trasera">
        <img 
          src={`/assets/${config.cartas}/reverso.png`} 
          alt="Reverso de la carta"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Carta;