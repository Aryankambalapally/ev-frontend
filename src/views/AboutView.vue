<template>
  <div class="about">
    <img class="about-image" src="https://cdn-icons-png.flaticon.com/512/2548/2548441.png" alt="Charging Illustration" />
    <h1>About This Project</h1>
    <p>
      ⚡ <strong>EV Charging Station Manager</strong> is a simple and modern web application built for
      managing electric vehicle charging stations.
    </p>
    <p>
      🌍 You can <strong>add</strong>, <strong>edit</strong>, <strong>delete</strong> and <strong>view stations on a map</strong> with real-time location and power filtering.
    </p>
    <p>
      🔐 Users can securely <strong>register</strong> and <strong>log in</strong> with JWT authentication to manage their own stations.
    </p>
    

    <p class="footer-note"> by Aryan Kambalapally</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  padding: 40px 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  color: #2c3e50;
  background: linear-gradient(to bottom, #f0fff0, #e0f7fa);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.about-image {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  color: #00695c;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li::before {
  content: '';
}

.footer-note {
  margin-top: 30px;
  font-size: 14px;
  font-style: italic;
  color: #777;
}
</style>
