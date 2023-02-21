// 存储当前登录信息

export default {
    namespaced: true,
    state: {
        userinfo: {
            username: '',
            token: '',
        }
    },
    mutations: {
        // 登录设置信息
        setUser(state, payload) {
            state.userinfo = payload
        },

        // 退出清空数据
        removeUser(state, payload) {
            state.userinfo = {
                username: "",
                token: '',
            }
        }
    }
}