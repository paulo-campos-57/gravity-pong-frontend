<div align="center">
  <h1>
    <img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind" /><br>
    Front-End — Gravity Pong 🇺🇸
  </h1>
  <p>
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Socket.io-4.x-010101?style=flat&logo=socketdotio&logoColor=white" />
  </p>
</div>

## Project Structure

```
gravity-pong-frontend/g-pong/
├── src/
│   ├── assets/             # Local images (hero, enemies, icons)
│   ├── components/         # Reusable React components
│   │   └── PongCanvas.tsx  # Core rendering engine for the game
│   ├── hooks/              # Custom React hooks
│   │   ├── useCampaign.ts  # LocalStorage persistence & HP management
│   │   └── useGameSocket.ts# WebSocket state abstraction
│   ├── pages/              # Router views
│   │   ├── Home.tsx        # Arcade Menu & Campaign Hub
│   │   ├── Multiplayer.tsx # Lobby creation and joining
│   │   └── SinglePlayer.tsx# Match view and Lore cutscenes
│   ├── App.tsx             # React Router configuration
│   ├── index.css           # Tailwind injection & CRT Scanline effects
│   ├── main.tsx            # React DOM entry point
│   └── socket.ts           # Socket.IO client instance
├── package.json            # Project dependencies
├── tailwind.config.js      # Custom theme and fonts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler settings
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.x | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Static typing |
| [Vite](https://vitejs.dev/) | 8.x | Build tool & Development server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first styling |
| [Socket.IO Client](https://socket.io/) | 4.x | Real-time communication with backend |
| [React Router](https://reactrouter.com/) | 6.x | Client-side routing |

---

## Requirements

- **Node.js** 20.x or higher
- **pnpm** (Fast, disk space efficient package manager)

> Make sure the [Gravity Pong Backend](https://github.com/paulo-campos-57/gravity-pong-backend) is running on port 3000 before starting matches.

---

## How to Run

### <img src="https://skillicons.dev/icons?i=github" height="20" style="vertical-align: middle;" /> 1. Clone the repository

```bash
git clone https://github.com/paulo-campos-57/gravity-pong-frontend.git
cd gravity-pong-frontend/g-pong
```

### 📦 2. Install dependencies

```bash
pnpm install
```

### ▶️ 3. Start the application

```bash
pnpm run dev
```

The app will be available at **http://localhost:5173**.

---

<br>

---

<div align="center">
  <h1>
    <img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind" /><br>
    Front-End — Gravity Pong 🇧🇷
  </h1>
  <p>
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Socket.io-4.x-010101?style=flat&logo=socketdotio&logoColor=white" />
  </p>
</div>

## Estrutura do Projeto

```
gravity-pong-frontend/g-pong/
├── src/
│   ├── assets/             # Imagens locais (herói, inimigos, ícones)
│   ├── components/         # Componentes React reutilizáveis
│   │   └── PongCanvas.tsx  # Motor de renderização principal do jogo
│   ├── hooks/              # Custom hooks do React
│   │   ├── useCampaign.ts  # Persistência via LocalStorage e gestão de HP
│   │   └── useGameSocket.ts# Abstração do estado do WebSocket
│   ├── pages/              # Telas da aplicação
│   │   ├── Home.tsx        # Menu Arcade e HUB da Campanha
│   │   ├── Multiplayer.tsx # Lobby para criar e entrar em salas
│   │   └── SinglePlayer.tsx# Partida Single Player e introdução
│   ├── App.tsx             # Configuração das rotas
│   ├── index.css           # Estilos globais e efeitos CRT (TV de Tubo)
│   ├── main.tsx            # Ponto de entrada do React DOM
│   └── socket.ts           # Instância de conexão do Socket.IO
├── package.json            # Dependências do projeto
├── tailwind.config.js      # Configurações de tema e fontes
├── tsconfig.json           # Configuração do compilador TypeScript
└── vite.config.ts          # Configuração do Vite
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | 18.x | Biblioteca de interface de usuário |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Vite](https://vitejs.dev/) | 8.x | Ferramenta de build e servidor local |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilização por classes utilitárias |
| [Socket.IO Client](https://socket.io/) | 4.x | Comunicação em tempo real com o servidor |
| [React Router](https://reactrouter.com/) | 6.x | Roteamento no lado do cliente |

---

## Requisitos

- **Node.js** 20.x ou superior
- **pnpm** (Gerenciador de pacotes ultra-rápido)

> Certifique-se de que o [Backend do Gravity Pong](https://github.com/paulo-campos-57/gravity-pong-backend) esteja rodando na porta 3000 antes de iniciar as partidas.

---

## Como Executar

### <img src="https://skillicons.dev/icons?i=github" height="20" style="vertical-align: middle;" /> 1. Clone o repositório

```bash
git clone https://github.com/paulo-campos-57/gravity-pong-frontend.git
cd gravity-pong-frontend/g-pong
```

### 📦 2. Instale as dependências

```bash
pnpm install
```

### ▶️ 3. Inicie a aplicação

```bash
pnpm run dev
```

A aplicação estará disponível em **http://localhost:5173**.
