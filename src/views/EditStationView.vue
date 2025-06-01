<template>
  <div class="edit-station">
    <h2>Edit Charging Station</h2>
    <form @submit.prevent="updateStation">
      <label>Station Name</label>
      <input v-model="form.name" required />

      <label>Latitude</label>
      <input v-model.number="form.latitude" type="number" step="any" required />

      <label>Longitude</label>
      <input v-model.number="form.longitude" type="number" step="any" required />

      <label>Status</label>
      <input v-model="form.status" required />

      <label>Power (kW)</label>
      <input v-model.number="form.power" type="number" step="any" required />

      <label>Connector Type</label>
      <input v-model="form.connectorType" required />

      <button type="submit">💾 Save Changes</button>
    </form>
  </div>
</template>

<script>
import api from '../axios'

export default {
  name: 'EditStationView',
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
  async created() {
    const id = this.$route.params.id
    try {
      const res = await api.get('/stations')
      const station = res.data.find(s => s._id === id)
      if (!station) {
        this.$toast?.error("Station not found")
        this.$router.push('/dashboard')
        return
      }
      this.form = station
    } catch (err) {
      console.error(err)
      this.$toast?.error("Failed to load station")
    }
  },
  methods: {
    async updateStation() {
      try {
        const id = this.$route.params.id
        await api.put(`/stations/${id}`, this.form)
        this.$toast?.success("✅ Station updated successfully!")
        this.$router.push('/dashboard')
      } catch (err) {
        console.error(err)
        this.$toast?.error("❌ Failed to update station.")
      }
    }
  }
}
</script>

<style scoped>
.edit-station {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: #fefefe;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
