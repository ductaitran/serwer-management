import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CardList from '../../components/card-list/card-list.component';
import SearchBox from '../../components/search-box/search-box.component';

import { sewerService } from '../../services/sewer.service';


export default function MonitorPage() {
    const [sewers, setSewers] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredSewers, setFilteredSewers] = useState([]);

    useEffect(() => {
        sewerService.getAll()
            .then(result => {
                setSewers(JSON.parse(result))
            });
        // console.log(searchField);
        // console.log(sewers);
        setFilteredSewers(sewers.filter(sewer => 
            sewer.city.toLowerCase().includes(searchField.toLowerCase()))
            )
        // console.log('filtered: ' + filteredSewers);
    }, [searchField, sewers]);

    function handleChange(e) {
        setSearchField(e.target.value)        
    }

    return (
        <div>
            <SearchBox
                placeholder='Search by location...'
                handleChange={handleChange}
            />
            <CardList sewers={filteredSewers} />
        </div>
    )
}
