import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CardList from '../../components/card-list/card-list.component';
import SearchBox from '../../components/search-box/search-box.component';

import { sewerService } from '../../services/sewer.service';


export default function MonitorPage() {
    const [sewers, setSewers] = useState(() => {return []});
    const [searchField, setSearchField] = useState('');
    const [filteredSewers, setFilteredSewers] = useState([]);

    useEffect(() => {
        sewerService.getAll()
            .then(result => {
                setSewers(JSON.parse(result))
            });
                 
        setFilteredSewers(sewers.filter(sewer => 
            sewer.location.city.toLowerCase().includes(searchField.toLowerCase()))
        )        

        return () => {
            console.log('unmount')
        }
    }, [searchField, sewers.length]);

    function handleChange(e) {
        setSearchField(e.target.value)             
    }

    return (
        <div>
            <h1>Monitor Page</h1>
            <SearchBox
                placeholder='Search by location...'
                handleChange={handleChange}
            />
            <CardList sewers={filteredSewers} />
        </div>
    )
}
