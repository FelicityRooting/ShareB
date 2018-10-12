import React from 'react';
import { notification, Button, Card } from 'antd';
import './ui.less';

export default class Tankuang extends React.Component {

    openNotification = (type, direction) => {
        if (direction) {
            notification.config({
                placement: direction
            })
        }
        notification[type]({
          message: '发工资了',
          description: '上月考勤22天， 迟到12天，实发工资250，请笑纳',
        });
    };
    render() {
        return (
            <div>
                <Card title="通知提醒框" type="primary" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框-方向控制" type="primary" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success-TopLeft</Button>
                    <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info-TopRight</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning-BottomLeft</Button>
                    <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error-BottomRight</Button>
                </Card>
            </div>
        )
    }
}