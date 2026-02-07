import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // === Public Routes ===
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/VotingSystem.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'VoterLogin',
    component: () => import('../components/VoterLogin.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/parties',
    name: 'Parties',
    component: () => import('../components/Candidates.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/parties/:id',
    name: 'PartyDetail',
    component: () => import('../components/PartyDetail.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/constituencies/:id/results',
    name: 'ConstituencyResults',
    component: () => import('../components/ConstituencyResults.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/party-overview',
    name: 'PartyOverview',
    component: () => import('../components/PartyOverview.vue'),
    meta: { requiresAuth: false }
  },

  // === Voter Routes ===
  {
    path: '/vote',
    name: 'VoteBallot',
    component: () => import('../components/VoteBallot.vue'),
    meta: { requiresAuth: true, role: 'VOTER' }
  },

  // === Admin Routes ===
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../components/AdminLogin.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../components/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },

  // === EC Staff Routes ===
  {
    path: '/ec/dashboard',
    name: 'ECDashboard',
    component: () => import('../components/ECDashboard.vue'),
    meta: { requiresAuth: true, role: 'EC' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'VoterLogin' });
  }

  if (to.meta.guestOnly && token) {
    return next({ name: 'Home' });
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
