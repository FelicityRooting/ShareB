import React from 'react';

export default class Home extends React.Component {

    render() {
        return(
            <div>
                {/* 在不管加载什么之前，都要把hashrouter或者browserrouter加载进来当做路由的根
                结点，这样才能实现路由的跳转 */}
                {/* hashrouter里只能有一个子节点，不能直接写route，要用一个div包起来，否则报错 */}
                <div>
                    404 not found
                </div>
            </div>
        )
    }

}