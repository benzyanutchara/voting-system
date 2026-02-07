import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authAPI } from '../api/auth.api';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const isEC = computed(() => user.value?.role === 'EC');
  const isVoter = computed(() => user.value?.role === 'VOTER');
  const userRole = computed(() => user.value?.role || null);

  // User Login
  async function login(nationalId, password) {
    const { data } = await authAPI.login(nationalId, password);
    if (data.success) {
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    }
    return data;
  }

  // User Register
  async function register(formData) {
    const { data } = await authAPI.register(formData);
    if (data.success) {
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    }
    return data;
  }

  // Admin Login
  async function adminLogin(username, password) {
    const { data } = await authAPI.adminLogin(username, password);
    if (data.success) {
      token.value = data.token;
      user.value = { ...data.admin, role: 'ADMIN' };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user.value));
      router.push('/admin/dashboard');
    }
    return data;
  }

  // Admin Register
  async function adminRegister(username, password) {
    const { data } = await authAPI.adminRegister(username, password);
    if (data.success) {
      token.value = data.token;
      user.value = { ...data.admin, role: 'ADMIN' };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user.value));
      router.push('/admin/dashboard');
    }
    return data;
  }

  // Logout
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    router.push('/login');
  }

  return {
    token, user, isLoggedIn, isAdmin, isEC, isVoter, userRole,
    login, register, adminLogin, adminRegister, logout
  };
});
