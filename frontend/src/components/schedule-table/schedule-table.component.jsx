import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function ScheduleTable(props) {
	const classes = useStyles();	
	const [rows, setRows] = useState([]);

	// function createData(date, time, action, sewer) {
	// 	return { date, time, action, sewer };
	// }
	
	useEffect(() => {
		// console.log(props.rows);
		setRows(props.rows);
	})

	return (		
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell align="right">Time</TableCell>
							<TableCell align="right">Action</TableCell>
							<TableCell align="right">Sewer</TableCell>
							{/* <TableCell align="right">Location</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row._id}>
								<TableCell component="th" scope="row">
									{row.date}
								</TableCell>
								<TableCell align="right">{row.time}</TableCell>
								<TableCell align="right">{row.action}</TableCell>
								<TableCell align="right">{row.sewer}</TableCell>
								{/* <TableCell align="right">{row.location}</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
	);
}
