<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2>Welcome Back ⚡</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">🔓 Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="switch-link">Don't have an account? <router-link to="/register">Register here</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$toast?.success('Welcome back, ' + res.data.name)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err?.response?.data?.message || 'Invalid email or password'
        this.$toast?.error(this.error)
      }
    }
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background: linear-gradient(to right, #f1f8e9, #e0f7fa);
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
  color: #00695c;
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
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #369c6e;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.switch-link {
  margin-top: 16px;
  font-size: 14px;
}
</style>
