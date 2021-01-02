import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Schedule from '../schedule/schedule.component';
import ActionSelect from '../select-action/select-action.component';

import { CustomButton } from '../custom-button/custom-button.component';

import { scheduleService } from '../../services/schedule.service';

// npm modules
const tata = require('tata-js');

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ScheduleContainer({ ...props }) {
    // const [scheduleOpen, setScheduleOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [scheduleValue, setScheduleValue] = useState('');
    const [actionSelectValue, setActionSelectValue] = useState('');
    const [body, setBody] = useState({});


    // function handleOpenSchedule() {
    // 	setScheduleOpen(true);
    // }

    // function handleCloseSchedule() {
    // 	setScheduleOpen(false);
    // };

    useEffect(() => {
        setBody({
            date: scheduleValue.split('T')[0],
            time: scheduleValue.split('T')[1],
            action: actionSelectValue,
            sewer: props.sewer._id
        });        
    }, [scheduleValue, actionSelectValue])

    function handleSubmit() {        
        // console.log(body);     
        // console.log(isScheduleDataValid());           
        if (isScheduleDataValid()) {
            scheduleService.addSchedule(JSON.stringify(body))
                .then(result => {
                    console.log(result);
                    tata.success('Success', 'Set schedule successfully', {
                        animate: 'slide'
                    }); 
                }) 
                .catch(e => {
                    console.log(e);
                    tata.error('Error', 'Set schedule fail!', {
                        animate: 'slide'
                    }); 
                })           
        } else {
            tata.error('Error', 'Schedule invalid or missing action!', {
                animate: 'slide'
            });
        }
    }

    function isScheduleDataValid() {        
        if (!scheduleValue || actionSelectValue === '') 
            return false
        return true
    }

    function getScheduleValue(value) {
        setScheduleValue(value)
    }

    function getActionSelectValue(value) {
        setActionSelectValue(value);
    }

    return (
        <Modal
            {...props}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Set schedule on {props.sewer.name}</h2>
                <Schedule value={getScheduleValue} />
                <div className='schedule-container'>
                    <ActionSelect value={getActionSelectValue} />
                    <div className='submit-btn'>
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                    </div>
                </div>
            </div>
        </Modal>
    )
}