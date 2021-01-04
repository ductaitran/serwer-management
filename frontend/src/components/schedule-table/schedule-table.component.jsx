import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { scheduleService } from '../../services/schedule.service';
import { sewerService } from '../../services/sewer.service';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function ScheduleTable(props) {
	const classes = useStyles();

	return (
		<div>
			{(props.rows.length > 0) ? (<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell align="right">Time</TableCell>
							<TableCell align="right">Action</TableCell>
							<TableCell align="right">Sewer</TableCell>
							<TableCell align="right">City</TableCell>
							<TableCell align="right">District</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.rows.map((row) => (
							<TableRow key={row._id}>
								<TableCell component="th" scope="row">
									{row.date}
								</TableCell>
								<TableCell align="right">{row.time}</TableCell>
								<TableCell align="right">{row.action === '0' ? 'Close' : 'Open'}</TableCell>
								<TableCell align="right">{row.sewer.name}</TableCell>
								<TableCell align="right">{row.sewer.location.city}</TableCell>
								<TableCell align="right">{row.sewer.location.district}</TableCell>
								{ props.renderRemove ?
									<TableCell align="right"><button id={row._id} onClick={props.handleRemove}>Remove</button></TableCell>
									: null}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>) : (<h2>No data</h2>)}
		</div>

	);
}
