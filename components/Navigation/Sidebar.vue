<template>
    <div class="w-1/5 md:w-1/5 lg:w-1/5 h-screen bg-white border-r flex z-30 flex-col relative" id="main-nav">
        <!-- The Profile and logo data  "start"-->
          <div class="w-full h-auto flex flex-col px-0 mb-6 space-y-4">
            <!-- Logo's Data placed here -->
            <div class="w-full pt-9 pl-6 flex flex-row flex-nowrap items-center">
              <img src="~/static/xlogo-300x300.png" class="w-6 h-6 rounded-md mr-3">
              <p class="font-normal text-2xl primary_text_color"><span class="font-bold">X</span>Trade</p>
            </div>
            <!-- profile's Data displayed here -->
            <div class="w-full flex p-8 flex-shrink-0">
              <img v-if="profile.profileImage" class="w-10 h-10 rounded-full flex-shrink-0 mr-4 bg-gray-200 object-cover border border-gray-100" :src="profile.profileImage" alt="">
              <div v-else class="w-10 h-10 flex rounded-full flex-shrink-0 mr-4 bg-gray-200 object-cover border border-gray-100 uppercase items-center justify-center font-semibold text-sm">
                <span class="primary_text_color">{{ initials }}</span>
              </div>
              <div class="text-center space-y-2 sm:text-left">
                <div class="space-y-0.5">
                  <p class="text-xs text-gray-400 font-bold capitalize">
                    {{ profile.role }}
                  </p>
                  <p class="text-base text-gray-800 font-semibold capitalize">
                    {{ profile.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        <!-- The Profile and logo data "end" -->
        <!--               The App Router's Links "Start"          -->
          <div class="mb-4 px-4"> 
            <ul>
              <li>
                <nuxt-link to="/" class="sidebar__menu_link_item sidebar__menu_link_item--hover" exact><i class="fas fa-home-lg mr-2"></i>Dashboard</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/trades" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-arrows-rotate mr-2"></i>Trades</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/organizations" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-users mr-2"></i>Organizations</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/users" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-user mr-2"></i>Users</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/settings" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-sliders mr-2"></i>System Settings</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="w-full mt-8 px-4 absolute bottom-0">
            <nuxt-link to="/logout" class="sidebar__menu_link_item sidebar__menu_link_item--hover"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout</nuxt-link>
          </div>
        <!--               The App Router's Links "Start"          -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      profile: {},
      initials: ''
    }
  },
  created(){
    this.$store.$axios.$get('/profile').then(res => {
      this.profile = res;
      this.profilePicName();
    })
    .catch(err=> console.log(err));
  },
  methods: {
    profilePicName(){
      if(this.profile){
        if(this.profile.profileImage === "" || this.profile.profileImage === null || this.profile.profileImage === undefined){
          for(let i = 0; i < this.profile.name.split(' ').length; i++){
            this.initials += this.profile.name.split(' ')[i].charAt(0)
          }
        }

      }
    }
  }
}
</script>
<style scoped>
  a.nuxt-link-exact-active, a.nuxt-link-active{
    @apply bg-gray-100;
    /* color: #283754; */
    color: #003171;
    transition: all 300ms;
  }
</style>