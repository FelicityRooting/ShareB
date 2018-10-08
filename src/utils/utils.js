export default {
    formateDate(time) {
        if(!time) return '';//如果time是空的，则return空的
        let date = new Date(time);//先获取时间对象，把时间戳进行转化，然后return
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分' + date.getSeconds() + '秒';
    }
}