import React from 'react';
import {Link} from 'react-router-dom';
import {CardHeader, CardActionArea, Avatar, Card} from '@mui/material';

import {cardStyle, avatarStyle} from './card.styles';

const MyCard = props => {
  const {user} = props;
  return (
    <Card variant="outlined" sx={cardStyle} key={user.id}>
      <Link to={user.id} style={{color: 'inherit', textDecoration: 'none'}}>
        <CardActionArea>
          <CardHeader
            avatar={<Avatar src={user.image} sx={avatarStyle} />}
            title={user.name}
            subheader={`places: ${user.places}`}
            sx={{width: 200}}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MyCard;
