<template>
  <div>
    <!-- Contact List - Each Contact Separate -->
    <div v-if="Object.keys(groupedContacts).length > 0" class="contact-sections">
      <div v-for="(contacts, letter) in groupedContacts" :key="letter" class="contact-section">
        <div class="section-header">{{ letter }}</div>
        <!-- Each contact in its own card -->
        <div v-for="contact in contacts" :key="contact.id" class="contact-card">
          <div class="contact-row" @click="$emit('select', contact.id)">
            <div class="contact-avatar" :class="{ 'blocked': contact.isBlocked }">
              <img v-if="contact.photo" :src="contact.photo" :alt="contact.firstName" class="avatar-image" />
              <span v-else class="avatar-initials">{{ getInitials(contact) }}</span>
            </div>
            <div class="contact-info">
              <span class="contact-name">
                {{ contact.firstName }} {{ contact.lastName }}
              </span>
              <span v-if="contact.isBlocked" class="blocked-status">Blocked</span>
            </div>
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <div v-if="contact.isBlocked" class="contact-actions">
            <button 
              @click.stop="$emit('toggle-block', contact.id)" 
              class="action-button unblock"
            >
              Unblock
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h3 v-if="hasSearch">No Results</h3>
      <h3 v-else>No Contacts</h3>
      <p v-if="hasSearch">No contacts match your search</p>
      <p v-else>Tap + to add a new contact</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  groupedContacts: {
    type: Object,
    required: true
  },
  hasSearch: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'toggle-block'])

const getInitials = (contact) => {
  const first = contact.firstName ? contact.firstName.charAt(0) : ''
  const last = contact.lastName ? contact.lastName.charAt(0) : ''
  return (first + last).toUpperCase() || '?'
}
</script>

<style scoped>
.contact-sections {
  padding-bottom: 10px;
}

.contact-section {
  margin-bottom: 4px;
}

.section-header {
  font-size: 13px;
  font-weight: 700;
  color: #6c6c70;
  padding: 12px 16px 6px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: #f2f2f7;
  position: sticky;
  top: 0;
  z-index: 5;
}

.contact-card {
  background: white;
  margin: 0 16px 10px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.contact-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.contact-row {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.contact-row:hover {
  background: #f9f9f9;
}

.contact-row:active {
  background: #f0f0f0;
}

.contact-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.25);
  transition: transform 0.2s ease;
  overflow: hidden;
  position: relative;
}

.contact-card:hover .contact-avatar {
  transform: scale(1.05);
}

.contact-avatar.blocked {
  background: linear-gradient(135deg, #8e8e93 0%, #636366 100%);
  box-shadow: 0 2px 8px rgba(142, 142, 147, 0.25);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.contact-name {
  font-size: 17px;
  font-weight: 500;
  color: #1c1c1e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.2px;
}

.blocked-status {
  font-size: 13px;
  color: #ff3b30;
  font-weight: 400;
}

.chevron {
  color: #c7c7cc;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.contact-card:hover .chevron {
  transform: translateX(2px);
}

.contact-actions {
  padding: 0 16px 12px;
  border-top: 0.5px solid #e5e5ea;
  background: #f9f9f9;
}

.action-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  margin-top: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #ff3b30;
  background: white;
  border: 1px solid #ff3b30;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #ff3b30;
  color: white;
}

.action-button:active {
  transform: scale(0.98);
}

.action-button.unblock {
  color: #34c759;
  border-color: #34c759;
}

.action-button.unblock:hover {
  background: #34c759;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 100px 40px;
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
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.empty-state h3 {
  font-size: 22px;
  font-weight: 600;
  color: #1c1c1e;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
}

.empty-state p {
  font-size: 16px;
  color: #8e8e93;
  line-height: 1.5;
}
</style>
