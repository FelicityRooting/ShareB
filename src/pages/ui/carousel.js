import React from 'react';
import { Carousel, Card} from 'antd';
import './ui.less';


export default class Tankuang extends React.Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" type='card' className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - React</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" type='card' className='slider-wrap'>
                    <Carousel autoplay>
                        <div><img src="/carousel-img/carousel-1.jpg" alt=''></img></div>
                        <div><img src="/carousel-img/carousel-2.jpg" alt=''></img></div>
                        <div><img src="/carousel-img/carousel-3.jpg" alt=''></img></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}