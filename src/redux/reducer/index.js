/*
*Reducer 数据处理
*/
import {type} from './../action'
const initialState = {
    cityId:'',
    menuName: '首页'
}

const reducer = (state = initialState, action) => {
    //用switch对action做个判断
    console.log("reducer1-"+action.menuName);
    //就是这里action.type只写了action，导致无法更改面包屑的名字
    switch (action.type) {
        //如果type是switch_menu
        case type.SWITCH_MENU:
            return {
                ...state,//旧的state
                menuName:action.menuName//返回新的state
            } 
        default:
            return state;
    }
}
export default reducer