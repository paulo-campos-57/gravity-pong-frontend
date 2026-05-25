import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 mb-4 tracking-tighter">
          GRAVITY PONG
        </h1>
        <p className="text-slate-400 text-lg">Sobreviva ao buraco negro.</p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Link 
          to="/singleplayer"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-sky-600 rounded-xl hover:bg-sky-500 hover:scale-105"
        >
          Single Player (vs CPU)
        </Link>
        
        <Link 
          to="/multiplayer"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 rounded-xl hover:bg-purple-500 hover:scale-105"
        >
          Multiplayer Online
        </Link>
      </div>
    </div>
  );
}