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

          <div v-if="myVote" class="already-voted">
            <div class="voted-badge">&#10003; คุณลงคะแนนแล้ว</div>
            <p class="voted-info">คุณเลือก: <strong>{{ myVote.candidateName }}</strong></p>
            <p class="voted-party">พรรค: {{ myVote.partyName }}</p>
            <button class="btn-cancel" @click="cancelVote">ยกเลิกคะแนน</button>
          </div>

          <div v-else>
            <p class="info-text">เลือกผู้สมัครในเขตของคุณ</p>
            <div class="candidates-ballot">
              <div
                v-for="c in candidates"
                :key="c.id"
                class="ballot-card"
                :class="{ selected: selectedCandidate === c.id }"
                @click="selectedCandidate = c.id"
              >
                <div class="ballot-number">{{ c.number }}</div>
                <div class="ballot-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="ballot-name">{{ c.title }}{{ c.first_name }} {{ c.last_name }}</div>
                <div class="ballot-party">{{ c.party_name }}</div>
              </div>
            </div>

            <button
              class="btn-vote"
              :disabled="!selectedCandidate || voting"
              @click="castVote"
            >
              {{ voting ? 'กำลังลงคะแนน...' : 'ลงคะแนน' }}
            </button>
          </div>

          <button class="btn-back" @click="$router.push('/')">&#8592; กลับหน้าหลัก</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { voteAPI } from "../api/vote.api";
import { getMockBallotCandidates } from "../data/mockData";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const candidates = ref([]);
const selectedCandidate = ref(null);
const myVote = ref(null);
const voting = ref(false);

onMounted(async () => {
  // Load candidates for this user's constituency
  const constituencyId = authStore.user?.constituencyId || authStore.user?.constituency_id || 1;
  candidates.value = getMockBallotCandidates(constituencyId);

  // Check if already voted
  try {
    const { data } = await voteAPI.getMyVote();
    if (data.success && data.data) {
      const vote = data.data;
      const c = candidates.value.find(c => c.id === vote.candidateId);
      myVote.value = {
        candidateId: vote.candidateId,
        candidateName: c ? `${c.title}${c.first_name} ${c.last_name}` : 'ผู้สมัคร',
        partyName: c ? c.party_name : ''
      };
    }
  } catch {
    // ยังไม่ได้ลง หรือ API ไม่พร้อม
  }
});

async function castVote() {
  if (!selectedCandidate.value) return;
  voting.value = true;
  try {
    await voteAPI.castVote(selectedCandidate.value);
    const c = candidates.value.find(c => c.id === selectedCandidate.value);
    myVote.value = {
      candidateId: selectedCandidate.value,
      candidateName: c ? `${c.title}${c.first_name} ${c.last_name}` : 'ผู้สมัคร',
      partyName: c ? c.party_name : ''
    };
    Swal.fire({ icon: 'success', title: 'ลงคะแนนสำเร็จ!', timer: 1500, showConfirmButton: false });
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'ไม่สามารถลงคะแนนได้', text: err.response?.data?.error || 'กรุณาลองใหม่' });
  } finally {
    voting.value = false;
  }
}

async function cancelVote() {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'ยกเลิกคะแนน?',
    text: 'คุณต้องการยกเลิกคะแนนที่ลงไว้หรือไม่',
    showCancelButton: true,
    confirmButtonText: 'ยกเลิกคะแนน',
    cancelButtonText: 'ไม่'
  });
  if (!result.isConfirmed) return;
  try {
    await voteAPI.removeVote();
    myVote.value = null;
    selectedCandidate.value = null;
    Swal.fire({ icon: 'success', title: 'ยกเลิกคะแนนแล้ว', timer: 1500, showConfirmButton: false });
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'ไม่สามารถยกเลิกได้', text: err.response?.data?.error || 'กรุณาลองใหม่' });
  }
}
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
.vote-section { padding: 20px 0; }
.section-heading { font-size: 1.2rem; font-weight: 700; color: #333; margin-bottom: 16px; text-align: center; }
.info-text { color: #666; margin-bottom: 20px; text-align: center; }

/* Ballot cards */
.candidates-ballot { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
.ballot-card { border: 2px solid #e5e7eb; border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s ease; }
.ballot-card:hover { border-color: #9ca3af; background: #f9fafb; }
.ballot-card.selected { border-color: #374151; background: #f3f4f6; box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.15); }
.ballot-number { font-size: 28px; font-weight: 900; color: #1f2937; margin-bottom: 8px; }
.ballot-avatar { width: 64px; height: 64px; margin: 0 auto 8px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.ballot-avatar svg { width: 36px; height: 36px; color: #9ca3af; }
.ballot-name { font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 4px; }
.ballot-party { font-size: 12px; color: #6b7280; }

/* Vote button */
.btn-vote { display: block; width: 100%; max-width: 400px; margin: 0 auto 16px; height: 48px; border: 0; border-radius: 8px; background: #374151; color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.btn-vote:hover:not(:disabled) { background: #1f2937; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(55, 65, 81, 0.3); }
.btn-vote:disabled { opacity: 0.5; cursor: not-allowed; }

/* Already voted */
.already-voted { text-align: center; padding: 40px 20px; }
.voted-badge { display: inline-block; padding: 8px 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 20px; color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 16px; }
.voted-info { font-size: 18px; color: #1f2937; margin-bottom: 4px; }
.voted-party { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
.btn-cancel { padding: 10px 24px; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; }
.btn-cancel:hover { background: #fee2e2; }

/* Back */
.btn-back { display: block; margin: 16px auto 0; padding: 10px 24px; background: #6b7280; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: .9rem; }
.btn-back:hover { background: #4b5563; }
</style>
