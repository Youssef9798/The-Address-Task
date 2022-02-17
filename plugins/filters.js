import Vue from 'vue';

Vue.filter('currency', (value) => {
  return '$ ' + Number(value).toLocaleString();
})