import { animarVolteo } from '../gameActions/animaciones';

export const manejarDragStart = (carta, setCartaSeleccionada, modoManual) => {
  if (!modoManual || !carta.volteado) return;
  setCartaSeleccionada(carta);
};

export const manejarDragOver = (e) => {
  e.preventDefault();
};

export const manejarDrop = async (
  e,
  posicion,
  {
    cartaSeleccionada,
    cartas,
    setCartas,
    setCartaSeleccionada,
    setPosicionActual,
    posicionesCartas,
    modoManual
  }
) => {
  e.preventDefault();
  if (!modoManual || !cartaSeleccionada || !posicionesCartas[posicion]) return;

  const valorPosicion = posicionesCartas[posicion];
  if (cartaSeleccionada.valor !== valorPosicion) return;

  const cartasEnNuevaPos = cartas.filter(c => c.posicion === posicion);
  const nuevoOrden = cartasEnNuevaPos.length > 0
    ? Math.min(...cartasEnNuevaPos.map(c => c.ordenEnPosicion)) - 1
    : 0;

  setCartas(prev => prev.map(c =>
    c.id === cartaSeleccionada.id
      ? {
        ...c,
        posicion: posicion,
        ordenEnPosicion: nuevoOrden,
        volteado: true
      }
      : c
  ));

  await new Promise(resolve => setTimeout(resolve, 500));

  const cartasEnNuevaPosicion = cartas
    .filter(c => c.posicion === posicion && c.id !== cartaSeleccionada.id)
    .sort((a, b) => b.ordenEnPosicion - a.ordenEnPosicion);

  if (cartasEnNuevaPosicion.length > 0 && !cartasEnNuevaPosicion[0].volteado) {
    await animarVolteo(cartasEnNuevaPosicion[0].id, setCartas);
    setPosicionActual(posicion);
  } else {
    const posicionesConCartasSinVoltear = Object.keys(posicionesCartas).filter(pos => {
      return cartas.some(c => c.posicion === pos && !c.volteado);
    });

    if (posicionesConCartasSinVoltear.length > 0) {
      setPosicionActual(posicionesConCartasSinVoltear[0]);
    }
  }

  setCartaSeleccionada(null);
};