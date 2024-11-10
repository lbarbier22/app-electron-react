import React, { useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import ResultList from './components/albumList/resultList';
import TracksList from './components/trackList/trackList';
import { Album } from '../domain/models/album';
import { fetchAlbums } from '../domain/usecases/fetchAlbum';
import { Track } from '../domain/models/track';
import { fetchTracks } from '../domain/usecases/fetchTrack';
import { fetchArtists } from '../domain/usecases/fetchArtist';
import { Artist } from '../domain/models/artist';
import { fetchAlbumsByArtist } from '../domain/usecases/fetchAlbumByArtist';

function Hello() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [result, setResult] = useState<Album[] | Artist[]>([]);
  const [searchType, setSearchType] = useState<'album' | 'artist'>('album');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSearch('THIS IT?', 'album');
  }, []);

  async function handleSearch(query: string, searchType: 'album' | 'artist') {
    setSearchType(searchType);
    setResult([]);
    if (searchType === 'album') {
      const albumResults = await fetchAlbums(query);
      setResult(albumResults);
    } else if (searchType === 'artist') {
      const artistResults = await fetchArtists(query);
      setResult(artistResults);
    }
  }

  async function handleClick(id: string, searchType: 'album' | 'artist') {
    if (searchType === 'album') {
      const trackResults = await fetchTracks(id);
      setTracks(trackResults);
    } else if (searchType === 'artist') {
      const albumResults = await fetchAlbumsByArtist(id); // Pour récupérer les albums de l'artiste
      setSearchType('album');
      setResult(albumResults);
    }
  }

  useEffect(() => {
    // Descend au bas dès que les tracks sont chargés et affichés
    if (tracks.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [tracks]);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar className="search-bar" onSearch={handleSearch} />
      <ResultList result={result} searchType={searchType} onClick={(id) => handleClick(id, searchType)} />
      <div ref={bottomRef}>
        <TracksList tracks={tracks} /> {/* Composant TracksList */}
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
