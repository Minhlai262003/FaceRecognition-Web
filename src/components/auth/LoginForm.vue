<script setup lang="ts">
import { ref } from 'vue'
import {COLORS} from '@/constants/colors.ts'
import { useRouter } from 'vue-router'
import router from '@/router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  router.push('/ecommerce')
}
</script>

<template>
  <div class="relative w-full bg-white p-8 md:p-10 rounded-[2.75rem] shadow-xl border border-black-400 min-h-[34rem]">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-[6rem]">Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <div class="relative ">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-3 border border-gray-300 rounded-md text-lg pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <span
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            @click="togglePassword"
          >
            
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.963 9.963 0 013.182-4.255m3.39-2.072A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.297 5.332M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3 3a3 3 0 003-3m0 0L3 3" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </span>
        </div>
      </div>
        <button
            type="submit"
            class="absolute bottom-10 right-10 left-10 py-3 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition-all"
            :style="{ backgroundColor: COLORS.primary }">
            Login
        </button>
      
    </form>
  </div>
</template>

