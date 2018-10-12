import React from 'react';
import { Tabs, Card, Icon, message } from 'antd';
import './ui.less';


export default class Tankuang extends React.Component {

    newTabIndex = 0;


    handleCallback = (key) => {
        message.info("hi you choose the " + key + " tab")
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: '通过面试啦啦1',
                key: "1"
            }, 
            {
                title: 'Tab 2',
                content: '通过面试啦啦2',
                key: "2"
            }, 
            {
                title: 'Tab 3',
                content: '通过面试啦啦3',
                key: "3"
            }
        ]
        this.setState({
            //panes: panes，下面那行是这行的省略,但是如果上面const的后面不panes，就不能这样省略
            panes
        }) 
    }

    //把activeKey存进来
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    //新增和删除页签的回调，在 type="editable-card" 时有效
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        //新增的tab的title
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: '面试又通过啦啦啦', key: activeKey });
        this.setState({ panes, activeKey });
    }
    
    remove = (targetKey) => {
        //获取当前打开的tab
        let activeKey = this.state.activeKey;
        //声明一个索引（通过lastIndex来指定默认激活的tab）
        let lastIndex;
        //从索引pane里遍历
        this.state.panes.forEach((pane, i) => {
            //判断要删除的key和当前选中的key是不是一个tab的key
            if (pane.key === targetKey) {
                //如果是，就把索引存下来
                lastIndex = i - 1;
            }
        });
        //过滤掉要删的，得到剩下的tab组成新的panes
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div>
                <Card title="tab页签" type="primary" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">面试通过啦1</TabPane>
                        <TabPane tab="Tab 2" key="2">面试通过啦2</TabPane>
                        <TabPane tab="Tab 3" key="3">面试通过啦3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tab带图标页签" type="primary" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback} type="card">
                        {/* //Icon必须包在span这样的标签里，不然报错 */}
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1" icon="plus">面试通过啦1</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2" icon="edit">面试通过啦2</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3" icon="delete">面试通过啦3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tab动态卡片页签" type="primary" className="card-wrap">
                    <Tabs activeKey={this.state.activeKey} onChange={this.onChange} onEdit={this.onEdit} type="editable-card">
                        {/* //动态构建的话，需要一个循环，另外js语法不能很随便的写，必须写在大括号里 */}
                        {
                            this.state.panes.map(panes => {
                                return <TabPane tab={panes.title} key={panes.key}>{panes.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}