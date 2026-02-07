# Election System Frontend - Implementation Plan (Vue 3)

## 1. Project Overview

Vue 3 frontend สำหรับระบบเลือกตั้งออนไลน์ เชื่อมต่อกับ Backend API (Express + PostgreSQL)

**Base API URL:** `http://localhost:3000/api`

### Tech Stack ปัจจุบัน
- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **Build Tool:** Vue CLI
- **Styling:** CSS แยกไฟล์ต่อ Component

### Tech Stack ที่ต้องเพิ่ม
- **HTTP Client:** Axios
- **Router:** Vue Router 4
- **State Management:** Pinia (จัดการ Auth state)
- **Notifications:** SweetAlert2 หรือ vue-toastification (แทน `alert()`)

---

## 2. สถานะปัจจุบันของ Frontend

### Components ที่มีอยู่แล้ว
| Component | สถานะ | หมายเหตุ |
|-----------|--------|----------|
| `App.vue` | ✅ มี | ใช้ dynamic component + emit navigation (ยังไม่มี router) |
| `VotingSystem.vue` | ✅ มี | หน้าหลัก 3 tabs (ผลเลือกตั้ง, พรรค, ลงคะแนน) — ข้อมูล hardcode |
| `Candidates.vue` | ✅ มี | แสดง list พรรคการเมือง — ข้อมูล hardcode |
| `VoterLogin.vue` | ✅ มี | Login ด้วยเลขบัตร 13 หลัก — ยังไม่เรียก API |
| `Register.vue` | ✅ มี | ลงทะเบียนผู้ใช้ — ยังไม่เรียก API, เขตเลือกตั้ง hardcode |

### ปัญหาที่ต้องแก้ไข
1. ❌ **ไม่มี Axios** — ยังไม่เชื่อมต่อ Backend API เลย
2. ❌ **ไม่มี Vue Router** — ใช้ dynamic component `<component :is>` แทน
3. ❌ **Auth เป็น mock** — login สำเร็จทุกครั้ง, ไม่มี JWT token
4. ❌ **ข้อมูล hardcode** — เขตเลือกตั้ง, พรรค, ผู้สมัคร ใช้ข้อมูลจำลอง
5. ❌ **ไม่มี Admin/EC pages** — ยังไม่มี UI สำหรับ Admin และ EC Staff
6. ❌ **ไม่มี password ใน Login** — VoterLogin ใช้แค่เลขบัตรประชาชน
7. ❌ **Register ขาดฟิลด์** — ไม่มี title, constituency ดึงจาก API

---

## 3. Backend Endpoints ที่ต้องเชื่อมต่อ

### Phase ปัจจุบัน (พร้อมใช้ — 9 Endpoints)

| # | Method | Endpoint | หน้าที่ | Component ที่ใช้ |
|---|--------|----------|---------|------------------|
| 1 | POST | `/api/auth/register` | ลงทะเบียนผู้ใช้ | Register.vue |
| 2 | POST | `/api/auth/login` | Login ผู้ใช้ | VoterLogin.vue |
| 3 | POST | `/api/auth/admin/register` | ลงทะเบียน Admin | AdminRegister.vue (ใหม่) |
| 4 | POST | `/api/auth/admin/login` | Login Admin | AdminLogin.vue (ใหม่) |
| 5 | GET | `/api/public/constituencies` | ดูรายชื่อเขตเลือกตั้ง | VotingSystem.vue (tab ผลเลือกตั้ง) |
| 6 | GET | `/api/public/constituencies/:id/results` | ดูผลคะแนนของเขต | ConstituencyResults.vue (ใหม่) |
| 7 | GET | `/api/public/parties` | ดูรายชื่อพรรค | VotingSystem.vue (tab พรรค) |
| 8 | GET | `/api/public/parties/:id` | ดูรายละเอียดพรรค | PartyDetail modal |
| 9 | GET | `/api/public/party-overview` | ดูภาพรวมที่นั่ง | PartyOverview.vue (ใหม่) |

### Phase อนาคต (ยังไม่ implement ใน Backend)

| Module | Endpoints ที่วางแผนไว้ | Component ที่ต้องสร้าง |
|--------|------------------------|----------------------|
| **Vote (Phase 9)** | POST `/api/vote/cast`, GET `/api/vote/my-votes` | VoteBallot.vue |
| **Admin (Phase 10)** | GET `/api/admin/users`, POST `/api/admin/constituency/status` | AdminDashboard.vue |
| **EC Staff (Phase 11)** | POST `/api/ec/close-voting/:id`, POST `/api/ec/declare-results/:id` | ECDashboard.vue |

---

## 4. โครงสร้าง Project ใหม่

```
src/
├── api/
│   ├── index.js              # Axios instance + interceptors
│   ├── auth.api.js            # Auth API calls
│   ├── public.api.js          # Public API calls
│   ├── vote.api.js            # Vote API calls (Phase 9)
│   ├── admin.api.js           # Admin API calls (Phase 10)
│   └── ec.api.js              # EC API calls (Phase 11)
├── router/
│   └── index.js               # Vue Router config + guards
├── stores/
│   └── auth.store.js          # Pinia auth store (token, user, role)
├── components/
│   ├── common/
│   │   ├── NavBar.vue         # Shared navigation bar (extracted)
│   │   ├── LoadingSpinner.vue # Loading indicator
│   │   └── ErrorAlert.vue     # Error display component
│   ├── Candidates.vue         # (แก้ไข) ดึงข้อมูลจาก API
│   ├── Candidates.css
│   ├── Register.vue           # (แก้ไข) เชื่อม API + เพิ่ม title, ดึง constituency
│   ├── Register.css
│   ├── VoterLogin.vue         # (แก้ไข) เชื่อม API + เพิ่ม password field
│   ├── VoterLogin.css
│   ├── VotingSystem.vue       # (แก้ไข) ดึงข้อมูลจาก API
│   ├── VotingSystem.css
│   ├── AdminLogin.vue         # (ใหม่) หน้า Login สำหรับ Admin
│   ├── AdminDashboard.vue     # (ใหม่) Dashboard Admin — Phase 10
│   ├── ECDashboard.vue        # (ใหม่) Dashboard EC Staff — Phase 11
│   ├── VoteBallot.vue         # (ใหม่) หน้าลงคะแนน — Phase 9
│   ├── PartyOverview.vue      # (ใหม่) ภาพรวมที่นั่งพรรค
│   └── ConstituencyResults.vue# (ใหม่) ผลคะแนนรายเขต
├── App.vue                    # (แก้ไข) ใช้ <router-view> แทน dynamic component
├── main.js                    # (แก้ไข) เพิ่ม Router, Pinia
└── assets/
```

---

## 5. Axios Setup & API Layer

### 5.1 Axios Instance (`src/api/index.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor — แนบ JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — จัดการ error 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 5.2 Auth API (`src/api/auth.api.js`)

```javascript
import api from './index';

export const authAPI = {
  // POST /api/auth/register
  register(data) {
    return api.post('/auth/register', {
      nationalId: data.nationalId,
      password: data.password,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      constituencyId: data.constituencyId
    });
  },

  // POST /api/auth/login
  login(nationalId, password) {
    return api.post('/auth/login', { nationalId, password });
  },

  // POST /api/auth/admin/register
  adminRegister(username, password) {
    return api.post('/auth/admin/register', { username, password });
  },

  // POST /api/auth/admin/login
  adminLogin(username, password) {
    return api.post('/auth/admin/login', { username, password });
  }
};
```

### 5.3 Public API (`src/api/public.api.js`)

```javascript
import api from './index';

export const publicAPI = {
  // GET /api/public/constituencies
  getConstituencies() {
    return api.get('/public/constituencies');
  },

  // GET /api/public/constituencies/:id/results
  getConstituencyResults(id) {
    return api.get(`/public/constituencies/${id}/results`);
  },

  // GET /api/public/parties
  getParties() {
    return api.get('/public/parties');
  },

  // GET /api/public/parties/:id
  getPartyDetails(id) {
    return api.get(`/public/parties/${id}`);
  },

  // GET /api/public/party-overview
  getPartyOverview() {
    return api.get('/public/party-overview');
  }
};
```

### 5.4 Vote API (`src/api/vote.api.js`) — Phase 9

```javascript
import api from './index';

export const voteAPI = {
  // POST /api/vote/cast
  castVote(candidateId) {
    return api.post('/vote/cast', { candidateId });
  },

  // GET /api/vote/my-votes
  getMyVote() {
    return api.get('/vote/my-votes');
  },

  // DELETE /api/vote/remove
  removeVote() {
    return api.delete('/vote/remove');
  }
};
```

### 5.5 Admin API (`src/api/admin.api.js`) — Phase 10

```javascript
import api from './index';

export const adminAPI = {
  // GET /api/admin/users?search=xxx
  searchUsers(searchTerm) {
    return api.get('/admin/users', { params: { search: searchTerm } });
  },

  // POST /api/admin/promote
  promoteToEC(nationalId) {
    return api.post('/admin/promote', { nationalId });
  },

  // POST /api/admin/constituencies
  createConstituency(province, districtNumber) {
    return api.post('/admin/constituencies', { province, districtNumber });
  },

  // GET /api/admin/constituencies
  listConstituencies() {
    return api.get('/admin/constituencies');
  }
};
```

### 5.6 EC API (`src/api/ec.api.js`) — Phase 11

```javascript
import api from './index';

export const ecAPI = {
  // POST /api/ec/parties (multipart/form-data)
  createParty(formData) {
    return api.post('/ec/parties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // POST /api/ec/candidates (multipart/form-data)
  createCandidate(formData) {
    return api.post('/ec/candidates', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // PATCH /api/ec/constituencies/:id/close
  closeConstituency(id) {
    return api.patch(`/ec/constituencies/${id}/close`);
  },

  // PATCH /api/ec/constituencies/:id/open
  openConstituency(id) {
    return api.patch(`/ec/constituencies/${id}/open`);
  }
};
```

---

## 6. Vue Router (`src/router/index.js`)

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // === Public Routes (ไม่ต้อง login) ===
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/VotingSystem.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'VoterLogin',
    component: () => import('../components/VoterLogin.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/parties',
    name: 'Parties',
    component: () => import('../components/Candidates.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/parties/:id',
    name: 'PartyDetail',
    component: () => import('../components/PartyDetail.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/constituencies/:id/results',
    name: 'ConstituencyResults',
    component: () => import('../components/ConstituencyResults.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/party-overview',
    name: 'PartyOverview',
    component: () => import('../components/PartyOverview.vue'),
    meta: { requiresAuth: false }
  },

  // === Voter Routes (ต้อง login + role VOTER) ===
  {
    path: '/vote',
    name: 'VoteBallot',
    component: () => import('../components/VoteBallot.vue'),
    meta: { requiresAuth: true, role: 'VOTER' }
  },

  // === Admin Routes ===
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../components/AdminLogin.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../components/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' }
  },

  // === EC Staff Routes ===
  {
    path: '/ec/dashboard',
    name: 'ECDashboard',
    component: () => import('../components/ECDashboard.vue'),
    meta: { requiresAuth: true, role: 'EC' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'VoterLogin' });
  }

  if (to.meta.guestOnly && token) {
    return next({ name: 'Home' });
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
```

---

## 7. Pinia Auth Store (`src/stores/auth.store.js`)

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authAPI } from '../api/auth.api';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const isEC = computed(() => user.value?.role === 'EC');
  const isVoter = computed(() => user.value?.role === 'VOTER');

  // User Login
  async function login(nationalId, password) {
    const { data } = await authAPI.login(nationalId, password);
    if (data.success) {
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    }
    return data;
  }

  // User Register
  async function register(formData) {
    const { data } = await authAPI.register(formData);
    if (data.success) {
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    }
    return data;
  }

  // Admin Login
  async function adminLogin(username, password) {
    const { data } = await authAPI.adminLogin(username, password);
    if (data.success) {
      token.value = data.token;
      user.value = { ...data.admin, role: 'ADMIN' };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user.value));
      router.push('/admin/dashboard');
    }
    return data;
  }

  // Logout
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  return {
    token, user, isLoggedIn, isAdmin, isEC, isVoter,
    login, register, adminLogin, logout
  };
});
```

---

## 8. แผนแก้ไข Components ที่มีอยู่

### 8.1 `App.vue` — เปลี่ยนเป็น Router

**เปลี่ยนจาก:**
```vue
<component :is="currentComponent" @navigate="handleNavigate" @login="handleLogin" />
```

**เปลี่ยนเป็น:**
```vue
<template>
  <router-view />
</template>
```

### 8.2 `VoterLogin.vue` — เชื่อม API

**สิ่งที่ต้องแก้:**
- ✅ เพิ่ม **password field** (ปัจจุบันมีแค่ National ID)
- ✅ เรียก `POST /api/auth/login` ผ่าน Axios
- ✅ เก็บ JWT token ใน localStorage ผ่าน Pinia store
- ✅ เปลี่ยน `emit('navigate')` → `router.push()`
- ✅ เปลี่ยน `alert()` → SweetAlert2 / toast notification
- ✅ เพิ่ม loading state และ error handling

### 8.3 `Register.vue` — เชื่อม API

**สิ่งที่ต้องแก้:**
- ✅ เพิ่ม **title field** (คำนำหน้า: นาย, นาง, นางสาว)
- ✅ เปลี่ยน **Election Area dropdown** → ดึงจาก `GET /api/public/constituencies`
- ✅ เรียก `POST /api/auth/register` ผ่าน Axios
- ✅ เก็บ JWT token + auto-login หลัง register
- ✅ เปลี่ยน `emit('navigate')` → `router.push()`
- ✅ เพิ่ม loading state และ error handling

### 8.4 `VotingSystem.vue` — เชื่อม API (tab ผลเลือกตั้ง + พรรค)

**สิ่งที่ต้องแก้:**
- ✅ **Tab ผลเลือกตั้ง:** ดึงข้อมูลจาก `GET /api/public/constituencies` แทน hardcode
- ✅ **Tab ผลเลือกตั้ง:** คลิกเขต → ดึงผลจาก `GET /api/public/constituencies/:id/results`
- ✅ **Tab พรรคการเมือง:** ดึงจาก `GET /api/public/parties` แทน hardcode
- ✅ **Modal พรรค:** คลิกพรรค → ดึงจาก `GET /api/public/parties/:id`
- ✅ **Tab ลงคะแนน:** redirect ไป `/vote` (Phase 9)
- ✅ เพิ่ม loading states (skeleton / spinner)

### 8.5 `Candidates.vue` — เชื่อม API

**สิ่งที่ต้องแก้:**
- ✅ ดึงข้อมูลพรรคจาก `GET /api/public/parties` แทน hardcode
- ✅ คลิกพรรค → ดึง `GET /api/public/parties/:id` แสดง modal/หน้าใหม่

---

## 9. Components ใหม่ที่ต้องสร้าง

### 9.1 หน้าที่ทำได้ทันที (Backend พร้อม)

| Component | Route | Endpoint ที่ใช้ | รายละเอียด |
|-----------|-------|-----------------|------------|
| `AdminLogin.vue` | `/admin/login` | `POST /api/auth/admin/login` | Login สำหรับ Admin |
| `AdminRegister.vue` | `/admin/register` | `POST /api/auth/admin/register` | สร้าง Admin account |
| `ConstituencyResults.vue` | `/constituencies/:id/results` | `GET /api/public/constituencies/:id/results` | แสดงผลคะแนนรายเขต พร้อม bar chart |
| `PartyOverview.vue` | `/party-overview` | `GET /api/public/party-overview` | แสดงภาพรวมที่นั่งแต่ละพรรค |
| `PartyDetail.vue` | `/parties/:id` | `GET /api/public/parties/:id` | แสดงรายละเอียดพรรค + ผู้สมัคร |

### 9.2 หน้าที่ต้องรอ Backend (Phase 9-11)

| Component | Route | Module | รายละเอียด |
|-----------|-------|--------|------------|
| `VoteBallot.vue` | `/vote` | Vote (Phase 9) | หน้าลงคะแนนเสียง — เลือกผู้สมัครในเขตของตัวเอง |
| `MyVote.vue` | `/my-vote` | Vote (Phase 9) | แสดงคะแนนที่ลงไปแล้ว + ตัวเลือกเปลี่ยน/ลบ |
| `AdminDashboard.vue` | `/admin/dashboard` | Admin (Phase 10) | จัดการเขตเลือกตั้ง, ค้นหาผู้ใช้, promote เป็น EC |
| `ECDashboard.vue` | `/ec/dashboard` | EC (Phase 11) | สร้างพรรค/ผู้สมัคร, เปิด/ปิดเขตเลือกตั้ง |

---

## 10. Mapping: Endpoint → Component → Action

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND FLOW                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  VoterLogin.vue ──POST /auth/login──→ เก็บ token → redirect /      │
│                                                                     │
│  Register.vue ──POST /auth/register──→ เก็บ token → redirect /     │
│                                                                     │
│  AdminLogin.vue ──POST /auth/admin/login──→ redirect /admin        │
│                                                                     │
│  VotingSystem.vue                                                   │
│    ├── Tab ผลเลือกตั้ง ──GET /public/constituencies──→ แสดงตาราง   │
│    │   └── คลิกเขต ──GET /public/constituencies/:id/results        │
│    ├── Tab พรรค ──GET /public/parties──→ แสดง grid                  │
│    │   └── คลิกพรรค ──GET /public/parties/:id──→ แสดง modal        │
│    └── Tab ลงคะแนน → redirect /vote (ต้อง login)                   │
│                                                                     │
│  PartyOverview.vue ──GET /public/party-overview──→ แสดงที่นั่ง      │
│                                                                     │
│  VoteBallot.vue (Phase 9)                                           │
│    ├── ดึงผู้สมัครในเขต ──GET /public/constituencies/:id/results   │
│    ├── ลงคะแนน ──POST /vote/cast                                   │
│    └── ดูคะแนนที่ลง ──GET /vote/my-votes                           │
│                                                                     │
│  AdminDashboard.vue (Phase 10)                                      │
│    ├── ค้นหาผู้ใช้ ──GET /admin/users?search=                      │
│    ├── Promote เป็น EC ──POST /admin/promote                       │
│    └── สร้างเขต ──POST /admin/constituencies                       │
│                                                                     │
│  ECDashboard.vue (Phase 11)                                         │
│    ├── สร้างพรรค ──POST /ec/parties (multipart)                    │
│    ├── สร้างผู้สมัคร ──POST /ec/candidates (multipart)             │
│    └── ปิด/เปิดเขต ──PATCH /ec/constituencies/:id/close|open      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 11. Implementation Roadmap

### Phase A: Infrastructure Setup (ทำก่อน)
- [ ] `npm install axios vue-router@4 pinia`
- [ ] สร้าง `src/api/index.js` (Axios instance)
- [ ] สร้าง `src/api/auth.api.js`
- [ ] สร้าง `src/api/public.api.js`
- [ ] สร้าง `src/router/index.js` (Vue Router + guards)
- [ ] สร้าง `src/stores/auth.store.js` (Pinia store)
- [ ] แก้ `main.js` — เพิ่ม Router + Pinia
- [ ] แก้ `App.vue` — เปลี่ยนเป็น `<router-view>`

### Phase B: แก้ไข Components เดิมให้เชื่อม API
- [ ] แก้ `VoterLogin.vue` — เพิ่ม password, เรียก API login
- [ ] แก้ `Register.vue` — เพิ่ม title, ดึง constituency จาก API, เรียก API register
- [ ] แก้ `VotingSystem.vue` — Tab ผลเลือกตั้ง ดึงจาก API
- [ ] แก้ `VotingSystem.vue` — Tab พรรค ดึงจาก API
- [ ] แก้ `VotingSystem.vue` — Modal พรรค ดึงรายละเอียดจาก API
- [ ] แก้ `Candidates.vue` — ดึงข้อมูลจาก API

### Phase C: สร้าง Components ใหม่ (Public)
- [ ] สร้าง `AdminLogin.vue`
- [ ] สร้าง `ConstituencyResults.vue` — แสดงผลคะแนนรายเขต
- [ ] สร้าง `PartyOverview.vue` — ภาพรวมที่นั่งพรรค
- [ ] สร้าง `PartyDetail.vue` — รายละเอียดพรรค (standalone page)

### Phase D: Voting Module (รอ Backend Phase 9)
- [ ] สร้าง `src/api/vote.api.js`
- [ ] สร้าง `VoteBallot.vue` — หน้าลงคะแนน
- [ ] สร้าง `MyVote.vue` — แสดงคะแนนที่ลง + แก้ไข/ลบ

### Phase E: Admin Module (รอ Backend Phase 10)
- [ ] สร้าง `src/api/admin.api.js`
- [ ] สร้าง `AdminDashboard.vue`
  - ค้นหาผู้ใช้
  - จัดการเขตเลือกตั้ง
  - Promote ผู้ใช้เป็น EC

### Phase F: EC Staff Module (รอ Backend Phase 11)
- [ ] สร้าง `src/api/ec.api.js`
- [ ] สร้าง `ECDashboard.vue`
  - สร้างพรรค (+ upload โลโก้)
  - สร้างผู้สมัคร (+ upload รูป)
  - เปิด/ปิดเขตเลือกตั้ง

### Phase G: UX Polish
- [ ] เปลี่ยน `alert()` ทั้งหมดเป็น toast/SweetAlert
- [ ] เพิ่ม Loading spinners ทุกหน้า
- [ ] เพิ่ม Error boundaries
- [ ] Responsive design review
- [ ] เพิ่ม Logout button ใน NavBar

---

## 12. คำสั่งติดตั้ง Dependencies

```bash
# Core dependencies
npm install axios vue-router@4 pinia

# Optional: Better notifications
npm install sweetalert2

# Optional: Form validation
npm install vee-validate yup
```

---

## 13. Response/Error Handling Pattern

### Standard API Call Pattern ใน Component

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { publicAPI } from '../api/public.api';

const data = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await publicAPI.getConstituencies();
    if (response.data.success) {
      data.value = response.data.data;
    } else {
      error.value = response.data.error;
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
  } finally {
    loading.value = false;
  }
});
</script>
```

### Error Response Format (จาก Backend)
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Success Response Format (จาก Backend)
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 14. สรุป

| หมวด | จำนวน |
|------|-------|
| Components ที่ต้อง **แก้ไข** | 5 (App, VoterLogin, Register, VotingSystem, Candidates) |
| Components ที่ต้อง **สร้างใหม่** (ทำได้ทันที) | 5 (AdminLogin, AdminRegister, ConstituencyResults, PartyOverview, PartyDetail) |
| Components ที่ต้อง **สร้างใหม่** (รอ Backend) | 4 (VoteBallot, MyVote, AdminDashboard, ECDashboard) |
| API Files ที่ต้องสร้าง | 6 (index, auth, public, vote, admin, ec) |
| Infrastructure Files ใหม่ | 3 (router, store, api instance) |
| Endpoints ที่เชื่อมต่อได้ทันที | 9 |
| Endpoints ที่ต้องรอ | ~12 (Phase 9-11) |

**ลำดับแนะนำ:** Phase A → B → C → D → E → F → G
