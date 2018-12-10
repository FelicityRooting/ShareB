import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
import Utils from '../utils/utils'
//封装jsonp的插件
//封装动态获取mock数据的方法
export default class Axios {
    //专门给请求列表使用,isMock用来确定所传入的数据是真实的数据还是mock的数据
    static requestList (_this, url, params, isMock) {
        var data = {
            params: params,
            isMock: isMock
        }
        //调用下面的ajax1方法来做公共机制的拦截
        this.ajax1({
            url: url,
            data: data
        }).then((data) => {//用then方法接收结果
            if (data && data.result) {
                // 如果data是true而且data.result是非空，就进行一系列的操作，如果是false，下面ajax1里就会进行拦截
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;//给每个对象添加key值
                    return item;
                });
                //对从easy mock传来的数据做一个遍历,给返回的数据源动态添加key,没有这步，会有红字warning在控制台
                //凡是要用到setState方法，都要渲染DOM
                _this.setState({
                    list: list,
                    pagination: Utils.pagination(data, (current) => {
                        //当转到第二页了，参数不需要变，只需要重用request去获取参数，不需要重新存入state
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
    // 虽然jsonp可以直接用，但是我们习惯把这些第三方插件封装一下，这样的好处是
    // 很多地方调用jsonp时，可以在这里做一个开关，拦截，方便后面有错误的时候进行
    // 处理
    static jsonp(options) {
        //new一个promise（es6语法）,resolve是接口调用成功，reject是接口调用
        // 失败
        return new Promise((resolve, reject) => {
            //调用JsonP方法，
            JsonP(options.url, {
                //因为是跨域的，所以必须要用callback来接收
                param: 'callback'
            }, function (err, response) {
                //to-do
                // debugger;
                if (response.status == 'success'){
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options) {
        //loading动画
        let loading;
        //判断接口是否要loading动画处理,isShowLoading可在basic.js里定义
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';//开启动画
        }
        let baseApi = 'https://easy-mock.com/mock/5bc2c537dfc4ef4ebc52b164/mockdata';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                //如果从url得到的data和params都是true，就取他们，否则取空
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                //判断接口是否要loading动画处理,isShowLoading可在basic.js里定义
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';//关闭动画
                }
                //http请求自身设置的成功为200
                if (response.status == '200') {
                    let res = response.data;
                    //code是我们在mockdata自己设置的code = 0
                    if (res.code == '0') {
                        //把正确信息抛出
                        resolve(res);
                    } else {
                        //用对话框弹出失败信息
                        Modal.info({
                            title: "important！！！",
                            content: res.msg
                        })
                    }
                } else {
                    //把错误信息抛出
                    reject(response.data);
                }
            })
        })
    }

    static ajax1(options) {
        let loading;//loading动画
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';//开启动画
        }
        let baseApi = '';
        //根据真实情况是否是mock的数据
        if (options.isMock) {
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        } else {
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        }
        // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                //如果从url得到的data和params都是true，就取他们，否则取空
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                //判断接口是否要loading动画处理,isShowLoading可在basic.js里定义
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';//关闭动画
                }
                //http请求自身设置的成功为200
                if (response.status == '200') {
                    let res = response.data;
                    //code是我们在mockdata自己设置的code = 0
                    if (res.code == '0') {
                        //把正确信息抛出
                        resolve(res);
                    } else {
                        //用对话框弹出失败信息
                        Modal.info({
                            title: "important！！！",
                            content: res.msg
                        })
                    }
                } else {
                    //把错误信息抛出
                    reject(response.data);
                }
            })
        })
    }
}