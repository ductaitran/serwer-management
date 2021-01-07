import React, { useState, useEffect } from 'react';

import { Select } from 'antd';
import { Form, Button, DatePicker, TimePicker } from 'antd';
// import 'antd/lib/select/style/index.css';
import 'antd/dist/antd.css';

import './schedule-add.styles.scss';

import { sewerService } from '../../services/sewer.service';
import { locationService } from '../../services/location.service';
import { scheduleService } from '../../services/schedule.service';

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

export default function ScheduleAdd() {
    const [form] = Form.useForm();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [sewerArrAll, setSewerArrALL] = useState([]);
    const [sewerArrEach, setSewerArrEach] = useState([]);
    const [sewer, setSewer] = useState('');   
    const [action, setAction] = useState(''); 
    const [city, setCity] = useState('');    
    const [locations, setLocations] = useState([]);
    const [districtArr, setDistrictArr] = useState([]);
    const [body, setBody] = useState({});

    useEffect(() => {
        setBody({
            date: date,
            time: time,
            action: action,
            sewer: sewer
        })
    }, [date, time, action, sewer])

    useEffect(() => {
        locationService.getAll()
            .then(response => {
                setLocations(JSON.parse(response))
            })

        sewerService.getAll()
        .then(response => {
            setSewerArrALL(JSON.parse(response))            
        })
    }, [])

    function handleSubmit() {
        console.log('submit')
        console.log(body);
        addSchedule();
        form.resetFields();

    }

    function addSchedule() {
        scheduleService.addSchedule(JSON.stringify(body))
            .then(response => {
                tata.success('Success', 'Schedule added', {
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

    function handleDateChange(date, dateString) {
        console.log(dateString);
        setDate(dateString);
    }

    function handleTimeChange(time, timeString) {
        console.log(timeString);
        setTime(timeString);
    }

    function handleActionChange(value) {
        console.log(value)
        setAction(value);
    }

    function handleCityChange(value) {
        setCity(value);
        setDistrictArr([]);
        fetchDistrict(value);
    }

    function handleDistrictChange(value) {        
        setSewerArrEach(sewerArrAll.filter(sewer => 
            (sewer.location.city.includes(city)) &&
            (sewer.location.district.includes(value))))      
    }

    function handleSewerChange(value) {
        setSewer(value);
    }

    return (
        <div className="schedule-add">
            <Form
                {...layout}
                form={form}
                name="schedule"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please set date!',
                        },
                    ]}
                >
                    <DatePicker onChange={handleDateChange} style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Time"
                    name="time"
                    rules={[
                        {
                            required: true,
                            message: 'Please set time!',
                        },
                    ]}
                >
                    <TimePicker onChange={handleTimeChange} format='HH:mm' style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    name="action"
                    label="Action"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select action"
                        onChange={handleActionChange}
                        style={{ width: "100px" }}
                        allowClear
                    >

                        <Option value="1">Open</Option>
                        <Option value="0">Close</Option>

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
                        allowClear
                    >

                        {(locations.length > 0) ? locations.map((location) => (
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
                        allowClear
                    >

                        {(districtArr.length > 0) ? districtArr.map(district => (
                            <Option value={district}>{district}</Option>
                        )) : null}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="sewer"
                    label="Sewer"
                    rules={[
                        {
                            required: true,
                            message: 'Please select sewer!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select sewer"
                        onChange={handleSewerChange}
                        style={{ width: "200px" }}
                        allowClear
                    >

                        {(sewerArrEach.length > 0) ? sewerArrEach.map(sewer => (
                            <Option value={sewer._id}>{sewer._id}</Option>
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