import React from 'react';
import {Link} from 'react-router-dom';
import About from '../route1/about';

export default class Main extends React.Component {

    render() {
        return(
            <div>
                <div>
                    this is main page
                    <Link to="/main/a" component={About}>嵌套路由</Link>
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        )
    }

}