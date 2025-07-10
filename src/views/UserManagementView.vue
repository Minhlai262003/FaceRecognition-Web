<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import UserImageUploader from '@/components/user/UserImageUploader.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import Modal from '@/components/common/Modal.vue'
import { useCreateUser } from '@/composables/user/useCreateUser'
import { useCreateUserForm } from '@/composables/user/useCreateUserForm'
const currentPageTitle = ref('User Management')
const isAddUserModalOpen = ref(false)

const openAddUserModal = () => {
  isAddUserModalOpen.value = true
}

const closeAddUserModal = () => {
  isAddUserModalOpen.value = false
}

// const { handleCreateUser } = useCreateUser()
const { form, birthday, errors, validate, submit, genders, roles } = useCreateUserForm()

const onUpdateImage = (index: number, file: File) => {
  form.faceImages[index] = file
}

const onSubmit = async () => {
  await submit(closeAddUserModal)
}
const faceImageLabels = [
  'Front-facing',
  '90° Turn to the Left',
  '90° Turn to the Right',
  '45° Turn to the Left',
  '45° Turn to the Right',
  'Look Up 45°',
  'Look Down 45°',
  'Neutral Expression',
  'Smiling Expression',
  'Different Lighting',
]

const isOpenNotificationModal = ref(false)
</script>

<template>
  <admin-layout>
    <page-breadcrumb :pageTitle="currentPageTitle" />

    <div class="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6">
      <button class="edit-button" @click="openAddUserModal">
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206Z"
          />
        </svg>
        Add
      </button>
    </div>

    <Modal v-if="isAddUserModalOpen" @close="closeAddUserModal" class="scale-125">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11"
        >
          <button
            @click="closeAddUserModal"
            class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            ✖
          </button>

          <h4 class="mb-2 text-center text-4xl font-semibold text-gray-800">Add New User</h4>

          <form class="flex flex-col">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-7">
                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    placeholder="Enter First Name"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
                    {{ errors.firstName }}
                  </p>
                </div>

                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
                    {{ errors.lastName }}
                  </p>
                </div>

                <div class="lg:col-span-2">
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700"
                    >Email Address</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter Email Address"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700">Birthday</label>
                  <VueDatePicker
                    v-model="birthday"
                    teleport="body"
                    :enable-time-picker="false"
                    placeholder="Select birthday"
                  />
                  <p v-if="errors.birthDay" class="text-red-500 text-sm mt-1">
                    {{ errors.birthDay }}
                  </p>
                </div>

                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700">Gender</label>
                  <select
                    v-model="form.gender"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  >
                    <option value="">Select Gender</option>
                    <option v-for="gender in genders" :key="gender.value" :value="gender.value">
                      {{ gender.label }}
                    </option>
                  </select>
                  <p v-if="errors.gender" class="text-red-500 text-sm mt-1">{{ errors.gender }}</p>
                </div>

                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700"
                    >Phone Number</label
                  >
                  <input
                    v-model="form.phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  />
                  <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">
                    {{ errors.phoneNumber }}
                  </p>
                </div>
                <div>
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700">Role</label>
                  <select
                    id="role"
                    v-model="form.role"
                    class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-lg text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                  >
                    <option value="">Select Role</option>
                    <option v-for="role in roles" :key="role.value" :value="role.value">
                      {{ role.label }}
                    </option>
                  </select>

                  <p v-if="errors.role" class="mt-1 text-sm text-red-500">
                    {{ errors.role }}
                  </p>
                </div>

                <div class="lg:col-span-2">
                  <label class="mb-1.5 block text-2xl font-medium text-gray-700"
                    >Identification Images</label
                  >
                  <div class="grid grid-cols-5 gap-4">
                    <div v-for="(label, index) in faceImageLabels" :key="index">
                      <user-image-uploader
                        :helperText="label"
                        @update:file="onUpdateImage(index, $event)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                type="button"
                @click="closeAddUserModal"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                @click="onSubmit"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </admin-layout>
</template>

<style>
.dp__main .dp__theme_light {
  --dp-highlight-color: rgba(34, 233, 8, 0.993);
  --dp-primary-color: #ff006f;
  --dp-primary-text-color: #000078;
}

.dp__menu {
  min-width: 350px;
  font-size: 20px;
}

.dp__action_button {
  font-size: 18px;
  padding: 10px 14px;
}

.dp__input {
  height: 2.75rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: transparent;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  font-size: 1.125rem;
  color: #1f2937;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
}

.dp__input::placeholder {
  color: #9ca3af;
}

.dp__input:focus {
  border-color: #7dd3fc;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
