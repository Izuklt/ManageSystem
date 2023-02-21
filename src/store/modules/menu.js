// 导入请求的接口方法
import { permission } from '@/api/index'
// 导入前端定义好的完整的路由信息
import { menu } from '@/router/menu'
// 导入路由和基本路由信息
import router, { baseRoutes } from '@/router/index'
// 导入菜单导航方法
import { rulesMenu } from '@/utils/common'
import { cloneDeep } from "lodash";

export default {
    namespaced: true,
    state: {
        // 定义动态导航容器---存储动态导航
        dyMenuList: []
    },
    mutations: {
        // 设置菜单导航
        setMenuList(state, payload) {
            state.dyMenuList = payload
        },
        // 清空菜单导航
        removeMenuList(state) {
            state.dyMenuList = []
        }
    },
    actions: {
        //请求请求动态路由信息的接口方法
        async getMenuList({ commit, rootState }) {
            let res = await permission({ token: rootState.login.userinfo.token })
            console.log('后端返回的导航菜单内容:----', res.data.data);
            console.log('前端返回的导航菜单内容:----', menu);

            let myMenu = rulesMenu(menu, res.data.data)
            console.log('处理好的菜单导航', myMenu);

            // 存储动态菜单导航
            commit('setMenuList', myMenu);
            // 把匹配好的路由数据追加到layout界面
            let mybaseRoutes = cloneDeep(baseRoutes);
            mybaseRoutes[0].children.push(...myMenu)
            console.log('baseRoutes', baseRoutes);

            return mybaseRoutes;
        }
    }

}