<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <nav class="segmented" aria-label="Voting navigation">
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
                Title <span class="required">*</span>
              </label>
              <select
                v-model="formData.title"
                class="form-select"
                required
              >
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
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
                v-model="formData.constituencyId"
                class="form-select"
                required
              >
                <option value="" disabled>{{ loadingConstituencies ? 'กำลังโหลด...' : 'เลือกเขตเลือกตั้ง' }}</option>
                <option
                  v-for="c in constituencies"
                  :key="c.id"
                  :value="c.id"
                >
                  {{ c.province || c.name }} เขต {{ c.district_number || c.districtNumber || '' }}
                </option>
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

            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

            <button type="submit" class="btn-register" :disabled="loading">
              {{ loading ? 'กำลังลงทะเบียน...' : 'Register' }}
            </button>

            <div class="login-link">
              Already have an account? 
              <a href="#" @click.prevent="$router.push('/login')">Log In</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { publicAPI } from "../api/public.api";
import Swal from "sweetalert2";

const authStore = useAuthStore();

const constituencies = ref([]);
const loadingConstituencies = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const formData = ref({
  nationalId: "",
  title: "",
  firstName: "",
  lastName: "",
  address: "",
  constituencyId: "",
  password: "",
  confirmPassword: ""
});

// โหลดรายชื่อเขตเลือกตั้งจาก API
onMounted(async () => {
  loadingConstituencies.value = true;
  try {
    const { data } = await publicAPI.getConstituencies();
    if (data.success) {
      constituencies.value = data.data;
    }
  } catch (err) {
    console.error("Failed to load constituencies:", err);
  } finally {
    loadingConstituencies.value = false;
  }
});

async function handleRegister() {
  // ตรวจสอบเลขบัตรประชาชน 13 หลัก
  if (!/^[0-9]{13}$/.test(formData.value.nationalId)) {
    errorMsg.value = "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง";
    return;
  }

  if (!formData.value.title) {
    errorMsg.value = "กรุณาเลือกคำนำหน้า";
    return;
  }

  // ตรวจสอบว่า password ตรงกัน
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMsg.value = "รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง";
    return;
  }

  // ตรวจสอบความยาวรหัสผ่าน
  if (formData.value.password.length < 6) {
    errorMsg.value = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    return;
  }

  if (!formData.value.constituencyId) {
    errorMsg.value = "กรุณาเลือกเขตเลือกตั้ง";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    await authStore.register({
      nationalId: formData.value.nationalId,
      password: formData.value.password,
      title: formData.value.title,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      address: formData.value.address,
      constituencyId: Number(formData.value.constituencyId)
    });

    Swal.fire({
      icon: "success",
      title: "ลงทะเบียนสำเร็จ!",
      text: "กำลังเข้าสู่ระบบ...",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    errorMsg.value = err.response?.data?.error || "ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่";
  } finally {
    loading.value = false;
  }
}
</script>

<style src="./Register.css" scoped></style>
