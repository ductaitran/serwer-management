import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export default function ActionSelect(props) {
	const classes = useStyles();
	const [action, setAction] = React.useState('');

	useEffect(() => {
		// console.log(action);
		props.value(action);
	}, [action])

	const handleChange = (event) => {		
		setAction(event.target.value);		
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">Action</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={action}
					onChange={handleChange}
					label="Action"
				>
					<MenuItem value={1}>Open</MenuItem>
					<MenuItem value={0}>Close</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
