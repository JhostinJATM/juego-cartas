import { useNavigate } from 'react-router-dom';

export default function Configuracion() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      
      <div className="space-y-4">
        <div 
          onClick={() => navigate('/configuracion/cartas')}
          className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Diseño de Cartas</h2>
          <p className="text-gray-600">Cambia el aspecto de las cartas del juego</p>
        </div>
        
        <div 
          onClick={() => navigate('/configuracion/tablero')}
          className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">Diseño de Tablero</h2>
          <p className="text-gray-600">Cambia el aspecto del tablero de juego</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg opacity-50">
          <h2 className="text-lg font-semibold">Diseño de Dealer (Próximamente)</h2>
          <p className="text-gray-600">Cambia el aspecto del dealer</p>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Volver al Inicio
      </button>
    </div>
  );
}