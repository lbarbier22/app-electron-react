import React, {useState} from 'react';
import {Box} from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import TextField from "@mui/material/TextField";

function SearchBar({onSearch}) {
  const [input, setInput] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    onSearch(input); // Appelle la fonction de recherche avec la requête
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <AlbumIcon sx={{color: 'white', mr: 1, my: 0.5, s: 10, fontSize: 50}}/>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="searchBar"
          label="Search for an album"
        />
      </Box>
    </form>
  )
    ;
}

export default SearchBar;
