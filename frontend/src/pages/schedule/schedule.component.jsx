import React, { useEffect, useState } from 'react';

import {ScheduleTable} from '../../components/schedule-table/schedule-table.component';

import { scheduleService } from '../../services/schedule.service';

import { Spin } from 'antd';
import "antd/lib/spin/style/index.css";

export default function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRerender(false);
        scheduleService.getAll()
            .then(response => {
                setSchedules(JSON.parse(response))
                setLoading(false);
            });

        let timer = setInterval(() => {
            scheduleService.getAll()
                .then(response => {
                    setSchedules(JSON.parse(response))                    
                });
        }, 5000)

        return () => {
            console.log('unmount');
            clearInterval(timer);
            timer = null
        }
    }, []);

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
            <Spin size="large" spinning={loading} />
        </div>
    )
}