import { animarVolteo } from './animaciones';

export const juegoAutomatico = async ({
  cartas,
  setCartas,
  setEstaJugando,
  setModoManual,
  setCartaSeleccionada,
  posicionesCartas,
   onTerminar
}) => {
  setEstaJugando(true);
  setModoManual(false);
  setCartaSeleccionada(null);

  let cartasActuales = [...cartas];
  let posicionActual = "3-3";
  const cartasProcesadas = new Set();
  let continuar = true;

  while (continuar) {
    const cartasEnPosicion = cartasActuales
      .filter(c => c.posicion === posicionActual)
      .sort((a, b) => b.ordenEnPosicion - a.ordenEnPosicion);

    const cartaParaVoltear = cartasEnPosicion.find(c =>
      !c.volteado && !cartasProcesadas.has(c.id)
    );

    if (!cartaParaVoltear) {
      continuar = false;
      break;
    }

    cartasProcesadas.add(cartaParaVoltear.id);
    await animarVolteo(cartaParaVoltear.id, setCartas);
    await new Promise(resolve => setTimeout(resolve, 100));

    const valorCarta = cartaParaVoltear.valor;
    const nuevaPosicion = Object.entries(posicionesCartas).find(
      ([_, v]) => v === valorCarta
    )?.[0];

    if (!nuevaPosicion) {
      continuar = false;
      break;
    }

    const cartasEnNuevaPos = cartasActuales.filter(c => c.posicion === nuevaPosicion);
    const nuevoOrden = cartasEnNuevaPos.length > 0
      ? Math.min(...cartasEnNuevaPos.map(c => c.ordenEnPosicion)) - 1
      : 0;

    cartasActuales = cartasActuales.map(c =>
      c.id === cartaParaVoltear.id
        ? {
          ...c,
          posicion: nuevaPosicion,
          ordenEnPosicion: nuevoOrden,
          volteado: true
        }
        : c
    );

    setCartas(cartasActuales);
    await new Promise(resolve => setTimeout(resolve, 200));

    const quedanCartasSinVoltearEnNuevaPos = cartasActuales.some(
      c => c.posicion === nuevaPosicion && !c.volteado
    );

    if (!quedanCartasSinVoltearEnNuevaPos) {
      continuar = false;
      break;
    }

    posicionActual = nuevaPosicion;
    cartasProcesadas.clear();
  }

  setEstaJugando(false);
  if (onTerminar) {
    const todasVolteadas = cartasActuales.every(c => c.volteado);
    onTerminar(todasVolteadas);
  }
};