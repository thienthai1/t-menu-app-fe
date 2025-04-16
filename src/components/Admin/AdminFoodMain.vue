<template>
    <div>
        <div class="flex justify-between px-5 border-b-white border-b-2">
            <div class="text-[20px] relative bottom-2">รายการอาหาร</div>
            <div>
                <button @click="navigateToAddFood" class="text-white bg-green-600 px-2 py-1 rounded-md relative bottom-3">+ เพิ่ม</button>
            </div>
        </div>

        <!-- Food List -->
        <div class="mt-4 px-4">
            <div v-if="loading" class="text-center py-4">Loading...</div>
            <div v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
            <div v-else-if="foods.length === 0" class="text-center py-4">No foods found</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="food in foods" :key="food.id" class="bg-white rounded-lg shadow-md p-4">
                    <img :src="`${host}/uploads/${food.imageFile}`" :alt="food.name" class="w-full h-48 object-cover rounded-md mb-4">
                    <h3 class="text-lg font-semibold mb-2">{{ food.name }}</h3>
                    <p class="text-gray-600 mb-2">หมวดหมู่: {{ food.foodType?.name }}</p>
                    <p class="text-green-600 font-bold">฿{{ food.price }}</p>
                    <div class="mt-4 flex space-x-2">
                        <button @click="editFood(food.id)" class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">แก้ไข</button>
                        <button @click="deleteFoodHandler(food.id)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAPIs from '@/composables/APIs';

const router = useRouter()
const { getAllFoods, deleteFood } = useAPIs();
const foods = ref([])
const loading = ref(false)
const error = ref(null)
const host = ref(import.meta.env.VITE_BACKEND_URL)

const navigateToAddFood = () => {
    router.push('/admin/foods/add')
}

const fetchFoods = async () => {
    loading.value = true
    error.value = null
    try {
        foods.value = await getAllFoods()
    } catch (err) {
        error.value = 'Failed to fetch foods'
        console.error('Error fetching foods:', err)
    } finally {
        loading.value = false
    }
}

const editFood = (id) => {
    router.push(`/admin/foods/edit/${id}`)
}

const deleteFoodHandler = async (id) => {
    if (confirm('Are you sure you want to delete this food?')) {
        try {
            await deleteFood(id)
            await fetchFoods() // Refresh the list
        } catch (err) {
            console.error('Error deleting food:', err)
            error.value = 'Failed to delete food'
        }
    }
}

onMounted(() => {
    fetchFoods()
})
</script>