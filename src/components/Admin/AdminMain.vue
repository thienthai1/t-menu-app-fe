<template>
    <div class="min-h-screen p-4">
        <!-- Header -->
        <header class="flex justify-between items-center mb-6">
            <h1 class="text-yellow-200 text-xl ">ระบบจัดการหลังบ้าน</h1>
            <div class="text-white text-right">
                <p>สมชาย เข็มกลัด</p>
                <span class="underline">Admin</span>
            </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="rounded-md overflow-hidden mb-8 flex">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                'flex-1 py-3 font-medium text-white',
                activeTab === tab.id ? 'bg-[#3f40a3]' : 'bg-gray-400'
            ]">
                {{ tab.label }}
            </button>
        </nav>

        <AdminFoodMain v-if="activeTab === 'food'" />
        <AddCategories v-else-if="activeTab === 'category'" />
        <OrderSummanry v-else />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AddFood from './AdminAddFood.vue'
import AddCategories from './AdminAddCategories.vue'
import OrderSummanry from './AdminOrderSummanry.vue'
import AdminFoodMain from './AdminFoodMain.vue'
import useAPIs from '@/composables/APIs';

const router = useRouter()
const preview = ref(null)
const activeTab = ref('food')
const { getProfile } = useAPIs();

const form = reactive({
    name: '',
    category: '',
    price: null,
    image: null,
})

const tabs = [
    { id: 'food', label: 'จัดการอาหาร' },
    { id: 'category', label: 'จัดการหมวดหมู่' },
    { id: 'bill', label: 'จัดการบิล' },
]

onMounted(async () => {
    try {
        await getProfile();
    } catch (error) {
        router.push('/login');
    }
});

</script>