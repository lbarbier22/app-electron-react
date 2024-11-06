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
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([
    {
      "album_type": "album",
      "artists": [
        {
          "id": "7rz6ZZErn5YFDteXKhyf3g",
          "name": "Disiz",
          "type": "artist",
          "uri": "spotify:artist:7rz6ZZErn5YFDteXKhyf3g"
        }
      ],
      "href": "https://api.spotify.com/v1/albums/0h9tYZeKtjZ8rsfGknVqwF",
      "id": "0h9tYZeKtjZ8rsfGknVqwF",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b27312c59264bf24b263b27b8dc7",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e0212c59264bf24b263b27b8dc7",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d0000485112c59264bf24b263b27b8dc7",
          "width": 64
        }
      ],
      "name": "Pacifique",
      "release_date": "2017-06-09",
      "release_date_precision": "day",
      "total_tracks": 20,
      "type": "album",
      "uri": "spotify:album:0h9tYZeKtjZ8rsfGknVqwF"
    },
    {
      "album_type": "single",
      "artists": [
        {
          "href": "https://api.spotify.com/v1/artists/3k6qLcyKmWGoOQfK8Uskvy",
          "id": "3k6qLcyKmWGoOQfK8Uskvy",
          "name": "Maiken Jokum",
          "type": "artist",
          "uri": "spotify:artist:3k6qLcyKmWGoOQfK8Uskvy"
        }
      ],
      "href": "https://api.spotify.com/v1/albums/430ttSN75LpAVHMszOujl6",
      "id": "430ttSN75LpAVHMszOujl6",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273ddc682b1a42216c7de44b9b9",
          "width": 640
        }
      ],
      "name": "Pacifiquement",
      "release_date": "2022-04-13",
      "release_date_precision": "day",
      "total_tracks": 1,
      "type": "album",
      "uri": "spotify:album:430ttSN75LpAVHMszOujl6"
    },
    {
      "album_type": "album",
      "artists": [
        {
          "href": "https://api.spotify.com/v1/artists/370nbSkMB9kDWyTypwWYak",
          "id": "370nbSkMB9kDWyTypwWYak",
          "name": "Haruomi Hosono",
          "type": "artist",
          "uri": "spotify:artist:370nbSkMB9kDWyTypwWYak"
        },
        {
          "href": "https://api.spotify.com/v1/artists/4yN4amq8cBHHQ49NzFOO5Z",
          "id": "4yN4amq8cBHHQ49NzFOO5Z",
          "name": "Shigeru Suzuki",
          "type": "artist",
          "uri": "spotify:artist:4yN4amq8cBHHQ49NzFOO5Z"
        },
        {
          "href": "https://api.spotify.com/v1/artists/41hQ0PoEyj9xEBhwt73aWC",
          "id": "41hQ0PoEyj9xEBhwt73aWC",
          "name": "Tatsuro Yamashita",
          "type": "artist",
          "uri": "spotify:artist:41hQ0PoEyj9xEBhwt73aWC"
        }
      ],
      "href": "https://api.spotify.com/v1/albums/6PnbwR4pgQQZDrLUdw6Kc7",
      "id": "6PnbwR4pgQQZDrLUdw6Kc7",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273a7177b1d4c69494024e02579",
          "width": 640
        }
      ],
      "name": "PACIFIC",
      "release_date": "1978",
      "release_date_precision": "year",
      "total_tracks": 8,
      "type": "album",
      "uri": "spotify:album:6PnbwR4pgQQZDrLUdw6Kc7"
    }
  ]);

  async function handleSearch(query) {
    const albumResults = await window.electronAPI.ipcRenderer.invoke('search-albums', query);
    setAlbums(albumResults);
  }

  async function handleAlbumClick(albumId) {
    const trackResults = await window.electronAPI.ipcRenderer.invoke('get-album-tracks', albumId);
    setTracks(trackResults);
  }

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon}/>
      </div>
      <h1>RateYourFavAlbums</h1>
      <SearchBar className="search-bar" onSearch={handleSearch}/>
      <List className="albums">
        {albums.map((album) => (
          <ListItem
            key={album.id}
            button
            onClick={() => handleAlbumClick(album.id)}
          >
            <ListItemAvatar>
              <img width="100" src={album.images[0].url} alt={album.name}/>
            </ListItemAvatar>
            <ListItemText primary={album.name} secondary={album.artists[0].name}/>
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello/>}/>
      </Routes>
    </Router>
  );
}
