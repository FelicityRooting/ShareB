import React from 'react';
import { Card, Table, Badge, Modal, message, Button } from 'antd';
import axios from '../../axios/index';

export default class AdvanceTable extends React.Component {
    state = {

    }
    params = {
        page:1
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.state.page
                },
                // isShowLoading: true//默认为true，如果改成false，则不再触发loading动画
            }
        }).then((res) => {
            if (res.code == '0') {
                //对从easy mock传来的数据做一个遍历,给返回的数据源动态添加key,没有这步，会有红字warning在控制台
                res.result.list.map((item, index) => {
                    item.key = index
                })
                //凡是要用到setState方法，都要渲染DOM
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    }

    //排序处理
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }
    //删除处理
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: 'NOTICE',
            content: 'are you sure to delelte this row?',
            onOk:()=> {
                message.success('delete complete!');
                this.request();
            }
        })
    }
    
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                //不指定宽度会导致与表头不合
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'male' : 'female'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        1 : '咸鱼',
                        2 : '面试过了',
                        3 : '肝',
                        4 : '肝秃了'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        1 : '听音乐',
                        2 : '写代码',
                        3 : '跑步',
                        4 : '玩',
                        5 : '唱歌'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarrige',
                width: 80,
                render(isMarrige) {
                    return isMarrige == 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
             
        ]
        const columns1 = [
            {
                title: 'id',
                dataIndex: 'id',
                //使id固定在左边
                fixed: 'left',
                //不指定宽度会导致与表头不合
                width: 80
            },
            {
                title: '用户名',
                fixed: 'left',
                dataIndex: 'userName',
                width: 120
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'male' : 'female'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        1 : '咸鱼',
                        2 : '面试过了',
                        3 : '肝',
                        4 : '肝秃了'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        1 : '听音乐',
                        2 : '写代码',
                        3 : '跑步',
                        4 : '玩',
                        5 : '唱歌'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birth',
                width: 120
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarrige',
                width: 80,
                render(isMarrige) {
                    return isMarrige == 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                fixed: 'right'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
                fixed: 'right'
            }
             
        ]
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                //排序函数，本地排序使用的一个函数，需要服务端排序可设为true
                sorter: (a,b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'male' : 'female'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1 : '咸鱼',
                        2 : '面试过了',
                        3 : '肝',
                        4 : '肝秃了'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        1 : <Badge status='success' text="成功"/>,
                        2 : <Badge status='error' text="报错"/>,
                        3 : <Badge status='default' text="正常"/>,
                        4 : <Badge status='processing' text="进行中"/>,
                        5 : <Badge status='warning' text="警告"/>,
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birth'
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarrige',
                render(isMarrige) {
                    return isMarrige == 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render:(text, item) => {
                    return(
                        <Button size="small" onClick={(item) => 
                            //这里的this是react本身的对象
                            {this.handleDelete(item)}
                        }>DELETE</Button>
                    ) 
                }
            }  
        ]
        return (
            <div>
                <Card title="头部固定" style={{ margin: '10px 0' }}>
                    <Table bordered scroll={{y: 240}}
                        columns = {columns} dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table bordered scroll={{x: 1680}}
                        columns = {columns1} dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="排序-操作按钮" style={{ margin: '10px 0' }}>
                    <Table bordered columns = {columns2} dataSource={this.state.dataSource} 
                    pagination={false}
                    onChange={this.handleChange}
                    />
                </Card>
            </div>
        )
    }
}