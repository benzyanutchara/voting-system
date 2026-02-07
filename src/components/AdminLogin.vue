<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <nav class="segmented" aria-label="Navigation">
        <button class="seg-btn" type="button" @click="$router.push('/')">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7.5h6M4 12h10M4 16.5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 8l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ผลการเลือกตั้ง
        </button>
        <button class="seg-btn" type="button" @click="$router.push('/parties')">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" stroke="currentColor" stroke-width="2"/>
              <path d="M8 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" stroke="currentColor" stroke-width="2"/>
              <path d="M2.5 20c.7-3 2.8-5 5.5-5s4.8 2 5.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M13 20c.4-2.1 1.7-3.7 3.5-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          พรรคการเมือง
        </button>
        <button class="seg-btn active" type="button">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="2"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </span>
          Admin
        </button>
      </nav>

      <section class="card">
        <div class="login-container">
          <div class="login-header">
            <span class="lock-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            <h2 class="login-title">Admin Login</h2>
          </div>

          <form @submit.prevent="handleLogin">
            <p class="info-text">กรอกข้อมูลผู้ดูแลระบบ</p>

            <div class="input-group">
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="input-field"
                required
              />
            </div>

            <div class="input-group">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="input-field"
                required
              />
            </div>

            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

            <button type="submit" class="btn-submit" :disabled="loading">
              {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
            </button>

            <div class="register-link">
              <a href="#" @click.prevent="$router.push('/login')">เข้าสู่ระบบสำหรับผู้ลงคะแนน</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";
import Swal from "sweetalert2";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMsg.value = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    await authStore.adminLogin(username.value, password.value);
    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      text: "ยินดีต้อนรับผู้ดูแลระบบ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    errorMsg.value = err.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ";
  } finally {
    loading.value = false;
  }
}
</script>

<style src="./VoterLogin.css" scoped></style>
