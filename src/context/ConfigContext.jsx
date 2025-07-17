import { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  // Cargar configuración inicial desde localStorage
  const loadInitialConfig = () => {
    const savedConfig = localStorage.getItem('gameConfig');
    return savedConfig 
      ? JSON.parse(savedConfig)
      : {
          cartas: 'modelo1',
          tablero: 'default',
          dealer: 'joker1', // Valor por defecto para el dealer
          preguntaUsuario: '',
          juegoTerminado: false,
          resultadoJuego: null
        };
  };

  const [config, setConfig] = useState(loadInitialConfig());

  // Guardar configuración cuando cambie
  useEffect(() => {
    localStorage.setItem('gameConfig', JSON.stringify(config));
  }, [config]);

  const actualizarPregunta = (pregunta) => {
    setConfig(prev => ({
      ...prev,
      preguntaUsuario: pregunta
    }));
  };

  const actualizarResultadoJuego = (resultado) => {
    setConfig(prev => ({
      ...prev,
      juegoTerminado: true,
      resultadoJuego: resultado
    }));
  };

  const reiniciarJuego = () => {
    setConfig(prev => ({
      ...prev,
      juegoTerminado: false,
      resultadoJuego: null,
      preguntaUsuario: '' // Limpiamos la pregunta pero mantenemos otras configs
    }));
  };

  return (
    <ConfigContext.Provider value={{ 
      config, 
      setConfig,
      actualizarPregunta,
      actualizarResultadoJuego,
      reiniciarJuego
    }}>
      {children}
    </ConfigContext.Provider>
  );
};