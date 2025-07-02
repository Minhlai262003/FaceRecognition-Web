<script setup lang="ts">
import { ref } from 'vue'
import WaveTop from '../components/WaveTop.vue'
import { useAuth } from '../composables/auth/useAuth'
import {COLORS} from '../constants/colors.ts'

const { userName, fetchUser } = useAuth()
fetchUser()

const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
</script>

<template>
  <div class="relative w-auto h-auto">
    <WaveTop />
    <div class="absolute inset-0 flex items-center justify-center h-screen w-full">

      <div v-if="userName" class="flex-col items-center justify-center text-center">
        <h1 class="text-8xl mb-[100px]">Hello {{ userName.name }}</h1>
        <h2 class="text-6xl text-gray-800">Have a nice day!</h2>
      </div>
      <div v-else>
        <img src="@/assets/images/logo_enclave.png" class="animate-flip-x h-[260px] w-auto" alt="Logo Enclave" />
      </div>
    </div>

    <!-- Dropdown -->
    <div v-if="userName" class="fixed bottom-[20px] right-[20px] z-[50px]">
      <div class="relative">
        <button
          @click="toggleDropdown"
          type="button"
          class="flex items-center justify-center 
                w-[100px] h-[100px] rounded-full border-[2px] border-white text-white 
                hover:opacity-90 focus:outline-none shadow-lg cursor-pointer"
          :style="{ backgroundColor: COLORS.primary }"
        >
          <span class="mb-[12px]" :style="{ color: COLORS.secondary, fontSize: '5rem', lineHeight: 1,}">+</span>
        </button>

        <div
          v-show="showDropdown"
          class="absolute bottom-[110px] right-10 w-48 
                bg-white border border-gray-200 rounded shadow-md"
        >
          <ul class="py-2 text-base text-gray-800">
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 1</a></li>
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 2</a></li>
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<style>

@keyframes flipX {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(-1);
  }
  100% {
    transform: scaleX(1);
  }
}

.animate-flip-x {
  animation: flipX 4s infinite;
}
</style>
