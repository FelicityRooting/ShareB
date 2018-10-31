/*
*Action类型
*/
//action必须要有type
export const type = {
    SWICH_MENU:'SWICH_MENU'
}

//调用switchMenu方法时，把Menu的名字传进来
export function switchMenu(menuName) {
    return {
        //事件的类型
        type: type.SWICH_MENU,
        menuName: menuName
    }
}// 定义一个方法返回全新的object，包括type和menuname