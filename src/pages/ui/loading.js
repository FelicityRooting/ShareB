import React from 'react';
import { Card, Spin, Icon, Alert } from 'antd';
import './ui.less';

export default class Tankuang extends React.Component {
    render() {
        const icon = <Icon type="loading" style={{ fontSize: 24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    {/* //style里多个值的话用''括起来，不然只能用单个的，还是驼峰写法 */}
                    <Spin style={{margin: '0 10px'}} />
                    <Spin size="large" />
                    <Spin indicator={icon} style={{marginLeft:10}} />
                    <Spin indicator={icon} style={{marginLeft:10}} size="large" />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert message="React"
                            description="欢迎来到React高级实战课程"
                            type="info"
                        />
                    <Spin>
                        <Alert message="React"
                            description="欢迎来到React高级实战课程"
                            type="info"
                        />
                    </Spin>
                    <Spin tip="Loading...">
                        <Alert message="React"
                            description="欢迎来到React高级实战课程"
                            type="info"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert message="React"
                            description="欢迎来到React高级实战课程"
                            type="info"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}