import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
		maxWidth: 300,
		maxHeight: 500
	},
	media: {
		height: 100,
	},
}));

export default function MediaCard(props) {
	const [scheduleOpen, setScheduleOpen] = useState(false);
	const classes = useStyles();
	const history = useHistory();

	// those function is to handle schedule component, which is child component
	// not a good solution but help
	function handleOpenSchedule() {
		setScheduleOpen(true);
	}

	function handleCloseSchedule() {
		setScheduleOpen(false);
	};

	function handleControl() {
		history.push({
			pathname: '/control',
			state: { sewer: props.sewer }
		})
	}

	return (
		<div>
			<Card className={classes.root} >
				<CardActionArea onClick={handleControl}>
					<CardMedia
						// className={classes.media}
						component="img"
						height="250"
						image={`https://avatars.dicebear.com/api/jdenticon/${props.sewer._id + 1}.svg?margin[]=20`}
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.sewer.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{props.sewer.description}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							City: {props.sewer.location.city}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							District: {props.sewer.location.district}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button onClick={handleControl} size="small" color="primary">
						Control
        </Button>
					<Button onClick={handleOpenSchedule} size="small" color="primary">
						Schedule
        </Button>
				</CardActions>
			</Card>
			<ScheduleContainer open={scheduleOpen} onClose={handleCloseSchedule} sewer={props.sewer} />
		</div>
	);
}
