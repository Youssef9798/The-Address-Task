import Vuex from 'vuex';

/**
 * This Store for fetch the profile data and the trades data
 * 
 */

const createStore = () => {
  return new Vuex.Store({
    state: {
      trades: [],
      profile: {}, 
    },
    mutations: {
      FETCH_TRADES(state, trades) {
        state.trades = trades;
      },
      FETCH_PROFILE(state, profile) {
        state.profile = profile;
      }
    }, 
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios.$get(`/trades`).then(data => {
          const tradesArray = [];
          for (const key in data) {
            tradesArray.push({ ...data[key], id: key });
          }
          vuexContext.commit("FETCH_TRADES", tradesArray);
        })
        .catch(e => context.error(e));
      },
      // fetch_profile({commit}){
      //   const profile = await Axios.get(`/profile`);
      //   console.log(profile);
      //   $store.commit('FETCH_TRADES', profile);
      // },
      fetch_trades(vuexContext, trades){
        vuexContext.commit('FETCH_TRADES', trades);
      }
    },
    getters: {
      get_profile(state) {
        return state.profile;
      },
      get_trades(state) {
        return state.trades;
      }
    }
  })
}

export default createStore;