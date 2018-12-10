/*
*Store类型,引入createStore创建Store
*/
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
//引入调度工具
// import { composeWithDeveTools } from 'redux-devtools-extension';

//通过createStore创建数据源
//createStore前面没有{}来包住表示直接返回函数
//export default () => createStore(reducer);//这里没和原视频一样使用composeWithDeveTools()，会报错

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
// export default () => createStore(reducer);