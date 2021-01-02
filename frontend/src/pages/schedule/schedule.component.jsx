import React, { useEffect, useState } from 'react';

import ScheduleTable from '../../components/schedule-table/schedule-table.component';

import { scheduleService } from '../../services/schedule.service';
import { sewerService } from '../../services/sewer.service';

export default function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [sewerInfo, setSewerInfo] = useState([]);

    useEffect(() => {
        // fetch schedules
        getScheduleData().then(result => setSchedules(result))
        console.log(schedules);

        const sewerId = schedules.map(schedule => schedule.sewer)
            .filter((value, index, self) => self.indexOf(value) === index)
        console.log(sewerId);

        // fetch sewer info on schedules
        sewerId.forEach(id => {
            getSewerInfoById(id)
                .then(result => setSewerInfo(result))
        })
        console.log(sewerInfo);
    }, [schedules.length, sewerInfo.length])

    function getScheduleData() {
        return scheduleService.getAll().then(result => {
            return JSON.parse(result)
        });
    }

    function getSewerInfoById(id) {
        return sewerService.getById(id).then(result => {
                return JSON.parse(result)
            })
    }

    return (
        <div>
            <h1>Schedule Page</h1>
            <ScheduleTable rows={schedules} />
        </div>
    )
}