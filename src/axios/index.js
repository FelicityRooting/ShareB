import JsonP from 'jsonp';
import { resolve } from 'rsvp';
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
}