import React from 'react';

export default function SearchBox(props) {
    return (
        <input
            className='search'
            type='search'
            placeholder={props.placeholder}
            onChange={props.handleChange}
        />
    )
}