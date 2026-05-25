import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PongCanvas } from '../components/PongCanvas';
import { useGameSocket } from '../hooks/useGameSocket';

export function SinglePlayer() {
  const navigate = useNavigate();
  const { 
    gameState, gameId, gameOver, 
    createSinglePlayer, movePaddle, leaveGame 
  } = useGameSocket();

  useEffect(() => {
    createSinglePlayer('Jogador (Você)');
    
    // Ao sair da tela, avisa o servidor que desconectamos
    return () => leaveGame();
  }, [createSinglePlayer, leaveGame]);

  const handleBack = () => {
    leaveGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <button onClick={handleBack} className="absolute top-6 left-6 text-slate-400 hover:text-white">
        &larr; Voltar
      </button>

      {gameOver ? (
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{gameOver.winner} Venceu!</h2>
          <button onClick={handleBack} className="px-6 py-2 bg-sky-600 rounded hover:bg-sky-500">
            Menu Principal
          </button>
        </div>
      ) : (
        <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
      )}
    </div>
  );
}