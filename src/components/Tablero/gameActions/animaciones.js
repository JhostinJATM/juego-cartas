export const animarVolteo = async (cartaId, setCartas) => {
  
  setCartas(prev => prev.map(c =>
    c.id === cartaId ? { ...c, animando: true } : c
  ));
  await new Promise(resolve => setTimeout(resolve, 100));
  setCartas(prev => prev.map(c =>
    c.id === cartaId ? { ...c, animando: false, volteado: true } : c
  ));
  await new Promise(resolve => setTimeout(resolve, 600));
};