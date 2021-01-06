import React, { useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list.component';
import SearchBox from '../../components/search-box/search-box.component';

import { sewerService } from '../../services/sewer.service';

import { Spin } from 'antd';

import "antd/lib/spin/style/index.css";


export default function MonitorPage() {
    const [sewers, setSewers] = useState(() => { return [] });
    const [searchField, setSearchField] = useState('');
    const [filteredSewers, setFilteredSewers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sewerService.getAll()
            .then(result => {
                setSewers(JSON.parse(result))
                setLoading(false);
            });

        setFilteredSewers(sewers.filter(sewer =>
            sewer.location.city.toLowerCase().includes(searchField.toLowerCase()))
        )

        return () => {
            console.log('unmount')
            setLoading(false)
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
            <Spin size="large" spinning={loading} />
        </div>
    )
}
