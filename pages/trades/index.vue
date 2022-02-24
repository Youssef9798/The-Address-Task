<template>
  <div class="bg-white">
    <!--                      Trades Index page                     -->
    <div class="trades__page__container flex flex-col w-full h-full">
      <!--                      Page Header                      -->
      <div class="trades__page__container_header w-full h-1/4 flex flex-col mb-8">
        <div class="trades__page__container_header_top w-full flex flex-row items-center">
          <!--                      Page Title                      -->
          <div class="page__title w-1/2">
            <h1 class="text-2xl font-semibold text-gray-700">Trades</h1>
          </div>
          <!--                      Page Title                      -->
          <div class="trades__page__container_btn w-1/2 text-right">
            <button class="primary_bg_color text-white rounded-lg p-3.5 px-5 text-sm font-bold hover:bg-blue-800 transition-all">Create a new trade</button>
          </div>
        </div>
          <!--                      Trades pages taps               -->
        <div class="flex trades__page__container_header_bottom my-10">
          <nav class="flex flex-col sm:flex-row border-b-2 w-full">
            <button class="mr-4 navigations__tabs_item" :class="componentView === 'allTrades' ? 'active-tab' : ''" @click="componentView='allTrades'">
                all trades
            </button>
            <button class="navigations__tabs_item" :class="componentView === 'tradeOffers' ? 'active-tab' : ''" @click="componentView='tradeOffers'">
                trade offers
            </button>
          </nav>
        </div>
        <!--                      Trades pages taps               -->
      </div>
      <!--                      Page Header                      -->
      <div class="trades__page__container_body w-full h-full flex">
        <!--                      Trades pages Content Shown herer               -->
        <transition mode="out-in" enter-active-class="animate_fadeIn" leave-active-class="animate_fadeOut">
          <component :trades="trades" :is="componentView"></component>
        </transition>
        <!--                      Trades pages Content Shown herer               -->
      </div>
    </div>
  </div>
</template>
<script>
import allTrades from '@/components/Trades/all-trades';
import tradeOffers from '@/components/Trades/trade-offers';

export default {
  data() {
    return {
      componentView: 'allTrades',
    }
  },
  asyncData(context) {
    if (context.payload) {
      return {
        trades: context.payload
      }
    }
    return context.app.$axios.$get('/trades')
      .then(data => {
        return {
          trades: data
        }
      })
      .catch(e => context.error(e))
  },
  components: {
    allTrades,
    tradeOffers
  }
}
</script>
<style scoped>
  button.active-tab {
    color: #003171;
    margin-bottom: -2px;
    border-bottom: 2px solid #003171;
  }
  .animate_fadeIn {
  opacity: 0;
  animation: fadeIn 300ms linear;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate_fadeOut {
  opacity: 1;
  animation: fadeOut 300ms linear;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>