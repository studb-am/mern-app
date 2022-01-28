import React from 'react';
import { Link } from 'react-router-dom';
import { CardHeader, CardActionArea, Avatar, Card } from '@mui/material';

import { cardStyle, avatarStyle } from './userItem.styles';

const UserItem = props => {
  const { user } = props;

  return (
    <Card variant="outlined" sx={cardStyle} key={user._id}>
      <Link to={`/places/user/${user._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <CardActionArea>
          <CardHeader
            avatar={<Avatar src={`${process.env.REACT_APP_HOST_API}${user.image}`} sx={avatarStyle} />}
            title={user.name}
            subheader={`places: ${user.places.length}`}
            sx={{ width: 200 }}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default UserItem;
