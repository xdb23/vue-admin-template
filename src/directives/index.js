// 导入vue
import Vue from 'vue'

Vue.directive('err', {
  bind(el, binding) {
    // 加载失败
    el.onerror = function() {
      console.log('图片失效')
      el.src = require('../assets/common/img.jpeg')
    }
  }
})
Vue.directive('errplus', {
  bind(el, binding) {
    // 加载失败
    el.onerror = function() {
      console.log('图片失效')
      el.src = binding.value
    }
  }
})
