import { useEffect, useRef } from 'react';

interface PongCanvasProps {
  gameId: string;
  gameState: any;
  onMovePaddle: (gameId: string, direction: string) => void;
}

export function PongCanvas({ gameId, gameState, onMovePaddle }: PongCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let currentDirection = 'stop';
    const handleKeyDown = (e: KeyboardEvent) => {
      let newDirection = currentDirection;
      if (e.key === 'ArrowUp') newDirection = 'up';
      if (e.key === 'ArrowDown') newDirection = 'down';
      if (newDirection !== currentDirection) {
        currentDirection = newDirection;
        onMovePaddle(gameId, currentDirection);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowUp' && currentDirection === 'up') ||
          (e.key === 'ArrowDown' && currentDirection === 'down')) {
        currentDirection = 'stop';
        onMovePaddle(gameId, 'stop');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameId, onMovePaddle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 1;
    ctx.stroke();

    const ball = gameState.ball;
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    const p1 = gameState.paddle1;
    const p2 = gameState.paddle2;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
    
    ctx.fillStyle = gameState.enemyColor || '#f43f5e';
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [gameState]);

  if (!gameState) return <div className="text-green-500 font-arcade text-xs animate-pulse">ESTABELECENDO CONEXÃO ORBITAL...</div>;

  return (
    <div className="flex flex-col items-center gap-6 font-arcade">
      <div className="flex w-full justify-between max-w-[800px] text-xs md:text-sm text-white px-2">
        <span className="text-sky-400">{gameState.players.player1} <br/><br/><span className="text-2xl">{gameState.scores.player1}</span></span>
        <span className="text-right" style={{ color: gameState.enemyColor || '#f43f5e' }}>{gameState.players.player2} <br/><br/><span className="text-2xl">{gameState.scores.player2}</span></span>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="bg-black border-4 border-gray-800 rounded-sm"
      />
    </div>
  );
}