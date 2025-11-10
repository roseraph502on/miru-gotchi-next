'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components';

interface lifeProps {
  failCount?: number;
}

const LifeGroup = styled("div")({
  display: "flex",
  gap: "7px",
  '& svg': {
    fontSize: '20px',
  },
});

const LifeIcon = ({failCount = 0}:lifeProps) => {
  const life = 3 - failCount;
  return (
    <LifeGroup>
      {life >= 1 ? <FavoriteIcon sx={{ color: '#FF1010' }} /> : <FavoriteBorderIcon sx={{ color: '#F2F2F3' }} />}
      {life >= 2 ? <FavoriteIcon sx={{ color: '#FF1010' }} /> : <FavoriteBorderIcon sx={{ color: '#F2F2F3' }} />}
      {life >= 3 ? <FavoriteIcon sx={{ color: '#FF1010' }} /> : <FavoriteBorderIcon sx={{ color: '#F2F2F3' }} />}
    </LifeGroup>
  )
}

export default LifeIcon