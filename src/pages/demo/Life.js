import React from 'react';
import Child from './Child';
import './index.less';
import {Button} from 'antd';
// import 'antd/dist/antd.css';
export default class Life extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log('this component will mount~');
    }


    handleAdd() {
        this.setState ({
            count: this.state.count + 1
        })
    }

    handleClick=() => {
        this.setState ({
            count: this.state.count + 1
        })
    }

    render() {
        return (
        <div className="content">
            <p>React lifecycle introduction</p>
            <Button onClick={this.handleAdd.bind(this)}>AntdSubmit</Button>
            <p>{this.state.count}</p>
            <p>this is another</p>
            <button onClick={this.handleClick}>Submit</button>
            <p>{this.state.count}</p>
            <Child></Child>
        </div>
    
        )
    }
}