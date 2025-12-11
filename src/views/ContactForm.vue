<template>
  <div class="container">
    <!-- Back Navigation -->
    <router-link to="/" class="nav-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Back to Contacts
    </router-link>

    <!-- Form Card -->
    <div class="card">
      <h2 style="margin-bottom: 25px; color: #333;">
        {{ isEditMode ? '✏️ Edit Contact' : '➕ Add New Contact' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            placeholder="Enter first name"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            placeholder="Enter last name"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email *</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter email address"
            required
          />
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            placeholder="Enter phone number"
          />
        </div>

        <!-- Address -->
        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            placeholder="Enter address"
          />
        </div>

        <!-- Notes -->
        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea
            id="notes"
            v-model="form.notes"
            placeholder="Add any additional notes..."
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="btn-group">
          <button type="submit" class="btn btn-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            {{ isEditMode ? 'Update Contact' : 'Save Contact' }}
          </button>
          <router-link to="/" class="btn btn-secondary">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getContactById, addContact, updateContact } from '../services/contactService'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const router = useRouter()
const route = useRoute()
const showToast = inject('showToast')

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  notes: ''
})

// Check if we're in edit mode
const isEditMode = computed(() => {
  return !!props.id
})

// Load contact data if editing
onMounted(() => {
  if (isEditMode.value) {
    const contact = getContactById(props.id)
    if (contact) {
      form.value = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone || '',
        address: contact.address || '',
        notes: contact.notes || ''
      }
    } else {
      showToast('Contact not found', 'error')
      router.push({ name: 'home' })
    }
  }
})

// Handle form submission
const handleSubmit = () => {
  // Validate required fields
  if (!form.value.firstName.trim() || !form.value.lastName.trim() || !form.value.email.trim()) {
    showToast('Please fill in all required fields', 'error')
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    showToast('Please enter a valid email address', 'error')
    return
  }

  if (isEditMode.value) {
    // Update existing contact
    const updatedContact = updateContact(props.id, form.value)
    if (updatedContact) {
      showToast(`${form.value.firstName} ${form.value.lastName} has been updated`, 'success')
      router.push({ name: 'contact-detail', params: { id: props.id } })
    }
  } else {
    // Add new contact
    const newContact = addContact(form.value)
    showToast(`${form.value.firstName} ${form.value.lastName} has been added`, 'success')
    router.push({ name: 'contact-detail', params: { id: newContact.id } })
  }
}
</script>
