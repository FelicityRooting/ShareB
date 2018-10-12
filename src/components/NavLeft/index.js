import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import './index.less';
import { NavLink } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
// function handleClick(e) {
//     console.log('click', e);
// }

export default class NavLeft extends React.Component {

    //这里通过递归遍历的方式来实现菜单渲染，不能单个单个写，因为后期需要从服务端获取数据渲染
    //一个一个写是不现实 的
    componentWillMount() {
        //调用renderMenu方法，把数组对象MenuConfig传递进去，用一个变量接收对象，得到完整的一棵树menuTreeNode
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }

    //菜单渲染
    //接受了从menuConfig来的数据
    renderMenu=(data) => {
        //data.map是这样的，无论map后面的方法对data里的数据做了什么，他返回的是一个新的数组，而data的数组里
        //的数据是不变的
        return data.map((item) => {
            //如果发现还有children，则再调用他自己一次，递归
            if (item.children) {
                return(
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                        {/* //一直遍历到没有子节点为止 */}
                    </SubMenu>
                )
            }
            //官网上是以menu.item来结尾的
            //没有子节点就得到这个最终的菜单
            return <Menu.Item title={item.title} key={item.key}>
                {/* //加上navlink使title能够与路由链接上 */}
                    <NavLink to={item.key}>{item.title}</NavLink>
                    
            </Menu.Item>
            

        })
    }

    render() {
        return (
            <div>
                {/* //分为上下两个部分 */}
                <div className="logo">
                    {/* //这里不写public/assets是因为部署到服务器上后，是不会有public这一层的 */}
                    <img src="/assets/logo-ant.svg" alt="log-pic"/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark">
                    {/* //所有组件的渲染，菜单的变化，必须要通过setState把对象传进去，才会调用render方法把菜单
                    渲染出来 ，*/}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}