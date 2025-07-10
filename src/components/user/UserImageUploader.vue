<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import Modal from '@/components/common/Modal.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import Camera from 'simple-vue-camera'

const emit = defineEmits(['update:file'])
const props = defineProps<{
  helperText?: string | null
}>()
const isImageOptionModalOpen = ref(false)
const isCameraOpen = ref(false)
const selectedImage = ref<string | null>(null)

const cameraRef = ref<InstanceType<typeof Camera> | null>(null)

const openImageModal = () => {
  isImageOptionModalOpen.value = true
}

const openCamera = () => {
  isCameraOpen.value = true
  isImageOptionModalOpen.value = false
}

const closeCamera = () => {
  isCameraOpen.value = false
}

const snapshot = async () => {
  if (!cameraRef.value) return
  const blob = await cameraRef.value.snapshot()
  if (blob) {
    const url = URL.createObjectURL(blob)
    selectedImage.value = url
    const file = new File([blob], `captured-image-${Date.now()}.png`, { type: blob.type })

    emit('update:file', file)

    closeCamera()
  }
}

const uploadImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const url = URL.createObjectURL(file)
    selectedImage.value = url

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      emit('update:file', file)
      isImageOptionModalOpen.value = false
    }
    reader.readAsDataURL(file)
  }
}

const deleteImage = () => {
  selectedImage.value = null
  emit('update:file', null)
}
</script>

<template>
  <div>
    <div
      class="h-[9rem] w-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      @click="openImageModal"
    >
      <div class="relative">
        <img
          v-if="selectedImage"
          :src="selectedImage"
          alt="Selected"
          class="h-[9rem] w-full object-cover rounded-lg"
        />
        <PlusIcon v-else class="text-gray-300 h-[4rem] w-[4rem]" />
        <button
          v-if="selectedImage"
          @click.stop="deleteImage"
          class="absolute right-1 top-1 flex items-center justify-center rounded-full bg-white p-1 shadow hover:bg-red-100 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500 group-hover:text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex items-center justify-center text-sm text-gray-500 mt-2">
      {{ props.helperText || 'Click to upload or capture image' }}
    </div>

    <Modal v-if="isImageOptionModalOpen" @close="isImageOptionModalOpen = false" class="scale-125">
      <template #body>
        <div class="relative w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-lg">
          <button
            @click="isImageOptionModalOpen = false"
            class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            ✖
          </button>

          <h4 class="mb-6 text-center text-2xl font-semibold text-gray-800">Choose Image</h4>

          <div class="flex flex-col gap-4">
            <button
              @click="openCamera"
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow hover:bg-gray-100"
            >
              📸 Take a Photo
            </button>

            <label
              for="uploadInput"
              class="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow hover:bg-gray-100 cursor-pointer"
            >
              🖼 Upload from Device
            </label>
            <input
              id="uploadInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="uploadImage"
            />
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="isImageOptionModalOpen = false"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal v-if="isCameraOpen" @close="closeCamera" class="scale-125">
      <template #body>
        <div class="relative w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-lg">
          <button
            @click="closeCamera"
            class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            ✖
          </button>

          <h4 class="mb-4 text-center text-2xl font-semibold text-gray-800">Camera</h4>

          <Camera ref="cameraRef" :resolution="{ width: 640, height: 480 }" autoplay />

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="closeCamera"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="snapshot"
              class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              📷 Capture
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
