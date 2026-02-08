<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>
      <section class="card">
        <div class="dashboard-header">
          <h2 class="section-heading">Admin Dashboard</h2>
          <button class="btn-logout" @click="handleLogout">ออกจากระบบ</button>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-num">{{ stats.totalVoters }}</div>
            <div class="stat-lbl">ผู้ลงทะเบียนทั้งหมด</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">{{ stats.totalConstituencies }}</div>
            <div class="stat-lbl">เขตเลือกตั้ง</div>
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

        <div class="admin-section">
          <h3 class="sub-heading">จัดการเขตเลือกตั้ง</h3>
          <div class="table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>จังหวัด</th>
                  <th>ชื่อเขต</th>
                  <th>หมายเลขเขต</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in constituencies" :key="c.id">
                  <td>{{ c.province }}</td>
                  <td>{{ c.name }}</td>
                  <td class="center">{{ c.district_number }}</td>
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
const stats = ref({
  totalVoters: 1250,
  totalConstituencies: mockConstituencies.length,
  totalParties: mockParties.length,
  totalCandidates: mockCandidates.length
});

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

.admin-section { margin-top: 24px; }
.sub-heading { font-size: 1rem; font-weight: 700; color: #333; margin-bottom: 12px; }
.table-wrap { overflow-x: auto; }
.admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.admin-table th { text-align: left; padding: 10px 8px; color: #6b7280; font-weight: 700; font-size: 12px; border-bottom: 2px solid #e5e7eb; }
.admin-table td { padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #374151; }
.center { text-align: center; }
.status-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.status-badge.open { background: #ecfdf5; color: #059669; }
.status-badge.closed { background: #fef2f2; color: #dc2626; }

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-header { flex-direction: column; gap: 12px; align-items: flex-start; }
}
</style>
