import React from 'react';
import Carta from '../Carta/Carta';
import { useTableroLogic, posicionesCartas } from './useTableroLogic';
import { barajar } from './gameActions/barajar';
import { repartir } from './gameActions/repartir';
import { juegoAutomatico } from './gameActions/juegoAutomatico';
import { iniciarModoManual } from './gameActions/modoManual';
import { manejarDragStart, manejarDragOver, manejarDrop } from './helpers/dragAndDrop';
import { renderGrid } from './helpers/renderGrid';

const Tablero = () => {
  const tableroLogic = useTableroLogic();
  
  // Configuración de las funciones con los parámetros necesarios
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

  return (
    <div className="flex flex-row min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/tablero/tablero.png)' }}>
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

      <div className="w-1/3 p-8 flex flex-col justify-center">
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
              onClick={() => repartir({...tableroLogic, posicionesCartas})}
              disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {tableroLogic.estaRepartiendo ? 'Repartiendo...' : 'Repartir Cartas'}
            </button>

            <button
              onClick={() => juegoAutomatico({...tableroLogic, posicionesCartas})}
              disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {tableroLogic.estaJugando ? 'Jugando...' : 'Juego Automático'}
            </button>

            <button
              onClick={() => iniciarModoManual(tableroLogic)}
              disabled={tableroLogic.estaBarajando || tableroLogic.estaRepartiendo || tableroLogic.estaJugando || tableroLogic.modoManual}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors text-lg font-medium w-full"
            >
              {tableroLogic.modoManual ? 'Modo Manual Activado' : 'Juego Manual'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tablero;