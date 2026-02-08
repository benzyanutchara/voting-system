<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>
      <section class="card">
        <div class="dashboard-header">
          <h2 class="section-heading">EC Staff Dashboard</h2>
          <button class="btn-logout" @click="handleLogout">ออกจากระบบ</button>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-num">{{ stats.openConstituencies }}</div>
            <div class="stat-lbl">เขตเปิดรับลงคะแนน</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">{{ stats.closedConstituencies }}</div>
            <div class="stat-lbl">เขตปิดแล้ว</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">{{ stats.totalParties }}</div>
            <div class="stat-lbl">พรรคการเมือง</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">{{ stats.totalCandidates }}</div>
            <div class="stat-lbl">ผู้สมัครทั้งหมด</div>
          </div>
        </div>

        <div class="ec-section">
          <h3 class="sub-heading">จัดการพรรคการเมือง</h3>
          <div class="party-list">
            <div v-for="p in parties" :key="p.id" class="party-row">
              <div class="party-row-no">{{ p.id }}</div>
              <div class="party-row-name">{{ p.name }}</div>
              <div class="party-row-count">{{ getCandidateCount(p.id) }} ผู้สมัคร</div>
            </div>
          </div>
        </div>

        <div class="ec-section">
          <h3 class="sub-heading">จัดการเขตเลือกตั้ง</h3>
          <div class="table-wrap">
            <table class="ec-table">
              <thead>
                <tr>
                  <th>จังหวัด</th>
                  <th>เขต</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in constituencies" :key="c.id">
                  <td>{{ c.province }}</td>
                  <td>{{ c.name }} (เขต {{ c.district_number }})</td>
                  <td>
                    <span class="status-badge" :class="c.status">{{ c.status === 'open' ? 'เปิด' : 'ปิด' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { mockConstituencies, mockParties, mockCandidates } from "../data/mockData";

const authStore = useAuthStore();
const constituencies = ref(mockConstituencies);
const parties = ref(mockParties);

const stats = ref({
  openConstituencies: mockConstituencies.filter(c => c.status === 'open').length,
  closedConstituencies: mockConstituencies.filter(c => c.status === 'closed').length,
  totalParties: mockParties.length,
  totalCandidates: mockCandidates.length
});

function getCandidateCount(partyId) {
  return mockCandidates.filter(c => c.party_id === partyId).length;
}

function handleLogout() {
  authStore.logout();
}
</script>

<style scoped>
.page { min-height: 100vh; background: #ffffff; }
.wrap { max-width: 980px; margin: 0 auto; padding: 28px 22px 48px; }
.title { margin: 0 0 18px; font-size: 34px; font-weight: 800; letter-spacing: -0.3px; color: #2b2f36; }
.card { border: 1px solid #cfd6de; border-radius: 18px; background: #fff; padding: 24px; min-height: 300px; }
.dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin: 0; }
.btn-logout { padding: 8px 20px; background: #e53e3e; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .85rem; font-weight: 600; }
.btn-logout:hover { background: #c53030; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
.stat-box { text-align: center; padding: 20px 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
.stat-num { font-size: 2rem; font-weight: 800; color: #1f2937; }
.stat-lbl { font-size: .8rem; color: #6b7280; margin-top: 4px; }

.ec-section { margin-top: 28px; }
.sub-heading { font-size: 1rem; font-weight: 700; color: #333; margin-bottom: 12px; }

.party-list { display: flex; flex-direction: column; gap: 8px; }
.party-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #f3f4f6; border-radius: 10px; }
.party-row:hover { background: #f9fafb; }
.party-row-no { width: 32px; height: 32px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #374151; }
.party-row-name { flex: 1; font-weight: 600; color: #1f2937; }
.party-row-count { font-size: 13px; color: #6b7280; }

.table-wrap { overflow-x: auto; }
.ec-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ec-table th { text-align: left; padding: 10px 8px; color: #6b7280; font-weight: 700; font-size: 12px; border-bottom: 2px solid #e5e7eb; }
.ec-table td { padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #374151; }
.status-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.status-badge.open { background: #ecfdf5; color: #059669; }
.status-badge.closed { background: #fef2f2; color: #dc2626; }

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-header { flex-direction: column; gap: 12px; align-items: flex-start; }
}
</style>
