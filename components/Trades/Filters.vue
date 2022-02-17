<template>
  <div>
    <div v-if="filtersVisible" class="absolute inset-0 z-40 bg-black w-screen h-screen opacity-50"></div>
    <div v-if="filtersVisible" class="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex justify-center items-center">
      <div class="relative mx-auto max-w-2xl w-4/5">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col py-2 px-5 justify-between">
          <div class="w-full py-6 border-b">
            <h1 class="text-2xl font-semibold text-gray-800 capitalize">datatable Filters</h1>
          </div>
          <div class="flex flex-row flex-wrap flex-1 border-b">
            <div class="flex flex-row flex-wrap w-full border-b py-4">
              <h1 class="w-full font-semibold text-gray-700 py-1">Columns</h1>
              <p class="w-full px-5 py-2 capitalize bg-blue-100 text-blue-900 rounded-full my-3 text-xs font-semibold">Unmark the required column to be hidden</p>
              <div v-for="col in columns" :key="col.id" class="w-1/2 flex flex-row items-center">
                <div class="capitalize flex flex-row items-center flex-nowrap w-full border m-1 py-1 px-3 cursor-pointer">
                  <label class="w-full text-sm primary_text_color cursor-pointer" :for="`in-${col.id}`">{{ col.text }}</label>
                  <input type="checkbox" :id="`in-${col.id}`" name="`in-${col.id}`" v-model="col.show">
                </div>
              </div>
            </div>
            <div class="flex flex-row flex-wrap w-full items-center py-4">
              <h1 class="w-full font-semibold text-gray-700 py-1">Entries</h1>
              <span class="text-xs mr-6 text-gray-700">Entries per page</span>
              <div class="flex justify-center relative">
                <select class="form-select appearance-none block w-28 px-3 py-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none cursor-pointer" id="entriesShow"  @change="changeEntries">
                  <option v-for="se in showEntries" :key="se" :value="se" :selected="se == currentVal">{{ se }}</option>
                </select>
                  <label for="entriesShow" class="absolute right-2 top-0">
                    <i class="fa-solid fa-angle-down"></i>
                  </label>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-nowrap items-center justify-end py-5">
            <button class="mx-2 capitalize py-1 px-6 bg-blue-500 text-white rounded-md" @click="closeFilters">Close</button>
            <!-- <button class="mx-2 capitalize py-1 px-6 bg-green-400 text-white rounded-md" @click="closeFilters">Save</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filtersVisible', 'columns', 'currentEntries', 'showEntries'],
  data(){
    return {
      currentVal: this.currentEntries 
    }
  },
  model: {
    prop: 'currentEntries',
    event: 'change'
  },
  methods: {
    closeFilters() {
      this.$emit('closeFilters', false)
    },
    changeEntries(event) {
      this.currentVal = event.target.value;
      this.$emit('changeEntries', event.target.value);
    }
  },
}
</script>