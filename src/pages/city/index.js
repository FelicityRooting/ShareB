import React from "react";
import {Button, Card, Form, Table, Select, Modal, onCancel, Radio, message} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import '../ui/ui.less';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {
        list:[],
        //弹框是否出现
        isShowOpenCity: false
    }

    params = {
        page: 1
    }

    

    //handle开通城市按钮的部分
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    //城市提交处理
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldValue();
        axios.ajax1({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success("开通成功");
                this.setState({
                    isShowOpenCity: false
                })
                this.requestList();
            }
        })
    }

    componentDidMount() {
        this.requestList();
    }

    //请求接口数据
    requestList = () => {
        //提取this，防止作用域取不到
        let _this = this;
        axios.ajax1({
            url: '/open_city',
            data: {
                params: {
                    page: this.state.page
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
                    this.requestList();
                })
            })
        })
    }

    render () {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: 50
            },
            {
                title: '城市名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                key: 'mode',
                render(mode) {
                    return mode == 1 ? '停车点' : '禁停区'
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                key: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '加盟' : '自盟'
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name',
                key: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                key: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
                key: 'oepn_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                key: 'update_time',
                render: Utils.formateDate,
                width: 230
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name',
                key: 'sys_user_name'
            }
            
        ]
        return (
            <div>
                <Card>
                    {/* //不要通过Form直接定义表单，因为这样取值不方便取 */}
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <Modal title="开通城市" visible={this.state.isShowOpenCity} onCancel={() => {
                    this.setState({
                        isShowOpenCity: false
                    })
                }} onOk = {this.handleSubmit}>
                    {/* //添加wrappedComponentRef属性，获取输入的值 */}
                    <OpenCityForm wrappedComponentRef={(inst) => {
                        this.cityForm = inst;
                    }} />
                </Modal>
                <Card className="content-wrap">
                    <Table 
                        bordered 
                        pagination={this.state.pagination} 
                        columns = {columns} 
                        dataSource={this.state.list}
                    />
                </Card>
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
                    <FormItem label="city">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('id', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct city name!'
                                        }
                                    ]
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
                    <FormItem label="用车模式">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('mode', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct mode!'
                                        }
                                    ]
                                }) (
                                    <Select style={{width: 130}} placeholder="all">
                                        <Option value=''>all</Option>
                                        <Option value='1'>指定停车点模式</Option>
                                        <Option value='2'>禁停区模式</Option>
                                    </Select>
                                )
                            }
                    </FormItem>
                    <FormItem label="营运模式">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('op_mode', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct 营运模式!'
                                        }
                                    ]
                                }) (
                                    <Select style={{width: 80}} placeholder="all">
                                        <Option value=''>all</Option>
                                        <Option value='1'>自营</Option>
                                        <Option value='2'>加盟</Option>
                                    </Select>
                                )
                            }
                    </FormItem>
                    <FormItem label="加盟商授权状态">
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('auth_status', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required: true, 
                                            message: 'Please enter correct 授权状态!'
                                        }
                                    ]
                                }) (
                                    <Select style={{width: 80}} placeholder="all">
                                        <Option value=''>all</Option>
                                        <Option value='1'>已授权</Option>
                                        <Option value='2'>未授权</Option>
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

class OpenCityForm extends React.Component{
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        return (
            // <div>
                <Form layout="horizontal">
                    {/* //...是es6语法，进行结构 */}
                    <FormItem label="选择城市" {...formItemLayout}>
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('id', {
                                    initialValue: '1'
                                }) (
                                        <Select style={{width: 100}} placeholder="Beijing">
                                            <Option value=''>all</Option>
                                            <Option value='1'>Beijing</Option>
                                            <Option value='2'>Tianjin</Option>
                                        </Select>
                                )
                            }
                    </FormItem>
                    <FormItem label="营运模式" {...formItemLayout}>
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('op_mode', {
                                    initialValue: '1'
                                })(
                                        <div style={{width: 100}}>
                                            <Radio value="1">自营</Radio>
                                            <Radio value="2">加盟</Radio>
                                        </div> 
                                )
                            }
                    </FormItem>
                    <FormItem label="用车模式" {...formItemLayout}>
                            {
                                //用getFieldDecorator来实现文本框的two-way binding功能
                                getFieldDecorator('mode', {
                                    initialValue: '1'
                                })(
                                        <div style={{width: 100}}>
                                            <Radio value="1">指定停车点模式</Radio>
                                            <Radio value="2">禁停区模式</Radio>
                                        </div>   
                                )
                            }
                    </FormItem>
                </Form>
            // </div>
        )
    }
} 
OpenCityForm = Form.create({}) (OpenCityForm);