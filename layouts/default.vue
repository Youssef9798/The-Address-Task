<template>
  <div class="flex min-h-screen w-full bg-primary-50">
    <Sidebar/>
    <div class="w-3/4">
      <transition mode="out-in" enter-active-class="animate_fadeIn" leave-active-class="animate_fadeOut">
        <Nuxt class="flex-auto h-screen overflow-y-auto p-6"/>
      </transition>
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