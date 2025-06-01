// File: src/views/DashboardView.vue
<template>
  <div class="home-about-links ">
      <router-link to="/">Home</router-link> |
    <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/about">About</router-link>
    </div>
  <div class="dashboard">
    <div class="ev-header">
      <img src="https://cdn-icons-png.flaticon.com/512/808/808428.png" alt="EV Logo" class="logo" />
      <h2>EV Charging Stations</h2>
    </div>

    <div class="top-actions">
      <router-link to="/add" class="btn">
        ➕ Add Station
      </router-link>
      <router-link to="/map" class="btn">
        🗺️ View Map
      </router-link>
    </div>


    <!-- Filters -->
    <div class="filters">
      <select v-model="filters.status">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select v-model="filters.connectorType">
        <option value="">All Connector Types</option>
        <option value="Type-1">Type-1</option>
        <option value="Type-2">Type-2</option>
        <option value="CCS">CCS</option>
      </select>

      <input type="range" min="0" max="200" step="10" v-model.number="filters.powerLimit" />
      <label>Power ≤ {{ filters.powerLimit }} kW</label>
    </div>

    <div v-if="filteredStations.length === 0" class="empty">No stations found.</div>
    <div class="station-grid">
      <div class="station-card" v-for="station in filteredStations" :key="station._id">
        <h3>{{ station.name }}</h3>
        <p>⚡ {{ station.power }} kW — {{ station.status }}</p>
        <p>📍 Lat: {{ station.latitude }}, Lng: {{ station.longitude }}</p>
        <p>🔌 Connector: {{ station.connectorType }}</p>
        <div class="actions">
          <button @click="editStation(station._id)">✏️ Edit</button>
          <button class="delete" @click="deleteStation(station._id)">🗑️ Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../axios'

export default {
  name: 'DashboardView',
  data() {
    return {
      stations: [],
      filters: {
        status: '',
        connectorType: '',
        powerLimit: 200
      }
    }
  },
  computed: {
    filteredStations() {
      return this.stations.filter(s => {
        return (
          (!this.filters.status || s.status === this.filters.status) &&
          (!this.filters.connectorType || s.connectorType === this.filters.connectorType) &&
          s.power <= this.filters.powerLimit
        )
      })
    }
  },
  async created() {
    try {
      const res = await api.get('/stations')
      this.stations = res.data
    } catch (err) {
      console.error(err)
      this.$toast?.error('Failed to load stations.')
    }
  },
  methods: {
    editStation(id) {
      this.$router.push(`/edit/${id}`)
    },
    async deleteStation(id) {
      if (confirm('Are you sure you want to delete this station?')) {
        try {
          await api.delete(`/stations/${id}`)
          this.stations = this.stations.filter(s => s._id !== id)
          this.$toast?.success('Deleted successfully!')
        } catch (err) {
          console.error(err)
          this.$toast?.error('Delete failed.')
        }
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: linear-gradient(to right, #f1f8e9, #e0f7fa);
  min-height: 100vh;
}

.ev-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 10px;
}

.ev-header .logo {
  height: 40px;
}

.ev-header h2 {
  color: #004d40;
}

.top-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.btn {
  background: #4caf50;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.home-about-links {
  text-align: center;
  margin-bottom:20px;
  font-size: 18px;
}

.home-about-links a {
  color: #333;
  text-decoration: none;
  margin: 0 10px;
  font-weight: 500;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters select,
.filters input[type="range"] {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 180px;
}

.filters label {
  align-self: center;
  font-size: 14px;
  color: #555;
}

.empty {
  text-align: center;
  font-style: italic;
  color: #888;
}

.station-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.station-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.station-card h3 {
  margin-bottom: 10px;
  color: #00695c;
}

.station-card p {
  margin: 6px 0;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.actions button:hover {
  opacity: 0.9;
}

.actions .delete {
  background-color: #e53935;
  color: white;
}

.actions button:not(.delete) {
  background-color: #42b983;
  color: white;
}
</style>
