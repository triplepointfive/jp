// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { Word, Lesson, Builder, Session } from './db'

Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.config.productionTip = false

const words = [
  new Word('南', ['south'], ['みなみ']),
  new Word('北', ['north'], ['きた']),
  new Word('西', ['west'], ['にし']),
  new Word('東', ['east'], ['ひがし'])
]

const lessons = {
  compass: new Lesson([ Builder.pickOneExercises(words) ])
}

const store = new Vuex.Store({
  state: {
    session: new Session(lessons.compass),
    db: {
      lessons
    }
  },
  mutations: {
    sessionDone (state) { state.session.success() },
    sessionNext (state) { state.session.next() }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
