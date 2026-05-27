import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  // Carrega o nome persistido no localStorage ao iniciar
  useEffect(() => {
    const savedName = localStorage.getItem('pong_player_name');
    if (savedName) setPlayerName(savedName);
  }, []);

  // Salva alterações do nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPlayerName(name);
    localStorage.setItem('pong_player_name', name);
  };

  const startSinglePlayerStage = (stageId: number) => {
    const nameToUse = playerName.trim() || 'Jogador';
    navigate(`/singleplayer?stage=${stageId}&name=${encodeURIComponent(nameToUse)}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white selection:bg-purple-500">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-sky-400">
          GRAVITY PONG
        </h1>
        <p className="text-slate-400 mt-2 font-mono text-sm">DESAFIE AS TORRES DE GRAVIDADE</p>
      </div>

      {/* Input de Perfil do Jogador */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl w-full max-w-md mb-8 shadow-xl">
        <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
          Identificação do Combatente
        </label>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={playerName}
          onChange={handleNameChange}
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-medium placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl items-start">
        {/* LADO ESQUERDO: TORRE SINGLE PLAYER (Estilo MK de baixo para cima) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col shadow-2xl">
          <h2 className="text-xl font-black uppercase text-center mb-6 tracking-wide text-amber-500 border-b border-slate-800 pb-3">
            Torre Gravitacional (Single Player)
          </h2>
          
          <div className="flex flex-col-reverse gap-3">
            {/* ANDAR 1 (BASE) */}
            <button
              onClick={() => startSinglePlayerStage(1)}
              className="w-full py-4 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/50 rounded-xl font-bold transition-all hover:scale-[1.02] flex justify-between items-center px-6 group"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                1. Recruta Cósmico
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded uppercase font-mono group-hover:bg-emerald-500 group-hover:text-black transition-colors">Fácil</span>
            </button>

            {/* ANDAR 2 */}
            <button
              onClick={() => startSinglePlayerStage(2)}
              className="w-full py-4 bg-yellow-950/30 hover:bg-yellow-900/40 border border-yellow-500/40 rounded-xl font-bold transition-all hover:scale-[1.02] flex justify-between items-center px-6 group"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                2. Caçador Sônico
              </span>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded uppercase font-mono group-hover:bg-yellow-500 group-hover:text-black transition-colors">Aceleração</span>
            </button>

            {/* ANDAR 3 */}
            <button
              onClick={() => startSinglePlayerStage(3)}
              className="w-full py-4 bg-red-950/30 hover:bg-red-900/40 border border-red-500/40 rounded-xl font-bold transition-all hover:scale-[1.02] flex justify-between items-center px-6 group"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                3. Destruidor de Órbitas
              </span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded uppercase font-mono group-hover:bg-red-500 group-hover:text-white transition-colors">Super Gravidade</span>
            </button>

            {/* ANDAR 4 (TOPO - BOSS) */}
            <button
              onClick={() => startSinglePlayerStage(4)}
              className="w-full py-5 bg-purple-950/50 hover:bg-purple-900/70 border-2 border-purple-500 rounded-xl font-black text-purple-200 tracking-wide transition-all hover:scale-[1.03] shadow-lg shadow-purple-500/10 flex justify-between items-center px-6 group"
            >
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-400 shadow-md shadow-purple-400"></span>
                4. ANOMALIA SUPREMA
              </span>
              <span className="text-xs bg-purple-500 text-black px-2.5 py-1 rounded uppercase font-mono font-black animate-bounce">BOSS</span>
            </button>
          </div>
        </div>

        {/* LADO DIREITO: HUB MULTIPLAYER */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-full flex flex-col justify-between shadow-2xl">
          <div>
            <h2 className="text-xl font-black uppercase text-center mb-6 tracking-wide text-sky-400 border-b border-slate-800 pb-3">
              Arena Conectada
            </h2>
            <p className="text-slate-400 text-sm text-center font-sans mb-8">
              Crie salas ou digite códigos gerados para disputar partidas de gravidade mútua com jogadores em tempo real.
            </p>
          </div>

          <Link
            to="/multiplayer"
            className="w-full text-center py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-xl hover:from-sky-500 hover:to-indigo-500 hover:scale-[1.02] shadow-lg shadow-sky-500/10"
          >
            Acessar Lobby Online &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}