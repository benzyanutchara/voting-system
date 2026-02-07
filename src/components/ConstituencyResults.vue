<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <nav class="segmented" aria-label="Navigation">
        <button class="seg-btn active" type="button">
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
        <h2 class="section-heading">ผลคะแนนรายเขต</h2>

        <div v-if="loading" class="loading-center">
          <div class="spinner"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-else-if="error" class="error-center">
          <p>{{ error }}</p>
          <button class="btn-retry" @click="fetchResults">ลองใหม่</button>
        </div>

        <div v-else-if="resultsData">
          <div class="constituency-info">
            <h3>{{ resultsData.constituencyName || `เขตเลือกตั้ง #${route.params.id}` }}</h3>
            <p class="total-votes">รวมคะแนนทั้งหมด: <strong>{{ resultsData.totalVotes || 0 }}</strong> เสียง</p>
          </div>

          <div v-if="resultsData.candidates && resultsData.candidates.length" class="results-list">
            <div
              v-for="(c, index) in resultsData.candidates"
              :key="c.id"
              class="result-item"
            >
              <div class="result-rank">{{ index + 1 }}</div>
              <div class="result-info">
                <div class="result-name">{{ c.name || `${c.first_name} ${c.last_name}` }}</div>
                <div class="result-party">{{ c.party || c.party_name }}</div>
              </div>
              <div class="result-bar-wrap">
                <div class="result-bar" :style="{ width: (c.percentage || 0) + '%' }"></div>
              </div>
              <div class="result-votes">
                <span class="vote-count">{{ c.votes || c.vote_count || 0 }}</span>
                <span class="vote-pct">({{ (c.percentage || 0).toFixed(1) }}%)</span>
              </div>
            </div>
          </div>

          <div v-else class="empty-results">
            <p>ยังไม่มีผลคะแนนในเขตนี้</p>
          </div>

          <button class="btn-back" @click="$router.push('/')">← กลับ</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { publicAPI } from "../api/public.api";

const route = useRoute();
const resultsData = ref(null);
const loading = ref(false);
const error = ref(null);

async function fetchResults() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await publicAPI.getConstituencyResults(route.params.id);
    if (data.success) {
      resultsData.value = data.data;
    } else {
      error.value = data.error || "ไม่สามารถโหลดข้อมูลได้";
    }
  } catch (err) {
    error.value = err.response?.data?.error || "เกิดข้อผิดพลาด กรุณาลองใหม่";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchResults);
</script>

<style scoped>
.page { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
.wrap { max-width: 900px; margin: 0 auto; }
.title { text-align: center; color: #fff; font-size: 1.5rem; margin-bottom: 16px; }
.segmented { display: flex; gap: 4px; background: rgba(255,255,255,.15); border-radius: 12px; padding: 4px; margin-bottom: 16px; }
.seg-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; border: none; background: transparent; color: rgba(255,255,255,.7); border-radius: 10px; cursor: pointer; font-size: .85rem; transition: .2s; }
.seg-btn.active { background: #fff; color: #764ba2; font-weight: 600; }
.seg-ico { width: 18px; height: 18px; }
.card { background: #fff; border-radius: 16px; padding: 24px; min-height: 300px; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 20px; text-align: center; }
.loading-center, .error-center { text-align: center; padding: 60px 20px; color: #666; }
.spinner { width: 40px; height: 40px; border: 3px solid #eee; border-top-color: #764ba2; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }

.constituency-info { text-align: center; margin-bottom: 24px; }
.constituency-info h3 { font-size: 1.1rem; color: #333; }
.total-votes { color: #888; margin-top: 4px; }
.total-votes strong { color: #764ba2; }

.results-list { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #eee; border-radius: 10px; }
.result-rank { width: 32px; height: 32px; border-radius: 50%; background: #764ba2; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .9rem; flex-shrink: 0; }
.result-item:first-child .result-rank { background: #f0b429; }
.result-info { flex: 0 0 140px; }
.result-name { font-weight: 600; color: #333; font-size: .9rem; }
.result-party { color: #888; font-size: .8rem; margin-top: 2px; }
.result-bar-wrap { flex: 1; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
.result-bar { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 10px; transition: width .5s ease; }
.result-votes { flex: 0 0 100px; text-align: right; }
.vote-count { font-weight: 700; color: #333; }
.vote-pct { color: #888; font-size: .8rem; margin-left: 4px; }

.empty-results { text-align: center; padding: 40px; color: #999; }
.btn-back { margin-top: 24px; padding: 10px 24px; background: #764ba2; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-back:hover { background: #653a91; }
.btn-retry { padding: 10px 24px; background: #764ba2; color: #fff; border: none; border-radius: 8px; cursor: pointer; margin-top: 12px; }
</style>
