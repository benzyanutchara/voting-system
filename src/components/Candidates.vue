<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <nav class="segmented" aria-label="Voting navigation">
        <button class="seg-btn" type="button" :aria-selected="false" @click="go('VotingSystem')">
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7.5h6M4 12h10M4 16.5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 8l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ผลการเลือกตั้ง
        </button>

        <button class="seg-btn active" type="button" :aria-selected="true">
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

        <button class="seg-btn" type="button" :aria-selected="false" @click="go('VoterLogin')">
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
        <div class="scroll-area">
          <div class="grid">
            <article
              v-for="p in parties"
              :key="p.id"
              class="party-card"
              role="button"
              tabindex="0"
              :aria-label="`เลือก ${p.name}`"
              @click="selectParty(p)"
              @keydown.enter.prevent="selectParty(p)"
              @keydown.space.prevent="selectParty(p)"
            >
              <div class="party-top">
                <div class="party-label">หมายเลขพรรค</div>
                <div class="party-no">{{ p.no }}</div>
              </div>

              <div class="party-mid">
                <div class="plus-ring" aria-hidden="true">
                  <div class="plus">+</div>
                </div>
              </div>

              <div class="party-name">{{ p.name }}</div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(['navigate']);

const parties = ref([
  { id: 1, no: 11, name: "พรรคสีส้ม" },
  { id: 2, no: 11, name: "พรรคสีส้ม" },
  { id: 3, no: 11, name: "พรรคสีส้ม" },
  { id: 4, no: 11, name: "พรรคสีส้ม" },
  { id: 5, no: 11, name: "พรรคสีส้ม" },
  { id: 6, no: 11, name: "พรรคสีส้ม" },
  { id: 7, no: 11, name: "พรรคสีส้ม" },
]);

function go(pageName) {
  emit('navigate', pageName);
}

function selectParty(p) {
  // TODO: ผูกกับหน้าถัดไป/โมดัลได้
  console.log("Selected party:", p);
}
</script>

<style src="./Candidates.css" scoped></style>
