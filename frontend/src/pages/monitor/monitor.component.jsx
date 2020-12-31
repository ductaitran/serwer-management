import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CardList from '../../components/card-list/card-list.component';
import { sewerService } from '../../services/sewer.service';


export default function MonitorPage() {
    const [sewer, setSewer] = useState([]);

    useEffect(() => {
        sewerService.getAll()
            .then(result => {
                console.log(JSON.parse(result));
                setSewer(JSON.parse(result))
            })
    }, []);

    return (
        <CardList sewers={sewer} />
    )
}
