import React from "react";
import { Button, Card, Form, Table, Select, Modal, DatePicker, Radio, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import BaseForm from '../../components/BaseForm/index';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {
    state = {
        orderInfo:{},
        orderConfirmVisble: false
    }

    params = {
        page: 1
    }

    //为components文件夹下的baseform而定义的
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{id:'0', name:'全部'},{id:'1', name:'北京'},{id:'2', name:'天津'},{id:'3', name:'上海'}]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{id:'0', name:'全部'},{id:'1', name:'进行中'},{id:'2', name:'结束行程'}]
        },

    ]

    componentDidMount() {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        //提取this，防止作用域取不到
        let _this = this;
        axios.requestList(this, '/order/list',this.params, true);//通过封装公共机制，下面的代码都被挪去了axios里了，有些this的问题，视频10-4有说
        // axios.ajax1({
        //     url: '/order/list',
        //     data: {
        //         params: {
        //             page: this.params.page
        //         }
        //         // isShowLoading: true//默认为true，如果改成false，则不再触发loading动画
        //     }
        // }).then((res) => {
        //     let list = res.result.item_list.map((item, index) => {
        //         item.key = index;
        //         return item;
        //     });
        //     //对从easy mock传来的数据做一个遍历,给返回的数据源动态添加key,没有这步，会有红字warning在控制台
        //     //凡是要用到setState方法，都要渲染DOM
        //     this.setState({
        //         list: list,
        //         pagination: Utils.pagination(res, (current) => {
        //             //当转到第二页了，参数不需要变，只需要重用request去获取参数，不需要重新存入state
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // })
    }

    //订单结束确认
    handleConfirm = () => {
        let item = this.state.seletctedItem;
        if (!item) {
            Modal.info({
                title:'notice',
                content: 'please choose a order'
            })
            return;//没有这条，会提示id是undefined的错误
        }
        axios.ajax1({
            url:'/order/ebike_info',
            data:{
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    handleFinish = () => {

    }

    //结束订单里点ok后
    handleFinishOrder = () => {
        let item = this.state.seletctedItem;
        axios.ajax1({
            url:'/order/finish_order',
            data:{
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                //通过requestlist去刷新下列表
                this.requestList();
            }
        })
    }

    onRowClick = (record, index) => {
        //保存记住用户所在行的位置,用数组是因为可能是多选
        let selectKey = [index];
        this.setState({
            //通过传入的在页面被选中的索引,指定选中项的 key 数组，存在state里（这样就可以显示出选中了），需要和 onChange 进行配合
            selectedRowKeys: selectKey,
            //选中的项，保存用户信息
            seletctedItem: record
        })
    }

    openOrderDetail = () => {
        //判断有没有选中订单
        let item = this.state.seletctedItem;
        if (!item) {
            Modal.info({
                title:'notice',
                content: 'please choose a order'
            })
            return;//没有这条，会提示id是undefined的错误
        }
        //打开新的窗口
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
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
        const formItemLayout = {
            labelCol: {span:5},
            wrapperCol: {span:19}
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered 
                        pagination={this.state.pagination} 
                        columns = {columns} 
                        dataSource={this.state.list}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                    {/* //这个modal不能改变 */}
                    <Modal title="结束订单" visible={this.state.orderConfirmVisble} 
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }} onOk = {this.handleFinishOrder} width={600}>
                        <Form layout="horizontal">
                            <FormItem label="车辆编号" {...formItemLayout}>
                                {this.state.orderInfo.bike_sn}
                            </FormItem>
                            <FormItem label="剩余电量" {...formItemLayout}>
                                {this.state.orderInfo.battery + '%'}
                            </FormItem>
                            <FormItem label="行程开始时间" {...formItemLayout}>
                                {this.state.orderInfo.start_time}
                            </FormItem>
                            <FormItem label="当前位置" {...formItemLayout}>
                                {this.state.orderInfo.location}
                            </FormItem>
                        </Form>
                        
                    </Modal>
            </div>
        )
    }

}

// class FilterForm extends React.Component {
//     render() {
//         const {getFieldDecorator} = this.props.form;
//         return (
//             <div>
//                 <Form layout="inline" type='card' className='card-wrap'>
//                     <FormItem label="城市">
//                             {
//                                 //用getFieldDecorator来实现文本框的two-way binding功能
//                                 getFieldDecorator('order_sn', {
//                                     initialValue:'all'
//                                 }) (
//                                     <Select style={{width: 110}} placeholder="all">
//                                         <Option value=''>all</Option>
//                                         <Option value='1'>Beijing</Option>
//                                         <Option value='2'>Shanghai</Option>
//                                         <Option value='3'>Hongkang</Option>
//                                         <Option value='4'>Guangzhou</Option>
//                                     </Select>
//                                 )
//                             }
//                     </FormItem>
//                     <FormItem>
//                             {
//                                 //用getFieldDecorator来实现文本框的two-way binding功能
//                                 getFieldDecorator('start_time') (
//                                     <DatePicker style={{width: 150}} showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
//                                 )
//                             }
//                     </FormItem>
//                     <FormItem label="~">
//                             {
//                                 //用getFieldDecorator来实现文本框的two-way binding功能
//                                 getFieldDecorator('end_time') (
//                                     <DatePicker style={{width: 150}} showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
//                                 )
//                             }
//                     </FormItem>
//                     <FormItem label="订单状态">
//                             {
//                                 //用getFieldDecorator来实现文本框的two-way binding功能
//                                 getFieldDecorator('order_status', {
//                                     initialValue:'all'
//                                 }) (
//                                     <Select style={{width: 100}} placeholder="all">
//                                         <Option value=''>all</Option>
//                                         <Option value='1'>进行中</Option>
//                                         <Option value='2'>进行中（临时锁车）</Option>
//                                         <Option value='2'>行程结束</Option>
//                                     </Select>
//                                 )
//                             }
//                     </FormItem>
//                     <FormItem>
//                             <Button type="primary" style={{margin: '0 20px'}}>Search</Button>
//                             <Button>Reset</Button>
//                     </FormItem>
//                 </Form>
//             </div>
//         );   
//     }
// }
// FilterForm = Form.create({}) (FilterForm);
