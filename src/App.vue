<template>
  <component :is="currentComponent" @navigate="handleNavigate" @login="handleLogin" />
</template>

<script>
import { ref, onMounted } from 'vue'
import VotingSystem from './components/VotingSystem.vue'
import Candidates from './components/Candidates.vue'
import VoterLogin from './components/VoterLogin.vue'
import Register from './components/Register.vue'

export default {
  name: 'App',
  components: {
    VotingSystem,
    Candidates,
    VoterLogin,
    Register
  },
  setup() {
    const currentComponent = ref('VotingSystem')
    const isLoggedIn = ref(false)

    // ตรวจสอบสถานะ login เมื่อเริ่มต้น
    onMounted(() => {
      const loginStatus = localStorage.getItem('isLoggedIn')
      const userId = localStorage.getItem('userId')
      
      if (loginStatus === 'true' && userId) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })

    const handleNavigate = (pageName) => {
      // ตรวจสอบว่า login แล้วหรือยัง
      if (!isLoggedIn.value && pageName !== 'VoterLogin' && pageName !== 'Register') {
        // ถ้ายังไม่ login และพยายามไปหน้าอื่น ให้อยู่หน้า login
        alert('กรุณาเข้าสู่ระบบก่อน')
        currentComponent.value = 'VoterLogin'
        return
      }
      
      currentComponent.value = pageName
    }

    const handleLogin = (userData) => {
      // บันทึกสถานะ login
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', userData.userId)
      localStorage.setItem('userName', userData.userName || '')
      isLoggedIn.value = true
      
      // พาไปหน้าผลการเลือกตั้ง
      currentComponent.value = 'VotingSystem'
    }

    return {
      currentComponent,
      handleNavigate,
      handleLogin
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
