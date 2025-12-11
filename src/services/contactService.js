// Local Storage Key
const STORAGE_KEY = 'contact-book-contacts'

// Get all contacts from local storage
export const getContacts = () => {
  const contacts = localStorage.getItem(STORAGE_KEY)
  if (contacts) {
    return JSON.parse(contacts)
  }
  // Return sample contacts if none exist
  const sampleContacts = [
    {
      id: generateId(),
      firstName: 'Maina',
      lastName: 'Tamang',
      email: 'maina.tamang@email.com',
      phone: '(555) 123-4567',
      address: '123 Main Street, Kathmandu',
      notes: 'Friend',
      photo: ''
    },
    {
      id: generateId(),
      firstName: 'Saskar',
      lastName: 'Baniya',
      email: 'saskar.baniya@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Avenue, Lalitpur',
      notes: 'Colleague',
      photo: ''
    },
    {
      id: generateId(),
      firstName: 'Nirajana',
      lastName: 'Dost',
      email: 'nirajana.dost@email.com',
      phone: '(555) 345-6789',
      address: '789 Pine Road, Bhaktapur',
      notes: 'Best friend',
      photo: ''
    },
    {
      id: generateId(),
      firstName: 'Punjabi',
      lastName: 'Bhai',
      email: 'punjabi.bhai@email.com',
      phone: '(555) 456-7890',
      address: '321 Elm Street, Pokhara',
      notes: 'Friend',
      photo: ''
    },
    {
      id: generateId(),
      firstName: 'Ibhrim',
      lastName: '',
      email: 'ibhrim@email.com',
      phone: '(555) 567-8901',
      address: '654 Maple Drive, Chitwan',
      notes: 'Friend',
      photo: ''
    },
    {
      id: generateId(),
      firstName: 'Roshan',
      lastName: '',
      email: 'roshan@email.com',
      phone: '(555) 678-9012',
      address: '987 Cedar Lane, Biratnagar',
      notes: 'Friend',
      photo: ''
    }
  ]
  saveContacts(sampleContacts)
  return sampleContacts
}

// Save contacts to local storage
export const saveContacts = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

// Get a single contact by ID
export const getContactById = (id) => {
  const contacts = getContacts()
  return contacts.find(contact => contact.id === id) || null
}

// Add a new contact
export const addContact = (contact) => {
  const contacts = getContacts()
  const newContact = {
    ...contact,
    id: generateId()
  }
  contacts.push(newContact)
  saveContacts(contacts)
  return newContact
}

// Update an existing contact
export const updateContact = (id, updatedData) => {
  const contacts = getContacts()
  const index = contacts.findIndex(contact => contact.id === id)
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedData }
    saveContacts(contacts)
    return contacts[index]
  }
  return null
}

// Delete a contact
export const deleteContact = (id) => {
  const contacts = getContacts()
  const filteredContacts = contacts.filter(contact => contact.id !== id)
  saveContacts(filteredContacts)
  return true
}

// Generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Sort contacts alphabetically by last name
export const sortContactsByLastName = (contacts) => {
  return [...contacts].sort((a, b) => {
    const lastNameA = a.lastName.toLowerCase()
    const lastNameB = b.lastName.toLowerCase()
    if (lastNameA < lastNameB) return -1
    if (lastNameA > lastNameB) return 1
    // If last names are equal, sort by first name
    const firstNameA = a.firstName.toLowerCase()
    const firstNameB = b.firstName.toLowerCase()
    if (firstNameA < firstNameB) return -1
    if (firstNameA > firstNameB) return 1
    return 0
  })
}

// Filter contacts by search term (first name and last name)
export const filterContacts = (contacts, searchTerm) => {
  if (!searchTerm) return contacts
  const term = searchTerm.toLowerCase().trim()
  return contacts.filter(contact => {
    const firstName = contact.firstName.toLowerCase()
    const lastName = contact.lastName.toLowerCase()
    const fullName = `${firstName} ${lastName}`
    return firstName.includes(term) || 
           lastName.includes(term) || 
           fullName.includes(term)
  })
}

// Group contacts by first letter of last name
export const groupContactsByLetter = (contacts) => {
  const groups = {}
  contacts.forEach(contact => {
    const letter = contact.lastName.charAt(0).toUpperCase()
    if (!groups[letter]) {
      groups[letter] = []
    }
    groups[letter].push(contact)
  })
  // Sort the keys alphabetically
  const sortedGroups = {}
  Object.keys(groups).sort().forEach(key => {
    sortedGroups[key] = groups[key]
  })
  return sortedGroups
}
