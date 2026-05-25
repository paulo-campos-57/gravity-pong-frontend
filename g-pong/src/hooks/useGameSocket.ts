import { useState, useEffect, useCallback } from 'react';
import { socket } from '../socket';

export function useGameSocket() {
  const [gameState, setGameState] = useState<any>(null);
  const [gameId, setGameId] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [gameOver, setGameOver] = useState<{ winner: string } | null>(null);

  useEffect(() => {
    // Garante que o socket esteja conectado
    if (!socket.connected) {
      socket.connect();
    }

    // Configura os ouvintes de eventos
    socket.on('game_created', (data) => setGameId(data.gameId));
    socket.on('game_joined', (data) => setGameId(data.gameId));
    socket.on('game_state', (state) => setGameState(state));
    socket.on('game_over', (data) => setGameOver(data));
    socket.on('game_log', (msg) => setStatusMsg(msg));
    socket.on('game_error', (err) => setStatusMsg(`Erro: ${err}`));

    // Limpeza ao desmontar o componente que usar o hook
    return () => {
      socket.off('game_created');
      socket.off('game_joined');
      socket.off('game_state');
      socket.off('game_over');
      socket.off('game_log');
      socket.off('game_error');
    };
  }, []);

  // Ações que o frontend pode despachar para o backend
  const createSinglePlayer = useCallback((playerName: string) => {
    socket.emit('create_single_player', { playerName, maxScore: 5 });
  }, []);

  const createMultiplayer = useCallback((playerName: string) => {
    socket.emit('create_game', { playerName, maxScore: 5 });
  }, []);

  const joinMultiplayer = useCallback((playerName: string, id: string) => {
    socket.emit('join_game', { playerName, gameId: id.toUpperCase() });
  }, []);

  const movePaddle = useCallback((id: string, direction: string) => {
    socket.emit('move_paddle', { gameId: id, direction });
  }, []);

  // Força a desconexão para encerrar a partida no backend se o usuário sair da tela
  const leaveGame = useCallback(() => {
    socket.disconnect();
    setTimeout(() => socket.connect(), 500); // Reconecta para ficar pronto para a próxima
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