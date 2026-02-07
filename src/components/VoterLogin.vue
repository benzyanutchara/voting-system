<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <nav class="segmented" aria-label="Voting navigation">
        <button class="seg-btn" type="button" @click="navigateTo('VotingSystem')">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7.5h6M4 12h10M4 16.5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 8l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ผลการเลือกตั้ง
        </button>

        <button class="seg-btn" type="button" @click="navigateTo('Candidates')">
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

        <button class="seg-btn active" type="button" :aria-selected="true">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ลงคะแนน
        </button>
      </nav>

      <section class="card">
        <div class="login-container">
          <!-- Login Header -->
          <div class="login-header">
            <span class="lock-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            <h2 class="login-title">Voter Login</h2>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin">
            <p class="info-text">กรอกรหัสประจำตัวประชาชน 13 หลัก</p>
            
            <div class="input-group">
              <input
                v-model="nationalId"
                type="text"
                placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                class="input-field"
                maxlength="13"
                pattern="[0-9]{13}"
                required
              />
            </div>

            <button type="submit" class="btn-submit">เข้าสู่ระบบ</button>

            <div class="register-link">
              <a href="#" @click.prevent="goToRegister">ลงทะเบียนผู้ใช้ใหม่</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(['navigate', 'login']);
const nationalId = ref("");

function navigateTo(pageName) {
  emit('navigate', pageName);
}

function handleLogin() {
  // ตรวจสอบว่ากรอกเลขบัตรประชาชน 13 หลัก
  if (nationalId.value && nationalId.value.length === 13 && /^[0-9]{13}$/.test(nationalId.value)) {
    console.log("Login with National ID:", nationalId.value);
    
    // TODO: เพิ่มการตรวจสอบกับ backend จริง
    // ตอนนี้จำลองว่า login สำเร็จ
    
    // ส่งข้อมูล login ไปยัง App component
    emit('login', {
      userId: nationalId.value,
      userName: 'ผู้ใช้งาน'
    });
    
    alert("เข้าสู่ระบบสำเร็จ!");
  } else {
    alert("กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง");
  }
}

function goToRegister() {
  navigateTo('Register');
}
</script>

<style src="./VoterLogin.css" scoped></style>
