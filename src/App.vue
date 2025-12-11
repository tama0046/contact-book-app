<template>
  <div class="app">
    <router-view />
    <footer class="app-footer">
      <p>Built with <span class="tech">Vue 3</span> · <span class="tech">Vite</span> · <span class="tech">Vue Router</span></p>
      <p class="copyright">© 2025 Contact Book</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
/* App styles are in style.css */

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-footer {
  background: white;
  padding: 24px 16px;
  text-align: center;
  border-top: 1px solid #e5e5ea;
  margin-top: 0;
}

.app-footer p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6c6c70;
  font-weight: 400;
  line-height: 1.6;
}

.app-footer p:last-child {
  margin-bottom: 0;
}

.app-footer .tech {
  color: #007aff;
  font-weight: 500;
}

.app-footer .copyright {
  font-size: 12px;
  color: #8e8e93;
  margin-top: 8px;
}
</style>
