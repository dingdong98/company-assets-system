// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from "vuex";
// 应用Vux插件
Vue.use(Vuex);

//1. state用于存放数据
const state = {
  setLoginId: '',
  token: "",
};
// 2.getter用于state中数据加工
const getters = {
  role: (state) => {
    return state.setLoginId
  },
  token: (state) => {
    return state.token
  }
};
// 3.mutations用于操作数据
const mutations = {
  setLoginId(state, val) {
    state.setLoginId = val;
    console.log(state.setLoginId)
  },
  setTokenInfo(state, val) {
    state.token = val
  }
};
// 4.actions用于响应组件中的动作
const actions = {
};
// 创建并暴露store
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
