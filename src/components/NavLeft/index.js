import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import './index.less';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';//用这个把redux和组件连接起来
import { switchMenu } from './../../redux/action';//调用action

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
// function handleClick(e) {
//     console.log('click', e);
// }

class NavLeft extends React.Component {

    state = {
        //这个用来只是现在翻到了那个menu
        currentKey:''
    }

    //通过对象的方式结构item
    handleClick = ({item,key}) => {
        const { dispatch } = this.props;//因为下面有connect()(NavLeft)才能这样做
        dispatch(switchMenu(item.props.title));
        console.log(item.props.title);
        this.setState({
            currentKey: item.key
        })
    }

    //这里通过递归遍历的方式来实现菜单渲染，不能单个单个写，因为后期需要从服务端获取数据渲染
    //一个一个写是不现实 的
    componentWillMount() {
        //调用renderMenu方法，把数组对象MenuConfig传递进去，用一个变量接收对象，得到完整的一棵树menuTreeNode
        const menuTreeNode = this.renderMenu(MenuConfig);
        //用replace代替掉原来path里的#，但这个方法如果遇到是?就不适用了
        // let currentKey = window.location.hash.replace('#','');
        //还一种方法是用正则表达式来替换
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
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
                <Menu onClick={this.handleClick} theme="dark" selectedKeys={this.state.currentKey}>
                    {/* //所有组件的渲染，菜单的变化，必须要通过setState把对象传进去，才会调用render方法把菜单
                    渲染出来 ，*/}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export default connect()(NavLeft);//将NavLeft丢入redux里面