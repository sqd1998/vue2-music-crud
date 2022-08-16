import Vue from 'vue'
import App from './App.vue'
//导入路由模块
import router from './router/index.js'
//导入axios
import axios from 'axios'
//导入饿了么-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading } from 'element-ui'
import 'reset-css'
// import aplayer from "vue-aplayer"
// import dayjs from 'dayjs'
// Vue.prototype.dayjs = dayjs;



Vue.config.productionTip = false
Vue.use(ElementUI)


Vue.filter('dateFormat', (dtStr) => {
        const dt = new Date(dtStr)

        const y = dt.getFullYear()
        const m = padZero(dt.getMonth() + 1)
        const d = padZero(dt.getDate())

        const hh = padZero(dt.getHours())
        const mm = padZero(dt.getMinutes())
        const ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    //补0函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$http = axios
    //声明请求拦截器
let loadingInstance = null
axios.interceptors.request.use(config => {
        //开启loading效果
        loadingInstance = Loading.service({ fullscreen: true })
        return config
    })
    //声明响应拦截器
axios.interceptors.response.use(response => {
    loadingInstance.close()
        //关闭loading效果
    return response
})



new Vue({
    render: h => h(App),
    router
}).$mount('#app')