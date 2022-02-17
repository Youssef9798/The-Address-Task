<template>
  <div>
    <table class="table table-auto w-full pt-10 bg-white">
      <thead>
        <tr class="w-full">
          <th class="bg-white border-b text-left px-3 py-5 whitespace-nowrap"  v-for="(th, i) in tableHeader" :key="`${i}-th`">
            <div  class="flex justify-center items-center font-semibold text-sm primary_text_color flex-row">
              <span class="mr-2 capitalize">{{ th.text }}</span>
              <span><i :class="th.sortable ? 'fa-solid fa-caret-down cursor-pointer' : ''"></i></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(td, i) in tableData" :key="`${i}-td`" class="group hover:bg-gray-100 cursor-pointer rounded-lg transition-all">
          <td class="border-b px-3 py-4">
            <div class="flex justify-start items-center flex-row flex-wrap">
              <span class="w-full font-semibold text-gray-800 capitalize">{{ td.name }}</span>
              <span class="w-full text-sm text-gray-500">{{ td.email }}</span>
            </div>
          </td>
          <td class="border-b px-3 py-4 text-center">
            <div class="flex justify-center items-center flex-row text-sm text-gray-800 uppercase">
              <span>{{ td.oldCurrency }}</span>
              <span class="mx-2"><i class="fa-solid fa-arrow-right"></i></span>
              <span>{{ td.newCurrency }}</span>
            </div>
          </td>
          <td class="border-b px-3 py-4 text-center text-sm text-gray-800">
            {{ td.rate }}
          </td>
          <td class="border-b px-3 py-4 text-center text-sm text-gray-800 whitespace-nowrap">{{ td.tradeAmount | currency }}</td>
          <td class="border-b px-3 py-4 text-right text-sm text-gray-800">
            <div class="flex justify-start items-center">
              <span class="h-3 w-3 rounded-full mr-2" :class="{
                'bg-green-500': td.status === 'active',
                'bg-red-500': td.status === 'pending',
                'bg-blue-900': td.status === 'closed'
                }"></span>
              <span class="whitespace-nowrap">{{ td.deliveryDate === '' || td.deliveryDate === ' ' || td.deliveryDate === null ? '-' : td.deliveryDate}}</span>
            </div>
          </td>
          <td class="border-b px-3 py-4 text-center text-xs capitalize">
            <div class="flex items-center justify-center px-2 py-1 rounded-full transition-all" :class="{
                'bg-green-100 text-green-900 group-hover:text-green-100 group-hover:bg-green-500': td.status === 'active',
                'bg-yellow-100 text-yellow-500 group-hover:text-yellow-100 group-hover:bg-yellow-400': td.status === 'pending',
                'bg-blue-100 text-blue-500 group-hover:text-blue-100 group-hover:bg-blue-500': td.status === 'closed',
                'bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-red-100': td.status === 'declined',
              }">
              <span class="whitespace-nowrap">{{ td.status }}</span>
            </div>
          </td>
          <td class="border-b px-3 py-4 text-sm text-gray-800">
            <div class="whitespace-nowrap capitalize group-hover:text-blue-800">
              <span :class="{
                  'text-gray-400 text-xs': td.requiredAction === null || td.requiredAction === '' 
                }">{{ td.requiredAction === null || td.requiredAction === '' ? 'no action required' : td.requiredAction}}</span>
              <span class="ml-2 text-sm opacity-0 transition-all group-hover:opacity-100"><i class="fa-solid fa-chevron-right"></i></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: Array,
    entries: Array
  },
  computed: {
    tableHeader() {
      let passed = [];
      for(let col in this.columns){
        if(this.columns[col].show){
          passed.push(this.columns[col]);
        }
      }
      return passed;
    },
    tableData() {
      return this.entries || [];
    }
  }
}
</script>