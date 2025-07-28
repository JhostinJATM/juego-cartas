export const repartir = async ({
  cartas,
  setCartas,
  setEstaRepartiendo,
  setModoManual,
  setCartaSeleccionada,
  setPosicionActual,
  posicionesCartas
}) => {

  setEstaRepartiendo(true);
  setModoManual(false);
  setCartaSeleccionada(null);
  setPosicionActual("3-3");


  const posiciones = Object.keys(posicionesCartas);
  let cartasPorRepartir = [...cartas.filter(c => !c.posicion)];

  for (let ronda = 0; ronda < 4; ronda++) {
    for (const pos of posiciones) {
      if (cartasPorRepartir.length === 0) break;

      const carta = cartasPorRepartir.shift();

      setCartas(prev => prev.map(c =>
        c.id === carta.id ? {
          ...c,
          posicion: pos,
          ordenEnPosicion: ronda,
          volteado: false
        } : c
      ));

      await new Promise(resolve => setTimeout(resolve, 300)); 
    }
  }

  setEstaRepartiendo(false);
};