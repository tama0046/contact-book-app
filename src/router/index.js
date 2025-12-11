import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import AddView from '../views/AddView.vue'
import EditView from '../views/EditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact/:id',
    name: 'detail',
    component: DetailView,
    props: true
  },
  {
    path: '/add',
    name: 'add',
    component: AddView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/contact-book-app/'),
  routes
})

export default router
