import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';

export default class Tankuang extends React.Component {

    // 默认弹框不显示
    state = { 
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    //type变成动态变量，可以是showModal1, showModal2, showModal3, showModal4
    handleOpen = (type) => {
        this.setState ({
            [type]: true
        });
    }
    //Modal.confirm() == Modal['confirm']
    handleComfirm = (type) => {
        Modal[type]({
            //title,content,onOk,onCancel这四个属性都是很重要的
            title: 'sure?',
            content: 'are you sure you have understood react?',
            onOk() {
                console.log('ok');
            }, 
            onCancel() {
                console.log('cancel');
            }
        })
    }

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    {/* //使用箭头函数return一个方法 */}
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Modal title="Basic Modal" visible={this.state.showModal1} 
                onCancel={() => {
                    this.setState({
                        showModal1: false
                    })
                }} onOk={() => {
                    this.setState({
                        showModal1: false
                    })
                }}>
                        <p>普通弹出框</p>
                </Modal>
                <Modal title="自定义" visible={this.state.showModal2} 
                onCancel={() => {
                    this.setState({
                        showModal2: false
                    })
                }} onOk={() => {
                    this.setState({
                        showModal2: false
                    })
                }} okText="next step" cancelText="no more">
                        <p>自定义弹出框</p>
                </Modal>
                <Modal style={{top:20}} title="自定义" visible={this.state.showModal3} 
                onCancel={() => {
                    this.setState({
                        showModal3: false
                    })
                }} onOk={() => {
                    this.setState({
                        showModal3: false
                    })
                }}>
                        <p>距离顶部20px</p>
                </Modal>
                <Modal wrapClassName="vertical-center-modal" title="水平垂直居中" visible={this.state.showModal4} 
                onCancel={() => {
                    this.setState({
                        showModal4: false
                    })
                }} onOk={() => {
                    this.setState({
                        showModal4: false
                    })
                }}>
                        <p>水平垂直居中</p>
                </Modal>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleComfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleComfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleComfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleComfirm('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => this.handleComfirm('error')}>Error</Button>
                </Card>
            </div>
        )
    }
}