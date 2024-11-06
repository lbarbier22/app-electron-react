import React, {useEffect, useState} from 'react';
import {MemoryRouter as Router, Routes, Route} from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import SearchBar from "./SearchBar";
import AlbumIcon from "@mui/icons-material/Album";

function Hello() {
  const [resetCounter, setResetCounter] = useState(false);
  const [bearer, setBearer] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchBearer() {
      const token = await getBearer();
      setBearer(token);
    }

    fetchBearer();
  }, []);


  async function handleSearch(query) {
    const albumResults = await window.electronAPI.ipcRenderer.invoke('search-albums', query);
    setAlbums(albumResults);
  }

  async function handleAlbumClick(albumId) {
    const trackResults = await window.electronAPI.ipcRenderer.invoke('get-album-tracks', albumId);
    setTracks(trackResults);
  }

  // Nouveau: fonction de recherche d'artiste
  async function handleSearch(query) {
    if (bearer) {
      try {
        const results = await searchAlbums(query, bearer);
        console.log('results:', results);
        setAlbums(results.albums.items); // Stocke les albums trouvés
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  }

  // @ts-ignore
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon}/>
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar onSearch={handleSearch}/> {/* Passe handleSearch à SearchBar */}
      <List className='albums'>
        {albums.map((album) => (
          <ListItem key={album.id}>
            <ListItemAvatar>
              <img width="100" src={album.images[0].url} alt={album.name}/>
            </ListItemAvatar>
            <ListItemText primary={album.name} secondary={album.artists[0].name}/>
            <Divider sx={{color : 'white' }}/>
          </ListItem>
        ))}
      </List>
            <Divider sx={{color: 'white'}}/>
          </ListItem>
        ))}
      </List>
      <div>
        <h2>Tracks</h2>
        <List className="tracks">
          {tracks.map((track) => (
            <ListItem key={track.id}>
              <AlbumIcon sx={{color: 'white', mr: 1, my: 0.5, s: 10, fontSize: 50}}/>
              <ListItemText primary={track.name} secondary={`${(track.duration_ms / 60000).toFixed(2)} min`}/>
            </ListItem>
          ))}
        </List>
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
