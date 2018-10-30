import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    //封装传入时间的格式
    formateDate(time) {
        if(!time) return '';//如果time是空的，则return空的
        let date = new Date(time);//先获取时间对象，把时间戳进行转化，然后return
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分' + date.getSeconds() + '秒';
    },
    
    //封装分页的插件,data是接收的数据，告诉我们当前是第几页，多少数据，callback是当点击下一页时的，触发callback去回调一个函数
    pagination(data, callback) {
        return {
            //callback是当前的页码数
            onChange: (current) => {
                callback(current)
            },
            //这个data.result是easy mock平台返回的数据,page，page_size,total都是平台数据的属性
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            //pagination自带的方法，用于显示数据总量和当前数据的顺序
            showTotal: () => {
                return `共${data.result.total}条`
            },
            //快速跳转
            showQuickJumper: true
        }
    },

    //为components下的baseform封装optionlist
    getOptionList (data) {
        if (!data) {
            return [];
        }
        let options = []//[<Option value="0" key="all_key"></Option>]
        //用map去遍历
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }
    
}


