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
  const [averageRating, setAverageRating] = useState<number>(0);

  const handleRating = (trackId: string, trackName: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [trackId]: { name: trackName, rating },
    }));
  };

  // Récupère des notes dans la BDD
  useEffect(() => {
    const fetchRatingsFromDB = async () => {
      const initialRatings: RatingListProps = {};

      for (const track of tracks) {
        const ratingFromBDD = await window.electronAPI.ipcRenderer.getRating(
          track.id,
        );
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
    if (
      Object.keys(ratings).length === tracks.length &&
      Object.keys(ratings).length > 0
    ) {
      processEndOfRating();
    }
  }, [ratings, tracks]);

  const processEndOfRating = async () => {
    try {
      let totalRating = 0;
      for (const trackId in ratings) {
        const { rating, name } = ratings[trackId];
        // Enregistrer la note dans la base de données
        await window.electronAPI.ipcRenderer.insertRating(
          trackId,
          rating,
          name,
        );

        totalRating += rating;
      }

      // Calculer la moyenne des notes
      const avgRating = totalRating / tracks.length;
      setAverageRating(avgRating);

      console.log(
        'Toutes les notes ont été enregistrées dans la base de données.',
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des notes :", error);
    }
  };

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

  const formatDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  if (tracks.length === 0) return null;

  return (
    <div ref={tracks}>
      <h2>Tracks</h2>
      {averageRating !== null && (
        <div className="average-rating">
          <h3>Moyenne de l'album : {averageRating.toFixed(2)}/5</h3>
        </div>
      )}
      <List className="tracks">
        {tracks.map((track) => (
          <ListItem key={track.id}>
            <AlbumIcon sx={{ color: 'white', mr: 1, my: 0.5, fontSize: 50 }} />
            <ListItemText
              primary={track.name}
              secondary={`${formatDuration(track.duration_ms)}`}
            />
            {renderStars(track.id, track.name)}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TracksList;
