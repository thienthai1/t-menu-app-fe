<template>
    <div class="text-white">
        <h1>ค้นหาเมนู</h1>
    </div>
    <div>
        <input
            type="text"
            placeholder="ค้นหาเมนู"
            v-model="searchQuery"
            class="bg-white rounded-md p-2 w-[200px] mb-4 mt-2 text-[10px]"
        />
    </div>
    <div class="w-full bg-gray-300 rounded-md p-3 flex flex-wrap gap-2 justify-around">
        <div v-for="(tab, index) in tabs" :key="tab" @click="setActiveTab(index)" :class="[
            'w-fit px-5 rounded-md py-2 text-center text-[12px] cursor-pointer',
            activeTab === index ? 'bg-blue-500 text-white' : 'bg-white text-black'
        ]">
            {{ tab.name }}
        </div>
    </div>
    <div>
        <div v-if="!isShowMenuDetail">
            <h2 class="text-lg font-bold text-center">เมนู</h2>
            <div v-for="item in filteredFoods" :key="item.id"
                class="flex justify-around w-[80%] mx-auto bg-gray-300 rounded-lg px-2 py-4 my-2">
                <MenuList :menuItem="item" :handleOpenMenuDetail="handleOpenMenuDetail" />
            </div>
        </div>
        <div v-else>
            <MenuDetail :menuOptions="menuOptions" :handleCloseMenuDetail="handleCloseMenuDetail" />
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue';

const activeTab = ref(0); // Default active tab
import MenuList from './MenuList.vue';
import MenuDetail from './MenuDetail.vue';
import useAPIs from '@/composables/APIs';

    const { getAllFoods,getFoodType } = useAPIs();
    const isShowMenuDetail = ref(false); // State to control menu detail visibility
    const amount = ref(1); // State to manage
    //  the amount of items
    const searchQuery = ref('');
    const setActiveTab = (index) => {
        activeTab.value = index;
    };

    const filteredFoods = computed(() => {
        const activeTabName = tabs.value[activeTab.value]?.name;
        return menuList.value.filter(
            (food) =>
                food.foodType?.name === activeTabName &&
                food.name.toLowerCase().includes(searchQuery.value.toLowerCase()) // Search logic
        );
    });

    const menuList = ref([
        {
            "id": 9,
            "name": "พะแนง2",
            "imageLink": "www.kappok.com",
            "imageFile": "image-1742227091560-516392261.jpg",
            "price": "60.00",
            "optionals": [],
            "createdBy": {
                "id": 1,
                "email": "user@mail.com",
                "password": "$2b$10$MQ1THwm.PZVdBygwfk4whOakRrNDiWRXE3OELimZDUvcNmLRO7yPK",
                "role": "user"
            },
            "foodType": {
                "id": 1,
                "name": "ติ่มซำ"
            }
        }
    ]); // Placeholder for menu list data

    const menuOptions = ref([
        {
            id: 1,
            label: 'เพิ่มชีส',
            price: 1.5
        },
        {
            id: 2,
            label: 'ไม่เผ็ด',
            price: 0.5
        }
    ]); // Placeholder for menu options data


    const tabs = ref([
        {
            id: 0,
            name: 'อาหาร'
        },
        {
            id: 1,
            name: 'เครื่องดื่ม'
        },
        {
            id: 2,
            name: 'ของว่าง'
        }
    ]); // Tab labels

    const getAllFoods_ = async () => {
        const response = await getAllFoods();
        menuList.value = response;
    };

    const getFoodType_ = async () => {
        const response = await getFoodType();
        tabs.value = response;
    };

    const handleCloseMenuDetail = () => {
        isShowMenuDetail.value = false;
    };

    const handleOpenMenuDetail = () => {
        isShowMenuDetail.value = true;
    };

    onMounted(async () => {
        await getAllFoods_();
        await getFoodType_();
    });

</script>