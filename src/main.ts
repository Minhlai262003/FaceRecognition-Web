import './assets/main.css'
import './assets/tailwind.css'
import './assets/base.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import Camera from 'simple-vue-camera'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)
app.component('camera', Camera)
app.use(Notifications)
app.use(createPinia())
app.use(router)

app.mount('#app')
