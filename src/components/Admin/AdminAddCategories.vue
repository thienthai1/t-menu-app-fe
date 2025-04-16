<template>
    <div class="bg-gray-200 min-h-screen rounded-md p-8 text-white font-sans">
      <div class="max-w-md mx-auto">
        <h1 class=" text-blue-600 text-2xl font-bold mb-4">หมวดหมู่</h1>
        <div class="flex">
          <input
            v-model="newTag"
            @keyup.enter="addTag"
            type="text"
            placeholder="ชื่อ"
            class=" border-[1px] border-r-0 flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button @click="addTag" class="px-4 bg-[#58A65E] rounded-r-md hover:opacity-90">
            + เพิ่ม
          </button>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="bg-[#1565C0] px-3 py-1 rounded flex items-center"
          >
            <span class="mr-2">{{ tag }}</span>
            <button @click="removeTag(index)" class="text-white hover:text-gray-200">&times;</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const newTag = ref('');
  const tags = ref(['อาหาร', 'เครื่องดื่ม', 'ของว่าง']);
  
  const addTag = () => {
    const trimmed = newTag.value.trim();
    if (trimmed && !tags.value.includes(trimmed)) {
      tags.value.push(trimmed);
      newTag.value = '';
    }
  };
  
  const removeTag = (index) => {
    tags.value.splice(index, 1);
  };
  </script>