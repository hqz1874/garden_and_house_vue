<template>
    <div class="tujianall">
        <div class="tjbox" v-for="(item, index) in zwlist">
            <img :src="zwlist[index].zw_tj_no" alt="" v-if="zwlist[index].zw_tj_state ==0">
            <img :src="zwlist[index].zw_tj_have" alt="" v-if="zwlist[index].zw_tj_state ==1">
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted , inject} from "vue"
const axios = inject("axios")

const zwlist = ref([])


onMounted(()=>{
    getshowdata()
})

const getshowdata = async()=>{
    let backdata =  await axios.get("/zwinfo/allzw");  
    let alldata = backdata.data.rows 
   console.log(alldata);
    let res = alldata.shift()
   zwlist.value = alldata
}

</script>

<style scoped>
.tujianall{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 1300px;

    
}
.tjbox img{
    width: 150px;
    height: 150px;
    background-color: aquamarine;
    margin: 10px;
    border: 2px solid red;
}
    
</style>