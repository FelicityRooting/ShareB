import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
//封装jsonp的插件
//封装动态获取mock数据的方法
export default class Axios {
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
        return new Promise((resolve, reject) => {
            let baseApi = 'https://easy-mock.com/mock/5bc2c537dfc4ef4ebc52b164/mockdata';
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                //如果从url得到的data和params都是true，就取他们，否则取空
                params: (options.data && options.data.params) || ''
            }).then((response) => {
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