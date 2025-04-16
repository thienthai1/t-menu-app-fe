<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-xs bg-gray-200 rounded-lg p-6 shadow-md">
      <h2 class="text-2xl font-semibold text-[#36531f] mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 mt-2 text-base font-medium bg-[#4db96e] rounded hover:opacity-90 transition"
        >
          ล็อคอิน
        </button>
      </form>
      <a href="#" class="block text-center mt-4 text-sm text-gray-700 hover:underline">
        ลืมรหัสผ่าน
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAPIs from '@/composables/APIs';

const username = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAPIs();

const handleLogin = async () => {
  try {
    const response = await login(username.value, password.value);
    const token = response.access_token;

    // Store the access token in localStorage
    localStorage.setItem('access_token', token);

    // Redirect to the /admin page
    router.push('/admin');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Invalid username or password. Please try again.');
  }
}
</script>
