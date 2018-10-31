/*
*Reducer 数据处理
*/
import {type} from './../action'
const initialState = {
    menuName: '首页'
}

export default (state = initialState, action) => {
    //用switch对action做个判断
    switch (action) {
        //如果type是switch_menu
        case type.SWICH_MENU:
            return {
                ...state,//旧的state
                menuName:action.menuName//返回新的state
            } 
            break;
        default:
            break;
    }
}