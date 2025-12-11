<template>
  <div class="container">
    <!-- Navigation Header -->
    <div class="nav-header">
      <router-link to="/" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>Contacts</span>
      </router-link>
      <router-link v-if="contact" :to="{ name: 'edit', params: { id: contact.id } }" class="edit-btn">
        Edit
      </router-link>
    </div>

    <!-- Contact Detail -->
    <div v-if="contact" class="contact-detail">
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-avatar" :class="{ 'blocked': contact.isBlocked }">
          <img v-if="contact.photo" :src="contact.photo" :alt="contact.firstName" class="profile-image" />
          <span v-else class="profile-initials">{{ getInitials(contact) }}</span>
        </div>
        <h1 class="profile-name">{{ contact.firstName }} {{ contact.lastName }}</h1>
        <span v-if="contact.company" class="profile-company">{{ contact.company }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <a :href="'tel:' + contact.phone" class="action-btn" v-if="contact.phone">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <span>Call</span>
        </a>
        <a :href="'sms:' + contact.phone" class="action-btn" v-if="contact.phone">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span>Message</span>
        </a>
        <a :href="'mailto:' + contact.email" class="action-btn" v-if="contact.email">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <span>Mail</span>
        </a>
      </div>

      <!-- Contact Info Card -->
      <div class="info-card">
        <div class="info-row" v-if="contact.phone">
          <span class="info-label">mobile</span>
          <a :href="'tel:' + contact.phone" class="info-value link">{{ contact.phone }}</a>
        </div>
        <div class="info-row" v-if="contact.email">
          <span class="info-label">email</span>
          <a :href="'mailto:' + contact.email" class="info-value link">{{ contact.email }}</a>
        </div>
        <div class="info-row" v-if="contact.address">
          <span class="info-label">address</span>
          <span class="info-value">{{ contact.address }}</span>
        </div>
      </div>

      <!-- Notes Card -->
      <div class="info-card" v-if="contact.notes">
        <div class="info-row single">
          <span class="info-label">Notes</span>
          <p class="info-notes">{{ contact.notes }}</p>
        </div>
      </div>

      <!-- Block/Unblock Card -->
      <div class="info-card action-card">
        <button @click="handleToggleBlock" class="action-row" :class="{ 'unblock': contact.isBlocked }">
          <svg v-if="!contact.isBlocked" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {{ contact.isBlocked ? 'Unblock this Caller' : 'Block this Caller' }}
        </button>
        <p v-if="contact.isBlocked" class="block-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          You can still call, text, and email this contact
        </p>
      </div>

      <!-- Delete Card -->
      <div class="info-card action-card">
        <button @click="showDeleteModal = true" class="action-row delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete Contact
        </button>
      </div>
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
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
        <div class="modal-sheet">
          <div class="modal-header">
            <h3>Delete Contact?</h3>
            <p>This action cannot be undone. {{ contact?.firstName }} {{ contact?.lastName }} will be permanently removed from your contacts.</p>
          </div>
          <div class="modal-actions">
            <button @click="handleDelete" class="modal-btn danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Delete Contact
            </button>
          </div>
          <button @click="showDeleteModal = false" class="modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContacts } from '../composables/useContacts'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { getContactById, deleteContact, toggleBlockContact } = useContacts()

const contact = ref(null)
const showDeleteModal = ref(false)

onMounted(() => {
  contact.value = getContactById(props.id)
})

const getInitials = (contact) => {
  const first = contact.firstName ? contact.firstName.charAt(0) : ''
  const last = contact.lastName ? contact.lastName.charAt(0) : ''
  return (first + last).toUpperCase() || '?'
}

const handleToggleBlock = () => {
  if (contact.value) {
    toggleBlockContact(contact.value.id)
    contact.value = getContactById(props.id)
  }
}

const handleDelete = () => {
  if (contact.value) {
    deleteContact(contact.value.id)
    showDeleteModal.value = false
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  background: #f2f2f7;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.back-btn {
  display: flex;
  align-items: center;
  color: #007aff;
  text-decoration: none;
  font-size: 17px;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(0, 122, 255, 0.08);
}

.back-btn:active {
  background: rgba(0, 122, 255, 0.15);
}

.edit-btn {
  color: #007aff;
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: rgba(0, 122, 255, 0.08);
}

.edit-btn:active {
  background: rgba(0, 122, 255, 0.15);
}

.contact-detail {
  padding-bottom: 10px;
  animation: fadeIn 0.3s ease;
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

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 28px;
  background: #f2f2f7;
}

.profile-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 14px;
  box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
  transition: transform 0.2s ease;
  overflow: hidden;
  position: relative;
}

.profile-avatar:hover {
  transform: scale(1.03);
}

.profile-avatar.blocked {
  background: linear-gradient(135deg, #8e8e93 0%, #636366 100%);
  box-shadow: 0 4px 20px rgba(142, 142, 147, 0.3);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.profile-name {
  font-size: 28px;
  font-weight: 700;
  color: #1c1c1e;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
  text-align: center;
}

.profile-company {
  font-size: 16px;
  color: #8e8e93;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0 16px 24px;
  background: #f2f2f7;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  min-width: 70px;
  transition: transform 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.action-btn:active {
  transform: translateY(0);
}

.action-icon {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007aff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.action-btn:hover .action-icon {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  background: #007aff;
  color: white;
}

.action-btn span {
  font-size: 12px;
  font-weight: 500;
  color: #007aff;
  letter-spacing: 0.2px;
}

.info-card {
  background: white;
  margin: 0 16px 12px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.info-row {
  padding: 14px 16px;
  border-bottom: 0.5px solid #e5e5ea;
  transition: background 0.2s ease;
}

.info-row:hover {
  background: #f9f9f9;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row.single {
  border-bottom: none;
}

.info-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #8e8e93;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
}

.info-value {
  font-size: 17px;
  color: #1c1c1e;
  text-decoration: none;
  display: block;
  letter-spacing: -0.2px;
}

.info-value.link {
  color: #007aff;
  transition: color 0.2s ease;
}

.info-value.link:hover {
  color: #0051d5;
}

.info-notes {
  font-size: 16px;
  color: #1c1c1e;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.5;
}

.action-card {
  margin-top: 20px;
}

.action-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 16px;
  font-size: 17px;
  font-weight: 500;
  color: #ff3b30;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-row:hover {
  background: rgba(255, 59, 48, 0.08);
}

.action-row:active {
  background: rgba(255, 59, 48, 0.15);
}

.action-row.unblock {
  color: #34c759;
}

.action-row.unblock:hover {
  background: rgba(52, 199, 89, 0.08);
}

.action-row.unblock:active {
  background: rgba(52, 199, 89, 0.15);
}

.action-row.delete {
  color: #ff3b30;
}

.action-row.delete:active {
  background: rgba(255, 59, 48, 0.15);
}

.block-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  margin: 0;
  font-size: 13px;
  color: #8e8e93;
  background: #f2f2f7;
  border-radius: 0 0 12px 12px;
  margin-top: -12px;
  padding-top: 8px;
}

.block-info svg {
  flex-shrink: 0;
  opacity: 0.7;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: fadeInOverlay 0.2s ease;
}

@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-sheet {
  background: transparent;
  border-radius: 14px 14px 0 0;
  width: 100%;
  max-width: 430px;
  padding: 0 8px 8px;
  padding-bottom: max(env(safe-area-inset-bottom, 8px), 8px);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { 
    transform: translateY(100%);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  text-align: center;
  padding: 24px 20px;
  margin-bottom: 8px;
}

.modal-header h3 {
  font-size: 17px;
  font-weight: 600;
  color: #1c1c1e;
  margin-bottom: 8px;
  letter-spacing: -0.2px;
}

.modal-header p {
  font-size: 13px;
  line-height: 1.5;
  color: #8e8e93;
  font-weight: 400;
}

.modal-actions {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 8px;
}

.modal-btn {
  width: 100%;
  padding: 16px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease;
}

.modal-btn:active {
  background: rgba(0, 0, 0, 0.05);
}

.modal-btn.danger {
  color: #ff3b30;
  font-weight: 600;
}

.modal-cancel {
  width: 100%;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  color: #007aff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-cancel:active {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(0.98);
}
</style>
