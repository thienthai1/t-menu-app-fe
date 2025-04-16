import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import OrderMain from '@/components/Order/OrderMain.vue';
import Kitchen from '@/components/Kitchen/Kitchen.vue';
import AdminMain from '@/components/Admin/AdminMain.vue';
import AdminAddFood from '@/components/Admin/AdminAddFood.vue';
import AdminEditFood from '@/components/Admin/AdminEditFood.vue';
import Table from '@/views/Table.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/order', component: OrderMain },
  { path: '/kitchen', component: Kitchen },
  { path: '/admin', component: AdminMain },
  { path: '/admin/foods/add', component: AdminAddFood },
  { path: '/admin/foods/edit/:id', component: AdminEditFood },
  { path: '/table', component: Table }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');

  if (to.path === '/admin' && !accessToken) {
    // Redirect to /login if not logged in
    next('/login');
  } else {
    next();
  }
});

export default router;