<template>
    <div class="text-center bg-amber-200 w-fit mx-auto text-2xl mt-4">ห้องครัว</div>
    <div class="p-3">
        <div class="w-full bg-gray-400 rounded-lg p-2 px-4 mt-3">
            <div class="my-2 text-2xl text-blue-700 bg-amber-200 w-fit px-2">โต๊ะ 1</div>
            <div>
                <div v-for="item in kitchenOrderList" :key="item.id" class="flex justify-around w-[80%] mx-auto bg-gray-300 rounded-lg px-2 py-4 my-2">
                    <KitchenOrder :menuItem="item" />
                </div>
            </div>
            <div class="w-fit mx-auto">
                <button class="bg-green-500 p-2 rounded-lg px-6">จัดเสริฟ</button>
            </div>
        </div>
        <div class="w-full bg-gray-400 rounded-lg p-2 px-4 mt-3">
            <div class="my-2 text-2xl text-blue-700 bg-amber-200 w-fit px-2">โต๊ะ 2</div>
            <div>
                <div v-for="item in kitchenOrderList" :key="item.id" class="flex justify-around w-[80%] mx-auto bg-gray-300 rounded-lg px-2 py-4 my-2">
                    <KitchenOrder :menuItem="item" />
                </div>
            </div>
            <div class="w-fit mx-auto">
                <button class="bg-green-500 p-2 rounded-lg px-6">จัดเสริฟ</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import KitchenOrder from './KitchenOrder.vue';

    const kitchenOrderList = ref([
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