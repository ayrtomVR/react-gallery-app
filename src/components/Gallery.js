import React from 'react';
import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = (props) => {
    const results = props.data;
    let photos;
    if (results.length) {
        photos = results.map((photo) => (
            <GalleryItem
                farm_id={photo.farm}
                server_id={photo.server}
                id={photo.id}
                secret={photo.secret}
                title={photo.title}
                key={photo.id}
            />
        ));
    } else {
        photos = <NotFound />;
    }

    return (
        <div className="photo-container">
            {results.length ? <h1>{`Images of ${props.imageOf}`}</h1> : ''}
            <ul>{photos}</ul>
        </div>
    );
};

export default Gallery;
