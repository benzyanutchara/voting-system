<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">EC Staff Dashboard</h1>
      <section class="card">
        <div class="dashboard-section">
          <h2 class="section-heading">แดชบอร์ดเจ้าหน้าที่ กกต.</h2>
          <p class="coming-soon">กำลังรอ Backend Phase 11</p>
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
.page { min-height: 100vh; background: #ffffff; }
.wrap { max-width: 980px; margin: 0 auto; padding: 28px 22px 48px; }
.title { margin: 0 0 18px; font-size: 34px; font-weight: 800; letter-spacing: -0.3px; color: #2b2f36; }
.card { border: 1px solid #cfd6de; border-radius: 18px; background: #fff; padding: 24px; min-height: 300px; }
.dashboard-section { text-align: center; padding: 60px 20px; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 16px; }
.coming-soon { color: #6b7280; font-weight: 600; margin-bottom: 24px; }
.btn-logout { padding: 10px 24px; background: #e53e3e; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-logout:hover { background: #c53030; }
</style>
