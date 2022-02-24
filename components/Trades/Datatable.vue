<template>
  <div class="pt-5">
    <table class="table table-auto w-full pt-10 bg-white" ref="table">
      <thead>
        <tr class="w-full">
          <th
            class="bg-white border-b text-left px-3 py-5 whitespace-nowrap text-sm text-gray-500"
            v-for="(th, i) in tableHeader"
            :key="`${i}-th`"
            :data-column="th.name"
            data-order="desc"
          >
            <div
              class="table_header_name flex justify-center items-center font-semibold text-xs flex-row text-gray-500"
            >
              <span class="mr-2 capitalize">{{ th.text }}</span>
              <span
                ><i
                  :class="
                    th.sortable ? 'fa-solid fa-caret-down cursor-pointer' : ''
                  "
                ></i
              ></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(td, i) in tableData"
          :key="`${i}-td`"
          class="group hover:bg-gray-100 cursor-pointer rounded-lg transition-all"
        >
          <td class="border-b px-3 py-6 w-28 overflow-ellipsis whitespace-nowrap overflow-hidden" v-show="columnShow">
            <div class="w-full flex justify-start items-center flex-row flex-wrap overflow-ellipsis whitespace-nowrap overflow-hidden">
              <span class="w-52 font-semibold text-gray-800 capitalize whitespace-nowrap overflow-ellipsis overflow-hidden">{{
                td.tradeHandler.name
              }}</span>
              <span class="w-52 text-sm text-gray-500 overflow-ellipsis whitespace-nowrap overflow-hidden">{{
                td.tradeHandler.email
              }}</span>
            </div>
          </td>
          <td class="border-b px-3 py-4 text-center" v-show="columnShow">
            <div
              class="flex justify-center items-center flex-row text-sm text-gray-800 uppercase"
            >
              <span>{{ td.tradeCurrencies.oldCurrency }}</span>
              <span class="mx-2"><i class="fa-solid fa-arrow-right"></i></span>
              <span>{{ td.tradeCurrencies.newCurrency }}</span>
            </div>
          </td>
          <td
            class="border-b px-3 py-4 text-center text-sm text-gray-800"
            v-show="columnShow"
          >
            {{ td.rate }}
          </td>
          <td
            class="border-b px-3 py-4 text-center text-sm text-gray-800 whitespace-nowrap"
            v-show="columnShow"
          >
            {{ td.tradingAmount | currency }}
          </td>
          <td
            class="border-b px-3 py-4 text-right text-sm text-gray-800"
            v-show="columnShow"
          >
            <div class="flex justify-start items-center">
              <span
                class="h-3 w-3 rounded-full mr-2"
                :class="{
                  'bg-green-500': td.status === 'active',
                  'bg-red-500': td.status === 'pending',
                  'bg-blue-900': td.status === 'closed',
                }"
              ></span>
              <span class="whitespace-nowrap">{{
                td.deliveryDate === "" ||
                td.deliveryDate === " " ||
                td.deliveryDate === null
                  ? "-"
                  : td.deliveryDate
              }}</span>
            </div>
          </td>
          <td
            class="border-b px-3 py-4 text-center text-xs capitalize"
            v-show="columnShow"
          >
            <div
              class="flex items-center justify-center px-2 py-1 rounded-full transition-all"
              :class="{
                'bg-green-100 text-green-500 group-hover:text-green-100 group-hover:bg-green-500':
                  td.status === 'active',
                'bg-yellow-100 text-yellow-500 group-hover:text-yellow-100 group-hover:bg-yellow-400':
                  td.status === 'pending',
                'bg-blue-100 text-blue-900 group-hover:text-blue-100 group-hover:bg-blue-900':
                  td.status === 'closed',
                'bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-red-100':
                  td.status === 'declined',
              }"
            >
              <span class="whitespace-nowrap uppercase font-bold">{{ td.status }}</span>
            </div>
          </td>
          <td
            class="border-b px-3 py-4 text-sm text-gray-800"
            v-show="columnShow"
          >
            <div class="whitespace-nowrap capitalize">
              <span
                :class="{
                  'text-gray-400 text-xs':
                    td.requiredAction === null || td.requiredAction === '',
                }"
                >{{
                  td.requiredAction === null || td.requiredAction === ""
                    ? "no action required"
                    : td.requiredAction
                }}</span
              >
              <span
                class="ml-2 text-sm opacity-0 transition-all group-hover:opacity-100 group-hover:text-blue-800"
                ><i class="fa-solid fa-chevron-right"></i
              ></span>
            </div>
          </td>
        </tr>
        <tr v-if="tableData.length == 0">
          <td
            :colspan="tableHeader.length"
            class="text-center py-10 bg-gray-100"
          >
            No Data Available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    columns: Array,
    entries: Array,
    filteredEntries: Array,
    colIdx: Number,
  },
  data() {
    return {
      columnShow: true,
      passed: [],
    };
  },
  computed: {
    tableHeader() {
      let passed = [];
      for (let col in this.columns) {
        
        if (this.columns[col].show) {
          passed.push(this.columns[col]);
        }
      }

      this.passed = passed;

      return this.columns;
    },
    tableData() {
      return this.entries || [];
    },
  },
  watch: {
    passed() {
      const { table } = this.$refs;

      // Hide column table header
      if (/\d+/.test(`${this.colIdx}`)) {
        const [thead, tbody] = [...table.children];
        thead.children[0].children[this.colIdx].classList.toggle("hidden");

        Array.from(tbody.children).forEach((row) =>
          row.children[this.colIdx].classList.toggle("hidden")
        );
      }
    },
  },
  methods: {
    // test() {
    //   const {table} = this.$refs;
    //   // Hide column table header
    //   if(table){
    //     const [ thead, tbody ] = [...table.children];
    //     thead.children[0].children[this.colIdx].classList.toggle('hidden')
    //     Array.from(tbody.children).forEach(row => {
    //       console.dir(row.children[this.colIdx].classList.toggle('hidden'))
    //     })
    //   }
    // }
  },
};
</script>