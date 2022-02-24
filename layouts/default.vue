<template>
  <div class="flex min-h-screen w-screen bg-primary-50">
    <!--                 The Sidebar  Component                   -->
    <Sidebar/>
    <!--                 The Sidebar  Component                   -->
    <div class="w-4/5">
    <!--                 The App Core Component     "router views"              -->
      <transition mode="out-in" enter-active-class="animate_fadeIn" leave-active-class="animate_fadeOut">
        <Nuxt class="flex-auto h-screen overflow-y-auto p-6"/>
      </transition>
    <!--                 The App Core Component     "router views"              -->
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Navigation/Sidebar';
export default {
  components: {
    Sidebar
  }
}
</script>
<style scoped>

/*
 * .animate_fadeIn this class for transition In the router views of the app
 * .animate_fadeOut this class for transition Out the router view of the app
 */
.animate_fadeIn {
  opacity: 0;
  animation: fadeIn 1s linear;
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
  animation: fadeOut 1s linear;
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