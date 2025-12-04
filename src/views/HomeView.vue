<script setup lang="ts">
import { ref, watch } from 'vue'
import WaveTop from '../components/shared/WaveTop.vue'
import CameraDetection from '@/components/home/CameraDetection.vue'
import { useRecognizeUser } from '@/composables/user/useRecognizeUser.ts'
const { nameUser, handleRecognizeUser } = useRecognizeUser()
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    } else {
      const handler = () => {
        const loadedVoices = window.speechSynthesis.getVoices()
        resolve(loadedVoices)
        window.speechSynthesis.onvoiceschanged = null
      }
      window.speechSynthesis.onvoiceschanged = handler
    }
  })
}

const speakText = (msg: string, voices: SpeechSynthesisVoice[]) => {
  const selectedVoice =
    voices.find((v) => v.name === 'Google US English') ||
    voices.find((v) => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices[0]

  const utterance = new SpeechSynthesisUtterance(msg)
  utterance.lang = 'en-US'
  utterance.rate = 1
  utterance.pitch = 1

  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

watch(nameUser, async (newName) => {
  if (newName) {
    const voices = await loadVoices()
    speakText(`Hello ${newName} Have a nice day`, voices)
  }
})

let clickCount = 0
let clickTimeout: number | undefined

const hiddenButtonClick = () => {
   if (isCameraVisible.value) {
    isCameraVisible.value = false
    clickCount = 0
    if (clickTimeout) clearTimeout(clickTimeout)
    return
  }
  clickCount++
  console.log(clickCount)
  if (clickCount >= 5) {
    isCameraVisible.value = true
    clickCount = 0
  }
  if (clickTimeout) clearTimeout(clickTimeout)
  clickTimeout = setTimeout(() => (clickCount = 0), 2000)
}

const isCameraVisible = ref(false)
</script>

<template>
  <div class="relative w-auto h-screen">
    <WaveTop />
    <button class="absolute bottom-0 left-0 w-10 h-10 opacity-0" @click="hiddenButtonClick">
    </button>
    <div class="absolute inset-0 flex items-center justify-center h-screen w-full pointer-events-none">
      <div v-if="nameUser" class="flex-col items-center justify-center text-center">
        <h1 class="text-6xl mb-[2rem]">Hello {{ nameUser }}</h1>
        <h2 class="text-4xl text-gray-800">Have a nice day!</h2>
      </div>
      <div v-else>
        <img
          src="@/assets/images/logo_enclave.png"
          class="animate-flip-x h-auto w-auto"
          alt="Logo Enclave"
        />
      </div>  
    </div>
    <CameraDetection class="absolute top-0 left-0 z-50" :onCamera="isCameraVisible" @update:file="handleRecognizeUser($event)"/>


    <!-- Dropdown -->
    <!-- <div v-if="userName" class="fixed bottom-[20px] right-[20px] z-[50px]">
      <div class="relative">
        <button
          @click="toggleDropdown"
          type="button"
          class="flex items-center justify-center w-[100px] h-[100px] rounded-full border-[2px] border-white text-white hover:opacity-90 focus:outline-none shadow-lg cursor-pointer"
          :style="{ backgroundColor: COLORS.primary }"
        >
          <span
            class="mb-[12px]"
            :style="{ color: COLORS.secondary, fontSize: '5rem', lineHeight: 1 }"
            >+</span
          >
        </button>

        <div
          v-show="showDropdown"
          class="absolute bottom-[110px] right-10 w-48 bg-white border border-gray-200 rounded shadow-md"
        >
          <ul class="py-2 text-base text-gray-800">
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 1</a></li>
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 2</a></li>
            <li><a href="#" class="block px-6 py-3 hover:bg-gray-100">Action 3</a></li>
          </ul>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style>
/* @keyframes flipX {
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
} */
</style>
