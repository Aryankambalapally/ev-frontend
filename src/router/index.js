import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MapView from '../views/MapView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
  path: '/add',
  name: 'AddStation',
  component: () => import('../views/AddStationView.vue')
},
{
  path: '/edit/:id',
  name: 'EditStation',
  component: () => import('../views/EditStationView.vue')
},
{
  path: '/map',
  name: 'Map',
  component: () => import('../views/MapView.vue')
},{ path: '/', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/map', name: 'MapView', component: MapView },
  { path: '/', component: LoginView },
  { path: '/about', component: AboutView },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
