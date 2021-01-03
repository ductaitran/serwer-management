import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ScheduleTable from '../../components/schedule-table/schedule-table.component';
import ScheduleContainer from '../../components/schedule-container/schedule-container.component';

import { scheduleService } from '../../services/schedule.service';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ControlPage({ ...props }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    // state to control view schedule modal
    const [scheduleViewOpen, setScheduleViewOpen] = useState(false);

    // state to control set schedule modal
    const [scheduleSetOpen, setScheduleSetOpen] = useState(false);

    // schedule data
    const [schedules, setSchedules] = useState([]);

    const location = useLocation();

    useEffect(() => {
        scheduleService.getById(location.state.sewer._id)
            .then(response => {
                setSchedules(JSON.parse(response))
            });
    })

    // handle view schedule action
    function handleOpenViewSchedule() {
        setScheduleViewOpen(true);
    }

    function handleCloseViewSchedule() {
        setScheduleViewOpen(false);
    };

    // hande set schedule action
    function handleOpenSetSchedule() {
        setScheduleSetOpen(true);
    }

    function handleCloseSetSchedule() {
        setScheduleSetOpen(false);
    };

    const handleRemoveClick = (e) => {
        // remove schedule
        let id = e.currentTarget.getAttribute("id");
        console.log(id);

        if (window.confirm('Are you sure you want to delete this item?')) {
            scheduleService.deleteById(id).then(response => {
                console.log(response)
                // setRerender(true);
            })           
        } else {
            console.log('cancelled');
        }

    }

    return (
        <div>
            <button onClick={handleOpenViewSchedule}>Show Schedule</button>
            <button onClick={handleOpenSetSchedule}>Set Schedule</button>
            <Modal
                {...props}
                open={scheduleViewOpen}
                onClose={handleCloseViewSchedule}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Schedule of {location.state.sewer.name}</h2>
                    <ScheduleTable rows={schedules} renderRemove={true} handleRemove={handleRemoveClick} />
                </div>
            </Modal>
            <ScheduleContainer open={scheduleSetOpen} onClose={handleCloseSetSchedule} sewer={location.state.sewer}/>
        </div>
    )
}