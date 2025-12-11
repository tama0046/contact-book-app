<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1>📇 Contact Book</h1>
      <p>Manage your contacts with ease</p>
    </header>

    <!-- Main Content Card -->
    <div class="card">
      <!-- Action Header -->
      <div class="action-header">
        <h2>All Contacts ({{ filteredContacts.length }})</h2>
        <router-link to="/add" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Contact
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="🔍 Search contacts by name..."
          class="search-input"
        />
      </div>

      <!-- Contact List -->
      <div v-if="Object.keys(groupedContacts).length > 0">
        <div v-for="(contacts, letter) in groupedContacts" :key="letter" class="letter-group">
          <div class="letter-heading">{{ letter }}</div>
          <ul class="contact-list">
            <li
              v-for="contact in contacts"
              :key="contact.id"
              class="contact-item"
              @click="viewContact(contact.id)"
            >
              <div class="contact-avatar">
                {{ getInitials(contact) }}
              </div>
              <div class="contact-info">
                <h3>{{ contact.lastName }}, {{ contact.firstName }}</h3>
                <p>{{ contact.email }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-state-icon">👥</div>
        <h3 v-if="searchTerm">No contacts found</h3>
        <h3 v-else>No contacts yet</h3>
        <p v-if="searchTerm">Try a different search term</p>
        <p v-else>Start by adding your first contact</p>
        <router-link v-if="!searchTerm" to="/add" class="btn btn-primary">
          Add Your First Contact
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getContacts, 
  sortContactsByLastName, 
  filterContacts, 
  groupContactsByLetter 
} from '../services/contactService'

const router = useRouter()
const contacts = ref([])
const searchTerm = ref('')

// Load contacts on mount
onMounted(() => {
  loadContacts()
})

const loadContacts = () => {
  contacts.value = getContacts()
}

// Computed: Filter and sort contacts
const filteredContacts = computed(() => {
  const filtered = filterContacts(contacts.value, searchTerm.value)
  return sortContactsByLastName(filtered)
})

// Computed: Group contacts by first letter of last name
const groupedContacts = computed(() => {
  return groupContactsByLetter(filteredContacts.value)
})

// Get contact initials for avatar
const getInitials = (contact) => {
  return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
}

// Navigate to contact detail
const viewContact = (id) => {
  router.push({ name: 'contact-detail', params: { id } })
}
</script>
