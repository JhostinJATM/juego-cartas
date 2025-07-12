import { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    cartas: 'modelo1',
    tablero: 'default',
    dealer: 'default'
  });

  // Cargar configuración al iniciar
  useEffect(() => {
    const savedConfig = localStorage.getItem('gameConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Guardar configuración cuando cambie
  useEffect(() => {
    localStorage.setItem('gameConfig', JSON.stringify(config));
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};