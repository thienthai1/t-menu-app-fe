<template>
    <div class="w-full bg-gray-400 rounded-lg p-2 px-4">
        <div class="my-2">รายการอาหารที่เลือก</div>
        <div>
            <div v-for="item in orderList" :key="item.id" class="flex justify-around w-[80%] mx-auto bg-gray-300 rounded-lg px-2 py-4 my-2">
                <MenuList :menuItem="item" />
            </div>
        </div>
        <div class="flex mt-5 justify-between">
            <div>รวมทั้งหมด: 160 บาท</div>
            <div><button @click="handleOpenMenuDetail" class="bg-green-500 p-2 rounded-lg px-6">สั่งอาหาร</button></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuList from './MenuList.vue';

    const orderList = ref([
        {
            id: 1,
            name: 'Pizza',
            price: 10.99,
            imageUrl: 'https://example.com/pizza.jpg'
        },
        {
            id: 2,
            name: 'Burger',
            price: 8.99,
            imageUrl: 'https://example.com/burger.jpg'
        }
    ]);

</script>