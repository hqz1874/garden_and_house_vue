<template >
  <view class="huayuan-all">
      <mo-info></mo-info>
      <div class="main"><mo-garden></mo-garden></div>
      <mo-nav></mo-nav>
  </view>
</template>

<script setup>
import moGarden from '../components/mo-garden.vue'
import moInfo from '../components/mo-info.vue';
import moNav from "../components/mo-nav.vue"
</script>


<style scoped>
.huayuan-all{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.main{
  flex: 1;
}
</style>
