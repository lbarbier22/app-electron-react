import './SearchBar.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, styled } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <AlbumIcon sx={{ color: 'white', mr: 1, my: 0.5, s: 10, fontSize: 50 }} />
      <TextField
        sx={{ color: 'white' }}
        // error={false}
        // helperText="Incorrect entry."
        required
        className="searchBar"
        label="Search for an album"
        defaultValue="THIS IT?"
      />
    </Box>
  );
}

export default SearchBar;
