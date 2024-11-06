import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import AlbumsList from './components/albumList/albumList';
import TracksList from './components/trackList/trackList';

function Hello() {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Appel initial avec le mot-clé "THIS IS"
    handleSearch("THIS IT?");
  }, []);

  async function handleSearch(query: string) {
    const albumResults = await window.electronAPI.ipcRenderer.invoke('search-albums', query);
    setAlbums(albumResults);
  }

  async function handleAlbumClick(albumId: string) {
    const trackResults = await window.electronAPI.ipcRenderer.invoke('get-album-tracks', albumId);
    setTracks(trackResults);
  }

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar className="search-bar" onSearch={handleSearch} />
      <AlbumsList albums={albums} onAlbumClick={handleAlbumClick} />
      <TracksList tracks={tracks} />
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
