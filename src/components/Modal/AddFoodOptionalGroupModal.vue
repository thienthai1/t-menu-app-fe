<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md w-96">
            <h2 class="text-lg font-bold mb-4">Add New Item</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="formData.name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div class="mb-4">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="formData.description" id="description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" ></textarea>
                </div>
                {{ formData.isMultipleSelect }}
                <div class="mb-4">
                    <label for="isMultipleSelect" class="block text-sm font-medium text-gray-700">Is Multiple Select</label>
                    <input v-model="formData.isMultipleSelect" type="checkbox" id="isMultipleSelect" class="mt-1" />
                </div>
                <div class="flex justify-end space-x-2">
                    <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    formData: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(['close', 'submit']);

const closeModal = () => {
    emits('close');
};

const handleSubmit = () => {
    emits('submit');
};
</script>
