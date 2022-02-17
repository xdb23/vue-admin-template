const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 在根级的getters上 开发子模块的属性给别人看 给别人用
  userInfo: (state) => state.user.userInfo // 建立用户名的映射
  // userId: (state) => state.user.userInfo.userId // 建立用户ID映射
}
export default getters
