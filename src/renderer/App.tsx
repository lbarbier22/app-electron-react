import React, { useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import AlbumsList from './components/albumList/albumList';
import TracksList from './components/trackList/trackList';
import { Album } from '../domain/models/album';
import { fetchAlbums } from '../domain/usecases/fetchAlbum';
import { Track } from '../domain/models/track';
import { fetchTracks } from '../domain/usecases/fetchTrack';

function Hello() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSearch('THIS IT?');
  }, []);

  async function handleSearch(query: string) {
    const albumResults = fetchAlbums(query);
    setAlbums(await albumResults);
  }

  async function handleAlbumClick(albumId: string) {
    const trackResults = fetchTracks(albumId);
    setTracks(await trackResults);
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
        <img width="200" alt="icon" src={icon}/>
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar className="search-bar" onSearch={handleSearch} />
      <AlbumsList albums={albums} onAlbumClick={handleAlbumClick} />
      <div ref={bottomRef}>
        <TracksList tracks={tracks} /> {/* Composant TracksList */}
      </div>
    </div>
  );
}

async function getBearer() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': '<DELETED>',
      'client_secret': '<DELETED>'
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Search results:', data.access_token);
    return data.access_token; // Envoie le token via IPC
  } else {
    console.error('Search failed:', response.statusText);
  }
}

async function searchAlbums(query, bearer) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=3`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearer}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Search results:', data);
      return data;
    } else {
      console.error('Search failed:', response);
      throw new Error(`Search failed with status: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello/>}/>
      </Routes>
    </Router>
  );
}
