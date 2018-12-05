import React from 'react';
import { Row, Card, Col, Modal } from 'antd';
import './ui.less';


export default class Tankuang extends React.Component {

    state = {
        visible: false
    }

    openGallery=(imgSrc) => {
        this.setState({
            visible: true,
            currentItem: '/gallery/'+imgSrc
        })
    }

    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        //使用map去循环遍历imgs,得到list（所有imgs的行），第二次遍历list，得到每行的元素
        //箭头函数，如果不加{}，而且只有一个元素，默认会有return，但是加了{}，表示会有不止一个元素,就要自己写return
        const imgList = imgs.map((list) => list.map((item) => 
            <Card 
                style={{marginBottom: 10}}
                cover={<img alt="galleryItem" src={'/gallery/'+item} onClick={() => this.openGallery(item)}/>} 
            >
                <Card.Meta title="Europe Street beat"
                description="www.instagram.com"/>          
            </Card>
        ))
        return (
            <div className="card-wrap">
               <Row gutter={10}>
                   {/* 每列都有五张图片 */}
                   <Col md={5}>
                        {imgList[0]}
                   </Col>
                   <Col md={5}>
                        {imgList[1]}
                   </Col>
                   <Col md={5}>
                        {imgList[2]}
                   </Col>
                   <Col md={5}>
                        {imgList[3]}
                   </Col>
                   <Col md={4}>
                        {imgList[4]}
                   </Col>
               </Row>
               <Modal
                    height={500}
                    width={300}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    footer={null}
                    >
                   {<img src={this.state.currentItem} style={{width: 250}} alt=""/>}
               </Modal>
            </div>
        )
    }
}