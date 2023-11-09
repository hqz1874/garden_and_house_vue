<template>
  <view class="appall">
    <router-view></router-view>
  </view>
</template>

<script setup>
// import {ref, reactive} from "vue"
// import moNav from "./components/mo-nav.vue";
// import moInfo from "./components/mo-info.vue"


</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.appall{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>
