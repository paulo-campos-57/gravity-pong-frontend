import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PongCanvas } from '../components/PongCanvas';
import { useGameSocket } from '../hooks/useGameSocket';

export function Multiplayer() {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  
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

  if (gameOver) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-bold mb-4 text-white">{gameOver.winner} Venceu!</h2>
        <button onClick={handleBack} className="px-6 py-2 bg-purple-600 text-white rounded">Menu Principal</button>
      </div>
    );
  }

  if (gameState) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <button onClick={handleBack} className="absolute top-6 left-6 text-slate-400 hover:text-white">
          &larr; Sair da Partida
        </button>
        <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
      <button onClick={handleBack} className="absolute top-6 left-6 text-slate-400 hover:text-white">
        &larr; Voltar
      </button>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Multiplayer</h2>
        
        <button onClick={() => createMultiplayer('Player 1')} className="w-full py-3 mb-6 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">
          Criar Nova Partida
        </button>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">OU</span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Código (Ex: G1)" 
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 text-white uppercase placeholder:normal-case"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button onClick={() => joinMultiplayer('Player 2', joinCode)} className="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg font-semibold transition-colors">
            Entrar
          </button>
        </div>

        <p className="text-sm text-slate-400 mt-4">{statusMsg || 'Escolha uma opção'}</p>
      </div>
    </div>
  );
}