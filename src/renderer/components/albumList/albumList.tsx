import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';

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
  // @ts-ignore
  // @ts-ignore
  return (
    <List className="albums">
      {albums.map((album) => (
        <ListItem
          key={album.id}
          button
          onClick={() => onAlbumClick(album.id)}
        >
          <ListItemAvatar>
            <img width="100" src={album.images[0].url} alt={album.name} />
          </ListItemAvatar>
          <ListItemText primary={album.name} secondary={album.artists[0].name} />
          <Divider sx={{ color: 'white' }} />
        </ListItem>
      ))}
    </List>
  );
}

export default AlbumsList;
