// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'firebase/firestore'
import firebase from 'firebase'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueYoutube from 'vue-youtube'
Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(VueTextareaAutosize)
Vue.use(Chartkick.use(Chart))

// Firebase app
const firebaseConfig = {
  apiKey: 'AIzaSyAVmodydqJQvNsKvzeH_jutNXe-XNZtIoQ',
  authDomain: 'cpcrapi.firebaseapp.com',
  projectId: 'cpcrapi',
  storageBucket: 'cpcrapi.appspot.com',
  messagingSenderId: '334384136541',
  appId: '1:334384136541:web:e6cd489038845b7d5628b4',
  measurementId: 'G-SBV9SHFMNP',
}
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
})
export const auth = firebase.auth()
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
