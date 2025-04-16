<template>
    <div v-if="!isViewOptional" class="p-4">
        <div class="flex justify-between px-5 border-b-white border-b-2">
            <div class="text-[20px] relative bottom-2">แก้ไขอาหาร</div>
        </div>

        <div class="mt-4 px-4">
            <div v-if="loading" class="text-center py-4">Loading...</div>
            <div v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
            <form v-else @submit.prevent="handleSubmit" class="max-w-2xl mx-auto">
                <div class="mb-4">
                    <label class="block text-white mb-2">ชื่ออาหาร</label>
                    <input 
                        v-model="form.name" 
                        type="text" 
                        class="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                        required
                    >
                </div>

                <div class="mb-4">
                    <label class="block text-white mb-2">ราคา</label>
                    <input 
                        v-model="form.price" 
                        type="number" 
                        class="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                        required
                    >
                </div>

                <div class="mb-4">
                    <label class="block text-white mb-2">หมวดหมู่</label>
                    <select 
                        v-model="form.foodTypeId" 
                        class="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                        required
                    >
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block text-white mb-2">รูปภาพ</label>
                    <input 
                        type="file" 
                        @change="handleImageChange"
                        accept="image/*"
                        class="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                    >
                    <div v-if="form.imageFile && preview == null" class="mt-2">
                        <img :src="`${host}/uploads/${form.imageFile}`" :alt="form.name" class="w-32 h-32 object-cover rounded-md">
                    </div>

                    <div v-if="preview">
                        <img :src="preview" alt="preview" class="w-32 h-32 object-cover rounded-md mt-2">
                    </div>
                </div>

                <div class="flex space-x-4">
                    <button 
                        type="submit" 
                        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        บันทึก
                    </button>
                    <button 
                        type="button" 
                        @click="router.push('/admin')"
                        class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        ยกเลิก
                    </button>
                    <button 
                        type="button"
                        @click="isViewOptional = true"
                        class="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        จัดการตัวเลือก
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div v-else>
        <AdminOptionalManagement :handleClose="handleCloseOptional" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAPIs from '@/composables/APIs';
import AdminOptionalManagement from './AdminOptionalManagement.vue';

const route = useRoute()
const router = useRouter()
const { getFoodById, updateFood, getAllCategories } = useAPIs()

const loading = ref(false)
const error = ref(null)
const host = ref(import.meta.env.VITE_BACKEND_URL)
const categories = ref([])
const preview = ref(null)
const isViewOptional = ref(false)

const form = ref({
    name: '',
    price: null,
    foodTypeId: null,
    imageFile: null,
    image: null
})

const fetchFood = async () => {
    loading.value = true
    error.value = null
    try {
        const food = await getFoodById(route.params.id)
        form.value = {
            ...food,
            foodTypeId: food.foodType?.id
        }
    } catch (err) {
        error.value = 'Failed to fetch food details'
        console.error('Error fetching food:', err)
    } finally {
        loading.value = false
    }
}

const fetchCategories = async () => {
    try {
        categories.value = await getAllCategories()
    } catch (err) {
        console.error('Error fetching categories:', err)
    }
}

const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.image = file
        preview.value = URL.createObjectURL(file)
    }
}

const handleSubmit = async () => {
    loading.value = true
    error.value = null
    try {
        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('price', form.value.price)
        formData.append('foodTypeId', form.value.foodTypeId)
        if (form.value.image) {
            formData.append('image', form.value.image)
        }

        await updateFood(route.params.id, formData)
        router.push('/admin')
    } catch (err) {
        error.value = 'Failed to update food'
        console.error('Error updating food:', err)
    } finally {
        loading.value = false
    }
}

const handleCloseOptional = () => {
    isViewOptional.value = false
}

onMounted(() => {
    fetchFood()
    fetchCategories()
})
</script> 