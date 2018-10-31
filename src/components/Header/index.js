import React from 'react';
import {Row, Col, Badge} from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios/index';
import { connect } from 'react-redux';

//这时候Header变成子组件
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
        let city = 'beijing'
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
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                {/* //做一个判断是否是menutype为二级，来决定是否加入logo图片 */}
                    {
                        menuType?
                        <Col span="6" className="logo">
                            <img src="/assets/logo-ant.svg"></img>
                            <span>ReactJS通用管理器</span>
                        </Col> : ''
                    }
                    {/* //原来这里是span="24",但是由于上面加了logo图片，所以需要做一个动态判断，根据是否是二级 */}
                    <Col span={menuType? 18:24}>
                        <span>Welcome, {this.state.userName}<Badge count={1000} overflowCount={999}><a href="#" /></Badge></span>
                        <a href="#" style={{color:"red"}}>Quit</a>
                    </Col>
                </Row>
                {/* //做一个menuType是否是二级的判断，是就返回空，以便后期重新style header，不是就返回正常的breadcrumb */}
                {
                    menuType? '':
                    <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            {/* {this.props.menuName} */}
                            首页
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
                }

            </div>
        )
    }
}
//获取值，这里定义一个回调方法，他返回一个state,这里是一个父组件,Header要从这里拿数据
// const mapStateToProps = (state) => {
//     return {
//         menuName: state.menuName
//     }
// }
// export default connect(mapStateToProps)(Header);