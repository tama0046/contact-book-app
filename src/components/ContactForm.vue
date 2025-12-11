<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <!-- Profile Photo -->
    <div class="photo-section">
      <input 
        type="file" 
        ref="fileInput" 
        @change="handlePhotoChange" 
        accept="image/*"
        style="display: none"
      />
      <div class="photo-circle" @click="triggerFileInput">
        <img v-if="form.photo" :src="form.photo" alt="Profile" class="photo-preview" />
        <span v-else-if="form.firstName || form.lastName" class="initials">
          {{ (form.firstName?.charAt(0) || '') + (form.lastName?.charAt(0) || '') }}
        </span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div v-if="form.photo" class="photo-overlay">
          <span>Edit</span>
        </div>
      </div>
      <button type="button" @click="triggerFileInput" class="photo-button">
        {{ form.photo ? 'Change Photo' : 'Add Photo' }}
      </button>
      <button v-if="form.photo" type="button" @click="removePhoto" class="photo-button remove">
        Remove Photo
      </button>
    </div>

    <!-- Personal Information -->
    <div class="form-section-header">Personal Information</div>
    <div class="form-card">
      <!-- First Name -->
      <div class="form-row" :class="{ 'has-error': errors.firstName }">
        <label class="field-label">First Name <span class="required">*</span></label>
        <input
          type="text"
          v-model="form.firstName"
          placeholder="Required"
          class="form-input"
          @blur="validateField('firstName')"
        />
      </div>
      <div class="error-message" v-if="errors.firstName">{{ errors.firstName }}</div>
      
      <!-- Last Name -->
      <div class="form-row">
        <label class="field-label">Last Name</label>
        <input
          type="text"
          v-model="form.lastName"
          placeholder="Optional"
          class="form-input"
        />
      </div>
      
      <!-- Company -->
      <div class="form-row last">
        <label class="field-label">Company</label>
        <input
          type="text"
          v-model="form.company"
          placeholder="Optional"
          class="form-input"
        />
      </div>
    </div>

    <!-- Contact Details -->
    <div class="form-section-header">Contact Details</div>
    <div class="form-card">
      <!-- Phone -->
      <div class="form-row" :class="{ 'has-error': errors.phone }">
        <label class="field-label">Phone</label>
        <input
          type="tel"
          v-model="form.phone"
          placeholder="(123) 456-7890"
          class="form-input"
          @blur="validateField('phone')"
        />
      </div>
      <div class="error-message" v-if="errors.phone">{{ errors.phone }}</div>

      <!-- Email -->
      <div class="form-row last" :class="{ 'has-error': errors.email }">
        <label class="field-label">Email <span class="required">*</span></label>
        <input
          type="email"
          v-model="form.email"
          placeholder="example@email.com"
          class="form-input"
          @blur="validateField('email')"
        />
      </div>
      <div class="error-message" v-if="errors.email">{{ errors.email }}</div>
    </div>

    <!-- Additional Information -->
    <div class="form-section-header">Additional Information</div>
    <div class="form-card">
      <!-- Address -->
      <div class="form-row">
        <label class="field-label">Address</label>
        <input
          type="text"
          v-model="form.address"
          placeholder="Street, City, State, ZIP"
          class="form-input"
        />
      </div>

      <!-- Notes -->
      <div class="form-row last no-border">
        <label class="field-label">Notes</label>
        <textarea
          v-model="form.notes"
          placeholder="Add any additional notes..."
          class="form-textarea"
          rows="4"
        ></textarea>
      </div>
    </div>

    <!-- Form Hint -->
    <div class="form-hint">
      <span class="required">*</span> Required fields
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, computed, ref } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      company: '',
      photo: ''
    })
  },
  submitLabel: {
    type: String,
    default: 'Done'
  }
})

const emit = defineEmits(['submit', 'valid-change'])

const fileInput = ref(null)

const form = reactive({
  firstName: props.initialData.firstName || '',
  lastName: props.initialData.lastName || '',
  email: props.initialData.email || '',
  phone: props.initialData.phone || '',
  address: props.initialData.address || '',
  notes: props.initialData.notes || '',
  company: props.initialData.company || '',
  photo: props.initialData.photo || ''
})

const errors = reactive({
  firstName: '',
  email: '',
  phone: ''
})

// Watch for initial data changes
watch(() => props.initialData, (newData) => {
  form.firstName = newData.firstName || ''
  form.lastName = newData.lastName || ''
  form.email = newData.email || ''
  form.phone = newData.phone || ''
  form.address = newData.address || ''
  form.notes = newData.notes || ''
  form.company = newData.company || ''
  form.photo = newData.photo || ''
}, { deep: true })

// Photo handling
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handlePhotoChange = (event) => {
  const file = event.target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.photo = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = () => {
  form.photo = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Validation
const validateFirstName = () => {
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
    return false
  }
  if (form.firstName.trim().length < 2) {
    errors.firstName = 'Minimum 2 characters required'
    return false
  }
  errors.firstName = ''
  return true
}

const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    return false
  }
  // Standard email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  errors.email = ''
  return true
}

const validatePhone = () => {
  if (form.phone && form.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Phone must have at least 10 digits'
    return false
  }
  errors.phone = ''
  return true
}

// Check if form is valid
const isValid = computed(() => {
  const firstNameValid = form.firstName.trim().length >= 2
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailValid = emailRegex.test(form.email)
  return firstNameValid && emailValid
})

// Watch validity and emit
watch(isValid, (valid) => {
  emit('valid-change', valid)
}, { immediate: true })

// Validate on blur
const validateField = (field) => {
  switch(field) {
    case 'firstName': validateFirstName(); break
    case 'email': validateEmail(); break
    case 'phone': validatePhone(); break
  }
}

// Handle form submission
const handleSubmit = () => {
  const isFirstNameValid = validateFirstName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()

  if (isFirstNameValid && isEmailValid && isPhoneValid) {
    emit('submit', { ...form })
  }
}

// Expose submit method for parent
defineExpose({ handleSubmit, isValid })
</script>

<style scoped>
.contact-form {
  padding-bottom: 10px;
}

.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 32px;
  gap: 12px;
}

.photo-circle {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.25);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.photo-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 122, 255, 0.35);
}

.photo-circle:active {
  transform: scale(0.98);
}

.photo-circle .initials {
  text-transform: uppercase;
  user-select: none;
}

.photo-circle svg {
  color: rgba(255, 255, 255, 0.7);
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: white;
  padding: 6px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.photo-circle:hover .photo-overlay {
  opacity: 1;
}

.photo-button {
  background: none;
  border: none;
  color: #007aff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.photo-button:hover {
  background: rgba(0, 122, 255, 0.08);
}

.photo-button:active {
  background: rgba(0, 122, 255, 0.15);
  transform: scale(0.98);
}

.photo-button.remove {
  color: #ff3b30;
}

.photo-button.remove:hover {
  background: rgba(255, 59, 48, 0.08);
}

/* Section Headers */
.form-section-header {
  font-size: 13px;
  font-weight: 600;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 20px 16px 8px;
}

/* Form Cards */
.form-card {
  background: white;
  margin: 0 16px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-row {
  padding: 12px 16px;
  border-bottom: 0.5px solid #e5e5ea;
  transition: background 0.2s ease;
}

.form-row:focus-within {
  background: #f9f9f9;
}

.form-row.last {
  border-bottom: none;
}

.form-row.no-border {
  border-bottom: none;
}

.form-row.has-error {
  background: #fff5f5;
}

.field-label {
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #1c1c1e;
  margin-bottom: 6px;
}

.required {
  color: #ff3b30;
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 8px 0;
  font-size: 17px;
  border: none;
  outline: none;
  background: transparent;
  color: #1c1c1e;
}

.form-input::placeholder {
  color: #c7c7cc;
}

.form-textarea {
  width: 100%;
  padding: 8px 0;
  font-size: 17px;
  border: none;
  outline: none;
  background: transparent;
  color: #1c1c1e;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
}

.form-textarea::placeholder {
  color: #c7c7cc;
}

/* Error Messages */
.error-message {
  font-size: 13px;
  color: #ff3b30;
  padding: 8px 16px 12px;
  background: white;
  margin: -8px 16px 0;
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-message::before {
  content: "⚠";
  font-size: 14px;
}

/* Form Hint */
.form-hint {
  font-size: 13px;
  color: #8e8e93;
  text-align: center;
  padding: 16px;
  margin-top: 8px;
}
</style>
