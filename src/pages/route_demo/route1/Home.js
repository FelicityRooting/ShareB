import React from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Main from './main';
import About from './about';
import Topics from './topics';
export default class Home extends React.Component {

    render() {
        return(
            <div>
                {/* 在不管加载什么之前，都要把hashrouter或者browserrouter加载进来当做路由的根
                结点，这样才能实现路由的跳转 */}
                <Router>
                    {/* hashrouter里只能有一个子节点，不能直接写route，要用一个div包起来，否则报错 */}
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li> 
                                <Link to="/topics">Topics</Link>
                            </li>
                        </ul> 
                        <hr/>
                        {/* 不加exact，switch只匹配到第一个/就不会再匹配别的了 */}
                        <Switch>
                            <Route exact={true} path="/" component={Main}></Route>
                            <Route pa th="/about" component={About}></Route>
                            <Route path="/topics" component={Topics}></Route>
                        </Switch>
                        {/* //或者{this.props.children},除去上方switch的部分，this.props.children会去找到自己设置好的router文件 */}
                    </div>
                    
                </Router>
                
            </div>
        )
    }

}