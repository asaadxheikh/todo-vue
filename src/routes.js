import Tasks from './views/Tasks.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Login, meta: { title: 'Login' } },
  {
    path: '/tasks',
    meta: { title: 'Tasks' },
    component: Tasks,
  },
  { path: '/:path(.*)', component: NotFound },
]
