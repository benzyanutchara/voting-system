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
        <button class="seg-btn active" type="button">
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
        <button class="seg-btn" type="button" @click="$router.push('/login')">
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
        <div v-if="loading" class="loading-center">
          <div class="spinner"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-else-if="error" class="error-center">
          <p>{{ error }}</p>
          <button class="btn-submit" @click="fetchPartyDetails">ลองใหม่</button>
        </div>

        <div v-else-if="party" class="party-detail">
          <div class="party-detail-header">
            <img
              v-if="party.logoUrl || party.logo_url"
              :src="party.logoUrl || party.logo_url"
              :alt="party.name"
              class="party-detail-logo"
            />
            <div class="party-detail-info">
              <h2 class="party-detail-name">{{ party.name }}</h2>
              <p v-if="party.policy" class="party-detail-policy">{{ party.policy }}</p>
            </div>
          </div>

          <div v-if="party.candidates && party.candidates.length" class="candidates-section">
            <h3 class="section-title">สมาชิกผู้สมัคร ({{ party.candidates.length }} คน)</h3>
            <div class="candidates-grid">
              <div v-for="c in party.candidates" :key="c.id" class="candidate-card">
                <div class="candidate-avatar">
                  <img v-if="c.image_url" :src="c.image_url" :alt="c.first_name" />
                  <svg v-else viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="candidate-info">
                  <div class="candidate-name">{{ c.title || '' }} {{ c.first_name }} {{ c.last_name }}</div>
                  <div class="candidate-details">
                    <span class="candidate-area">{{ c.province }} เขต {{ c.district_number }}</span>
                    <span class="candidate-no">No. <strong>{{ c.number }}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-candidates">
            <p>ยังไม่มีผู้สมัครในพรรคนี้</p>
          </div>

          <button class="btn-back" @click="$router.push('/parties')">← กลับ</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { publicAPI } from "../api/public.api";
import { getMockPartyDetails } from "../data/mockData";

const route = useRoute();
const party = ref(null);
const loading = ref(false);
const error = ref(null);

async function fetchPartyDetails() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await publicAPI.getPartyDetails(route.params.id);
    if (data.success) {
      party.value = data.data;
    } else {
      console.warn('API returned error, using mock data');
      party.value = getMockPartyDetails(route.params.id);
    }
  } catch (err) {
    console.warn('Using mock party details:', err.message);
    party.value = getMockPartyDetails(route.params.id);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPartyDetails);
</script>

<style scoped>
.page { min-height: 100vh; background: #ffffff; }
.wrap { max-width: 980px; margin: 0 auto; padding: 28px 22px 48px; }
.title { margin: 0 0 18px; font-size: 34px; font-weight: 800; letter-spacing: -0.3px; color: #2b2f36; }
.segmented { background: #e9ecef; border-radius: 28px; padding: 10px; display: flex; gap: 10px; align-items: center; justify-content: space-between; margin: 10px 0 18px; }
.seg-btn { flex: 1; height: 48px; border: 0; border-radius: 22px; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 16px; font-weight: 700; color: #2f3742; transition: background 0.2s ease; }
.seg-btn:hover { background: rgba(255, 255, 255, 0.5); }
.seg-btn.active { background: #fff; box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06); }
.seg-ico { width: 20px; height: 20px; display: inline-grid; place-items: center; opacity: 0.9; }
.seg-ico svg { width: 20px; height: 20px; }
.card { border: 1px solid #cfd6de; border-radius: 18px; background: #fff; padding: 24px; min-height: 300px; }
.loading-center, .error-center { text-align: center; padding: 60px 20px; color: #666; }
.spinner { width: 40px; height: 40px; border: 3px solid #eee; border-top-color: #374151; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }

.party-detail-header { display: flex; gap: 20px; align-items: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
.party-detail-logo { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
.party-detail-name { font-size: 1.4rem; font-weight: 700; color: #333; }
.party-detail-policy { color: #666; margin-top: 8px; line-height: 1.5; }

.section-title { font-size: 1.1rem; font-weight: 600; color: #333; margin-bottom: 16px; }
.candidates-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.candidate-card { display: flex; gap: 12px; padding: 12px; border: 1px solid #eee; border-radius: 10px; align-items: center; }
.candidate-avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; background: #f0f0f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.candidate-avatar img { width: 100%; height: 100%; object-fit: cover; }
.candidate-avatar svg { width: 28px; height: 28px; color: #aaa; }
.candidate-name { font-weight: 600; color: #333; font-size: .9rem; }
.candidate-details { display: flex; gap: 8px; margin-top: 4px; font-size: .8rem; color: #888; }
.candidate-no strong { color: #374151; }
.empty-candidates { text-align: center; padding: 40px; color: #999; }

.btn-back { margin-top: 24px; padding: 10px 24px; background: #6b7280; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-back:hover { background: #4b5563; }
.btn-submit { padding: 10px 24px; background: #6b7280; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 12px; }
</style>
