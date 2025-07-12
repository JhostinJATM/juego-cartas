import { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const ResultadoModal = ({ onCerrar }) => {
    const { config, reiniciarJuego } = useContext(ConfigContext);

    const handleVolverAJugar = () => {
        // Guardamos la configuración actual antes de reiniciar
        const configActual = { ...config };

        reiniciarJuego();

        // Restauramos las preferencias de configuración después de reiniciar
        setTimeout(() => {
            localStorage.setItem('gameConfig', JSON.stringify({
                ...configActual,
                juegoTerminado: false,
                resultadoJuego: null,
                preguntaUsuario: ''
            }));
            window.location.reload();
        }, 100);
    };

    const handleIrAlInicio = () => {
        onCerrar();
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    {config.resultadoJuego === 'ganado' ? '¡Has ganado!' : '¡Has perdido!'}
                </h2>
                <p className="mb-4 text-gray-700">
                    {config.resultadoJuego === 'ganado'
                        ? 'El oráculo ha respondido a tu pregunta.'
                        : 'El oráculo no ha encontrado respuesta.'}
                </p>
                <p className="mb-6 font-semibold text-gray-800">
                    Tu pregunta fue: "{config.preguntaUsuario}"
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onCerrar}
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Cerrar
                    </button>

                    <button
                        onClick={handleVolverAJugar}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver a jugar
                    </button>

                    <button
                        onClick={handleIrAlInicio}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Inicio
                    </button>
                </div>
            </div>
        </div>
    );
};