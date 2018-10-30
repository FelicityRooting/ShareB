import React from "react";
import './detail.less';
import { Button, Card } from 'antd';
import axios from './../../axios/index';


export default class OrderDetail extends React.Component {

    state = {

    }

    componentDidMount() {
        //取到不同的orderId，即地址里最后的那行数字，这行代码是固定的
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId)
        }
    }

    getDetailInfo() {
        let orderId = this.props.match.orderId;
        axios.ajax1({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code==0) {
                this.setState({
                    //res.result是easymock里的数据结构决定的
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    //渲染出地图
    renderMap(result) {
        //这一步可以跟百度地图api官网学，第一个参数为id='orderDetailMap',是指示用来放在下面的view里的位置,enableMapClick是地图点击事件，false使其无法被点击
        //由于SPA嵌套第三方API的痛点，SPA是模块化开发，所以必须要导入第三方API,这里使用window，SPA不会检测window是不是一个对象，这里的BMap一开始是无法使用的
        this.map = new window.BMap.Map('orderDetailMap');
        //设置地图中心坐标点，添加控件，比如量尺，放大缩小控件
        // this.map.centerAndZoom('北京',11);    
        //添加地图控件
        this.addMapControl();  
        //设置不同模板样式风格的地图
        // let mapStyle={  style : "midnight" }  
        // this.map.setMapStyle(mapStyle);
        //绘制路线图
        this.drawBikeRoute(result.position_list);
        //绘制服务区
        this.drwaServiceArea(result.area);
    }

    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }));
        map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }));
    }

    //绘制用户路线图
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];//起始
            let last = positionList[positionList.length - 1];//结束
            startPoint = new window.BMap.Point(first.lon, first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {    
                imageSize: new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            });   
            
            //只要是想在地图上添加坐标点，就需要new一个marker
            let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {    
                imageSize: new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            });   
            let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});
            this.map.addOverlay(endMarker);

            //生成路线图
            let trackPoint = [];
            //遍历easymock数据里所有的路线的点
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeigth: 3,
                strokeOpacity: 1
            })
            this.map.addOverlay(polyline);
            //设置最后的终点为中心坐标点
            this.map.centerAndZoom(endPoint, 11);
        }
    }

    // 绘制服务区
    drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }



    render () {
        //如果是空值，给个{}
        const info = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    {/* 地图功能实现：1.创建ak，加载百度地图sdk，2.地图初始化，3.添加地图控件，4.绘制用户行驶路线，5.绘制服务区地图 */}
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础Info</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车model</div>
                                {/* 是1返回服务区，是2返回停车点 */}
                                <div className="detail-form-content">{info.model == 1 ? '服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Order Number</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Car Number</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">User Name</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Phone Number</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}