import React, { useState, useEffect } from 'react';

import { Select } from 'antd';
import { Form, Input, Button } from 'antd';
// import 'antd/lib/select/style/index.css';
import 'antd/dist/antd.css';

import './sewer-edit.styles.scss';

import { sewerService } from '../../services/sewer.service';
import { locationService } from '../../services/location.service';

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

export const SewerEdit = ({...props}) => {
    const [form] = Form.useForm();
    const [sewerName, setSewerName] = useState(props.sewer.name);
    const [description, setdiscription] = useState(props.sewer.description);
    const [city, setCity] = useState(props.sewer.location.city);
    const [district, setDistrict] = useState(props.sewer.location.district);
    const [locations, setLocations] = useState([]);
    const [districtArr, setDistrictArr] = useState([]);
    const [body, setBody] = useState({});

    useEffect(() => {
        setBody({
            name: sewerName,
            description: description,
            location: {
                city: city,
                district: district
            }
        })
    }, [sewerName, description, city, district])

    useEffect(() => {
        locationService.getAll()
            .then(response => {                                
                setLocations(JSON.parse(response))
            })    
    }, [])

    function handleSubmit() {        
        console.log(body);
        updateSewer();
        // form.resetFields();

    }

    function updateSewer() {
        sewerService.updateById(props.sewer._id, JSON.stringify(body))
            .then(response => {
                tata.success('Success', 'Sewer updated', {
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

    function handleSewerNameChange(e) {
        setSewerName(e.currentTarget.value);
    }

    function handleDescriptionChange(e) {
        setdiscription(e.currentTarget.value);
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
                name="sewerForm"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Sewer name"
                    name="sewerName"
                    initialValue={sewerName}
                    rules={[
                        {
                            required: true,
                            message: 'Please input sewer name!',
                        },
                    ]}
                >
                    <Input onChange={handleSewerNameChange} placeholder="Enter sewer name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    initialValue={description}

                >
                    <Input onChange={handleDescriptionChange} placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"    
                    initialValue={city}                
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
                    initialValue={district}                   
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

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}