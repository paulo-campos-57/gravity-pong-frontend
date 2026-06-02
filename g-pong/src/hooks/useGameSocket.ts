import { useState, useEffect, useCallback } from 'react';
import { socket } from '../socket';

export function useGameSocket() {
  const [gameState, setGameState] = useState<any>(null);
  const [gameId, setGameId] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [gameOver, setGameOver] = useState<{ winner: string } | null>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('game_created', (data) => setGameId(data.gameId));
    socket.on('game_joined', (data) => setGameId(data.gameId));
    socket.on('game_state', (state) => setGameState(state));
    socket.on('game_over', (data) => setGameOver(data));
    socket.on('game_log', (msg) => setStatusMsg(msg));
    socket.on('game_error', (err) => setStatusMsg(`Erro: ${err}`));

    return () => {
      socket.off('game_created');
      socket.off('game_joined');
      socket.off('game_state');
      socket.off('game_over');
      socket.off('game_log');
      socket.off('game_error');
    };
  }, []);

  const createSinglePlayer = useCallback((playerName: string, stage: number) => {
    setGameOver(null);
    setGameState(null);
    socket.emit('create_single_player', { playerName, maxScore: 5, stage });
  }, []);

  const createMultiplayer = useCallback((playerName: string) => {
    setGameOver(null);
    setGameState(null);
    socket.emit('create_game', { playerName, maxScore: 5 });
  }, []);

  const joinMultiplayer = useCallback((playerName: string, id: string) => {
    setGameOver(null);
    setGameState(null);
    socket.emit('join_game', { playerName, gameId: id.toUpperCase() });
  }, []);

  const movePaddle = useCallback((id: string, direction: string) => {
    socket.emit('move_paddle', { gameId: id, direction });
  }, []);

  const leaveGame = useCallback(() => {
    setGameOver(null);
    setGameState(null);
    socket.disconnect();
    setTimeout(() => socket.connect(), 500);
  }, []);

  return {
    gameState,
    gameId,
    statusMsg,
    gameOver,
    createSinglePlayer,
    createMultiplayer,
    joinMultiplayer,
    movePaddle,
    leaveGame,
  };
}