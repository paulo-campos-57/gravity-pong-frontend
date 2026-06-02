import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PongCanvas } from '../components/PongCanvas';
import { useGameSocket } from '../hooks/useGameSocket';
import { useCampaign } from '../hooks/useCampaign';

const RETRY_COSTS = [3, 5, 8];

export function SinglePlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const { campaign, isLoaded, takeCriticalDamage, useRetry, unlockNextStage } = useCampaign();
  const { gameState, gameId, gameOver, createSinglePlayer, movePaddle, leaveGame } = useGameSocket();

  const queryParams = new URLSearchParams(location.search);
  const stage = parseInt(queryParams.get('stage') || '1', 10);

  const alienProfile = campaign.playerName ? `${campaign.playerName} (${campaign.planetName})` : 'Alien (Desconhecido)';

  useEffect(() => {
    if (!isLoaded) return;

    if (stage > campaign.unlockedStage) {
      navigate('/');
      return;
    }

    createSinglePlayer(alienProfile, stage);
    return () => leaveGame();
  }, [createSinglePlayer, leaveGame, alienProfile, stage, isLoaded, campaign.unlockedStage, navigate]);

  const handleRetreat = () => {
    takeCriticalDamage();
    leaveGame();
    navigate('/');
  };

  const handleRetry = () => {
    const cost = RETRY_COSTS[campaign.retriesUsed];
    useRetry(cost);
    createSinglePlayer(alienProfile, stage);
  };

  const handleNext = () => {
    unlockNextStage(stage);
    leaveGame();
    navigate('/');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-arcade crt text-green-500 text-xs animate-pulse">
        INICIALIZANDO SISTEMAS ORBITAIS...
      </div>
    );
  }

  if (gameOver) {
    const isWin = gameOver.scores.player1 > gameOver.scores.player2;
    const currentRetryCost = RETRY_COSTS[campaign.retriesUsed];
    const canRetry = campaign.retriesUsed < 3 && campaign.hp > currentRetryCost;

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-arcade crt">
        <div className={`p-10 border-4 max-w-2xl text-center ${isWin ? 'border-green-500 bg-green-900/20' : 'border-red-600 bg-red-900/20'}`}>
          <h2 className={`text-4xl mb-8 ${isWin ? 'text-green-400' : 'text-red-500'}`}>
            {isWin ? 'INVASÃO REPELIDA!' : 'SISTEMAS COMPROMETIDOS!'}
          </h2>

          <p className="text-white text-xs leading-loose mb-10">
            {isWin
              ? `A defesa do planeta ${campaign.planetName} foi bem sucedida. O setor está seguro.`
              : `Sua defesa falhou. A frota inimiga está prestes a bombardear ${campaign.planetName}.`
            }
          </p>

          <div className="flex flex-col gap-4">
            {isWin ? (
              <button onClick={handleNext} className="bg-black border-2 border-green-500 text-green-500 py-4 hover:bg-green-500 hover:text-black">
                CONTINUAR CAMPANHA
              </button>
            ) : (
              <>
                <button onClick={handleRetreat} className="bg-black border-2 border-red-500 text-red-500 py-4 hover:bg-red-500 hover:text-black text-xs">
                  ACEITAR DERROTA (-15 HP)
                </button>

                {canRetry ? (
                  <button onClick={handleRetry} className="bg-black border-2 border-yellow-500 text-yellow-500 py-4 hover:bg-yellow-500 hover:text-black text-[10px]">
                    DISTORÇÃO TEMPORAL: TENTAR NOVAMENTE (-{currentRetryCost} HP)
                  </button>
                ) : (
                  <p className="text-red-700 text-xs mt-4">SEM RECURSOS TEMPORAIS SUFICIENTES.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-arcade crt">
      <div className="w-full max-w-[800px] flex justify-between text-gray-500 text-[10px] mb-4">
        <span>ESTÁGIO 0{stage}</span>
        <span>HP: {campaign.hp}</span>
      </div>
      <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
      <button onClick={handleRetreat} className="mt-8 text-xs text-gray-600 hover:text-white uppercase">
        [ ABORTAR MISSÃO ]
      </button>
    </div>
  );
}