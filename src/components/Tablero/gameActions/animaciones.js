export const animarVolteo = async (cartaId, setCartas) => {
  // Crear el audio y reproducirlo
  const sound = new Audio('/assets/sound/volteo.mp3');
  sound.volume = 0.3; // Ajusta el volumen si es necesario (0.1 a 1)
  
  setCartas(prev => prev.map(c =>
    c.id === cartaId ? { ...c, animando: true } : c
  ));
  await new Promise(resolve => setTimeout(resolve, 100));
  sound.play().catch(e => console.log("Error al reproducir sonido:", e));
  setCartas(prev => prev.map(c =>
    c.id === cartaId ? { ...c, animando: false, volteado: true } : c
  ));
  await new Promise(resolve => setTimeout(resolve, 600));
};