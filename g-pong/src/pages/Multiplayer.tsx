import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PongCanvas } from '../components/PongCanvas';
import { useGameSocket } from '../hooks/useGameSocket';

export function Multiplayer() {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [playerName, setPlayerName] = useState('');

  const {
    gameState, gameId, statusMsg, gameOver,
    createMultiplayer, joinMultiplayer, movePaddle, leaveGame
  } = useGameSocket();

  useEffect(() => {
    return () => leaveGame();
  }, [leaveGame]);

  const handleBack = () => {
    leaveGame();
    navigate('/');
  };

  const getActiveName = () => {
    return playerName.trim() || 'PILOTO-X';
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-arcade crt">
        <div className="p-10 border-4 border-yellow-500 bg-yellow-950/20 max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-yellow-500 animate-pulse">
            FIM DE TRANSMISSÃO
          </h2>
          <p className="text-white text-md uppercase mb-10">
            {gameOver.winner} Venceu a Partida!
          </p>
          <button
            onClick={handleBack}
            className="w-full bg-black border-2 border-yellow-500 text-yellow-500 py-4 hover:bg-yellow-500 hover:text-black transition-colors text-xs"
          >
            [ MENU PRINCIPAL ]
          </button>
        </div>
      </div>
    );
  }

  if (gameState) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-arcade crt">
        <div className="w-full max-w-[800px] flex justify-between text-gray-500 text-[10px] mb-4">
          <span>SALA DE COMBATE: {gameId}</span>
          <button onClick={handleBack} className="text-red-500 hover:text-white uppercase transition-colors">
            [ ABORTAR CONEXÃO ]
          </button>
        </div>
        <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white font-arcade crt">
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 text-xs text-gray-500 border border-gray-800 hover:bg-gray-800 hover:text-white px-4 py-2 transition-colors"
      >
        [ VOLTAR ]
      </button>

      <div className="border-4 border-green-500 bg-green-900/10 p-10 w-full max-w-md text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-green-500 tracking-wider">MODO MULTIPLAYER</h2>

        <div className="mb-6 text-left">
          <p className="text-[10px] text-green-600 mb-2 uppercase">IDENTIFICAÇÃO DO PILOTO:</p>
          <input
            type="text"
            placeholder="DIGITE SEU CODINOME"
            className="w-full px-4 py-3 bg-black border-2 border-green-900 focus:outline-none focus:border-green-500 text-green-400 font-mono text-center uppercase placeholder:text-green-950"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={15}
          />
        </div>

        <div className="border-t border-green-900/40 my-6"></div>

        <button
          onClick={() => createMultiplayer(getActiveName())}
          className="w-full py-4 mb-6 bg-black border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold transition-colors text-xs"
        >
          INICIAR NOVA FREQUÊNCIA
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t-2 border-dashed border-green-900"></div>
          <span className="flex-shrink-0 mx-4 text-green-700 text-xs">OU</span>
          <div className="flex-grow border-t-2 border-dashed border-green-900"></div>
        </div>

        <div className="flex flex-col text-left mb-6">
          <p className="text-[10px] text-green-600 mb-2 uppercase">Sintonizar canal existente:</p>
          <input
            type="text"
            placeholder="CÓDIGO (EX: G1)"
            className="w-full px-4 py-3 mb-3 bg-black border-2 border-green-900 focus:outline-none focus:border-green-500 text-green-400 font-mono text-center uppercase placeholder:text-green-950"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={() => joinMultiplayer(getActiveName(), joinCode)}
            className="w-full py-4 bg-black border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-black font-semibold transition-colors text-xs uppercase"
          >
            CONECTAR
          </button>
        </div>

        <div className="border border-green-900/50 p-2 bg-black/50">
          <p className="text-[10px] text-yellow-600 uppercase tracking-widest animate-pulse">
            {statusMsg || 'SISTEMA PRONTO PARA PAREAMENTO'}
          </p>
        </div>
      </div>
    </div>
  );
}