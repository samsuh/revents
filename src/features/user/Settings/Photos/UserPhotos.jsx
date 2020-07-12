import React from "react";
import { Header, Card, Image, Button } from "semantic-ui-react";

function UserPhotos({ photos, profile, deletePhoto, setMainPhoto }) {
  let filteredPhotos;
  if (photos) {
    filteredPhotos = photos.filter((photo) => {
      return photo.url !== profile.photoURL;
    });
  }
  return (
    <>
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>

        {photos &&
          filteredPhotos.map((photo) => (
            <Card key={photo.id}>
              <Image src={photo.url || "/assets/user.png"} />
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => setMainPhoto(photo)}>
                  Main
                </Button>
                <Button
                  basic
                  icon="trash"
                  color="red"
                  onClick={() => deletePhoto(photo)}
                />
              </div>
            </Card>
          ))}
      </Card.Group>
    </>
  );
}

export default UserPhotos;
