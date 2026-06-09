import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Sobre() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

    const equipe = [
        { nome: "Carlos Augusto Peixoto Vasconcelos Filho", email: "capvf@cesar.school" },
        { nome: "Estela de Lacerda Oliveira", email: "elo@cesar.school" },
        { nome: "Gabriel Simões Rossiter", email: "gsr@cesar.school" },
        { nome: "Paulo Montenegro Campos", email: "pmc3@cesar.school" },
    ];

    return (
        <div className="min-h-screen bg-black text-green-500 font-arcade flex flex-col items-center p-8 crt relative overflow-hidden">

            <div className="w-full max-w-4xl flex justify-between mb-8 z-10">
                <button
                    onClick={() => navigate('/')}
                    className="text-xs text-purple-400 border border-purple-800 hover:bg-purple-800 hover:text-white px-4 py-2 transition-colors"
                >
                    [ BACK / VOLTAR ]
                </button>

                <button
                    onClick={() => setLanguage(language === 'PT' ? 'EN' : 'PT')}
                    className="text-xs text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-2 transition-colors"
                >
                    {language === 'PT' ? '[ SWITCH TO ENGLISH ]' : '[ MUDAR PARA PORTUGUÊS ]'}
                </button>
            </div>

            <div className="text-center mb-10 z-10">
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-sky-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] mb-4">
                    {language === 'PT' ? 'SOBRE O PROJETO' : 'ABOUT THE PROJECT'}
                </h1>
                <p className="text-white text-xs md:text-sm animate-pulse">
                    {language === 'PT' ? 'HISTÓRICO DE DESENVOLVIMENTO & SISTEMAS' : 'DEVELOPMENT LOG & SYSTEM INFRASTRUCTURE'}
                </p>
            </div>

            <div className="w-full max-w-4xl bg-gray-900 border-4 border-slate-700 p-6 md:p-8 z-10 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col gap-8 text-xs md:text-sm leading-relaxed text-gray-300">

                <section className="border-b border-slate-800 pb-6">
                    <h2 className="text-sky-400 font-bold mb-4 flex items-center gap-2">
                        {language === 'PT' ? '1. CONCEITO DO JOGO' : '1. GAME CONCEPT'}
                    </h2>
                    <p className="mb-4">
                        {language === 'PT'
                            ? 'O Gravity Defender é uma releitura moderna e caótica do clássico jogo Arcade "Pong". No milênio 3024, uma anomalia conhecida como "O Buraco Negro Central" distorceu as leis da física. O jogo introduz um poço gravitacional no centro da arena que altera constantemente a trajetória da bola de forma curva e imprevisível.'
                            : 'Gravity Defender is a modern, chaotic reimagining of the classic Arcade game "Pong". In the millennium 3024, an anomaly known as "The Central Black Hole" distorted the laws of physics. The game introduces a gravity well in the center of the screen that constantly warps the ball\'s trajectory into unpredictable curves.'}
                    </p>
                    <p>
                        {language === 'PT'
                            ? 'O projeto foi desenvolvido como parte da Eletiva de Game Design (2026.1) no curso de Bacharelado em Design da CESAR School.'
                            : 'The project was developed as part of the Game Design Elective (2026.1) for the Bachelor of Design degree at CESAR School.'}
                    </p>
                </section>

                <section className="border-b border-slate-800 pb-6">
                    <h2 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                        {language === 'PT' ? '2. EQUIPA / DESENVOLVEDORES' : '2. THE TEAM / DEVELOPERS'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {equipe.map((membro, index) => (
                            <div key={index} className="bg-black border border-purple-900 p-4 rounded shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                                <p className="text-white font-bold text-xs md:text-sm mb-1">{membro.nome}</p>
                                <p className="text-gray-500 text-[10px] md:text-xs font-mono">{membro.email}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-b border-slate-800 pb-6">
                    <h2 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                        {language === 'PT' ? '3. SERVIDOR & DOCUMENTAÇÃO BACK-END' : '3. SERVER & BACK-END DOCUMENTATION'}
                    </h2>
                    <p className="mb-4">
                        {language === 'PT'
                            ? 'O motor de física do jogo opera a um Tick Rate estável de 60Hz diretamente no servidor para evitar trapaças e garantir sincronia total nas partidas multiplayer.'
                            : 'The game\'s physics engine operates at a stable 60Hz server-side Tick Rate to ensure multiplayer synchronization and anti-cheat enforcement.'}
                    </p>
                    <div className="bg-black border-2 border-red-900 p-4 rounded flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-red-500 font-bold mb-1">PRODUÇÃO LIVE SERVER (RENDER)</p>
                            <p className="text-gray-400 text-[11px]">
                                {language === 'PT'
                                    ? 'Acesse os endpoints e a interface Swagger interativa do nosso servidor hospedado.'
                                    : 'Access endpoints and the interactive Swagger interface of our hosted server.'}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <a
                                href="https://gravity-pong-backend.onrender.com/api-docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-950 text-white border border-red-500 px-4 py-2 text-center text-xs hover:bg-red-600 transition-colors"
                            >
                                SWAGGER API DOCS
                            </a>
                            <a
                                href="https://gravity-pong-backend.onrender.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-900 text-gray-400 border border-gray-700 px-4 py-2 text-center text-xs hover:bg-gray-700 hover:text-white transition-colors"
                            >
                                LIVE URL
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                        {language === 'PT' ? '4. ARQUITETURA TECNOLÓGICA' : '4. TECH ARCHITECTURE'}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-slate-800 text-[11px] md:text-xs">
                            <thead>
                                <tr className="bg-slate-950 text-white">
                                    <th className="p-2 border border-slate-800">Stack</th>
                                    <th className="p-2 border border-slate-800">{language === 'PT' ? 'Tecnologias Chave' : 'Key Technologies'}</th>
                                    <th className="p-2 border border-slate-800">Módulos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border border-slate-800 text-sky-400">Front-End</td>
                                    <td className="p-2 border border-slate-800">React 18 / Vite / TypeScript / Tailwind</td>
                                    <td className="p-2 border border-slate-800">HTML5 Canvas Engine, CRT Scanlines, LocalStorage Hook</td>
                                </tr>
                                <tr className="bg-slate-950/40">
                                    <td className="p-2 border border-slate-800 text-red-400">Back-End</td>
                                    <td className="p-2 border border-slate-800">Node.js / Express / Socket.IO / Jest</td>
                                    <td className="p-2 border border-slate-800">60Hz Game Loop, Bot CPU AI (4 Stages), Vector Math Attraction</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

            <div className="mt-8 text-[10px] text-gray-600 z-10">
                © 3024-2026 CESAR SCHOOL — OVERRIDE SYSTEM INITIALIZED.
            </div>
        </div>
    );
}