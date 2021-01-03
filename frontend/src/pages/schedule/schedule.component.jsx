import React, { useEffect, useState } from 'react';

import ScheduleTable from '../../components/schedule-table/schedule-table.component';

import { scheduleService } from '../../services/schedule.service';
import { sewerService } from '../../services/sewer.service';

export default function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [extraSchedules, setExtraSchedules] = useState([]);
    const [rerender, setRerender] = useState(false);    

    useEffect(() => {    
        setRerender(false);             
        scheduleService.getAll()
            .then(response => {
                setSchedules(JSON.parse(response))                
            });

        // add field [city] and [district] to schedule data to pass to ScheduleTable
        // schedules.forEach((schedule, index) => {
        //     sewerService.getById(schedule.sewer)
        //         .then(response => {
        //             schedule.city = JSON.parse(response).location.city;
        //             schedule.district = JSON.parse(response).location.district;                       
        //             setExtraSchedules(prev => [...prev, schedule]);                 
        //         })            
        // })        

        return () => {
            console.log('unmount');
        }
    }, [schedules.length, rerender])

    const handleRemoveClick = (e) => {
        // remove schedule
        let id = e.currentTarget.getAttribute("id");

        if (window.confirm('Are you sure you want to delete this item?')) {
            scheduleService.deleteById(id).then(response => {
                console.log(response)
                setRerender(true);
            })           
        } else {
            console.log('cancelled');
        }

    }

    return (
        <div>
            <h1>Schedule Page</h1>
            <ScheduleTable rows={schedules} renderRemove={false} handleRemove={handleRemoveClick} />
        </div>
    )
}