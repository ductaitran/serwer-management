import React, { useState, useEffect } from 'react';

import { Select } from 'antd';
import { Form, Input, Button } from 'antd';
// import 'antd/lib/select/style/index.css';
import 'antd/dist/antd.css';

import './user-add.styles.scss';

import { userService } from '../../services/user.service';
import { locationService } from '../../services/location.service';
import { Role } from '../../helpers/role';

const tata = require('tata-js');
const { Option } = Select;

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

export default function UserAdd() {
	const [form] = Form.useForm();
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [city, setCity] = useState('');
	const [district, setDistrict] = useState('');
	const [locations, setLocations] = useState([]);
	const [districtArr, setDistrictArr] = useState([]);
	const [body, setBody] = useState({});

	useEffect(() => {
		setBody({
			name: userName,
			email: email,
			password: password,
			role: role,
			location: {
				city: city,
				district: district
			}
		})
	}, [userName, email, password, role, city, district])

	useEffect(() => {
		locationService.getAll()
			.then(response => {				
				setLocations(JSON.parse(response))
				console.log(locations)
			})
	}, [])

	function handleSubmit() {
		console.log('submit')
		console.log(body);
		addUser();
		form.resetFields();
	}

	function addUser() {
		userService.add(JSON.stringify(body))
			.then(response => {
				tata.success('Success', 'User Created', {
					animate: 'slide'
				});

			})
			.catch(e => {
				tata.error('Error', e.toString(), {
					animate: 'slide'
				})
			})
	}

	function fetchDistrict(city) {
		locationService.getDistrictByCity(city)
			.then(response => {
				console.log(JSON.parse(response));
				setDistrictArr(JSON.parse(response))
			})
	}

	function handleEmailChange(e) {
		setEmail(e.target.value)
	}

	function handleUserNameChange(e) {
		setUserName(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleRoleChange(value) {
		setRole(value)
	}

	function handleCityChange(value) {
		setCity(value);
		fetchDistrict(value);
	}

	function handleDistrictChange(value) {
		setDistrict(value)
	}

	return (
		<div className="sewer-add">
			<Form
				{...layout}
				form={form}
				name="userForm"
				onFinish={handleSubmit}
			>

				<Form.Item
					label="Username"
					name="userName"
					rules={[
						{
							required: true,
							message: 'Please input username!',
						},
					]}
				>
					<Input onChange={handleUserNameChange} placeholder="Enter username" />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input email!',
						},
					]}
				>
					<Input onChange={handleEmailChange} placeholder="Enter email" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input password!',
						},
					]}

				>
					<Input.Password onChange={handlePasswordChange} placeholder="Enter password" />
				</Form.Item>

				<Form.Item
					name="role"
					label="Role"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select role"
						onChange={handleRoleChange}
						style={{ width: "100px" }}
						allowClear
					>
						{Object.keys(Role).map((key, index) => (
							<Option value={Role[key]}>{Role[key]}</Option>
						))}

					</Select>
				</Form.Item>

				<Form.Item
					name="city"
					label="City"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select city"
						onChange={handleCityChange}
						style={{ width: "150px" }}
						disabled={(role === Role.Guest) ? true : false}
						allowClear
					>

						{(locations.length > 0 && role !== Role.Guest) ? locations.map((location) => (
							<Option value={location.name}>{location.name}</Option>
						)) : null}

					</Select>
				</Form.Item>

				<Form.Item
					name="district"
					label="District"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select district"
						onChange={handleDistrictChange}
						style={{ width: "150px" }}
						disabled={(role === Role.Guest) ? true : false}
						allowClear
					>

						{(districtArr.length > 0) ? districtArr.map(district => (
							<Option value={district}>{district}</Option>
						)) : null}
					</Select>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
                        </Button>
				</Form.Item>
			</Form>
		</div>
	)
}