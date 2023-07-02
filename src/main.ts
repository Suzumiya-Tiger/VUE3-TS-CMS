import { createApp } from 'vue'
// 公用的基础css文件
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
// pinia也必须要调用才能在vue中使用
import pinia from './store'
import registerIcons from './global/regitster-icons'
const app = createApp(App)
// 0.针对ElMessage和ElLoading等组件引入样式
/* 这种操作非常麻烦，所以只需直接在vite.config.ts中配置vite-plugin-style-import
即可实现样式库的按需引入 */
// import 'element-plus/theme-chalk/el-message.css'

/* vite-plugin-style-import的使用：
1.pnpm install sass vite-plugin-style-import consola -D
2.在vite.config.ts中配置相关内容
*/
// 1.全局注册elementPlus
/* import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' */
// 2.按需引入elementPlus:用到哪个组件引入哪个组件
// 链式调用(被调用的函数全部生效)
app.use(router)
app.use(pinia)
app.use(registerIcons)
app.mount('#app')
