import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.png';
import './App.css';
import Counter from './Counter';
import SearchBar from "./SearchBar";

function Hello() {
  const [resetCounter, setResetCounter] = useState(false);

  function handleReset(): void {
    setResetCounter(!resetCounter);
    console.log(`Counter reset`);
  }

  // @ts-ignore
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar />
      <div className="Hello">
        <button type="button" onClick={handleReset}>
          <span role="img" aria-label="books">
            🔄
          </span>
        </button>
        <Counter resetCounter={resetCounter} />
        <Counter resetCounter={resetCounter} />
        <Counter resetCounter={resetCounter} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
