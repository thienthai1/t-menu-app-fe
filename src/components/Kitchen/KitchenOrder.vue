<template>
    <div class="w-[30%]">
        <img :src="props.menuItem.imageUrl" alt="" class="w-16 h-16 mx-auto" />
    </div>
    <div class="w-[70%] text-left pl-4">
        <div class="">{{ props.menuItem.name }}</div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        menuItem: {
            type: Object,
            required: true
        }
    });
</script>