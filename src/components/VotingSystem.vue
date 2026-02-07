<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Voting System 953713 - 2568</h1>

      <!-- Segmented Tabs -->
      <nav class="segmented" aria-label="Voting navigation">
        <button
          class="seg-btn"
          :class="{ active: activeTab === 'results' }"
          type="button"
          data-tab="results"
          :aria-selected="activeTab === 'results'"
          @click="changeTab('results')"
        >
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7.5h6M4 12h10M4 16.5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 8l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ผลการเลือกตั้ง
        </button>

        <button
          class="seg-btn"
          :class="{ active: activeTab === 'parties' }"
          type="button"
          data-tab="parties"
          :aria-selected="activeTab === 'parties'"
          @click="changeTab('parties')"
        >
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

        <button
          class="seg-btn"
          :class="{ active: activeTab === 'vote' }"
          type="button"
          data-tab="vote"
          :aria-selected="activeTab === 'vote'"
          @click="changeTab('vote')"
        >
          <span class="seg-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          ลงคะแนน
        </button>
      </nav>

      <!-- Main Card -->
      <section class="card">
        <!-- ผลการเลือกตั้ง -->
        <div v-if="activeTab === 'results'">
          <!-- Dropdown centered -->
          <div class="card-top">
            <div class="select-wrap">
              <select v-model="selectedProvince" class="select">
                <option value="">เลือกจังหวัดที่เลือกตั้ง</option>
                <option v-for="p in provinces" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>
              <span class="caret" aria-hidden="true">▼</span>
            </div>
          </div>

          <!-- Table -->
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th class="th-click" @click="toggleSort('province')">
                    <span class="th-label">
                      จังหวัด
                      <span class="sort-ico" :class="{ active: sortBy === 'province' }" aria-hidden="true">
                        {{ sortBy === 'province' ? (sortDir === 'asc' ? '↓' : '↑') : '↓' }}
                      </span>
                    </span>
                  </th>

                  <th class="th-click" @click="toggleSort('area')">
                    <span class="th-label">
                      เขต
                      <span class="sort-ico" :class="{ active: sortBy === 'area' }" aria-hidden="true">
                        {{ sortBy === 'area' ? (sortDir === 'asc' ? '↓' : '↑') : '↓' }}
                      </span>
                    </span>
                  </th>

                  <th class="th-click right" @click="toggleSort('no')">
                    <span class="th-label th-right">
                      หมายเลขเขต
                      <span class="sort-ico" :class="{ active: sortBy === 'no' }" aria-hidden="true">
                        {{ sortBy === 'no' ? (sortDir === 'asc' ? '↓' : '↑') : '↓' }}
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="r in visibleRows"
                  :key="`${r.province}-${r.no}`"
                  class="clickable-row"
                  @click="viewConstituencyResults(r)"
                >
                  <td class="col-province">{{ r.province }}</td>
                  <td class="col-area">{{ r.area }}</td>
                  <td class="right col-no">{{ r.no }}</td>
                </tr>

                <tr v-if="visibleRows.length === 0">
                  <td class="empty" colspan="3">ยังไม่มีข้อมูล</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- พรรคการเมือง -->
        <div v-if="activeTab === 'parties'" class="scroll-area">
          <div class="grid">
            <article
              v-for="party in parties"
              :key="party.id"
              class="party-card"
              role="button"
              tabindex="0"
              :aria-label="`เลือก ${party.name}`"
              @click="selectParty(party)"
              @keydown.enter.prevent="selectParty(party)"
              @keydown.space.prevent="selectParty(party)"
            >
              <div class="party-top">
                <div class="party-label">หมายเลขพรรค</div>
                <div class="party-no">{{ party.no }}</div>
              </div>

              <div class="party-mid">
                <div class="plus-ring" aria-hidden="true">
                  <div class="plus">+</div>
                </div>
              </div>

              <div class="party-name">{{ party.name }}</div>
            </article>
          </div>
        </div>

        <!-- ลงคะแนน -->
        <div v-if="activeTab === 'vote'" class="vote-section">
          <p style="text-align: center; padding: 40px; color: #666;">
            กำลังนำไปหน้าลงคะแนน...
          </p>
        </div>
      </section>
    </div>

    <!-- Party Detail Modal -->
    <div v-if="selectedParty" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="ปิด">×</button>
        
        <div class="modal-header">
          <div class="modal-party-label">หมายเลขพรรค</div>
          <div class="modal-party-no">{{ selectedParty.no }}</div>
        </div>

        <div class="modal-trophy">
          <div class="trophy-icon">🏆</div>
          <div class="modal-party-name">{{ selectedParty.name }}</div>
        </div>

        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-number">200</div>
            <div class="stat-label">ที่นั่งในสภา</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">180</div>
            <div class="stat-label">ส.ส.เขต</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">179</div>
            <div class="stat-label">ส.ส.บัญชีรายชื่อ</div>
          </div>
        </div>

        <div class="policy-section">
          <div class="policy-header">นโยบายพรรค</div>
          <div class="policy-content">
            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
            <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
            <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
          </div>
        </div>

        <div class="candidates-section">
          <div class="candidates-grid">
            <div v-for="i in 5" :key="i" class="candidate-card">
              <div class="candidate-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div class="candidate-info">
                <div class="candidate-name">Name Surname</div>
                <div class="candidate-details">
                  <span class="candidate-area">Area</span>
                  <span class="candidate-no">No. <strong>11</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { publicAPI } from "../api/public.api";
import { useAuthStore } from "../stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

/** Tabs */
const activeTab = ref("results"); // results | parties | vote

/** Loading states */
const loadingConstituencies = ref(false);
const loadingParties = ref(false);

/** ฟังก์ชันสำหรับเปลี่ยน tab */
const changeTab = (tabName) => {
  if (tabName === 'vote') {
    if (!authStore.isLoggedIn) {
      router.push('/login');
      return;
    }
    router.push('/vote');
    return;
  }
  if (tabName === 'parties') {
    router.push('/parties');
    return;
  }
  activeTab.value = tabName;
}

/** Dropdown filter */
const selectedProvince = ref("");

/** Selected party for modal */
const selectedParty = ref(null);

/** Parties data */
const parties = ref([]);

function selectParty(party) {
  fetchPartyDetails(party.id);
}

async function fetchPartyDetails(partyId) {
  try {
    const { data } = await publicAPI.getPartyDetails(partyId);
    if (data.success) {
      selectedParty.value = { ...data.data, no: data.data.id };
    }
  } catch (err) {
    console.error('Failed to load party details:', err);
    // Fallback: show the basic party info
    const p = parties.value.find(p => p.id === partyId);
    if (p) selectedParty.value = p;
  }
}

function closeModal() {
  selectedParty.value = null;
}

function viewConstituencyResults(row) {
  if (row.id) {
    router.push(`/constituencies/${row.id}/results`);
  }
}

/** Fallback data (used when API is unavailable) */
const fallbackRows = [
  // กรุงเทพมหานคร (ชื่อเขตจริง)
  { province: "กรุงเทพมหานคร", area: "เขตพระนคร", no: 1 },
  { province: "กรุงเทพมหานคร", area: "เขตดุสิต", no: 2 },
  { province: "กรุงเทพมหานคร", area: "เขตหนองจอก", no: 3 },
  { province: "กรุงเทพมหานคร", area: "เขตบางรัก", no: 4 },
  { province: "กรุงเทพมหานคร", area: "เขตบางเขน", no: 5 },
  { province: "กรุงเทพมหานคร", area: "เขตบางกะปิ", no: 6 },
  { province: "กรุงเทพมหานคร", area: "เขตปทุมวัน", no: 7 },
  { province: "กรุงเทพมหานคร", area: "เขตป้อมปราบศัตรูพ่าย", no: 8 },
  { province: "กรุงเทพมหานคร", area: "เขตพระโขนง", no: 9 },
  { province: "กรุงเทพมหานคร", area: "เขตมีนบุรี", no: 10 },
  { province: "กรุงเทพมหานคร", area: "เขตลาดกระบัง", no: 11 },
  { province: "กรุงเทพมหานคร", area: "เขตยานนาวา", no: 12 },
  { province: "กรุงเทพมหานคร", area: "เขตสัมพันธวงศ์", no: 13 },
  { province: "กรุงเทพมหานคร", area: "เขตพญาไท", no: 14 },
  { province: "กรุงเทพมหานคร", area: "เขตธนบุรี", no: 15 },
  { province: "กรุงเทพมหานคร", area: "เขตบางกอกใหญ่", no: 16 },
  { province: "กรุงเทพมหานคร", area: "เขตห้วยขวาง", no: 17 },
  { province: "กรุงเทพมหานคร", area: "เขตคลองสาน", no: 18 },
  { province: "กรุงเทพมหานคร", area: "เขตตลิ่งชัน", no: 19 },
  { province: "กรุงเทพมหานคร", area: "เขตบางกอกน้อย", no: 20 },
  { province: "กรุงเทพมหานคร", area: "เขตบางขุนเทียน", no: 21 },
  { province: "กรุงเทพมหานคร", area: "เขตภาษีเจริญ", no: 22 },
  { province: "กรุงเทพมหานคร", area: "เขตหนองแขม", no: 23 },
  { province: "กรุงเทพมหานคร", area: "เขตราษฎร์บูรณะ", no: 24 },
  { province: "กรุงเทพมหานคร", area: "เขตบางพลัด", no: 25 },
  { province: "กรุงเทพมหานคร", area: "เขตดินแดง", no: 26 },
  { province: "กรุงเทพมหานคร", area: "เขตบึงกุ่ม", no: 27 },
  { province: "กรุงเทพมหานคร", area: "เขตสาทร", no: 28 },
  { province: "กรุงเทพมหานคร", area: "เขตบางซื่อ", no: 29 },
  { province: "กรุงเทพมหานคร", area: "เขตจตุจักร", no: 30 },
  { province: "กรุงเทพมหานคร", area: "เขตบางคอแหลม", no: 31 },
  { province: "กรุงเทพมหานคร", area: "เขตประเวศ", no: 32 },
  { province: "กรุงเทพมหานคร", area: "เขตคลองเตย", no: 33 },
  { province: "กรุงเทพมหานคร", area: "เขตสวนหลวง", no: 34 },
  { province: "กรุงเทพมหานคร", area: "เขตจอมทอง", no: 35 },
  { province: "กรุงเทพมหานคร", area: "เขตดอนเมือง", no: 36 },
  { province: "กรุงเทพมหานคร", area: "เขตราชเทวี", no: 37 },
  { province: "กรุงเทพมหานคร", area: "เขตลาดพร้าว", no: 38 },
  { province: "กรุงเทพมหานคร", area: "เขตวัฒนา", no: 39 },
  { province: "กรุงเทพมหานคร", area: "เขตบางแค", no: 40 },
  { province: "กรุงเทพมหานคร", area: "เขตหลักสี่", no: 41 },
  { province: "กรุงเทพมหานคร", area: "เขตสายไหม", no: 42 },
  { province: "กรุงเทพมหานคร", area: "เขตคันนายาว", no: 43 },
  { province: "กรุงเทพมหานคร", area: "เขตสะพานสูง", no: 44 },
  { province: "กรุงเทพมหานคร", area: "เขตวังทองหลาง", no: 45 },
  { province: "กรุงเทพมหานคร", area: "เขตคลองสามวา", no: 46 },
  { province: "กรุงเทพมหานคร", area: "เขตบางนา", no: 47 },
  { province: "กรุงเทพมหานคร", area: "เขตทวีวัฒนา", no: 48 },
  { province: "กรุงเทพมหานคร", area: "เขตทุ่งครุ", no: 49 },
  { province: "กรุงเทพมหานคร", area: "เขตบางบอน", no: 50 },
  
  // เชียงใหม่
  { province: "เชียงใหม่", area: "อำเภอเมืองเชียงใหม่", no: 1 },
  { province: "เชียงใหม่", area: "อำเภอจอมทอง", no: 2 },
  { province: "เชียงใหม่", area: "อำเภอแม่แจ่ม", no: 3 },
  { province: "เชียงใหม่", area: "อำเภอเชียงดาว", no: 4 },
  { province: "เชียงใหม่", area: "อำเภอดอยสะเก็ด", no: 5 },
  { province: "เชียงใหม่", area: "อำเภอแม่แตง", no: 6 },
  { province: "เชียงใหม่", area: "อำเภอแม่ริม", no: 7 },
  { province: "เชียงใหม่", area: "อำเภอสะเมิง", no: 8 },
  { province: "เชียงใหม่", area: "อำเภอฝาง", no: 9 },
  { province: "เชียงใหม่", area: "อำเภอสันทราย", no: 10 },
  
  // เชียงราย
  { province: "เชียงราย", area: "อำเภอเมืองเชียงราย", no: 1 },
  { province: "เชียงราย", area: "อำเภอแม่จัน", no: 2 },
  { province: "เชียงราย", area: "อำเภอแม่สาย", no: 3 },
  { province: "เชียงราย", area: "อำเภอเชียงของ", no: 4 },
  { province: "เชียงราย", area: "อำเภอพาน", no: 5 },
  
  // นครราชสีมา
  { province: "นครราชสีมา", area: "อำเภอเมืองนครราชสีมา", no: 1 },
  { province: "นครราชสีมา", area: "อำเภอครบุรี", no: 2 },
  { province: "นครราชสีมา", area: "อำเภอเสิงสาง", no: 3 },
  { province: "นครราชสีมา", area: "อำเภอคง", no: 4 },
  { province: "นครราชสีมา", area: "อำเภอบ้านเหลื่อม", no: 5 },
  { province: "นครราชสีมา", area: "อำเภอจักราช", no: 6 },
  { province: "นครราชสีมา", area: "อำเภอโชคชัย", no: 7 },
  { province: "นครราชสีมา", area: "อำเภอปากช่อง", no: 8 },
  { province: "นครราชสีมา", area: "อำเภอพิมาย", no: 9 },
  { province: "นครราชสีมา", area: "อำเภอบัวใหญ่", no: 10 },
  
  // ขอนแก่น
  { province: "ขอนแก่น", area: "อำเภอเมืองขอนแก่น", no: 1 },
  { province: "ขอนแก่น", area: "อำเภอบ้านฝาง", no: 2 },
  { province: "ขอนแก่น", area: "อำเภอพระยืน", no: 3 },
  { province: "ขอนแก่น", area: "อำเภอหนองเรือ", no: 4 },
  { province: "ขอนแก่น", area: "อำเภอชุมแพ", no: 5 },
  { province: "ขอนแก่น", area: "อำเภอกระนวน", no: 6 },
  { province: "ขอนแก่น", area: "อำเภอมัญจาคีรี", no: 7 },
  { province: "ขอนแก่น", area: "อำเภอน้ำพอง", no: 8 },
  { province: "ขอนแก่น", area: "อำเภออุบลรัตน์", no: 9 },
  { province: "ขอนแก่น", area: "อำเภอบ้านไผ่", no: 10 },
  
  // อุบลราชธานี
  { province: "อุบลราชธานี", area: "อำเภอเมืองอุบลราชธานี", no: 1 },
  { province: "อุบลราชธานี", area: "อำเภอเขื่องใน", no: 2 },
  { province: "อุบลราชธานี", area: "อำเภอเขมราฐ", no: 3 },
  { province: "อุบลราชธานี", area: "อำเภอเดชอุดม", no: 4 },
  { province: "อุบลราชธานี", area: "อำเภอตระการพืชผล", no: 5 },
  { province: "อุบลราชธานี", area: "อำเภอวารินชำราบ", no: 6 },
  { province: "อุบลราชธานี", area: "อำเภอพิบูลมังสาหาร", no: 7 },
  { province: "อุบลราชธานี", area: "อำเภอศรีเมืองใหม่", no: 8 },
  { province: "อุบลราชธานี", area: "อำเภอโพธิ์ไทร", no: 9 },
  { province: "อุบลราชธานี", area: "อำเภอสำโรง", no: 10 },
  
  // ชลบุรี
  { province: "ชลบุรี", area: "อำเภอเมืองชลบุรี", no: 1 },
  { province: "ชลบุรี", area: "อำเภอบ้านบึง", no: 2 },
  { province: "ชลบุรี", area: "อำเภอพนัสนิคม", no: 3 },
  { province: "ชลบุรี", area: "อำเภอพานทอง", no: 4 },
  { province: "ชลบุรี", area: "อำเภอบางละมุง", no: 5 },
  { province: "ชลบุรี", area: "อำเภอศรีราชา", no: 6 },
  { province: "ชลบุรี", area: "อำเภอสัตหีบ", no: 7 },
  
  // นครศรีธรรมราช
  { province: "นครศรีธรรมราช", area: "อำเภอเมืองนครศรีธรรมราช", no: 1 },
  { province: "นครศรีธรรมราช", area: "อำเภอพรหมคีรี", no: 2 },
  { province: "นครศรีธรรมราช", area: "อำเภอลานสกา", no: 3 },
  { province: "นครศรีธรรมราช", area: "อำเภอฉวาง", no: 4 },
  { province: "นครศรีธรรมราช", area: "อำเภอพิปูน", no: 5 },
  { province: "นครศรีธรรมราช", area: "อำเภอเชียรใหญ่", no: 6 },
  { province: "นครศรีธรรมราช", area: "อำเภอท่าศาลา", no: 7 },
  
  // สงขลา
  { province: "สงขลา", area: "อำเภอเมืองสงขลา", no: 1 },
  { province: "สงขลา", area: "อำเภอสทิงพระ", no: 2 },
  { province: "สงขลา", area: "อำเภอจะนะ", no: 3 },
  { province: "สงขลา", area: "อำเภอนาทวี", no: 4 },
  { province: "สงขลา", area: "อำเภอเทพา", no: 5 },
  { province: "สงขลา", area: "อำเภอหาดใหญ่", no: 6 },
  
  // นนทบุรี
  { province: "นนทบุรี", area: "อำเภอเมืองนนทบุรี", no: 1 },
  { province: "นนทบุรี", area: "อำเภอบางกรวย", no: 2 },
  { province: "นนทบุรี", area: "อำเภอบางใหญ่", no: 3 },
  { province: "นนทบุรี", area: "อำเภอบางบัวทอง", no: 4 },
  { province: "นนทบุรี", area: "อำเภอไทรน้อย", no: 5 },
  { province: "นนทบุรี", area: "อำเภอปากเกร็ด", no: 6 },
  
  // สมุทรปราการ
  { province: "สมุทรปราการ", area: "อำเภอเมืองสมุทรปราการ", no: 1 },
  { province: "สมุทรปราการ", area: "อำเภอบางบ่อ", no: 2 },
  { province: "สมุทรปราการ", area: "อำเภอบางพลี", no: 3 },
  { province: "สมุทรปราการ", area: "อำเภอพระประแดง", no: 4 },
  { province: "สมุทรปราการ", area: "อำเภอพระสมุทรเจดีย์", no: 5 },
  { province: "สมุทรปราการ", area: "อำเภอบางเสาธง", no: 6 },
  
  // ภูเก็ต
  { province: "ภูเก็ต", area: "อำเภอเมืองภูเก็ต", no: 1 },
  { province: "ภูเก็ต", area: "อำเภอกะทู้", no: 2 },
  { province: "ภูเก็ต", area: "อำเภอถลาง", no: 3 }
];

const rows = ref([...fallbackRows]);

/** Load data from API */
onMounted(async () => {
  // Load constituencies
  loadingConstituencies.value = true;
  try {
    const { data } = await publicAPI.getConstituencies();
    if (data.success && data.data && data.data.length > 0) {
      rows.value = data.data.map(c => ({
        id: c.id,
        province: c.province || c.name,
        area: c.name || `เขต ${c.district_number || c.districtNumber}`,
        no: c.district_number || c.districtNumber || c.id,
        status: c.status
      }));
    }
  } catch (err) {
    console.warn('Using fallback constituency data:', err.message);
  } finally {
    loadingConstituencies.value = false;
  }

  // Load parties
  loadingParties.value = true;
  try {
    const { data } = await publicAPI.getParties();
    if (data.success && data.data && data.data.length > 0) {
      parties.value = data.data.map((p, index) => ({
        id: p.id,
        no: p.id || index + 1,
        name: p.name,
        logoUrl: p.logoUrl || p.logo_url
      }));
    }
  } catch (err) {
    console.warn('Using fallback party data:', err.message);
    parties.value = [
      { id: 1, no: 1, name: "พรรคก้าวไกล" },
      { id: 2, no: 2, name: "พรรคเพื่อไทย" },
      { id: 3, no: 3, name: "พรรคประชาธิปัตย์" },
      { id: 4, no: 4, name: "พรรคภูมิใจไทย" },
      { id: 5, no: 5, name: "พรรคพลังประชารัฐ" },
    ];
  } finally {
    loadingParties.value = false;
  }
});

/** Dropdown options (unique provinces from data) */
const provinces = computed(() => {
  return Array.from(new Set(rows.value.map(r => r.province)));
});

/** Sort */
const sortBy = ref("no");      // province | area | no
const sortDir = ref("asc");    // asc | desc

function toggleSort(key) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = key;
    sortDir.value = "asc";
  }
}

function normalizeNo(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 9999999;
}

/** Visible rows = filtered + sorted */
const visibleRows = computed(() => {
  let data = [...rows.value];

  if (selectedProvince.value) {
    data = data.filter(r => r.province === selectedProvince.value);
  }

  const dir = sortDir.value === "asc" ? 1 : -1;

  data.sort((a, b) => {
    if (sortBy.value === "no") {
      return (normalizeNo(a.no) - normalizeNo(b.no)) * dir;
    }
    const av = String(a[sortBy.value]).toLowerCase();
    const bv = String(b[sortBy.value]).toLowerCase();
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  return data;
});
</script>

<style src="./VotingSystem.css" scoped></style>
