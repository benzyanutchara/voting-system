<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Admin Dashboard</h1>
      <section class="card">
        <div class="dashboard-section">
          <h2 class="section-heading">แดชบอร์ดผู้ดูแลระบบ</h2>
          <p class="coming-soon">กำลังรอ Backend Phase 10</p>
          <button class="btn-logout" @click="handleLogout">ออกจากระบบ</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth.store";

const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
}
</script>

<style scoped>
.page { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
.wrap { max-width: 900px; margin: 0 auto; }
.title { text-align: center; color: #fff; font-size: 1.5rem; margin-bottom: 16px; }
.card { background: #fff; border-radius: 16px; padding: 24px; min-height: 300px; }
.dashboard-section { text-align: center; padding: 60px 20px; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 16px; }
.coming-soon { color: #764ba2; font-weight: 600; margin-bottom: 24px; }
.btn-logout { padding: 10px 24px; background: #e53e3e; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-logout:hover { background: #c53030; }
</style>
