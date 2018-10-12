import React from 'react';
import {Link} from 'react-router-dom';

export default class Main extends React.Component {

    render() {
        return(
            <div>
                <div>
                    this is main page
                    <br/>
                    <Link to="/main/test1">嵌套路由1</Link>
                    <br/>
                    <Link to="/main/test2">嵌套路由2</Link>
                    <br/>
                    <Link to="/main/test3">嵌套路由3</Link>
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        )
    }

} 