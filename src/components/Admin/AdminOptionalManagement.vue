<template>
    <div class="p-4">
        <div class="flex justify-between px-5 border-b-white border-b-2">
            <div class="text-[20px] relative bottom-2">
                <svg @click="handleClose" class="w-5 h-5 float-left relative top-1 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg> จัดการตัวเลือก</div>
                <div>
                <button @click="handleAdd" class="text-white bg-green-600 px-2 py-1 rounded-md relative bottom-3 mt-2">+ เพิ่ม</button>
            </div>
        </div>

        <div class="mt-4 px-4">
            <div class="flex space-x-4 mb-4">
                <button 
                    :class="{'bg-blue-600': activeTab === 'tab1', 'bg-gray-600': activeTab !== 'tab1'}"
                    class="text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    @click="activeTab = 'tab1'"
                >
                    จัดการกลุ่มตัวเลือก
                </button>
                <button 
                    :class="{'bg-blue-600': activeTab === 'tab2', 'bg-gray-600': activeTab !== 'tab2'}"
                    class="text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    @click="activeTab = 'tab2'"
                >
                    จัดการตัวเลือก
                </button>
            </div>

            <div v-if="activeTab === 'tab1'">
                <h2 class="text-center text-white">จัดการกลุ่มตัวเลือก</h2>
                <AdminOptionalManagementTable :foodOptionalGroup="foodOptionalGroup" />
            </div>

            <div v-else-if="activeTab === 'tab2'">
                <AdminOptionalTable :foodOptional="foodOptional" :foodOptionalGroup="foodOptionalGroup" />
                <!-- Add content for Tab2 here -->
            </div>
        </div>
    </div>

    <AddFoodOptionalGroupModal 
        v-if="showModalAddFoodOptionalGroup" 
        :formData="formData" 
        @close="closeModal" 
        @submit="handleSubmit" 
    />
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import useAPIs from '@/composables/APIs';
import AdminOptionalManagementTable from './AdminOptionalManagementTable.vue';
import AddFoodOptionalGroupModal from '@/components/Modal/AddFoodOptionalGroupModal.vue';
import AdminOptionalTable from './AdminOptionalTable.vue';

    const props = defineProps({
        handleClose: {
            type: Object,
            required: true
        }
    });

    const activeTab = ref('tab1')
    const foodOptionalGroup = ref([])
    const foodOptional = ref([])
    const { getAllFoodOptionalGroup,addFoodDataOptionalGroup,getAllFoodOptional } = useAPIs();

    const showModalAddFoodOptionalGroup = ref(false);
    const formData = ref({
        name: '',
        description: '',
        isMultipleSelect: true
    });

    const handleClose = () => {
        props.handleClose()
    }

    const fetchFoodOptionalGroup = async () => {
        try {
            const response = await getAllFoodOptionalGroup();
            foodOptionalGroup.value = response;
        } catch (error) {
            console.error('Error fetching food optional group:', error);
        }
    }

    const fetchFoodOptional = async () => {
        try {
            const response = await getAllFoodOptional();
            foodOptional.value = response;
        } catch (error) {
            console.error('Error fetching food optional:', error);
        }
    }

    const handleAdd = () => {
        if(activeTab.value === 'tab1') {
            showModalAddFoodOptionalGroup.value = true;
        } else {
            // Handle adding food options for tab2
        }
    };

    const closeModal = () => {
        showModalAddFoodOptionalGroup.value = false;
        formData.value = { name: '', description: '', isMultipleSelect: true };
    };

    const handleSubmit = async () => {
        if(activeTab.value === 'tab1') {
            const data = {
                name: formData.value.name,
                description: formData.value.description,
                isMultipleSelect: formData.value.isMultipleSelect
            };
            try {
                const response = await addFoodDataOptionalGroup(data);
                closeModal();
                fetchFoodOptionalGroup();
            } catch (error) {
                console.error('Error adding food optional group:', error);
            }
        } else {
            // Handle form submission for tab2
        }
    };

    onMounted(() => {
        fetchFoodOptionalGroup();
        fetchFoodOptional();
    })

</script>