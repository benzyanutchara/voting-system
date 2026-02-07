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
              <path d="M20 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ลงคะแนน
        </button>
      </nav>

      <section class="card">
        <div class="vote-section">
          <h2 class="section-heading">ลงคะแนนเสียง</h2>
          <p class="coming-soon">ระบบลงคะแนนกำลังรอ Backend Phase 9</p>
          <p class="info-text">เมื่อ Backend พร้อม จะสามารถ:</p>
          <ul class="feature-list">
            <li>เลือกผู้สมัครในเขตของคุณ</li>
            <li>ดูคะแนนที่คุณลงไปแล้ว</li>
            <li>เปลี่ยนหรือยกเลิกคะแนน (ก่อนปิดเขต)</li>
          </ul>
          <button class="btn-back" @click="$router.push('/')">← กลับหน้าหลัก</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Vote ballot - Phase 9 placeholder
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
.vote-section { text-align: center; padding: 40px 20px; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 16px; }
.coming-soon { color: #764ba2; font-weight: 600; margin-bottom: 16px; }
.info-text { color: #666; margin-bottom: 12px; }
.feature-list { list-style: none; padding: 0; margin-bottom: 24px; }
.feature-list li { padding: 8px 0; color: #555; }
.feature-list li::before { content: "✓ "; color: #764ba2; font-weight: 700; }
.btn-back { padding: 10px 24px; background: #764ba2; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-back:hover { background: #653a91; }
</style>
