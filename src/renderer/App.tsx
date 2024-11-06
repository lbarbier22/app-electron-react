import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import AlbumsList from './components/albumList/albumList';
import TracksList from './components/trackList/trackList';
import {Album} from "../domain/models/album";
import {fetchAlbums} from "../domain/usecases/fetchAlbum";
import {Track} from "../domain/models/track";
import {fetchTracks} from "../domain/usecases/fetchTrack";

function Hello() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    // Appel initial avec le mot-clé "THIS IT?"
    handleSearch("THIS IT?");
  }, []);

  async function handleSearch(query: string) {
    const albumResults = fetchAlbums(query);
    setAlbums(await albumResults);
  }

  async function handleAlbumClick(albumId: string) {
    const trackResults = fetchTracks(albumId);
    setTracks(await trackResults);
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
