import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PongCanvas } from '../components/PongCanvas';
import { useGameSocket } from '../hooks/useGameSocket';

export function SinglePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    gameState, gameId, gameOver, 
    createSinglePlayer, movePaddle, leaveGame 
  } = useGameSocket();

  // Captura os parâmetros da URL para saber qual fase inicializar
  const queryParams = new URLSearchParams(location.search);
  const stage = parseInt(queryParams.get('stage') || '1', 10);
  const name = queryParams.get('name') || 'Jogador';

  useEffect(() => {
    createSinglePlayer(name, stage);
    
    return () => leaveGame();
  }, [createSinglePlayer, leaveGame, name, stage]);

  const handleBack = () => {
    leaveGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <button onClick={handleBack} className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 font-mono text-sm">
        &larr; ABANDONAR TORRE
      </button>

      {gameOver ? (
        <div className="text-center text-white bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm">
          <h2 className="text-4xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            FIM DE COMBATE
          </h2>
          <p className="text-slate-300 mb-6 font-medium font-sans">Vencedor: {gameOver.winner}</p>
          <button onClick={handleBack} className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-transform hover:scale-105">
            Retornar ao Mapa da Torre
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="text-center mb-2 font-mono text-xs uppercase tracking-widest text-slate-500">
            Fase Atual da Torre: <span style={{ color: gameState?.enemyColor || '#fff' }} className="font-bold">{stage}</span>
          </div>
          <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
        </div>
      )}
    </div>
  );
}