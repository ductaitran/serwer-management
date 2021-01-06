import React, { useEffect, useState } from 'react';

import { Tabs, Spin } from 'antd';
import { UserAddOutlined, CaretLeftOutlined, AppstoreAddOutlined, CaretUpOutlined } from '@ant-design/icons';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SewerAdd from '../../components/sewer-add/sewer-add.component';
import UserAdd from '../../components/user-add/user-add.component';
import ScheduleAdd from '../../components/schedule-add/schedule-add.component';
import { ScheduleTable } from '../../components/schedule-table/schedule-table.component';
import { UserTable } from '../../components/user-table/user-table.component';

import { scheduleService } from '../../services/schedule.service';
import { userService } from '../../services/user.service';

const { TabPane } = Tabs;

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

export default function AdminPage() {
	const classes = useStyles();
	const [rerender, setRerender] = useState(false);
	const [loading, setLoading] = useState(true);

	// user data
	const [users, setUsers] = useState([]);
	const [renderUserForm, setRenderUserForm] = useState(false);

	// schedule data
	const [schedules, setSchedules] = useState([]);
	const [renderScheduleForm, setRenderScheduleForm] = useState(false);

	/**
	 * User related
	 */
	useEffect(() => {
		setRerender(false);
		userService.getAll()
			.then(response => {
				setUsers(JSON.parse(response))
				console.log(JSON.parse(response))
				setLoading(false);
			});

		let timer = setInterval(() => {
			userService.getAll()
				.then(response => {					
					setUsers(JSON.parse(response))
				});
		}, 1000)

		return () => {
			console.log('unmount');
			clearInterval(timer);
			timer = null
		}
	}, [])

	function handleRemoveUserClick(e) {
		// remove schedule
		let id = e.currentTarget.getAttribute("id");
		console.log(id);

		if (window.confirm('Are you sure you want to delete this item?')) {
			userService.deleteByEmail(id).then(response => {
				console.log(response)
				setRerender(true);
			})
		} else {
			console.log('cancelled');
		}
	}

	function handleOpenUserForm(e) {
		e.preventDefault();
		setRenderUserForm(true);
	}

	function handleCloseUserForm(e) {
		e.preventDefault();
		setRenderUserForm(false);
	}

	function handleEditUserClick() {
		window.alert('edit  user');
	}


	/**
	 * Schedule related
	 */
	useEffect(() => {
		setRerender(false);
		scheduleService.getAll()
			.then(response => {
				setSchedules(JSON.parse(response))
				setLoading(false);
			});

		let timer = setInterval(() => {
			scheduleService.getAll()
				.then(response => {
					console.log('fetch')
					setSchedules(JSON.parse(response))
				});
		}, 1000)

		return () => {
			console.log('unmount');
			clearInterval(timer);
			timer = null
		}
	}, [])

	function handleRemoveScheduleClick(e) {
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

	function handleOpenScheduleForm(e) {
		e.preventDefault();
		setRenderScheduleForm(true);
	}

	function handleCloseScheduleForm(e) {
		e.preventDefault();
		setRenderScheduleForm(false);
	}

	return (
		<div className={classes.root}>
			<Tabs tabPosition='left'>
				<TabPane tab="Sewer" key="1">

					<Grid container spacing={6}>
						<Grid item xs={6}>
							<div>bla</div>
						</Grid>

						<Grid item xs={6}>
							<SewerAdd />
						</Grid>
					</Grid>

				</TabPane>
				<TabPane tab="User" key="2">

					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Spin size="small" spinning={loading} />
							<UserTable size='small' rows={users}
								renderRemove={true}
								handleRemove={handleRemoveUserClick}
								renderEdit={true}
								handleEdit={handleEditUserClick}
							/>
						</Grid>

						<Grid item xs={1}>
							{renderUserForm ?
								(<CaretLeftOutlined style={{fontSize:"20px"}} onClick={handleCloseUserForm}/>)
								:
								(<UserAddOutlined style={{fontSize:"20px"}} onClick={handleOpenUserForm}/>)}
						</Grid>

						<Grid item xs={3}>
							{renderUserForm ? (<UserAdd />) : null}
						</Grid>
					</Grid>

				</TabPane>

				<TabPane tab="Schedule" key="3">

					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Spin size="small" spinning={loading} />
							<ScheduleTable size='small' rows={schedules}
								renderRemove={true}
								handleRemove={handleRemoveScheduleClick}
							/>
						</Grid>

						<Grid item xs={3}>
							{renderScheduleForm ?
								(<CaretUpOutlined style={{fontSize:"20px"}} onClick={handleCloseScheduleForm}/>)
								:
								(<AppstoreAddOutlined style={{fontSize:"20px"}} onClick={handleOpenScheduleForm}/>)}								

						</Grid>

						<Grid item xs={12}>
							{renderScheduleForm ? (<ScheduleAdd />) : null}
						</Grid>
					</Grid>

				</TabPane>

			</Tabs>
		</div>
	)
}