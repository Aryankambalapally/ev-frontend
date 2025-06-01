// File: src/views/AddStationView.vue
<template>
  <div class="page-wrapper">
    <div class="form-card">
      <h2>Add EV Charging Station ⚡</h2>
      <form @submit.prevent="submitStation">
        <label>Station Name</label>
        <input v-model="form.name" placeholder="e.g. Tata EV Station" required />

        <label>Latitude</label>
        <input v-model.number="form.latitude" type="number" step="any" placeholder="e.g. 22.9922" required />

        <label>Longitude</label>
        <input v-model.number="form.longitude" type="number" step="any" placeholder="e.g. 72.4993" required />

        <label>Status</label>
        <input v-model="form.status" placeholder="e.g. Active" required />

        <label>Power (kW)</label>
        <input v-model.number="form.power" type="number" step="any" placeholder="e.g. 60" required />

        <label>Connector Type</label>
        <input v-model="form.connectorType" placeholder="e.g. Type-2" required />

        <button type="submit">➕ Add Station</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../axios'

export default {
  name: 'AddStationView',
  data() {
    return {
      form: {
        name: '',
        latitude: '',
        longitude: '',
        status: '',
        power: '',
        connectorType: ''
      }
    }
  },
  methods: {
    async submitStation() {
      try {
        console.log("Submitting:", this.form)
        const res = await api.post('/stations', this.form)
        console.log("Response:", res)
        if (res.status === 201 || res.status === 200) {
          this.$toast?.success('✅ Station added successfully!')
          this.$router.push('/dashboard')
        } else {
          this.$toast?.error('Unexpected response. Station not added.')
        }
      } catch (err) {
        console.error("Submission Error:", err)
        const message = err?.response?.data?.message || '❌ Failed to add station.'
        this.$toast?.error(message)
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h2 {
  text-align: center;
  color: #004d40;
  margin-bottom: 30px;
}

label {
  display: block;
  margin-top: 20px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b983;
  outline: none;
}

button {
  margin-top: 30px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background: linear-gradient(to right, #26a69a, #66bb6a);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(to right, #2e7d32, #43a047);
}
</style>
