import React from 'react';

const GalleryItem = ({ farm_id, server_id, id, secret, title }) => (
    <li>
        <img
            src={`https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_n.jpg`}
            alt={`${title}`}
        />
    </li>
);

export default GalleryItem;
