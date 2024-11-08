import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AlbumIcon from '@mui/icons-material/Album';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import { TracksListProps } from '../../../domain/models/track';
import './trackList.css';
import { RatingListProps } from '../../../domain/models/rating';

function TracksList({ tracks }: TracksListProps) {
  const [ratings, setRatings] = useState<RatingListProps>({});

  const handleRating = (trackId: string, trackName: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [trackId]: { name: trackName, rating }, // Stocke le nom et la note
    }));
  };

  // Récupère des notes dans la BDD
  useEffect(() => {
    const fetchRatingsFromDB = async () => {
      const initialRatings: {} = {};

      for (const track of tracks) {
        const ratingFromBDD = await window.electronAPI.ipcRenderer.getRating(track.id);
        if (ratingFromBDD) {
          initialRatings[track.id] = {
            name: track.name,
            rating: ratingFromBDD,
          };
        }
      }
      setRatings(initialRatings);
    };

    fetchRatingsFromDB();
  }, [tracks]);

  useEffect(() => {
    // Vérifie si toutes les pistes ont été notées
    if (
      Object.keys(ratings).length === tracks.length &&
      Object.keys(ratings).length > 0
    ) {
      saveRatingsToDatabase();
    }
  }, [ratings, tracks]);

  // Mettre à jour la fonction d'enregistrement pour inclure id, nom et note
  const saveRatingsToDatabase = async () => {
    try {
      for (const trackId in ratings) {
        const { rating } = ratings[trackId];
        const { name } = ratings[trackId];
        await window.electronAPI.ipcRenderer.insertRating(
          trackId,
          rating,
          name,
        ); // Ajoute le nom dans l'appel
      }
      console.log(
        'Toutes les notes ont été enregistrées dans la base de données.',
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des notes :", error);
    }
  };

  // Mise à jour de renderStars pour inclure le nom dans l'appel de handleRating
  const renderStars = (trackId: string, trackName: string) => {
    const currentRating = ratings[trackId]?.rating || 0;
    return [1, 2, 3, 4, 5].map((star) => (
      <IconButton
        key={star}
        onClick={() => handleRating(trackId, trackName, star)}
      >
        <StarIcon
          sx={{
            color: star <= currentRating ? 'yellow' : 'white',
            fontSize: 20,
          }}
        />
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
            {renderStars(track.id, track.name)}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TracksList;
