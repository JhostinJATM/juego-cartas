import { animarVolteo } from './animaciones';

export const iniciarModoManual = async ({
  cartas,
  setModoManual,
  setCartaSeleccionada,
  setPosicionActual,
  setCartas
}) => {
  setModoManual(true);
  setCartaSeleccionada(null);
  setPosicionActual("3-3");

  const cartasEnPosicion = cartas
    .filter(c => c.posicion === "3-3")
    .sort((a, b) => b.ordenEnPosicion - a.ordenEnPosicion);

  if (cartasEnPosicion.length > 0 && !cartasEnPosicion[0].volteado) {
    await animarVolteo(cartasEnPosicion[0].id, setCartas);
  }
};