import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import mock from './api/mock'
// import routes from './router'
Vue.use(ElementUI)
Vue.use(VueRouter)
mock();

import AppList from './components/app-list/app-list.vue'
const routes=[
		{
			path:"/",
			component:AppList
		}
	];
const router = new VueRouter({
  routes
});


new Vue({
 
  router,
  render: h => h(App)
}).$mount('#app');
