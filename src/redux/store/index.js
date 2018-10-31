/*
*Store类型,引入createStore创建Store
*/
import { createStore } from 'redux';
import reducer from './../reducer';
//引入调度工具
// import { composeWithDeveTools } from 'redux-devtools-extension';

//通过createStore创建数据源
//createStore前面没有{}来包住表示直接返回函数
export default () => createStore(reducer);//这里没和原视频一样使用composeWithDeveTools()，会报错