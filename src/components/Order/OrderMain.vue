<template>
    <div class="p-4">
        <div class="w-full">
            <div class="flex justify-center mt-4 gap-2">
                <div
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="[
                        'w-[100px] px-2 py-3 text-center text-[14px] rounded-md',
                        activeTab === index ? 'bg-green-400' : 'bg-white'
                    ]"
                >
                    <button @click="setActiveTab(index)">{{ tab }}</button>
                </div>
            </div>
            <!-- Conditional Rendering of Components -->
            <div v-if="!isShowMenuDetail" class="mt-1 py-2 px-5">
                <Menu v-if="activeTab === 0" />
                <OrderList v-else-if="activeTab === 1" />
                <MyOrder v-else-if="activeTab === 2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Menu from './Menu.vue';
import OrderList from './OrderList.vue';
import MyOrder from './MyOrder.vue';
import useAPIs from '@/composables/APIs';

    const tabs = ['เมนู', 'รายการอาหาร', 'ออเดอร์']; // Tab labels
    const activeTab = ref(0); // Default active tab
    const isShowMenuDetail = ref(false); // State to control menu detail visibility

    const setActiveTab = (index) => {
        activeTab.value = index;
    };

</script>