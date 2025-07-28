
// Importa la función que anima el volteo de una carta
import { animarVolteo } from '../gameActions/animaciones';


/**
 * Se ejecuta cuando el usuario comienza a arrastrar una carta.
 * Solo permite arrastrar si el modo manual está activo y la carta ya está volteada.
 * @param {Object} carta - La carta que se intenta arrastrar
 * @param {Function} setCartaSeleccionada - Setter para guardar la carta seleccionada
 * @param {boolean} modoManual - Indica si el modo manual está activo
 */
export const manejarDragStart = (carta, setCartaSeleccionada, modoManual) => {
  // Si no está en modo manual o la carta no está volteada, no hace nada
  if (!modoManual || !carta.volteado) return;
  // Guarda la carta que se está arrastrando como seleccionada
  setCartaSeleccionada(carta);
};


/**
 * Se ejecuta cuando una carta arrastrada pasa por encima de una zona válida.
 * Previene el comportamiento por defecto para permitir el drop.
 * @param {Event} e - Evento de drag over
 */
export const manejarDragOver = (e) => {
  e.preventDefault(); // Necesario para permitir el drop
};


/**
 * Se ejecuta cuando el usuario suelta una carta sobre una posición válida del tablero.
 * Realiza validaciones, actualiza el estado de las cartas y gestiona animaciones.
 * @param {Event} e - Evento de drop
 * @param {string} posicion - Clave de la posición en el tablero (ej: '3-3')
 * @param {Object} opciones - Estado y setters relacionados con las cartas y el tablero
 */
export const manejarDrop = async (
  e,
  posicion,
  {
    cartaSeleccionada, // La carta que el usuario está intentando soltar
    cartas, // Todas las cartas del juego
    setCartas, // Setter para actualizar el estado de las cartas
    setCartaSeleccionada, // Setter para limpiar la carta seleccionada
    setPosicionActual, // Setter para actualizar la posición actual
    posicionesCartas, // Mapa de posiciones válidas en el tablero
    modoManual // Indica si el modo manual está activo
  }
) => {
  e.preventDefault(); // Previene el comportamiento por defecto del navegador

  // Validaciones: solo permite soltar si está en modo manual, hay carta seleccionada y la posición es válida
  if (!modoManual || !cartaSeleccionada || !posicionesCartas[posicion]) return;

  // Obtiene el valor que debería tener la carta para esa posición
  const valorPosicion = posicionesCartas[posicion];
  // Si la carta no corresponde al valor de la posición, no permite soltar
  if (cartaSeleccionada.valor !== valorPosicion) return;

  // Busca cuántas cartas ya hay en esa posición para calcular el orden
  const cartasEnNuevaPos = cartas.filter(c => c.posicion === posicion);
  // El nuevo orden será uno menos que el menor orden actual, o 0 si está vacío
  const nuevoOrden = cartasEnNuevaPos.length > 0
    ? Math.min(...cartasEnNuevaPos.map(c => c.ordenEnPosicion)) - 1
    : 0;

  // Actualiza el estado de las cartas: mueve la carta seleccionada a la nueva posición, la voltea y le asigna el nuevo orden
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

  // Espera medio segundo para dar tiempo a la animación visual
  await new Promise(resolve => setTimeout(resolve, 500));

  // Busca las cartas que quedaron en la nueva posición (excepto la recién movida), ordenadas de arriba a abajo
  const cartasEnNuevaPosicion = cartas
    .filter(c => c.posicion === posicion && c.id !== cartaSeleccionada.id)
    .sort((a, b) => b.ordenEnPosicion - a.ordenEnPosicion);

  // Si hay una carta encima y no está volteada, la voltea automáticamente con animación
  if (cartasEnNuevaPosicion.length > 0 && !cartasEnNuevaPosicion[0].volteado) {
    await animarVolteo(cartasEnNuevaPosicion[0].id, setCartas);
    setPosicionActual(posicion); // Actualiza la posición actual a la nueva
  } else {
    // Si no, busca la siguiente posición con cartas sin voltear y la selecciona como actual
    const posicionesConCartasSinVoltear = Object.keys(posicionesCartas).filter(pos => {
      return cartas.some(c => c.posicion === pos && !c.volteado);
    });

    if (posicionesConCartasSinVoltear.length > 0) {
      setPosicionActual(posicionesConCartasSinVoltear[0]);
    }
  }

  // Limpia la carta seleccionada para finalizar el drag and drop
  setCartaSeleccionada(null);
};