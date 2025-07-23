import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)
  const profilePhoto = ref(null) // base64 string

  function setProfilePhoto(photo) {
    if (!profilePhoto.value) {
      profilePhoto.value = photo;
    }
  }

  function login(newUser, newToken) {
    user.value = newUser
    token.value = newToken
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    profilePhoto.value = null
  }

  return {
    user,
    token,
    isAuthenticated,
    profilePhoto,
    setProfilePhoto,
    login,
    logout
  }
}) 