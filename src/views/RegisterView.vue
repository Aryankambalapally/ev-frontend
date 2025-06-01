// File: src/views/RegisterView.vue
<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2>Create Your Account 🧾</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Full Name" required />
        <input v-model="email" type="email" placeholder="Email Address" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">✅ Register</button>
      </form>
      <p class="switch-link">Already have an account? <router-link to="/">Login here</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$toast?.success('Account created! Welcome, ' + res.data.name)
        this.$router.push('/dashboard')
      } catch (err) {
        const msg = err?.response?.data?.message || 'Registration failed'
        this.$toast?.error(msg)
      }
    }
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background: linear-gradient(to right, #fffde7, #e8f5e9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  background: #ffffff;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  color: #1b5e20;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #388e3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #2e7d32;
}

.switch-link {
  margin-top: 16px;
  font-size: 14px;
}
</style>
