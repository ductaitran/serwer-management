import React from 'react';

import MediaCard from '../card/card.component';

import './card-list.styles.css';

export default function CardList(props) {
    return ( 
        <div className='card-list'>
            { props.sewers.map(sewer => (
                <MediaCard key={sewer._id} sewer={sewer} /> 
            ))}            
        </div>
    )
}