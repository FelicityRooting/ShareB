import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import NavLeft from './components/NavLeft/index';
// import './components/style/common.less';
import './style/common.less';
export default class Admin extends React.Component {
    render() {
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft/>{/* 中间如果没有内容可以这样写 */}
                </Col>
                <Col span="20" className="main">
                    <Header/>
                        <Row className="content">
                            {this.props.children}
                        </Row>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}