import { ref, computed } from 'vue'

// Local Storage Key
const STORAGE_KEY = 'contact-book-contacts'
const VERSION_KEY = 'contact-book-version'
const CURRENT_VERSION = '5.1' // Sorted by last name, grouped by first name

// Reactive contacts state
const contacts = ref([])

// Load contacts from local storage
const loadContacts = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const storedVersion = localStorage.getItem(VERSION_KEY)
  
  // If version doesn't match, clear old data and reload defaults
  if (stored && storedVersion === CURRENT_VERSION) {
    contacts.value = JSON.parse(stored)
  } else {
    // Initialize with your contacts
    const initialContacts = [
      {
        id: generateId(),
        firstName: 'Maina',
        lastName: 'Tamang',
        email: 'maina.tamang@email.com',
        phone: '(555) 123-4567',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      },
      {
        id: generateId(),
        firstName: 'Saskar',
        lastName: 'Baniya',
        email: 'saskar.baniya@email.com',
        phone: '(555) 234-5678',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      },
      {
        id: generateId(),
        firstName: 'Nirajana',
        lastName: 'Dost',
        email: 'nirajana.dost@email.com',
        phone: '(555) 345-6789',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      },
      {
        id: generateId(),
        firstName: 'Punjabi Bhai',
        lastName: '',
        email: 'punjabi.bhai@email.com',
        phone: '(555) 456-7890',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      },
      {
        id: generateId(),
        firstName: 'Ibhrim',
        lastName: '',
        email: 'ibhrim@email.com',
        phone: '(555) 567-8901',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      },
      {
        id: generateId(),
        firstName: 'Roshan',
        lastName: '',
        email: 'roshan@email.com',
        phone: '(555) 678-9012',
        address: '',
        notes: '',
        photo: '',
        isBlocked: false
      }
    ]
    contacts.value = initialContacts
    saveContacts()
    // Save version
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
  }
}

// Save contacts to local storage
const saveContacts = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts.value))
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Composable function
export function useContacts() {
  // Initialize contacts if empty
  if (contacts.value.length === 0) {
    loadContacts()
  }

  // Get contact by ID
  const getContactById = (id) => {
    return contacts.value.find(contact => contact.id === id) || null
  }

  // Add new contact
  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: generateId(),
      isBlocked: false
    }
    contacts.value.push(newContact)
    saveContacts()
    return newContact
  }

  // Update existing contact
  const updateContact = (id, updatedData) => {
    const index = contacts.value.findIndex(contact => contact.id === id)
    if (index !== -1) {
      contacts.value[index] = { ...contacts.value[index], ...updatedData }
      saveContacts()
      return contacts.value[index]
    }
    return null
  }

  // Delete contact
  const deleteContact = (id) => {
    const index = contacts.value.findIndex(contact => contact.id === id)
    if (index !== -1) {
      contacts.value.splice(index, 1)
      saveContacts()
      return true
    }
    return false
  }

  // Toggle block status
  const toggleBlockContact = (id) => {
    const index = contacts.value.findIndex(contact => contact.id === id)
    if (index !== -1) {
      contacts.value[index].isBlocked = !contacts.value[index].isBlocked
      saveContacts()
      return contacts.value[index]
    }
    return null
  }

  // Sort contacts alphabetically by last name (then first name)
  const sortedContacts = computed(() => {
    return [...contacts.value].sort((a, b) => {
      const lastNameA = (a.lastName || '').toLowerCase()
      const lastNameB = (b.lastName || '').toLowerCase()
      
      // Sort by last name first
      if (lastNameA < lastNameB) return -1
      if (lastNameA > lastNameB) return 1
      
      // If last names are equal, sort by first name
      const firstNameA = a.firstName.toLowerCase()
      const firstNameB = b.firstName.toLowerCase()
      if (firstNameA < firstNameB) return -1
      if (firstNameA > firstNameB) return 1
      return 0
    })
  })

  // Filter contacts by search term
  const filterContacts = (searchTerm) => {
    if (!searchTerm) return sortedContacts.value
    const term = searchTerm.toLowerCase().trim()
    return sortedContacts.value.filter(contact => {
      const firstName = contact.firstName.toLowerCase()
      const lastName = (contact.lastName || '').toLowerCase()
      const fullName = `${firstName} ${lastName}`
      return firstName.includes(term) || 
             lastName.includes(term) || 
             fullName.includes(term)
    })
  }

  // Group contacts by first letter of FIRST NAME (but contacts are sorted by last name)
  const groupContactsByLetter = (contactList) => {
    const groups = {}
    contactList.forEach(contact => {
      // Use first letter of FIRST NAME for grouping
      const letter = contact.firstName.charAt(0).toUpperCase()
      
      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(contact)
    })
    
    // Sort the groups alphabetically
    const sortedGroups = {}
    Object.keys(groups).sort().forEach(key => {
      sortedGroups[key] = groups[key]
    })
    return sortedGroups
  }

  // Clear all contacts and reload defaults
  const resetContacts = () => {
    localStorage.removeItem(STORAGE_KEY)
    contacts.value = []
    loadContacts()
  }

  return {
    contacts,
    sortedContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    toggleBlockContact,
    filterContacts,
    groupContactsByLetter,
    loadContacts,
    resetContacts
  }
}
