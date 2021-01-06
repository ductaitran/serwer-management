import React from 'react';

import { Tabs } from 'antd';

import SewerAdd from '../../components/sewer-add/sewer-add.component';
import UserAdd from '../../components/user-add/user-add.component';
import ScheduleAdd from '../../components/schedule-add/schedule-add.component';

const { TabPane } = Tabs;

export default function AdminPage() {
	return (
		<div>
			<Tabs tabPosition='left'>
				<TabPane tab="Sewer" key="1">
					<SewerAdd />
				</TabPane>
				<TabPane tab="User" key="2">
					<UserAdd />
        </TabPane>
				<TabPane tab="Schedule" key="3">
					<ScheduleAdd />
      	</TabPane>
			</Tabs>
		</div>
	)
}