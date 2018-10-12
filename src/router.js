import React from 'react';
import App from './App';
import Login from './pages/login/login';
import NoMatch from './pages/nomatch/index';
import Button from './pages/ui/button';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Notice from './pages/ui/notice';
import GlobalMessage from './pages/ui/globalmessage';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Admin from './admin';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    {/* 无论<App></App>里面是什么内容，都优先访问App的code */}
                    <App>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/admin" render={() => 
                            <Admin>
                                <Switch>
                                    <Route path='/admin/ui/buttons' component={Button}></Route>
                                    <Route path='/admin/ui/modals' component={Modals}></Route>
                                    <Route path='/admin/ui/loadings' component={Loading}></Route>
                                    <Route path='/admin/ui/notification' component={Notice}></Route>
                                    <Route path='/admin/ui/messages' component={GlobalMessage}></Route>
                                    <Route path='/admin/ui/tabs' component={Tabs}></Route>
                                    <Route path='/admin/ui/gallery' component={Gallery}></Route>
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>            
                        }></Route>
                        <Route path="/order/detail" component={Login}></Route>
                    </App>              
                </Router>
            </div>
        );
    }
}