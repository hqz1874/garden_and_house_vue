<template >
  <view class="home-all">
        <mo-info></mo-info>
        <div class="main">123</div>
        <mo-nav></mo-nav>
  </view>
</template>


<script setup>
import moInfo from '../components/mo-info.vue';
import moNav from "../components/mo-nav.vue";
import { ref, reactive, inject, onMounted ,} from 'vue'


// const showdata = ref([])

// onMounted(() => {
//   getdata()
// })

// const axios = inject("axios")

// const getdata = async() =>{
//   let backdata =  await axios.get("/zwinfo/giveme");
//   let alldata = backdata.data.rows
//   console.log(backdata);
//   console.log(alldata);
//   showdata.value = alldata
// }


</script>


<style scoped>
.home-all{
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
