import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfigContext } from '../context/ConfigContext';

export default function SeleccionTablero() {
  const { config, setConfig } = useContext(ConfigContext);
  const navigate = useNavigate();
  const [selectedTablero, setSelectedTablero] = useState(config.tablero);

  // 1. LISTA DE TABLEROS DISPONIBLES - AÑADE AQUÍ TUS TABLEROS
  const tablerosDisponibles = [
    {
      id: 'AzulCristal', // Nombre del archivo sin extensión
      nombre: 'Azul Cristal', // Nombre para mostrar
      imagen: '/assets/tablero/AzulCristal.png' // Ruta completa
    },
    {
      id: 'RojoCarnesi',
      nombre: 'Rojo Carnesí',
      imagen: '/assets/tablero/RojoCarnesi.png'
    },
    {
      id: 'VerdeEsmeralda',
      nombre: 'Verde Esmeralda',
      imagen: '/assets/tablero/VerdeEsmeralda.png'
    },
    {
      id: 'PielRustico',
      nombre: 'Piel Rustico',
      imagen: '/assets/tablero/PielRustico.png'
    },
  ];

  // 2. TABLERO POR DEFECTO (si no hay ninguno seleccionado)
  const tableroDefault = {
    id: 'default',
    nombre: 'Clásico',
    imagen: '/assets/tablero/AzulCristal.png'
  };

  // 3. VERIFICAR SI EL TABLERO SELECCIONADO EXISTE EN LA LISTA
  useEffect(() => {
    const tableroActual = tablerosDisponibles.find(t => t.id === config.tablero);
    if (!tableroActual && tablerosDisponibles.length > 0) {
      setSelectedTablero(tablerosDisponibles[0].id);
    }
  }, [config.tablero]);

  const seleccionarTablero = (tableroId) => {
    setSelectedTablero(tableroId);
    setConfig(prev => ({ ...prev, tablero: tableroId }));
    
    // Animación de confirmación
    const tableroElement = document.getElementById(`tablero-${tableroId}`);
    if (tableroElement) {
      tableroElement.classList.add('animate-pulse');
      setTimeout(() => tableroElement.classList.remove('animate-pulse'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Elige tu diseño de tablero</h1>
          <p className="text-lg text-amber-700">
            {selectedTablero ? `Diseño actual: ${
              tablerosDisponibles.find(t => t.id === selectedTablero)?.nombre || 
              tableroDefault.nombre
            }` : "Selecciona un diseño"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mostrar tableros disponibles */}
          {tablerosDisponibles.map((tablero) => (
            <div 
              id={`tablero-${tablero.id}`}
              key={tablero.id}
              onClick={() => seleccionarTablero(tablero.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedTablero === tablero.id 
                  ? 'ring-4 ring-amber-500 shadow-xl' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tablero.imagen} 
                  alt={tablero.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = tableroDefault.imagen; // Fallback si la imagen no carga
                  }}
                />
                {selectedTablero === tablero.id && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="bg-amber-500 text-white px-4 py-2 rounded-full font-bold">
                      Seleccionado
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-white p-4">
                <h2 className={`text-xl font-bold text-center transition-colors ${
                  selectedTablero === tablero.id ? 'text-amber-600' : 'text-gray-800'
                }`}>
                  {tablero.nombre}
                </h2>
                
                <div className="flex justify-center mt-4">
                  <button 
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedTablero === tablero.id 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {selectedTablero === tablero.id ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/configuracion')}
            className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a Configuración
          </button>
        </div>
      </div>
    </div>
  );
}