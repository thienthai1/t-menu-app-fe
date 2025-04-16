<template>
    <div @click="handleCloseMenuDetail" class="text-left underline mt-3 ml-3"><svg class="w-5 h-5 float-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg> <span class="relative bottom-[1.5px]">ย้อนกลับ</span></div>
        <div class="w-[90%] mx-auto bg-gray-300 rounded-lg px-2 py-4 my-2">
            <div class="flex">
                <div class="w-[30%]">
                    <img src="https://example.com/pizza.jpg" alt="" class="w-16 h-16 mx-auto" />
                </div>
                <div class="w-[70%] text-left pl-4">
                    <div class="">กะเพรา</div>
                </div>
            </div>
            <div>
                <div class="text-left pl-4 mt-2">ตัวเลือก</div>
                <div v-for="option in menuOptions" :key="option.id" class="flex items-center mt-2 ml-5">
                    <input type="checkbox" :id="'option-' + option.id" v-model="selectedOptions" :value="option" class="mr-2" style="width: 20px; height: 20px;" />
                    <label :for="'option-' + option.id" class="flex w-full">
                        <span>{{ option.label }}</span>
                        <span class="ml-2">+{{ option.price.toFixed(2) }} ฿</span>
                    </label>
                </div>
            </div>
            <div class="text-left ml-9 mt-2">จำนวน</div>
            <div class="flex items-center justify-between mt-2 pl-3 w-[100px]">
                <button 
                    @click="decreaseAmount" 
                    class=" bg-blue-400 text-white px-3 py-1 rounded-md"
                    :disabled="amount <= 1"
                >
                    -
                </button>
                <span class="mx-4 text-lg">{{ amount }}</span>
                <button 
                    @click="increaseAmount" 
                    class="bg-blue-400 text-white px-3 py-1 rounded-md"
                >
                    +
                </button>
            </div>
            <div class="text-left ml-4 mt-2">รวมทั้งหมด: 80 บาท</div>
            <div class="mt-2 text-right mr-3">
                <button class="bg-green-500 p-2 rounded-lg px-6">สั่ง</button>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';

    const props = defineProps({
        menuOptions: {
            type: Array,
            required: true
        },
        handleCloseMenuDetail: {
            type: Function,
            required: true
        }
    });

    const amount = ref(1); // State to manage the amount of items

    const increaseAmount = () => {
        amount.value++;
    };

    const decreaseAmount = () => {
        if (amount.value > 1) {
            amount.value--;
        }
    };

    const handleCloseMenuDetail = () => {
        props.handleCloseMenuDetail();
    };
</script>