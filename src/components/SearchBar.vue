<template>
  <div class="search-wrapper">
    <div class="search-bar">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search"
        class="search-input"
      />
      <button 
        v-if="modelValue" 
        @click="$emit('update:modelValue', '')"
        class="clear-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#8e8e93"/>
          <line x1="8" y1="8" x2="16" y2="16" stroke="white" stroke-width="2"/>
          <line x1="16" y1="8" x2="8" y2="16" stroke="white" stroke-width="2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-wrapper {
  padding: 0 16px 8px;
  background: #f2f2f7;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(229, 229, 234, 0.9);
  border-radius: 10px;
  padding: 9px 12px;
  gap: 8px;
  transition: all 0.2s ease;
  backdrop-filter: blur(20px);
}

.search-bar:focus-within {
  background: rgba(229, 229, 234, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-icon {
  color: #8e8e93;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.search-bar:focus-within .search-icon {
  color: #007aff;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 17px;
  color: #1c1c1e;
  outline: none;
}

.search-input::placeholder {
  color: #8e8e93;
}

.clear-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  transform: scale(1.1);
}

.clear-btn:active {
  transform: scale(0.9);
}
</style>
