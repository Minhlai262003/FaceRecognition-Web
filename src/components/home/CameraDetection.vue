<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import SimpleVueCamera from 'simple-vue-camera'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
const cameraRef = ref()
const faceLandmarker = ref<FaceLandmarker | null>(null)
const detectionReady = ref(false)
const emit = defineEmits(['update:file'])

let animationFrameId: number | null = null
let personDetected = false

const initializeFaceLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
  )

  faceLandmarker.value = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/face_landmarker.task`,
      delegate: 'GPU',
    },
    numFaces: 1,
  })

  detectionReady.value = true
}

const detectLoop = async () => {
  if (!cameraRef.value || !faceLandmarker.value) {
    animationFrameId = requestAnimationFrame(detectLoop)
    return
  }

  const blob = await cameraRef.value.snapshot()
  const imageBitmap = await createImageBitmap(blob)

  const results = faceLandmarker.value.detect(imageBitmap)

  if (results.faceLandmarks.length > 0) {
    if (!personDetected) {
      console.log('Hello 👋')
      console.log(blob)
      const file = new File([blob], `captured-image-${Date.now()}.png`, { type: blob.type })
      emit('update:file', { image: file })
      personDetected = true
    }
  } else {
    personDetected = false
  }

  animationFrameId = requestAnimationFrame(detectLoop)
}

onMounted(async () => {
  await initializeFaceLandmarker()
  detectLoop()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
const props = defineProps<{
  onCamera: boolean
}>()
</script>

<template>
  <div :class="[{invisible: !onCamera}, 'h-[14rem] w-[25rem]']">
    <simple-vue-camera ref="cameraRef"/>
  </div>
</template>

<style scoped>
:deep(video) {
  @apply object-cover;  
}
</style>