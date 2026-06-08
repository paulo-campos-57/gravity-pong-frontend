import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SinglePlayer } from './pages/SinglePlayer';
import { Multiplayer } from './pages/Multiplayer';
import './App.css'; // Seus estilos do Tailwind

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<SinglePlayer />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
      </Routes>
    </Router>
  );
}

export default App;