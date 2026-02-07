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
        <div class="register-container">
          <h2 class="register-title">ลงทะเบียนผู้ใช้ใหม่</h2>

          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label class="form-label">
                National ID (13 digits) <span class="required">*</span>
              </label>
              <input
                v-model="formData.nationalId"
                type="text"
                placeholder="1234567890123"
                class="form-input"
                maxlength="13"
                pattern="[0-9]{13}"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                First Name <span class="required">*</span>
              </label>
              <input
                v-model="formData.firstName"
                type="text"
                placeholder="Enter first name"
                class="form-input"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Last Name <span class="required">*</span>
              </label>
              <input
                v-model="formData.lastName"
                type="text"
                placeholder="Enter last name"
                class="form-input"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Address <span class="required">*</span>
              </label>
              <input
                v-model="formData.address"
                type="text"
                placeholder="Enter full address"
                class="form-input"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Election Area <span class="required">*</span>
              </label>
              <select
                v-model="formData.electionArea"
                class="form-select"
                required
              >
                <option value="" disabled>Select area</option>
                <option value="area1">กรุงเทพมหานคร เขต 1</option>
                <option value="area2">กรุงเทพมหานคร เขต 2</option>
                <option value="area3">กรุงเทพมหานคร เขต 3</option>
                <option value="area4">ชลบุรี เขต 1</option>
                <option value="area5">เชียงใหม่ เขต 1</option>
                <option value="area6">ภูเก็ต เขต 1</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">
                Password <span class="required">*</span>
              </label>
              <input
                v-model="formData.password"
                type="password"
                placeholder="Create password"
                class="form-input"
                minlength="6"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Confirm Password <span class="required">*</span>
              </label>
              <input
                v-model="formData.confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="form-input"
                required
              />
            </div>

            <button type="submit" class="btn-register">Register</button>

            <div class="login-link">
              Already have an account? 
              <a href="#" @click.prevent="goToLogin">Log In</a>
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

const formData = ref({
  nationalId: "",
  firstName: "",
  lastName: "",
  address: "",
  electionArea: "",
  password: "",
  confirmPassword: ""
});

function navigateTo(pageName) {
  emit('navigate', pageName);
}

function handleRegister() {
  // ตรวจสอบเลขบัตรประชาชน 13 หลัก
  if (!/^[0-9]{13}$/.test(formData.value.nationalId)) {
    alert("กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง");
    return;
  }

  // ตรวจสอบว่า password ตรงกัน
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
    return;
  }

  // ตรวจสอบความยาวรหัสผ่าน
  if (formData.value.password.length < 6) {
    alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    return;
  }

  console.log("Register data:", formData.value);
  
  // TODO: ส่งข้อมูลไปยัง backend จริง
  // ตอนนี้จำลองว่าลงทะเบียนสำเร็จและ login อัตโนมัติ
  
  alert("ลงทะเบียนสำเร็จ! กำลังเข้าสู่ระบบ...");
  
  // ส่งข้อมูล login ไปยัง App component
  emit('login', {
    userId: formData.value.nationalId,
    userName: `${formData.value.firstName} ${formData.value.lastName}`
  });
}

function goToLogin() {
  emit('navigate', 'VoterLogin');
}
</script>

<style src="./Register.css" scoped></style>
