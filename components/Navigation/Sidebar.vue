<template>
    <div class="w-1/4 md:w-1/4 lg:w-1/4 h-screen bg-white border-r flex z-30 flex-col" id="main-nav">

          <div class="w-full h-auto flex flex-col px-0 mb-8 space-y-4">
            <div class="w-full pt-9 pl-6">
              <p class="font-semibold text-2xl text-blue-700"><span class="text-indigo-900">X</span>Trade</p>
            </div>

            <div class="w-full flex p-8 flex-shrink-0">
              <img class="w-12 h-12 rounded-full flex-shrink-0 mr-4 bg-gray-200 border object-cover" src="" alt="">
              <div class="text-center space-y-2 sm:text-left">
                <div class="space-y-0.5">
                  <p class="text-xs text-gray-400 font-bold">
                    Supplier
                  </p>
                  <p class="text-base text-gray-800 font-semibold">
                    Laura Schellen
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4 px-4"> 
            <ul>
              <li>
                <nuxt-link to="/" class="sidebar__menu_link_item sidebar__menu_link_item--hover" exact><i class="fas fa-home-lg mr-2"></i>Dashboard</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/trades" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-arrow-right-arrow-left mr-2"></i>Trades</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/organizations" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-sitemap mr-2"></i>Organizations</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/users" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-user mr-2"></i>Users</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/settings" class="font-semibold w-full flex items-center text-gray-400 h-10 pl-4 hover:bg-gray-100 rounded-lg cursor-pointer mt-2 mb-2"><i class="fa-solid fa-sliders mr-2"></i>System Settings</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="mt-8 px-4">
            <nuxt-link to="/logout" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout</nuxt-link>
          </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>
<style scoped>
  a.nuxt-link-exact-active, a.nuxt-link-active{
    @apply bg-gray-100;
    /* color: #283754; */
    color: #0835C4;
    transition: all 300ms;
  }
</style>