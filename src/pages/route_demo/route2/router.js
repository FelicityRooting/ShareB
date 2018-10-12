import React from 'react';
import Main from './Main';
import About from '../route1/about';
import Topics from '../route1/topics';
import Home from './Home';
import {HashRouter as Router, Route} from 'react-router-dom';

export default class Irouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <div>
                        {/* arrow function 默认会return */}
                        {/* //下面这行千万不能加上exact={true}，否则读不出来子路由，因为精确路由无法匹配到子路由的路由  */}
                        <Route path="/main" render={() => 
                            <Main>
                                <Route path="/main/a" component={About}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topics}></Route>
                    </div>
                </Home>
            </Router>
        )
    }
}

// 此文件就是一个单独拿出来的配置各种路由的文件