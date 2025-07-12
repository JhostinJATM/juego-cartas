export const repartir = async ({
  cartas,
  setCartas,
  setEstaRepartiendo,
  setModoManual,
  setCartaSeleccionada,
  setPosicionActual,
  posicionesCartas
}) => {
  // Crear y configurar el audio
  const audioRepartir = new Audio('/assets/sound/reparticion.mp3');
  audioRepartir.loop = true;
  audioRepartir.playbackRate = 2.7; // Acelera el audio un 50% (1.0 es velocidad normal)

  setEstaRepartiendo(true);
  setModoManual(false);
  setCartaSeleccionada(null);
  setPosicionActual("3-3");

  // Iniciar reproducción del audio
  audioRepartir.play().catch(e => console.log("No se pudo reproducir audio:", e));

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
  audioRepartir.pause();
};