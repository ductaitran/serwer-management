import React, { useEffect, useState } from 'react';

import {ScheduleTable} from '../../components/schedule-table/schedule-table.component';

import { scheduleService } from '../../services/schedule.service';

import { Spin } from 'antd';
import "antd/lib/spin/style/index.css";

export default function SchedulePage() {
    const [schedules, setSchedules] = useState([]);    
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
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

    return (
        <div>
            <h1>Schedule Page</h1>
            <ScheduleTable rows={schedules} renderRemove={false} />
            <Spin size="large" spinning={loading} />
        </div>
    )
}