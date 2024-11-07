import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AlbumIcon from '@mui/icons-material/Album';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import {TracksListProps} from "../../../domain/models/track";
import './trackList.css';

function TracksList({ tracks }: TracksListProps) {
  const [ratings, setRatings] = useState<{ [trackId: string]: number }>({});

  const handleRating = (trackId: string, rating: number) => {
    setRatings(
      // Je récupère les notes précédentes
      (prevRatings) => ({
      // Je les garde
      ...prevRatings,
      // J'ajoute la nouvelle note
      [trackId]: rating,
    }));
  };

  const renderStars = (trackId: string) => {
    const currentRating = ratings[trackId] || 1;
    return [1, 2, 3, 4, 5].map((star) => (
      <IconButton key={star} onClick={() => handleRating(trackId, star)}>
        <StarIcon sx={{ color: star <= currentRating ? 'yellow' : 'white', fontSize: 20 }} />
      </IconButton>
    ));
  };

  if (tracks.length === 0) return null;

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
            {renderStars(track.id)}
          </ListItem>
        ))}
      </List>
      <button onClick={() => console.log(ratings)}>Enregistrer</button>
    </div>
  );
}

export default TracksList;
