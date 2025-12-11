<template>
  <div class="container">
    <!-- Status Bar Spacer -->
    <div class="status-bar"></div>
    
    <!-- Header -->
    <header class="header">
      <h1>Contacts</h1>
      <router-link to="/add" class="add-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </router-link>
    </header>

    <!-- Search Bar Component -->
    <SearchBar v-model="searchTerm" />

    <!-- Contact Count -->
    <div class="contact-count">{{ filteredContacts.length }} Contacts</div>

    <!-- Contact List Component -->
    <ContactList 
      :grouped-contacts="groupedContacts" 
      :has-search="!!searchTerm"
      @select="viewContact"
      @toggle-block="handleToggleBlock"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'
import SearchBar from '../components/SearchBar.vue'
import ContactList from '../components/ContactList.vue'

const router = useRouter()
const { filterContacts, groupContactsByLetter, toggleBlockContact } = useContacts()

const searchTerm = ref('')

// Computed: Filter contacts based on search
const filteredContacts = computed(() => {
  return filterContacts(searchTerm.value)
})

// Computed: Group contacts by first letter of last name
const groupedContacts = computed(() => {
  return groupContactsByLetter(filteredContacts.value)
})

// Navigate to contact detail
const viewContact = (id) => {
  router.push({ name: 'detail', params: { id } })
}

// Toggle block status
const handleToggleBlock = (id) => {
  toggleBlockContact(id)
}
</script>

<style scoped>
.status-bar {
  height: 44px;
  background: #f2f2f7;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px;
  background: #f2f2f7;
}

.header h1 {
  font-size: 34px;
  font-weight: 700;
  color: #1c1c1e;
  letter-spacing: -0.5px;
}

.add-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007aff;
  text-decoration: none;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: rgba(0, 122, 255, 0.08);
  transform: scale(1.05);
}

.add-btn:active {
  background: rgba(0, 122, 255, 0.15);
  transform: scale(0.95);
}

.contact-count {
  font-size: 13px;
  font-weight: 500;
  color: #8e8e93;
  text-align: center;
  padding: 8px 16px 8px;
  letter-spacing: 0.2px;
}
</style>
