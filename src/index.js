import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Admin from './admin';
// import Router from './pages/route_demo/route3/router';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store/index';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();

//引入一个全局的router文件来加载
ReactDOM.render(
    //provider用来提供数据源
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root')
    );
// ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


// serviceWorker.unregister();
registerServiceWorker();
