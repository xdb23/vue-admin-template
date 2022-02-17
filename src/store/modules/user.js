import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getMoreInfo } from '@/api/user'
// 状态
const state = {
  // 状态
  // 初始化的时候从缓存读取状态，并赋值到初始化的状态上
  // Vuex的的持久化如何实现？ Vuex和前端缓存相结合
  token: getToken(), // 设置token初始状态 Token持久化 =>放到缓存中
  userInfo: null // 定义一个空对象 不是null
}
// 修改状态
const mutations = {
  // 设置toekn
  setToken(state, token) {
    state.token = token // 设置token 只是修改state的数据
    // vuex变化 => 缓存数据
    setToken(token) // vuex和缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除vuex 再清楚缓存vuex和缓存数据的同步
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    // console.log(state.userInfo)
    state.userInfo = userInfo // 用浅拷贝的方式去赋值对象，这样数据更新的时候，才会触发组件的更新
  }
  // // 删除用户信息
  // removeUserInfo(state) {
  //   state.userInfo = {}
  // }
}
// 执行异步
const actions = {
  // 定义login action 也需要参数，调用action时传递过来的参数
  async login(context, data) {
    const res = await login(data) // 实际上就是一个promise result就是执行结果， axios默认给数据加了一层data
    // if (result.data.success) {
    // 表示登录接口调用成功
    // 现有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', res)
    // 写入时间戳
    setTimeStamp() // 将当前最新时间写入缓存
    // }
  },
  // 获取用户信息
  async getUserInfo(context) {
    const res = await getUserInfo() // 获取返回值
    const res2 = await getMoreInfo(res.userId)
    // console.log('res2:', res2)
    // console.log('res:', result)
    context.commit('setUserInfo', { ...res, ...res2 }) // 将个人信息设置到用户的vuex数据中
    // return res
  },
  // 用户登出
  logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', null)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
