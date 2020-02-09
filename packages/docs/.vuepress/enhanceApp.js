import Pagination from 'ant-design-vue/lib/pagination'; // 加载 JS
import 'ant-design-vue/lib/pagination/style/css'; // 加载 CSS
export default ({
                    Vue, // 当前 VuePress 应用所使用的 Vue 版本
                    options, // 根 Vue 实例的选项
                    router, // 应用程序的路由实例
                    siteData // 网站元数据
                }) => {
    // ...使用应用程序级别的增强功能
    Vue.use(Pagination);
}