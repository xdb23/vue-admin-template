import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
// import { has } from 'core-js/core/dict'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 尝试获取token
  const hasToken = getToken()
  if (hasToken) {
    // 判断用户信息是否存在
    console.log('1-userInfo:', store.getters.userInfo)
    if (store.getters.userInfo) {
      // 存在token
      next()
    } else {
      // token不一定正确,发请求在获取
      try {
        await store.dispatch('user/getUserInfo')
        console.log('2-userInfo:', store.getters.userInfo)
      } catch (error) {
        removeToken()
        Message.warning('用户信息有误，请重新登录！')
        next(`/login?redirect=${to.path}`)
      }
    }
    // 有token
    if (to.path === '/login') {
      Message.warning('你已登录！')
      // 打回首页
      next('/')
      //   NProgress.done()
    } else {
      // 不是登录页
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 在白名单，通过
      next()
    } else {
      Message.warning('请先登录！')
      // 打回登陆页
      next(`/login?redeirect=${to.path}`)
    }
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
