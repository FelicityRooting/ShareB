import React from "react";
import {Button, Card, Form, Table, Select, Modal, DatePicker, Radio, message} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {
    state = {

    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        //提取this，防止作用域取不到
        let _this = this;
        axios.ajax1({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
                // isShowLoading: true//默认为true，如果改成false，则不再触发loading动画
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            //对从easy mock传来的数据做一个遍历,给返回的数据源动态添加key,没有这步，会有红字warning在控制台
            //凡是要用到setState方法，都要渲染DOM
            this.setState({
                list: list,
                pagination: Utils.pagination(res, (current) => {
                    //当转到第二页了，参数不需要变，只需要重用request去获取参数，不需要重新存入state
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    params = {
        page: 1
    }

    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary">订单详情</Button>
                    <Button type="primary">结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered 
                        pagination={this.state.pagination} 
                        columns = {columns} 
                        dataSource={this.state.list}
                    />
                </div>
            </div>
        )
    }

}

class FilterForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout="inline" type='card' className='card-wrap'>
                    <FormItem label="城市">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('order_sn', {
                                    initialValue:'all'
                                }) (
                                    <Select style={{width: 110}} placeholder="all">
                                        <Option value=''>all</Option>
                                        <Option value='1'>Beijing</Option>
                                        <Option value='2'>Shanghai</Option>
                                        <Option value='3'>Hongkang</Option>
                                        <Option value='4'>Guangzhou</Option>
                                    </Select>
                                )
                            }
                    </FormItem>
                    <FormItem>
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('start_time') (
                                    <DatePicker style={{width: 150}} showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                                )
                            }
                    </FormItem>
                    <FormItem label="~">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('end_time') (
                                    <DatePicker style={{width: 150}} showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                                )
                            }
                    </FormItem>
                    <FormItem label="订单状态">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('status', {
                                    initialValue:'all'
                                }) (
                                    <Select style={{width: 100}} placeholder="all">
                                        <Option value=''>all</Option>
                                        <Option value='1'>进行中</Option>
                                        <Option value='2'>进行中（临时锁车）</Option>
                                        <Option value='2'>行程结束</Option>
                                    </Select>
                                )
                            }
                    </FormItem>
                    <FormItem>
                            <Button type="primary" style={{margin: '0 20px'}}>Search</Button>
                            <Button>Reset</Button>
                    </FormItem>
                </Form>
            </div>
        );   
    }
}
FilterForm = Form.create({}) (FilterForm);
