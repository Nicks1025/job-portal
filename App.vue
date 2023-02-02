<template>
  <!-- <user_registration></user_registration> -->
  <!-- <login></login> -->
  <!-- <jobList></jobList> -->
  <!-- <profile></profile> -->
  <!-- <jobsApplied></jobsApplied> -->
  <router-view></router-view>
</template>

<script>
  import registration from "./components/user_registration.vue"
  import login from "./components/user_login.vue"
  import jobList from "./components/job_list.vue"
  import profile from "./components/profile.vue"
  import jobsApplied from "./components/job_application.vue"
export default {
  components : {
    user_registration : registration,
    login : login,
    jobList : jobList, 
    profile : profile,
    jobsApplied : jobsApplied
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
