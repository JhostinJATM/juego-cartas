import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">El Horáculo</h1>
      
      <div className="flex flex-col gap-4 w-64">
        <button 
          onClick={() => navigate('/juego')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Jugar
        </button>
        
        <button 
          onClick={() => navigate('/configuracion')}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Configuraciones
        </button>
        
        <button 
          onClick={() => navigate('/licencias')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Licencias
        </button>
      </div>
    </div>
  );
}