import { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

export const ResultadoModal = ({ onCerrar }) => {
    const { config, reiniciarJuego } = useContext(ConfigContext);

    const handleVolverAJugar = () => {
        const configActual = { ...config };
        reiniciarJuego();
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
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border-2 p-6 rounded-lg max-w-md w-full mx-4 text-center shadow-[0_0_20px_rgba(167,139,250,0.3)]">
                <h2 className="text-3xl font-bold mb-4 text-purple-400 font-game tracking-wider">
                    {config.resultadoJuego === 'ganado' ? '¡HAS GANADO!' : '¡HAS PERDIDO!'}
                </h2>
                
                <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <p className="text-gray-300 mb-2">Tu pregunta fue:</p>
                    <p className="text-gray-100 font-medium italic">"{config.preguntaUsuario}"</p>
                </div>

                <div className="mb-6">
                    <p className={`text-xl font-game ${config.resultadoJuego === 'ganado' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {config.resultadoJuego === 'ganado' 
                            ? '¡ESTÁS CON SUERTE!' 
                            : 'LAMENTABLEMENTE NO...'}
                    </p>
                    {config.resultadoJuego === 'ganado' && (
                        <p className="text-gray-300 mt-2">El oráculo ha respondido a tu pregunta</p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleVolverAJugar}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md 
                                  hover:bg-purple-700 hover:border-purple-400 border-2 border-transparent
                                  transition-all duration-200 font-game tracking-wider"
                    >
                        VOLVER A JUGAR
                    </button>

                    <button
                        onClick={handleIrAlInicio}
                        className="w-full bg-gray-700 text-gray-100 py-2 px-4 rounded-md 
                                  hover:bg-gray-600 hover:border-gray-500 border-2 border-transparent
                                  transition-all duration-200 font-game tracking-wider"
                    >
                        IR AL INICIO
                    </button>

                    <button
                        onClick={onCerrar}
                        className="w-full bg-transparent text-purple-400 py-2 px-4 rounded-md 
                                  hover:text-purple-300 hover:border-purple-400 border-2 border-gray-700
                                  transition-all duration-200 font-game tracking-wider"
                    >
                        CERRAR
                    </button>
                </div>
            </div>
        </div>
    );
};