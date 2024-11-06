import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AlbumIcon from '@mui/icons-material/Album';
import {Track, TracksListProps} from "../../../domain/models/track";

function TracksList({ tracks }: TracksListProps) {
  if (tracks.length === 0) return null; // Ne pas afficher si aucun album n'a été sélectionné

  return (
    <div>
      <h2>Tracks</h2>
      <List className="tracks">
        {tracks.map((track) => (
          <ListItem key={track.id}>
            <AlbumIcon sx={{ color: 'white', mr: 1, my: 0.5, fontSize: 50 }} />
            <ListItemText
              primary={track.name}
              secondary={`${(track.duration_ms / 60000).toFixed(2)} min`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TracksList;
