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

    <!-- Contact Detail Card -->
    <div class="card" v-if="contact">
      <div class="contact-detail">
        <!-- Avatar -->
        <div class="contact-detail-avatar">
          {{ getInitials(contact) }}
        </div>

        <!-- Name -->
        <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>

        <!-- Contact Information -->
        <div class="contact-detail-info">
          <div class="detail-row">
            <span class="detail-label">📧 Email</span>
            <span class="detail-value">{{ contact.email || 'Not provided' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📱 Phone</span>
            <span class="detail-value">{{ contact.phone || 'Not provided' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📍 Address</span>
            <span class="detail-value">{{ contact.address || 'Not provided' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📝 Notes</span>
            <span class="detail-value">{{ contact.notes || 'No notes' }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="btn-group" style="justify-content: center;">
          <router-link :to="{ name: 'edit-contact', params: { id: contact.id } }" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Contact
          </router-link>
          <button @click="showDeleteModal = true" class="btn btn-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Contact
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Not Found -->
    <div class="card" v-else>
      <div class="empty-state">
        <div class="empty-state-icon">❓</div>
        <h3>Contact not found</h3>
        <p>The contact you're looking for doesn't exist or has been deleted.</p>
        <router-link to="/" class="btn btn-primary">
          Go to Contact List
        </router-link>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal">
        <h3>Delete Contact</h3>
        <p>Are you sure you want to delete <strong>{{ contact?.firstName }} {{ contact?.lastName }}</strong>? This action cannot be undone.</p>
        <div class="btn-group">
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="handleDelete" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getContactById, deleteContact } from '../services/contactService'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const route = useRoute()
const showToast = inject('showToast')

const contact = ref(null)
const showDeleteModal = ref(false)

// Load contact on mount
onMounted(() => {
  loadContact()
})

const loadContact = () => {
  contact.value = getContactById(props.id)
}

// Get contact initials for avatar
const getInitials = (contact) => {
  return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
}

// Handle delete contact
const handleDelete = () => {
  if (contact.value) {
    deleteContact(contact.value.id)
    showToast(`${contact.value.firstName} ${contact.value.lastName} has been deleted`, 'success')
    showDeleteModal.value = false
    router.push({ name: 'home' })
  }
}
</script>
