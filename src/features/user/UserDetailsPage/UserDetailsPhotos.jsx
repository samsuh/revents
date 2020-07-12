import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

const UserDetailsPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />

        <Image.Group size="small">
          {photos &&
            photos.map((photo) => <Image src={photo.url} key={photo.id} />)}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailsPhotos;
