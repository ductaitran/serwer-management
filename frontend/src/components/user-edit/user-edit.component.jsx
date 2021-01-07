import React, { useState, useEffect } from 'react';

import { Select } from 'antd';
import { Form, Input, Button } from 'antd';
// import 'antd/lib/select/style/index.css';
import 'antd/dist/antd.css';

import './user-edit.styles.scss';

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

export const UserEdit = ({...props}) => {
	const [form] = Form.useForm();
	const [userName, setUserName] = useState(props.user.name);
	const [email, setEmail] = useState(props.user.email);
    // const [password, setPassword] = useState(props.user.password);
    const [password, setPassword] = useState('');
	const [role, setRole] = useState(props.user.role);
	const [city, setCity] = useState(() => {
        if (props.user.location) return props.user.location.city
        return ('')
    });
	const [district, setDistrict] = useState(() => {
        if (props.user.location) return props.user.location.district
        return ('')
    });
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
				// console.log(locations)
			})
	}, [])
	

	function handleSubmit() {		
		console.log(body);
		updateUser(body);
		// form.resetFields();
	}

	function updateUser(body) {
		userService.updateByEmail(email, JSON.stringify(body))
			.then(response => {
				tata.success('Success', 'User updated', {
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
                    initialValue={userName}
					rules={[
						{
							required: true,
							message: 'Please input username!',
						},
					]}
				>
					<Input defaultValue={userName} onChange={handleUserNameChange} />
				</Form.Item>

				<Form.Item
					label="Email"
                    name="email"
                    initialValue={email}                                 
					rules={[
						{
							required: true,
							message: 'Please input email!',
						},
					]}
				>
					<Input disabled defaultValue={email} onChange={handleEmailChange} placeholder="Enter email" />
				</Form.Item>

				<Form.Item
					label="Password"
                    name="password"
                    initialValue={password}
					rules={[
						{
							// required: true,
							message: 'Please input password!',
						},
					]}

				>
					<Input.Password defaultValue={password} onChange={handlePasswordChange} placeholder="Enter password" />
				</Form.Item>

				<Form.Item
					name="role"
                    label="Role"
                    initialValue={role}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select role"
                        onChange={handleRoleChange}
                        defaultValue={role}
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
                    initialValue={city}
					rules={[
						{
							required: (role === Role.Guest || role === Role.Admin) ? false : true,
						},
					]}
				>
					<Select
						placeholder="Select city"
                        onChange={handleCityChange}
                        defaultValue={city}
						style={{ width: "150px" }}
						disabled={(role === Role.Guest || role === Role.Admin) ? true : false}
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
                    initialValue={district}
					rules={[
						{
							required: (role === Role.Guest || role === Role.Admin) ? false : false,
						},
					]}
				>
					<Select
						placeholder="Select district"
                        onChange={handleDistrictChange}
                        defaultValue={district}
						style={{ width: "150px" }}
						disabled={(role === Role.Guest || role === Role.Admin) ? true : false}
						allowClear
					>

						{(districtArr.length > 0) ? districtArr.map(district => (
							<Option value={district}>{district}</Option>
						)) : null}
					</Select>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Update
          </Button>
				</Form.Item>
			</Form>
		</div>
	)
}