import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Carta from '../Carta/Carta';
import { useTableroLogic, posicionesCartas } from './useTableroLogic';
import { barajar } from './gameActions/barajar';
import { repartir } from './gameActions/repartir';
import { juegoAutomatico } from './gameActions/juegoAutomatico';
import { iniciarModoManual } from './gameActions/modoManual';
import { manejarDragStart, manejarDragOver, manejarDrop } from './helpers/dragAndDrop';
import { renderGrid } from './helpers/renderGrid';
import GamePanel from './GamePanel';
import { DealerModal } from '../Dealer/DealerModal';
import { ResultadoModal } from '../Dealer/ResultadoModal';
import { ConfigContext } from '../../context/ConfigContext';

const Tablero = ({ onJuegoTerminado }) => {
  const tableroLogic = useTableroLogic();
  const [showGamePanel, setShowGamePanel] = useState(false);
  const { config, actualizarResultadoJuego } = useContext(ConfigContext);
  const [mostrarDealerModal, setMostrarDealerModal] = useState(true);
  const [mostrarResultadoModal, setMostrarResultadoModal] = useState(false);

  const handlers = {
    manejarDragStart: (carta) => manejarDragStart(
      carta,
      tableroLogic.setCartaSeleccionada,
      tableroLogic.modoManual
    ),
    manejarDragOver,
    manejarDrop: (e, posicion) => manejarDrop(
      e,
      posicion,
      {
        cartaSeleccionada: tableroLogic.cartaSeleccionada,
        cartas: tableroLogic.cartas,
        setCartas: tableroLogic.setCartas,
        setCartaSeleccionada: tableroLogic.setCartaSeleccionada,
        setPosicionActual: tableroLogic.setPosicionActual,
        posicionesCartas,
        modoManual: tableroLogic.modoManual
      }
    )
  };

  const verificarResultado = (todasVolteadas) => {
    actualizarResultadoJuego(todasVolteadas ? 'ganado' : 'perdido');
    setMostrarResultadoModal(true);
    if (onJuegoTerminado) {
      onJuegoTerminado(todasVolteadas);
    }
  };

  const handleJuegoAutomatico = async () => {
    setShowGamePanel(true);
    await juegoAutomatico({
      ...tableroLogic,
      posicionesCartas,
      onTerminar: verificarResultado
    });
  };

  const handleModoManual = async () => {
    setShowGamePanel(true);
    await iniciarModoManual(tableroLogic);
  };

  const manejarComenzar = () => {
    setMostrarDealerModal(false);
  };

  return (
    <div
      className="flex flex-row min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/assets/tablero/${config.tablero}.png)`,
        backgroundColor: '#1a202c' // Color de fondo por si falla la imagen
      }}
    >
      {/* Modal del Dealer */}
      {mostrarDealerModal && (
        <DealerModal onComenzar={manejarComenzar} />
      )}

      {/* Modal de Resultado */}
      {mostrarResultadoModal && (
        <ResultadoModal onCerrar={() => setMostrarResultadoModal(false)} />
      )}

      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {renderGrid({
            cartas: tableroLogic.cartas,
            posicionesCartas,
            modoManual: tableroLogic.modoManual,
            ...handlers
          })}
        </div>
      </div>

      {/* Columna derecha con controles */}
      <div className="w-1/3 min-w-[300px] relative">
        <AnimatePresence>
          {showGamePanel ? (
            <motion.div
              key="gamePanel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-4"
            >
              <GamePanel cartas={tableroLogic.cartas} />
            </motion.div>
          ) : (
            <motion.div
              key="controlPanel"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-8 flex flex-col justify-center"
            >
              <div className="space-y-8">
                <div className="relative h-48 w-full flex justify-center items-center">
                  {tableroLogic.cartas
                    .filter(c => !c.posicion)
                    .map((carta, index) => (
                      <Carta
                        key={carta.id}
                        valor={carta.valor}
                        palo={carta.palo}
                        index={index}
                        estaBarajando={tableroLogic.estaBarajando}
                        voltear={carta.volteado}
                      />
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                  {/* Botón Barajar */}
                  <button
                    onClick={() => barajar(tableroLogic)}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className={`px-6 py-2.5 rounded-md font-bold tracking-wide transition-all duration-200 relative overflow-hidden group ${tableroLogic.estaBarajando
                        ? 'bg-gray-800 border-2 border-purple-400 shadow-purple-glow'
                        : 'bg-gray-800 border-2 border-purple-500 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.5)]'
                      } disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-500 disabled:shadow-none text-gray-100`}
                  >
                    {tableroLogic.estaBarajando ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        BARAJANDO...
                      </span>
                    ) : (
                      <>
                        BARAJAR CARTAS
                        <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                      </>
                    )}
                  </button>

                  {/* Botón Repartir */}
                  <button
                    onClick={() => repartir({ ...tableroLogic, posicionesCartas })}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className={`px-6 py-2.5 rounded-md font-bold tracking-wide transition-all duration-200 relative overflow-hidden group ${tableroLogic.estaRepartiendo
                        ? 'bg-gray-800 border-2 border-purple-400 shadow-purple-glow'
                        : 'bg-gray-800 border-2 border-purple-500 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.5)]'
                      } disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-500 disabled:shadow-none text-gray-100`}
                  >
                    {tableroLogic.estaRepartiendo ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        REPARTIENDO...
                      </span>
                    ) : (
                      <>
                        REPARTIR CARTAS
                        <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                      </>
                    )}
                  </button>

                  {/* Botón Juego Automático */}
                  <button
                    onClick={handleJuegoAutomatico}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className={`px-6 py-2.5 rounded-md font-bold tracking-wide transition-all duration-200 relative overflow-hidden group ${tableroLogic.estaJugando
                        ? 'bg-gray-800 border-2 border-purple-400 shadow-purple-glow'
                        : 'bg-gray-800 border-2 border-purple-500 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.5)]'
                      } disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-500 disabled:shadow-none text-gray-100`}
                  >
                    {tableroLogic.estaJugando ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        JUGANDO...
                      </span>
                    ) : (
                      <>
                        JUEGO AUTOMÁTICO
                        <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                      </>
                    )}
                  </button>

                  {/* Botón Modo Manual */}
                  <button
                    onClick={handleModoManual}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className={`px-6 py-2.5 rounded-md font-bold tracking-wide transition-all duration-200 relative overflow-hidden group ${tableroLogic.modoManual
                        ? 'bg-gray-800 border-2 border-purple-400 shadow-purple-glow animate-pulse'
                        : 'bg-gray-800 border-2 border-purple-500 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.5)]'
                      } disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-500 disabled:shadow-none text-gray-100`}
                  >
                    {tableroLogic.modoManual ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        MODO MANUAL ACTIVADO
                      </span>
                    ) : (
                      <>
                        JUEGO MANUAL
                        <span className="absolute bottom-0 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tablero;