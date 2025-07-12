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

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => barajar(tableroLogic)}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
                  >
                    {tableroLogic.estaBarajando ? 'Barajando...' : 'Barajar Cartas'}
                  </button>

                  <button
                    onClick={() => repartir({ ...tableroLogic, posicionesCartas })}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
                  >
                    {tableroLogic.estaRepartiendo ? 'Repartiendo...' : 'Repartir Cartas'}
                  </button>

                  <button
                    onClick={handleJuegoAutomatico}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
                  >
                    {tableroLogic.estaJugando ? 'Jugando...' : 'Juego Automático'}
                  </button>

                  <button
                    onClick={handleModoManual}
                    disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
                    className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
                  >
                    {tableroLogic.modoManual ? 'Modo Manual Activado' : 'Juego Manual'}
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