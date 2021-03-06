import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Notes from '../views/Notes'

Vue.use(VueRouter)

const routes = [
  { path: '', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/notes', name: 'Notes', component: Notes }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router