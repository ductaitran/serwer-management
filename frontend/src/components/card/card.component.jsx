import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ScheduleContainer from '../schedule-container/schedule-container.component';

import './card.styles.scss'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 100,
	},
}));

export default function MediaCard(props) {
	const [scheduleOpen, setScheduleOpen] = useState(false);	
	const classes = useStyles();

	// those function is to handle schedule component, which is child component
	// not a good solution but help
	function handleOpenSchedule() {
		setScheduleOpen(true);
	}

	function handleCloseSchedule() {
		setScheduleOpen(false);
	};

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
			<ScheduleContainer open={scheduleOpen} onClose={handleCloseSchedule} sewer={props.sewer}/>
		</div>
	);
}
