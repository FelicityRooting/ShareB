import React from 'react';
import {Row, Col} from 'antd';
import './index.less';
import Util from '../../utils/utils';
import Doc from '../../resource/doc';
import axios from '../../axios/index';
export default class Header extends React.Component {

    //先声明一个时间变量，后面才能setState
    state={}
    componentWillMount() {
        this.setState({
            userName: 'felicity'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());//定义一个变量，把格式化的时间戳传递过去
            //这里的this指的是当前的header对象，之所以能用setstate，是因为setstate是header对象（react对象）的一个方法
            //但是set之前必须要声明好一个变量，所以前面必须声明一个变量state
            this.setState({
                sysTime
            });//用setstate把它传进去
        },1000)//设置成每隔1秒获取一次时间
        this.getWeatherAPIDate();
    }

    //获取百度api接口
    getWeatherAPIDate() {
        //这里需要通过jsonp的方式来调用百度api接口（安装好jsonp插件）
        //jsonp会处理跨域请求
        //依旧像上面的date处理（utils封装）一样，先进行一个封装，因为不能直接使用jsonp
        //通过axios插件来发送jsonp方法
        let city = 'hefei'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>Welcome, {this.state.userName}</span>
                        <a href="#">Quit</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        <p>首页</p>
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt="daypicture"/>   
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}