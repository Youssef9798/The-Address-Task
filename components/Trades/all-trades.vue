<template>
  <!--                      All Trades Component               -->
    <div class="bg-white h-full w-full">
    <!--                  Tab header "Search bar and Buttons"          |Start -->  
      <div class="flex flex-row items-center justify-between flex-nowrap h-auto bg-gray-100 px-5 py-4 rounded-lg">
        <!--                  Search Bar    |Start -->
        <!--  I made the search bar filters the fetched data and return a new array of data that match the search  -->
        <!-- NOTE: Please notice that Searching won't work as long as you don't select the search filters from filters popup -->
        <div class="w-4/5 flex-auto mr-4">
          <label class="relative block w-full">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center px-4 primary_text_color">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for organizations, trading amounts..." type="text" name="search" v-model="searchValue"/>
          </label>
        </div>
        <!--                  Search Bar    |End -->
        <!--                  Buttons       |Start -->
        <div class="w-1/5 flex flex-nowrap flex-row items-center">
          <div>
            <!-- NOTE: Please notice that the filters button opens the filters popup box modal which contains the seacrhing filters and the shown and hidden columns and the entries show per page -->
            <button class="primary_btn py-2 px-4 button--shadow-inner text-sm capitalize font-normal bg-white rounded-md primary_text_color hover:text-white transition-all whitespace-nowrap border border-slate-300 shadow-sm outline-none focus:outline-none" @click="filtersVisible = !filtersVisible">
              <i class="fa-solid fa-filter"></i>
              Filters
            </button>
          </div>
          <div class="mx-6 relative">
            <button class="primary_btn relative z-20 py-2 px-4 button--shadow-inner text-sm drop-shadow capitalize font-normal border border-slate-300 bg-white rounded-md whitespace-nowrap primary_text_color hover:text-white transition-all shadow-sm outline-none focus:outline-none" @click="menuVisible= !menuVisible" type="button" :class="{'active_btn': menuVisible}">
              <i class="fa-solid fa-circle-arrow-down"></i>
              export
            </button>
            <button v-if="menuVisible" @click="menuVisible = false" class="fixed inset-0  w-full h-full bg-black opacity-0 z-10"></button>
            <div v-if="menuVisible" class="absolute w-auto mt-3 whitespace-nowrap right-0 z-40 text-xs list-none bg-white rounded divide-y divide-gray-100 shadow">
              <ul class="p-2 text-xs capitalize">
                <li>
                  <a href="#" class="block py-2 px-4 text-xs rounded-md text-gray-700 hover:bg-gray-100">export as .csv</a>
                </li>
                <li>
                  <a href="#" class="block py-2 px-4 text-xs rounded-md text-gray-700 hover:bg-gray-100">export as .xslx</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--                  Buttons       |Start -->
      </div>
    <!--                  Tab header "Search bar and Buttons"          |End -->  
    <!--                  Datatable Component Placed here          |Start --> 
      <div class="w-full overflow-x-auto mb-16">
        <!-- NOTE: Please notice that datatable copmponent accetps some props such as the columns data and the filtered entries which is return the entire data of the entires as long as the select search is empty and the column index sent from the filters component to hide and show columns  -->
        <DataTable :columns="columns" :entries="filteredEntries" :colIdx="colIdx"/>
      </div>
    <!--                  Datatable Component                       |End --> 
    <!--                  Table pagination                       |Start --> 
      <div class="flex flex-row justify-end items-center p-5 bg-gray-100 rounded-lg mb-10">
        <div class="w-4/6 text-xs text-gray-500 font-semibold">
          <p>1-<span>{{ currentEntries }}</span> of {{ entries.length }}</p>
        </div>
        <div class="w-2/6 flex flex-nowrap flex-row items-center justify-end text-right">
          <div class="flex-auto flex flex-nowrap items-center px-2 border-r-2 border-gray-300 mr-4">
            <label for="current_page" class="font-semibold whitespace-nowrap text-xs text-gray-500 pr-3">The page you're on</label>
            <div class="flex justify-center relative">
              <select class="form-select block w-auto px-1 py-1 text-xs font-normal primary_text_color bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-blue-700 focus:bg-white focus:outline-none cursor-pointer" id="current_page" v-model="currentPage">
                <option v-for="n in totalPages" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div class="flex-auto flex flex-nowrap items-center ml-4 px-2 text-xs">
            <button class="px-2 py-1 bg-white rounded-lg border border-gray-300 primary_text_color mr-2 primary_btn hover:text-white" :class="{'disabled_btn': isInFirstPage}" :disabled="isInFirstPage" @click="onPrevPage">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="px-2 py-1 bg-white rounded-lg border border-gray-300 primary_text_color primary_btn hover:text-white" :class="{'disabled_btn': isInLastPage}"  :disabled="isInLastPage" @click="onNextPage">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    <!--                  Table pagination                       |Start -->
    <!--        Filters Popup Box Modal Component                       |Start -->
      <!-- NOTE: Please notice that the filters component accepts props and emits events to the parent component -->
        <!-- showEntries : this responsible for passing the pagination entires show per page types -->
        <!-- entries : this responsible for passing the entires of the datatable -->
        <!-- currentEntires : this responsible for passing the current entires of the datatable shown per page -->
        <!-- columns : this responsible for passing the datatable columns array -->
        <!-- filtersVisible : this responsible show and hide the filters popup -->

        <!-- @changeEntries : this event return the changing of the entries shown per page -->
        <!-- @closeFilters : this event close the filters popup -->
        <!-- @changeSearch : this event return the selected search category by column to the search bar -->
        <!-- @getColidx : this event return the index of the column to from the selected column to be shown or hide and passing it to the datatable through function to hide the related column from the datatable component -->
      <Filters :showEntries="showEntries" :entries="entries" :currentEntries="currentEntries" @changeEntries="changingEntries($event)" :columns="columns" @closeFilters="closeFilterModal($event)" :filtersVisible="filtersVisible" @changeSearch="changingSearch($event)" @getColIdx="getColumnIndex"/>
    <!--        Filters Popup Box Modal Component                       |End -->
    </div>
  <!--                      All Trades Component               -->
</template>

<script>
import DataTable from '@/components/Trades/Datatable';
import Filters from '@/components/Trades/Filters';


// import Data from '~/static/data.json';

export default {
  props:['trades'],
  data() {
    return {
      columns: [
        {id: '1', name: 'tradeHandler', text: 'trade handler', sortable: true, show: true},
        {id: '2', name: 'tradeCurrencies', text: 'Trade Currencies', sortable: false, show: true},
        {id: '3', name: 'rate', text: 'Rate', sortable: true, show: true},
        {id: '4', name: 'tradingAmount', text: 'Trading Amount', sortable: true, show: true},
        {id: '5', name: 'deliveryDate', text: 'Delivery Date', sortable: true, show: true},
        {id: '6', name: 'status', text: 'Status', sortable: true, show: true},
        {id: '7', name: 'requiredAction', text: 'Required Action', sortable: true, show: true},
      ],
      entries: [],
      showEntries: [5, 10, 15, 25, 50, 100],
      currentEntries: 5,
      // filteredEntries: [],
      menuVisible: false,
      filtersVisible: false,
      currentPage: 1,
      totalPages: 1,
      searchValue: '',
      searchCol: '',
      colIdx: null
    }
  },
  created(){
    this.entries = this.trades;
    this.totalData();
  },
  methods: {
    closeFilterModal(val){
      this.filtersVisible = val;
    },
    changingEntries(val){
      this.currentEntries = val;
    },
    changingSearch(val){
      this.searchCol = val;
    },
    onNextPage(){
      return this.currentPage += 1;
    },
    onPrevPage(){
      return this.currentPage -= 1;
    },
    totalData() {
      // console.log(this.trades.length);
      if(this.trades.length <= this.currentEntries){
        return this.totalPages = 1;
      }
      // console.log(Math.ceil(this.trades.length / this.currentEntries));
      return this.totalPages = Math.ceil(this.trades.length / this.currentEntries)
    },
    getColumnIndex(val){
      this.colIdx = val;
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return true;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return true;
      }

      // When inbetween
      return true;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    filteredEntries() {
     
      let selectedFilter = this.searchCol;
      
      if(selectedFilter.length > 0){
        return this.entries.filter(obj => {
          if(typeof obj[`${selectedFilter}`] !== 'object'){
            return `${obj[`${selectedFilter}`]}`.match(this.searchValue);
          }
            return `${Object.values(obj[`${selectedFilter}`]).join()}`.match(this.searchValue)
        })
      }
      if(selectedFilter.length <= 0 || this.searchValue === "") {
        return this.entries = this.trades;
      }
    }
  },
  components: {
    DataTable,
    Filters
  }
}
</script>

<style scoped>
  .button--shadow-inner {
    /* box-shadow: inset 2px 2px 4px 0px rgba(0, 0, 0, 0.2); */
  }
  .primary_btn:hover {
    background: #003171;
    color: #ffffff;
  }
  .active_btn {
    @apply text-white;
    background: #003171;
  }
  .disabled_btn {
    @apply text-gray-500 opacity-50 cursor-not-allowed hover:bg-white;
  }
</style>