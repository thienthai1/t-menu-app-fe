<template>
    <div class="w-[30%]">
        <img :src="props.menuItem.imageUrl" alt="" class="w-16 h-16 mx-auto" />
    </div>
    <div class="w-[70%] text-left pl-4">
        <div class="">{{ props.menuItem.name }}</div>
        <div>{{ props.menuItem.price }} บาท</div>
        <div>
            <button @click="handleOpenMenuDetail" class="bg-green-500 p-2 rounded-lg px-6">สั่ง</button>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        menuItem: {
            type: Object,
            required: true
        },
        handleOpenMenuDetail: {
            type: Function,
            required: true
        }
    });

    const handleOpenMenuDetail = () => {
        props.handleOpenMenuDetail(props.menuItem);
    };
</script>