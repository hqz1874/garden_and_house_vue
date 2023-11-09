<template >
    <view class="bag-all">
        <mo-info></mo-info>
        <div class="bag-main">
            <ul class="bag-menu">
                <li v-for="(bagMenuItem, index) in bagMenuItems" @click="enterbag(bagMenuItem.mid)">
                    {{ bagMenuItem.name }}
                </li>
            </ul>
            <!-- 展示部分 -->
            <ul class="bag-show">
                <li v-if="bag_state == 0">
                    <div class="bag-every-show" v-for="(lat,index) in showlatBS">
                      <img :src="showBS[index].zw_seed" alt="" >
                      <div class="qty">{{lat.goods_qty}}</div>
                    </div>
                </li>
                <li v-if="bag_state == 1">
                  <div class="bag-every-show" v-for="(lat,index) in showlatBC">
                      <img :src="showBC[index].zw_crop" alt="" >
                      <div class="qty">{{lat.goods_qty}}</div>
                    </div>
                </li>
                <li v-if="bag_state == 2">
                  <div class="bag-every-show" v-for="(lat,index) in showlatPP">
                      <img :src="showPP[index].pp_img" alt="" >
                      <div class="qty">{{lat.goods_qty}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <mo-nav></mo-nav>
    </view>
  </template>
  
  <script setup>
  import moInfo from '../components/mo-info.vue';
  import moNav from "../components/mo-nav.vue";
  import {ref, inject, onMounted} from "vue"
//   这是背包选页卡的脚本
const bagMenuItems = [{name:"种子类",mid:0},{name:"产物类",mid:1},{name:"道具类",mid:2}]
const bag_state = ref(0)
const enterbag = (menuid)=>{
    bag_state.value = menuid
}

const showlatBS = ref([])
const showBS = ref([])

const showlatPP = ref([])
const showPP = ref([])

const showlatBC = ref([])
const showBC = ref([])

onMounted(()=>{
    getSeedBag()
    getPropBag()
    getCropBag()
})

//   引入axios
const axios = inject("axios")


//   获取种子背包里的需要资源
const getSeedBag = async() =>{
    let seedbackdata = await axios.get("/baginfo/BS")
    let seedbagdata = seedbackdata.data.rows
    showlatBS.value = seedbagdata
    // 提取背包中种子的植物id
    let allzwid  = seedbagdata.map((item) =>{
                    let obj = {
                        goods_id : item.goods_id
                    }
                    return obj
                    })
    // 转化为数字id 
    let seedsearchid = []
    for(let i=0 ; i<allzwid.length ; i++){
        let arr = Object.values(allzwid[i])
        let arrpush = arr[0]
        seedsearchid.push(arrpush)
    }
    // 通过种子格子里记录的植物id，查询植物信息，获取展示图
    let zwdata = []
    for(let m=0 ; m<seedsearchid.length; m++){
        let zwbackdata = await axios.get("/zwinfo/givezw?id="+seedsearchid[m])
        let zw = zwbackdata.data.rows[0]
        zwdata.push(zw)
    }
    showBS.value = zwdata
  }

//   获取道具背包里的需要资源
const getPropBag = async() =>{
    let propbackdata = await axios.get("/baginfo/userPP")
    let ppdata = propbackdata.data.rows
    showlatPP.value = ppdata

    // 提取背包中道具的id
    let getid  = ppdata.map((item) =>{
                    let obj = {
                        goods_id : item.goods_id
                    }
                    return obj
                    })
    // 转化为数字id 
    let searchid = []
    for(let i=0 ; i<getid.length ; i++){
        let arr = Object.values(getid[i])
        let push = arr[0]
        searchid.push(push)
    }
    // 通过道具格子里记录的道具id，查询道具信息，获取展示图
    let ppshowdata = []
    for(let m=0 ; m<searchid.length; m++){
        let ppbackdata = await axios.get("/baginfo/PP?id="+searchid[m])
        let pp = ppbackdata.data.rows[0]
        ppshowdata.push(pp)
    }
    showPP.value = ppshowdata
  }

  // 获取产品背包的数据
  
  const getCropBag = async()=>{
    let backdata = await axios.get("/baginfo/BC")
    let res = backdata.data.rows
    showlatBC.value = res
    console.log(res);
    // 提取背包中对应的植物id
    let zwids  = res.map((item) =>{
                    let obj = {
                        goods_id : item.goods_id
                    }
                    return obj
                    })
    // 转化为数字id 
    let searchid = []
    for(let i=0 ; i<zwids.length ; i++){
        let arr = Object.values(zwids[i])
        let arrpush = arr[0]
        searchid.push(arrpush)
    }
    // 通过格子里记录的植物id，查询植物信息，获取产物展示图
    let cropdata = []
    for(let m=0 ; m<searchid.length; m++){
        let res = await axios.get("/zwinfo/givezw?id="+searchid[m])
        let zw = res.data.rows[0]
        cropdata.push(zw)
    }
    showBC.value = cropdata
  }
  
  
  
  </script>
  
  
  <style scoped>
  .bag-all{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    
  }
  .bag-main{
    flex: 1;
    background-color: aqua;
    margin: 20px
  }
  .bag-menu{
    display: flex;
    flex-direction: row;
    min-width: 1000px;
    justify-content: space-around;
  }
  .bag-menu>li{
    width: 120px;
    height: 60px;
    line-height: 60px;
    margin: 0 10px;
    background-color: bisque;
  }
  .bag-show{
    position: relative;
  }
  .bag-show>li{
    position: absolute;
    min-width: 1000px;
    min-height: 500px;
    background-color: blue;
    display: flex;
  }
  .bag-every-show{
    background-color: red;
    width: 100px;
    height: 100px;
    margin: 5px;
    position: relative;
    display: flex;

  }
  .bag-every-show img{
    width: 90px;
    height: 90px;
    margin: auto;
  }
  .qty{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25px;
    height: 25px;
    background-color: aqua;
    border-radius: 10px;
    line-height: 25px;
    font-size: 12px;
  }
  </style>
  