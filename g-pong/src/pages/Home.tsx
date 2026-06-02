import { Link, useNavigate } from 'react-router-dom';
import { useCampaign } from '../hooks/useCampaign';

export function Home() {
  const navigate = useNavigate();
  const { campaign, isLoaded, updateProfile, resetCampaign, hardReset } = useCampaign();

  if (!isLoaded) return null;

  const handleStart = (stageId: number) => {
    if (campaign.hp <= 0) return;
    if (stageId > campaign.unlockedStage) return;
    navigate(`/singleplayer?stage=${stageId}`);
  };

  const hpPercentage = (campaign.hp / campaign.maxHp) * 100;
  const isGameOver = campaign.hp <= 0;

  return (
    <div className="min-h-screen bg-black text-green-500 font-arcade flex flex-col items-center p-8 crt relative overflow-hidden">
      <div className="text-center mb-10 mt-6 z-10">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-sky-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] mb-4">
          GRAVITY DEFENDER
        </h1>
        <p className="text-white text-xs md:text-sm animate-pulse">INSERT COIN TO PROTECT YOUR PLANET</p>
      </div>

      {/* Painel do Alienígena */}
      <div className="bg-gray-900 border-4 border-purple-800 p-6 w-full max-w-2xl mb-8 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)] relative">
        
        <button 
          onClick={hardReset}
          className="absolute top-2 right-2 text-[8px] text-red-500 hover:text-white border border-red-900 hover:bg-red-600 px-2 py-1 transition-colors"
          title="Apagar dados e criar nova identidade"
        >
          [ FORMATAR SISTEMA ]
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4 md:mt-0">
          <div>
            <label className="block text-xs text-purple-400 mb-2">CÓDIGO ALIENÍGENA</label>
            <input
              type="text"
              value={campaign.playerName}
              onChange={(e) => updateProfile(e.target.value.toUpperCase(), campaign.planetName)}
              placeholder="SEU NOME..."
              className="w-full bg-black border-2 border-purple-600 text-green-400 p-3 text-xs focus:outline-none focus:border-green-400 uppercase"
              disabled={isGameOver}
            />
          </div>
          <div>
            <label className="block text-xs text-sky-400 mb-2">PLANETA NATAL</label>
            <input
              type="text"
              value={campaign.planetName}
              onChange={(e) => updateProfile(campaign.playerName, e.target.value.toUpperCase())}
              placeholder="NOME DO PLANETA..."
              className="w-full bg-black border-2 border-sky-600 text-green-400 p-3 text-xs focus:outline-none focus:border-green-400 uppercase"
              disabled={isGameOver}
            />
          </div>
        </div>

        {/* Barra de Vida do Planeta */}
        <div className="mb-2 flex justify-between text-xs text-white">
          <span>HP PLANETÁRIO: {campaign.hp}/{campaign.maxHp}</span>
          <span>RECURSOS GASTOS: {campaign.retriesUsed}/3</span>
        </div>
        <div className="w-full h-6 bg-gray-800 border-2 border-gray-600 p-1">
          <div 
            className={`h-full ${campaign.hp > 20 ? 'bg-green-500' : 'bg-red-600 animate-pulse'}`}
            style={{ width: `${hpPercentage}%`, transition: 'width 0.5s ease-in-out' }}
          ></div>
        </div>
      </div>

      {isGameOver ? (
        <div className="z-10 text-center bg-red-900 border-4 border-red-500 p-8 w-full max-w-2xl animate-pulse">
          <h2 className="text-2xl text-white mb-6">PLANETA DESTRUÍDO</h2>
          <button onClick={resetCampaign} className="bg-black text-red-500 border-2 border-red-500 py-4 px-8 hover:bg-red-500 hover:text-black mb-4 w-full">
            TENTAR DEFENDER NOVAMENTE (MESMO PLANETA)
          </button>
          <button onClick={hardReset} className="bg-black text-gray-500 border-2 border-gray-700 py-3 px-8 hover:bg-gray-500 hover:text-black w-full text-xs">
            ABANDONAR SETOR (MUDAR IDENTIDADE)
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
          {/* TORRE SINGLE PLAYER */}
          <div className="bg-gray-900 border-4 border-slate-700 p-6 flex flex-col gap-4">
            <h2 className="text-sm text-yellow-400 text-center mb-4">MÓDULO DE DEFESA</h2>
            
            {[
              { id: 1, name: "VANGUARDA VERDE", color: "text-green-500" },
              { id: 2, name: "CRUZADOR SOLAR", color: "text-yellow-500" },
              { id: 3, name: "FROTA CARMESIM", color: "text-red-500" },
              { id: 4, name: "ANOMALIA FINAL", color: "text-purple-500" },
            ].map((stage) => {
              const isLocked = stage.id > campaign.unlockedStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStart(stage.id)}
                  disabled={isLocked}
                  className={`p-4 border-2 flex justify-between text-xs items-center transition-all ${
                    isLocked 
                      ? 'bg-black border-gray-800 text-gray-700 cursor-not-allowed' 
                      : `bg-black border-gray-500 hover:bg-gray-800 hover:border-white ${stage.color}`
                  }`}
                >
                  <span>STAGE 0{stage.id}</span>
                  <span>{isLocked ? 'LOCKED' : stage.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-gray-900 border-4 border-slate-700 p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-sm text-sky-400 mb-6">MÓDULO MULTIPLAYER</h2>
            <p className="text-[10px] text-gray-400 mb-8 leading-relaxed">
              ENFRENTE OUTROS ALIENÍGENAS<br/><br/>
              A GRAVIDADE NÃO FAZ DISTINÇÃO DE RAÇAS.
            </p>
            <Link to="/multiplayer" className="w-full py-4 bg-sky-900 text-white hover:bg-sky-700 border-2 border-sky-400 text-xs text-center block">
              ENTRAR NO LOBBY
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}