import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ScheduleTable from '../../components/schedule-table/schedule-table.component';
import ScheduleContainer from '../../components/schedule-container/schedule-container.component';

import { scheduleService } from '../../services/schedule.service';

import { Row as AntRow, Col, Slider, Switch } from 'antd';
// import "antd/lib/slider/style/index.css";
import 'antd/lib/slider/style/index.css';
import 'antd/lib/switch/style/index.css';
import 'antd/lib/grid/style/index.css';
// import 'antd/lib/column/style/index.css';
// import "antd/lib/slider/switch/index.css";
// import 'antd/dist/antd.css';


import { ReactComponent as UpButton } from '../../assets/up-arrow.svg';
import { ReactComponent as DownButton } from '../../assets/down-arrow.svg';
import { ReactComponent as StopButton } from '../../assets/stop-button.svg';

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

var mqtt = require('mqtt');

export default function ControlPage({ ...props }) {
    const classes = useStyles();
    const location = useLocation();
    const [modalStyle] = React.useState(getModalStyle);

    // state to control view schedule modal
    const [scheduleViewOpen, setScheduleViewOpen] = useState(false);

    // state to control set schedule modal
    const [scheduleSetOpen, setScheduleSetOpen] = useState(false);

    // schedule data
    const [schedules, setSchedules] = useState([]);

    // slider value
    const [sliderValue, setSliderValue] = useState(0);

    // socket    
    const [socketEnable, setSocketEnable] = useState(false);
    const [socket, setSocket] = useState(null);
    const [socketData, setSocketData] = useState('');

    // mqtt
    const [mqttEnable, setMqttEnable] = useState(false);
    const [mqttClient, setMqttClient] = useState(null);
    const [mqttMessage, setMqttMessage] = useState('');


    // hande set schedule actions
    useEffect(() => {
        scheduleService.getById(location.state.sewer._id)
            .then(response => {
                setSchedules(JSON.parse(response))
            });
    })

    function handleOpenSetSchedule() {
        setScheduleSetOpen(true);
    }

    function handleCloseSetSchedule() {
        setScheduleSetOpen(false);
    };

    // handle view schedule action
    function handleOpenViewSchedule() {
        setScheduleViewOpen(true);
    }

    function handleCloseViewSchedule() {
        setScheduleViewOpen(false);
    };
    ////////////////////////////////////////////////

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
    ////////////////////////////////////////////////

    // handle socket actions
    useEffect(() => {
        if (socket !== null) {
            socket.on('imageSend', (data) => {
                setSocketData(data);
                // console.log(socketData);
            })
        }

    }, [socketData, socket])

    useEffect(() => {
        if (socketEnable) {
            handleSocketConnect();
        } else {
            handleSocketDisconnect();
        }
    }, [socketEnable])

    function handleSocketConnect() {
        setSocket(socketIOClient('http://localhost:3000/'))
    }

    function handleSocketDisconnect() {
        if (socket) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setSocketData(0);
            }
        }
    }
    function handleSocketSwitch(checked) {
        setSocketEnable(checked);
    }

    ////////////////////////////////////////////////

    // Sewer control plane
    // init mqtt connection
    useEffect(() => {
        if (mqttEnable) {
            let options = {
                protocol: 'http',
                // clientId uniquely identifies client
                // choose any string you wish
                clientId: location.state.sewer._id + "_client"
            };
            setMqttClient(mqtt.connect('http://localhost:4000', options));

            // subscribe topic
            if (mqttClient !== null) {
                handleMqttSubscribe();
            }
        } else {
            if (mqttClient !== null) {
                mqttClient.end()
                setMqttClient(null);
            }
        }
    }, [mqttEnable])

    useEffect(() => {
        if (mqttClient !== null) {
            mqttClient.on('message', function (topic, message) {

                // update mqttMessage state
                setMqttMessage(message.toString())
                console.log(mqttMessage);
            });
        }
    }, [mqttMessage])

    function handleMqttSubscribe() {
        // if (mqttClient !== null) {
        let controlTopic = location.state.sewer._id + "/controller"
        let infoTopic = location.state.sewer._id + "/info"

        console.log('mqtt connected');
        console.log('control topic: ' + controlTopic);

        // subcribes
        mqttClient.subscribe(controlTopic);
        mqttClient.subscribe(infoTopic);
        // }
    }

    function handleMqttSwitch(checked) {
        setMqttEnable(checked);
    }

    function handleSliderChange(value) {
        setSliderValue(value);
    }

    function handleOpenSewer(e) {
        if (mqttClient !== null) {
            mqttClient.publish('controller', 'up')
            mqttClient.publish(location.state.sewer._id + "/controller", `{${sliderValue}, 1}`)
            console.log(`{${sliderValue}, 1}`);
        }
    }

    function handleCloseSewer(e) {
        if (mqttClient !== null) {
            mqttClient.publish('controller', 'down')
            mqttClient.publish(location.state.sewer._id + "/controller", `{${sliderValue}, 0}`)
            console.log(`{${sliderValue}, 0}`);
        }
    }

    function handleStopSewer(e) {
        if (mqttClient !== null) {
            mqttClient.publish('controller', 'stop')
            mqttClient.publish(location.state.sewer._id + "/controller", `{${sliderValue}, 2}`)
            console.log(`{${sliderValue}, 2}`);
        }
    }
    ////////////////////////////////////////////////

    return (
        <div>
            <h3>{location.state.sewer.name} - [{location.state.sewer._id}]</h3>

            {/* <button onClick={handleSocketConnect}>Start socket</button>
            <button onClick={handleSocketDisconnect}>Disconnect socket</button> */}
            
            <AntRow>
                <Col span={18}>
                    <Switch defaultChecked={false} onChange={handleSocketSwitch} />
                    <div>message from socket: {socketData}</div>
                    <div className="video-section">
                        <img style={{ maxWidth: "70%", height: "auto" }} id='image' src="https://i.imgur.com/BJ8MUCG.jpg" alt="" />
                    </div>
                </Col>
                <Col span={6}>
                    <div>
                        <Switch defaultChecked={false} onChange={handleMqttSwitch} />
                        <div style={{ width: "200px" }}>
                            <Slider min={0} max={20} onChange={handleSliderChange} />
                            <div>{sliderValue}</div>
                        </div>
                        <div>
                            <AntRow>
                                <UpButton onClick={handleOpenSewer} />
                            </AntRow>
                            <AntRow>
                                <StopButton onClick={handleStopSewer} />
                            </AntRow>
                            <AntRow>
                                <DownButton onClick={handleCloseSewer} />
                            </AntRow>

                        </div>
                        <button onClick={handleOpenViewSchedule}>Show Schedule</button>
                        <button onClick={handleOpenSetSchedule}>Set Schedule</button>
                    </div>
                </Col>
            </AntRow>

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
            <ScheduleContainer open={scheduleSetOpen} onClose={handleCloseSetSchedule} sewer={location.state.sewer} />
        </div>
    )
}