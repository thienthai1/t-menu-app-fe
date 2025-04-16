<template>
    <div class="w-full">
              <!-- Search Bar -->
      <div class="flex items-center mb-6">
        <input
          type="text"
          placeholder="รหัสออเดอร์"
          class="rounded px-4 py-2 text-black bg-white"
        />
        <button class="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          🔍 ค้นหา
        </button>
      </div>
    </div>
    <div class="min-h-screen bg-gray-200 p-6 text-white font-sans">
  
      <!-- Header -->
      <div class="text-3xl font-bold text-green-600 mb-4">
        รายการอาหาร
      </div>
  
      <!-- Unpaid Tag -->
      <div class="mb-2">
        <button class="bg-red-500 text-white px-4 py-1 text-[13px]">
          ยังไม่ชำระ
        </button>
      </div>
  
      <!-- Order Table -->
      <div class="bg-gray-200 border-[1px] text-black rounded overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-300">
            <tr>
              <th class="p-2 w-1/12">ลำดับ</th>
              <th class="p-2 w-7/12">ชื่อ</th>
              <th class="p-2 w-2/12">ราคา</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-gray-300">
              <td class="p-2 align-top">1.</td>
              <td class="p-2">
                กะเพราไก่<br />
                <span class="text-sm text-gray-600">+ เพิ่มไข่ดาว</span>
              </td>
              <td class="p-2 align-top">70<br /><span class="text-sm">10</span></td>
            </tr>
            <tr class="border-t border-gray-300">
              <td class="p-2 align-top">2.</td>
              <td class="p-2">
                พะแนงไก่<br />
                <span class="text-sm text-gray-600">+ เพิ่มข้าว</span>
              </td>
              <td class="p-2 align-top">75<br /><span class="text-sm">5</span></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Total and Check Bill -->
      <div class="mt-4 flex justify-between items-center">
        <div class="text-right text-black text-lg">
          รวม 160 บาท
        </div>
        <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          เช็คบิล
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  // You can enhance this later with reactive data if needed
  </script>
  
  <style scoped>
  body {
    margin: 0;
  }
  </style>
  