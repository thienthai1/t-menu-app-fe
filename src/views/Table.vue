<template>
    <div class="p-2">
        <div>เลือกโต๊ะ</div>
        <div class="flex gap-2 mt-2 flex-wrap">
            <div v-for="(table, index) in tableList" :key="index">
            <button @click="routeToTable(table.table_code)" class="bg-blue-600 text-white p-2 px-4">{{  "โต๊ะ " + table.table_number }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue';
import useAPIs from '@/composables/APIs';
import { useRouter } from 'vue-router';

    const { getAllTable } = useAPIs();
    const tableList = ref([]);

    const getTable = async () => {
        const response = await getAllTable();
        console.log(response)
        tableList.value = response;
    };

    const router = useRouter();

    const routeToTable = (tableCode) => {
        router.push('/order' + `${'?table_code=' + tableCode}`);
    };

    onMounted(() => {
        getTable();
    });

</script>