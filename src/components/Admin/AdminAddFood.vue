<template>
    <!-- Form Card -->
    <section class="bg-gray-200 rounded-lg p-8 shadow-md max-w-2xl mx-auto mt-8">
        <div class="flex space-x-4 mb-8">
            <div class="w-1/3 h-32 bg-white rounded-md flex items-center justify-center">
                <label class="cursor-pointer text-sm text-gray-600">
                    + อัปโหลด
                    <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
                </label>
            </div>
            <img v-if="preview" :src="preview" alt="preview" class="w-1/3 h-32 object-cover rounded-md" />
        </div>

        <form @submit.prevent="submitForm" class="space-y-6">
            <div>
                <label class="block font-medium mb-2 text-gray-700">ชื่อ</label>
                <input v-model="form.name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label class="block font-medium mb-2 text-gray-700 flex items-center">
                    หมวดหมู่
                    <router-link to="/categories/new" class="text-red-500 text-xs ml-2">+
                        เพิ่มหมวดหมู่</router-link>
                </label>
                <select v-model="form.category" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option disabled value="">-- เลือกหมวดหมู่ --</option>
                    <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
            </div>

            <div>
                <label class="block font-medium mb-2 text-gray-700">ราคา</label>
                <div class="flex">
                    <input v-model.number="form.price" type="number" class="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span class="px-4 py-2 bg-gray-300 border border-l-0 rounded-r-md">บาท</span>
                </div>
            </div>

            <div class="flex space-x-4 pt-6">
                <button type="submit" class="flex-1 py-3 bg-green-500 rounded-md text-white hover:bg-green-600 transition-colors">ตกลง</button>
                <button type="button" @click="cancel"
                    class="flex-1 py-3 bg-red-500 rounded-md text-white hover:bg-red-600 transition-colors">ยกเลิก</button>
            </div>
        </form>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useAPIs from '@/composables/APIs';

const router = useRouter()
const preview = ref(null)
const activeTab = ref('food')
const { addFoodData } = useAPIs();

const form = reactive({
    name: '',
    category: '',
    price: null,
    image: null,
})

const categories = ref([
    { id: '1', name: 'อาหารจานเดียว' },
    { id: '2', name: 'เครื่องดื่ม' },
])

const tabs = [
    { id: 'food', label: 'จัดการอาหาร' },
    { id: 'category', label: 'จัดการหมวดหมู่' },
    { id: 'bill', label: 'จัดการบิล' },
]

function onImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    form.image = file
    preview.value = URL.createObjectURL(file)
}

const submitForm = async () => {
    const errors = []

    // Validation
    if (!form.name) errors.push('ชื่อ (Name) is required.')
    if (!form.category) errors.push('หมวดหมู่ (Category) is required.')
    if (!form.price) errors.push('ราคา (Price) is required.')
    if (!form.image) errors.push('รูปภาพ (Image) is required.')

    if (errors.length > 0) {
        console.error('Validation Errors:', errors)
        alert(`Please fix the following errors:\n- ${errors.join('\n- ')}`)
        return
    }

    // Format the form data
    const formattedForm = {
        name: form.name,
        price: form.price,
        imageFile: form.image ? form.image.name : null,
        imageLink: preview.value,
        foodTypeId: form.category,
        image: form.image,
    }

    console.log('Form data:', formattedForm)

    try {
        const response = await addFoodData(formattedForm)
        console.log('Response:', response)
        alert('เพิ่มอาหารสำเร็จ')
        router.push('/admin/foods')
    } catch (error) {
        console.error('Error adding food:', error)
        alert('เกิดข้อผิดพลาดในการเพิ่มอาหาร')
    }
    
}

function cancel() {
    router.back()
}
</script>