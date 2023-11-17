<template >
    <view class="tujian-all">
        <mo-info></mo-info>
        <div class="main"><mo-tujian></mo-tujian></div>
        <mo-nav></mo-nav>
    </view>
  </template>
  
  <script setup>
  import moInfo from '../components/mo-info.vue';
  import moNav from "../components/mo-nav.vue";
  import moTujian from '../components/mo-tujian.vue';
  </script>
  
  
  <style scoped>
  .tujian-all{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .main{
    flex: 1;
    overflow: scroll;
  }
  </style>
  