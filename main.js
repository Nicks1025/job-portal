import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'

import Routes from "./router/router"
Vue.use(VueResource)
Vue.use(VueSession)
Vue.use(VueRouter)


const router = new VueRouter({
  routes : Routes,
  mode : "history"
})

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/js/all.js'

new Vue({
  el: '#app',
  render: h => h(App),
  router : router
})
