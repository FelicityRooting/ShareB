import React from "react";
import { Card, Form } from 'antd';
import BaseForm from '../../components/BaseForm/index';
import axios from "./../../axios/index"

export default class BikeMap extends React.Component{

    state = {}
    map = '';

    formList = [
        {
            type: '城市'
        }, {
            type: '时间查询'
        }, {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
        }
    ]

    requestList = ()=>{
        axios.ajax1({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    componentWillMount() {
        this.requestList();
    }
    // 查询表单
    handelFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }

    // 渲染地图数据
    renderMap = (res) => {
        //拿到路线的列表
        let list = res.result.route_list;//从起点到终点
        this.map = new window.BMap.Map('container');//初始化地图
        let gps1 = list[0].split(',');//起点
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);//起点坐标，0是经度，1是纬度
        let gps2 = list[list.length - 1].split(',');//终点
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);//终点坐标，0是经度，1是纬度
        //保证地图根据某个点居中
        this.map.centerAndZoom(endPoint,11);
        //获得起点的icon
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        });
        //只要是想在地图上添加坐标点，就需要new一个marker
        let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon});
        //画坐标上去
        this.map.addOverlay(bikeMarkerStart);
        //获得终点的icon
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18,42)//控制图片的偏移量
        });
        let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆行驶路线
        let routeList = [];//路线列表
        //遍历list里的每一个坐标，一个一个push进去
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]))
        });
        //画线，连接所有的坐标点
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        });
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];
        //用sevicelist列表保存数据里的服务区
        let serviceList = res.result.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon})
            this.map.addOverlay(bikeMarker);
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共100辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}