import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

export default class Home extends React.Component {

    render() {
        return(
            <div>
                {/* 在不管加载什么之前，都要把hashrouter或者browserrouter加载进来当做路由的根
                结点，这样才能实现路由的跳转 */}
                {/* hashrouter里只能有一个子节点，不能直接写route，要用一个div包起来，否则报错 */}
                <div>
                    <ul>
                        <li>
                            <Link to="/main">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li> 
                            <Link to="/topics">Topics</Link>
                        </li>
                      </ul> 
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        )
    }

}