<script setup lang="ts">
import WaveSVG from '@/assets/images/wave.svg'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="relative w-full min-h-screen flex flex-col justify-end">
    <div class="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-around gap-6 md:gap-0 p-4">
      <div class="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
        <img
          src="@/assets/images/logo_enclave.png"
          class="h-[10rem] md:h-[16rem] w-auto"
          alt="Logo Enclave"
        />
      </div>
      <div class="w-full md:w-1/2 md:pr-[21rem] md:pl-[15rem] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full rotate-180">
      <WaveSVG />
    </div>
  </div>
</template>
