<template>
  <div class="container">
    <!-- Navigation Header -->
    <div class="nav-header">
      <router-link :to="{ name: 'detail', params: { id: id } }" class="cancel-btn">Cancel</router-link>
      <h2 class="nav-title">Edit Contact</h2>
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
    <div v-if="contact">
      <ContactForm 
        ref="formRef"
        :initial-data="contact"
        submit-label="Done" 
        @submit="handleSubmit"
        @valid-change="isFormValid = $event"
      />
    </div>

    <!-- Contact Not Found -->
    <div v-else class="not-found">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3>Contact Not Found</h3>
      <p>This contact may have been deleted</p>
      <router-link to="/" class="back-link">Back to Contacts</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'
import ContactForm from '../components/ContactForm.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { getContactById, updateContact } = useContacts()

const contact = ref(null)
const formRef = ref(null)
const isFormValid = ref(false)

onMounted(() => {
  contact.value = getContactById(props.id)
})

const handleSave = () => {
  if (formRef.value) {
    formRef.value.handleSubmit()
  }
}

const handleSubmit = (formData) => {
  updateContact(props.id, formData)
  router.push({ name: 'detail', params: { id: props.id } })
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

.not-found {
  text-align: center;
  padding: 120px 40px;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-icon {
  color: #d1d1d6;
  margin-bottom: 20px;
}

.not-found h3 {
  font-size: 22px;
  font-weight: 600;
  color: #1c1c1e;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
}

.not-found p {
  font-size: 16px;
  color: #8e8e93;
  margin-bottom: 24px;
  line-height: 1.5;
}

.back-link {
  color: #007aff;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 12px;
  background: white;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.back-link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.back-link:active {
  transform: scale(0.98);
}
</style>
