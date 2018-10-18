import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';

export default class BasicTable extends React.Component {

    state = {
        dataSource2:[]
    }

    // 设置初始页码为1
    params = {
        page: 1
    }

    componentDidMount () {
        const dataSource = [
            {
                id: '0',
                key: '1',
                userName: '椒盐海豹',
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
                key: '2',
                userName: '叶大妖',
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
                key: '3',
                userName: '豆豆柴',
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
                key: '4',
                userName: '胖陆行鸟',
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
                key: '5',
                userName: '古菩猩猩',
                sex: '2',
                state: '1',
                interest: '1',
                birth: '2000/01/01',
                isMarrige: '未婚',
                address: '田园郡',
                time: '01:03:03'
            }
        ]
        //通过map做个循环
        dataSource.map((item, index) => {
            item.key = index;
        })
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
        let _this = this;
        axios.ajax({
            url: '/table/list',
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
                    dataSource2: res.result.list,
                    //清空选中的行，不然删除按钮后刷新页面，选中的行的√依然在
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        //当转到第二页了，参数不需要变，只需要重用request去获取参数，不需要重新存入state
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record, index) => {
        //保存记住用户所在行的位置,用数组是因为可能是多选
        let selectKey = [index];
        Modal.info({
            title: 'message',
            content: `username: ${record.userName}`
        });
        this.setState({
            //通过传入的在页面被选中的索引,指定选中项的 key 数组，存在state里（这样就可以显示出选中了），需要和 onChange 进行配合
            selectedRowKeys: selectKey,
            //选中的项，保存用户信息
            seletctedItem: record
        })
    }

    //多选删除
    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id);
        })
        Modal.confirm({
            title: 'NOTICE',
            content: `are you sure to delete ${ids.join(',')}`,
            onOk:() => {
                message.success('delete complete!');
                //刷新页面（重新请求数据）
                this.request();
            }
        })
    })

    render() {
        //dataIndex是列数据再数据项中对应的key，支持a,b,c的嵌套写法
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex == 1 ? 'male' : 'female'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
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
                key: 'interest',
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
                key: 'state'
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarrige',
                key: 'isMarrige',
                render(isMarrige) {
                    return isMarrige == 1 ? '已婚' : '未婚'
                }
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                key: 'time'
            }
             
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type : 'radio',
            //下面这行如果注释掉，依然能选到行的数据，但是前面的radio无法保持选中
            selectedRowKeys
            //也可以加onchange事件，但是在下面已经加过了onRow事件
        }

        const rowCheckSelection = {
            //如果是radio，那么会变成单选
            type: 'checkbox',
            selectedRowKeys,//指定选中项的 key 数组，需要和 onChange 进行配合
            onChange:(selectedRowKeys, selectedRows) => {//选中项发生变化时的回调
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id);
                })//每次选中项变化后，做个记录，记录下选中的id，push进数组
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedIds: ids,
                    selectedRows
                })
            }
        }

        return (
            <div>
                <Card title="基础表格" style={{ margin: '10px 0' }}>
                    {/* //pagination是分页 */}
                    <Table bordered pagination={true}
                        columns = {columns} dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="Mock表格-动态渲染" style={{ margin: '10px 0' }}>
                    {/* //pagination是分页 */}
                    <Table bordered pagination={true}
                        columns = {columns} dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="Mock表格-单选" style={{ margin: '10px 0' }}>
                    {/* //pagination是分页,onRow是设置行属性 */}
                    <Table rowSelection={rowSelection} onRow={(record, index) => {
                        return {
                            onClick: () => {//点击行
                                this.onRowClick(record, index);
                            }
                        };
                    }}
                        bordered pagination={true}
                        columns = {columns} dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="Mock表格-多选" style={{ margin: '10px 0' }}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                    {/* //pagination是分页,onRow是设置行属性 */}
                    <Table 
                        //为了实现多选，我们需要存储多个值，改一下rowSelection为我们自定义的rowCheckSelection
                        rowSelection={rowCheckSelection}
                        bordered 
                        pagination={this.state.pagination}
                        columns = {columns} 
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        )
    }
}
