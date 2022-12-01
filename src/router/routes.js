
const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankPage.vue'),
    children: [
      { path: '', component: () => import('pages/CreateUserPage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
