import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SinglePlayer } from './pages/SinglePlayer';
import { Multiplayer } from './pages/Multiplayer';
import { Sobre } from './pages/Sobre';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<SinglePlayer />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;