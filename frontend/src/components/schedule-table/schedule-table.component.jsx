import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DeleteOutlined } from '@ant-design/icons';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export const ScheduleTable = ({ ...props }) => {
	const classes = useStyles();

	return (
		<div>
			<TableContainer component={Paper}>
				<Table {...props} className={classes.table} size={props.size} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell align="right">Time</TableCell>
							<TableCell align="right">Action</TableCell>
							<TableCell align="right">Sewer</TableCell>
							<TableCell align="right">City</TableCell>
							<TableCell align="right">District</TableCell>
							{props.renderRemove ?
								<TableCell align="right"></TableCell>
								: null}
							{props.renderEdit ?
								<TableCell align="right"></TableCell>
								: null}
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
									<TableCell align="right"><DeleteOutlined id={row._id} onClick={props.handleRemove} /></TableCell>
									: null}
								{ props.renderEdit ?
									<TableCell align="right"><button id={row._id} onClick={props.handleEdit}>Edit</button></TableCell>
									: null}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>

	);
}
