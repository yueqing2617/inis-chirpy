import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import $ from 'jquery'

import '@/assets/css/bootstrap.min.css'

import '@/assets/js/bootstrap.min.js'

import '@/assets/css/all.min.css'

import '@/assets/css/home.css'

import './permission.js'

createApp(App).use(store).use(router).mount('#app')
