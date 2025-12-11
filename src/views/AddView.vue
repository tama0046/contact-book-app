<template>
  <div class="container">
    <!-- Navigation Header -->
    <div class="nav-header">
      <router-link to="/" class="cancel-btn">Cancel</router-link>
      <h2 class="nav-title">New Contact</h2>
      <button 
        @click="handleSave" 
        class="done-btn"
        :disabled="!isFormValid"
        :class="{ 'disabled': !isFormValid }"
      >
        Done
      </button>
    </div>

    <!-- Form -->
    <ContactForm 
      ref="formRef"
      submit-label="Done" 
      @submit="handleSubmit"
      @valid-change="isFormValid = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'
import ContactForm from '../components/ContactForm.vue'

const router = useRouter()
const { addContact } = useContacts()

const formRef = ref(null)
const isFormValid = ref(false)

const handleSave = () => {
  if (formRef.value) {
    formRef.value.handleSubmit()
  }
}

const handleSubmit = (formData) => {
  const newContact = addContact(formData)
  router.push({ name: 'detail', params: { id: newContact.id } })
}
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f2f2f7;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 0.5px solid #e5e5ea;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.cancel-btn {
  color: #007aff;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  min-width: 70px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: rgba(0, 122, 255, 0.08);
}

.cancel-btn:active {
  background: rgba(0, 122, 255, 0.15);
}

.nav-title {
  font-size: 17px;
  font-weight: 600;
  color: #1c1c1e;
  letter-spacing: -0.2px;
}

.done-btn {
  color: #007aff;
  font-size: 17px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  min-width: 70px;
  text-align: right;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.done-btn:hover:not(.disabled) {
  background: rgba(0, 122, 255, 0.08);
}

.done-btn:active:not(.disabled) {
  background: rgba(0, 122, 255, 0.15);
}

.done-btn.disabled {
  color: #c7c7cc;
  cursor: not-allowed;
}
</style>
