import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './resultList.css';
import { ResultListProps } from '../../../domain/models/result';

function ResultList({ result, onClick, searchType }: ResultListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < result.length) {
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
  const paginatedResults = result.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [result]);

  return (
    <div>
      <List className="results">
        {paginatedResults.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => onClick(item.id)}
          >
            {searchType === 'album' && (
              <>
                <ListItemAvatar>
                  <img width="100" src={item.images[0]?.url} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.artists[0].name}
                />
              </>
            )}
            {searchType === 'artist' && (
              <>
                <ListItemAvatar>
                  <img width="100" src={item.images[0]?.url || ''} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                />
              </>
            )}
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
            disabled={endIndex >= result.length}
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

export default ResultList;
