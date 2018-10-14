import React from 'react';
import { Card, Table } from 'antd';
import axios from '../../axios/index';

export default class BasicTable extends React.Component {

    state = {}

    componentDidMount () {
        const dataSource = [
            {
                id: '0',
                userName: '阿莉塞',
                sex: '2',
                state: '1',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '萨雷安',
                time: '01:03:03'
            },
            {
                id: '1',
                userName: '莉瑟',
                sex: '2',
                state: '1',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '阿拉米格',
                time: '01:03:03'
            },
            {
                id: '2',
                userName: '夜露',
                sex: '2',
                state: '1',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '多玛',
                time: '01:03:03'
            },
            {
                id: '3',
                userName: '雅修特拉',
                sex: '1',
                state: '2',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '乌尔达哈',
                time: '01:03:03'
            },
            {
                id: '4',
                userName: '库洛',
                sex: '2',
                state: '1',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '田园郡',
                time: '01:03:03'
            }
        ]
        this.setState ({
            dataSource: dataSource
        })
        this.request();
    }

    //动态获取mock数据
    request = () => {
        // 可以把共用的，不会变的mockurl放到封装的方法里去
        // let mockurl = 'https://easy-mock.com/mock/5bc2c537dfc4ef4ebc52b164/mockdata';
        // axios.get(mockurl+'/table/list')
        // .then((res) => {
        //     //handle success
        //     //res.data.code == 0是我们在mockdata定义了一个code = 0
        //     if (res.status == '200' && res.data.code == 0) {
        //         // console.log(JSON.stringify(res));
        //         this.setState({
        //             //res.data.result中的result也是我们在mockdata里自定义的api接口
        //             dataSource2: res.data.result
        //         })
        //     }
        // })
        // .catch(function (error) {
        //     //handle error
        // })
        // .then(function () {
        //     //always executed
        // });
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                }
            }
        }).then((res) => {
            if (res.code == '0') {
                this.setState({
                    dataSource2: res.result
                })
            }
        })
    }

    render() {
        //dataIndex是列数据再数据项中对应的key，支持a,b,c的嵌套写法
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '生日',
                dataIndex: 'birth'
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarrige'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
             
        ]
        return (
            <div>
                <Card title="基础表格">
                    {/* //pagination是分页 */}
                    <Table bordered pagination={true}
                        columns = {columns} dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="Mock表格-动态渲染">
                    {/* //pagination是分页 */}
                    <Table bordered pagination={true}
                        columns = {columns} dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        )
    }
}
