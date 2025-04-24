<template>
    <div class="overflow-x-auto max-w-full">
        <table class="table-auto w-full text-white mt-4 border-collapse border border-gray-500">
            <thead>
                <tr class="bg-gray-700">
                    <th class="border border-gray-500 px-4 py-2">ID</th>
                    <th class="border border-gray-500 px-4 py-2">Name</th>
                    <th class="border border-gray-500 px-4 py-2">Price</th>
                    <th class="border border-gray-500 px-4 py-2">Group</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in props.foodOptional" :key="item.id" class="text-center">
                    <td class="border border-gray-500 px-4 py-2">{{ item.id }}</td>
                    <td class="border border-gray-500 px-4 py-2">{{ item.name }}</td>
                    <td class="border border-gray-500 px-4 py-2">{{ item.price }}</td>
                    <!-- <td class="border border-gray-500 px-4 py-2">{{ group.isMultipleSelect ? 'Yes' : 'No' }}</td> -->
                    <td class="border border-gray-500 px-4 py-2">
                        <button @click="openEditForm(item)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Edit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="isEditing" class="mt-4 p-4 bg-gray-800 text-white rounded">
        <h3 class="text-lg font-bold mb-2">Edit Group</h3>
        <form @submit.prevent="submitEditForm">
            <div class="mb-2">
                <label for="name" class="block text-sm font-medium">Name:</label>
                <input v-model="editForm.name" id="name" type="text" class="w-full px-2 py-1 rounded bg-gray-700 text-white" />
            </div>
            <div class="mb-2">
                <label for="description" class="block text-sm font-medium">Description:</label>
                <input v-model="editForm.price" id="description" type="text" class="w-full px-2 py-1 rounded bg-gray-700 text-white" />
            </div>
            <div v-if="foodOptionalGroup.length > 0" class="mb-2">
                <label for="group" class="block text-sm font-medium">Group:</label>
                <select v-model="editForm.group.id" id="group" class="w-full px-2 py-1 rounded bg-gray-700 text-white">
                    <option v-for="group in props.foodOptionalGroup" :key="group.id" :value="group.id">
                        {{ group.name }}
                    </option>
                </select>
            </div>
            <!-- <div class="mb-2">
                <label for="isMultipleSelect" class="block text-sm font-medium">Multiple Select:</label>
                <select v-model="editForm.isMultipleSelect" id="isMultipleSelect" class="w-full px-2 py-1 rounded bg-gray-700 text-white">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                </select>
            </div> -->
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                Submit
            </button>
            <button type="button" @click="cancelEdit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2">
                Cancel
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    foodOptional: {
        type: Array,
        required: true
    },
    foodOptionalGroup: {
        type: Array,
        required: true
    }
});

const isEditing = ref(false);
const editForm = ref({
    id: null,
    name: '',
    pice: '',
    group: {
        "id": 0,
        "name": "",
        "description": "",
        "isMultipleSelect": false
    }
});

function openEditForm(item) {
    isEditing.value = true;
    alert(item.group)
    if(item.group == null){
        item.group = {
            "id": null,
            "name": "",
            "description": "",
            "isMultipleSelect": false
        };
    }else{
        editForm.value = { ...item };
    }

}

function submitEditForm() {
    console.log('Edited Data:', editForm.value);
    isEditing.value = false;
}

function cancelEdit() {
    isEditing.value = false;
}
</script>
