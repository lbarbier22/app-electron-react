import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './albumList.css'; // Pour des styles personnalisés si nécessaire

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

interface AlbumsListProps {
  albums: Album[];
  onAlbumClick: (albumId: string) => void;
}

function AlbumsList({ albums, onAlbumClick }: AlbumsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < albums.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAlbums = albums.slice(startIndex, endIndex);

  return (
    <div>
      <List className="albums">
        {paginatedAlbums.map((album) => (
          <ListItem
            key={album.id}
            button
            onClick={() => onAlbumClick(album.id)}
          >
            <ListItemAvatar>
              <img width="100" src={album.images[0].url} alt={album.name} />
            </ListItemAvatar>
            <ListItemText
              primary={album.name}
              secondary={album.artists[0].name}
            />
            <Divider sx={{ color: 'white' }} />
          </ListItem>
        ))}
        <div
          className="pagination-controls"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:disabled': { backgroundColor: 'grey' },
              '&:hover': { backgroundColor: '#f0f0f0' },
              borderRadius: '50%',
              padding: '10px',
              margin: '0 10px',
            }}
          >
            <ChevronLeftIcon sx={{ color: 'black' }} />
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            disabled={endIndex >= albums.length}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:disabled': { backgroundColor: 'grey' },
              '&:hover': { backgroundColor: '#f0f0f0' },
              borderRadius: '50%',
              padding: '10px',
              margin: '0 10px',
            }}
          >
            <ChevronRightIcon sx={{ color: 'black' }} />
          </IconButton>
        </div>
      </List>
    </div>
  );
}

export default AlbumsList;
