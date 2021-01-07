import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import "antd/lib/icon/style/index.css";

import './sewer-table.styles.scss';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const SewerTable = ({ ...props }) => {
    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table {...props} className={classes.table} size={props.size} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
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
                            <TableRow onClick={props.handleSelect} key={row._id} id={row._id} className="table-row">
                                <TableCell component="th" scope="row">{row._id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.location.city}</TableCell>
                                <TableCell align="right">{row.location.district}</TableCell>
                                { props.renderRemove ?
                                    <TableCell align="right"><DeleteOutlined id={row._id} onClick={props.handleRemove} /></TableCell>
                                    : null}
                                {props.renderEdit ?
                                    <TableCell align="right"><EditOutlined id={row._id} onClick={props.handleEdit} /></TableCell>
                                    : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >

    );
}
