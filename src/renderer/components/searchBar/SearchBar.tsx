import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('album');

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault(); // Empêche le rechargement de la page
    onSearch(input, searchType);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {/* Sélecteur pour changer l'icône et le type de recherche */}
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          sx={{ mr: 1 }}
        >
          <MenuItem value="album">
            <AlbumIcon sx={{ color: 'white', fontSize: 25 }} />
          </MenuItem>
          <MenuItem value="artist">
            <PersonIcon sx={{ color: 'white', fontSize: 25 }} />
          </MenuItem>
        </Select>

        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          className="searchBar"
          label={
            searchType === 'album'
              ? 'Search for an album'
              : 'Search for an artist'
          }
        />
      </Box>
    </form>
  );
}

export default SearchBar;
