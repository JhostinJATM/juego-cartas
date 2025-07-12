import { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const DealerModal = ({ onComenzar }) => {
  const { config, actualizarPregunta } = useContext(ConfigContext);
  const [pregunta, setPregunta] = useState(config.preguntaUsuario || '');

  // Evitar que se muestre si ya hay pregunta
  useEffect(() => {
    if (config.preguntaUsuario) {
      onComenzar();
    }
  }, [config.preguntaUsuario, onComenzar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pregunta.trim()) {
      actualizarPregunta(pregunta);
      onComenzar();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4">¿Qué quieres adivinar?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Escribe tu pregunta aquí..."
            required
            minLength={3}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Comenzar
          </button>
        </form>
      </div>
    </div>
  );
};