import React from 'react';
import App from './App';
import Login from './pages/login/index';
import NoMatch from './pages/nomatch/index';
import Button from './pages/ui/button';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Notice from './pages/ui/notice';
import GlobalMessage from './pages/ui/globalmessage';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basic';
import AdvanceTable from './pages/table/advance';
import Order from './pages/order/index';
import Admin from './admin';
import City from './pages/city/index';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Common from './common';
import OrderDetail from './pages/order/detail';


export default class IRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    {/* 无论<App></App>里面是什么内容，都优先访问App的code */}
                    <App>
                        {/* <Route path="/login" component={Login1}></Route> */}
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
                                    <Route path='/admin/ui/carousel' component={Carousel}></Route>
                                    <Route path='/admin/form/login' component={FormLogin}></Route>
                                    <Route path='/admin/form/reg' component={FormRegister}></Route>
                                    <Route path='/admin/table/basic' component={BasicTable}></Route>
                                    <Route path='/admin/table/high' component={AdvanceTable}></Route>
                                    <Route path='/admin/city' component={City}></Route>
                                    <Route path='/admin/order' component={Order}></Route>
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>            
                        }></Route>
                        {/* //先去common，再加载 具体的页面*/}
                        <Route path="/common" render={() => 
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route> 
                            </Common>
                        }>
                        </Route>
                                               
                    </App>              
                </Router>
            </div>
        );
    }
}