import { useEffect, useState } from 'react';
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

  const [showLore, setShowLore] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const stage = parseInt(queryParams.get('stage') || '1', 10);
  
  const alienProfile = campaign.playerName ? `${campaign.playerName} (${campaign.planetName})` : 'Alien (Desconhecido)';

  const getStageLore = () => {
    switch(stage) {
      case 1:
        return (
          <>
            <p className="mb-8 text-sky-400 text-lg">EPISÓDIO I: A PRIMEIRA ONDA</p>
            <p className="mb-8">A invasão do nosso setor começou.</p>
            <p className="mb-8">O sistema de defesa de {campaign.planetName} detectou naves da Vanguarda Verde orbitando a região.</p>
            <p className="mb-8">A energia da nossa barreira planetária está em exatos <span className="text-green-500 animate-pulse">{campaign.hp} de HP</span>.</p>
            <p className="mb-8">Prepare os módulos defletores e proteja nosso lar!</p>
          </>
        );
      case 2:
        return (
          <>
            <p className="mb-8 text-sky-400 text-lg">EPISÓDIO II: A VELOCIDADE DA LUZ</p>
            <p className="mb-8">A Vanguarda Verde caiu, mas o Império enviou o temido Cruzador Solar.</p>
            <p className="mb-8">Eles descobriram como utilizar a gravidade para aumentar a aceleração dos projéteis a cada rebatida.</p>
            <p className="mb-8">O núcleo de {campaign.planetName} resiste com bravura. HP atual: <span className="text-green-500 animate-pulse">{campaign.hp}</span>.</p>
            <p className="mb-8">A batalha se intensifica. Mantenha os reflexos afiados.</p>
          </>
        );
      case 3:
        return (
          <>
            <p className="mb-8 text-sky-400 text-lg">EPISÓDIO III: O PESO DO VAZIO</p>
            <p className="mb-8">A gravidade ao redor de {campaign.planetName} está colapsando.</p>
            <p className="mb-8">A Frota Carmesim chegou. Eles manipulam uma Anomalia Gravitacional massiva no centro do campo de batalha.</p>
            <p className="mb-8">As trajetórias não farão mais sentido. Com os escudos em <span className="text-green-500 animate-pulse">{campaign.hp} de HP</span>, qualquer erro será fatal.</p>
            <p className="mb-8">Confie no seu instinto e sobreviva.</p>
          </>
        );
      case 4:
        return (
          <>
            <p className="mb-8 text-sky-400 text-lg">EPISÓDIO IV: O FIM DOS TEMPOS</p>
            <p className="mb-8">O espaço se contorce. A luz desaparece.</p>
            <p className="mb-8">A Anomalia Suprema, líder da invasão, desceu pessoalmente ao campo de batalha.</p>
            <p className="mb-8">Com velocidade terminal e uma atração esmagadora, este é o confronto decisivo.</p>
            <p className="mb-8">{campaign.planetName} chora, segurando seus últimos <span className="text-green-500 animate-pulse">{campaign.hp} de HP</span>.</p>
            <p className="mb-8 text-red-500 animate-pulse">Que a Força da Gravidade esteja com você.</p>
          </>
        );
      default:
        return <p>Anomalia não identificada.</p>;
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (stage > campaign.unlockedStage) {
      navigate('/');
      return;
    }
    
    if (showLore) return;

    createSinglePlayer(alienProfile, stage);
    
    return () => leaveGame();
  }, [createSinglePlayer, leaveGame, alienProfile, stage, isLoaded, campaign.unlockedStage, navigate, showLore]);

  const handleRetreat = () => {
    takeCriticalDamage();
    leaveGame();
    navigate('/');
  };

  const handleRetry = () => {
    const cost = RETRY_COSTS[campaign.retriesUsed];
    useRetry(cost);
    setShowLore(true); 
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

  if (showLore) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 font-arcade crt">
        <button 
          onClick={() => setShowLore(false)} 
          className="absolute top-8 right-8 text-xs text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-2 z-[60] transition-colors"
        >
          [ INICIAR DEFESA ]
        </button>
        
        <div className="star-wars-container max-w-2xl z-50">
          <div className="star-wars-text text-xs md:text-lg lg:text-xl font-bold">
            {getStageLore()}
          </div>
        </div>
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
        <span>HP: <span className={campaign.hp <= 20 ? 'text-red-500 animate-pulse' : 'text-green-500'}>{campaign.hp}</span></span>
      </div>
      <PongCanvas gameId={gameId} gameState={gameState} onMovePaddle={movePaddle} />
      <button onClick={handleRetreat} className="mt-8 text-xs text-gray-600 hover:text-white uppercase border border-gray-800 px-4 py-2 hover:bg-gray-800 transition-colors">
        [ ABORTAR MISSÃO E ACEITAR DANO ]
      </button>
    </div>
  );
}