import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Schedule from '../schedule/schedule.component';
import ActionSelect from '../select-action/select-action.component';

import './card.styles.scss'
import { CustomButton } from '../custom-button/custom-button.component';

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
	root: {
		maxWidth: 345,
	},
	media: {
		height: 100,
	},
}));

export default function MediaCard(props) {
	const [scheduleOpen, setScheduleOpen] = useState(false);
	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();

	function handleOpenSchedule() {
		setScheduleOpen(true);
	}

	function handleCloseSchedule() {
		setScheduleOpen(false);
	};

	function handleSubmitClick() {
		// const 
	}

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Set schedule for {props.sewer.name}</h2>
			<Schedule />
			<div className='schedule-container'>
				<ActionSelect />
				<div className='submit-btn'>
					<CustomButton onClick={handleSubmitClick}>Submit</CustomButton>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						// className={classes.media}
						component="img"
						height="250"
						image={`https://robohash.org/${props.sewer._id + 4}?set=set1`}
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.sewer.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{props.sewer.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Control
        </Button>
					<Button onClick={handleOpenSchedule} size="small" color="primary">
						Schedule
        </Button>
				</CardActions>
			</Card>
			<Modal
				open={scheduleOpen}
				onClose={handleCloseSchedule}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
