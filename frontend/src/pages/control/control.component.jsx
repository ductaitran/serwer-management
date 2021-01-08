import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import { ScheduleTable } from '../../components/schedule-table/schedule-table.component';
import ScheduleContainer from '../../components/schedule-container/schedule-container.component';

import { scheduleService } from '../../services/schedule.service';

import { Slider, Switch, Button } from 'antd';
import { VideoCameraOutlined, ControlOutlined, ScheduleOutlined } from '@ant-design/icons';

import 'antd/lib/slider/style/index.css';
import 'antd/lib/switch/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/image/style/index.css';

import './control.styles.css';


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
	root: {
		flexGrow: 1,
	},
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
	const [rerender, setRerender] = useState(false);

	// state to control view schedule modal
	const [scheduleViewOpen, setScheduleViewOpen] = useState(false);

	// state to control set schedule modal
	const [scheduleSetOpen, setScheduleSetOpen] = useState(false);

	// schedule data
	const [schedules, setSchedules] = useState([]);

	// distance slider value
	const [distSliderValue, setDistSliderValue] = useState(0);

	// current distance slider value
	const [curDistSliderValue, setCurDistSliderValue] = useState(0);

	// socket    
	const [socketEnable, setSocketEnable] = useState(false);
	const [socket, setSocket] = useState(null);
	const [socketData, setSocketData] = useState('');

	// mqtt
	const [mqttEnable, setMqttEnable] = useState(false);
	const [mqttClient, setMqttClient] = useState(null);
	const [mqttMessage, setMqttMessage] = useState('');
	const [mqttDistanceMessage, setMqttDistanceMessage] = useState(0);
	const [mqttModeMessage, setMqttModeMessage] = useState('');
	const [mqttStateMessage, setMqttStateMessage] = useState('');


	// hande set schedule actions
	useEffect(() => {
		setRerender(false);
		scheduleService.getById(location.state.sewer._id)
			.then(response => {
				setSchedules(JSON.parse(response))
			});
	}, [schedules.length, rerender])

	function handleOpenSetSchedule() {
		setScheduleSetOpen(true);
	}

	function handleCloseSetSchedule() {
		setScheduleSetOpen(false);
	};

	// handle view schedule action
	function handleOpenViewSchedule() {
		setRerender(true);
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
				setRerender(true);
			})
		} else {
			console.log('cancelled');
		}

	}
	////////////////////////////////////////////////

	// handle socket actions
	const [imgSrc, setImgSrc] = useState("https://i.imgur.com/BJ8MUCG.jpg");
	var socketChannel = `${location.state.sewer._id}/imageSend`;

	// check real sewer
	if (location.state.sewer._id == "sewerOnTop10") {
		socketChannel = "imageSend";
	}

	if (location.state.sewer._id == "sewerOnTop10") {
		socketChannel = "imageSend";
	} else { }

	useEffect(() => {
		if (socket !== null) {
			socket.on(socketChannel, (data) => {
				console.log(data);
				setSocketData(data);
				// console.log(socketData);

				// update image
				let strImg = '';
				let bytes = new Uint8Array(data);
				for (let i = 0; i < bytes.byteLength; i++) {
					strImg += String.fromCharCode(bytes[i]);
				}
				setImgSrc(`data:image/jpeg;base64,${strImg}`);
				// console.log(strImg);
				// console.log(imgSrc);
			})
		}

	}, [socket])

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
				setSocketData('');
			}
		}
	}
	function handleSocketSwitch(checked) {
		setSocketEnable(checked);
		setImgSrc("https://i.imgur.com/BJ8MUCG.jpg");
	}

	////////////////////////////////////////////////

	// Sewer control plane
	// init mqtt connection
	var controlTopic = location.state.sewer._id + "/controller";;
	var infoTopic = location.state.sewer._id + "/info";
	
	// check real sewer
	if (location.state.sewer._id == "sewerOnTop10") {
		controlTopic = "controller";
		infoTopic = "info";
	}

	useEffect(() => {	// handle create client, end client
		console.log(mqttEnable);
		if (mqttEnable) {
			let options = {
				protocol: 'http',
				// clientId uniquely identifies client
				// choose any string you wish
				clientId: location.state.sewer._id + "_client"
			};
			setMqttClient(mqtt.connect('http://localhost:4000', options));
		} else {
			if (mqttClient !== null) {
				handleMqttUnSubscribe();
				mqttClient.end(true, () => { setMqttClient(null) })
				setMqttMessage('');
			}
		}
	}, [mqttEnable])

	useEffect(() => { // handle subscibe topics
		console.log(mqttClient);
		if (mqttClient !== null) {
			handleMqttSubscribe();
			// mqttClient.on('connect', (connack) => {
			// 	handleMqttSubscribe();
			// })
		}
	}, [mqttClient])

	useEffect(() => {
		console.log('new message');
		// subscribe topic
		if (mqttClient !== null) {
			mqttClient.on('message', function (topic, message) {
				if (topic.toString() === infoTopic) {
					setMqttMessage(message.toString());
				}
			})
		} else { console.log('disconnected') }
	}, [mqttClient, mqttMessage])

	useEffect(() => {
		console.log(mqttMessage);
		let infoLength = mqttMessage.length;
		let infoExtract = mqttMessage.slice(1, infoLength - 1);
		infoExtract = infoExtract.split(',');
		setMqttDistanceMessage(infoExtract[0]); //current distance
		setMqttModeMessage(infoExtract[1]); // mode
		setMqttStateMessage(infoExtract[2]); // state
	}, [mqttMessage])

	function handleMqttSubscribe() {
		// console.log('control topic: ' + controlTopic);
		// console.log('info topic: ' + infoTopic);

		// subcribes
		mqttClient.subscribe([controlTopic, infoTopic], (err, granted) => {
			console.log('err: ' + err);
			console.log(granted);
		});
	}

	function handleMqttUnSubscribe() {
		// unsubcribes
		mqttClient.unsubscribe([controlTopic, infoTopic], (err) => {
			console.log('err: ' + err);
		});
	}

	function handleMqttSwitch(checked) {
		setMqttEnable(checked);
	}

	function handleDistSliderChange(value) {
		setDistSliderValue(value);
	}

	const [btnActive, setBtnActive] = useState('');
	function handleOpenSewer(e) {
		setBtnActive(e.currentTarget.getAttribute("id"))
		if (mqttClient !== null) {
			// mqttClient.publish('controller', 'up')
			mqttClient.publish(controlTopic, `{${distSliderValue}, 1}`)
			console.log(`{${distSliderValue}, 1}`);
		}
	}

	function handleCloseSewer(e) {
		setBtnActive(e.currentTarget.getAttribute("id"))
		if (mqttClient !== null) {
			// mqttClient.publish('controller', 'down')
			mqttClient.publish(controlTopic, `{${distSliderValue}, 0}`)
			console.log(`{${distSliderValue}, 0}`);
		}
	}

	function handleStopSewer(e) {
		setBtnActive(e.currentTarget.getAttribute("id"))
		if (mqttClient !== null) {
			// mqttClient.publish('controller', 'stop')
			mqttClient.publish(controlTopic, `{${distSliderValue}, 2}`)
			console.log(`{${distSliderValue}, 2}`);
		}
	}
	////////////////////////////////////////////////

	return (
		<div className={classes.root}>
			<h3>{location.state.sewer.name} - [{location.state.sewer._id}]</h3>
			<Grid container spacing={6}>

				<Grid item xs={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid container justify="center" spacing={2}>
								<Grid item ><VideoCameraOutlined style={{ fontSize: "28px" }} /></Grid>
								<Grid item ><Switch defaultChecked={false} onChange={handleSocketSwitch} /></Grid>

							</Grid>
						</Grid>
						<Grid item xs={12}>
							<div className={socketEnable ? "video-section-enable" : "video-section-disable"}>
								<img id='image' src={imgSrc} alt="" />
							</div>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={6}>
					<Grid container
						direction="column"
						justify="flex-end"
						alignItems="center"
						spacing={6}
					>
						<Grid item xs={12}>
							<Grid container spacing={2}>

								<Grid item ><ControlOutlined style={{ fontSize: "28px" }} /></Grid>
								<Grid item>
									<Switch defaultChecked={false} onChange={handleMqttSwitch} />
								</Grid>

							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<div>
										<label>Current distance: {mqttDistanceMessage} cm</label>
										<Slider min={0} max={20} value={mqttDistanceMessage} tooltipVisible={false} disabled={true} />
									</div>
								</Grid>
								<Grid item xs={12}>
									<div>
										<label>Distance: {distSliderValue} cm</label>
										<Slider min={0} max={20} tooltipVisible={false} onChange={handleDistSliderChange} />
									</div>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								spacing={3}>

								<Grid item xs={12}>
									<UpButton id="open-btn"
										className={(btnActive === 'open-btn' && mqttEnable) ? "actione-btn action-btn-active" : "action-btn action-btn-inActive"}
										onClick={handleOpenSewer} />
								</Grid>
								<Grid item xs={12}>
									<StopButton id="stop-btn"
										className={(btnActive === 'stop-btn' && mqttEnable) ? "actione-btn action-btn-active" : "action-btn action-btn-inActive"}
										onClick={handleStopSewer} />
								</Grid>
								<Grid item xs={12}>
									<DownButton id="close-btn"
										className={(btnActive === 'close-btn' && mqttEnable) ? "actione-btn action-btn-active" : "action-btn action-btn-inActive"}
										onClick={handleCloseSewer} />
								</Grid>
								<Grid item xs={12}>
									<Button type="primary" onClick={handleOpenSetSchedule}>
										Set Schedule <ScheduleOutlined style={{ fontSize: "18px" }} />
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button type="dashed" onClick={handleOpenViewSchedule}>Show Schedule</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

				</Grid>
			</Grid>


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
		</div >
	)
}