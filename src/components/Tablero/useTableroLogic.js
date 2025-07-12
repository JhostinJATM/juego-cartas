import { useState } from 'react';

export const posicionesCartas = {
  "0-0": 7, "0-2": 8, "0-4": 9, "0-6": 10,
  "2-0": 6, "2-6": 11, "3-3": 13,
  "4-0": 5, "4-6": 12, "6-0": 4,
  "6-2": 3, "6-4": 2, "6-6": 1,
};

export const useTableroLogic = () => {
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
  const [modoManual, setModoManual] = useState(false);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [posicionActual, setPosicionActual] = useState("3-3");

  return {
    cartas,
    setCartas,
    estaBarajando,
    setEstaBarajando,
    estaRepartiendo,
    setEstaRepartiendo,
    estaJugando,
    setEstaJugando,
    modoManual,
    setModoManual,
    cartaSeleccionada,
    setCartaSeleccionada,
    posicionActual,
    setPosicionActual
  };
};