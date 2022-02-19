<template>
  <div>
    <!--                Filters Component box modal             /Start -->
    <!--                The overlay background      "start"-->
    <div v-if="filtersVisible" class="absolute inset-0 z-40 bg-black w-screen h-screen opacity-50"></div>
    <!--                The overlay background      "end"-->
    <!--                The Box Modal               "start"-->
    <div v-if="filtersVisible" class="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex justify-center items-center">
      <div class="relative mx-auto max-w-2xl w-4/5">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col py-2 px-5 justify-between">
          <div class="w-full py-6 border-b">
            <h1 class="text-2xl font-semibold text-gray-800 capitalize">datatable Filters</h1>
          </div>
          <div class="flex flex-row flex-wrap flex-1 border-b">
            <!-- This Section contains the columns to be shown and to be hide  -->
             <!-- NOTE: Please notice that I used the event delgation here when click to get the column index when mark and unmark the checkbox this done by passing the name of the column to the event and get the index of this column -->
            <div class="flex flex-row flex-wrap w-full border-b py-4" @click="test($event)">
              <h1 class="w-full font-semibold text-gray-700 py-1">Columns</h1>
              <p class="w-full px-5 py-2 capitalize bg-blue-100 text-blue-900 rounded-full my-3 text-xs font-semibold">Unmark the required column to be hidden</p>
              <div v-for="col in columns" :key="col.id" class="w-1/2 flex flex-row items-center">
                <div class="capitalize flex flex-row items-center flex-nowrap w-full border m-1 py-1 px-3 cursor-pointer">
                  <label class="w-full text-sm primary_text_color cursor-pointer" :for="`in-${col.id}`">{{ col.text }}</label>
                  <input type="checkbox" :name="`${col.name}`" v-model="col.show">
                </div>
              </div>
            </div>
             <!-- This Section contains the columns to be shown and to be hide  -->
             <!-- This Section contains the entries to be shown per page  -->
             <!-- NOTE: Please notice that on change the select input value this emits a function to the parent to return the new value of the entries shown per page  -->
            <div class="flex flex-row flex-wrap w-full items-center py-4">
              <h1 class="w-full font-semibold text-gray-700 py-1">Entries</h1>
              <span class="text-xs mr-6 text-gray-700">Entries per page</span>
              <div class="flex justify-center relative">
                <select class="form-select appearance-none block w-28 px-3 py-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none cursor-pointer" id="entriesShow"  @change="changeEntries">
                  <option v-for="se in minEntries" :key="se" :value="se" :selected="se == currentVal">{{ se }}</option>
                </select>
                  <label for="entriesShow" class="absolute right-2 top-0">
                    <i class="fa-solid fa-angle-down"></i>
                  </label>
              </div>
            </div>
            <!-- This Section contains the entries to be shown per page  -->
            <!-- This Section contains the types of the searching category by column  -->
            <!-- NOTE: Please notice that on change the select input value this emits a function to the parent to return the new value of the search filter type by coulmn  -->
            <div class="flex flex-row flex-wrap w-full items-center py-4">
              <h1 class="w-full font-semibold text-gray-700 py-1">Search By</h1>
              <span class="text-xs mr-6 text-gray-700">Search by which column</span>
              <div class="flex justify-center relative capitalize">
                <select class="capitalize form-select appearance-none block px-2 pr-5 py-1 text-xs font-normal w-auto text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none cursor-pointer" id="searchBy"  @change="changeSearchCol">
                  <option selected value="">none</option>
                  <option v-for="col in columns" :key="col.id" :value="col.name">{{ col.text }}</option>
                </select>
                  <label for="searchBy" class="absolute right-1.5 top-0">
                    <i class="fa-solid fa-angle-down"></i>
                  </label>
              </div>
            </div>
            <!-- This Section contains the types of the searching category by column  -->
          </div>
          <div class="flex flex-row flex-nowrap items-center justify-end py-5">
            <button class="mx-2 capitalize py-1 px-6 bg-blue-500 text-white rounded-md" @click="closeFilters">Close</button>
            <!-- <button class="mx-2 capitalize py-1 px-6 bg-green-400 text-white rounded-md" @click="closeFilters">Save</button> -->
          </div>
        </div>
      </div>
    </div>
    <!--                The Box Modal               "end"-->
    <!--                Filters Component box modal             /End -->
  </div>
</template>

<script>
export default {
  props: ['filtersVisible', 'columns', 'currentEntries', 'showEntries', 'entries'],
  data(){
    return {
      currentVal: this.currentEntries,
      minEntries: [] 
    }
  },
  model: {
    prop: 'currentEntries',
    event: 'change'
  },
  created(){
    this.showEntriesCal();
  },
  methods: {
    closeFilters() {
      this.$emit('closeFilters', false)
    },
    changeEntries(event) {
      this.currentVal = event.target.value;
      this.$emit('changeEntries', event.target.value);
    },
    showEntriesCal(){
      this.showEntries.map(el => {
        if(this.entries.length >= el){
          this.minEntries.push(el);
        }
      })
      return this.minEntries;
    },
    changeSearchCol(event){
      this.currentVal = event.target.value;
      this.$emit('changeSearch', event.target.value);
    },
    test(e){
      const { tagName } = e.target;
  
      if (['INPUT'].includes(tagName)) {
          const { name: colName } = e.target;

          /** @type {string[]} */
          const columns = [...this.columns];
          const colIdx = columns.findIndex((col) => col.name === colName);
          this.$emit('getColIdx', colIdx);
      }
    }
  },
}
</script>