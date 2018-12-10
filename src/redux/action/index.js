/*
*Action类型
*/
//action必须要有type
export const type = {
    SWITCH_MENU:'SWITCH_MENU'
}

//调用switchMenu方法时，把Menu的名字传进来
export function switchMenu(menuName) {
    return {
        //事件的类型
        type: type.SWITCH_MENU,
        menuName
    }
}// 定义一个方法返回全新的object，包括type和menuname