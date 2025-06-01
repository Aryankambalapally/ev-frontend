<template>
  <div class="map-container">
    <LMap :zoom="5" :center="[22.9734, 78.6569]" style="height: 100vh; width: 100%;">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LMarker
        v-for="station in stations"
        :key="station._id"
        :lat-lng="[station.latitude, station.longitude]"
      >
        <LPopup>
          <strong>{{ station.name }}</strong><br />
          ⚡ {{ station.power }} kW<br />
          🔌 {{ station.connectorType }}
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../axios";

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      stations: [],
    };
  },
  async created() {
    try {
      const res = await api.get("/stations");
      this.stations = res.data;
    } catch (err) {
      console.error("Failed to load map stations:", err);
    }
  },
};
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>
