export const barajar = async ({
  setEstaBarajando,
  setCartas,
  setModoManual,
  setCartaSeleccionada,
  setPosicionActual
}) => {
  setEstaBarajando(true);
  setCartas(prev => prev.map(c => ({ ...c, volteado: false, posicion: null })));
  setModoManual(false);
  setCartaSeleccionada(null);
  setPosicionActual("3-3");

  const cartasDom = document.querySelectorAll('.carta:not(.small)');
  const mitad = Math.ceil(cartasDom.length / 2);

  cartasDom.forEach((carta, i) => {
    if (i < mitad) {
      carta.style.transform = 'translateX(-90px) rotateZ(-10deg)';
    } else {
      carta.style.transform = 'translateX(90px) rotateZ(10deg)';
    }
  });

  await new Promise(resolve => setTimeout(resolve, 800));

  for (let i = 0; i < mitad; i++) {
    if (cartasDom[i]) {
      cartasDom[i].style.transform = 'translateX(0) rotateZ(0)';
      cartasDom[i].style.zIndex = 20 + (i * 2);
    }
    if (cartasDom[mitad + i]) {
      cartasDom[mitad + i].style.transform = 'translateX(0) rotateZ(0)';
      cartasDom[mitad + i].style.zIndex = 20 + (i * 2 + 1);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  setCartas(prev => {
    const nuevo = [...prev];
    for (let i = nuevo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
    }
    return nuevo;
  });

  setEstaBarajando(false);
};